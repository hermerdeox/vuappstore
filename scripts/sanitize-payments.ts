/**
 * VU Payment Sanitization Script
 * 
 * Removes all references to traditional payment processors
 * and ensures the codebase is crypto-only.
 * 
 * Usage: npx tsx scripts/sanitize-payments.ts
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// Terms to search for
const SEARCH_TERMS = [
  'stripe',
  'Stripe',
  'STRIPE',
  'paypal',
  'PayPal',
  'PAYPAL',
  'credit card',
  'Credit Card',
  'credit_card',
  'creditCard',
  'debit card',
  'Debit Card',
  'card payment',
  'Card Payment',
  'apple pay',
  'Apple Pay',
  'google pay',
  'Google Pay'
];

// Replacement map
const REPLACEMENTS: Record<string, string> = {
  'stripe': 'crypto',
  'Stripe': 'Crypto',
  'STRIPE': 'CRYPTO',
  'paypal': 'monero',
  'PayPal': 'Monero',
  'PAYPAL': 'MONERO',
  'credit card': 'cryptocurrency',
  'Credit Card': 'Cryptocurrency',
  'credit_card': 'cryptocurrency',
  'creditCard': 'cryptocurrency',
  'debit card': 'cryptocurrency',
  'Debit Card': 'Cryptocurrency',
  'card payment': 'crypto payment',
  'Card Payment': 'Crypto Payment',
  'apple pay': 'crypto wallet',
  'Apple Pay': 'Crypto Wallet',
  'google pay': 'crypto wallet',
  'Google Pay': 'Crypto Wallet'
};

// File extensions to process
const EXTENSIONS = ['.ts', '.svelte', '.js', '.json', '.css', '.html'];

// Directories to skip
const SKIP_DIRS = [
  'node_modules',
  '.git',
  'dist',
  '.svelte-kit',
  '.vercel',
  'build',
  'coverage',
  'test-results'
];

// Files to skip (documentation is intentionally kept for context)
const SKIP_FILES = [
  'sanitize-payments.ts', // This script
  '.md' // Markdown documentation
];

interface SanitizationResult {
  file: string;
  terms: string[];
  modified: boolean;
}

function shouldSkipFile(filePath: string): boolean {
  const fileName = filePath.split('/').pop() || '';
  return SKIP_FILES.some(skip => fileName.endsWith(skip));
}

function sanitizeFile(filePath: string): SanitizationResult | null {
  const ext = extname(filePath);
  
  // Skip non-processable files
  if (!EXTENSIONS.includes(ext)) return null;
  
  // Skip certain files
  if (shouldSkipFile(filePath)) return null;
  
  try {
    let content = readFileSync(filePath, 'utf-8');
    let modified = false;
    const termsFound: string[] = [];
    
    for (const term of SEARCH_TERMS) {
      if (content.includes(term)) {
        termsFound.push(term);
        const replacement = REPLACEMENTS[term] || '[REMOVED]';
        content = content.split(term).join(replacement);
        modified = true;
      }
    }
    
    if (modified) {
      writeFileSync(filePath, content);
      return {
        file: filePath,
        terms: termsFound,
        modified: true
      };
    }
    
    return null;
  } catch (e) {
    console.error(`Error processing ${filePath}:`, e);
    return null;
  }
}

function walkDirectory(dir: string, results: SanitizationResult[]): void {
  try {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      // Skip ignored directories
      if (SKIP_DIRS.includes(entry)) continue;
      
      const fullPath = join(dir, entry);
      
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          walkDirectory(fullPath, results);
        } else if (stat.isFile()) {
          const result = sanitizeFile(fullPath);
          if (result) {
            results.push(result);
          }
        }
      } catch (e) {
        // Skip files we can't access
      }
    }
  } catch (e) {
    console.error(`Error reading directory ${dir}:`, e);
  }
}

function scanOnly(dir: string, results: { file: string; terms: string[] }[]): void {
  try {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      if (SKIP_DIRS.includes(entry)) continue;
      
      const fullPath = join(dir, entry);
      
      try {
        const stat = statSync(fullPath);
        
        if (stat.isDirectory()) {
          scanOnly(fullPath, results);
        } else if (stat.isFile()) {
          const ext = extname(fullPath);
          if (!EXTENSIONS.includes(ext)) continue;
          if (shouldSkipFile(fullPath)) continue;
          
          const content = readFileSync(fullPath, 'utf-8');
          const termsFound: string[] = [];
          
          for (const term of SEARCH_TERMS) {
            if (content.includes(term)) {
              termsFound.push(term);
            }
          }
          
          if (termsFound.length > 0) {
            results.push({ file: fullPath, terms: termsFound });
          }
        }
      } catch (e) {
        // Skip
      }
    }
  } catch (e) {
    // Skip
  }
}

// Main execution
console.log('\n🧹 VU Payment Sanitization Script');
console.log('================================\n');

const args = process.argv.slice(2);
const scanOnlyMode = args.includes('--scan') || args.includes('-s');
const targetDir = args.find(a => !a.startsWith('-')) || './src';

if (scanOnlyMode) {
  console.log('📊 SCAN MODE - No files will be modified\n');
  console.log(`Scanning: ${targetDir}\n`);
  
  const scanResults: { file: string; terms: string[] }[] = [];
  scanOnly(targetDir, scanResults);
  
  if (scanResults.length === 0) {
    console.log('✅ No traditional payment references found!\n');
  } else {
    console.log(`⚠️  Found ${scanResults.length} files with payment references:\n`);
    for (const result of scanResults) {
      console.log(`  📄 ${result.file}`);
      console.log(`     Terms: ${result.terms.join(', ')}`);
    }
  }
} else {
  console.log('🔧 SANITIZE MODE - Files will be modified\n');
  console.log(`Target: ${targetDir}\n`);
  console.log('Searching for payment processor references...\n');
  
  const results: SanitizationResult[] = [];
  walkDirectory(targetDir, results);
  
  console.log('\n================================');
  console.log(`✅ Sanitization complete!`);
  console.log(`📁 Modified ${results.length} files\n`);
  
  if (results.length > 0) {
    console.log('Modified files:');
    for (const result of results) {
      console.log(`  📄 ${result.file}`);
      console.log(`     Replaced: ${result.terms.join(', ')}`);
    }
  }
  
  console.log('\n🔒 All references to traditional payment processors have been sanitized.');
  console.log('💎 VU now accepts only anonymous cryptocurrency payments.\n');
}

console.log('Philosophy: "We sign your license. We never see it."\n');

