<script lang="ts">
/**
 * VU Privacy Badge - Svelte Component
 * 
 * A reusable privacy level badge that displays the current privacy level
 * with an optional expandable modal for detailed information.
 * 
 * @example
 * ```svelte
 * <script>
 *   import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
 * </script>
 * 
 * <VuPrivacyBadge level={1} showModal={true} />
 * ```
 */

import { onMount, onDestroy, createEventDispatcher } from 'svelte';
import { fade, fly, scale } from 'svelte/transition';
import type { VuPrivacyLevel, PrivacyLevelConfig } from '../src/types';
import {
  LEVEL_COLORS,
  LEVEL_NAMES,
  LEVEL_SHORT_NAMES,
  LEVEL_DESCRIPTIONS,
  LEVEL_USER_CONTROL,
  LEVEL_CANT_SEE,
  LEVEL_SERVER_SEES,
  LEVEL_TRADEOFFS,
  LEVEL_QUALITY,
  LEVEL_EMOJIS
} from '../src/constants';

// Props
export let level: VuPrivacyLevel = 2;
export let config: PrivacyLevelConfig | null = null;
export let showModal: boolean = true;
export let size: 'sm' | 'md' | 'lg' = 'md';
export let position: 'inline' | 'fixed' = 'inline';
export let fixedPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' = 'bottom-right';
export let ariaLabel: string = '';

// State
let isModalOpen = false;
let mounted = false;

// Computed values
$: currentLevel = config?.level ?? level;
$: color = LEVEL_COLORS[currentLevel];
$: levelName = config?.levelName ?? LEVEL_NAMES[currentLevel];
$: shortName = LEVEL_SHORT_NAMES[currentLevel];
$: description = config?.description ?? LEVEL_DESCRIPTIONS[currentLevel];
$: userControl = config?.whatYouControl ?? LEVEL_USER_CONTROL[currentLevel].join('. ');
$: cantSee = config?.whatWeCantSee ?? LEVEL_CANT_SEE[currentLevel].join('. ');
$: serverSees = config?.whatServersSee ?? LEVEL_SERVER_SEES[currentLevel].join('. ');
$: tradeoffs = config?.tradeoffs ?? LEVEL_TRADEOFFS[currentLevel];
$: quality = LEVEL_QUALITY[currentLevel];
$: emoji = LEVEL_EMOJIS[currentLevel];
$: isSubZero = currentLevel === 'subzero';

$: computedAriaLabel = ariaLabel || `VU Privacy Level ${currentLevel} - ${levelName}. Click for details.`;

$: sizeClasses = {
  sm: 'vu-badge-sm',
  md: 'vu-badge-md',
  lg: 'vu-badge-lg'
}[size];

$: positionClasses = position === 'fixed' 
  ? `vu-badge-fixed vu-badge-${fixedPosition}` 
  : 'vu-badge-inline';

// Event dispatcher
const dispatch = createEventDispatcher<{
  click: { level: VuPrivacyLevel; isModalOpen: boolean };
  modalOpen: { level: VuPrivacyLevel };
  modalClose: { level: VuPrivacyLevel };
}>();

// Functions
function handleBadgeClick() {
  if (showModal) {
    isModalOpen = !isModalOpen;
    dispatch('click', { level: currentLevel, isModalOpen });
    
    if (isModalOpen) {
      dispatch('modalOpen', { level: currentLevel });
    } else {
      dispatch('modalClose', { level: currentLevel });
    }
  }
}

function handleClose() {
  isModalOpen = false;
  dispatch('modalClose', { level: currentLevel });
}

function handleBackdropClick(e: MouseEvent) {
  if (e.target === e.currentTarget) {
    handleClose();
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isModalOpen) {
    handleClose();
  }
}

function getLevelDisplay(): string {
  if (isSubZero) return '∅';
  return currentLevel.toString();
}

onMount(() => {
  mounted = true;
});
</script>

<svelte:window on:keydown={handleKeydown} />

<!-- Badge Button -->
<button
  class="vu-privacy-badge {sizeClasses} {positionClasses}"
  class:vu-subzero={isSubZero}
  class:vu-modal-open={isModalOpen}
  style="--badge-color: {color.color}; --badge-color-rgb: {color.colorRgb}; --badge-color-dark: {color.colorDark};"
  on:click={handleBadgeClick}
  aria-label={computedAriaLabel}
  aria-expanded={showModal ? isModalOpen : undefined}
  data-testid="vu-privacy-badge"
  data-level={currentLevel}
>
  <span class="vu-badge-content">
    <span class="vu-badge-v">V</span>
    <span class="vu-badge-level">{getLevelDisplay()}</span>
  </span>
  
  {#if isModalOpen}
    <span class="vu-badge-glow" in:scale={{ duration: 200 }}></span>
  {/if}
</button>

<!-- Privacy Modal -->
{#if isModalOpen && showModal && mounted}
  <div 
    class="vu-privacy-modal-backdrop" 
    on:click={handleBackdropClick}
    on:keydown={(e) => e.key === 'Enter' && handleBackdropClick}
    role="dialog"
    aria-modal="true"
    aria-labelledby="vu-privacy-modal-title"
    transition:fade={{ duration: 200 }}
  >
    <div 
      class="vu-privacy-modal"
      class:vu-modal-subzero={isSubZero}
      style="--modal-color: {color.color}; --modal-color-rgb: {color.colorRgb};"
      in:fly={{ y: 20, duration: 300 }}
      out:fly={{ y: 10, duration: 150 }}
    >
      <!-- Header -->
      <header class="vu-modal-header">
        <div class="vu-modal-level-badge">
          <span class="vu-modal-v">V</span>
          <span class="vu-modal-number">{getLevelDisplay()}</span>
        </div>
        
        <div class="vu-modal-title-group">
          <h2 id="vu-privacy-modal-title" class="vu-modal-title">
            {emoji} {levelName}
          </h2>
          <span class="vu-modal-quality {quality.class}">{quality.label}</span>
        </div>
        
        <button 
          class="vu-modal-close" 
          on:click={handleClose}
          aria-label="Close privacy details"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </header>

      <!-- Content -->
      <div class="vu-modal-content">
        <!-- Description -->
        <section class="vu-modal-section">
          <p class="vu-modal-description">{description}</p>
        </section>

        <!-- Privacy Grid -->
        <section class="vu-modal-section">
          <h3 class="vu-modal-section-title">Privacy Details</h3>
          
          <div class="vu-privacy-grid">
            <div class="vu-grid-item vu-grid-control">
              <span class="vu-grid-icon">✅</span>
              <div class="vu-grid-content">
                <strong>What You Control</strong>
                <p>{userControl}</p>
              </div>
            </div>
            
            <div class="vu-grid-item vu-grid-cant-see">
              <span class="vu-grid-icon">🔒</span>
              <div class="vu-grid-content">
                <strong>What We Can't See</strong>
                <p>{cantSee}</p>
              </div>
            </div>
            
            <div class="vu-grid-item vu-grid-server-sees">
              <span class="vu-grid-icon">🖥️</span>
              <div class="vu-grid-content">
                <strong>What Servers See</strong>
                <p>{serverSees}</p>
              </div>
            </div>
          </div>
        </section>

        <!-- Tradeoffs -->
        {#if tradeoffs.length > 0}
          <section class="vu-modal-section">
            <h3 class="vu-modal-section-title">Honest Tradeoffs</h3>
            <ul class="vu-tradeoffs-list">
              {#each tradeoffs as tradeoff}
                <li>{tradeoff}</li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>

      <!-- Footer -->
      <footer class="vu-modal-footer">
        <a 
          href="/privacy-levels" 
          class="vu-modal-link"
          on:click={handleClose}
        >
          Learn more about VU Privacy Levels →
        </a>
      </footer>
    </div>
  </div>
{/if}

<style>
  /* ========================================
   * VU Privacy Badge - Core Styles
   * ======================================== */

  .vu-privacy-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, rgba(var(--badge-color-rgb), 0.2), rgba(var(--badge-color-rgb), 0.1));
    border: 2px solid var(--badge-color);
    border-radius: 12px;
    cursor: pointer;
    font-family: system-ui, -apple-system, sans-serif;
    font-weight: 700;
    transition: all 0.2s ease;
    position: relative;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(var(--badge-color-rgb), 0.3);
  }

  .vu-privacy-badge:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(var(--badge-color-rgb), 0.4);
  }

  .vu-privacy-badge:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(var(--badge-color-rgb), 0.5);
  }

  /* Sizes */
  .vu-badge-sm {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 8px;
  }

  .vu-badge-md {
    padding: 6px 12px;
    font-size: 14px;
  }

  .vu-badge-lg {
    padding: 8px 16px;
    font-size: 18px;
    border-radius: 16px;
  }

  /* Badge Content */
  .vu-badge-content {
    display: flex;
    align-items: center;
    gap: 2px;
    color: var(--badge-color);
  }

  .vu-badge-v {
    opacity: 0.8;
  }

  .vu-badge-level {
    font-weight: 900;
  }

  /* SubZero special styling */
  .vu-subzero {
    background: linear-gradient(135deg, #000 0%, #1a1a1a 50%, #000 100%);
    border-color: #fff;
    animation: subzero-pulse 2s ease-in-out infinite;
  }

  .vu-subzero .vu-badge-content {
    color: #fff;
  }

  @keyframes subzero-pulse {
    0%, 100% { box-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
  }

  /* Fixed position variants */
  .vu-badge-fixed {
    position: fixed;
    z-index: 9999;
  }

  .vu-badge-top-left { top: 16px; left: 16px; }
  .vu-badge-top-right { top: 16px; right: 16px; }
  .vu-badge-bottom-left { bottom: 16px; left: 16px; }
  .vu-badge-bottom-right { bottom: 16px; right: 16px; }

  /* Glow effect */
  .vu-badge-glow {
    position: absolute;
    inset: -2px;
    background: radial-gradient(circle, rgba(var(--badge-color-rgb), 0.4), transparent);
    border-radius: inherit;
    pointer-events: none;
  }

  /* ========================================
   * Modal Styles
   * ======================================== */

  .vu-privacy-modal-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    padding: 16px;
  }

  .vu-privacy-modal {
    background: linear-gradient(135deg, #1a1a2e, #16213e);
    border: 1px solid rgba(var(--modal-color-rgb), 0.3);
    border-radius: 16px;
    max-width: 480px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(var(--modal-color-rgb), 0.2);
    color: #fff;
    font-family: system-ui, -apple-system, sans-serif;
  }

  /* Modal Header */
  .vu-modal-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .vu-modal-level-badge {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, var(--modal-color), var(--modal-color-dark, var(--modal-color)));
    border-radius: 12px;
    font-weight: 900;
    font-size: 18px;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }

  .vu-modal-v {
    opacity: 0.8;
    font-size: 14px;
  }

  .vu-modal-title-group {
    flex: 1;
  }

  .vu-modal-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }

  .vu-modal-quality {
    display: inline-block;
    font-size: 11px;
    padding: 2px 8px;
    border-radius: 4px;
    margin-top: 4px;
    background: rgba(var(--modal-color-rgb), 0.2);
    color: var(--modal-color);
  }

  .vu-modal-close {
    width: 32px;
    height: 32px;
    padding: 0;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    opacity: 0.7;
    transition: all 0.2s;
  }

  .vu-modal-close:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }

  .vu-modal-close svg {
    width: 16px;
    height: 16px;
  }

  /* Modal Content */
  .vu-modal-content {
    padding: 20px;
  }

  .vu-modal-section {
    margin-bottom: 20px;
  }

  .vu-modal-section:last-child {
    margin-bottom: 0;
  }

  .vu-modal-description {
    font-size: 14px;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.9);
    margin: 0;
  }

  .vu-modal-section-title {
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--modal-color);
    margin: 0 0 12px 0;
  }

  /* Privacy Grid */
  .vu-privacy-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .vu-grid-item {
    display: flex;
    gap: 12px;
    padding: 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    border-left: 3px solid transparent;
  }

  .vu-grid-control {
    border-left-color: #22c55e;
  }

  .vu-grid-cant-see {
    border-left-color: #3b82f6;
  }

  .vu-grid-server-sees {
    border-left-color: #f97316;
  }

  .vu-grid-icon {
    font-size: 20px;
    flex-shrink: 0;
  }

  .vu-grid-content strong {
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 4px;
  }

  .vu-grid-content p {
    margin: 0;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    line-height: 1.4;
  }

  /* Tradeoffs List */
  .vu-tradeoffs-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .vu-tradeoffs-list li {
    position: relative;
    padding-left: 16px;
    font-size: 13px;
    color: rgba(255, 255, 255, 0.7);
    margin-bottom: 8px;
    line-height: 1.4;
  }

  .vu-tradeoffs-list li:last-child {
    margin-bottom: 0;
  }

  .vu-tradeoffs-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: var(--modal-color);
  }

  /* Modal Footer */
  .vu-modal-footer {
    padding: 16px 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
  }

  .vu-modal-link {
    font-size: 13px;
    color: var(--modal-color);
    text-decoration: none;
    opacity: 0.9;
    transition: opacity 0.2s;
  }

  .vu-modal-link:hover {
    opacity: 1;
    text-decoration: underline;
  }

  /* SubZero Modal Variant */
  .vu-modal-subzero {
    background: linear-gradient(135deg, #000, #111, #000);
    border-color: rgba(255, 255, 255, 0.3);
  }

  .vu-modal-subzero .vu-modal-level-badge {
    background: linear-gradient(135deg, #000, #333);
    border: 1px solid #fff;
  }

  /* Responsive */
  @media (max-width: 480px) {
    .vu-privacy-modal {
      margin: 8px;
      max-height: 95vh;
      border-radius: 12px;
    }

    .vu-modal-header {
      padding: 16px;
    }

    .vu-modal-content {
      padding: 16px;
    }
  }
</style>

