const execa = require('execa');
const installers = require('../utils/installers');

function getInstaller(cwd, packageManager = 'npm') {
  const installer = installers[packageManager];

  if (!installer) {
    throw new Error(`Package manager "${packageManager}" is not supported.`);
  }

  const run = fn => deps => {
    const [bin, args] = fn(deps);
    return execa(bin, args, { cwd });
  };

  return {
    peerDependencies: run(installer.peerDependencies),
    devDependencies: run(installer.devDependencies),
    dependencies: run(installer.dependencies),
  };
}

module.exports = async function installDependencies({
  template,
  projectPath,
  packageManager,
}) {
  const { peerDependencies, devDependencies, dependencies } = template;
  const installer = getInstaller(projectPath, packageManager);

  if (peerDependencies) {
    await installer.peerDependencies(peerDependencies);
  }

  if (devDependencies) {
    await installer.devDependencies(devDependencies);
  }

  if (dependencies) {
    await installer.dependencies(dependencies);
  }
};
