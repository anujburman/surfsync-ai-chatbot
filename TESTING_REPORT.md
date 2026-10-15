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