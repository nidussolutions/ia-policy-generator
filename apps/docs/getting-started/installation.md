# Installation Guide

This guide will walk you through the process of installing and setting up LegalForge.

## Prerequisites

Before you begin, ensure you have:

- Node.js v16 or higher
- PostgreSQL 12 or higher
- Git
- Yarn or npm

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/legalforge.git
cd legalforge
```

### 2. Install Dependencies

```bash
# Using yarn
yarn install

# Using npm
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/legalforge

# Authentication
JWT_SECRET=your-secure-jwt-secret
SESSION_SECRET=your-secure-session-secret

# AI Service
AI_API_KEY=your-ai-service-key

# Stripe (Optional)
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
```

### 4. Database Setup

```bash
# Generate Prisma client
yarn prisma generate

# Run migrations
yarn prisma migrate dev
```

### 5. Start the Development Server

```bash
# Start all services
yarn dev

# Start specific service
yarn dev:web    # Frontend
yarn dev:server # Backend
```

## Verifying Installation

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the LegalForge welcome page
3. Try creating an account to verify the setup

## Common Issues

### Database Connection

If you can't connect to the database:
1. Check PostgreSQL is running
2. Verify DATABASE_URL in .env
3. Ensure database exists

### Dependencies Issues

If you encounter dependency issues:
1. Clear yarn/npm cache
2. Delete node_modules
3. Reinstall dependencies

## Next Steps

- [Basic Configuration](./configuration.md)
- [First Steps](./first-steps.md)
- [API Setup](../api-reference/README.md)