const path = require('path');
const getHomePath = require('home-path');

module.exports = function getConfigPath() {
  const homePath = getHomePath();
  const dryPath = path.join(homePath, '.dry');
  const configPath = path.join(dryPath, 'dry.config.json');

  return configPath;
};
