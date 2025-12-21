/**
 * VU Anonymous Licensing System - Database Client
 * 
 * Provides database access for the anonymous licensing system.
 * Works with both Cloudflare D1 (production) and SQLite (development).
 */

import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// Type for D1 database binding
type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
  dump: () => Promise<ArrayBuffer>;
  batch: <T = unknown>(statements: D1PreparedStatement[]) => Promise<D1Result<T>[]>;
  exec: (query: string) => Promise<D1ExecResult>;
};

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  first: <T = unknown>(colName?: string) => Promise<T | null>;
  run: () => Promise<D1Result<unknown>>;
  all: <T = unknown>() => Promise<D1Result<T>>;
  raw: <T = unknown>() => Promise<T[]>;
};

type D1Result<T> = {
  results: T[];
  success: boolean;
  meta: {
    duration: number;
    changes: number;
    last_row_id: number;
    changed_db: boolean;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
};

type D1ExecResult = {
  count: number;
  duration: number;
};

/**
 * Create a database instance from D1 binding
 */
export function createDB(d1: D1Database) {
  return drizzle(d1 as unknown as Parameters<typeof drizzle>[0], { schema });
}

export type Database = ReturnType<typeof createDB>;

/**
 * Generate a unique ID for database records
 * Uses crypto.randomUUID for uniqueness without tracking
 */
export function generateId(): string {
  return crypto.randomUUID();
}

/**
 * Get current timestamp for database records
 */
export function now(): Date {
  return new Date();
}

/**
 * Hash an identifier for rate limiting
 * This creates an irreversible hash that can't identify users
 */
export async function hashForRateLimit(identifier: string, action: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(`${identifier}:${action}`);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

