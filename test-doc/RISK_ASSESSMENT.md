# Risk Assessment - Cypress Practice Project

> [!NOTE]
> This document defines the Quality Risk Management strategy and risk profiles for the **Cypress Practice Project**. It serves as an enterprise-grade QA Lead artifact mapping out risk classification, mitigation paths, testing depth models, and continuous regression gates.

---

## 1. Purpose

Risk assessment in software testing is a proactive engineering process designed to identify potential failures, security threats, and usability issues before they reach production. Analyzing risks allows the QA team to:
* **Optimize Resource Allocation:** Focus scripting and exploratory efforts on complex, high-impact business features.
* **Determine Testing Depth:** Establish clear thresholds for test density (e.g., automated regression vs. manual smoke runs).
* **Accelerate CI/CD Pipeline:** Design efficient test execution matrices (such as running smoke tests first) to ensure fast feedback.
* **Minimize Production Escapes:** Prevent high-severity bugs from reaching end users by addressing critical dependencies early.

---

## 2. Risk Assessment Methodology

We evaluate risks using a standard two-dimensional model: **Probability** (the likelihood of failure occurring) and **Impact** (the severity of the consequences to the business if it does).

```
                      RISK MATRIX MATRIX SCHEMA
  
            +-----------------------------------------------+
            |               IMPACT (1 to 5)                 |
            |      1-Negligible  3-Moderate  5-Catastrophic |
  +---------+-----------------------------------------------+
  | P (1-5) |                                               |
  | 5-High  | [Medium (5)]   [High (15)]     [Critical (25)]|
  | 3-Med   | [Low (3)]      [Medium (9)]    [High (15)]    |
  | 1-Low   | [Low (1)]      [Low (3)]       [Medium (5)]   |
  +---------+-----------------------------------------------+
```

### Risk Scales

* **Probability Scale (1 - 5):**
  1. **Very Low:** Unlikely to occur under normal system load.
  2. **Low:** Rare occurrence, typically restricted to edge cases.
  3. **Medium:** Occurs occasionally under standard operations.
  4. **High:** Frequently occurs during deployment or active use.
  5. **Very High:** Certain to occur due to volatile environment changes.

* **Impact Scale (1 - 5):**
  1. **Negligible:** Minor cosmetic issue; does not affect user flow.
  2. **Minor:** Slight functional delay or workaround exists.
  3. **Moderate:** Core feature is partially blocked or degraded.
  4. **Major:** Key business flow is completely broken (e.g., checkout fails).
  5. **Catastrophic:** Critical system failure (e.g., database loss, security breach, total downtime).

### Risk Score Calculation
The overall risk score is calculated as:
$$\text{Risk Score} = \text{Probability} \times \text{Impact}$$

### Risk Level Thresholds
* **Critical (16 - 25):** Immediate blocking issue. Requires extensive automated checking, mandatory manual verification, and pipeline gates.
* **High (10 - 15):** High exposure. Must be validated via automation scripts in daily builds.
* **Medium (5 - 9):** Moderate exposure. Covered by regression test cases or manual validation checklists.
* **Low (1 - 4):** Minimal exposure. Documented in basic test specs and validated as low priority.

---

## 3. Application Overview

The **Cypress Practice Project** validates a dual-system architecture designed for e-commerce store management and reservation logging:
1. **SauceDemo UI Portal:** A single-page web app presenting catalog navigation, active shopping carts, user authentication, and checkout forms.
2. **Restful Booker API:** A backend service handling reservation updates, deletion, token authentication, and schema compliance.

---

## 4. Business Critical Features

We map key product features to evaluate their direct impact on business operations.

| Feature Area | Business Importance | Justification / Revenue Impact |
| :--- | :---: | :--- |
| **Authentication** | High (5/5) | Blocks user entry. Unauthenticated users cannot view products or manage bookings, stopping customer traffic. |
| **Registration** | High (5/5) | Serves as the primary onboarding gate. Failures here immediately prevent new user growth. |
| **User Profile Settings** | Medium (3/5) | Allows updates to user settings and security variables. Failure degrades personalization but does not stop core checkouts. |
| **API Communication** | High (4/5) | Handles data exchanges between frontend views and servers. Network failure stops inventory and booking syncs. |
| **Data Persistence** | High (5/5) | Guarantees that checkout details and reservation updates persist. Failure leads to lost orders and account inconsistencies. |

---

## 5. Risk Matrix

The following table assesses 20 realistic risk events identified within the Cypress automation project.

| Risk ID | Feature Area | Risk Description | Probability (1-5) | Impact (1-5) | Risk Score | Risk Level |
| :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **R-01** | Authentication | **Login Failure:** Valid user credentials fail to authenticate, blocking system access. | 2 | 5 | **10** | **High** |
| **R-02** | API Testing | **API Service Downtime:** Restful Booker API goes offline, failing automated suites. | 4 | 5 | **20** | **Critical** |
| **R-03** | Security Testing | **Unauthorized Access:** Unauthenticated users bypass frontend login screens. | 2 | 5 | **10** | **High** |
| **R-04** | Data Persistence | **Data Corruption:** Database updates fail to save, corrupting booking IDs. | 2 | 5 | **10** | **High** |
| **R-05** | Form Validation | **Broken Validation:** Input fields permit special character scripts, leading to system vulnerability. | 3 | 4 | **12** | **High** |
| **R-06** | Authentication | **Remember Me Failure:** Session caching fails to persist username on page reloads. | 3 | 2 | **6** | **Medium** |
| **R-07** | Registration | **Duplicate Accounts:** Registration allows duplicate email creation, corrupting state. | 2 | 4 | **8** | **Medium** |
| **R-08** | Usability Testing | **Incorrect Error Message:** System prints backend stack traces to UI instead of standard alerts. | 3 | 2 | **6** | **Medium** |
| **R-09** | Security Testing | **Session Expiration Issues:** User session fails to invalidate after logout, leaving account open. | 2 | 4 | **8** | **Medium** |
| **R-10** | Regression Tests | **Checkout Total Mismatch:** VAT or discounts calculate incorrectly on final review pages. | 2 | 4 | **8** | **Medium** |
| **R-11** | API Testing | **Incorrect Headers:** API endpoints return data in plain text instead of JSON format. | 2 | 3 | **6** | **Medium** |
| **R-12** | Environment | **Cross-Browser Incompatibility:** Selectors break or styling fails on Firefox/Safari. | 3 | 3 | **9** | **Medium** |
| **R-13** | CI/CD Testing | **Network Latency:** Slow server response triggers Cypress pipeline timeout failures. | 4 | 3 | **12** | **High** |
| **R-14** | Form Validation | **Double Submissions:** Double-clicking checkout submit button posts duplicate records. | 3 | 4 | **12** | **High** |
| **R-15** | Security Testing | **SQL Injection (SQLi):** Database allows input strings to alter query behaviors. | 1 | 5 | **5** | **Medium** |
| **R-16** | Security Testing | **Token Exposure:** Sensitive access hashes print in clear text to console logs. | 3 | 4 | **12** | **High** |
| **R-17** | Profile Management | **Avatar Size Bypass:** Uploading a large file crashes browser session or storage. | 3 | 3 | **9** | **Medium** |
| **R-18** | Usability Testing | **Broken Link Navigation:** Footer links direct to missing 404 screens. | 2 | 2 | **4** | **Low** |
| **R-19** | API Testing | **Method Validation Failure:** Sending incorrect verbs (e.g. POST to GET route) yields 500 error. | 2 | 3 | **6** | **Medium** |
| **R-20** | API Testing | **Race Conditions:** UI updates before backend API confirmation response completes. | 3 | 4 | **12** | **High** |

---

## 6. Risk Prioritization

We group identified risk profiles to establish priority queues for development and QA sprints.

### Critical Risks (Scores 16 - 25)
* **API Service Downtime (R-02):** If backend endpoints are unresponsive, the entire application stack is unusable.
* *Rationale:* High probability because public mock endpoints are subject to network constraints, and catastrophic business impact.

### High Risks (Scores 10 - 15)
* **Login Failure (R-01), Unauthorized Access (R-03), Input Injection Vulnerability (R-05), Network Latency (R-13), Double Submissions (R-14), Token Exposure (R-16), Race Conditions (R-20).**
* *Rationale:* Direct impact on data security, checkout transactions, and CI pipeline stability. These issues lead to immediate user frustration or security leaks.

### Medium Risks (Scores 5 - 9)
* **Remember Me Failure (R-06), Duplicate Accounts (R-07), Error Format (R-08), Session Expiration (R-09), Checkout Mismatch (R-10), Header Integrity (R-11), Cross-Browser issues (R-12), SQL Injection (R-15), Avatar Size Bypass (R-17), API Method validation (R-19).**
* *Rationale:* Moderate functional impact. Workarounds exist, and issues do not block core checkout flows.

### Low Risks (Scores 1 - 4)
* **Broken Link Navigation (R-18).**
* *Rationale:* Minimal business impact. Typos or broken external links do not affect checkout or database state integrity.

---

## 7. Mitigation Strategies

We define specific prevention, mitigation, and monitoring paths for high-priority risk items.

| Risk ID & Title | Prevention Strategy | Mitigation Strategy | Monitoring Protocols |
| :--- | :--- | :--- | :--- |
| **R-02: API Downtime** | Implement robust API load balancing and design local mock services. | Use Cypress `cy.intercept()` to mock backend payloads for UI testing when endpoints are down. | Set up automated uptime monitors (e.g., Pingdom) to alert of endpoint downtime. |
| **R-01: Login Failure** | Implement unit tests on authentication modules and restrict credential updates. | Provide fallback login screens and clear steps to reset passwords. | Log authentication failure rates in monitoring tools (e.g., Datadog, Sentry). |
| **R-05: Broken Validation** | Use strict server-side validation libraries and input parsing. | Sanitize incoming strings at the gate, stripping HTML and SQL characters. | Run weekly automated dependency security vulnerability scans. |
| **R-13: Network Latency** | Optimize API database queries and utilize Content Delivery Networks (CDNs). | Configure realistic Cypress command timeouts in [cypress.config.js](cypress-practice/cypress.config.js). | Monitor pipeline build run times across releases in GitHub Actions. |
| **R-16: Token Exposure** | Mask sensitive strings in logs and restrict environment logging in production. | Clear access hashes from variables instantly when session transactions end. | Audit application console logs on pull request builds. |

---

## 8. Testing Depth Strategy

We map risk levels to specific testing approaches to optimize coverage:

| Risk Level | Testing Approach & Requirements | Coverage Scope |
| :--- | :--- | :--- |
| **Critical** | * Smoke testing on every PR commit.<br>* Comprehensive automation checking.<br>* Continuous docker verification run.<br>* Manual exploratory audits. | Complete functionality, boundary limits, API logic verification, and security sanitization. |
| **High** | * High-density automation testing.<br>* Daily CI execution regression checks.<br>* Multi-viewport validation. | Positive pathways, invalid credentials validations, and form submission checks. |
| **Medium** | * Automation validation checks.<br>* Sprint integration regression tests.<br>* Cross-browser checks. | Standard user paths, error message checks, and browser sizing. |
| **Low** | * Basic functional testing.<br>* Periodic manual checks. | General visual checks, link routing verification, and typo reviews. |

---

## 9. Risk-Based Testing Plan

Our testing effort is allocated dynamically based on the risk profile of each feature:

```
               TEST EFFORT ALLOCATION MODEL
  
  +------------------+------------------------------------+
  | Risk Classification| Execution Frequency & Method      |
  +------------------+------------------------------------+
  | Critical (20%)   | Continuous CI Runs (Automated)     |
  | High (30%)       | Daily Regression Runs (Automated)   |
  | Medium (40%)     | Weekly Regression Runs (Automated)  |
  | Low (10%)        | Ad-Hoc Manual Runs (Exploratory)   |
  +------------------+------------------------------------+
```

1. **Automated Regression Pipeline:** High and Critical risk tests are run on every pull request. If any test fails, the pipeline blocks the merge.
2. **Dynamic Mocks:** To mitigate public API downtime (R-02), UI test suites run against mock data using `cy.intercept()`. Full API integration tests are run against the real endpoint in a separate pipeline.
3. **Flakiness Controls:** To counter pipeline latency issues (R-13), we configure automatic test retries for headless builds in [cypress.config.js](cypress-practice/cypress.config.js).

---

## 10. Residual Risks

Even with thorough testing, some residual risks remain:
1. **Third-Party API Downtime:** If the public Restful Booker API experiences an outage, direct API integration tests will fail. Mocks protect UI tests, but direct endpoint validation remains vulnerable to external downtime.
2. **Local Device Discrepancies:** While Docker containers standardize the testing environment, differences in local machine performance can still cause minor execution timing variations.
3. **Dynamic Data Exhaustion:** If the dynamic data generator runs out of unique data combinations during long-term load tests, it may cause duplicate key errors in the database.

---

## 11. Recommendations

To maintain high framework stability and software quality, the QA Lead recommends:
1. **Secure Credential Storage:** Never commit credentials directly to version control. Always load configuration variables securely using `cypress.env.json` locally, or through GitHub Secrets in CI pipelines.
2. **Decouple Selectors:** Use dedicated test IDs (like `data-test`) for selector target mappings to prevent UI changes from breaking the test suite.
3. **Separate UI and API Tests:** Keep UI and API test suites decoupled. Run them in parallel inside CI pipelines using matrix runners to keep feedback loops under 3 minutes.
4. **Schedule Regular Audits:** Review console logging parameters weekly to prevent sensitive auth tokens from leaking in log files.
