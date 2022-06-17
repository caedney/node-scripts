const fs = require('fs');

const paths = [
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/hifi-render-dark/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/hifi-render-light/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-black-and-red/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-gradient/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-red-and-white/',
  '/Users/craigedney/Documents/Clients/Vodafone/vdf-blocks/src/assets/icons/mid-render-white/',
];

paths.forEach(function (path) {
  fs.readdir(path, function (err, files) {
    //handling error
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }
    //listing all files using forEach
    files.forEach(function (file) {
      const startsWithNumber = /^[0-9]/g;
      const hasCapital = /[A-Z]/g;
      let newFile = file;

      if (startsWithNumber.test(file)) {
        // newFile = file.replace(startsWithNumber, (match, p) => {
        //   return `svg-${match}`;
        // });
        console.log('startsWithNumber', path, file);
      }

      if (hasCapital.test(file)) {
        // newFile = file.replace(hasCapital, (match, p) => {
        //   return match.toLowerCase();
        // });
        console.log('hasCapital', path, file);
      }

      fs.rename(path + file, path + newFile, function (err) {
        if (err) {
          console.log('error foool', err);
        }
      });
    });
  });
});
