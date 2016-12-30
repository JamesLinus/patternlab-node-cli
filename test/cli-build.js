const exists = require('path-exists');
const getUniqueProjectPath = require('./utils/getUniqueProjectPath');
const path = require('path');
const spawnCmd = require('./utils/spawnCmd');
const tap = require('tap');
const wrapAsync = require('../bin/utils').wrapAsync;

const projectRoot = getUniqueProjectPath();

tap.test('Init and build ->', t => wrapAsync(function*() {
	yield spawnCmd(['init', '--verbose', '--project-dir', projectRoot, '--edition', 'edition-node', '--starterkit', 'starterkit-mustache-demo']);
	yield spawnCmd(['build', '--config', `${projectRoot}/patternlab-config.json`]);
	t.ok(exists.sync(path.resolve(projectRoot, 'public')), 'should build all files into public dir');
	t.ok(exists.sync(path.resolve(projectRoot, 'public', 'patterns')), 'with a patterns dir');
	t.ok(exists.sync(path.resolve(projectRoot, 'public', 'styleguide')), 'with a styleguide dir');
	t.end();
}));
