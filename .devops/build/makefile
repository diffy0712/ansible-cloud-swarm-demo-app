image-name=registry.gitlab.com/diffy0712/ansible-cloud-swarm-demo-app

.PHONY: publish
publish: build push clear## build and push docker image, then remove locally

build: ## build docker image
	@[ "${tag}" ] || ( echo "tag is not set. available: stg, 1.0.0 etc..."; exit 1 )
	docker build --target dist -t ${image-name}:${tag}  ../../ -f ./Dockerfile

push: ## push docker image to registry
	@[ "${tag}" ] || ( echo "tag is not set. available: stg, 1.0.0 etc..."; exit 1 )
	docker push ${image-name}:${tag}

clear: ## remove local image
	@[ "${tag}" ] || ( echo "tag is not set. available: stg, 1.0.0 etc..."; exit 1 )
	docker rmi ${image-name}:${tag}

help: ## Display this help message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'