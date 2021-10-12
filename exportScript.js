const fs = require("fs");

const icons =
  "/Users/craig/Documents/Clients/Vodafone/vodafone-vigor/vdf-content-hub/apps/admin/code/src/images/icons";

const iconFileNames = fs
  .readdirSync(icons)
  .map(file => {
    const iconName = file.replace(".svg", "");

    if (/^\w+.svg$/.test(file)) {
      return `export { ReactComponent as ${iconName}Icon } from './${file}'`;
    }

    return null;
  })
  .filter(a => a)
  .join("\n");

fs.writeFile(`${icons}/index.js`, iconFileNames, err => {
  if (err) {
    throw err;
  }

  console.log("The file has been saved!");
});
