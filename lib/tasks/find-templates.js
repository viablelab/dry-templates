const path = require('path');
const globby = require('globby');

module.exports = async function findTemplates(filterTerm, { templatesPath }) {
  const paths = await globby('*/dry.template.js?(on)', {
    cwd: templatesPath,
  });
  const configs = [];

  paths.forEach(filePath => {
    const configPath = path.join(templatesPath, filePath);
    const config = require(configPath);
    config.path = path.dirname(configPath);

    if (!filterTerm || config.name.includes(filterTerm)) {
      configs.push(config);
    }
  });

  return configs;
};
