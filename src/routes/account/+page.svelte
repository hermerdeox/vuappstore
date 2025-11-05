<script lang="ts">
	import { User, CreditCard, Download, Settings, LogOut, Shield } from 'lucide-svelte';

	// This would normally come from auth state
	// VU Philosophy: No real names, only @usernames and @vumail.app addresses
	const user = {
		username: '@privacy_champion',
		email: 'privacy_champion@vumail.app',
		plan: 'Annual',
		joinDate: 'January 2024',
		nextBilling: 'January 2025',
		privacyLevel: 0 // VU Zero-Level 0 user
	};
</script>

<svelte:head>
	<title>My Account - VuAppStore</title>
	<meta name="description" content="Manage your VuAppStore account, subscriptions, and downloads." />
</svelte:head>

<div class="account-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			My Account
		</h1>
		<p class="text-lg text-text-secondary">
			Manage your subscription, downloads, and account settings.
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
					<div class="flex gap-2 mb-2">
						<div class="badge inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full">
							{user.plan} Plan
						</div>
						<div class="badge inline-block px-3 py-1 bg-info/20 text-info text-xs font-bold rounded-full">
							Level {user.privacyLevel}
						</div>
					</div>
				</div>

				<nav class="space-y-2">
					<a href="/account" class="nav-item flex items-center gap-3 p-3 rounded-lg bg-glass-heavy text-primary">
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
			<!-- Subscription Status -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Subscription Status</h2>
				<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
					<div>
						<p class="text-sm text-text-secondary mb-1">Current Plan</p>
						<p class="text-xl font-semibold">{user.plan} Subscription</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Next Billing Date</p>
						<p class="text-xl font-semibold">{user.nextBilling}</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Member Since</p>
						<p class="text-xl font-semibold">{user.joinDate}</p>
					</div>
					<div>
						<p class="text-sm text-text-secondary mb-1">Privacy Status</p>
						<p class="text-xl font-semibold text-success">Level 0 Protected</p>
					</div>
				</div>
				<div class="mt-6 flex gap-4">
					<a href="/account/subscriptions" class="btn btn-primary">
						Manage Subscription
					</a>
					<a href="/pricing" class="btn btn-secondary">
						Upgrade Plan
					</a>
				</div>
			</div>

			<!-- Quick Stats -->
			<div class="glass-card p-8">
				<h2 class="text-2xl font-bold mb-6">Your VU Suite</h2>
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="stat-card text-center">
						<div class="text-3xl font-bold text-primary mb-2">30</div>
						<p class="text-sm text-text-secondary">Apps Available</p>
					</div>
					<div class="stat-card text-center">
						<div class="text-3xl font-bold text-primary mb-2">12</div>
						<p class="text-sm text-text-secondary">Apps Downloaded</p>
					</div>
					<div class="stat-card text-center">
						<div class="text-3xl font-bold text-primary mb-2">100%</div>
						<p class="text-sm text-text-secondary">Privacy Protected</p>
					</div>
				</div>
			</div>

			<!-- Recent Downloads -->
			<div class="glass-card p-8">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-2xl font-bold">Recent Downloads</h2>
					<a href="/account/downloads" class="text-primary font-medium">View All →</a>
				</div>
				<div class="space-y-4">
					<div class="download-item flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center text-xl font-bold text-primary">
								V
							</div>
							<div>
								<p class="font-semibold">VuVault</p>
								<p class="text-sm text-text-secondary">Downloaded 2 days ago</p>
							</div>
						</div>
						<button class="btn btn-secondary">
							Re-download
						</button>
					</div>
					<div class="download-item flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center text-xl font-bold text-purple-500">
								V
							</div>
							<div>
								<p class="font-semibold">VuChat</p>
								<p class="text-sm text-text-secondary">Downloaded 5 days ago</p>
							</div>
						</div>
						<button class="btn btn-secondary">
							Re-download
						</button>
					</div>
					<div class="download-item flex items-center justify-between p-4 bg-glass rounded-lg">
						<div class="flex items-center gap-4">
							<div class="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-xl font-bold text-green-500">
								V
							</div>
							<div>
								<p class="font-semibold">VuFit</p>
								<p class="text-sm text-text-secondary">Downloaded 1 week ago</p>
							</div>
						</div>
						<button class="btn btn-secondary">
							Re-download
						</button>
					</div>
				</div>
			</div>

			<!-- Privacy Settings -->
			<div class="glass-card p-8">
				<div class="flex items-center gap-3 mb-6">
					<Shield class="w-6 h-6 text-primary" />
					<h2 class="text-2xl font-bold">Privacy Settings</h2>
				</div>
				<div class="space-y-4">
					<div class="flex justify-between items-center">
						<div>
							<p class="font-medium">Marketing Communications</p>
							<p class="text-sm text-text-secondary">Receive product updates and news</p>
						</div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider"></span>
						</label>
					</div>
					<div class="flex justify-between items-center">
						<div>
							<p class="font-medium">Usage Analytics</p>
							<p class="text-sm text-text-secondary">Help us improve (anonymous only)</p>
						</div>
						<label class="switch">
							<input type="checkbox" />
							<span class="slider"></span>
						</label>
					</div>
					<div class="mt-6">
						<a href="/privacy-request" class="text-primary font-medium">
							Request Data Export →
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
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
	}

	.slider:before {
		position: absolute;
		content: "";
		height: 18px;
		width: 18px;
		left: 3px;
		bottom: 3px;
		background-color: white;
		transition: 0.4s;
		border-radius: 50%;
	}

	input:checked + .slider {
		background-color: var(--color-primary);
	}

	input:checked + .slider:before {
		transform: translateX(24px);
	}
</style>
