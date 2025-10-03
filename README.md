# Nomad Social

A Next.js application that displays posts with user information, built with Prisma and SQLite database.

## Tech Stack

- **Framework**: Next.js 15.5.4 with App Router
- **Runtime**: React 19.1.0
- **Database**: SQLite with Prisma ORM
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript
- **Package Manager**: pnpm

## Database Schema

The application uses the following data models:

- **User**: User profiles with contact information and address details
- **Post**: Blog posts associated with users
- **Company**: Company information (one-to-many relationship with users)

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- pnpm (recommended package manager)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/suarezfran/nomad-social
cd nomad-social
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up the database:
```bash
# Generate Prisma client
pnpm prisma generate

# Run database migrations
pnpm prisma migrate dev

# Seed the database (optional)
pnpm prisma db seed
```

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint for code quality checks

## Development

The application uses:
- **Turbopack** for fast development builds
- **ESLint** for code quality
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
