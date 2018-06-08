const path = require('path');

const fixturesPath = path.resolve(__dirname, 'fixtures');
const templatesPath = path.join(fixturesPath, 'templates');

const testDefaults = {
  templatesPath,
};

module.exports.fixturesPath = fixturesPath;
module.exports.templatesPath = templatesPath;
module.exports.testDefaults = testDefaults;
