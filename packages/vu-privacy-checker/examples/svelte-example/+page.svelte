<!--
  VU Privacy Checker - SvelteKit Example
  
  This example demonstrates how to integrate the VU Privacy Checker
  into a SvelteKit application.
  
  Usage:
  1. Copy this file to your src/routes/ directory
  2. Import the privacy checker in your layout or individual pages
  3. Use the VuPrivacyBadge component to display privacy levels
-->

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  
  // Import from the package
  // In a real app: import { VuPrivacyChecker, VuPrivacyAnalyzer } from '@vu/privacy-checker';
  // For local development:
  import { VuPrivacyChecker, VuPrivacyAnalyzer, LEVEL_COLORS, LEVEL_NAMES, LEVEL_EMOJIS, getVuLevels } from '../../src';
  import type { PrivacyAnalysis, PrivacyAssessment, VuPrivacyLevel } from '../../src/types';
  
  // Import Svelte component
  // In a real app: import { VuPrivacyBadge } from '@vu/privacy-checker/svelte';
  import VuPrivacyBadge from '../../svelte/VuPrivacyBadge.svelte';

  // Initialize the privacy checker with route configurations
  const checker = new VuPrivacyChecker({
    appName: 'SvelteKit Demo',
    appVersion: '1.0.0',
    defaultLevel: 2,
    routes: {
      '/': { level: 1, whyThisLevel: 'Homepage is static with zero tracking' },
      '/apps': { level: 1 },
      '/account': { level: 2 },
      '/account/settings': { level: 2 },
      '/support/contact': { level: 3 },
      '/checkout': { level: 2 },
      '/offline': { level: 0 }
    }
  });

  // Initialize the analyzer
  const analyzer = new VuPrivacyAnalyzer();

  // Reactive config based on current path
  $: currentConfig = checker.getConfigForPath($page.url.pathname);

  // State for analysis demo
  let analysisResult: PrivacyAnalysis | null = null;
  let selectedLevel: VuPrivacyLevel = 2;
  
  // Form state
  let formData = {
    encryptionType: 'end_to_end' as const,
    architecture: 'local_first' as const,
    offlineCapability: 80,
    collectsEmail: true,
    collectsLocation: false,
    usesAnalytics: false,
    openSource: true,
    canDeleteData: true,
    worksOffline: true
  };

  function runAnalysis() {
    const dataTypes: string[] = [];
    if (formData.collectsEmail) dataTypes.push('email');
    if (formData.collectsLocation) dataTypes.push('location');
    
    const assessment: PrivacyAssessment = {
      collectsUserData: dataTypes.length > 0,
      dataTypesCollected: dataTypes.length > 0 ? dataTypes as any[] : ['none'],
      dataCollectionOptional: true,
      canDeleteData: formData.canDeleteData,
      dataLeavesDevice: formData.architecture !== 'local_only',
      encryptionType: formData.encryptionType,
      encryptedAtRest: true,
      encryptedInTransit: true,
      serviceCanReadData: !['end_to_end', 'zero_knowledge'].includes(formData.encryptionType),
      thirdPartyServices: [],
      usesAnalytics: formData.usesAnalytics,
      analyticsType: formData.usesAnalytics ? 'self_hosted' : 'none',
      usesAdvertising: false,
      architecture: formData.architecture,
      worksOffline: formData.worksOffline,
      offlineCapability: formData.offlineCapability,
      authMethod: 'email',
      requiresRealIdentity: false,
      allowsPseudonymous: true,
      openSource: formData.openSource,
      independentlyAudited: false,
      privacyPolicyClarity: 75,
      dataPracticesDocumented: true,
      usesZeroKnowledgeProofs: false,
      usesFederatedLearning: false,
      usesDifferentialPrivacy: false,
      isPeerToPeer: formData.architecture === 'peer_to_peer',
      usesOnionRouting: false
    };
    
    analysisResult = analyzer.analyze(assessment);
  }

  // Get all VU levels for the badge demo
  const levels = getVuLevels();
</script>

<svelte:head>
  <title>VU Privacy Checker - SvelteKit Example</title>
</svelte:head>

<main class="container">
  <header class="header">
    <h1>🛡️ VU Privacy Checker</h1>
    <p class="subtitle">SvelteKit Integration Example</p>
  </header>

  <!-- Current Page Privacy Badge -->
  <section class="section current-page">
    <h2>Current Page Privacy</h2>
    <div class="current-badge-row">
      <VuPrivacyBadge config={currentConfig} size="lg" />
      <div class="current-info">
        <h3>{currentConfig.levelName}</h3>
        <p>{currentConfig.description}</p>
      </div>
    </div>
  </section>

  <!-- Badge Demo Section -->
  <section class="section">
    <h2>Privacy Level Badges</h2>
    <div class="badge-grid">
      {#each levels as level}
        <div class="badge-item">
          <VuPrivacyBadge 
            {level} 
            showModal={true}
            on:click={(e) => selectedLevel = e.detail.level}
          />
          <span class="badge-label">{LEVEL_NAMES[level]}</span>
        </div>
      {/each}
    </div>
    <p class="hint">Click any badge to see details. Lower numbers = Better privacy.</p>
  </section>

  <!-- Analysis Demo Section -->
  <section class="section">
    <h2>🔍 Analyze Your App</h2>
    
    <div class="analysis-form">
      <div class="form-row">
        <div class="form-group">
          <label for="encryption">Encryption Type</label>
          <select id="encryption" bind:value={formData.encryptionType}>
            <option value="none">None</option>
            <option value="transit_only">Transit Only (HTTPS)</option>
            <option value="at_rest">At Rest</option>
            <option value="end_to_end">End-to-End</option>
            <option value="zero_knowledge">Zero-Knowledge</option>
          </select>
        </div>

        <div class="form-group">
          <label for="arch">Architecture</label>
          <select id="arch" bind:value={formData.architecture}>
            <option value="cloud_native">Cloud Native</option>
            <option value="client_server">Client-Server</option>
            <option value="local_first">Local-First</option>
            <option value="local_only">Local Only</option>
            <option value="peer_to_peer">Peer-to-Peer</option>
          </select>
        </div>

        <div class="form-group">
          <label for="offline">Offline Capability (%)</label>
          <input 
            type="number" 
            id="offline" 
            bind:value={formData.offlineCapability} 
            min="0" 
            max="100"
          />
        </div>
      </div>

      <div class="checkbox-row">
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.collectsEmail} />
          Collects Email
        </label>
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.collectsLocation} />
          Collects Location
        </label>
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.usesAnalytics} />
          Uses Analytics
        </label>
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.openSource} />
          Open Source
        </label>
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.canDeleteData} />
          Can Delete Data
        </label>
        <label class="checkbox-item">
          <input type="checkbox" bind:checked={formData.worksOffline} />
          Works Offline
        </label>
      </div>

      <button class="analyze-btn" on:click={runAnalysis}>
        🔍 Analyze Privacy
      </button>
    </div>

    {#if analysisResult}
      {@const color = LEVEL_COLORS[analysisResult.level]}
      {@const emoji = LEVEL_EMOJIS[analysisResult.level]}
      {@const name = LEVEL_NAMES[analysisResult.level]}
      
      <div class="result-card">
        <div class="result-header">
          <div 
            class="result-level"
            style="background: linear-gradient(135deg, {color.color}, {color.colorDark || color.color});"
          >
            V{analysisResult.level === 'subzero' ? '∅' : analysisResult.level}
          </div>
          <div class="result-info">
            <h3>{emoji} {name}</h3>
            <span class="score">Score: {analysisResult.score}/100</span>
          </div>
        </div>

        <p class="summary">{analyzer.getBrutalSummary(analysisResult)}</p>

        {#if analysisResult.redFlags.length > 0}
          <div class="flags-section">
            <h4>⚠️ Red Flags</h4>
            {#each analysisResult.redFlags.slice(0, 5) as flag}
              <div class="flag flag-{flag.severity}">
                <span class="flag-severity">{flag.severity}</span>
                <span>{flag.description}</span>
              </div>
            {/each}
          </div>
        {/if}

        {#if analysisResult.greenFlags.length > 0}
          <div class="flags-section">
            <h4>✅ Green Flags</h4>
            {#each analysisResult.greenFlags.slice(0, 5) as flag}
              <div class="flag flag-green">
                <span>+{flag.impact}</span>
                <span>{flag.description}</span>
              </div>
            {/each}
          </div>
        {/if}

        {#if analysisResult.recommendations.length > 0}
          <div class="recommendations">
            <h4>💡 Recommendations</h4>
            <ul>
              {#each analysisResult.recommendations.slice(0, 3) as rec}
                <li>{rec}</li>
              {/each}
            </ul>
          </div>
        {/if}
      </div>
    {/if}
  </section>
</main>

<style>
  .container {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 48px;
  }

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(90deg, #00d4ff, #00ff88);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 8px;
  }

  .subtitle {
    color: var(--text-secondary, #888);
    font-size: 1.1rem;
  }

  .section {
    background: var(--card-bg, rgba(255, 255, 255, 0.05));
    border-radius: 16px;
    padding: 24px;
    margin-bottom: 24px;
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.1));
  }

  h2 {
    font-size: 1.25rem;
    margin-bottom: 20px;
    color: var(--primary, #00d4ff);
  }

  .current-badge-row {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .current-info h3 {
    margin: 0 0 8px 0;
    font-size: 1.1rem;
  }

  .current-info p {
    margin: 0;
    color: var(--text-secondary, #888);
    font-size: 0.9rem;
  }

  .badge-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }

  .badge-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .badge-label {
    font-size: 11px;
    color: var(--text-secondary, #888);
    text-align: center;
  }

  .hint {
    text-align: center;
    font-size: 13px;
    color: var(--text-muted, #666);
    margin-top: 16px;
  }

  .analysis-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-row {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 13px;
    color: var(--text-secondary, #888);
  }

  select, input[type="number"] {
    background: var(--input-bg, rgba(0, 0, 0, 0.3));
    border: 1px solid var(--border-color, rgba(255, 255, 255, 0.2));
    border-radius: 8px;
    padding: 10px 14px;
    color: var(--text-primary, #fff);
    font-size: 14px;
  }

  select:focus, input:focus {
    outline: none;
    border-color: var(--primary, #00d4ff);
  }

  .checkbox-row {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }

  .checkbox-item {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--input-bg, rgba(0, 0, 0, 0.2));
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
  }

  .checkbox-item input {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }

  .analyze-btn {
    background: linear-gradient(135deg, #00d4ff, #00ff88);
    border: none;
    border-radius: 8px;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    color: #000;
    cursor: pointer;
    transition: all 0.2s;
    align-self: flex-start;
  }

  .analyze-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 212, 255, 0.4);
  }

  .result-card {
    background: var(--card-bg-dark, rgba(0, 0, 0, 0.3));
    border-radius: 12px;
    padding: 20px;
    margin-top: 24px;
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
  }

  .result-level {
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    font-size: 24px;
    font-weight: 900;
    color: #fff;
  }

  .result-info h3 {
    margin: 0 0 4px 0;
    font-size: 1.25rem;
  }

  .score {
    font-size: 14px;
    color: var(--text-secondary, #888);
  }

  .summary {
    font-size: 14px;
    line-height: 1.6;
    padding: 12px;
    background: var(--input-bg, rgba(255, 255, 255, 0.05));
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .flags-section {
    margin-top: 16px;
  }

  .flags-section h4 {
    font-size: 14px;
    color: var(--text-secondary, #888);
    margin-bottom: 8px;
  }

  .flag {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 8px;
    font-size: 13px;
  }

  .flag-critical { background: rgba(239, 68, 68, 0.2); border-left: 3px solid #ef4444; }
  .flag-high { background: rgba(249, 115, 22, 0.2); border-left: 3px solid #f97316; }
  .flag-medium { background: rgba(234, 179, 8, 0.2); border-left: 3px solid #eab308; }
  .flag-low { background: rgba(107, 114, 128, 0.2); border-left: 3px solid #6b7280; }
  .flag-green { background: rgba(34, 197, 94, 0.2); border-left: 3px solid #22c55e; }

  .flag-severity {
    font-weight: 600;
    text-transform: uppercase;
    font-size: 10px;
  }

  .recommendations {
    margin-top: 16px;
    padding: 12px;
    background: rgba(59, 130, 246, 0.1);
    border-radius: 8px;
    border-left: 3px solid #3b82f6;
  }

  .recommendations h4 {
    font-size: 14px;
    margin-bottom: 8px;
  }

  .recommendations ul {
    padding-left: 20px;
    font-size: 13px;
    line-height: 1.6;
    margin: 0;
  }
</style>

