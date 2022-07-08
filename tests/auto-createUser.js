const fs = require('fs');
const path = require('path');
const util = require('util');

const currentPath = path.join(__dirname);

async function auto(surname, name) {
  const fullname =
    surname[Math.floor(Math.random() * (surname.length - 1))].name +
    ' ' +
    name[Math.floor(Math.random() * (name.length - 1))].name;
  return fullname;
}

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);
function getName() {
  return readFile(currentPath + '/data/name.json');
}
function getSurName() {
  return readFile(currentPath + '/data/surname.json');
}

async function main() {
  const name = await getName();
  const resultName = JSON.parse(name);
  const surname = await getSurName();
  const resultSurname = JSON.parse(surname);

  const OK = await auto(resultSurname, resultName);
  console.log(OK);
}

main();
