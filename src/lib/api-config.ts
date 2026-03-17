/**
 * API Configuration and Rate Limiting
 *
 * This utility ensures:
 * - API keys are loaded from environment variables only (never hardcoded)
 * - Rate limiting is enforced to prevent quota exhaustion
 * - Clear errors when keys are missing
 */

// Rate limiting configuration (in milliseconds)
const RATE_LIMITS = {
  claude: {
    minDelayBetweenRequests: 100, // 100ms between requests
    maxRequestsPerMinute: 60,
    requestQueue: [] as number[],
  },
  gemini: {
    minDelayBetweenRequests: 50,
    maxRequestsPerMinute: 300,
    requestQueue: [] as number[],
  },
};

/**
 * Get Claude API key from environment
 * Throws error if not found
 */
export function getClaudeApiKey(): string {
  const key = import.meta.env.VITE_ANTHROPIC_API_KEY ||
              process.env.ANTHROPIC_API_KEY;

  if (!key) {
    throw new Error(
      'Claude API key not found. Please add ANTHROPIC_API_KEY to .env.local'
    );
  }

  // Validate key format (Claude keys start with sk-ant-)
  if (!key.startsWith('sk-ant-')) {
    throw new Error('Invalid Claude API key format. Keys should start with sk-ant-');
  }

  return key;
}

/**
 * Get Gemini API key from environment
 * Throws error if not found
 */
export function getGeminiApiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY ||
              process.env.GEMINI_API_KEY;

  if (!key) {
    throw new Error(
      'Gemini API key not found. Please add GEMINI_API_KEY to .env.local'
    );
  }

  return key;
}

/**
 * Check if rate limit allows a request
 * Returns true if request can proceed, false if rate limited
 */
function checkRateLimit(service: 'claude' | 'gemini'): boolean {
  const limit = RATE_LIMITS[service];
  const now = Date.now();

  // Remove old entries (older than 1 minute)
  limit.requestQueue = limit.requestQueue.filter(
    (timestamp) => now - timestamp < 60000
  );

  // Check if we've exceeded max requests per minute
  if (limit.requestQueue.length >= limit.maxRequestsPerMinute) {
    return false;
  }

  // Check minimum delay between requests
  const lastRequest = limit.requestQueue[limit.requestQueue.length - 1];
  if (lastRequest && now - lastRequest < limit.minDelayBetweenRequests) {
    return false;
  }

  return true;
}

/**
 * Record a request for rate limiting
 */
function recordRequest(service: 'claude' | 'gemini'): void {
  RATE_LIMITS[service].requestQueue.push(Date.now());
}

/**
 * Wait until rate limit allows a request
 * This is a safety mechanism to prevent hitting API limits
 */
export async function waitForRateLimit(service: 'claude' | 'gemini'): Promise<void> {
  const limit = RATE_LIMITS[service];

  while (!checkRateLimit(service)) {
    // Wait for the minimum delay or until an old request expires
    const now = Date.now();
    const oldestRequest = limit.requestQueue[0];

    if (oldestRequest) {
      const timeToWait = Math.max(
        limit.minDelayBetweenRequests,
        60000 - (now - oldestRequest)
      );
      await new Promise((resolve) => setTimeout(resolve, timeToWait));
    } else {
      await new Promise((resolve) => setTimeout(resolve, limit.minDelayBetweenRequests));
    }
  }

  recordRequest(service);
}

/**
 * Helper to make rate-limited Claude API calls
 * Example usage:
 *
 * const response = await makeClaudeRequest(async () => {
 *   return fetch('https://api.anthropic.com/...', {
 *     headers: { 'x-api-key': getClaudeApiKey() }
 *   })
 * })
 */
export async function makeClaudeRequest<T>(
  requestFn: () => Promise<T>
): Promise<T> {
  try {
    await waitForRateLimit('claude');
    return await requestFn();
  } catch (error) {
    if (error instanceof Error && error.message.includes('rate')) {
      throw new Error(
        'Claude API rate limit hit. Please wait before making another request.'
      );
    }
    throw error;
  }
}

/**
 * Helper to make rate-limited Gemini API calls
 */
export async function makeGeminiRequest<T>(
  requestFn: () => Promise<T>
): Promise<T> {
  try {
    await waitForRateLimit('gemini');
    return await requestFn();
  } catch (error) {
    if (error instanceof Error && error.message.includes('rate')) {
      throw new Error(
        'Gemini API rate limit hit. Please wait before making another request.'
      );
    }
    throw error;
  }
}
