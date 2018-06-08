const path = require('path');
const R = require('ramda');
const inquirer = require('inquirer');

module.exports = async function promptTemplate({ templatesPath }) {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'templateName',
      message: 'Template name',
      validate: Boolean,
    },
  ]);

  return R.merge(answers, {
    templatePath: path.join(templatesPath, answers.templateName),
  });
};
