<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { Shield, Activity, Database, Globe, Lock, CheckCircle, X, AlertTriangle } from 'lucide-svelte';
	
	export let isOpen = false;
	
	let networkRequests: any[] = [];
	let localStorageItems: any[] = [];
	let cookies: string[] = [];
	let sessionStorageItems: any[] = [];
	let activeTab = 'overview';
	let performanceObserver: PerformanceObserver | null = null;
	
	// Privacy score calculation
	$: privacyScore = calculatePrivacyScore();
	
	function calculatePrivacyScore() {
		let score = 100;
		
		// Deduct points for various privacy concerns
		if (cookies.length > 0) score -= cookies.length * 10;
		if (networkRequests.some(r => r.url.includes('google') || r.url.includes('facebook'))) score -= 50;
		if (networkRequests.filter(r => !r.url.startsWith(window.location.origin)).length > 0) score -= 20;
		
		return Math.max(0, score);
	}
	
	onMount(() => {
		// Listen for open event
		const handleOpen = () => {
			isOpen = true;
			scanPrivacy();
		};
		window.addEventListener('openPrivacyInspector', handleOpen);
		
		// Monitor network requests
		if (typeof PerformanceObserver !== 'undefined') {
			performanceObserver = new PerformanceObserver((list) => {
				const entries = list.getEntries();
				entries.forEach(entry => {
					if (entry.entryType === 'resource') {
						const resourceEntry = entry as PerformanceResourceTiming;
						networkRequests = [...networkRequests, {
							url: resourceEntry.name,
							type: resourceEntry.initiatorType,
							size: resourceEntry.transferSize || 0,
							duration: resourceEntry.duration,
							timestamp: new Date().toLocaleTimeString()
						}];
					}
				});
			});
			
			try {
				performanceObserver.observe({ entryTypes: ['resource'] });
			} catch (e) {
				console.log('Performance observer not supported');
			}
		}
		
		return () => {
			window.removeEventListener('openPrivacyInspector', handleOpen);
			if (performanceObserver) {
				performanceObserver.disconnect();
			}
		};
	});
	
	function scanPrivacy() {
		// Scan cookies
		cookies = document.cookie ? document.cookie.split(';').map(c => c.trim()) : [];
		
		// Scan localStorage
		localStorageItems = Object.keys(localStorage).map(key => ({
			key,
			value: localStorage.getItem(key)?.substring(0, 50) + '...',
			size: new Blob([localStorage.getItem(key) || '']).size
		}));
		
		// Scan sessionStorage
		sessionStorageItems = Object.keys(sessionStorage).map(key => ({
			key,
			value: sessionStorage.getItem(key)?.substring(0, 50) + '...',
			size: new Blob([sessionStorage.getItem(key) || '']).size
		}));
		
		// Get existing network requests from performance API
		if (typeof performance !== 'undefined' && performance.getEntriesByType) {
			const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
			networkRequests = resources.map(r => ({
				url: r.name,
				type: r.initiatorType,
				size: r.transferSize || 0,
				duration: r.duration,
				timestamp: 'Initial load'
			}));
		}
	}
	
	function closeInspector() {
		isOpen = false;
	}
	
	function clearAllData() {
		if (confirm('This will clear all local data. Are you sure?')) {
			localStorage.clear();
			sessionStorage.clear();
			document.cookie.split(";").forEach(c => {
				document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
			});
			scanPrivacy();
		}
	}
</script>

{#if isOpen}
	<div 
		class="privacy-inspector-overlay"
		on:click={closeInspector}
		on:keydown={(e) => e.key === 'Escape' && closeInspector()}
		transition:fade={{ duration: 200 }}
		role="button"
		tabindex="-1"
	/>
	
	<div 
		class="privacy-inspector"
		transition:slide={{ duration: 300 }}
	>
		<div class="inspector-header">
			<div class="header-title">
				<Shield class="w-6 h-6 text-primary" />
				<h2 class="text-xl font-bold">Privacy Inspector</h2>
				<span class="privacy-score" class:perfect={privacyScore === 100} class:good={privacyScore >= 80 && privacyScore < 100} class:poor={privacyScore < 80}>
					Score: {privacyScore}%
				</span>
			</div>
			<button 
				class="btn-close"
				on:click={closeInspector}
				aria-label="Close"
			>
				<X class="w-5 h-5" />
			</button>
		</div>
		
		<div class="inspector-tabs">
			<button 
				class="tab"
				class:active={activeTab === 'overview'}
				on:click={() => activeTab = 'overview'}
			>
				Overview
			</button>
			<button 
				class="tab"
				class:active={activeTab === 'network'}
				on:click={() => activeTab = 'network'}
			>
				<Globe class="w-4 h-4" />
				Network ({networkRequests.length})
			</button>
			<button 
				class="tab"
				class:active={activeTab === 'storage'}
				on:click={() => activeTab = 'storage'}
			>
				<Database class="w-4 h-4" />
				Storage
			</button>
			<button 
				class="tab"
				class:active={activeTab === 'cookies'}
				on:click={() => activeTab = 'cookies'}
			>
				🍪 Cookies ({cookies.length})
			</button>
		</div>
		
		<div class="inspector-content">
			{#if activeTab === 'overview'}
				<div class="overview-content">
					<div class="privacy-manifest">
						<h3 class="manifest-title">VU PRIVACY FACTS</h3>
						<div class="manifest-grid">
							<div class="manifest-item">
								<span class="item-label">Cookies:</span>
								<span class="item-value" class:zero={cookies.length === 0}>
									{cookies.length === 0 ? 'ZERO' : cookies.length}
								</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">External Requests:</span>
								<span class="item-value" class:zero={networkRequests.filter(r => !r.url.startsWith(window.location.origin)).length === 0}>
									{networkRequests.filter(r => !r.url.startsWith(window.location.origin)).length === 0 ? 'ZERO' : networkRequests.filter(r => !r.url.startsWith(window.location.origin)).length}
								</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Trackers:</span>
								<span class="item-value zero">ZERO</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Analytics:</span>
								<span class="item-value zero">ZERO</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Data Shared:</span>
								<span class="item-value zero">ZERO</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Data Sold:</span>
								<span class="item-value zero">ZERO</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Logs Kept:</span>
								<span class="item-value zero">ZERO</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Ads:</span>
								<span class="item-value zero">ZERO</span>
							</div>
						</div>
						<div class="manifest-footer">
							<div class="manifest-item">
								<span class="item-label">Encryption:</span>
								<span class="item-value success">256-bit</span>
							</div>
							<div class="manifest-item">
								<span class="item-label">Your Control:</span>
								<span class="item-value success">100%</span>
							</div>
						</div>
					</div>
					
					<div class="quick-actions">
						<button class="action-btn" on:click={() => activeTab = 'network'}>
							<Activity class="w-4 h-4" />
							Monitor Network
						</button>
						<button class="action-btn" on:click={scanPrivacy}>
							<Shield class="w-4 h-4" />
							Rescan Privacy
						</button>
						<button class="action-btn danger" on:click={clearAllData}>
							<AlertTriangle class="w-4 h-4" />
							Clear All Data
						</button>
					</div>
				</div>
			{/if}
			
			{#if activeTab === 'network'}
				<div class="network-content">
					<div class="network-header">
						<h3>Live Network Monitor</h3>
						<span class="status-badge">
							{#if networkRequests.length === 0}
								<CheckCircle class="w-4 h-4 text-success" />
								No external requests
							{:else}
								<Activity class="w-4 h-4 text-primary" />
								{networkRequests.length} requests
							{/if}
						</span>
					</div>
					
					{#if networkRequests.length === 0}
						<div class="empty-state">
							<CheckCircle class="w-12 h-12 text-success mb-3" />
							<p>No network requests detected!</p>
							<small>This app runs entirely on your device.</small>
						</div>
					{:else}
						<div class="request-list">
							{#each networkRequests as request}
								<div class="request-item">
									<div class="request-url">{request.url.substring(0, 50)}...</div>
									<div class="request-meta">
										<span class="request-type">{request.type}</span>
										<span class="request-size">{(request.size / 1024).toFixed(1)} KB</span>
										<span class="request-time">{request.timestamp}</span>
									</div>
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
			
			{#if activeTab === 'storage'}
				<div class="storage-content">
					<div class="storage-section">
						<h4>Local Storage ({localStorageItems.length} items)</h4>
						{#if localStorageItems.length === 0}
							<p class="empty-message">No local storage data</p>
						{:else}
							<div class="storage-list">
								{#each localStorageItems as item}
									<div class="storage-item">
										<span class="storage-key">{item.key}</span>
										<span class="storage-size">{(item.size / 1024).toFixed(1)} KB</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
					
					<div class="storage-section">
						<h4>Session Storage ({sessionStorageItems.length} items)</h4>
						{#if sessionStorageItems.length === 0}
							<p class="empty-message">No session storage data</p>
						{:else}
							<div class="storage-list">
								{#each sessionStorageItems as item}
									<div class="storage-item">
										<span class="storage-key">{item.key}</span>
										<span class="storage-size">{(item.size / 1024).toFixed(1)} KB</span>
									</div>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			{/if}
			
			{#if activeTab === 'cookies'}
				<div class="cookies-content">
					{#if cookies.length === 0}
						<div class="empty-state">
							<div class="cookie-monster">
								<div class="cookie-icon">
									<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10"></circle>
										<circle cx="9" cy="9" r="1"></circle>
										<circle cx="15" cy="9" r="1"></circle>
										<circle cx="9" cy="15" r="1"></circle>
										<circle cx="15" cy="15" r="1"></circle>
										<circle cx="12" cy="12" r="1"></circle>
									</svg>
									<svg class="ban-icon" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
										<circle cx="12" cy="12" r="10"></circle>
										<line x1="4.93" y1="4.93" x2="19.07" y2="19.07"></line>
									</svg>
								</div>
							</div>
							<h3>Zero Cookies!</h3>
							<p>As promised, this site doesn't use any cookies.</p>
							<small>Not for tracking, not for analytics, not for anything.</small>
						</div>
					{:else}
						<div class="cookie-list">
							<AlertTriangle class="w-5 h-5 text-warning" />
							<p>Found {cookies.length} cookie(s):</p>
							{#each cookies as cookie}
								<div class="cookie-item">{cookie}</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.privacy-inspector-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(4px);
		z-index: 2000;
	}
	
	.privacy-inspector {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 90%;
		max-width: 800px;
		max-height: 80vh;
		background: linear-gradient(135deg, 
			rgba(0, 0, 0, 0.98) 0%, 
			rgba(0, 20, 40, 0.98) 100%);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 20px;
		box-shadow: 
			0 25px 50px rgba(0, 0, 0, 0.7),
			0 0 100px rgba(0, 212, 255, 0.1),
			inset 0 0 30px rgba(0, 212, 255, 0.05);
		z-index: 2001;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}
	
	.inspector-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(0, 0, 0, 0.5);
	}
	
	.header-title {
		display: flex;
		align-items: center;
		gap: 12px;
	}
	
	.privacy-score {
		padding: 4px 12px;
		border-radius: 20px;
		font-size: 14px;
		font-weight: 600;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.2);
	}
	
	.privacy-score.perfect {
		background: rgba(34, 197, 94, 0.2);
		border-color: rgba(34, 197, 94, 0.3);
		color: #22c55e;
	}
	
	.privacy-score.good {
		background: rgba(255, 184, 0, 0.2);
		border-color: rgba(255, 184, 0, 0.3);
		color: #ffb800;
	}
	
	.privacy-score.poor {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}
	
	.btn-close {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(255, 255, 255, 0.1);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #888;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.btn-close:hover {
		background: rgba(255, 255, 255, 0.2);
		color: #fff;
	}
	
	.inspector-tabs {
		display: flex;
		gap: 2px;
		padding: 0 20px;
		background: rgba(0, 0, 0, 0.3);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.tab {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 12px 20px;
		background: transparent;
		border: none;
		color: #888;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
		border-bottom: 2px solid transparent;
		margin-bottom: -1px;
	}
	
	.tab:hover {
		color: #fff;
		background: rgba(255, 255, 255, 0.05);
	}
	
	.tab.active {
		color: #00d4ff;
		border-bottom-color: #00d4ff;
		background: rgba(0, 212, 255, 0.05);
	}
	
	.inspector-content {
		flex: 1;
		overflow-y: auto;
		padding: 20px;
	}
	
	/* Overview Tab */
	.overview-content {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}
	
	.privacy-manifest {
		background: rgba(0, 0, 0, 0.5);
		border: 2px solid rgba(0, 212, 255, 0.2);
		border-radius: 12px;
		padding: 20px;
	}
	
	.manifest-title {
		text-align: center;
		font-size: 18px;
		font-weight: 700;
		color: #00d4ff;
		margin-bottom: 20px;
		letter-spacing: 2px;
	}
	
	.manifest-grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.manifest-footer {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 12px;
		padding-top: 12px;
	}
	
	.manifest-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 6px;
		border: 1px solid rgba(255, 255, 255, 0.05);
	}
	
	.item-label {
		color: #888;
		font-size: 13px;
	}
	
	.item-value {
		font-weight: 700;
		font-size: 14px;
		color: #fff;
	}
	
	.item-value.zero {
		color: #22c55e;
	}
	
	.item-value.success {
		color: #00d4ff;
	}
	
	.quick-actions {
		display: flex;
		gap: 10px;
	}
	
	.action-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 8px;
		color: #fff;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s ease;
	}
	
	.action-btn:hover {
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(255, 255, 255, 0.2);
	}
	
	.action-btn.danger {
		background: rgba(239, 68, 68, 0.1);
		border-color: rgba(239, 68, 68, 0.3);
		color: #ef4444;
	}
	
	.action-btn.danger:hover {
		background: rgba(239, 68, 68, 0.2);
		border-color: rgba(239, 68, 68, 0.4);
	}
	
	/* Network Tab */
	.network-content {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}
	
	.network-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}
	
	.network-header h3 {
		font-size: 16px;
		font-weight: 600;
	}
	
	.status-badge {
		display: flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		font-size: 13px;
	}
	
	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40px;
		text-align: center;
	}
	
	.empty-state p {
		font-size: 16px;
		font-weight: 500;
		margin-bottom: 8px;
	}
	
	.empty-state small {
		color: #888;
		font-size: 13px;
	}
	
	.request-list {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}
	
	.request-item {
		padding: 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
	}
	
	.request-url {
		font-size: 13px;
		font-family: 'IBM Plex Mono', monospace;
		color: #00d4ff;
		margin-bottom: 6px;
	}
	
	.request-meta {
		display: flex;
		gap: 12px;
		font-size: 11px;
		color: #888;
	}
	
	.request-type {
		padding: 2px 6px;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}
	
	/* Storage Tab */
	.storage-content {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}
	
	.storage-section h4 {
		font-size: 14px;
		font-weight: 600;
		margin-bottom: 12px;
		color: #00d4ff;
	}
	
	.empty-message {
		color: #888;
		font-size: 13px;
		font-style: italic;
	}
	
	.storage-list {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}
	
	.storage-item {
		display: flex;
		justify-content: space-between;
		padding: 8px 12px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 6px;
		font-size: 13px;
	}
	
	.storage-key {
		color: #fff;
		font-family: 'IBM Plex Mono', monospace;
	}
	
	.storage-size {
		color: #888;
		font-size: 12px;
	}
	
	/* Cookies Tab */
	.cookies-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 300px;
		text-align: center;
	}
	
	.cookie-monster {
		margin-bottom: 20px;
		animation: bounce 2s ease-in-out infinite;
	}
	
	.cookie-icon {
		position: relative;
		width: 64px;
		height: 64px;
		margin: 0 auto;
	}
	
	.cookie-icon svg {
		position: absolute;
		top: 0;
		left: 0;
		color: #00d4ff;
	}
	
	.cookie-icon .ban-icon {
		animation: rotate 3s linear infinite;
	}
	
	@keyframes rotate {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}
	
	.cookies-content h3 {
		font-size: 24px;
		font-weight: 700;
		color: #22c55e;
		margin-bottom: 12px;
	}
	
	.cookies-content p {
		font-size: 16px;
		color: #fff;
		margin-bottom: 8px;
	}
	
	.cookie-list {
		background: rgba(255, 184, 0, 0.1);
		border: 1px solid rgba(255, 184, 0, 0.3);
		border-radius: 8px;
		padding: 16px;
		text-align: left;
	}
	
	.cookie-item {
		padding: 4px 8px;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 4px;
		margin-top: 8px;
		font-family: 'IBM Plex Mono', monospace;
		font-size: 12px;
		color: #ffb800;
	}
	
	@keyframes bounce {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}
	
	@media (max-width: 768px) {
		.privacy-inspector {
			width: 95%;
			max-height: 90vh;
		}
		
		.manifest-grid {
			grid-template-columns: 1fr;
		}
		
		.quick-actions {
			flex-direction: column;
		}
	}
</style>
