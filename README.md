# ADMIN DASHBOARD: Continuous Integration and Deployment Pipeline

## Tools
Github, Docker, Jenkins, and Kubernetes.

## Table of Contents

- [Installation](#Installation)
- [Docker](#Docker)
- [Dockerhub](#Dockerhub)
- [Jenkins](#Jenkins)
- [Kubernetes](#Kubernetes)

## Installation

```
git clone https://github.com/anisossss/admin-dashboard-CI-CD-integration
npm i
```

## Docker
build docker image 
```
docker build -t project .
```
run docker container locally
```
docker run -p 8084:8084 project
```

## Dockerhub
Get login credentials to set up Jenkins pipeline
```

## Jenkins

```
pipeline {
    agent any
    triggers { pollSCM('*/5 * * * *') #HERE
    }
    environment {
        DOCKERHUB_CREDENTIALS = credentials('dh_cred')

    }
```

## Kubernetes

```
kubectl apply -f back-deployment.yaml --context minikube
kubectl apply -f services.yaml
```
verify deployment services and status
```
kubectl get deployments
kubectl get services
```