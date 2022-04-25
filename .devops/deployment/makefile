.PHONY: lint
lint: ## Run yamllint and ansible-lint on all of the files
	make lintf f=./	

.PHONY: lintf
lintf: ## Run yamllint and ansible-lint on a path
	@[ "${f}" ] || ( echo "f is not set. available: ./, tasks/main.yml etc..."; exit 1 )
	yamllint ${f}
	ansible-lint ${f}

.PHONY: lintw
lintw: ## Start watching for file changes and lint them.
	onchange './**/*.yml' -- make lintf f='./{{file}}'

.PHONY: deploy
deploy: ## Deploy the application to production. Select a host/group from inventory. Use s variable to add args. example: make deploy host=test s="-tag test"
		@[ "${host}" ] || ( echo "host is not set. Please select a host or a group from inventory"; exit 1 )
		ansible-playbook deployment.yml --limit ${host} ${s}

.PHONY: help
help: ## Display this help message
	@cat $(MAKEFILE_LIST) | grep -e "^[a-zA-Z_\-]*: *.*## *" | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
