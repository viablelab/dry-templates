const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const emoji = require('node-emoji');
const getConfigPath = require('../utils/get-config-path');

const notInitializedMessage = chalk`
  {bold Hold up! ${emoji.get(':hand:')}}

  Couldn't find local configuration, run {bold.cyan dry init} to get started!
`;

module.exports = async function resolveDefaults(opts = {}) {
  const configPath = getConfigPath();

  if (!fs.existsSync(configPath)) {
    console.log(notInitializedMessage);
    process.exit(1);
  }

  const config = require(configPath);

  if (opts['package-manager']) {
    config.packageManager = opts['package-manager'];
  }

  if (opts['exact']) {
    config.installExact = true;
  }

  return config;
};
