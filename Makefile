lint:
	npx eslint .

test: 
	npx jest

test-watch:
	npx jest --watch

test-coverage:
	npx jest --coverage --coverageProvider=v8