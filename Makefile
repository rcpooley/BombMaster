.PHONY: docker-build
docker-build:
	docker build . -t rcpooley/bombmaster:latest

.PHONY: docker-push
docker-push:
	docker push rcpooley/bombmaster:latest

.PHONY: kubectl-apply
kubectl-apply:
	kubectl apply -f kubernetes/bombmaster.yaml

.PHONY: kubectl-restart
kubectl-restart:
	kubectl rollout restart deployment/bombmaster