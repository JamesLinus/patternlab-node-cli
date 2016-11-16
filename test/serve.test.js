const proxyquire = require('proxyquire');
const tap = require('tap');
const _ = require('lodash');
const resolveConfig = require('../bin/resolve_config');
const browserSyncMock = require('./mocks/browsersync.mock.js');
const wrapAsync = require('../bin/utils').wrapAsync;

// Require serve but mock patternlab so that we only test the module behavior
const serve = proxyquire('../bin/serve', {'browser-sync': browserSyncMock});

tap.test('Serve ->', t => wrapAsync(function*() {
	const config = yield resolveConfig('./test/fixtures/patternlab-config.json');
	config.paths.source.root = undefined;
	t.throws(() => { serve(); }, {}, 'throws when config is empty');
	t.throws(() => { serve(123); }, {}, 'throws when config is not of type object');
	t.throws(() => {
		_.unset(config, 'paths.source.root');
		serve(config);
	}, {}, 'throws when no source root dir is set on config');
	t.throws(() => {
		_.unset(config, 'paths.public.root');
		serve(config);
	}, {}, 'throws when no public root dir is set on config');
	t.end();
}));
