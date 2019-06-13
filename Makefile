build:
	rm -rf dist
	tsc
	yarn copy
	mkdir dist/bin
	cp bin/ng-electron dist/bin/

rc: build
	TS_NODE_PROJECT=tsconfig.publish.json npx ts-node ./configs/pkg.rc.ts

publish: build
	TS_NODE_PROJECT=tsconfig.publish.json npx ts-node ./configs/pkg.publish.ts