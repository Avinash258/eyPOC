# Playtest — Unified Quality Engineering Framework (`qa-platform`)

Business-readable test authoring compiled onto the **Playwright** runtime, with API, contract, performance and monitoring layers in one TypeScript platform.

> Public Playtest / no-code–low-code engine sample · [Portfolio](https://avinash258.github.io/Protfolio/)

## Overview

Production-oriented quality automation platform built with **TypeScript + Node.js**. Teams author readable steps; the engine maps them onto Playwright for UI, while dedicated runners cover API, Pact contracts, smoke/regression suites and reporting.

## What it covers

- **UI / E2E** — Playwright with shared config, fixtures and utilities
- **API automation** — reusable client with retry and smoke/regression packs
- **Contract testing** — consumer + provider verification (Pact)
- **Performance & monitoring** — dedicated npm scripts for perf and monitoring runs
- **Reporting** — Allure generation and open flows
- **CI-ready** — pipelines folder for Azure / GitHub-style delivery

## Stack

| Layer | Technology |
|---|---|
| Language | TypeScript · Node.js |
| UI | Playwright |
| Contracts | Pact |
| Reporting | Allure |
| Quality | ESLint · shared configs |

## Getting started

```bash
npm install
npx playwright install
cp .env.example .env   # set environment values

npm run test:smoke
npm run test:api
npm run test:e2e
npm run test:contract
npm run test:all
```

Useful scripts: `test:regression`, `test:sanity`, `test:perf`, `allure:generate`, `allure:open`.

## Project layout

```
config/     environment & framework config
data/       test data
docs/       design notes
mocks/      stubs / fixtures
pipelines/  CI definitions
scripts/    helper scripts
tests/      UI · API · contract suites
utils/      shared clients and helpers
```

## Author

**Pushanshu Avinash Sharma** — QA Automation Architect / Lead SDET  
[GitHub](https://github.com/Avinash258) · [LinkedIn](https://www.linkedin.com/in/p-avinash-sharma-8b0203b9/) · [Portfolio](https://avinash258.github.io/Protfolio/)
