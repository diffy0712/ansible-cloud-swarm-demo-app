# Ansible Cloud Swarm Demo App

A sample demo html boilerplate with deployment automation using ansible.

This project contains:
    - Simple html, sass and typescript workflow with webpack bundler configured for development and production builds
    - Dockerfile to build production docker image to deploy
    - Ansible playbook to deploy the production docker image to the cloud.

> To deploy to your cloud create a host file in `.devops/deployment/host_vars` using the defaut.yml as an example