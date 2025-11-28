<script lang="ts">
	import { Shield, Lock, Eye, CheckCircle, Cookie, BarChart3, EyeOff, DollarSign, FileText } from 'lucide-svelte';
	
	let isHovered = false;
	let isExpanded = false;
	
	function toggleExpanded() {
		isExpanded = !isExpanded;
	}
	
	function openPrivacyInspector() {
		window.dispatchEvent(new CustomEvent('openPrivacyInspector'));
	}
</script>

<div 
	class="privacy-shield-container {isExpanded ? 'expanded' : ''}"
	on:mouseenter={() => isHovered = true}
	on:mouseleave={() => isHovered = false}
	role="region"
	aria-label="Privacy Shield Status"
>
	<button 
		class="privacy-shield-badge"
		on:click={toggleExpanded}
		aria-label="Privacy Shield - Zero Tracking Guarantee"
	>
		<div class="badge-icon">
			<Shield class="w-4 h-4" />
		</div>
		<div class="badge-content">
			<span class="badge-title">ZERO COOKIES</span>
			<span class="badge-subtitle">No tracking • No analytics</span>
		</div>
		{#if isHovered || isExpanded}
			<div class="badge-glow"></div>
		{/if}
	</button>
	
	{#if isExpanded}
		<div class="privacy-dropdown">
			<div class="dropdown-header">
				<h4><Shield class="w-4 h-4 inline" /> The VU Anti-Surveillance Pledge</h4>
			</div>
			
			<div class="privacy-facts-mini">
				<div class="fact-row">
					<span class="fact-emoji">
						<Cookie class="w-4 h-4" />
					</span>
					<span class="fact-text">Zero Cookies</span>
					<CheckCircle class="w-4 h-4 text-success" />
				</div>
				<div class="fact-row">
					<span class="fact-emoji">
						<BarChart3 class="w-4 h-4" />
					</span>
					<span class="fact-text">Zero Analytics</span>
					<CheckCircle class="w-4 h-4 text-success" />
				</div>
				<div class="fact-row">
					<span class="fact-emoji">
						<EyeOff class="w-4 h-4" />
					</span>
					<span class="fact-text">Zero Tracking</span>
					<CheckCircle class="w-4 h-4 text-success" />
				</div>
				<div class="fact-row">
					<span class="fact-emoji">
						<DollarSign class="w-4 h-4" />
					</span>
					<span class="fact-text">Zero Data Sold</span>
					<CheckCircle class="w-4 h-4 text-success" />
				</div>
				<div class="fact-row">
					<span class="fact-emoji">
						<FileText class="w-4 h-4" />
					</span>
					<span class="fact-text">Zero Logs Kept</span>
					<CheckCircle class="w-4 h-4 text-success" />
				</div>
			</div>
			
			<div class="privacy-pledge">
				<p class="pledge-text">
					Your data stays on YOUR device. We can't see what we don't collect.
				</p>
			</div>
			
			<button 
				class="verify-btn"
				on:click={openPrivacyInspector}
			>
				<Eye class="w-4 h-4" />
				Verify Yourself
			</button>
			
			<div class="trust-indicators">
				<div class="indicator">
					<Lock class="w-3 h-3" />
					<span>E2E Encrypted</span>
				</div>
				<div class="indicator">
					<Shield class="w-3 h-3" />
					<span>Privacy First</span>
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
	.privacy-shield-container {
		position: fixed;
		bottom: 20px;
		left: 20px;
		z-index: 999;
		transition: all 0.3s ease;
	}
	
	.privacy-shield-container.expanded {
		z-index: 1001;
	}
	
	.privacy-shield-badge {
		display: flex;
		align-items: center;
		gap: 7px;
		padding: 7px 12px;
		background: linear-gradient(135deg, 
			rgba(34, 197, 94, 0.9) 0%, 
			rgba(0, 212, 255, 0.9) 100%);
		border: 1px solid rgba(34, 197, 94, 0.5);
		border-radius: 23px;
		color: #000;
		cursor: pointer;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
		box-shadow: 
			0 3px 15px rgba(34, 197, 94, 0.3),
			0 0 30px rgba(34, 197, 94, 0.1);
	}
	
	.privacy-shield-badge:hover {
		transform: translateY(-2px) scale(1.02);
		box-shadow: 
			0 8px 30px rgba(34, 197, 94, 0.4),
			0 0 60px rgba(34, 197, 94, 0.2);
	}
	
	.badge-icon {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 23px;
		height: 23px;
		background: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		animation: pulse 2s ease-in-out infinite;
	}
	
	.badge-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
	
	.badge-title {
		font-size: 8px;
		font-weight: 800;
		letter-spacing: 0.7px;
		text-transform: uppercase;
	}
	
	.badge-subtitle {
		font-size: 7px;
		font-weight: 500;
		opacity: 0.8;
	}
	
	.badge-glow {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 200%;
		height: 200%;
		background: radial-gradient(circle, 
			rgba(34, 197, 94, 0.4) 0%, 
			transparent 70%);
		animation: glow 3s ease-in-out infinite;
		pointer-events: none;
	}
	
	.privacy-dropdown {
		position: absolute;
		bottom: calc(100% + 10px);
		left: 0;
		width: 320px;
		background: linear-gradient(135deg, 
			rgba(0, 0, 0, 0.98) 0%, 
			rgba(0, 20, 40, 0.98) 100%);
		border: 1px solid rgba(34, 197, 94, 0.3);
		border-radius: 16px;
		padding: 16px;
		box-shadow: 
			0 10px 40px rgba(0, 0, 0, 0.8),
			0 0 60px rgba(34, 197, 94, 0.1),
			inset 0 0 20px rgba(34, 197, 94, 0.05);
		backdrop-filter: blur(20px);
		animation: slideUp 0.3s ease-out;
	}
	
	.dropdown-header {
		margin-bottom: 16px;
		padding-bottom: 12px;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}
	
	.dropdown-header h4 {
		font-size: 14px;
		font-weight: 600;
		color: #fff;
		text-align: center;
	}
	
	.privacy-facts-mini {
		display: flex;
		flex-direction: column;
		gap: 8px;
		margin-bottom: 16px;
	}
	
	.fact-row {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 8px;
		transition: all 0.2s ease;
	}
	
	.fact-row:hover {
		background: rgba(34, 197, 94, 0.05);
		border-color: rgba(34, 197, 94, 0.2);
	}
	
	.fact-emoji {
		display: flex;
		align-items: center;
	}
	
	:global(.fact-emoji svg) {
		color: #00d4ff;
	}
	
	.fact-text {
		flex: 1;
		font-size: 12px;
		color: #ccc;
	}
	
	:global(.fact-row .text-success) {
		color: #22c55e;
		flex-shrink: 0;
	}
	
	.privacy-pledge {
		padding: 12px;
		background: linear-gradient(135deg, 
			rgba(34, 197, 94, 0.05) 0%, 
			rgba(0, 212, 255, 0.05) 100%);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: 10px;
		margin-bottom: 12px;
	}
	
	.pledge-text {
		font-size: 11px;
		line-height: 1.5;
		color: #fff;
		text-align: center;
	}
	
	.verify-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px;
		background: rgba(0, 212, 255, 0.1);
		border: 1px solid rgba(0, 212, 255, 0.3);
		border-radius: 8px;
		color: #00d4ff;
		font-size: 13px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
		margin-bottom: 12px;
	}
	
	.verify-btn:hover {
		background: rgba(0, 212, 255, 0.2);
		border-color: rgba(0, 212, 255, 0.4);
		transform: translateY(-1px);
	}
	
	.trust-indicators {
		display: flex;
		gap: 8px;
		justify-content: center;
	}
	
	.indicator {
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.05);
		border-radius: 12px;
		font-size: 10px;
		color: #888;
	}
	
	:global(.indicator svg) {
		color: #22c55e;
	}
	
	@keyframes pulse {
		0%, 100% { 
			transform: scale(1); 
			opacity: 1;
		}
		50% { 
			transform: scale(1.1); 
			opacity: 0.8;
		}
	}
	
	@keyframes glow {
		0%, 100% { 
			opacity: 0.3;
			transform: translate(-50%, -50%) scale(1);
		}
		50% { 
			opacity: 0.6;
			transform: translate(-50%, -50%) scale(1.1);
		}
	}
	
	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	
	@media (max-width: 640px) {
		.privacy-shield-container {
			bottom: 70px;
			left: 10px;
		}
		
		.privacy-dropdown {
			width: calc(100vw - 20px);
			max-width: 320px;
		}
	}
</style>
