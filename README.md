# Cypress Practice

A Cypress end-to-end automation practice project for testing the Sauce Demo web application.

Target application:

https://www.saucedemo.com/

This repository is designed for:

- QA automation learning
- Cypress practice
- Portfolio demonstration
- Dockerized test execution
- CI/CD preparation
- Cross-machine consistency

> Important: this repository uses `master` as the main branch.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Cypress | End-to-end UI automation testing |
| Docker | Containerized test execution |
| Docker Compose | Docker service orchestration |
| Node.js | JavaScript runtime |
| npm | Package management |
| cypress-mochawesome-reporter | HTML/JSON test reporting |

---

## Current Test Coverage

The current Cypress suite focuses on the Sauce Demo UI login flow.

Current spec:

```text
cypress/e2e/ui_login.cy.js
```

Covered scenarios:

- Login page elements are visible
- User can log in successfully
- User can log out successfully
- URL is validated after login and logout
- Inventory page title is validated after login

The test suite currently uses:

- Page Object style selector files
- Cypress custom commands
- Environment-based credentials
- Screenshots after each test
- Mochawesome HTML/JSON reports
- Docker execution support

---

## Project Structure

```text
cypress-practice/
│
├── cypress/
│   ├── e2e/
│   │   └── ui_login.cy.js
│   │
│   ├── fixtures/
│   │
│   ├── page/
│   │   ├── burgerMenu.js
│   │   ├── inventoryPage.js
│   │   └── loginPage.js
│   │
│   └── support/
│       ├── commands.js
│       └── e2e.js
│
├── cypress.env.example.json
├── cypress.config.js
├── docker-compose.yml
├── Dockerfile
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## Prerequisites

Install these before running the project.

### 1. Git

https://git-scm.com/downloads

Verify:

```bash
git --version
```

### 2. Node.js LTS

https://nodejs.org/

Verify:

```bash
node -v
npm -v
```

### 3. Docker Desktop

https://www.docker.com/products/docker-desktop/

Recommended for Windows:

- Enable WSL2
- Enable virtualization support from BIOS
- Make sure Docker Desktop is running before using Docker commands

Verify:

```bash
docker --version
docker compose version
```

---

## Clone Repository

```bash
git clone https://github.com/nuevarg/cypress-practice.git
cd cypress-practice
```

---

## Environment Variables

This project uses `cypress.env.json` for login credentials.

The real credential file is ignored by Git and should not be committed.

### 1. Copy the example env file

```bash
cp cypress.env.example.json cypress.env.json
```

On Windows PowerShell:

```powershell
Copy-Item cypress.env.example.json cypress.env.json
```

### 2. Update `cypress.env.json`

For Sauce Demo, you can use one of the usernames displayed on the login page.

Example:

```json
{
  "username": "standard_user",
  "password": "secret_sauce"
}
```

The example file should stay committed:

```text
cypress.env.example.json
```

The real file should stay ignored:

```text
cypress.env.json
```

---

## Initial Setup

Install npm dependencies and build the Docker image:

```bash
npm run setup
```

This runs:

```bash
npm install && docker compose build
```

If Docker is not installed or not running yet, use:

```bash
npm install
```

Then build Docker later:

```bash
npm run docker:build
```

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run setup` | Install npm dependencies and build Docker image |
| `npm run test` | Open Cypress UI locally |
| `npm run test-run` | Run Cypress headless locally |
| `npm run test-all` | Run all specs in Electron |
| `npm run docker:build` | Build Docker image |
| `npm run docker:up` | Run Cypress inside Docker |

Scripts are defined in `package.json`.

---

## Running Tests Locally

### Open Cypress UI

```bash
npm run test
```

Use this for:

- writing tests
- debugging selectors
- watching the browser execution
- using Cypress time-travel snapshots

### Run Headless

```bash
npm run test-run
```

Use this for:

- fast local validation
- regression checks
- CI-style execution

### Run All Specs in Electron

```bash
npm run test-all
```

---

## Running Tests with Docker

### Build Docker Image

```bash
npm run docker:build
```

### Run Cypress in Docker

```bash
npm run docker:up
```

Docker is recommended for:

- consistent execution
- CI/CD pipelines
- shared environments
- regression testing

For daily test writing and debugging, local Cypress UI is still the most convenient option.

---

## Test Reports

This project uses `cypress-mochawesome-reporter`.

Reports are generated in:

```text
cypress/reports/
```

The report filename and report page title include a timestamp from the test execution time.

Example:

```text
automation-report-2026-05-12T07-30-15-000Z.html
```

Report artifacts are ignored by Git to keep the repository clean.

---

## Screenshots and Videos

Current behavior:

- Cypress video recording is enabled
- Screenshots are captured after each test using `cy.screenshot("test-complete")`
- Mochawesome reporter is configured to embed screenshots and inline assets

Artifacts are ignored by Git:

```text
cypress/screenshots/
cypress/videos/
cypress/reports/
```

---

## Cypress Environment Warning

The current project uses `Cypress.env()` to read values from `cypress.env.json`.

Because of this, `allowCypressEnv` is currently enabled in `cypress.config.js`.

Important notes:

- Do not commit `cypress.env.json`
- Do not expose sensitive values inside application code
- Use this setup only for test credentials/configuration
- For a real production-grade setup, credentials should be injected through CI/CD secrets

---

## Current Cypress Architecture

### Page Object Selector Files

Selectors are stored separately under:

```text
cypress/page/
```

Current page files:

```text
burgerMenu.js
inventoryPage.js
loginPage.js
```

This keeps selectors away from test logic and makes future maintenance easier.

### Custom Commands

Reusable flows are stored in:

```text
cypress/support/commands.js
```

Current custom commands:

```js
cy.login()
cy.logout()
```

This keeps specs cleaner and avoids repeating login/logout steps across multiple tests.

---

## Recommended Workflow

| Activity | Recommended Method |
|---|---|
| Writing/debugging tests | `npm run test` |
| Quick headless local run | `npm run test-run` |
| Full local spec run | `npm run test-all` |
| Stable regression run | Docker |
| CI/CD execution | Docker |

---

## Common Issues and Solutions

### Docker Desktop is not running

Start Docker Desktop, wait until the engine is ready, then retry:

```bash
npm run docker:build
```

### Docker build is slow on Windows

Docker volume performance can be slower when the project is stored under:

```text
C:\Users\...
```

For better performance, store the project inside the WSL filesystem, for example:

```text
\\wsl$\Ubuntu\home\username\projects
```

### Cypress install failed

Possible causes:

- antivirus interference
- firewall/proxy issue
- corrupted install

Try:

```bash
rm -rf node_modules package-lock.json
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

### `cypress.env.json` is missing

Create it from the example file:

```bash
cp cypress.env.example.json cypress.env.json
```

Then fill in the credentials.

### Login test fails

Check:

- `cypress.env.json` exists
- username is valid for Sauce Demo
- password is `secret_sauce`
- Sauce Demo is reachable in the browser

---

## Suggested Next Improvements

Recommended next improvements for this repository:

1. Move the Sauce Demo base URL into `cypress.config.js` using `baseUrl`
2. Replace hardcoded URLs in specs with `cy.visit("/")`
3. Add URL constants to page objects, such as `/inventory.html`
4. Improve custom commands to read credentials at execution time instead of module load time
5. Add negative login test cases, such as locked user and invalid password
6. Add GitHub Actions CI workflow
7. Upload Mochawesome reports as CI artifacts
8. Add Allure Report later for richer step-level reporting
9. Add API-level setup helpers where useful
10. Add linting/formatting with ESLint and Prettier

---

## Git Workflow

Commit changes to the `master` branch:

```bash
git add .
git commit -m "your message"
git push origin master
```

---

## Notes

- This repository is a Cypress automation practice project.
- The tested application is Sauce Demo: https://www.saucedemo.com/
- Local Cypress UI is recommended for development.
- Docker execution is recommended for stable automated runs.
- `master` is used as the main branch for this repository.
