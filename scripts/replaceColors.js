// scripts/replaceColors.js
const fs = require('fs');
const path = require('path');
const glob = require('glob');

const replaceMap = [
  // background classes
  [/bg-slate-(\d+)/g, 'bg-cream-$1'],
  [/bg-gray-(\d+)/g, 'bg-cream-$1'],
  [/bg-rose-(\d+)/g, 'bg-warm-$1'],
  [/bg-blue-(\d+)/g, 'bg-primary-$1'],
  [/bg-emerald-(\d+)/g, 'bg-warm-$1'],
  // text classes
  [/text-slate-(\d+)/g, 'text-cream-$1'],
  [/text-gray-(\d+)/g, 'text-cream-$1'],
  [/text-rose-(\d+)/g, 'text-warm-$1'],
  // border classes
  [/border-slate-(\d+)/g, 'border-cream-$1'],
  [/border-gray-(\d+)/g, 'border-cream-$1']
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;
  replaceMap.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const srcDir = path.resolve(__dirname, '..', 'src');
const files = glob.sync('**/*.{js,jsx,ts,tsx}', { cwd: srcDir, absolute: true });
files.forEach(replaceInFile);
console.log('Color replacement completed.');
