# API Reference

Welcome to the LegalForge API reference. Our API is organized around REST principles and uses standard HTTP response codes, authentication, and verbs.

## API Endpoints

### Authentication
- [Authentication](./authentication.md)
- [User Management](./users.md)

### Documents
- [Document Generation](./documents.md)
- [Document Management](./document-management.md)
- [Version Control](./versions.md)

### Sites
- [Site Management](./sites.md)
- [Domain Configuration](./domains.md)

### Compliance
- [Cookie Consent](./cookie-consent.md)
- [Privacy Settings](./privacy.md)

### Webhooks
- [Webhook Configuration](./webhooks.md)
- [Event Types](./events.md)

## Authentication

All API requests require authentication using JWT tokens. Include the token in the Authorization header:

```bash
Authorization: Bearer your-jwt-token
```

## Rate Limiting

The API implements rate limiting:
- Free tier: 100 requests/hour
- Pro tier: 1000 requests/hour
- Enterprise tier: Custom limits

## Response Formats

All responses are returned in JSON format:

```json
{
  "success": true,
  "data": {
    "id": "123",
    "type": "privacy_policy",
    "content": "..."
  },
  "meta": {
    "version": "1.0"
  }
}
```

## Error Handling

We use conventional HTTP response codes:
- 2xx for success
- 4xx for client errors
- 5xx for server errors

Example error response:
```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid document type specified",
    "details": {
      "field": "type",
      "reason": "must be one of: privacy_policy, terms_of_service, cookie_policy"
    }
  }
}
```

## SDKs and Libraries

- [Node.js SDK](./sdk/nodejs.md)
- [Python SDK](./sdk/python.md)
- [PHP SDK](./sdk/php.md)
- [Java SDK](./sdk/java.md)

## Best Practices

- [Rate Limiting](./best-practices/rate-limiting.md)
- [Error Handling](./best-practices/error-handling.md)
- [Authentication](./best-practices/authentication.md)
- [Webhooks](./best-practices/webhooks.md)