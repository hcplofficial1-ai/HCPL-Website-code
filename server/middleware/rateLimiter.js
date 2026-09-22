/**
 * In-memory sliding window rate limiter for API endpoints.
 * Protects endpoints from abuse/spam without requiring Redis.
 */
const rateLimitMap = new Map();

// Periodic cleanup of stale IP records every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime) {
      rateLimitMap.delete(ip);
    }
  }
}, 5 * 60 * 1000);

export function createRateLimiter(options = {}) {
  const windowMs = options.windowMs || 60 * 1000; // 1 minute default
  const maxRequests = options.max || 20; // 20 requests per minute default
  const message = options.message || Too many requests, please try again shortly.;

  return (req, res, next) => {
    // Get client IP address
    const ip =
      req.headers[x-forwarded-for]?.split(,)[0]?.trim() ||
      req.headers[x-real-ip] ||
      req.socket?.remoteAddress ||
      unknown-ip;

    const now = Date.now();
    let clientRecord = rateLimitMap.get(ip);

    if (!clientRecord || now > clientRecord.resetTime) {
      clientRecord = {
        count: 1,
        resetTime: now + windowMs
      };
      rateLimitMap.set(ip, clientRecord);
      return next();
    }

    clientRecord.count += 1;

    if (clientRecord.count > maxRequests) {
      const retryAfterSeconds = Math.ceil((clientRecord.resetTime - now) / 1000);
      res.setHeader(Retry-After, retryAfterSeconds);
      return res.status(429).json({
        success: false,
        error: message,
        retryAfter: retryAfterSeconds
      });
    }

    next();
  };
}
