# ---------------------------------------
# Variables
# ---------------------------------------
COMPOSE_FILE := compose.yaml
SERVICE := frontend

.PHONY: all build push up down restart deploy

# Build Docker image
build:
	docker build -t sajibsv/grayson_frontend:latest .

# Push Docker image to Docker Hub
push:
	docker push sajibsv/grayson_frontend:latest

# Run using docker-compose
up:
	docker-compose -f $(COMPOSE_FILE) up

# Stop services
down:
	docker-compose -f $(COMPOSE_FILE) down

# Restart services
restart:
	$(MAKE) down
	$(MAKE) up

# Deploy (pull latest image and restart)
deploy:
	docker-compose -f $(COMPOSE_FILE) pull $(SERVICE)
	$(MAKE) restart
