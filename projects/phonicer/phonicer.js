#!/usr/bin/env node
// phonicer.js - CLI entry point
// Usage:
//   node phonicer.js "the cat sat on the mat"
//   echo "some text" | node phonicer.js
//   node phonicer.js --plain "night"
//   node phonicer.js --debug "people"

const { convertText } = require('./converter');
const { formatTokens } = require('./formatter');

const args = process.argv.slice(2);
const plain = args.includes('--plain');
const debug = args.includes('--debug');
const textArgs = args.filter(a => !a.startsWith('--'));

function run(input) {
  const tokens = convertText(input);
  const output = formatTokens(tokens, { plain, debug });
  process.stdout.write(output + '\n');
}

if (textArgs.length > 0) {
  run(textArgs.join(' '));
} else {
  // Read from stdin
  let input = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', chunk => { input += chunk; });
  process.stdin.on('end', () => run(input.trim()));
}
