module.exports = function castArray(x) {
  return Array.isArray(x) ? x : [x];
};
