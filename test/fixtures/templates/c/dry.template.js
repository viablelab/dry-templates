const path = require('path');

module.exports = {
  name: 'gamma-react',
  postProcess: opts => {
    return path
      .dirname(opts.projectPath)
      .split('/')
      .pop();
  },
};
