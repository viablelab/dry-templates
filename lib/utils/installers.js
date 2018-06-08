const R = require('ramda');
const execa = require('execa');

const toArgs = R.pipe(R.toPairs, R.map(R.join('@')));

const npm = {
  peerDependencies: deps => ['npm', ['install', ...toArgs(deps), '-P']],
  devDependencies: deps => ['npm', ['install', ...toArgs(deps), '-D']],
  dependencies: deps => ['npm', ['install', ...toArgs(deps), '-S']],
};

const yarn = {
  peerDependencies: deps => ['yarn', ['add', ...toArgs(deps), '-P']],
  devDependencies: deps => ['yarn', ['add', ...toArgs(deps), '-D']],
  dependencies: deps => ['yarn', ['add', ...toArgs(deps)]],
};

const pnpm = {
  peerDependencies: deps => ['pnpm', ['install', ...toArgs(deps), '-P']],
  devDependencies: deps => ['pnpm', ['install', ...toArgs(deps), '-D']],
  dependencies: deps => ['pnpm', ['install', ...toArgs(deps)]],
};

module.exports = {
  npm,
  yarn,
  pnpm,
};
