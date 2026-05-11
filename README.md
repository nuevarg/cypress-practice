# Cypress Practice

A scalable Cypress automation testing practice project using:

- Cypress
- Docker
- Docker Compose
- Mochawesome Reporter

Designed for:
- QA Automation learning
- Portfolio projects
- CI/CD preparation
- Dockerized test execution
- Cross-machine consistency

---

# Repository

GitHub Repository:

https://github.com/nuevarg/cypress-practice

> Important:
> This repository uses `master` as the main branch instead of `main`.

---

# Tech Stack

| Tool | Purpose |
|---|---|
| Cypress | End-to-end automation testing |
| Docker | Containerized execution |
| Docker Compose | Service orchestration |
| Node.js | JavaScript runtime |
| npm | Package management |
| Mochawesome Reporter | Test reporting |

---

# Prerequisites

Install these first before starting.

---

## 1. Install Git

https://git-scm.com/download/win

Verify installation:

```bash
git --version
```

---

## 2. Install Node.js (LTS Recommended)

https://nodejs.org/

Verify installation:

```bash
node -v
npm -v
```

---

## 3. Install Docker Desktop

https://www.docker.com/products/docker-desktop/

Recommended settings:
- Enable WSL2
- Enable virtualization support

Verify installation:

```bash
docker --version
docker compose version
```

---

# Clone Project

```bash
git clone https://github.com/nuevarg/cypress-practice.git
```

Enter project directory:

```bash
cd cypress-practice
```

---

# Initial Setup

Install all dependencies and build Docker container:

```bash
npm run setup
```

This command will:
- install npm dependencies
- install Cypress
- build Docker image

---

# Available Scripts

| Command | Purpose |
|---|---|
| npm run setup | Install dependencies + build Docker |
| npm run test | Open Cypress UI |
| npm run test-run | Run Cypress headless |
| npm run test-all | Run all specs in Electron |
| npm run docker:build | Build Docker container |
| npm run docker:up | Run Cypress inside Docker |

---

# Running Cypress Locally

## Open Interactive Cypress UI

```bash
npm run test
```

Equivalent to:

```bash
npx cypress open
```

Recommended for:
- writing tests
- debugging
- inspecting selectors
- watching execution live

---

# Running Cypress Headless

```bash
npm run test-run
```

Equivalent to:

```bash
npx cypress run
```

Recommended for:
- quick execution
- CI pipelines
- regression runs

---

# Running All Specs

```bash
npm run test-all
```

This runs:
- all specs
- using Electron browser

---

# Docker Usage

---

## Build Docker Image

```bash
npm run docker:build
```

---

## Run Cypress Inside Docker

```bash
npm run docker:up
```

This executes Cypress inside the Docker container.

Recommended for:
- consistent execution
- CI/CD pipelines
- shared environments
- regression testing

---

# Recommended Workflow

| Activity | Recommended Method |
|---|---|
| Writing/debugging tests | Local Cypress UI |
| Regression execution | Docker |
| CI/CD execution | Docker |
| Interactive debugging | Local execution |

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

# Common Issues & Solutions

---

## Docker Desktop Stuck Starting

Possible causes:
- virtualization disabled
- WSL2 issue
- Hyper-V disabled

### Solution

Enable virtualization in BIOS:

- AMD → SVM Mode
- Intel → VT-x

Then run:

```powershell
wsl --update
```

Restart Docker Desktop.

---

## Cypress Installation Failed

Possible causes:
- antivirus
- firewall
- proxy

### Solution

Delete:

```text
node_modules
package-lock.json
```

Then reinstall:

```bash
npm install
```

---

## Permission Error (EPERM)

Close:
- VS Code
- File Explorer windows
- Cypress

Then retry:

```bash
npm install
```

---

## Docker Build Very Slow on Windows

Windows filesystem can slow Docker volume mounting.

Recommended:
Store project inside WSL filesystem instead of `C:\Users\...`

Example:

```text
\\wsl$\Ubuntu\home\username\projects
```

This significantly improves Docker performance.

---

# Reporting

Current reporting tool:
- cypress-mochawesome-reporter

Future planned improvements:
- Allure Report
- GitHub Actions CI
- Parallel execution
- Multi-browser testing
- Retry strategies
- Visual testing

---

# Git Workflow

## Commit Changes

```bash
git add .
git commit -m "your message"
git push origin master
```

---

# Notes

- Local Cypress UI is recommended for development.
- Docker execution is recommended for stable automated execution.
- This repository is intended as a scalable QA automation practice framework.