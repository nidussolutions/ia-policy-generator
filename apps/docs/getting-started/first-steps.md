# First Steps with LegalForge

This guide will help you get started with using LegalForge after installation.

## Creating Your First Site

### 1. Register an Account

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "secure-password",
    "name": "John Doe"
  }'
```

### 2. Add a New Site

```bash
curl -X POST http://localhost:3000/api/sites \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Website",
    "domain": "example.com",
    "language": "en",
    "legislation": "gdpr"
  }'
```

## Generating Your First Document

### 1. Create a Privacy Policy

```bash
curl -X POST http://localhost:3000/api/documents \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "privacy_policy",
    "siteId": "YOUR_SITE_ID",
    "language": "en"
  }'
```

### 2. View the Document

```bash
curl -X GET http://localhost:3000/api/documents/YOUR_DOCUMENT_ID \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Setting Up Cookie Banner

### 1. Add Script to Your Website

```html
<script src="https://cdn.legalforge.com/cookie-banner.js"></script>
<script>
  LegalForgeCookies.init({
    siteId: 'YOUR_SITE_ID',
    theme: 'light',
    position: 'bottom'
  });
</script>
```

### 2. Customize Appearance

```css
.lf-cookie-banner {
  background: #f8f9fa;
  border-radius: 8px;
  /* Add your custom styles */
}
```

## Basic API Usage

### Authentication

```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: 'your-api-key',
  environment: 'production'
});
```

### Document Operations

```javascript
// Create document
const document = await client.documents.create({
  type: 'privacy_policy',
  siteId: 'your-site-id',
  language: 'en'
});

// Update document
await client.documents.update(documentId, {
  content: 'Updated content'
});

// Delete document
await client.documents.delete(documentId);
```

## Common Tasks

### Managing Sites

```javascript
// List all sites
const sites = await client.sites.list();

// Update site
await client.sites.update(siteId, {
  name: 'Updated Name',
  language: 'es'
});
```

### User Management

```javascript
// Update profile
await client.users.updateProfile({
  name: 'New Name',
  phone: '+1234567890'
});

// Change password
await client.users.changePassword({
  currentPassword: 'old-password',
  newPassword: 'new-password'
});
```

## Next Steps

1. Explore the [API Reference](../api-reference/README.md)
2. Learn about [Document Generation](../guides/document-generation.md)
3. Set up [Webhooks](../integration/webhooks.md)
4. Configure [Custom Templates](../guides/templates.md)

## Troubleshooting

### Common Issues

1. Authentication Errors
   - Check API key validity
   - Verify token expiration
   - Ensure proper headers

2. Document Generation Issues
   - Verify site configuration
   - Check language support
   - Validate jurisdiction settings

3. Integration Problems
   - Confirm CORS settings
   - Check API endpoint URLs
   - Verify webhook configuration

## Getting Help

- Join our [Discord community](https://discord.gg/legalforge)
- Email support at support@legalforge.com
- Check our [FAQ](../faq/README.md)