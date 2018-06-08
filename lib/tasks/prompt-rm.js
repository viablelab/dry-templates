const inquirer = require('inquirer');

module.exports = async function promptRm(template) {
  const answers = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmRemoval',
      message: `Are you sure you want to remove template "${template.name}"?`,
      default: false,
    },
  ]);

  return answers;
};
