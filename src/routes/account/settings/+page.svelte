<script lang="ts">
	import { User, CreditCard, Download, Settings, LogOut, Shield, Mail, Lock, Eye, EyeOff, Trash2, AlertTriangle, CheckCircle, Globe } from 'lucide-svelte';

	// VU Philosophy: No real names, only @usernames and @vumail.app addresses
	const user = {
		username: '@privacy_champion',
		email: 'privacy_champion@vumail.app',
		plan: 'Annual',
		privacyLevel: 0
	};

	// Privacy settings - all OFF by default (VU way)
	let settings = {
		marketingEmails: false,
		productUpdates: false,
		securityAlerts: true, // Only security alerts ON by default
		anonymousAnalytics: false,
		crashReports: false,
		betaAccess: false
	};

	let showPassword = false;
	let twoFactorEnabled = false;

	function handleSaveSettings() {
		console.log('Saving settings (locally only)');
		// In VU apps, settings are stored locally, not on servers
	}

	function handleDeleteAccount() {
		if (confirm('Are you sure? This action is permanent and will delete all your data.')) {
			console.log('Initiating account deletion');
			// Would trigger zero-knowledge account deletion
		}
	}
</script>

<svelte:head>
	<title>Settings - My Account | VuAppStore</title>
	<meta name="description" content="Manage your VuAppStore account settings with complete privacy control. No tracking, no data collection." />
</svelte:head>

<div class="account-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12">
		<div class="flex items-center gap-4 mb-4">
			<a href="/account" class="text-text-secondary hover:text-primary transition-colors">
				← Back to Account
			</a>
		</div>
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			Account Settings
		</h1>
		<p class="text-lg text-text-secondary">
			Your account, your rules. Complete control over your privacy and preferences.
		</p>
	</section>

	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar -->
		<aside class="lg:col-span-1">
			<div class="glass-card p-6">
				<div class="user-info mb-6">
					<div class="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-4">
						<User class="w-10 h-10 text-primary" />
					</div>
					<h2 class="text-xl font-semibold mb-1">{user.username}</h2>
					<p class="text-sm text-text-secondary mb-2">{user.email}</p>
					<div class="flex gap-2">
						<div class="badge inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
							{user.plan} Plan
						</div>
						<div class="badge inline-block px-3 py-1 bg-info/20 text-info text-xs font-bold rounded-full">
							Level {user.privacyLevel}
						</div>
					</div>
				</div>

				<nav class="space-y-2">
					<a href="/account" class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors">
						<User class="w-5 h-5" />
						<span>Overview</span>
					</a>
					<a href="/account/subscriptions" class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors">
						<CreditCard class="w-5 h-5" />
						<span>Subscription</span>
					</a>
					<a href="/account/downloads" class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors">
						<Download class="w-5 h-5" />
						<span>Downloads</span>
					</a>
					<a href="/account/settings" class="nav-item flex items-center gap-3 p-3 rounded-lg bg-glass-heavy text-primary">
						<Settings class="w-5 h-5" />
						<span>Settings</span>
					</a>
					<button class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors w-full text-left text-error">
						<LogOut class="w-5 h-5" />
						<span>Sign Out</span>
					</button>
				</nav>
			</div>
		</aside>

		<!-- Main Content -->
		<div class="lg:col-span-3 space-y-6">
			<!-- Account Information -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Account Information</h2>
				
				<div class="space-y-6">
					<!-- Username (VU Philosophy: @username, not real name) -->
					<div>
						<label class="block text-sm font-semibold mb-2">Username</label>
						<div class="flex gap-3">
							<input 
								type="text" 
								value={user.username}
								class="flex-1 px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none"
								placeholder="@username"
							/>
							<button class="btn btn-secondary">Update</button>
						</div>
						<p class="text-xs text-text-tertiary mt-2">
							✓ Your username is how you're identified. No real names required.
						</p>
					</div>

					<!-- VuMail Email (VU Philosophy: Only @vumail.app) -->
					<div>
						<label class="block text-sm font-semibold mb-2">VuMail Address</label>
						<div class="flex gap-3">
							<input 
								type="email" 
								value={user.email}
								class="flex-1 px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none"
								placeholder="username@vumail.app"
								disabled
							/>
							<button class="btn btn-secondary" disabled>Verified</button>
						</div>
						<p class="text-xs text-text-tertiary mt-2">
							✓ Only @vumail.app addresses allowed for maximum privacy. No external email tracking.
						</p>
					</div>

					<!-- Password -->
					<div>
						<label class="block text-sm font-semibold mb-2">Password</label>
						<div class="flex gap-3">
							<div class="relative flex-1">
								<input 
									type={showPassword ? 'text' : 'password'}
									value="••••••••••••"
									class="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none pr-12"
								/>
								<button 
									on:click={() => showPassword = !showPassword}
									class="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary"
								>
									{#if showPassword}
										<EyeOff class="w-5 h-5" />
									{:else}
										<Eye class="w-5 h-5" />
									{/if}
								</button>
							</div>
							<button class="btn btn-secondary">Change</button>
						</div>
						<p class="text-xs text-text-tertiary mt-2">
							🔐 Your password is hashed with Argon2id and never stored in plain text.
						</p>
					</div>
				</div>
			</div>

			<!-- Security Settings -->
			<div class="glass-card p-8">
				<div class="flex items-center gap-3 mb-6">
					<Lock class="w-6 h-6 text-primary" />
					<h2 class="text-2xl font-bold">Security</h2>
				</div>

				<div class="space-y-4">
					<!-- Two-Factor Authentication -->
					<div class="security-setting p-4 bg-glass rounded-lg">
						<div class="flex items-center justify-between mb-3">
							<div>
								<p class="font-semibold">Two-Factor Authentication (2FA)</p>
								<p class="text-sm text-text-secondary">Add an extra layer of security</p>
							</div>
							<label class="switch">
								<input type="checkbox" bind:checked={twoFactorEnabled} />
								<span class="slider"></span>
							</label>
						</div>
						{#if twoFactorEnabled}
							<div class="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg">
								<p class="text-sm text-success font-medium">✓ 2FA is enabled</p>
								<button class="text-xs text-primary hover:underline mt-2">View Backup Codes</button>
							</div>
						{:else}
							<p class="text-xs text-text-tertiary">
								Recommended: Enable 2FA using your VuAuth app (Time-based OTP, no SMS tracking)
							</p>
						{/if}
					</div>

					<!-- Active Sessions -->
					<div class="security-setting p-4 bg-glass rounded-lg">
						<div class="flex items-center justify-between mb-3">
							<div>
								<p class="font-semibold">Active Sessions</p>
								<p class="text-sm text-text-secondary">1 active session (this device)</p>
							</div>
							<button class="btn btn-secondary text-sm">View All</button>
						</div>
						<p class="text-xs text-text-tertiary">
							Sessions expire after 7 days of inactivity. No session tracking or fingerprinting.
						</p>
					</div>

					<!-- Security Audit Log -->
					<div class="security-setting p-4 bg-glass rounded-lg">
						<div class="flex items-center justify-between mb-3">
							<div>
								<p class="font-semibold">Security Audit Log</p>
								<p class="text-sm text-text-secondary">Last login: 2 hours ago</p>
							</div>
							<button class="btn btn-secondary text-sm">View Log</button>
						</div>
						<p class="text-xs text-text-tertiary">
							Only security events are logged (login, password changes). No usage tracking.
						</p>
					</div>
				</div>
			</div>

			<!-- Privacy Preferences -->
			<div class="glass-card p-8">
				<div class="flex items-center gap-3 mb-6">
					<Shield class="w-6 h-6 text-primary" />
					<h2 class="text-2xl font-bold">Privacy Preferences</h2>
				</div>

				<div class="space-y-4">
					<!-- Marketing (OFF by default - VU way) -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex-1">
							<p class="font-medium">Marketing Communications</p>
							<p class="text-sm text-text-secondary">Receive product updates and news via VuMail</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.marketingEmails} />
							<span class="slider"></span>
						</label>
					</div>

					<!-- Product Updates (OFF by default) -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex-1">
							<p class="font-medium">Product Update Notifications</p>
							<p class="text-sm text-text-secondary">Get notified about new features and apps</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.productUpdates} />
							<span class="slider"></span>
						</label>
					</div>

					<!-- Security Alerts (ON by default - essential) -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg border-l-4 border-success">
						<div class="flex-1">
							<p class="font-medium">Security Alerts</p>
							<p class="text-sm text-text-secondary">Critical security notifications (recommended)</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.securityAlerts} />
							<span class="slider"></span>
						</label>
					</div>

					<!-- Anonymous Analytics (OFF by default) -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex-1">
							<p class="font-medium">Anonymous Usage Analytics</p>
							<p class="text-sm text-text-secondary">Help improve VU (100% anonymous, aggregated only)</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.anonymousAnalytics} />
							<span class="slider"></span>
						</label>
					</div>

					<!-- Crash Reports (OFF by default) -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex-1">
							<p class="font-medium">Crash Report Sharing</p>
							<p class="text-sm text-text-secondary">Share anonymous crash logs to improve stability</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.crashReports} />
							<span class="slider"></span>
						</label>
					</div>

					<!-- Beta Access -->
					<div class="flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex-1">
							<p class="font-medium">Beta Program Access</p>
							<p class="text-sm text-text-secondary">Test new features before public release</p>
						</div>
						<label class="switch">
							<input type="checkbox" bind:checked={settings.betaAccess} />
							<span class="slider"></span>
						</label>
					</div>
				</div>

				<div class="mt-6">
					<button on:click={handleSaveSettings} class="btn btn-primary">
						Save Preferences
					</button>
				</div>
			</div>

			<!-- Language & Region -->
			<div class="glass-card p-8">
				<div class="flex items-center gap-3 mb-6">
					<Globe class="w-6 h-6 text-primary" />
					<h2 class="text-2xl font-bold">Language & Region</h2>
				</div>

				<div class="space-y-4">
					<div>
						<label class="block text-sm font-semibold mb-2">Interface Language</label>
						<select class="language-select w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none">
							<option value="en">English</option>
							<option value="es">Español</option>
							<option value="fr">Français</option>
						</select>
					</div>

					<div>
						<label class="block text-sm font-semibold mb-2">Timezone</label>
						<select class="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none">
							<option value="auto">Auto-detect (Privacy-safe)</option>
							<option value="utc">UTC (Recommended for privacy)</option>
							<option value="us-eastern">US Eastern</option>
							<option value="us-pacific">US Pacific</option>
							<option value="eu-central">EU Central</option>
						</select>
						<p class="text-xs text-text-tertiary mt-2">
							💡 Auto-detect uses browser timezone without sending it to servers
						</p>
					</div>
				</div>
			</div>

			<!-- Data & Privacy -->
			<div class="glass-card p-8">
				<div class="flex items-center gap-3 mb-6">
					<Shield class="w-6 h-6 text-primary" />
					<h2 class="text-2xl font-bold">Data & Privacy</h2>
				</div>

				<div class="space-y-4">
					<!-- Data Export -->
					<div class="privacy-action p-4 bg-glass rounded-lg">
						<div class="flex items-start gap-3 mb-3">
							<Download class="w-5 h-5 text-primary flex-shrink-0 mt-1" />
							<div class="flex-1">
								<p class="font-semibold mb-1">Export Your Data</p>
								<p class="text-sm text-text-secondary">
									Download all data we have about you (spoiler: it's minimal). 
									GDPR compliant, delivered in JSON format.
								</p>
							</div>
						</div>
						<button class="btn btn-secondary text-sm">Request Data Export</button>
					</div>

					<!-- What We Store -->
					<div class="privacy-action p-4 bg-info/5 border border-info/30 rounded-lg">
						<h4 class="font-semibold text-info mb-3">What We Actually Store:</h4>
						<ul class="space-y-2 text-sm text-text-secondary">
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span>Your @username (chosen by you, changeable)</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span>Your @vumail.app address (encrypted)</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span>Subscription status (active/inactive only)</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span>Billing dates (for subscription management)</span>
							</li>
						</ul>
					</div>

					<!-- What We DON'T Store -->
					<div class="privacy-action p-4 bg-success/5 border border-success/30 rounded-lg">
						<h4 class="font-semibold text-success mb-3">What We DON'T Store:</h4>
						<ul class="space-y-2 text-sm text-text-secondary">
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> real names or personal information</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> phone numbers (never asked, never collected)</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> payment method details (handled by Stripe)</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> usage analytics or tracking data</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> download logs or app usage history</span>
							</li>
							<li class="flex items-start gap-2">
								<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
								<span><strong>NO</strong> IP addresses or location data</span>
							</li>
						</ul>
					</div>

					<!-- Privacy Manifest Link -->
					<div class="privacy-action p-4 bg-glass rounded-lg">
						<div class="flex items-center justify-between">
							<div>
								<p class="font-semibold mb-1">View Full Privacy Manifest</p>
								<p class="text-sm text-text-secondary">
									See exactly what data we collect (spoiler: almost nothing)
								</p>
							</div>
							<a href="/legal/privacy" class="btn btn-secondary text-sm">
								View Manifest
							</a>
						</div>
					</div>
				</div>
			</div>

			<!-- Danger Zone -->
			<div class="glass-card p-8 border-l-4 border-error">
				<div class="flex items-center gap-3 mb-6">
					<AlertTriangle class="w-6 h-6 text-error" />
					<h2 class="text-2xl font-bold text-error">Danger Zone</h2>
				</div>

				<div class="space-y-4">
					<!-- Delete Account -->
					<div class="danger-action p-4 bg-error/5 rounded-lg">
						<div class="mb-4">
							<p class="font-semibold mb-2">Delete Account</p>
							<p class="text-sm text-text-secondary leading-relaxed">
								Permanently delete your VuAppStore account and all associated data. 
								This action cannot be undone. Your subscription will be cancelled immediately.
							</p>
						</div>
						<div class="mb-4 p-3 bg-background/50 rounded border border-error/30">
							<p class="text-xs font-mono text-text-secondary mb-2">What happens when you delete:</p>
							<ul class="space-y-1 text-xs text-text-secondary">
								<li>✓ Your @username becomes available again</li>
								<li>✓ Your @vumail.app address is permanently deleted</li>
								<li>✓ Subscription cancelled (prorated refund if applicable)</li>
								<li>✓ Download access revoked immediately</li>
								<li>✓ All server-side data purged within 24 hours</li>
								<li>✓ Billing records retained for 7 years (legal requirement)</li>
							</ul>
						</div>
						<button 
							on:click={handleDeleteAccount}
							class="btn bg-error text-white hover:bg-error/80"
						>
							<Trash2 class="w-4 h-4" />
							Delete My Account
						</button>
					</div>
				</div>
			</div>

			<!-- Save Actions -->
			<div class="flex gap-4">
				<button on:click={handleSaveSettings} class="btn btn-primary">
					Save All Changes
				</button>
				<button class="btn btn-secondary">
					Cancel
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.nav-item {
		text-decoration: none;
		color: var(--color-text-secondary);
	}

	.nav-item:hover {
		color: var(--color-text-primary);
	}

	.bg-glass-heavy {
		background: rgba(255, 255, 255, 0.1);
	}

	/* Toggle Switch */
	.switch {
		position: relative;
		display: inline-block;
		width: 48px;
		height: 24px;
	}

	.switch input {
		opacity: 0;
		width: 0;
		height: 0;
	}

	.slider {
		position: absolute;
		cursor: pointer;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(255, 255, 255, 0.1);
		transition: 0.4s;
		border-radius: 24px;
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 2px;
		background-color: var(--color-text-secondary);
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
	}

	input:checked + .slider:before {
		transform: translateX(24px);
		background-color: var(--color-background);
	}

	input:disabled + .slider {
		opacity: 0.5;
		cursor: not-allowed;
	}
</style>

