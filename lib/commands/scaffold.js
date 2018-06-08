const fs = require('fs');
const R = require('ramda');
const ora = require('ora');
const del = require('del');
const chalk = require('chalk');
const emoji = require('node-emoji');
const resolveDefaults = require('../tasks/resolve-defaults');
const findTemplates = require('../tasks/find-templates');
const promptScaffold = require('../tasks/prompt-scaffold');
const composeExtendedTemplates = require('../tasks/compose-extended-templates');
const createProject = require('../tasks/create-project');
const copyFiles = require('../tasks/copy-files');
const ensurePackageJson = require('../tasks/ensure-package-json');
const installDependencies = require('../tasks/install-dependencies');
const afterHook = require('../tasks/after-hook');
const run = require('../utils/run-task-with-message');
const hasAfterHook = require('../utils/template-has-after-hook');
const hasDependencies = require('../utils/template-has-dependencies');

const successMessage = chalk`
  {bold.green Project created! ${emoji.get(':rocket:')}}

  {bold {gray Template:}  %s}
      {bold {gray Path:}  %s}
`;

module.exports = async function scaffold(templateName, cmdOpts) {
  const defaults = await resolveDefaults(cmdOpts);
  const matchingTemplates = await findTemplates(templateName, defaults);

  if (!matchingTemplates.length) {
    const error = templateName
      ? `Found no templates matching "${templateName}"...`
      : 'Found no templates, run `dry template` to create one!';
    throw new Error(error);
  }

  const userInput = await promptScaffold(matchingTemplates, defaults);
  const composedTemplate = await composeExtendedTemplates(
    userInput.template,
    defaults
  );
  const options = R.mergeAll([
    defaults,
    userInput,
    { template: composedTemplate },
  ]);

  if (fs.existsSync(options.projectPath)) {
    throw new Error(`Path "${options.projectPath}" already exists!`);
  }

  try {
    await run('Creating project', createProject, options);
    await run('Copying files', copyFiles, options);

    if (hasDependencies(options.template)) {
      await ensurePackageJson(options);
      await run(
        `Installing dependencies with ${options.packageManager}`,
        installDependencies,
        options
      );
    }

    if (hasAfterHook(options.template)) {
      await run('Running after hook', afterHook, options);
    }

    console.log(successMessage, options.template.name, options.projectPath);
  } catch (e) {
    if (fs.existsSync(options.projectPath)) {
      ora('Encountered error, removing generated resources').info();
      await del(options.projectPath);
    }

    throw e;
  }
};
