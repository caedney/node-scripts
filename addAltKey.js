const fs = require('fs');

const dataPath =
  '/Users/craig/Documents/Personal/Self/portfolio/andromeda/src/data';

const dataFile = fs.readFileSync(`${dataPath}/projects-data.json`, 'utf-8');

const parsedDataFile = JSON.parse(dataFile);

const newDataFile = parsedDataFile.map((project) => {
  return {
    ...project,
    images: {
      thumbnail: {
        src: project.images.thumbnail,
        alt: project.title,
      },
      gallery: project.images.gallery.map((image) => ({
        src: image,
        alt: '',
      })),
    },
  };
});

const formattedJson = JSON.stringify(newDataFile, null, 2);

fs.writeFile(`${dataPath}/new-projects-data.json`, formattedJson, (err) => {
  if (err) {
    throw err;
  }

  console.log('The file has been saved!');
});
