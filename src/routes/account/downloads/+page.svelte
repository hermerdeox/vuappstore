<script lang="ts">
	import { User, CreditCard, Download, Settings, LogOut, Shield, Calendar, HardDrive, RefreshCw, LockKeyhole, MessageSquare, Dumbbell, StickyNote, Wallet, Camera, Inbox, Rocket, CheckCircle, FileDown } from 'lucide-svelte';
	import { vuApps } from '$lib/data/apps';

	// VU Philosophy: No real names, only @usernames and @vumail.app addresses
	const user = {
		username: '@privacy_champion',
		email: 'privacy_champion@vumail.app',
		plan: 'Annual',
		privacyLevel: 0
	};

	// Download history - no personal data stored, only app references
	const downloads = [
		{
			appId: 'vuvault',
			appName: 'VuVault',
			iconComponent: LockKeyhole,
			color: '#00d4ff',
			downloadedAt: '2 days ago',
			version: 'v2.4.1',
			platform: 'macOS',
			size: '45 MB',
			status: 'active'
		},
		{
			appId: 'vuchat',
			appName: 'VuChat',
			iconComponent: MessageSquare,
			color: '#9333ea',
			downloadedAt: '5 days ago',
			version: 'v3.1.0',
			platform: 'macOS',
			size: '32 MB',
			status: 'active'
		},
		{
			appId: 'vufit',
			appName: 'VuFit',
			iconComponent: Dumbbell,
			color: '#22c55e',
			downloadedAt: '1 week ago',
			version: 'v1.8.3',
			platform: 'macOS',
			size: '28 MB',
			status: 'active'
		},
		{
			appId: 'vunotes',
			appName: 'VuNotes',
			iconComponent: StickyNote,
			color: '#eab308',
			downloadedAt: '2 weeks ago',
			version: 'v4.2.0',
			platform: 'macOS',
			size: '18 MB',
			status: 'active'
		},
		{
			appId: 'vuwallet',
			appName: 'VuWallet',
			iconComponent: Wallet,
			color: '#f97316',
			downloadedAt: '3 weeks ago',
			version: 'v2.0.5',
			platform: 'macOS',
			size: '52 MB',
			status: 'active'
		},
		{
			appId: 'vuphoto',
			appName: 'VuPhoto',
			iconComponent: Camera,
			color: '#ec4899',
			downloadedAt: '1 month ago',
			version: 'v3.5.2',
			platform: 'macOS',
			size: '67 MB',
			status: 'active'
		}
	];

	function handleRedownload(appId: string) {
		console.log(`Re-downloading ${appId}`);
		// In production, this would trigger a secure download
	}
</script>

<svelte:head>
	<title>Downloads - My Account | VuAppStore</title>
	<meta name="description" content="Manage your VU Suite app downloads. Re-download apps anytime with zero tracking." />
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
			Your Downloads
		</h1>
		<p class="text-lg text-text-secondary">
			Re-download any app from your VU Suite subscription. No tracking, no limits, no questions.
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
					<a href="/account/downloads" class="nav-item flex items-center gap-3 p-3 rounded-lg bg-glass-heavy text-primary">
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
			<!-- Download Stats -->
			<div class="glass-card p-8">
				<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
					<div class="stat-card text-center">
						<Download class="w-8 h-8 text-primary mx-auto mb-2" />
						<div class="text-3xl font-bold text-primary mb-1">{downloads.length}</div>
						<p class="text-sm text-text-secondary">Apps Downloaded</p>
					</div>
					<div class="stat-card text-center">
						<HardDrive class="w-8 h-8 text-success mx-auto mb-2" />
						<div class="text-3xl font-bold text-success mb-1">264 MB</div>
						<p class="text-sm text-text-secondary">Total Size</p>
					</div>
					<div class="stat-card text-center">
						<Shield class="w-8 h-8 text-info mx-auto mb-2" />
						<div class="text-3xl font-bold text-info mb-1">100%</div>
						<p class="text-sm text-text-secondary">Encrypted</p>
					</div>
				</div>
			</div>

			<!-- Privacy Notice -->
			<div class="glass-card p-6 border-l-4 border-success">
				<div class="flex items-start gap-3">
					<Shield class="w-6 h-6 text-success flex-shrink-0 mt-1" />
					<div>
						<h3 class="font-semibold text-success mb-2">Zero Download Tracking</h3>
						<p class="text-sm text-text-secondary leading-relaxed">
							We don't track what you download, when you download, or how many times. 
							Your download history is stored locally on your device only. 
							We simply provide the files you're entitled to access.
						</p>
					</div>
				</div>
			</div>

			<!-- Downloads List -->
			<div class="glass-card p-8">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-2xl font-bold">Download History</h2>
					<div class="text-sm text-text-secondary">
						{downloads.length} downloads • No tracking
					</div>
				</div>

				<div class="space-y-4">
					{#each downloads as download}
						<div class="download-item glass-card p-6 hover:border-primary/30 transition-all">
							<div class="flex items-center justify-between gap-6">
								<div class="flex items-center gap-4 flex-1">
									<!-- App Icon -->
									<div class="w-16 h-16 rounded-2xl flex items-center justify-center" style="background: {download.color}20;">
										<svelte:component this={download.iconComponent} class="w-8 h-8" style="color: {download.color};" />
									</div>

									<!-- App Info -->
									<div class="flex-1">
										<div class="flex items-center gap-3 mb-1">
											<h3 class="text-lg font-semibold">{download.appName}</h3>
											<span class="px-2 py-1 bg-success/20 text-success text-xs font-bold rounded">
												Active
											</span>
										</div>
										<div class="flex items-center gap-4 text-sm text-text-secondary">
											<span class="flex items-center gap-1">
												<Calendar class="w-4 h-4" />
												{download.downloadedAt}
											</span>
											<span>•</span>
											<span>Version {download.version}</span>
											<span>•</span>
											<span>{download.platform}</span>
											<span>•</span>
											<span>{download.size}</span>
										</div>
									</div>
								</div>

								<!-- Actions -->
								<div class="flex items-center gap-3">
									<a href="/apps/{download.appId}" class="btn btn-secondary">
										View Details
									</a>
									<button 
										on:click={() => handleRedownload(download.appId)}
										class="btn btn-primary flex items-center gap-2"
									>
										<RefreshCw class="w-4 h-4" />
										Re-download
									</button>
								</div>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<!-- Download Instructions -->
			<div class="glass-card p-8">
				<h3 class="text-xl font-semibold mb-4">Download Instructions</h3>
				<div class="space-y-4">
					<div class="instruction-item">
						<h4 class="font-semibold text-primary mb-2 flex items-center gap-2"><Inbox class="w-4 h-4" /> Re-download Anytime</h4>
						<p class="text-sm text-text-secondary">
							As long as your subscription is active, you can re-download any VU Suite app 
							unlimited times. No questions asked, no tracking, no limits.
						</p>
					</div>
					<div class="instruction-item">
						<h4 class="font-semibold text-primary mb-2 flex items-center gap-2"><LockKeyhole class="w-4 h-4" /> Verified Downloads Only</h4>
						<p class="text-sm text-text-secondary">
							Every download is cryptographically signed and verified. You'll always get 
							the authentic, unmodified application directly from VU.
						</p>
					</div>
					<div class="instruction-item">
						<h4 class="font-semibold text-primary mb-2 flex items-center gap-2"><Rocket class="w-4 h-4" /> Automatic Updates</h4>
						<p class="text-sm text-text-secondary">
							Apps automatically check for updates in the background. You control when 
							to install them. No forced updates, no telemetry.
						</p>
					</div>
					<div class="instruction-item">
						<h4 class="font-semibold text-primary mb-2 flex items-center gap-2"><FileDown class="w-4 h-4" /> Offline Installers</h4>
						<p class="text-sm text-text-secondary">
							Download standalone offline installers for complete independence. 
							Install on air-gapped systems, backup to encrypted drives, or share with 
							other devices on your subscription.
						</p>
					</div>
				</div>
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

	.download-item {
		border: 1px solid rgba(255, 255, 255, 0.1);
	}

	.download-item:hover {
		border-color: rgba(0, 212, 255, 0.3);
	}

	.instruction-item {
		padding: 16px;
		background: rgba(255, 255, 255, 0.03);
		border-radius: 8px;
	}
</style>

