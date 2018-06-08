const path = require('path');
const R = require('ramda');
const inquirer = require('inquirer');

module.exports = async function promptScaffold(templates, defaults) {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: 'What template do you want to use?',
      choices: templates.map(R.prop('name')),
      validate: Boolean,
      filter: choice => templates.find(R.propEq('name', choice)),
    },
    {
      type: 'input',
      name: 'projectName',
      message: 'Project name',
      default: R.path(['template', 'name']),
      validate: Boolean,
    },
  ]);

  return R.merge(answers, {
    projectPath: path.join(process.cwd(), answers.projectName),
  });
};
