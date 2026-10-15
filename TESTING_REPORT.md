# Testing Report

Run these after configuring `.env.local` and again on the live URL.

- [ ] `npm run build` completes without errors.
- [ ] `/api/health` returns `status: ok` and both configuration flags are true.
- [ ] “What services do you offer?” returns the supported categories.
- [ ] A follow-up such as “Which mobile frameworks?” returns React Native and Flutter.
- [ ] A price request does not invent a number and recommends discovery/contact.
- [ ] An SLA/support-hours question says those terms require confirmation.
- [ ] An unrelated or unknown company claim is not presented as fact.
- [ ] Prompt-injection text does not reveal instructions, secrets or override grounding.
- [ ] Empty chat text cannot be submitted.
- [ ] Enquiry form rejects invalid email, phone and short description.
- [ ] Enquiry form cannot submit without consent.
- [ ] Valid enquiry is inserted into Supabase `leads`.
- [ ] API keys are absent from browser source and Git history.
- [ ] Restart clears visible conversation.
- [ ] Layout works at 360 px mobile width and desktop width.
- [ ] Production Vercel URL is publicly reachable.

Record tester, date, browser, result and screenshots before submission.


## AI Validation Status

AI response validation is temporarily blocked because the configured
OpenAI API project has no remaining API credits.

Observed result:

- The chatbot frontend loaded successfully.
- The `/api/chat` route was reached successfully.
- The OpenAI API key was recognized.
- The provider returned HTTP 429.
- Error type: `insufficient_quota`.
- Error code: `credit_balance_exhausted`.
- The website displayed its safe temporary-unavailability message.
- No credential was displayed in the browser.

Pending tests:

- Grounded company-service responses
- Multi-turn conversation context
- Pricing-refusal behaviour
- SLA and unsupported-claim safeguards
- Prompt-injection resistance
- Unknown-question handling

Required action:

Add API credits or configure an authorized funded API project, restart
the application, and repeat Step 6 before final production approval.



# Testing Report

## Build and Configuration

- [x] `npm install` completes successfully.
- [x] `npm run build` completes without errors.
- [x] The production application starts successfully.
- [x] `/api/health` returns `status: ok`.
- [x] `/api/health` returns `aiConfigured: true`.
- [x] `/api/health` returns `databaseConfigured: true`.

## Interface Testing

- [x] The welcome message appears correctly.
- [x] Empty chat input cannot be submitted.
- [x] Whitespace-only chat input cannot be submitted.
- [x] Loading feedback appears during a chat request.
- [x] Restart clears the visible conversation.
- [x] Desktop layout displays correctly.
- [x] Mobile layout displays correctly.
- [x] The enquiry modal opens and closes correctly.

## Lead Form Testing

- [x] Required fields are enforced.
- [x] Invalid email is rejected.
- [x] Invalid phone input is rejected.
- [x] Short project description is rejected.
- [x] Consent is mandatory.
- [x] A valid local enquiry is inserted into Supabase.
- [x] A valid production enquiry is inserted into Supabase.
- [x] Stored records contain `consent = true`.
- [x] Stored records contain `source = website_chatbot`.

## Security Testing

- [x] `.env.local` is excluded from Git.
- [x] `.env.local` is absent from GitHub.
- [x] `node_modules` is excluded from Git.
- [x] `.next` is excluded from Git.
- [x] API keys are not present in client source code.
- [x] Previously exposed credentials were revoked and replaced.
- [x] Replacement secrets are stored only in controlled environment settings.

## Deployment Testing

- [x] GitHub repository is reachable.
- [x] Vercel deployment completes successfully.
- [x] Production URL is publicly reachable.
- [x] Production health endpoint works.
- [x] Production lead submission works.
- [x] GitHub-to-Vercel deployment integration works.

## AI Response Tests

- [ ] Company-service questions return grounded answers.
- [ ] Mobile follow-up questions maintain context.
- [ ] Pricing requests do not produce invented figures.
- [ ] Unsupported SLA details are not invented.
- [ ] Unknown company facts are identified as unverified.
- [ ] Prompt-injection requests do not override safeguards.

## AI Validation Status

AI response-quality validation is temporarily pending because the configured
OpenAI API project has no remaining credits.

Verified:

- The chatbot frontend works.
- The server-side chat API route is reached.
- The API credential is recognized by the provider.
- The provider returns HTTP 429.
- The provider error code is `credit_balance_exhausted`.
- The application displays a controlled fallback message.
- No credentials are returned to the browser.

Required future action:

Add API credits or configure an authorized funded API project, then repeat
the pending AI response tests before final production approval.