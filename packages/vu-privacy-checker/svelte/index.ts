/**
 * @vu/privacy-checker/svelte
 * 
 * Svelte components for VU Privacy Checker
 * 
 * @example
 * ```svelte
 * <script>
 *   import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
 * </script>
 * 
 * <VuPrivacyBadge level={1} />
 * ```
 */

export { default as VuPrivacyBadge } from './VuPrivacyBadge.svelte';

// Re-export types for convenience
export type {
  VuPrivacyLevel,
  PrivacyLevelConfig,
  BadgeOptions
} from '../src/types';

// Re-export utilities commonly used with components
export {
  getLevelDisplay,
  getLevelColor,
  getLevelName,
  getLevelEmoji,
  isSubZero
} from '../src/utils';

