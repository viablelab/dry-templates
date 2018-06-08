const R = require('ramda');
const del = require('del');
const chalk = require('chalk');
const emoji = require('node-emoji');
const resolveDefaults = require('../tasks/resolve-defaults');
const findTemplates = require('../tasks/find-templates');
const promptRm = require('../tasks/prompt-rm');

const abortedMessage = chalk`
  Aborting removal... ${emoji.emojify(':open_mouth:')}
`;

const extendedMessage = chalk`
  Woah! ${emoji.emojify(':hand:')}

  "%s" is extended by other templates:
    %s
`;

const successMessage = chalk`
  {bold Successfully removed template: {red %s}}
`;

module.exports = async function template(templateName) {
  const defaults = await resolveDefaults();
  const matchingTemplates = await findTemplates(undefined, defaults);
  const targetTemplate = R.find(
    R.pipe(R.prop('name'), R.equals(templateName)),
    matchingTemplates
  );

  if (!targetTemplate) {
    throw new Error(`No exact match for "${templateName}"`);
  }

  const extendedBy = R.filter(
    templ => templ.extends && templ.extends.includes(templateName),
    matchingTemplates
  );

  if (extendedBy.length) {
    const extendedByTemplates = R.pipe(
      R.map(templ => chalk`{gray ${templ.name}}`),
      R.join('\n    ')
    )(extendedBy);

    console.error(extendedMessage, templateName, extendedByTemplates);
    process.exit(1);
  }

  const userInput = await promptRm(targetTemplate);

  if (userInput.confirmRemoval) {
    await del(targetTemplate.path, { force: true });
    console.log(successMessage, targetTemplate.name);
  } else {
    console.log(abortedMessage);
  }
};
