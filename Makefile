setup:
	npm ci
	npm link

lint:
	npm run lint

test: 
	npm test

test-watch:
	npm test -- --watch

test-coverage:
	npm test -- --coverage --coverageProvider=v8