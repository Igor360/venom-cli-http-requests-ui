TAG=v0.0.1
# Docker hub configs
DOCKER_HUB_PROJECT=igor368/venom-cli-requests-ui

build:
	@docker rmi -f $(TAG) || true
	@docker build . -f docker/server/Dockerfile --tag $(TAG) --no-cache

push:
	@docker rmi -f $(TAG) || true
	@docker build . -f docker/server/Dockerfile --tag $(TAG) --no-cache
	@docker tag $(TAG) $(DOCKER_HUB_PROJECT):$(TAG)
	@docker push $(DOCKER_HUB_PROJECT):$(TAG)
	@docker rmi -f $(TAG) || true

