# Authentication

Learn how to authenticate with the LegalForge API.

## Overview

LegalForge uses JWT (JSON Web Tokens) for API authentication. All API requests must include a valid JWT token in the Authorization header.

## Getting Started

### 1. Obtain API Token

```bash
curl -X POST https://api.legalforge.com/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "your-password"
  }'
```

Response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### 2. Use the Token

Include the token in the Authorization header:

```bash
curl -X GET https://api.legalforge.com/documents \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
```

## Authentication Methods

### Email/Password Authentication

```javascript
const response = await fetch('https://api.legalforge.com/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'your-password'
  })
});

const { token } = await response.json();
```

### API Key Authentication

For server-to-server communication:

```javascript
const client = new LegalForge({
  apiKey: 'your-api-key'
});
```

### OAuth2 Authentication

```javascript
const authUrl = 'https://api.legalforge.com/oauth/authorize';
const clientId = 'your-client-id';
const redirectUri = 'your-redirect-uri';
const scope = 'read write';

const url = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`;
```

## Token Management

### Token Refresh

```javascript
const response = await fetch('https://api.legalforge.com/auth/refresh', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${refreshToken}`
  }
});

const { token: newToken } = await response.json();
```

### Token Validation

```javascript
const response = await fetch('https://api.legalforge.com/auth/validate', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const { valid, expires } = await response.json();
```

## Security Best Practices

### Token Storage

```javascript
// Browser
localStorage.setItem('token', token);

// Node.js
process.env.API_TOKEN = token;
```

### Error Handling

```javascript
try {
  const response = await authenticate();
  // Handle success
} catch (error) {
  if (error.status === 401) {
    // Handle unauthorized
  } else if (error.status === 403) {
    // Handle forbidden
  }
}
```

### Rate Limiting

- Free tier: 100 requests/hour
- Pro tier: 1000 requests/hour
- Enterprise: Custom limits

## Example Implementations

### Node.js

```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: process.env.LEGALFORGE_API_KEY
});

// Make authenticated requests
const documents = await client.documents.list();
```

### Python

```python
from legalforge import Client

client = Client(api_key='your-api-key')

# Make authenticated requests
documents = client.documents.list()
```

### PHP

```php
use LegalForge\Client;

$client = new Client([
    'api_key' => 'your-api-key'
]);

// Make authenticated requests
$documents = $client->documents->list();
```

## Troubleshooting

### Common Issues

1. Invalid Token
```json
{
  "error": "invalid_token",
  "message": "Token has expired"
}
```

2. Missing Authorization
```json
{
  "error": "unauthorized",
  "message": "No authorization token provided"
}
```

3. Invalid Credentials
```json
{
  "error": "invalid_credentials",
  "message": "Invalid email or password"
}
```

### Solutions

1. Token Expired
- Refresh the token
- Re-authenticate

2. Invalid Credentials
- Verify email/password
- Check API key

3. Rate Limiting
- Check current usage
- Upgrade plan if needed

## Support

Need help with authentication?
- Check our [FAQ](../faq/README.md)
- Join our [Discord](https://discord.gg/legalforge)
- Email: support@legalforge.com