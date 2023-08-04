const fs = require('fs');
const { parse } = require('parse5');

const fileDir =
  '/Users/craigedney/Documents/Clients/Vodafone/resources/5g/images';
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

const rawHtml = fs
  .readdirSync(fileDir)
  .map((file) => {
    const fileName = file.replace('.svg', '');

    if (/^.+svg$/.test(file)) {
      const html = fs.readFileSync(`${fileDir}/${file}`, 'utf8');
      const root = parse(html);
      const title =
        root.childNodes[1].childNodes[1].childNodes[0].childNodes[1].attrs[1]
          .value;
      const paths = getPaths(root.childNodes[1].childNodes[1].childNodes[0]);

      return {
        [fileName]: {
          title,
          paths,
        },
      };
    }

    return null;
  })
  .filter(Boolean);

const formattedJson = JSON.stringify(rawHtml, null, 2);

fs.writeFile(`${outputPath}/titles.json`, formattedJson, (err) => {
  if (err) {
    throw err;
  }

  console.log('The file has been saved!');
});
