# Enterprise Deployment Guide - SolveX AI

This document provides instructions for deploying SolveX AI to production environments using **Docker**, **Kubernetes**, and **Microsoft Azure**.

---

## 1. Docker Compose Production Deployment

### `docker-compose.yml`

```yaml
version: '3.8'

services:
  solvex-web:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
      - VITE_API_URL=https://api.solvex.ai
    restart: always

  neo4j-graph:
    image: neo4j:5.12-enterprise
    ports:
      - "7474:7474"
      - "7687:7687"
    environment:
      - NEO4J_AUTH=neo4j/SolveXEnterprise2026!
      - NEO4J_ACCEPT_LICENSE_AGREEMENT=yes

  redis-cache:
    image: redis:7.0-alpine
    ports:
      - "6379:6379"
```

---

## 2. Microsoft Azure Deployment Steps

### Step 1: Login to Azure CLI
```bash
az login
az group create --name SolveX-AI-Prod-RG --location eastus
```

### Step 2: Build & Push Container Image to Azure Container Registry (ACR)
```bash
az acr create --resource-group SolveX-AI-Prod-RG --name solvexregistry --sku Premium
az acr login --name solvexregistry
docker build -t solvexregistry.azurecr.io/solvex-web:latest .
docker push solvexregistry.azurecr.io/solvex-web:latest
```

### Step 3: Deploy to Azure App Service
```bash
az appservice plan create --name SolveX-Plan --resource-group SolveX-AI-Prod-RG --sku P1v2 --is-linux
az webapp create --resource-group SolveX-AI-Prod-RG --plan SolveX-Plan --name solvex-ai-app --deployment-container-image-name solvexregistry.azurecr.io/solvex-web:latest
```
