# Playtest Ã¢â‚¬â€ Unified Quality Engineering Framework (`qa-platform`)

Business-readable test authoring compiled onto the **Playwright** runtime, with API, contract, performance and monitoring layers in one TypeScript platform.

> Public Playtest / no-codeÃ¢â‚¬â€œlow-code engine sample Ã‚Â· [Portfolio](https://avinash258.github.io/portfolio/)

## Overview

Production-oriented quality automation platform built with **TypeScript + Node.js**. Teams author readable steps; the engine maps them onto Playwright for UI, while dedicated runners cover API, Pact contracts, smoke/regression suites and reporting.

## What it covers

- **UI / E2E** Ã¢â‚¬â€ Playwright with shared config, fixtures and utilities
- **API automation** Ã¢â‚¬â€ reusable client with retry and smoke/regression packs
- **Contract testing** Ã¢â‚¬â€ consumer + provider verification (Pact)
- **Performance & monitoring** Ã¢â‚¬â€ dedicated npm scripts for perf and monitoring runs
- **Reporting** Ã¢â‚¬â€ Allure generation and open flows
- **CI-ready** Ã¢â‚¬â€ pipelines folder for Azure / GitHub-style delivery

## Stack

| Layer | Technology |
|---|---|
| Language | TypeScript Ã‚Â· Node.js |
| UI | Playwright |
| Contracts | Pact |
| Reporting | Allure |
| Quality | ESLint Ã‚Â· shared configs |

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
tests/      UI Ã‚Â· API Ã‚Â· contract suites
utils/      shared clients and helpers
```

## Author

**Avinash Sharma** Ã¢â‚¬â€ QA Automation Architect / Lead SDET  
[GitHub](https://github.com/Avinash258) Ã‚Â· [LinkedIn](https://www.linkedin.com/in/p-avinash-sharma-8b0203b9/) Ã‚Â· [Portfolio](https://avinash258.github.io/portfolio/)
