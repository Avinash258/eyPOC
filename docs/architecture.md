# Unified Quality Engineering Framework Architecture

## Layers

1. **Contract Layer**: Pact consumer/provider verification in `tests/contract`.
2. **API Layer**: Reusable HTTP client and schema-ready validations in `tests/api`.
3. **E2E Layer**: Playwright Page Object Model and business journeys in `tests/e2e`.
4. **Virtualization Layer**: WireMock stubs in `mocks/wiremock`.
5. **Performance Layer**: Shift-left k6 smoke performance checks in `tests/perf`.
6. **Monitoring Layer**: Deployment health and status validations in `tests/monitoring`.

## Design Principles

- Clean architecture by separating configuration, core utilities, and test suites.
- SOLID-oriented helper modules (`retry`, `logger`, `api-client`) with single responsibility.
- Environment-driven execution through `.env`.
- CI/CD quality gates enforce fail-fast behavior on critical quality signals.
