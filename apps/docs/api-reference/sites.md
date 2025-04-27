# Sites API

The Sites API allows you to manage websites and their associated legal documents.

## Site Operations

### Create Site

```bash
POST /api/sites
```

Request body:
```json
{
  "name": "My Website",
  "domain": "example.com",
  "language": "en",
  "legislation": "gdpr",
  "observation": "Company website"
}
```

Response:
```json
{
  "id": "site-id",
  "name": "My Website",
  "domain": "example.com",
  "language": "en",
  "legislation": "gdpr",
  "observation": "Company website",
  "createdAt": "2024-01-20T12:00:00Z"
}
```

### Get Site

```bash
GET /api/sites/:id
```

Response:
```json
{
  "id": "site-id",
  "name": "My Website",
  "domain": "example.com",
  "language": "en",
  "legislation": "gdpr",
  "observation": "Company website",
  "createdAt": "2024-01-20T12:00:00Z",
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

### Update Site

```bash
PUT /api/sites/:id
```

Request body:
```json
{
  "name": "Updated Website Name",
  "language": "es"
}
```

### Delete Site

```bash
DELETE /api/sites/:id
```

## Code Examples

### Node.js

```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: 'your-api-key'
});

// Create site
const site = await client.sites.create({
  name: 'My Website',
  domain: 'example.com',
  language: 'en',
  legislation: 'gdpr'
});

// Get site
const site = await client.sites.get('site-id');

// Update site
await client.sites.update('site-id', {
  name: 'Updated Website Name'
});

// Delete site
await client.sites.delete('site-id');
```

### Python

```python
from legalforge import Client

client = Client(api_key='your-api-key')

# Create site
site = client.sites.create(
    name='My Website',
    domain='example.com',
    language='en',
    legislation='gdpr'
)

# Get site
site = client.sites.get('site-id')

# Update site
client.sites.update('site-id', name='Updated Website Name')

# Delete site
client.sites.delete('site-id')
```

## Site Documents

### List Site Documents

```bash
GET /api/sites/:id/documents
```

Response:
```json
{
  "documents": [
    {
      "id": "doc-id",
      "type": "privacy_policy",
      "version": "1.0",
      "createdAt": "2024-01-20T12:00:00Z"
    }
  ]
}
```

### Create Site Document

```bash
POST /api/sites/:id/documents
```

Request body:
```json
{
  "type": "privacy_policy",
  "language": "en"
}
```

## Site Settings

### Update Settings

```bash
PUT /api/sites/:id/settings
```

Request body:
```json
{
  "cookieConsent": true,
  "autoUpdate": true,
  "notificationEmail": "admin@example.com"
}
```

### Get Settings

```bash
GET /api/sites/:id/settings
```

Response:
```json
{
  "cookieConsent": true,
  "autoUpdate": true,
  "notificationEmail": "admin@example.com"
}
```

## Site Statistics

### Get Site Stats

```bash
GET /api/sites/:id/stats
```

Response:
```json
{
  "documentCount": 5,
  "lastUpdate": "2024-01-20T12:00:00Z",
  "documentTypes": {
    "privacy_policy": 1,
    "terms_of_service": 1,
    "cookie_policy": 1
  }
}
```

## Error Handling

Common error responses:

```json
{
  "error": "site_not_found",
  "message": "Site not found"
}
```

```json
{
  "error": "invalid_domain",
  "message": "Invalid domain format"
}
```

```json
{
  "error": "duplicate_domain",
  "message": "Domain already exists"
}
```

## Webhooks

Site-related webhook events:

- `site.created`
- `site.updated`
- `site.deleted`
- `site.document_added`

Example webhook payload:
```json
{
  "event": "site.updated",
  "data": {
    "siteId": "site-id",
    "domain": "example.com",
    "changes": ["name", "language"],
    "timestamp": "2024-01-20T13:00:00Z"
  }
}
```

## Rate Limits

- Free tier: 50 requests/hour
- Pro tier: 500 requests/hour
- Enterprise: Custom limits

## Best Practices

1. Domain Management
- Verify domain ownership
- Use proper domain format
- Keep domain information updated

2. Document Organization
- Group related documents
- Maintain consistent naming
- Regular document reviews

3. Settings Management
- Configure notifications
- Enable auto-updates
- Regular settings review

## Support

Need help with sites?
- Check our [FAQ](../faq/README.md)
- Join our [Discord](https://discord.gg/legalforge)
- Email: support@legalforge.com