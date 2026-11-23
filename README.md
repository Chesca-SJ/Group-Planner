# Group Planner

A shared space for planning activities, saving toward goals, and keeping your circle organized.

**[Open the live website](https://our-little-world-chesca.royal-mochi-7046.chatgpt.site)**

Created by Chesca SJ.

## Features

- Username and password accounts, Remember Me, logout, and recovery keys.
- Shared circles with Owner, Admin, Member, and Viewer permissions.
- Funds and savings goals with itemized budgets, contribution tracking, and plant, cat, or dog companions.
- Expenses, repayments, payment status, and balances.
- Calendar events with categories, deletion, and completed event styling.
- Bucket lists, reminders, date filters, change history, and recently deleted items.
- Responsive layouts and motion effects.

## Technology

React, TypeScript, HTML, CSS, Vinext, Vite, and Cloudflare Workers. Cloudflare D1 stores accounts and circle records; R2 stores uploaded media.

## Development

Use Node.js 22.13 or later.

```sh
npm ci
npm run dev
```

The development configuration uses local Cloudflare bindings. Database schemas and migrations are in `db/` and `drizzle/`. For a fresh local database, apply the SQL migrations to your local D1 database before using account and circle features.

```sh
npm run build
```

## Checks

```sh
node scripts/check-accounts.mjs
node scripts/check-collaboration.mjs
node scripts/check-permissions.mjs
node scripts/check-filters.mjs
npx tsc --noEmit
```

## Hosting and sharing

Share the live website link above with friends. This repository contains the application source; it does not contain the live database, passwords, sessions, or uploaded private photos.

The app requires a server, D1 database, and R2 storage. GitHub Pages alone cannot run its account and shared data features. The existing live deployment remains hosted separately. Deploying your own copy requires configuring those resources, applying migrations, and using HTTPS. The hosting configuration includes binding names only; deployment-specific identifiers are excluded.

Password recovery uses an account recovery key. Automated email delivery is not configured.

## Copyright

© 2026 Chesca SJ. All rights reserved.

## GitHub Pages address

The `docs/` folder provides a full-window embedded entry point. Enable it in repository **Settings → Pages → Deploy from a branch → main → /docs → Save**.

After GitHub finishes publishing, the address will be `https://chesca-sj.github.io/Group-Planner/`.

This page displays the existing hosted app in a frame. The backend and database remain on the existing hosting service; this is not a standalone static conversion. Keep that deployment active. Accounts use partitioned cookies, so sign in again when accessing the app through the GitHub Pages address. Browser restrictions on embedded content can affect sign-in or clipboard features; the direct hosted website remains available above.
