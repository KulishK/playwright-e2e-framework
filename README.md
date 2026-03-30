# Playwright E2E Framework

A robust, production-grade End-to-End automation framework built with Playwright and TypeScript, designed specifically for scalability and reliability when testing complex web applications.

## 🚀 Tech Stack
- **Framework:** [Playwright](https://playwright.dev/)
- **Language:** TypeScript
- **Runtime:** Node.js (v20+)
- **CI/CD:** GitHub Actions
- **Reporting:** Playwright HTML Reporter & Allure Reporter

## 📁 Folder Structure

```
playwright-e2e-framework/
├── .github/workflows/      # CI/CD pipelines
├── config/                 # Environment specific configurations
│   └── env.ts              # Loader for URLs, credentials logic
├── fixtures/               # Playwright test custom fixtures
│   └── baseTest.ts         # Injects Page Object classes
├── pages/                  # Page Object Model (POM) layer
│   └── LoginPage.ts
│   └── DashboardPage.ts
├── tests/                  # E2E Test specifications
│   └── login.spec.ts
│   └── dashboard.spec.ts
├── utils/                  # Reusable scripts and helpers
│   ├── helpers.ts          # Pure logic (strings, APIs, screen)
│   └── testData.ts         # Static test data isolation
├── playwright.config.ts    # Core framework settings
└── package.json            # Scripts & dependencies
```

## 🛠 Features & Architecture

This repository showcases advanced QA Engineering practices:

1. **Page Object Model (POM) + Dependency Injection:** Page elements and actions are encapsulated within the `pages/` directory. Rather than manually instantiating these pages in every block, Playwright Custom Fixtures (`fixtures/baseTest.ts`) inject these objects seamlessly into `test()` definitions.
2. **Selector Strategy:** Standardized around Playwright's specific semantic locator functions (e.g., `.getByTestId()`, `hasText`) coupled with explicit `data-testid` attributes. This insulates tests from fragile CSS changes and heavily aids frontend refactors.
3. **Flakiness Handling & Stability:**
   - Strict avoidance of arbitrary `.waitForTimeout()` calls.
   - Built-in Playwright auto-waiting algorithm for element actionability.
   - Intelligent automatic retries (Configured for 2 retries inside `playwright.config.ts` running strictly *only* on CI to reduce local noise). 
   - State isolation: Each test gets a completely clean, isolated Browser Context.
4. **Data Isolation:** `utils/testData.ts` enforces that hardcoded text values (usernames, validation strings) don't litter test files, enabling rapid maintenance when copy/content changes occur.
5. **Cross-Environment Execution:** Use `.env` coupled with `cross-env` inside the `package.json` to effortlessly switch targets (Dev / Staging) using `npm run test:dev`.

## 🧠 React QA & Autonomy Mindset

This repository is designed with a "React-first" testing mentality, explicitly showcasing how to **move quickly, work autonomously, and identify gaps**:

* **Edge Case Coverage:** See `tests/dashboard.spec.ts` for an example of proactively intercepting network requests (`page.route()`) to simulate `500 Internal Server Errors`. This proves the UI gracefully handles API failure states (a common gap in standard E2E suites).
* **Gap Analysis Strategy:** The `docs/TEST_STRATEGY.md` file outlines the definitive methodology for identifying coverage gaps, verifying state transitions (`useState`, `useEffect`), and prioritizing testing pipelines without constant management oversight.
* **AI-Assisted Test Generation:** To scale test creation rapidly across hundreds of workflows, the architecture is deliberately modular. Common functions are cleanly exported so that internal AI code-assistants (like `claude-code`) can instantly generate new test specs without hallucinations or rewriting boilerplate.

## ⚙️ How to Setup & Run

### 1. Installation
Clone the repo and install dependencies:
```bash
npm install
npx playwright install --with-deps
```

### 2. Available Scripts
- `npm run test`: Run tests headlessly (Staging default)
- `npm run test:ui`: Run tests in Playwright's interactive UI mode
- `npm run test:dev`: Run pointing to Dev environment
- `npm run report`: Open standard HTML report
- `npm run lint`: Lint TypeScript files

### 3. Allure Reporting
Playwright produces Allure-compatible outputs.
```bash
# Output results to an allure server
npm run allure:generate
npm run allure:open
```

## ☁️ CI/CD Execution Strategy

The `.github/workflows/playwright.yml` handles CI logic. Key benefits of this pipeline:
- **Parallelism:** Tests are aggressively chunked automatically across available workers.
- **Trace Viewer Retention:** Traces / Videos are retained specifically on *failure* in `playwright.config.ts`. In CI, they are bundled in the uploaded Github Artifacts for immediate debugging of fragile pipelines.
- **Workflow Dispatch:** QA can manually run standard regressions with parameterized environments from the GitHub UI avoiding developer intervention.
