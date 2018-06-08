const castArray = require('../utils/cast-array');

module.exports = async function afterHook(opts, spinner) {
  const afterFns = castArray(opts.template.after);

  for (let i = 0; i < afterFns.length; i++) {
    const fn = afterFns[i];

    if (typeof fn === 'function') {
      await fn(opts, spinner);
    }
  }
};
