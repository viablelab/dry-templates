const R = require('ramda');
const chalk = require('chalk');
const resolveDefaults = require('../tasks/resolve-defaults');
const findTemplates = require('../tasks/find-templates');

const noneFoundMessage = chalk`
  No templates found, create one with: {bold.cyan dry template}
`;

const listMessage = `
  %s

  Count: %d
`;

module.exports = async function template(templateName, cmdOpts) {
  const defaults = await resolveDefaults(cmdOpts);
  const matchingTemplates = await findTemplates(templateName, defaults);
  const templates = R.pipe(
    R.take,
    R.map(templ => chalk`{bold ${templ.name}} {gray (${templ.path})}`),
    R.join('\n  ')
  )(cmdOpts.number, matchingTemplates);

  if (!templateName && !matchingTemplates.length) {
    console.log(noneFoundMessage);
    process.exit(0);
  }

  console.log(
    listMessage,
    templates,
    R.min(matchingTemplates.length, cmdOpts.number)
  );
};
