# AutomationExercise Test Design

## Target Under Test

- UI: `https://automationexercise.com/`
- API: `https://automationexercise.com/api/*`

## Scope

1. Core navigation and commerce paths
2. Basic API availability checks
3. Contract/schema checks for stable endpoints
4. Smoke/regression/sanity test split

## UI Design (Playwright)

### Smoke

- Home page loads and top nav items are visible
- Products page opens from Home
- Product search returns expected item (example: "Blue Top")

### Regression

- Add item to cart from products list
- Open cart and validate line item area
- Category/brand filtering behavior

### Sanity

- Signup/Login page is reachable
- Contact us page reachable
- Subscription block is visible in footer

## API Design

### Smoke

- `GET /api/productsList` returns service response

### Sanity

- `GET /api/brandsList` returns service response

### Regression (next iteration)

- Add strict JSON schema assertions per endpoint
- Add negative method checks and expected error contracts

## Contract Strategy

- Consumer pact from UI/API client expectations (product list model, brand model)
- Provider verification against deployed API
- Build fails on drift or breaking field changes

## Data Strategy

- Use Faker for search terms/user identities for signup tests
- Keep deterministic data set for smoke tests (`Blue Top`)
- Export generated data to JSON/CSV before full regression

## CI Quality Gate Mapping

- PR: lint + unit + API smoke + UI smoke
- Release: API/UI regression + perf smoke + monitoring smoke

## Execution Commands

- API + UI smoke: `npm run test:api-ui:smoke`
- API + UI complete: `npm run test:api-ui`
