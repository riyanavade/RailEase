// scripts/replaceColors.cjs - zero external dependency file replacer
const fs = require('fs');
const path = require('path');

function getFilesRecursively(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath));
    } else if (/\.(js|jsx|ts|tsx)$/.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

const replaceMap = [
  // Clean background replacements
  [/bg-slate-([0-9]+)/g, 'bg-cream-$1'],
  [/bg-gray-([0-9]+)/g, 'bg-cream-$1'],
  [/bg-rose-([0-9]+)/g, 'bg-cream-$1'],
  [/bg-emerald-([0-9]+)/g, 'bg-cream-$1'],
  [/bg-amber-([0-9]+)/g, 'bg-primary-100'],
  [/bg-orange-([0-9]+)/g, 'bg-primary-500'],

  // Clean text replacements
  [/text-slate-([0-9]+)/g, 'text-warm-$1'],
  [/text-gray-([0-9]+)/g, 'text-warm-$1'],
  [/text-rose-([0-9]+)/g, 'text-warm-$1'],
  [/text-emerald-([0-9]+)/g, 'text-primary-600'],
  [/text-orange-([0-9]+)/g, 'text-primary-600'],

  // Border replacements
  [/border-slate-([0-9]+)/g, 'border-cream-300'],
  [/border-gray-([0-9]+)/g, 'border-cream-300'],
  [/border-rose-([0-9]+)/g, 'border-cream-300']
];

function replaceInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;
  replaceMap.forEach(([regex, replacement]) => {
    content = content.replace(regex, replacement);
  });
  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

const srcDir = path.resolve(__dirname, '..', 'src');
const files = getFilesRecursively(srcDir);
files.forEach(replaceInFile);
console.log(`Bulk color replacement completed across ${files.length} files.`);
