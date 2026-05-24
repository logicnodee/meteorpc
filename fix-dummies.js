const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('page.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const pages = walk(path.join(__dirname, 'app', 'dashboard'));

pages.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('${i}')) {
    content = content.replace(/\$\{i\}/g, '{i}');
    fs.writeFileSync(file, content);
    console.log(`Fixed: ${file}`);
  }
});

console.log('Fix complete!');
