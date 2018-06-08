module.exports = function hasAfterHook(template) {
  return typeof template.after === 'function';
};
