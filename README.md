# Nextwsei

`nextwsei` is a web application built with Next.js that incorporates various user authentication and management features. This project demonstrates how to create a modern web app with routing, user registration, login, and profile management.

## Getting Started

### Prerequisites

Make sure you have `Node.js` and `npm` (or `yarn`/`pnpm`) installed. You can check if they're installed by running:

```bash
node -v
npm -v
```

### Install Dependencies

Clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/Kiryometsy/nextwsei.git
cd nextwsei
npm install
```

### Run the Development Server

Start the development server:

```bash
npm run dev
```

This will start the app at `http://localhost:3000`.

## Folder Structure

The project follows a standard Next.js structure with some additional files and folders for features related to user authentication.

- **`app/`**: Contains the application's core layout and pages. It's split into user-protected routes and public routes.
  - **`(protected)/`**: Contains routes that require user authentication, including profile, articles, and sign-out pages.
  - **`(public)/`**: Contains registration, sign-in, and email verification pages.
- **`components/`**: Contains React components for UI elements like navigation, sidebar, buttons, and avatars.

- **`lib/`**: Utility functions and helper methods.

- **`public/`**: Static assets such as icons and fonts.

- **`tests/`**: Tests for the application.

- **`next.config.ts`**: Configuration for Next.js.

- **`tailwind.config.ts`**: Tailwind CSS configuration file.

- **`tsconfig.json`**: TypeScript configuration file.

## Features

- User registration and login.
- Profile management.
- Protected routes for authenticated users.
- UI components using Tailwind CSS.

## Learn More

To learn more about Next.js, visit the [Next.js documentation](https://nextjs.org/docs).
