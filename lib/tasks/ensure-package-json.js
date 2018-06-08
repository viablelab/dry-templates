const fs = require('fs');
const path = require('path');

module.exports = async function ensurePackageJson({ projectPath, template }) {
  const configPath = path.join(projectPath, 'package.json');

  if (fs.existsSync(configPath)) {
    return;
  }

  const configJson = JSON.stringify({ name: template.name }, null, '  ');
  fs.writeFileSync(configPath, configJson, 'utf8');
};
