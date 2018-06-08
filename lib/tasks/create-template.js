const fs = require('fs');
const path = require('path');
const makeDir = require('make-dir');

module.exports = async function createTemplate({ templateName, templatePath }) {
  await makeDir(templatePath);

  const templateConfigPath = path.join(templatePath, 'dry.template.json');
  const json = JSON.stringify({ name: templateName }, null, '  ');
  fs.writeFileSync(templateConfigPath, json, 'utf8');
};
