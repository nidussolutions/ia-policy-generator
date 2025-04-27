# Integration Guide

Learn how to integrate LegalForge into your applications and websites.

## Quick Start

1. [API Integration](./api-integration.md)
2. [Cookie Banner Setup](./cookie-banner.md)
3. [Webhook Configuration](./webhooks.md)
4. [SDK Implementation](./sdk.md)

## API Integration

### Authentication
```javascript
const LegalForge = require('legalforge-sdk');

const client = new LegalForge({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox' for testing
});
```

### Document Generation
```javascript
const document = await client.documents.create({
  type: 'privacy_policy',
  site: 'example.com',
  language: 'en',
  jurisdiction: 'gdpr'
});
```

## Cookie Banner Integration

### Basic Setup
```javascript
<script src="https://cdn.legalforge.com/cookie-banner.js"></script>
<script>
  LegalForgeCookies.init({
    siteId: 'your-site-id',
    theme: 'light',
    position: 'bottom'
  });
</script>
```

### Custom Styling
```css
.lf-cookie-banner {
  background: #f8f9fa;
  border-radius: 8px;
  /* Add your custom styles */
}
```

## Webhook Integration

### Setting Up Webhooks
1. Generate webhook secret in dashboard
2. Configure endpoint URL
3. Select events to monitor
4. Implement webhook handler

### Example Webhook Handler
```javascript
app.post('/webhooks/legalforge', (req, res) => {
  const signature = req.headers['x-legalforge-signature'];
  
  if (verifySignature(signature, req.body)) {
    // Handle webhook event
    const event = req.body;
    
    switch (event.type) {
      case 'document.updated':
        // Handle document update
        break;
      case 'compliance.alert':
        // Handle compliance alert
        break;
    }
    
    res.status(200).send('OK');
  } else {
    res.status(400).send('Invalid signature');
  }
});
```

## SDK Implementation

### Available SDKs
- [Node.js SDK](./sdk/nodejs.md)
- [Python SDK](./sdk/python.md)
- [PHP SDK](./sdk/php.md)
- [Java SDK](./sdk/java.md)

### Common SDK Operations

#### Document Management
```javascript
// Create document
const doc = await client.documents.create({/*...*/});

// Update document
await client.documents.update(docId, {/*...*/});

// Get document
const doc = await client.documents.get(docId);

// Delete document
await client.documents.delete(docId);
```

#### Site Management
```javascript
// Add new site
const site = await client.sites.create({
  domain: 'example.com',
  language: 'en',
  jurisdiction: 'gdpr'
});

// Update site settings
await client.sites.update(siteId, {
  cookieConsent: true,
  autoUpdate: true
});
```

## Best Practices

1. Error Handling
```javascript
try {
  const doc = await client.documents.create({/*...*/});
} catch (error) {
  if (error.code === 'rate_limit_exceeded') {
    // Handle rate limiting
  } else if (error.code === 'invalid_parameters') {
    // Handle validation errors
  }
}
```

2. Webhook Security
- Always verify webhook signatures
- Use HTTPS endpoints
- Implement retry logic
- Monitor webhook health

3. Performance Optimization
- Cache document content
- Implement rate limiting
- Use batch operations when possible
- Monitor API usage

## Testing

### Sandbox Environment
```javascript
const client = new LegalForge({
  apiKey: 'sandbox-api-key',
  environment: 'sandbox'
});
```

### Test Webhooks
```bash
# Using webhook test tool
legalforge webhook-test \
  --url https://your-site.com/webhooks \
  --event document.updated
```

## Troubleshooting

Common issues and solutions:
- API Authentication
- Webhook Delivery
- SDK Installation
- Integration Debugging

## Support

Need help with integration?
- Check our [FAQ](../faq/README.md)
- Join our [Discord community](https://discord.gg/legalforge)
- Contact support at integration@legalforge.com