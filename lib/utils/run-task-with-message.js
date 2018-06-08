const R = require('ramda');
const ora = require('ora');

module.exports = async function runTaskWithMessage(msg, task, ...args) {
  const spinner = ora(msg).start();

  try {
    await task.apply(null, [...args, spinner]);
    spinner.succeed();
  } catch (e) {
    spinner.fail();
    throw e;
  }
};
