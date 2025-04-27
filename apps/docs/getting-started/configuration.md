# Configuration Guide

Learn how to configure LegalForge for your specific needs.

## Basic Configuration

### Environment Variables

Configure your environment variables in `.env`:

```env
# App
NODE_ENV=development
PORT=3000
API_URL=http://localhost:3001

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/legalforge

# Authentication
JWT_SECRET=your-secure-jwt-secret
JWT_EXPIRY=24h
SESSION_SECRET=your-secure-session-secret

# AI Service
AI_API_KEY=your-ai-service-key
AI_MODEL=gpt-4
AI_TEMPERATURE=0.7

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
EMAIL_FROM=noreply@legalforge.com

# Storage
STORAGE_PROVIDER=s3
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1
AWS_BUCKET=your-bucket-name
```

### Application Settings

Configure app settings in `config/settings.ts`:

```typescript
export default {
  app: {
    name: 'LegalForge',
    description: 'AI-Powered Legal Document Generator',
    url: process.env.APP_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3001'
  },
  
  security: {
    passwordMinLength: 8,
    passwordMaxLength: 100,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    maxLoginAttempts: 5,
    lockoutDuration: 15 // minutes
  },
  
  documents: {
    defaultLanguage: 'en',
    supportedLanguages: ['en', 'es', 'pt', 'fr', 'de'],
    defaultJurisdiction: 'gdpr',
    autoUpdate: true,
    versionRetention: 30 // days
  },
  
  ai: {
    model: process.env.AI_MODEL || 'gpt-4',
    temperature: parseFloat(process.env.AI_TEMPERATURE) || 0.7,
    maxTokens: 4000
  }
}
```

## Advanced Configuration

### Custom Templates

Create custom document templates in `templates/`:

```typescript
// templates/privacy-policy.ts
export default {
  name: 'Privacy Policy',
  sections: [
    {
      title: 'Introduction',
      required: true,
      variables: ['company_name', 'website_url']
    },
    {
      title: 'Data Collection',
      required: true,
      variables: ['collected_data_types']
    }
    // ... more sections
  ]
}
```

### Webhook Configuration

Configure webhooks in `config/webhooks.ts`:

```typescript
export default {
  endpoints: {
    documentUpdated: '/webhooks/document-updated',
    userCreated: '/webhooks/user-created',
    subscriptionChanged: '/webhooks/subscription-changed'
  },
  
  retries: {
    maxAttempts: 3,
    backoff: {
      type: 'exponential',
      minDelay: 1000,
      maxDelay: 60000
    }
  },
  
  timeout: 5000 // ms
}
```

### Caching Configuration

Configure caching in `config/cache.ts`:

```typescript
export default {
  driver: 'redis',
  
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD
  },
  
  ttl: {
    documents: 3600, // 1 hour
    users: 1800,     // 30 minutes
    sites: 3600      // 1 hour
  }
}
```

## Security Configuration

### CORS Settings

Configure CORS in `config/cors.ts`:

```typescript
export default {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  credentials: true,
  maxAge: 86400 // 24 hours
}
```

### Rate Limiting

Configure rate limiting in `config/rate-limit.ts`:

```typescript
export default {
  window: 60 * 1000, // 1 minute
  max: 100, // requests per window
  
  // Custom limits by endpoint
  endpoints: {
    '/api/documents': {
      window: 60 * 1000,
      max: 50
    },
    '/api/auth/login': {
      window: 15 * 60 * 1000, // 15 minutes
      max: 5
    }
  }
}
```

## Next Steps

- [First Steps Guide](./first-steps.md)
- [API Configuration](../api-reference/configuration.md)
- [Security Best Practices](../security/best-practices.md)