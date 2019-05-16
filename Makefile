build:
	rm -rf package
	mkdir package
	cp README.md package/

rc: build
	npx ts-node ./configs/pkg.rc.ts

publish: build
	npx ts-node ./configs/pkg.publish.ts