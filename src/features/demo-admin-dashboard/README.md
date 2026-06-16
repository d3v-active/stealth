# Demo Admin Dashboard

This folder is the implementation boundary for the admin dashboard used to populate and manage demo data in the Stealth demo inbox UI.

Contributors working on demo-admin issues should keep new dashboard code, local state helpers, fixtures, validators, UI components, test utilities, and documentation inside:

`src/features/demo-admin-dashboard/`

The rest of the app should only import stable entry points from this folder once the feature is ready to connect to the demo inbox. Avoid changing existing inbox, mail reader, calendar, sender-conversion, or protocol modules unless an issue explicitly asks for a minimal integration shim.

Primary goals:

- Create a safe admin surface for loading demo inbox data.
- Keep demo data editing separate from production mail flows.
- Make every demo data mutation previewable, reversible, and auditable.
- Provide fixtures and validation that keep the demo UI realistic and stable.
