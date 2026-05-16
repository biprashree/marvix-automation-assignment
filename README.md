# Marvix Playwright Automation Assignment

## Overview

This project automates core Airbnb user flows using Playwright with TypeScript.

Implemented scenarios:

- Scenario A: Login flow evaluation with documented automation constraints
- Scenario B: Search flow and host extraction

The framework follows the Page Object Model (POM) approach for better maintainability and scalability.

# Tech Stack

- Playwright
- TypeScript
- Node.js

# Project Structure

```bash
marvix-playwright-assignment/
│
├── pages/
│   └── SearchPage.ts
│
├── tests/
│   └── search/
│       └── search.spec.ts
│
├── playwright.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

# Installation

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

# Running the Tests

Run all tests:

```bash
npx playwright test
```

Run tests in headed mode:

```bash
npx playwright test --headed
```

Run a specific test file:

```bash
npx playwright test tests/search/search.spec.ts --headed
```

# Scenarios Covered

## Scenario A: Login Flow

- Open Airbnb homepage
- Navigate login flow
- Validate authenticated session

### Important Note

Automated login was intentionally skipped because Airbnb and Google aggressively block automated authentication attempts using:

- CAPTCHA
- OTP verification
- Anti bot detection
- Device fingerprinting

Instead of bypassing security protections, the framework documents the limitation clearly and focuses on maintainable automation design.

## Scenario B: Search Flow

- Search for a one night stay in Mumbai
- Open the first property listing
- Extract host name
- Validate host name presence

# Assumptions Made

- Airbnb UI structure may change frequently due to dynamic rendering and A/B testing.
- Search results are publicly accessible without login.
- Host information is available on the property details page.
- Tests are executed on Chromium browser.

# Tradeoffs and Limitations

## 1. Login Automation

Full login automation was not implemented because Airbnb actively prevents automated authentication.

Tradeoff:
- Prioritized framework quality and realistic automation practices over bypassing security systems.

## 2. Dynamic UI Elements

Airbnb frequently shows:
- promotional modals
- login popups
- marketing overlays

These can interfere with automation.

Mitigation:
- Added reusable popup dismissal handling.

## 3. Selector Stability

Some Airbnb locators are dynamically generated and may occasionally change.

Mitigation:
- Used semantic locators where possible.
- Avoided brittle XPath selectors.

## 4. Search Rendering Delays

Search results occasionally load slowly depending on network and Airbnb rendering behavior.

Mitigation:
- Relied on Playwright waits and visibility assertions instead of excessive fixed timeouts.

# What I Would Improve With More Time

## 1. Cross Browser Coverage

Add support for:
- Firefox
- WebKit
- Mobile emulation

## 2. Authentication Strategy

Implement:
- reusable authenticated storage state
- session refresh handling
- secure credential management using environment variables

## 3. Better Reporting

Integrate:
- Allure reports
- HTML reporting enhancements
- screenshots and video attachments in CI

## 4. CI & CD Integration

Add:
- GitHub Actions workflow
- automated test execution pipeline
- parallel execution strategy

## 5. Data Driven Testing

Parameterize:
- destinations
- dates
- guest counts
- listing validations

## 6. Resilience Improvements

Add:
- retry safe popup handling
- more robust fallback locators
- network request monitoring

# Design Decisions

- Used Page Object Model for clean separation of concerns.
- Kept business logic inside page classes.
- Used Playwright assertions for reliable synchronization.
- Added reusable popup handling to stabilize tests.
- Focused on readability and maintainability.

# Notes

This project intentionally prioritizes:
- clean automation architecture
- maintainability
- realistic testing practices
- handling real world UI instability
  over bypassing Airbnb’s security mechanisms.