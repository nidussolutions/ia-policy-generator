# Documents API

The Documents API allows you to create, manage, and update legal documents.

## Document Operations

### Create Document

```bash
POST /api/documents
```

Request body:
```json
{
  "type": "privacy_policy",
  "siteId": "site-id",
  "language": "en",
  "jurisdiction": "gdpr"
}
```

Response:
```json
{
  "id": "doc-id",
  "type": "privacy_policy",
  "content": "...",
  "version": "1.0",
  "createdAt": "2024-01-20T12:00:00Z"
}
```

### Get Document

```bash
GET /api/documents/:id
```

Response:
```json
{
  "id": "doc-id",
  "type": "privacy_policy",
  "content": "...",
  "version": "1.0",
  "createdAt": "2024-01-20T12:00:00Z",
  "updatedAt": "2024-01-20T12:00:00Z"
}
```

### Update Document

```bash
PUT /api/documents/:id
```

Request body:
```json
{
  "content": "Updated content...",
  "version": "1.1"
}
```

### Delete Document

```bash
DELETE /api/documents/:id
```

## Document Types

Available document types:
- `privacy_policy`
- `terms_of_service`
- `cookie_policy`
- `disclaimer`
- `eula`

## Code Examples

### Node.js

```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: 'your-api-key'
});

// Create document
const doc = await client.documents.create({
  type: 'privacy_policy',
  siteId: 'site-id',
  language: 'en'
});

// Get document
const doc = await client.documents.get('doc-id');

// Update document
await client.documents.update('doc-id', {
  content: 'Updated content'
});

// Delete document
await client.documents.delete('doc-id');
```

### Python

```python
from legalforge import Client

client = Client(api_key='your-api-key')

# Create document
doc = client.documents.create(
    type='privacy_policy',
    site_id='site-id',
    language='en'
)

# Get document
doc = client.documents.get('doc-id')

# Update document
client.documents.update('doc-id', content='Updated content')

# Delete document
client.documents.delete('doc-id')
```

## Document Versioning

### Get Version History

```bash
GET /api/documents/:id/versions
```

Response:
```json
{
  "versions": [
    {
      "version": "1.1",
      "createdAt": "2024-01-20T13:00:00Z",
      "changes": ["Updated privacy section"]
    },
    {
      "version": "1.0",
      "createdAt": "2024-01-20T12:00:00Z",
      "changes": ["Initial version"]
    }
  ]
}
```

### Restore Version

```bash
POST /api/documents/:id/restore
```

Request body:
```json
{
  "version": "1.0"
}
```

## Document Templates

### List Templates

```bash
GET /api/templates
```

Response:
```json
{
  "templates": [
    {
      "id": "template-id",
      "name": "GDPR Privacy Policy",
      "type": "privacy_policy",
      "jurisdiction": "gdpr"
    }
  ]
}
```

### Create from Template

```bash
POST /api/documents/from-template
```

Request body:
```json
{
  "templateId": "template-id",
  "siteId": "site-id",
  "variables": {
    "company_name": "Example Inc",
    "website_url": "example.com"
  }
}
```

## Error Handling

Common error responses:

```json
{
  "error": "document_not_found",
  "message": "Document not found"
}
```

```json
{
  "error": "invalid_document_type",
  "message": "Invalid document type specified"
}
```

```json
{
  "error": "version_not_found",
  "message": "Version not found"
}
```

## Webhooks

Document-related webhook events:

- `document.created`
- `document.updated`
- `document.deleted`
- `document.version_created`

Example webhook payload:
```json
{
  "event": "document.updated",
  "data": {
    "documentId": "doc-id",
    "type": "privacy_policy",
    "version": "1.1",
    "timestamp": "2024-01-20T13:00:00Z"
  }
}
```

## Rate Limits

- Free tier: 100 requests/hour
- Pro tier: 1000 requests/hour
- Enterprise: Custom limits

## Best Practices

1. Version Management
- Keep track of document versions
- Use meaningful version numbers
- Document changes in version history

2. Content Updates
- Validate content before updates
- Use templates when possible
- Keep backups of important versions

3. Error Handling
- Implement proper error handling
- Validate input data
- Handle rate limits appropriately

## Support

Need help with documents?
- Check our [FAQ](../faq/README.md)
- Join our [Discord](https://discord.gg/legalforge)
- Email: support@legalforge.com