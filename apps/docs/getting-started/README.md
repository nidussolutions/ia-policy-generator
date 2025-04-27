# Getting Started with LegalForge

This guide will help you get started with LegalForge and understand its core features.

## Quick Start Guide

1. [Installation](./installation.md)
2. [Configuration](./configuration.md)
3. [First Steps](./first-steps.md)
4. [Basic Concepts](./basic-concepts.md)

## Prerequisites

- Node.js v16 or higher
- PostgreSQL database
- API key for document generation
- Basic understanding of legal compliance requirements

## Installation

```bash
# Clone the repository
git clone https://github.com/your-org/legalforge.git

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env

# Start development server
yarn dev
```

## Basic Configuration

1. Set up your environment variables in `.env`:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/legalforge
JWT_SECRET=your-secret-key
AI_API_KEY=your-ai-api-key
```

2. Configure your first site:
```bash
yarn setup-site
```

## Next Steps

- [Create your first document](./first-document.md)
- [Set up user authentication](./authentication.md)
- [Configure webhooks](./webhooks.md)
- [Customize templates](./templates.md)

## Need Help?

- Check our [FAQ](../faq/README.md)
- Join our [Discord community](https://discord.gg/legalforge)
- Contact support at support@legalforge.com