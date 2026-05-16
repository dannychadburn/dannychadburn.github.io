// converter.js
// Converts a single word into an array of grapheme objects.
// Each object: { text: string, type: string }
// Types: 'regular' | 'digraph' | 'trigraph' | 'split_vowel' | 'split_silent' | 'irregular'

const { TRIGRAPHS, DIGRAPHS, SPLIT_VOWELS, CONSONANTS, EXCEPTIONS } = require('./graphemes');

// Detect the split-digraph (magic-e) pattern in a word.
// Looks for: <vowel> <exactly-one-consonant> e  (at end of word)
// Returns { vowelIndex, eIndex } or null.
function findSplitDigraph(word) {
  if (word.length < 3) return null;
  const eIndex = word.length - 1;
  if (word[eIndex] !== 'e') return null;

  let i = eIndex - 1;
  let consonantCount = 0;

  // Allow exactly one consonant between the vowel and the final 'e'
  while (i >= 0 && CONSONANTS.has(word[i])) {
    consonantCount++;
    if (consonantCount > 1) return null;
    i--;
  }

  if (consonantCount === 0) return null; // no consonant between vowel and e
  if (i < 0) return null;               // no character before the consonant
  if (!SPLIT_VOWELS.has(word[i])) return null;

  return { vowelIndex: i, eIndex };
}

// Convert a single word to its grapheme array.
// Preserves original case in grapheme text.
function convertWord(word) {
  const lower = word.toLowerCase();

  // 1. Check exceptions dictionary first
  if (EXCEPTIONS[lower]) {
    // Restore the original capitalisation of the first character
    const result = EXCEPTIONS[lower].map(g => ({ ...g }));
    if (word[0] !== lower[0]) {
      result[0] = { ...result[0], text: result[0].text[0].toUpperCase() + result[0].text.slice(1) };
    }
    return result;
  }

  // 2. Pre-scan for split digraph so we can mark those positions before the main loop
  const split = findSplitDigraph(lower);

  const graphemes = [];
  let i = 0;

  while (i < lower.length) {
    // Split digraph: vowel position — emit before any digraph check so 'ir' in
    // "fire" doesn't shadow the i_e pattern detected by the pre-scan.
    if (split && i === split.vowelIndex) {
      graphemes.push({ text: word[i], type: 'split_vowel' });
      i++;
      continue;
    }

    // Split digraph: silent-e position
    if (split && i === split.eIndex) {
      graphemes.push({ text: word[i], type: 'split_silent' });
      i++;
      continue;
    }

    // 3. Try trigraphs (3-letter graphemes)
    if (i + 2 < word.length) {
      const tri = lower.slice(i, i + 3);
      if (TRIGRAPHS.includes(tri)) {
        graphemes.push({ text: word.slice(i, i + 3), type: 'trigraph' });
        i += 3;
        continue;
      }
    }

    // 4. Try digraphs (2-letter graphemes)
    if (i + 1 < word.length) {
      const di = lower.slice(i, i + 2);
      if (DIGRAPHS.includes(di)) {
        graphemes.push({ text: word.slice(i, i + 2), type: 'digraph' });
        i += 2;
        continue;
      }
    }

    // 5. Try doubled letter (e.g. tt, ll, zz — two letters, one phoneme)
    if (i + 1 < word.length && lower[i] === lower[i + 1]) {
      graphemes.push({ text: word.slice(i, i + 2), type: 'digraph' });
      i += 2;
      continue;
    }

    // 6. Single character fallback
    graphemes.push({ text: word[i], type: 'regular' });
    i++;
  }

  return graphemes;
}

// Convert a full sentence (or arbitrary text) to an array of word tokens.
// Each token is either { kind: 'word', graphemes, original } or { kind: 'space', text }.
function convertText(text) {
  const tokens = [];
  // Split on whitespace runs, keeping the whitespace as separate tokens
  const parts = text.split(/(\s+)/);
  for (const part of parts) {
    if (/^\s+$/.test(part)) {
      tokens.push({ kind: 'space', text: part });
      continue;
    }
    if (!part) continue;

    // Strip leading/trailing punctuation from the word before analysing
    const match = part.match(/^([^a-zA-Z]*)([a-zA-Z][a-zA-Z'-]*)([^a-zA-Z]*)$/);
    if (!match) {
      // No alphabetic content — pass through as-is
      tokens.push({ kind: 'space', text: part });
      continue;
    }
    const [, prefix, wordCore, suffix] = match;
    tokens.push({
      kind: 'word',
      prefix,
      suffix,
      original: wordCore,
      graphemes: convertWord(wordCore),
    });
  }
  return tokens;
}

module.exports = { convertWord, convertText };
