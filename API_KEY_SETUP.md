# API Key Setup Guide

## ⚠️ Security First

Never commit API keys to version control. All `.env*` files are ignored by `.gitignore`.

## Setup Steps

### 1. Get Your Claude API Key

1. Go to https://console.anthropic.com/account/keys
2. Click "Create Key"
3. Copy the new key (starts with `sk-ant-`)
4. **Do NOT share this key** - treat it like a password

### 2. Configure `.env.local`

Create or edit `.env.local` in the project root:

```bash
# .env.local
GEMINI_API_KEY="your-gemini-key-here"
ANTHROPIC_API_KEY="your-claude-key-here"
APP_URL="http://localhost:5173"
```

### 3. Use in Your Code

#### Option A: Direct access (for client-side only)
```typescript
import { getClaudeApiKey } from '@/lib/api-config';

const apiKey = getClaudeApiKey();
```

#### Option B: Rate-limited requests (recommended)
```typescript
import { makeClaudeRequest } from '@/lib/api-config';

const response = await makeClaudeRequest(async () => {
  return fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': getClaudeApiKey(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({ /* ... */ }),
  });
});
```

## Rate Limiting

The `api-config.ts` utility automatically enforces rate limits to prevent quota exhaustion:

- **Claude API**: 100ms delay between requests, max 60/minute
- **Gemini API**: 50ms delay between requests, max 300/minute

If a request would exceed limits, it will automatically wait before proceeding.

## Troubleshooting

### "API key not found" error
- Make sure `.env.local` exists in the project root
- Check that `ANTHROPIC_API_KEY` is set
- Restart your dev server after creating `.env.local`

### "Invalid API key format" error
- Claude keys must start with `sk-ant-`
- Make sure you copied the full key
- Don't include quotes or extra whitespace

### Rate limit errors
- The utility should handle this automatically
- If you're still hitting limits, reduce `maxRequestsPerMinute` in `api-config.ts`
- Wait a few minutes before retrying

## Never Do This

❌ `const key = "sk-ant-..."`
❌ Commit `.env.local` to git
❌ Share your API key in chat, email, or messages
❌ Use the same key across multiple projects without tracking usage

## Best Practices

✅ Keep `.env.local` in `.gitignore`
✅ Use the `makeClaudeRequest()` helper for automatic rate limiting
✅ Rotate keys if they're accidentally exposed
✅ Monitor API usage in the Anthropic console
✅ Use environment-specific keys (dev/staging/prod separate)
