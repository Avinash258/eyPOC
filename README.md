# Unified Quality Engineering Framework (`qa-platform`)

Production-ready quality automation platform built with **TypeScript + Node.js**, runnable in Cursor IDE and CI/CD.

## What this framework covers

- Contract testing (consumer + provider verification) using Pact
- API automation (GET/POST/PUT/DELETE) with reusable client + retry
- Service virtualization using WireMock stubs (200/400/500 simulation)
- Synthetic data generation using Faker + JSON/CSV exports
- E2E critical journeys with Playwright Page Object Model
- Performance shift-left smoke tests using k6 with thresholds
- Monitoring validation checks for health/status smoke
- CI/CD quality gates for PR and release pipelines
- Allure reporting integration

## Folder structure

```text
qa-platform/
│── package.json
│── tsconfig.json
│── README.md
│── .env.example
│── playwright.config.ts
│
├── config/
├── tests/
│   ├── contract/
│   ├── api/
│   ├── e2e/
│   ├── perf/
│   ├── monitoring/
│   └── unit/
├── mocks/wiremock/
├── data/
├── utils/
├── reports/
├── pipelines/
└── docs/
```

## Prerequisites

- Node.js 20 or 22 (recommended 22 LTS)
- npm 10+
- k6 installed on your machine
- Java 11+ for Allure CLI report rendering

## Setup (local)

1. Install dependencies:
   ```bash
   npm ci
   ```
2. Copy environment file:
   ```bash
   cp .env.example .env
   ```
   (PowerShell: `Copy-Item .env.example .env`)
3. Install Playwright browser:
   ```bash
   npx playwright install
   ```

## Core run commands

- Lint: `npm run lint`
- Build: `npm run build`
- Unit tests: `npm run test:unit`
- Contract tests: `npm run test:contract`
- API tests: `npm run test:api`
- E2E tests: `npm run test:e2e`
- Unified API + UI execution: `npm run test:api-ui`
- Unified API + UI smoke: `npm run test:api-ui:smoke`
- Smoke tag tests: `npm run test:smoke`
- Regression tag tests: `npm run test:regression`
- Sanity tag tests: `npm run test:sanity`
- Performance smoke: `npm run test:perf`
- Monitoring checks: `npm run test:monitoring`
- Full quality gates local: `npm run test:all`

## Protocol Samples

- GraphQL and gRPC examples are documented in `docs/graphql-grpc-samples.md`.
- Runnable samples live in `tests/unit/graphql.sample.spec.ts` and `tests/unit/grpc.sample.spec.ts`.

## Test tagging strategy

- `@smoke`: fast critical checks
- `@sanity`: targeted confidence checks
- `@regression`: broader risk coverage

## API + UI automation design

- API automation lives in `tests/api` and uses shared `ApiClient` for token/retry/reusable methods.
- UI automation lives in `tests/e2e` with Page Object Model classes in `tests/e2e/pages`.
- Hybrid journey tests combine UI and API assertions in a single flow (`critical-journeys.e2e.spec.ts`).
- Execute both layers in one command using `npm run test:api-ui`.

## AutomationExercise target design

- Default `.env.example` points to `https://automationexercise.com` for both UI and API base URLs.
- Site-specific API tests: `tests/api/automationexercise.api.spec.ts`
- Site-specific UI journeys: `tests/e2e/automationexercise.journeys.e2e.spec.ts`
- Detailed design document: `docs/automationexercise-test-design.md`

## Contract testing flow

1. `tests/contract/consumer.pact.spec.ts` creates a consumer pact file.
2. `tests/contract/provider.verification.spec.ts` verifies provider compatibility.
3. Provider verification fails automatically if breaking contract changes are detected.
4. Contract tests require Node.js 20/22 runtime (`npm run test:contract` blocks Node 24+ with a clear message).

## Service virtualization flow (WireMock)

Sample stubs under `mocks/wiremock/mappings`:
- `users-success.json` -> 200
- `users-bad-request.json` -> 400
- `users-server-error.json` -> 500

Run WireMock locally:

```bash
docker run --rm -it -p 8080:8080 -v ${PWD}/mocks/wiremock:/home/wiremock wiremock/wiremock:3.6.0
```

## Synthetic data generation

Generate dynamic user datasets:

```bash
npm run data:generate
```

Exports:
- `data/payloads/users.json`
- `data/payloads/users.csv`

## Performance quality gate

`tests/perf/smoke.k6.js` includes thresholds:
- `p95 < 2000 ms`
- low failed request rate

Pipeline fails if threshold is breached.

## Monitoring validation

`tests/monitoring/health.monitoring.spec.ts` checks health and deployment status endpoints as a post-deployment smoke stage.

## Reporting (Allure)

1. Generate results by executing Playwright test suites.
2. Build report:
   ```bash
   npm run allure:generate
   ```
3. Open report:
   ```bash
   npm run allure:open
   ```

## CI/CD quality gates

### PR gates

- lint
- unit
- contract
- api smoke

### Release gates

- regression
- perf smoke
- monitoring checks

Both pipeline examples are available:
- `pipelines/github-actions.yml`
- `pipelines/azure-pipeline.yml`

## Enterprise usage guidance

- Integrate secrets using environment variable groups or vaults in CI.
- Keep external system tokens out of source control; use `.env` for local only.
- Scale test runs by splitting tags/projects across parallel jobs.
- Publish Allure artifacts after each pipeline execution.
