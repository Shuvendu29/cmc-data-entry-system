// Security utilities for production environment
export const isProduction = () => process.env.NODE_ENV === 'production';

// Environment-based demo mode check
export const isDemoMode = () => {
  return process.env.NEXT_PUBLIC_DEMO_MODE === 'true' || !isProduction();
};

// Safe console logging that respects environment
export const safeLog = (message: string, data?: any) => {
  if (!isProduction()) {
    console.log(message, data);
  }
};

// Input sanitization for user data
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>\"']/g, '') // Remove potential XSS characters
    .substring(0, 255); // Limit length
};

// Validate user credentials format
export const validateCredentials = (username: string, password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];
  
  if (!username || username.length < 3) {
    errors.push('Username must be at least 3 characters');
  }
  
  if (!password || password.length < 6) {
    errors.push('Password must be at least 6 characters');
  }
  
  if (username.length > 50) {
    errors.push('Username too long');
  }
  
  if (password.length > 128) {
    errors.push('Password too long');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Rate limiting helper (simple in-memory implementation)
class RateLimiter {
  private attempts: Map<string, { count: number; resetTime: number }> = new Map();
  private maxAttempts: number;
  private windowMs: number;

  constructor(maxAttempts = 5, windowMs = 15 * 60 * 1000) { // 5 attempts per 15 minutes
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isRateLimited(identifier: string): boolean {
    const now = Date.now();
    const attempt = this.attempts.get(identifier);

    if (!attempt || now > attempt.resetTime) {
      this.attempts.set(identifier, { count: 1, resetTime: now + this.windowMs });
      return false;
    }

    if (attempt.count >= this.maxAttempts) {
      return true;
    }

    attempt.count++;
    return false;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
}

export const loginRateLimiter = new RateLimiter();
