export compose=docker compose

.PHONY: start ## Start the environment
start:
	$(compose) up -d

.PHONY: restart ## Restart the environemnt
restart: down start

.PHONY: stop ## Stop the environment
stop:
	$(compose) stop

.PHONY: down ## Down the environment
down:
	$(compose) down -v

.PHONY: logs ## See logs of the environment, arg c for containers. e.g.: make logs c=proxy
logs:
	$(compose) logs -f $(c)