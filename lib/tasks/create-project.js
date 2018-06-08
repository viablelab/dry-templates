const makeDir = require('make-dir');

module.exports = async function createProject({ projectPath }) {
  await makeDir(projectPath);
};
