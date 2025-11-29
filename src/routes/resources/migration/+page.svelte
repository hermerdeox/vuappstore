<script lang="ts">
	import { ArrowRight, CheckCircle, Download, Settings, Users, Shield } from 'lucide-svelte';

	const migrationSteps = [
		{
			step: 1,
			title: 'Assess Your Current Apps',
			description: 'Identify which apps collect your data and need privacy-first alternatives',
			actions: [
				'Review app permissions',
				'Check privacy policies',
				'Identify data collection practices'
			]
		},
		{
			step: 2,
			title: 'Choose VU Alternatives',
			description: 'Find VU Suite apps that replace your current privacy-invasive applications',
			actions: ['Browse VU app catalog', 'Compare features', 'Read privacy scores']
		},
		{
			step: 3,
			title: 'Export Your Data',
			description: 'Download your data from existing services before switching',
			actions: ['Use data export tools', 'Save important files', 'Backup contacts and messages']
		},
		{
			step: 4,
			title: 'Set Up VU Apps',
			description: 'Install and configure your new privacy-first applications',
			actions: ['Download VU apps', 'Import your data', 'Configure privacy settings']
		},
		{
			step: 5,
			title: 'Gradual Transition',
			description: 'Slowly transition from old apps to VU alternatives',
			actions: [
				'Use both apps temporarily',
				'Verify data integrity',
				'Train yourself on new interfaces'
			]
		},
		{
			step: 6,
			title: 'Complete the Switch',
			description: 'Delete old apps and fully embrace privacy-first computing',
			actions: ['Uninstall old apps', 'Delete accounts', 'Enjoy your privacy']
		}
	];

	const appMigrations = [
		{
			category: 'Email',
			from: 'Gmail, Outlook, Yahoo Mail',
			to: 'VuMail',
			difficulty: 'Easy',
			timeEstimate: '30 minutes',
			steps: ['Export emails via IMAP', 'Import to VuMail', 'Update email signatures']
		},
		{
			category: 'Cloud Storage',
			from: 'Google Drive, Dropbox, OneDrive',
			to: 'VuVault',
			difficulty: 'Medium',
			timeEstimate: '2-4 hours',
			steps: ['Download all files', 'Upload to VuVault', 'Share new links with contacts']
		},
		{
			category: 'Notes',
			from: 'Google Keep, Evernote, OneNote',
			to: 'VuNotes',
			difficulty: 'Easy',
			timeEstimate: '1 hour',
			steps: ['Export notes as text/HTML', 'Import to VuNotes', 'Reorganize folders']
		},
		{
			category: 'Messaging',
			from: 'WhatsApp, Telegram, Messenger',
			to: 'VuChat',
			difficulty: 'Hard',
			timeEstimate: '1-2 weeks',
			steps: ['Export chat history', 'Invite contacts to VuChat', 'Gradually switch conversations']
		}
	];
</script>

<svelte:head>
	<title>Migration Guide - VuAppStore Resources</title>
	<meta
		name="description"
		content="Complete guide to migrating from Big Tech apps to privacy-first VU Suite alternatives. Step-by-step instructions for a smooth transition."
	/>
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div
				class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6"
			>
				<ArrowRight class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide"
					>Migration Guide</span
				>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Your Journey to<br />Digital Privacy
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Step-by-step guide to migrating from Big Tech surveillance apps to privacy-first VU Suite
				alternatives. Reclaim your digital sovereignty without losing your data.
			</p>
		</div>

		<!-- Migration Steps -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">6-Step Migration Process</h2>
			<div class="space-y-8">
				{#each migrationSteps as step}
					<div class="glass-card p-8">
						<div class="flex items-start gap-6">
							<div
								class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0"
							>
								<span class="text-2xl font-bold text-primary">{step.step}</span>
							</div>
							<div class="flex-1">
								<h3 class="text-2xl font-bold mb-3">{step.title}</h3>
								<p class="text-text-secondary mb-4">{step.description}</p>
								<ul class="space-y-2">
									{#each step.actions as action}
										<li class="flex items-center gap-3">
											<CheckCircle class="w-5 h-5 text-success flex-shrink-0" />
											<span class="text-text-secondary text-sm">{action}</span>
										</li>
									{/each}
								</ul>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- App-Specific Migrations -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">App-Specific Migration Guides</h2>
			<div class="grid md:grid-cols-2 gap-6">
				{#each appMigrations as migration}
					<div class="glass-card p-6">
						<div class="flex items-center justify-between mb-4">
							<h3 class="text-xl font-bold">{migration.category}</h3>
							<span
								class="px-3 py-1 bg-{migration.difficulty === 'Easy'
									? 'success'
									: migration.difficulty === 'Medium'
										? 'warning'
										: 'error'}/20 text-{migration.difficulty === 'Easy'
									? 'success'
									: migration.difficulty === 'Medium'
										? 'warning'
										: 'error'} text-xs rounded-full"
							>
								{migration.difficulty}
							</span>
						</div>
						<div class="mb-4">
							<p class="text-sm text-text-secondary mb-2">
								<strong>From:</strong>
								{migration.from}
							</p>
							<p class="text-sm text-primary">
								<strong>To:</strong>
								{migration.to}
							</p>
							<p class="text-sm text-text-secondary mt-2">
								<strong>Time:</strong>
								{migration.timeEstimate}
							</p>
						</div>
						<div>
							<h4 class="font-semibold mb-2">Migration Steps:</h4>
							<ol class="space-y-1">
								{#each migration.steps as step, index}
									<li class="text-sm text-text-secondary">
										{index + 1}. {step}
									</li>
								{/each}
							</ol>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Migration Benefits -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<div class="text-center mb-8">
				<div
					class="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4"
				>
					<Shield class="w-8 h-8 text-success" />
				</div>
				<h2 class="text-3xl font-bold mb-4">Why Make the Switch?</h2>
				<p class="text-text-secondary max-w-2xl mx-auto">
					Migrating to VU Suite isn't just about privacy—it's about reclaiming control over your
					digital life and supporting a better future for technology.
				</p>
			</div>

			<div class="grid md:grid-cols-3 gap-8">
				<div class="text-center">
					<div class="text-3xl font-bold text-primary mb-2">100%</div>
					<div class="text-sm text-text-secondary">Data ownership and control</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-success mb-2">0</div>
					<div class="text-sm text-text-secondary">Tracking or surveillance</div>
				</div>
				<div class="text-center">
					<div class="text-3xl font-bold text-warning mb-2">$0</div>
					<div class="text-sm text-text-secondary">Revenue from your data</div>
				</div>
			</div>
		</div>

		<!-- Support -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Need Help with Migration?</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Our migration support team is here to help you every step of the way. Get personalized
				assistance to ensure a smooth transition to privacy-first computing.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/support/contact" class="btn btn-primary">
					<Users class="w-4 h-4" />
					Get Migration Help
				</a>
				<a href="/apps" class="btn btn-secondary">
					<Download class="w-4 h-4" />
					Browse VU Apps
				</a>
				<a href="/resources/comparison" class="btn btn-secondary"> VU vs Big Tech </a>
			</div>
		</div>
	</div>
</div>
