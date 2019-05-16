build:
	cd src & yarn
	rm -rf package
	mkdir package
	npx ts-node ./configs/actions.ts

rc: build
	npx ts-node ./configs/pkg.rc.ts

publish: build
	npx ts-node ./configs/pkg.publish.ts