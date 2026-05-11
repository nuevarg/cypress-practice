# Cypress Practice

A professional-ready Cypress automation testing starter project using:

* Cypress
* Docker
* Docker Compose
* Node.js
* GitHub

Designed for:

* QA Automation practice
* Portfolio projects
* CI/CD preparation
* Cross-machine consistency
* Future scalability

---

# Tech Stack

| Tool           | Purpose                       |
| -------------- | ----------------------------- |
| Cypress        | End-to-end automation testing |
| Docker         | Environment consistency       |
| Docker Compose | Container orchestration       |
| Node.js        | JavaScript runtime            |
| npm            | Dependency management         |

---

# Recommended Environment

## Windows

Recommended:

* Windows 10/11
* WSL2 enabled
* Docker Desktop installed

## Required Software

### 1. Install Git

[https://git-scm.com/download/win](https://git-scm.com/download/win)

Verify:

```bash
git --version
```

---

### 2. Install Node.js (LTS)

[https://nodejs.org/](https://nodejs.org/)

Verify:

```bash
node -v
npm -v
```

---

### 3. Install Docker Desktop

[https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

During installation:

* Enable WSL2
* Enable virtualization support

Verify:

```bash
docker --version
docker compose version
```

---

# Project Setup

## 1. Clone Repository

```bash
git clone https://github.com/nuevarg/cypress-practice.git
```

Enter project:

```bash
cd cypress-practice
```

---

# Install Dependencies

## Install Everything

```bash
npm install
```

This installs:

* Cypress
* Reporting dependencies
* Project packages
* All required npm dependencies

You DO NOT need to install packages one-by-one.

---

# Start Cypress Locally

## Interactive UI Mode

```bash
npm run cy:open
```

OR:

```bash
npx cypress open
```

---

## Headless Mode

```bash
npm run cy:run
```

OR:

```bash
npx cypress run
```

---

# Docker Setup

## Build Docker Container

```bash
docker compose build
```

---

## Run Cypress Inside Docker

```bash
docker compose up
```

This runs Cypress in headless mode inside the container.

---

# Run Cypress UI Through Docker

GUI mode through Docker is possible but NOT recommended on Windows because it requires:

* X11 forwarding
* WSL display server
* DISPLAY environment setup
* Additional Linux GUI dependencies

Recommended approach:

| Usage                   | Recommended Method |
| ----------------------- | ------------------ |
| Writing/debugging tests | Local Cypress UI   |
| Stable execution / CI   | Docker             |
| Automated regression    | Docker             |

---

# Suggested Workflow

## Local Development

Use:

```bash
npm run cy:open
```

For:

* debugging
* writing tests
* inspecting selectors
* watching execution live

---

## Docker Execution

Use:

```bash
docker compose up
```

For:

* stable runs
* CI/CD
* regression tests
* shared execution environments

---

# Project Structure

```text
cypress-practice/
│
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   ├── support/
│
├── reports/
├── screenshots/
├── videos/
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── cypress.config.js
└── README.md
```

---

# Common Problems & Solutions

## Docker Desktop Not Starting

### Possible Causes

* Virtualization disabled
* WSL2 issue
* Hyper-V disabled

### Solutions

Enable virtualization in BIOS:

* AMD: SVM Mode
* Intel: VT-x

Then:

```powershell
wsl --update
```

Restart Docker Desktop.

---

## Cypress Failed to Install

### Possible Causes

* Antivirus
* Proxy
* Firewall

### Solution

Delete:

```text
node_modules
package-lock.json
```

Then:

```bash
npm install
```

---

## Docker Build Very Slow on Windows

Recommended:
Store project inside WSL filesystem.

Instead of:

```text
C:\Users\...
```

Use:

```text
\\wsl$\Ubuntu\home\username\projects
```

This significantly improves Docker performance.

---

## Permission Errors (EPERM)

Close:

* VS Code
* File Explorer windows
* Cypress

Then:

```bash
npm install
```

---

# Future Improvements

Planned future additions:

* Allure Report
* GitHub Actions CI
* Multi-browser execution
* Parallel execution
* Retry strategies
* API testing
* Environment configs
* Visual testing
* Page Object Model

---

# Git Commands

## Commit Changes

```bash
git add .
git commit -m "your message"
git push origin master
```

---

# Useful Commands

| Command                | Purpose               |
| ---------------------- | --------------------- |
| npm install            | Install dependencies  |
| npm run cy:open        | Open Cypress UI       |
| npm run cy:run         | Run Cypress headless  |
| docker compose build   | Build Docker image    |
| docker compose up      | Run Cypress in Docker |
| docker system prune -a | Clean Docker cache    |

---

# Notes

* Local Cypress UI is recommended for development.
* Docker execution is recommended for CI/CD and stable regression runs.
* This repository is intended as a scalable QA automation practice project.
