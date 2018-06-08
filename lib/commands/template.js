const R = require('ramda');
const chalk = require('chalk');
const emoji = require('node-emoji');
const execa = require('execa');
const resolveDefaults = require('../tasks/resolve-defaults');
const promptTemplate = require('../tasks/prompt-template');
const findTemplates = require('../tasks/find-templates');
const createTemplate = require('../tasks/create-template');
const run = require('../utils/run-task-with-message');

const successMessage = chalk`
  {bold Template created! ${emoji.emojify(':clipboard:')}}

  {bold {gray Name:}  %s}
  {bold {gray Path:}  %s}
`;

module.exports = async function template(cmdOpts) {
  const defaults = await resolveDefaults(cmdOpts);
  const userInput = await promptTemplate(defaults);
  const options = R.merge(defaults, userInput);

  const matchingTemplates = await findTemplates(options.templateName, options);

  if (matchingTemplates.some(R.propEq('name', options.templateName))) {
    throw new Error(
      `A template named "${options.templateName}" already exists!`
    );
  }

  await run('Creating template', createTemplate, options);

  if (cmdOpts.open && options.editorBinary) {
    await run('Opening template in editor', execa, options.editorBinary, [
      options.templatePath,
    ]);
  }

  console.log(successMessage, options.templateName, options.templatePath);
};
