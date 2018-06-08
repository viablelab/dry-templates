const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const emoji = require('node-emoji');
const makeDir = require('make-dir');
const promptInit = require('../tasks/prompt-init');
const getConfigPath = require('../utils/get-config-path');

const alreadyInitializedMessage = chalk`
  {bold Slow down! ${emoji.emojify(':vertical_traffic_light:')}}

  Configuration for {bold.cyan dry} already exists at:
    {bold %s}
`;

module.exports = async function initialize(cmdOpts) {
  const dryConfigPath = getConfigPath();
  const dryPath = path.dirname(dryConfigPath);

  if (fs.existsSync(dryConfigPath)) {
    console.log(alreadyInitializedMessage, dryConfigPath);
    process.exit(1);
  }

  const userInput = await promptInit(dryPath, cmdOpts);

  await makeDir(dryPath);
  await makeDir(userInput.templatesPath);

  fs.writeFileSync(
    dryConfigPath,
    JSON.stringify(userInput, null, '  '),
    'utf8'
  );
};
