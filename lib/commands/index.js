const chalk = require('chalk');
const emoji = require('node-emoji');
const init = require('./init');
const scaffold = require('./scaffold');
const template = require('./template');
const ls = require('./ls');
const rm = require('./rm');

const errorMsg = chalk`
  {bold.red Uh oh! ${emoji.emojify(':point_up:')}}

  %s
  {gray %s}
`;

const wrapCommand = command => async (...args) => {
  try {
    await command.apply(null, args);
  } catch (err) {
    console.error(errorMsg, err.message, err.stack);
    process.exit(1);
  }
};

module.exports = {
  init: wrapCommand(init),
  scaffold: wrapCommand(scaffold),
  template: wrapCommand(template),
  ls: wrapCommand(ls),
  rm: wrapCommand(rm),
};
