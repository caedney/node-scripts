const fs = require('fs');
const { parse } = require('parse5');

const fileDir = '/Users/craigedney/Desktop/animations';
const outputPath =
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/src/long-form/five-g/utils';

function getPaths(obj) {
  if (obj && typeof obj === 'object') {
    if (obj.childNodes.find((item) => item.tagName === 'path')) {
      return obj.childNodes
        .filter((item) => item.tagName === 'path')
        .map((item) => item.attrs[0].value);
    }

    const tag = obj.childNodes.filter((item) => item.tagName);

    return getPaths(tag[0]);
  }

  return null;
}

const rawHtml = fs.readdirSync(fileDir).reduce((accumulator, file) => {
  const fileName = file.replace('.svg', '');

  if (/^.+svg$/.test(file)) {
    const html = fs.readFileSync(`${fileDir}/${file}`, 'utf8');
    const root = parse(html);
    const svg = root.childNodes[0].childNodes[1].childNodes[0];
    const viewBox = svg.attrs[2].value;
    const path = getPaths(svg);

    return {
      ...accumulator,
      [fileName]: {
        viewBox,
        path,
      },
    };
  }

  return accumulator;
}, {});

const formattedJson = JSON.stringify(rawHtml, null, 2);

fs.writeFile(`${outputPath}/animations.json`, formattedJson, (err) => {
  if (err) {
    throw err;
  }

  console.log('The file has been saved!');
});
