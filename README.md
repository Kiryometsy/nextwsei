This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

```
nextwsei
├─ .eslintrc.json
├─ app
│  ├─ (protected)
│  │  ├─ layout.tsx
│  │  └─ user
│  │     ├─ changepassword
│  │     │  └─ page.tsx
│  │     ├─ profile
│  │     │  └─ page.tsx
│  │     └─ signout
│  │        └─ page.tsx
│  ├─ (public)
│  │  └─ user
│  │     ├─ register
│  │     │  └─ page.tsx
│  │     └─ signin
│  │        └─ page.jsx
│  ├─ favicon.ico
│  ├─ fonts
│  │  ├─ GeistMonoVF.woff
│  │  └─ GeistVF.woff
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  └─ page.tsx
├─ components
│  ├─ app-sidebar.tsx
│  ├─ nav-main.tsx
│  ├─ nav-projects.tsx
│  ├─ nav-user.tsx
│  ├─ navbar.tsx
│  ├─ team-switcher.tsx
│  └─ ui
│     ├─ avatar.tsx
│     ├─ breadcrumb.tsx
│     ├─ button.tsx
│     ├─ card.tsx
│     ├─ collapsible.tsx
│     ├─ dropdown-menu.tsx
│     ├─ input.tsx
│     ├─ label.tsx
│     ├─ separator.tsx
│     ├─ sheet.tsx
│     ├─ sidebar.tsx
│     ├─ skeleton.tsx
│     └─ tooltip.tsx
├─ components.json
├─ hooks
│  └─ use-mobile.tsx
├─ lib
│  ├─ firebase
│  │  └─ AuthContext.jsx
│  ├─ firebase.ts
│  └─ utils.ts
├─ next.config.ts
├─ package-lock.json
├─ package.json
├─ postcss.config.mjs
├─ public
│  ├─ file.svg
│  ├─ globe.svg
│  ├─ next.svg
│  ├─ vercel.svg
│  └─ window.svg
├─ README.md
├─ tailwind.config.ts
└─ tsconfig.json

```
