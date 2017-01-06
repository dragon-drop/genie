var path = require('path');

module.exports = {
  watchTags: '@focus',
  path: path.resolve('tests/specifications'),
  domainSteps: path.resolve('tests/step_definitions/domain'),
  e2eSteps: path.resolve('tests/step_definitions/e2e')
};
