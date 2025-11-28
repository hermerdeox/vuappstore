<script lang="ts">
	import { User, CreditCard, Download, Settings, LogOut, Shield, Calendar, CheckCircle, AlertCircle, ExternalLink, XCircle, Zap, Lightbulb, AlertTriangle, Check } from 'lucide-svelte';

	// VU Philosophy: No real names, only @usernames and @vumail.app addresses
	const user = {
		username: '@privacy_champion',
		email: 'privacy_champion@vumail.app',
		plan: 'Annual',
		privacyLevel: 0
	};

	// Exit Movement confirmation state
	let showExitConfirmation = false;
	let exitConfirmationText = '';
	let isExitingMovement = false;

	function initiateExitMovement() {
		showExitConfirmation = true;
	}

	function cancelExitMovement() {
		showExitConfirmation = false;
		exitConfirmationText = '';
	}

	async function confirmExitMovement() {
		if (exitConfirmationText !== 'EXIT MOVEMENT') {
			alert('Please type "EXIT MOVEMENT" to confirm');
			return;
		}

		isExitingMovement = true;

		// In production, this would call the account deletion API
		console.log('Exiting Movement: Immediate account destruction initiated');
		
		// Simulate API call
		setTimeout(() => {
			alert('Account destroyed. Thank you for your time with VU. Your privacy journey continues elsewhere.');
			// Would redirect to goodbye page or homepage
			window.location.href = '/';
		}, 2000);
	}

	// Subscription info - minimal data retention
	const subscription = {
		plan: 'VU Suite Complete',
		status: 'active',
		amount: 768, // $76.80/mo × 12 = $921.60, discounted to $768/year
		amountMonthly: 76.80, // 30 apps × $2.56
		perAppCost: 2.56,
		currency: 'USD',
		interval: 'year',
		startDate: 'January 15, 2024',
		nextBilling: 'January 15, 2025',
		appsIncluded: 30,
		// VU Privacy: No payment method details stored
		// Payment processed via cryptocurrency (Monero/Lightning/BTC/ETH)
		paymentProcessor: 'Crypto (Monero XMR)',
		invoiceAccess: true
	};

	const billingHistory = [
		{ date: 'January 15, 2024', amount: 768, method: 'Monero (XMR)', status: 'paid', invoice: 'INV-2024-001' },
		{ date: 'January 15, 2023', amount: 768, method: 'Monero (XMR)', status: 'paid', invoice: 'INV-2023-001' }
	];
</script>

<svelte:head>
	<title>Subscription - My Account | VuAppStore</title>
	<meta name="description" content="Manage your VU Suite subscription. Upgrade, downgrade, or cancel anytime with full transparency." />
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
			Subscription Management
		</h1>
		<p class="text-lg text-text-secondary">
			Full control over your subscription. Change, pause, or cancel anytime.
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
					<a href="/account/subscriptions" class="nav-item flex items-center gap-3 p-3 rounded-lg bg-glass-heavy text-primary">
						<CreditCard class="w-5 h-5" />
						<span>Subscription</span>
					</a>
					<a href="/account/downloads" class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors">
						<Download class="w-5 h-5" />
						<span>Downloads</span>
					</a>
					<a href="/account/settings" class="nav-item flex items-center gap-3 p-3 rounded-lg hover:bg-glass transition-colors">
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
			<!-- Current Subscription -->
			<div class="glass-card p-8">
				<div class="flex items-center justify-between mb-6">
					<h2 class="text-2xl font-bold">Current Subscription</h2>
					<div class="flex items-center gap-2 px-3 py-1 bg-success/20 text-success rounded-full">
						<CheckCircle class="w-4 h-4" />
						<span class="text-xs font-bold uppercase">Active</span>
					</div>
				</div>

				<div class="subscription-details grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
					<div>
						<p class="text-sm text-text-secondary mb-1">Plan</p>
						<p class="text-xl font-semibold">{subscription.plan}</p>
						<p class="text-xs text-text-tertiary">30 apps × $2.56 = $76.80/mo</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Annual Billing</p>
						<p class="text-xl font-semibold">${subscription.amount}/{subscription.interval}</p>
						<p class="text-xs text-success">Save $153.60 vs monthly</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Payment Method</p>
						<p class="text-xl font-semibold text-primary">{subscription.paymentProcessor}</p>
						<p class="text-xs text-text-tertiary">Zero-knowledge payments</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Next Billing</p>
						<p class="text-xl font-semibold">{subscription.nextBilling}</p>
						<p class="text-xs text-text-tertiary">{subscription.amount} USD in crypto</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Apps Included</p>
						<p class="text-xl font-semibold">{subscription.appsIncluded} Apps</p>
						<p class="text-xs text-text-tertiary">$2.56 per app per month</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Privacy Level</p>
						<p class="text-xl font-semibold text-info">Level {user.privacyLevel}</p>
						<p class="text-xs text-text-tertiary">Maximum privacy protection</p>
					</div>
				</div>

				<div class="flex flex-wrap gap-4">
					<a href="/pricing" class="btn btn-primary">
						Change Plan
					</a>
					<button class="btn btn-secondary">
						Pause Subscription
					</button>
					<button class="btn btn-secondary text-error border-error/30 hover:bg-error/10">
						Cancel Subscription
					</button>
				</div>
			</div>

			<!-- Payment Method Notice (VU Philosophy: Crypto-Only, Zero Storage) -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Payment Information</h2>
				<div class="border-l-4 border-primary p-6 bg-primary/5 rounded-r-lg mb-6">
					<div class="flex items-start gap-3">
						<Shield class="w-6 h-6 text-primary flex-shrink-0 mt-1" />
						<div>
							<h3 class="font-semibold text-primary mb-2">Crypto-Only Payments</h3>
							<p class="text-sm text-text-secondary leading-relaxed mb-3">
								In line with VU's privacy-first philosophy, we <strong class="text-text-primary">accept cryptocurrency payments only</strong>. 
								Your payment history is completely private. No credit cards, no PayPal, no transaction tracking.
							</p>
							<p class="text-sm text-text-secondary mb-2">
								Current subscription paid with: <span class="font-semibold text-primary">{subscription.paymentProcessor}</span>
							</p>
							<p class="text-xs text-text-tertiary flex items-start gap-1">
								<Lightbulb class="w-3 h-3 flex-shrink-0 mt-0.5" /> Monero (Level 0) provides complete transaction privacy with zero traceability
							</p>
						</div>
					</div>
				</div>

				<div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
					<div class="payment-option p-4 bg-info/5 border border-info/30 rounded-lg">
						<div class="w-8 h-8 mb-2 bg-info/20 rounded-full flex items-center justify-center">
							<Shield class="w-4 h-4 text-info" />
						</div>
						<h4 class="font-semibold text-sm mb-1">Monero (XMR)</h4>
						<p class="text-xs text-text-secondary">Zero-Knowledge</p>
					</div>
					<div class="payment-option p-4 bg-success/5 border border-success/30 rounded-lg">
						<div class="w-8 h-8 mb-2 bg-success/20 rounded-full flex items-center justify-center">
							<Zap class="w-4 h-4 text-success" />
						</div>
						<h4 class="font-semibold text-sm mb-1">Lightning</h4>
						<p class="text-xs text-text-secondary">Fast & Private</p>
					</div>
					<div class="payment-option p-4 bg-warning/5 border border-warning/30 rounded-lg">
						<div class="w-8 h-8 mb-2 bg-warning/20 rounded-full flex items-center justify-center">
							<CreditCard class="w-4 h-4 text-warning" />
						</div>
						<h4 class="font-semibold text-sm mb-1">BTC/ETH</h4>
						<p class="text-xs text-text-secondary">Standard Crypto</p>
					</div>
				</div>

				<p class="text-sm text-text-secondary mb-4">
					Your next billing will use the same payment method, or you can choose a different cryptocurrency.
				</p>

				<a href="/pricing" class="btn btn-secondary inline-flex items-center gap-2">
					<Shield class="w-4 h-4" />
					View Payment Options
				</a>
			</div>

			<!-- Billing History -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Billing History</h2>
				
				<div class="space-y-3">
					{#each billingHistory as bill}
						<div class="billing-row flex items-center justify-between p-4 bg-glass rounded-lg">
							<div class="flex items-center gap-4">
								<Calendar class="w-5 h-5 text-text-secondary" />
								<div>
									<p class="font-medium">{bill.date}</p>
									<p class="text-sm text-text-secondary">Invoice #{bill.invoice}</p>
									<p class="text-xs text-text-tertiary">Paid via {bill.method}</p>
								</div>
							</div>
							<div class="flex items-center gap-4">
								<div class="text-right">
									<p class="font-semibold">${bill.amount}.00</p>
									<p class="text-xs text-success uppercase flex items-center gap-1"><Check class="w-3 h-3" /> Confirmed</p>
								</div>
								<button class="btn btn-secondary text-sm">
									Download Invoice
								</button>
							</div>
						</div>
					{/each}
				</div>

				<div class="mt-6 p-4 bg-glass rounded-lg">
					<p class="text-xs text-text-tertiary flex items-start gap-1">
						<Lightbulb class="w-3 h-3 flex-shrink-0 mt-0.5" /> All invoices are available for download anytime. We retain billing records 
						as required by law, but no usage data or personal details beyond your @vumail.app address.
					</p>
				</div>
			</div>

			<!-- Subscription Benefits -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Your Subscription Benefits</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">All 30+ VU Suite Apps</p>
							<p class="text-sm text-text-secondary">Full access to entire ecosystem</p>
						</div>
					</div>
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">Unlimited Downloads</p>
							<p class="text-sm text-text-secondary">Re-download anytime, anywhere</p>
						</div>
					</div>
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">Automatic Updates</p>
							<p class="text-sm text-text-secondary">Always latest & secure</p>
						</div>
					</div>
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">Priority Support</p>
							<p class="text-sm text-text-secondary">24/7 expert assistance</p>
						</div>
					</div>
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">Zero Data Collection</p>
							<p class="text-sm text-text-secondary">Your usage is invisible to us</p>
						</div>
					</div>
					<div class="benefit-item flex items-start gap-3 p-4 bg-glass rounded-lg">
						<CheckCircle class="w-5 h-5 text-success flex-shrink-0 mt-1" />
						<div>
							<p class="font-semibold mb-1">30-Day Money Back</p>
							<p class="text-sm text-text-secondary">Full refund guarantee</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Exit Movement - Permanent Account Destruction -->
			<div class="glass-card p-8 border-l-4 border-error">
				<div class="flex items-start gap-3 mb-6">
					<XCircle class="w-8 h-8 text-error flex-shrink-0 mt-1" />
					<div>
						<h2 class="text-2xl font-bold text-error mb-3">Exit Movement</h2>
						<p class="text-sm text-text-secondary leading-relaxed mb-3">
							Ready to leave VU? We respect your sovereignty. This will <strong class="text-error">immediately and permanently destroy your account</strong>.
						</p>
					</div>
				</div>

				{#if !showExitConfirmation}
					<!-- Initial Button -->
					<div class="mb-6">
						<p class="text-sm text-text-secondary mb-4">
							Before you exit, check out our <a href="/support/faq" class="text-primary hover:underline">FAQ</a> or 
							<a href="/support/contact" class="text-primary hover:underline">contact support</a> - we might be able to help!
						</p>
						<button 
							on:click={initiateExitMovement}
							class="btn bg-error text-white hover:bg-error/80 inline-flex items-center gap-2"
						>
							<XCircle class="w-5 h-5" />
							Exit Movement
						</button>
					</div>
				{:else}
					<!-- Confirmation Section -->
					<div class="confirmation-section p-6 bg-error/10 border-2 border-error/30 rounded-lg mb-6">
						<h3 class="text-xl font-bold text-error mb-4 flex items-center gap-2"><AlertTriangle class="w-5 h-5" /> Final Confirmation Required</h3>
						
						<!-- Disclaimer -->
						<div class="disclaimer mb-6 p-4 bg-background/50 border border-error/50 rounded">
							<h4 class="font-semibold text-error mb-3">What Happens When You Exit:</h4>
							<ul class="space-y-2 text-sm text-text-secondary mb-4">
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>Your <strong class="text-text-primary">@{user.username.slice(1)}</strong> account will be <strong class="text-error">destroyed immediately</strong></span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>Your <strong class="text-text-primary">{user.email}</strong> address will be <strong class="text-error">permanently deleted</strong></span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>All server-side data will be <strong class="text-error">purged within 24 hours</strong></span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>Subscription will be <strong class="text-error">cancelled immediately</strong></span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>Download access will be <strong class="text-error">revoked instantly</strong></span>
								</li>
								<li class="flex items-start gap-2">
									<Check class="w-4 h-4 text-error flex-shrink-0" />
									<span>Current billing period will <strong class="text-error">end automatically</strong></span>
								</li>
							</ul>

							<div class="p-3 bg-warning/10 border border-warning/30 rounded mb-3">
								<p class="text-sm font-semibold text-warning mb-2 flex items-center gap-1"><AlertTriangle class="w-4 h-4" /> NO REFUNDS FOR UNUSED TIME</p>
								<p class="text-xs text-text-secondary leading-relaxed">
									Due to our privacy protocols, we cannot track usage or calculate prorated refunds. 
									When you exit, your remaining subscription time is forfeited. This is the price of 
									zero-knowledge architecture - we literally cannot see how much you've used.
								</p>
							</div>

							<div class="p-3 bg-error/10 border border-error/30 rounded">
								<p class="text-sm font-semibold text-error mb-2 flex items-center gap-1"><XCircle class="w-4 h-4" /> THIS ACTION CANNOT BE UNDONE</p>
								<p class="text-xs text-text-secondary">
									Once confirmed, your account will be destroyed permanently. There is no recovery, 
									no restoration, no going back. Your privacy journey with VU ends here.
								</p>
							</div>
						</div>

						<!-- Confirmation Input -->
						<div class="mb-6">
							<label class="block text-sm font-semibold mb-2 text-text-primary">
								Type <span class="text-error font-mono">EXIT MOVEMENT</span> to confirm:
							</label>
							<input 
								type="text" 
								bind:value={exitConfirmationText}
								placeholder="Type EXIT MOVEMENT in all caps"
								class="w-full px-4 py-3 bg-surface border-2 border-error/50 rounded-lg focus:border-error focus:outline-none font-mono text-error"
								disabled={isExitingMovement}
							/>
						</div>

						<!-- Action Buttons -->
						<div class="flex gap-4">
							<button 
								on:click={confirmExitMovement}
								disabled={exitConfirmationText !== 'EXIT MOVEMENT' || isExitingMovement}
								class="btn bg-error text-white hover:bg-error/80 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
							>
								{#if isExitingMovement}
									<span class="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
									Destroying Account...
								{:else}
									<XCircle class="w-5 h-5" />
									Confirm: Exit Movement
								{/if}
							</button>
							<button 
								on:click={cancelExitMovement}
								disabled={isExitingMovement}
								class="btn btn-secondary disabled:opacity-50"
							>
								Cancel (Stay in Movement)
							</button>
						</div>
					</div>
				{/if}
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

	@keyframes spin {
		to { transform: rotate(360deg); }
	}

	.animate-spin {
		animation: spin 1s linear infinite;
	}

	.confirmation-section {
		animation: fadeIn 0.3s ease-in-out;
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>

