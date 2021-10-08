const fs = require("fs");

function flatten(inputObject, inputKeyElements) {
  const outputObject = {};

  Object.keys(inputObject)
    .sort()
    .forEach(function (inputKey) {
      if (typeof inputObject[inputKey] === "object") {
        const flattenedChildren = flatten(inputObject[inputKey], [
          ...inputKeyElements,
          inputKey,
        ]);

        Object.keys(flattenedChildren)
          .sort()
          .forEach(function (childKey) {
            const fullKey = [inputKey, childKey].join(".");

            outputObject[fullKey] = flattenedChildren[childKey];
          });
      } else {
        outputObject[inputKey] = inputObject[inputKey];
      }
    });

  return outputObject;
}

const path =
  "/Users/craig/Documents/Clients/ElectroRent/er-customer-portal-web-app/src/i18n";

const jsonText = fs.readFileSync(`${path}/general-en-GB.json`, "utf8");

const jsonData = JSON.parse(jsonText);

const flattenedJsonData = flatten(jsonData, []);

const formattedJson = JSON.stringify(flattenedJsonData, null, 4);

fs.writeFile(
  "/Users/craig/Desktop/general-en-GB-flat.json",
  formattedJson,
  (err) => {
    if (err) {
      throw err;
    }

    console.log("The file has been saved!");
  }
);
