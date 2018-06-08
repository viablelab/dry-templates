const R = require('ramda');
const findTemplates = require('./find-templates');
const castArray = require('../utils/cast-array');

// Uncurried backwards version of R.uniqBy
const reverseUniqBy = (fn, arr) => {
  const matches = {};
  const newArr = [];

  for (let i = arr.length - 1; i >= 0; i--) {
    const identifier = fn(arr[i]);

    if (!matches[identifier]) {
      newArr.unshift(arr[i]);
      matches[identifier] = true;
    }
  }

  return newArr;
};

async function walkTemplates(template, source, templates = []) {
  let childTemplates = [];

  const extensions = castArray(template.extends);

  for (let i = 0; i < extensions.length; i++) {
    const templName = extensions[i];
    const templ = source[templName];

    if (!templ) {
      throw new Error(
        `Couldn't find template "${templName}", extended by "${template.name}"`
      );
    }

    templates = R.prepend(templ, templates);

    if (templ.extends) {
      const children = await walkTemplates(templ, source);
      childTemplates = R.concat(childTemplates, children);
    }
  }

  const all = R.concat(childTemplates, templates);
  return reverseUniqBy(R.prop('name'), all);
}

const withKey = (key, l, r) => {
  if (key.includes('dependencies')) {
    return R.merge(l, r);
  }

  if (['after', 'path'].includes(key)) {
    return R.append(r, castArray(l));
  }

  return r;
};

const foldTemplates = R.reduce(
  (acc, templ) => R.mergeWithKey(withKey, acc, templ),
  {}
);

module.exports = async function composeExtendedTemplates(template, defaults) {
  if (!template.extends) {
    return template;
  }

  const allTemplates = await findTemplates(undefined, defaults);
  const templatesByName = R.indexBy(R.prop('name'), allTemplates);
  const templates = await walkTemplates(template, templatesByName, [template]);

  return foldTemplates(templates);
};
