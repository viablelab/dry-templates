const path = require('path');
const test = require('ava');
const R = require('ramda');
const findTemplates = require('../lib/tasks/find-templates');
const { templatesPath } = require('./test-utils');

const sort = R.sortBy(R.head);

test('findTemplates finds configs with .js & .json extensions', async t => {
  const templates = await findTemplates(undefined, { templatesPath });
  const names = templates.map(R.prop('name'));

  t.deepEqual(sort(names), ['alpha-react', 'beta-project', 'gamma-react']);
});

test('findTemplates filters result based on filter term argument', async t => {
  const templates = await findTemplates('reac', { templatesPath });
  const names = templates.map(R.prop('name'));

  t.deepEqual(sort(names), ['alpha-react', 'gamma-react']);
});
