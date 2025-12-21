/**
 * VU Anonymous Licensing System - Database Schema
 * 
 * This schema is designed for ZERO user identification.
 * We store:
 * - Aggregate statistics (how many licenses signed)
 * - Support tickets (with public key, not identity)
 * - Audit logs (events, not users)
 * 
 * We do NOT store:
 * - User identities
 * - License contents
 * - Payment-to-license links
 * - Any personally identifiable information
 */

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

/**
 * Audit Log - Anonymous event tracking
 * "We know what happened. We don't know who."
 */
export const auditLog = sqliteTable('audit_log', {
  id: text('id').primaryKey(),
  event: text('event').notNull(), // license_signed, payment_received, etc.
  app: text('app'), // Which app (vunotes, vumail, etc.)
  tier: text('tier'), // monthly, yearly, lifetime
  timestamp: integer('timestamp', { mode: 'timestamp' }).notNull(),
  metadata: text('metadata') // JSON string for additional non-PII data
});

/**
 * Support Tickets - Anonymous support system
 * Users identify themselves only by public key
 */
export const supportTickets = sqliteTable('support_tickets', {
  id: text('id').primaryKey(),
  publicKey: text('public_key').notNull(), // User's public key for verification
  subject: text('subject').notNull(),
  message: text('message').notNull(),
  status: text('status').default('open').notNull(), // open, in_progress, resolved, closed
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
});

/**
 * Support Ticket Messages - Thread of messages
 */
export const ticketMessages = sqliteTable('ticket_messages', {
  id: text('id').primaryKey(),
  ticketId: text('ticket_id').notNull(),
  content: text('content').notNull(),
  isStaff: integer('is_staff', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
});

/**
 * Signature Counter - Global statistics
 * "X licenses signed, zero identities known"
 */
export const signatureCounter = sqliteTable('signature_counter', {
  id: text('id').primaryKey().default('global'),
  count: integer('count').default(0).notNull(),
  lastUpdated: integer('last_updated', { mode: 'timestamp' }).notNull()
});

/**
 * App Statistics - Per-app anonymous metrics
 */
export const appStats = sqliteTable('app_stats', {
  id: text('id').primaryKey(), // app slug
  totalLicenses: integer('total_licenses').default(0).notNull(),
  monthlyLicenses: integer('monthly_licenses').default(0).notNull(),
  yearlyLicenses: integer('yearly_licenses').default(0).notNull(),
  lifetimeLicenses: integer('lifetime_licenses').default(0).notNull(),
  lastUpdated: integer('last_updated', { mode: 'timestamp' }).notNull()
});

/**
 * Rate Limiting - Prevent abuse without tracking users
 * Uses hashed identifiers that cannot be reversed
 */
export const rateLimits = sqliteTable('rate_limits', {
  id: text('id').primaryKey(), // SHA-256 hash of IP + action
  count: integer('count').default(0).notNull(),
  windowStart: integer('window_start', { mode: 'timestamp' }).notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

// Type exports for TypeScript
export type AuditLog = typeof auditLog.$inferSelect;
export type NewAuditLog = typeof auditLog.$inferInsert;

export type SupportTicket = typeof supportTickets.$inferSelect;
export type NewSupportTicket = typeof supportTickets.$inferInsert;

export type TicketMessage = typeof ticketMessages.$inferSelect;
export type NewTicketMessage = typeof ticketMessages.$inferInsert;

export type SignatureCounter = typeof signatureCounter.$inferSelect;
export type AppStats = typeof appStats.$inferSelect;
export type RateLimit = typeof rateLimits.$inferSelect;

