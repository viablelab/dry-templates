module.exports = function hasDependencies(template) {
  return (
    template.peerDependencies ||
    template.devDependencies ||
    template.dependencies
  );
};
