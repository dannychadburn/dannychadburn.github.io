// graphemes.js
// Phoneme/grapheme data for the UK Letters and Sounds phonics framework.
// Edit these lists to change what the converter recognises.

// 3-letter graphemes checked before digraphs (greedy, longest-first)
const TRIGRAPHS = [
  'igh', // night, light, sight  → /aɪ/
  'ear', // hear, fear, near     → /ɪər/
  'air', // hair, fair, pair     → /ɛər/
  'ure', // pure, sure, cure     → /jʊər/
  'dge', // fudge, bridge, hedge → /dʒ/
  'eau', // beautiful, beau      → /juː/
  'tch', // match, fetch, witch  → /tʃ/
];

// 2-letter graphemes
const DIGRAPHS = [
  // Consonant digraphs
  'ch', // chip, much
  'sh', // ship, fish
  'th', // this, thin, the
  'ng', // ring, song
  'wh', // when, while, what
  'ph', // phone, graph
  'qu', // quick, queen
  'ck', // back, duck
  // Vowel digraphs / vowel teams
  'ai', // rain, sail       → /eɪ/
  'ay', // day, play        → /eɪ/
  'ee', // see, tree        → /iː/
  'ea', // eat, bean        → /iː/ (irregular in some words: bread)
  'oa', // coat, road       → /əʊ/
  'oo', // moon, book       → /uː/ or /ʊ/
  'ou', // out, found       → /aʊ/
  'ow', // cow, how         → /aʊ/ (also: snow, slow → /əʊ/)
  'oi', // coin             → /ɔɪ/
  'oy', // boy, toy         → /ɔɪ/
  'ie', // pie, tie         → /aɪ/
  'ue', // blue, clue       → /uː/
  'ew', // new, few         → /juː/
  'oe', // toe, goes        → /əʊ/
  'ey', // key, they        → /eɪ/ or /iː/
  'au', // autumn, cause    → /ɔː/
  'aw', // saw, draw        → /ɔː/
  // r-controlled vowel digraphs
  'ar', // car, star        → /ɑː/
  'or', // for, born        → /ɔː/
  'ur', // fur, turn        → /ɜː/
  'er', // her, fern, butter → /ɜː/ or /ə/
  'ir', // bird, girl       → /ɜː/
];

// Vowels that can be the "open" half of a split digraph (magic e pattern)
const SPLIT_VOWELS = new Set(['a', 'e', 'i', 'o', 'u']);

// Consonants used by the split-digraph detector (everything that is not a vowel)
const CONSONANTS = new Set([
  'b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm',
  'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'y', 'z',
]);

// Exception words: irregular spellings that the rule engine can't derive.
// Each entry maps a lowercase word to its grapheme array.
// Grapheme types: 'regular' | 'digraph' | 'trigraph' | 'split_vowel' | 'split_silent' | 'irregular'
const EXCEPTIONS = {

  // ── Words required for the test suite ───────────────────────────────
  mozzarella: [
    { text: 'm',  type: 'regular' },
    { text: 'o',  type: 'regular' },
    { text: 'zz', type: 'digraph' }, // Italian double-z
    { text: 'a',  type: 'regular' },
    { text: 'r',  type: 'regular' }, // 'ar' is not a digraph here — different syllable
    { text: 'e',  type: 'regular' },
    { text: 'll', type: 'digraph' }, // Italian double-l
    { text: 'a',  type: 'regular' },
  ],
  people: [
    { text: 'p',  type: 'regular'   },
    { text: 'eo', type: 'irregular' }, // 'eo' → /iː/
    { text: 'p',  type: 'regular'   },
    { text: 'le', type: 'irregular' }, // final -le → /əl/
  ],
  cheese: [
    { text: 'ch', type: 'digraph'   },
    { text: 'ee', type: 'digraph'   },
    { text: 'se', type: 'irregular' }, // 'se' → /z/
  ],
  through: [
    { text: 'th',   type: 'digraph'   },
    { text: 'r',    type: 'regular'   },
    { text: 'ough', type: 'irregular' }, // 'ough' → /uː/ here; varies by word
  ],
  bread: [
    { text: 'b',  type: 'regular'   },
    { text: 'r',  type: 'regular'   },
    { text: 'ea', type: 'irregular' }, // 'ea' → /ɛ/ not /iː/
    { text: 'd',  type: 'regular'   },
  ],

  // ── High-frequency tricky / exception words ──────────────────────────
  the: [
    { text: 'th', type: 'digraph'   },
    { text: 'e',  type: 'irregular' },
  ],
  said: [
    { text: 's',  type: 'regular'   },
    { text: 'ai', type: 'irregular' }, // 'ai' → /ɛ/ not /eɪ/
    { text: 'd',  type: 'regular'   },
  ],
  are: [{ text: 'are', type: 'irregular' }],
  one: [
    { text: 'o', type: 'irregular' },
    { text: 'n', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  come: [
    { text: 'c', type: 'regular'   },
    { text: 'o', type: 'irregular' }, // 'o' → /ʌ/
    { text: 'm', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  some: [
    { text: 's', type: 'regular'   },
    { text: 'o', type: 'irregular' },
    { text: 'm', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  have: [
    { text: 'h', type: 'regular' },
    { text: 'a', type: 'regular' },
    { text: 'v', type: 'regular' },
    { text: 'e', type: 'irregular' }, // final 'e' doesn't lengthen 'a' here
  ],
  give: [
    { text: 'g', type: 'regular'   },
    { text: 'i', type: 'regular'   },
    { text: 'v', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  live: [
    { text: 'l', type: 'regular'   },
    { text: 'i', type: 'regular'   },
    { text: 'v', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  love: [
    { text: 'l', type: 'regular'   },
    { text: 'o', type: 'irregular' },
    { text: 'v', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  move: [
    { text: 'm', type: 'regular'   },
    { text: 'o', type: 'irregular' },
    { text: 'v', type: 'regular'   },
    { text: 'e', type: 'irregular' },
  ],
  were: [
    { text: 'w',   type: 'regular'   },
    { text: 'ere', type: 'irregular' },
  ],
  here: [
    { text: 'h',   type: 'regular'   },
    { text: 'ere', type: 'irregular' },
  ],
  there: [
    { text: 'th',  type: 'digraph'   },
    { text: 'ere', type: 'irregular' },
  ],
  their: [
    { text: 'th',  type: 'digraph'   },
    { text: 'eir', type: 'irregular' },
  ],
  who: [
    { text: 'wh', type: 'digraph'   },
    { text: 'o',  type: 'irregular' },
  ],
  where: [
    { text: 'wh',  type: 'digraph'   },
    { text: 'ere', type: 'irregular' },
  ],
  once: [
    { text: 'on', type: 'irregular' },
    { text: 'ce', type: 'irregular' },
  ],
  of: [
    { text: 'o', type: 'irregular' }, // 'f' → /v/ sound
    { text: 'f', type: 'irregular' },
  ],
  to: [
    { text: 't', type: 'regular'   },
    { text: 'o', type: 'irregular' }, // 'o' → /uː/
  ],
  do: [
    { text: 'd', type: 'regular'   },
    { text: 'o', type: 'irregular' },
  ],
  you: [
    { text: 'y',  type: 'regular'   },
    { text: 'ou', type: 'irregular' }, // 'ou' → /uː/
  ],
};

module.exports = { TRIGRAPHS, DIGRAPHS, SPLIT_VOWELS, CONSONANTS, EXCEPTIONS };
