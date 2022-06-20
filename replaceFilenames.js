const fs = require('fs');

const vdfBlockPaths = [
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/hifi-render-dark/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/hifi-render-light/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-black-and-red/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-gradient/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-red-and-white/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-white/',
];

const frontEndPaths = [
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/hifi-render-dark/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/hifi-render-light/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/mid-render-black-and-red/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/mid-render-gradient/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/mid-render-red-and-white/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-front-end/public/icons/mid-render-white/',
];

[...vdfBlockPaths, ...frontEndPaths].forEach(function (path) {
  fs.readdir(path, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files
      .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item)) // remove hidden files
      .forEach(function (file) {
        const startsWithNumberOrHasCapital = /^[0-9]|[A-Z]/g;

        if (startsWithNumberOrHasCapital.test(file)) {
          const newFile = file.replace(
            startsWithNumberOrHasCapital,
            (match, p) => {
              if (typeof match === 'number') {
                return `icon-${match}`;
              }

              return match.toLowerCase();
            }
          );

          fs.rename(path + file, path + newFile, function (err) {
            if (err) throw err;
          });
        }
      });
  });
});
