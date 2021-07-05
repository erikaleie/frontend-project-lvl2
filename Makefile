lint:
	npx eslint .

test: 
	npx jest

test-watch:
	npx jest --watch

test-coverage:
	npx --node-options='--experimental-vm-modules --no-warnings' jest --coverage --coverageProvider=v8 