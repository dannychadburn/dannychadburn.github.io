// formatter.js
// Renders grapheme arrays as coloured terminal output or plain text.

const RESET   = '\x1b[0m';
const CYAN    = '\x1b[36m';   // digraphs & trigraphs
const MAGENTA = '\x1b[35m';   // split digraph parts (vowel + silent e)
const CORAL   = '\x1b[91m';   // irregular / exception graphemes

// Separator placed between graphemes within a word
const SEP = ' · ';

// Apply ANSI colour to a string based on grapheme type
function colourise(text, type) {
  switch (type) {
    case 'digraph':
    case 'trigraph':
      return `${CYAN}${text}${RESET}`;
    case 'split_vowel':
    case 'split_silent':
      return `${MAGENTA}${text}${RESET}`;
    case 'irregular':
      return `${CORAL}${text}${RESET}`;
    default:
      return text; // 'regular' — no colour
  }
}

// Format a single word's grapheme array into a display string.
// options.plain  — strip all ANSI codes
// options.debug  — prefix with the grapheme list
function formatWord(graphemes, options = {}) {
  const parts = graphemes.map(g => options.plain ? g.text : colourise(g.text, g.type));
  const display = parts.join(SEP);

  if (options.debug) {
    const details = graphemes.map(g => `${g.text}(${g.type})`).join(' | ');
    return `[${details}] → ${display}`;
  }
  return display;
}

// Format the full token stream produced by convertText().
function formatTokens(tokens, options = {}) {
  const parts = tokens.map(token => {
    if (token.kind === 'space') return token.text;
    const wordStr = formatWord(token.graphemes, options);
    return `${token.prefix}${wordStr}${token.suffix}`;
  });
  return parts.join('');
}

module.exports = { formatWord, formatTokens };
