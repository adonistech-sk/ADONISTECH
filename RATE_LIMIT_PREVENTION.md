# Rate Limit Prevention Checklist

## What I've Set Up For You

### 1. ✅ Secure Key Storage
- `/.env.local` - Local environment variables (ignored by git)
- `/. env.example` - Template showing required variables
- `.gitignore` already includes `/.env*` - prevents accidental commits

### 2. ✅ Rate Limiting Utility
- `src/lib/api-config.ts` - Prevents hitting API quota limits
  - Automatic request queuing
  - Enforced delays between requests
  - Per-minute request limits
  - Clear error messages

### 3. ✅ Configuration
- `vite.config.ts` - Updated to load ANTHROPIC_API_KEY
- `.env.example` - Shows where to put your keys

### 4. ✅ Documentation
- `API_KEY_SETUP.md` - Complete setup instructions
- `RATE_LIMIT_PREVENTION.md` - This file

## Your Action Items

### Step 1: Rotate Your Exposed Key ⚠️ CRITICAL
Your old API key was shared in chat. You must rotate it:
1. Go to https://console.anthropic.com/account/keys
2. Delete or disable the old key (the one starting with `xDaFlCvq0cVRXIl...`)
3. Create a new key
4. Keep the new key safe - don't share it

### Step 2: Set Up .env.local
```bash
# In the project root, create .env.local with:
ANTHROPIC_API_KEY="sk-ant-YOUR-NEW-KEY-HERE"
GEMINI_API_KEY="your-gemini-key"
APP_URL="http://localhost:5173"
```

### Step 3: Verify Setup
```bash
npm install  # Make sure dependencies are installed
npm run dev  # Start dev server
```

If you see errors about missing API keys, double-check `.env.local`.

## How to Use the Rate Limiter

### For Claude API calls:
```typescript
import { makeClaudeRequest, getClaudeApiKey } from '@/lib/api-config';

const response = await makeClaudeRequest(async () => {
  return fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': getClaudeApiKey(),
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      model: 'claude-3-5-sonnet-20241022',
      messages: [{ role: 'user', content: 'Hello!' }],
    }),
  });
});
```

### For Gemini API calls:
```typescript
import { makeGeminiRequest, getGeminiApiKey } from '@/lib/api-config';

const response = await makeGeminiRequest(async () => {
  return fetch(`https://generativelanguage.googleapis.com/v1beta/models/...`, {
    // Use getGeminiApiKey() in your headers
  });
});
```

## Rate Limits Enforced

| Service | Min Delay | Max per Minute | Recovery Time |
|---------|-----------|----------------|----------------|
| Claude  | 100ms     | 60             | 1 minute       |
| Gemini  | 50ms      | 300            | 1 minute       |

These are conservative limits - you can adjust in `src/lib/api-config.ts` if needed.

## Why You Were Hitting Rate Limits

Possible causes (now prevented):
- ❌ Hardcoded API keys shared across projects
- ❌ Multiple concurrent requests without throttling
- ❌ No tracking of request frequency
- ❌ Keys stored in git history

Now you have:
- ✅ Secure key storage per project
- ✅ Automatic request queuing
- ✅ Built-in rate limiting
- ✅ Clear error messages
- ✅ Easy debugging with API_KEY_SETUP.md

## If You Still Hit Rate Limits

1. **Check the console** - Look for "rate limit" warnings
2. **Verify your key** - Make sure `.env.local` is set correctly
3. **Wait a minute** - The utility will automatically queue requests
4. **Reduce frequency** - Increase delay values in `api-config.ts` if needed
5. **Monitor usage** - Check https://console.anthropic.com/account/usage

## Support

If you encounter issues:
- Check `API_KEY_SETUP.md` for setup help
- Look for error messages - they're descriptive
- Verify `.env.local` exists and has the right keys
- Restart your dev server after changing `.env.local`
