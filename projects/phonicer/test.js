// test.js — grapheme-split regression tests (no external framework needed)
// Run: node test.js

const { convertWord } = require('./converter');

const tests = [
  { word: 'ship',        expected: ['sh', 'i', 'p'] },
  { word: 'chat',        expected: ['ch', 'a', 't'] },
  { word: 'night',       expected: ['n', 'igh', 't'] },
  { word: 'rain',        expected: ['r', 'ai', 'n'] },
  { word: 'people',      expected: ['p', 'eo', 'p', 'le'] },
  { word: 'cheese',      expected: ['ch', 'ee', 'se'] },
  { word: 'flatbread',   expected: ['f', 'l', 'a', 't', 'b', 'r', 'ea', 'd'] },
  { word: 'beautiful',   expected: ['b', 'eau', 't', 'i', 'f', 'u', 'l'] },
  { word: 'through',     expected: ['th', 'r', 'ough'] },
  { word: 'what',        expected: ['wh', 'a', 't'] },
  { word: 'said',        expected: ['s', 'ai', 'd'] },
  { word: 'the',         expected: ['th', 'e'] },
  { word: 'phone',       expected: ['ph', 'o', 'n', 'e'] },
  { word: 'bread',       expected: ['b', 'r', 'ea', 'd'] },
  { word: 'butter',      expected: ['b', 'u', 'tt', 'er'] },
  { word: 'mozzarella',  expected: ['m', 'o', 'zz', 'a', 'r', 'e', 'll', 'a'] },
];

let passed = 0;
let failed = 0;

for (const { word, expected } of tests) {
  const graphemes = convertWord(word);
  const actual = graphemes.map(g => g.text);
  const ok = JSON.stringify(actual) === JSON.stringify(expected);

  if (ok) {
    console.log(`  PASS  ${word.padEnd(14)} → ${actual.join(' · ')}`);
    passed++;
  } else {
    console.log(`  FAIL  ${word.padEnd(14)}`);
    console.log(`         expected: ${expected.join(' · ')}`);
    console.log(`         actual:   ${actual.join(' · ')}`);
    failed++;
  }
}

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
