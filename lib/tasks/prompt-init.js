const path = require('path');
const inquirer = require('inquirer');

module.exports = async function promptInit(dryPath, opts) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'templatesPath',
      message: 'Path to local templates',
      default: path.join(dryPath, 'templates'),
    },
    {
      type: 'input',
      name: 'packageManager',
      message: 'Default package manager',
      default: opts['package-manager'] || 'npm',
    },
    {
      type: 'input',
      name: 'editorBinary',
      message: 'Editor binary command',
    },
  ]);

  return answers;
};
