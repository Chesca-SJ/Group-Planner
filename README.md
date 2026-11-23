# Group Planner

Plan activities, track shared funds, and keep your circle organized.

## Open the website
### [Group Planner — Plan, Save & Make Memories](https://chesca-sj.github.io/Group-Planner/)

Create an account, then create a circle or join with an invitation code. Keep your recovery key somewhere safe so you can reset a forgotten password.

## What you can do

| Section | Purpose |
| --- | --- |
| Home | See upcoming plans and savings at a glance. |
| Budget & Funds | Set savings goals, add contributions, and review itemized budgets. |
| Spending | Track expenses, record repayments, mark payments as paid, and review balances. |
| Bucket List | Save ideas and filter them by date, name, or budget. |
| Calendar | Add categorized events, remove mistakes, and view past activities. |
| Friends | View circle members and personalize your profile. |
| Reminders | Review notifications and adjust reminder preferences. |
| Circle & History | Manage invitations, roles, change history, and recently deleted items. |

## Circle roles

| Role | Access |
| --- | --- |
| Owner | Full control, including permissions. |
| Admin | Manage shared content; cannot change roles. |
| Member | Add and manage their own contributions and ideas. |
| Viewer | View only; default role when joining. |

## Development

Requires Node.js 22.13 or later.

```sh
npm ci
npm run dev
```

Apply the SQL migrations in `drizzle/` to a fresh local D1 database before using accounts and circles.

```sh
npm run build
npx tsc --noEmit
node scripts/check-accounts.mjs
node scripts/check-collaboration.mjs
node scripts/check-permissions.mjs
node scripts/check-filters.mjs
```

## Project structure

| Folder | Contents |
| --- | --- |
| `app/` | Pages, components, styles, and server routes |
| `db/` and `drizzle/` | Database schema and migrations |
| `docs/` | GitHub Pages entry page |
| `scripts/` | Build tools and verification checks |
| `worker/` | Cloudflare Worker entry point |

## Hosting

GitHub Pages displays the hosted app in a full-window frame. The existing Cloudflare backend handles accounts, shared data, and uploaded media; keep that deployment active. The app uses React, TypeScript, Vinext, Cloudflare D1, and R2.

You may need to log in again when opening the GitHub address. Browser restrictions on embedded content can affect sign-in or clipboard features. Account recovery uses a recovery key; automated email delivery is not configured.

The repository contains source code, not live account records, credentials, or private uploaded photos.

## Copyright

© 2026 Chesca SJ. All rights reserved.
