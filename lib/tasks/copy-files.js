const path = require('path');
const cpy = require('cpy');
const castArray = require('../utils/cast-array');

module.exports = async function copyFiles({ projectPath, template }) {
  const paths = castArray(template.path);

  for (let i = 0; i < paths.length; i++) {
    const templPath = paths[i];
    await cpy(['**/*', '!dry.template.js?(on)'], projectPath, {
      cwd: templPath,
      parents: true,
    });
  }
};
