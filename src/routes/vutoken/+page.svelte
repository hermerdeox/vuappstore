<script lang="ts">
	import { Coins, TrendingUp, Users, Code, Shield, Zap, Gift, ArrowRight, CheckCircle, Sparkles, Lock, Globe, DollarSign, Target, Lightbulb, LockKeyhole, Check } from 'lucide-svelte';
</script>

<svelte:head>
	<title>VuToken - Privacy Rewards Cryptocurrency | VuAppStore</title>
	<meta name="description" content="Earn VuTokens for supporting privacy. The first privacy-focused rewards token. Use apps, develop software, contribute to open source, and earn rewards." />
</svelte:head>

<div class="vutoken-page">
	<!-- Hero Section -->
	<section class="hero container py-20 text-center relative z-10">
		<div class="max-w-5xl mx-auto">
			<!-- Coming Soon Badge -->
			<div class="inline-flex items-center gap-2 px-6 py-3 bg-warning/20 border-2 border-warning/40 rounded-full mb-6 animate-pulse-slow">
				<Sparkles class="w-5 h-5 text-warning" />
				<span class="text-sm font-black text-warning uppercase tracking-wider">Coming Q1 2026</span>
				<Sparkles class="w-5 h-5 text-warning" />
			</div>

			<!-- VuToken Logo -->
			<div class="flex justify-center mb-8">
				<div class="relative">
					<div class="w-32 h-32 bg-gradient-to-br from-warning/30 to-primary/30 border-4 border-warning rounded-full flex items-center justify-center">
						<Coins class="w-20 h-20 text-warning" />
					</div>
					<div class="absolute -top-2 -right-2 w-10 h-10 bg-success border-2 border-background rounded-full flex items-center justify-center">
						<Shield class="w-6 h-6 text-background" />
					</div>
				</div>
			</div>

			<!-- Title -->
			<h1 class="text-5xl md:text-7xl font-black mb-6 text-gradient">
				VuToken
			</h1>
			<p class="text-2xl md:text-3xl font-semibold text-warning mb-8">
				The Privacy Rewards Cryptocurrency
			</p>

			<!-- Description -->
			<p class="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto mb-12">
				The world's first <strong class="text-primary">privacy-focused rewards token</strong>. 
				Earn VuTokens by <strong class="text-success">using privacy apps</strong>, 
				<strong class="text-info">developing software</strong>, and 
				<strong class="text-warning">contributing to the movement</strong>.
			</p>

			<!-- Key Features Grid -->
			<div class="features-grid grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
				<div class="feature-card glass-card p-6 border-2 border-success/20">
					<Lock class="w-12 h-12 text-success mx-auto mb-4" />
					<h3 class="font-bold text-lg mb-2">Privacy-Preserving</h3>
					<p class="text-sm text-text-secondary">Zero-knowledge token transactions. Your rewards, completely private.</p>
				</div>
				<div class="feature-card glass-card p-6 border-2 border-primary/20">
					<Zap class="w-12 h-12 text-primary mx-auto mb-4" />
					<h3 class="font-bold text-lg mb-2">Instant Rewards</h3>
					<p class="text-sm text-text-secondary">Earn tokens in real-time as you support privacy initiatives.</p>
				</div>
				<div class="feature-card glass-card p-6 border-2 border-warning/20">
					<Globe class="w-12 h-12 text-warning mx-auto mb-4" />
					<h3 class="font-bold text-lg mb-2">Global Exchange</h3>
					<p class="text-sm text-text-secondary">Trade for subscriptions, discounts, or cash out anonymously.</p>
				</div>
			</div>

			<!-- CTA Buttons -->
			<div class="flex justify-center gap-6 flex-wrap">
				<a href="#whitepaper" class="btn btn-primary text-lg px-10 py-5">
					<Coins class="w-6 h-6" />
					Read Whitepaper
					<ArrowRight class="w-6 h-6" />
				</a>
				<a href="#earn" class="btn btn-secondary text-lg px-10 py-5">
					Start Earning (Q1 2026)
				</a>
			</div>
		</div>
	</section>

	<!-- Token Economics -->
	<section class="economics container mb-16 relative z-10">
		<div class="glass-card p-12">
			<div class="text-center mb-12">
				<h2 class="text-4xl font-black mb-4">Token Economics</h2>
				<p class="text-lg text-text-secondary">Fair distribution. Privacy-first. Community-owned.</p>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-12">
				<!-- Token Details -->
				<div>
					<h3 class="text-2xl font-bold mb-6">VuToken Details</h3>
					<div class="space-y-4">
						<div class="detail-item p-4 bg-glass rounded-lg">
							<div class="label text-sm text-text-tertiary mb-1">Total Supply</div>
							<div class="value text-2xl font-bold text-primary">1,000,000,000 VUT</div>
							<div class="note text-xs text-text-tertiary mt-1">Fixed supply, no inflation</div>
						</div>
						<div class="detail-item p-4 bg-glass rounded-lg">
							<div class="label text-sm text-text-tertiary mb-1">Token Standard</div>
							<div class="value text-xl font-bold">Privacy-Preserving L2</div>
							<div class="note text-xs text-text-tertiary mt-1">Built on privacy blockchain (TBD: Monero/zkSync)</div>
						</div>
						<div class="detail-item p-4 bg-glass rounded-lg">
							<div class="label text-sm text-text-tertiary mb-1">Initial Price</div>
							<div class="value text-2xl font-bold text-success">$0.01 USD</div>
							<div class="note text-xs text-text-tertiary mt-1">1 VuToken = 1 cent at launch</div>
						</div>
					</div>
				</div>

				<!-- Distribution -->
				<div>
					<h3 class="text-2xl font-bold mb-6">Token Distribution</h3>
					<div class="space-y-3">
						<div class="distribution-item flex items-center justify-between p-4 bg-glass rounded-lg">
							<div>
								<div class="font-semibold">Community Rewards</div>
								<div class="text-xs text-text-tertiary">Users & contributors</div>
							</div>
							<div class="text-right">
								<div class="text-xl font-bold text-success">40%</div>
								<div class="text-xs text-text-tertiary">400M VUT</div>
							</div>
						</div>
						<div class="distribution-item flex items-center justify-between p-4 bg-glass rounded-lg">
							<div>
								<div class="font-semibold">Developer Pool</div>
								<div class="text-xs text-text-tertiary">App builders & bounties</div>
							</div>
							<div class="text-right">
								<div class="text-xl font-bold text-primary">30%</div>
								<div class="text-xs text-text-tertiary">300M VUT</div>
							</div>
						</div>
						<div class="distribution-item flex items-center justify-between p-4 bg-glass rounded-lg">
							<div>
								<div class="font-semibold">Ecosystem Fund</div>
								<div class="text-xs text-text-tertiary">Grants & partnerships</div>
							</div>
							<div class="text-right">
								<div class="text-xl font-bold text-info">20%</div>
								<div class="text-xs text-text-tertiary">200M VUT</div>
							</div>
						</div>
						<div class="distribution-item flex items-center justify-between p-4 bg-glass rounded-lg">
							<div>
								<div class="font-semibold">Team & Advisors</div>
								<div class="text-xs text-text-tertiary">4-year vesting</div>
							</div>
							<div class="text-right">
								<div class="text-xl font-bold text-text-tertiary">10%</div>
								<div class="text-xs text-text-tertiary">100M VUT</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- How to Earn -->
	<section id="earn" class="earn-section container mb-16 relative z-10">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-black mb-4">How to Earn VuTokens</h2>
			<p class="text-lg text-text-secondary">Multiple ways to earn rewards for supporting privacy</p>
		</div>

		<div class="earn-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
			<!-- Use Privacy Apps -->
			<div class="earn-card glass-card p-8 text-center border-l-4 border-success">
				<div class="earn-icon w-16 h-16 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<Shield class="w-8 h-8 text-success" />
				</div>
				<h3 class="font-bold text-xl mb-3">Use Privacy Apps</h3>
				<p class="text-sm text-text-secondary mb-4">
					Earn tokens daily for using VU Suite apps. More privacy = more tokens.
				</p>
				<div class="reward-amount text-3xl font-black text-success mb-2">
					Up to 100 VUT/day
				</div>
				<p class="text-xs text-text-tertiary">Based on privacy level & usage</p>
			</div>

			<!-- Develop Apps -->
			<div class="earn-card glass-card p-8 text-center border-l-4 border-primary">
				<div class="earn-icon w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<Code class="w-8 h-8 text-primary" />
				</div>
				<h3 class="font-bold text-xl mb-3">Build Privacy Apps</h3>
				<p class="text-sm text-text-secondary mb-4">
					Create privacy-first applications and earn ongoing rewards.
				</p>
				<div class="reward-amount text-3xl font-black text-primary mb-2">
					1,000-10K VUT
				</div>
				<p class="text-xs text-text-tertiary">Per app approved + revenue share</p>
			</div>

			<!-- Contribute to Open Source -->
			<div class="earn-card glass-card p-8 text-center border-l-4 border-info">
				<div class="earn-icon w-16 h-16 bg-info/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<Target class="w-8 h-8 text-info" />
				</div>
				<h3 class="font-bold text-xl mb-3">Open Source Contributions</h3>
				<p class="text-sm text-text-secondary mb-4">
					Contribute code, documentation, or translations.
				</p>
				<div class="reward-amount text-3xl font-black text-info mb-2">
					50-500 VUT
				</div>
				<p class="text-xs text-text-tertiary">Per merged contribution</p>
			</div>

			<!-- Report Vulnerabilities -->
			<div class="earn-card glass-card p-8 text-center border-l-4 border-warning">
				<div class="earn-icon w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center mx-auto mb-4">
					<Shield class="w-8 h-8 text-warning" />
				</div>
				<h3 class="font-bold text-xl mb-3">Security Research</h3>
				<p class="text-sm text-text-secondary mb-4">
					Find and report security vulnerabilities responsibly.
				</p>
				<div class="reward-amount text-3xl font-black text-warning mb-2">
					500-50K VUT
				</div>
				<p class="text-xs text-text-tertiary">Based on severity (Critical = 50K)</p>
			</div>
		</div>
	</section>

	<!-- Use Cases -->
	<section class="use-cases container mb-16 relative z-10">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-black mb-4">What Can You Do With VuTokens?</h2>
			<p class="text-lg text-text-secondary">Spend, trade, or hold - your tokens, your choice</p>
		</div>

		<div class="use-cases-grid grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="use-case-card glass-card p-8">
				<DollarSign class="w-12 h-12 text-success mb-4" />
				<h3 class="text-2xl font-bold mb-3">Pay for Subscriptions</h3>
				<p class="text-text-secondary mb-4">
					Use VuTokens to pay for VU Suite apps or marketplace subscriptions.
				</p>
				<ul class="space-y-2 text-sm text-text-secondary">
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
						<span>256 VUT = 1 month of any app ($2.56)</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
						<span>7,680 VUT = Complete Suite annual ($76.80)</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
						<span>No fees, instant payment</span>
					</li>
				</ul>
			</div>

			<div class="use-case-card glass-card p-8">
				<Gift class="w-12 h-12 text-primary mb-4" />
				<h3 class="text-2xl font-bold mb-3">Unlock Perks</h3>
				<p class="text-text-secondary mb-4">
					Redeem tokens for exclusive benefits and premium features.
				</p>
				<ul class="space-y-2 text-sm text-text-secondary">
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
						<span>Early access to new apps</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
						<span>SubZero level invitations</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
						<span>VIP support access</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
						<span>Community governance voting</span>
					</li>
				</ul>
			</div>

			<div class="use-case-card glass-card p-8">
				<TrendingUp class="w-12 h-12 text-warning mb-4" />
				<h3 class="text-2xl font-bold mb-3">Trade or Cash Out</h3>
				<p class="text-text-secondary mb-4">
					Exchange VuTokens on privacy-focused DEXs or cash out anonymously.
				</p>
				<ul class="space-y-2 text-sm text-text-secondary">
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
						<span>Trade on decentralized exchanges</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
						<span>Convert to Monero/BTC anonymously</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
						<span>No KYC required</span>
					</li>
					<li class="flex items-start gap-2">
						<CheckCircle class="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
						<span>Privacy-preserving transactions</span>
					</li>
				</ul>
			</div>
		</div>
	</section>

	<!-- Earn Scenarios -->
	<section class="scenarios container mb-16 relative z-10">
		<div class="glass-card p-12">
			<h2 class="text-4xl font-black text-center mb-12">Earning Scenarios</h2>

			<div class="scenarios-grid space-y-6">
				<!-- Scenario 1: Regular User -->
				<div class="scenario glass-card p-6 border-l-4 border-success">
					<div class="flex items-start gap-6">
						<div class="scenario-icon w-16 h-16 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
							<Users class="w-8 h-8 text-success" />
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Privacy-Conscious User</h3>
							<p class="text-text-secondary mb-4">
								Sarah uses 5 VU Suite apps daily (VuNotes, VuMail, VuCalendar, VuChat, VuPass)
							</p>
							<div class="earnings grid grid-cols-2 md:grid-cols-4 gap-4">
								<div>
									<div class="text-sm text-text-tertiary">Daily Earnings</div>
									<div class="text-xl font-bold text-success">50 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Monthly</div>
									<div class="text-xl font-bold text-success">1,500 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Annual</div>
									<div class="text-xl font-bold text-success">18,000 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Value</div>
									<div class="text-xl font-bold text-primary">$180/year</div>
								</div>
							</div>
							<p class="text-xs text-success mt-3 flex items-center gap-1"><Lightbulb class="w-3 h-3" /> Earns enough to cover 70% of Complete Suite annual subscription!</p>
						</div>
					</div>
				</div>

				<!-- Scenario 2: Developer -->
				<div class="scenario glass-card p-6 border-l-4 border-primary">
					<div class="flex items-start gap-6">
						<div class="scenario-icon w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
							<Code class="w-8 h-8 text-primary" />
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Privacy App Developer</h3>
							<p class="text-text-secondary mb-4">
								Alex builds PrivacyNotes app, gets 1,000 subscribers, contributes to 3 open source projects
							</p>
							<div class="earnings grid grid-cols-2 md:grid-cols-4 gap-4">
								<div>
									<div class="text-sm text-text-tertiary">App Approval</div>
									<div class="text-xl font-bold text-primary">5,000 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Monthly Revenue</div>
									<div class="text-xl font-bold text-primary">10,000 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Open Source</div>
									<div class="text-xl font-bold text-primary">750 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Total Monthly</div>
									<div class="text-xl font-bold text-success">15,750 VUT</div>
								</div>
							</div>
							<p class="text-xs text-primary mt-3 flex items-center gap-1"><DollarSign class="w-3 h-3" /> $157.50/month in additional token rewards on top of subscription revenue!</p>
						</div>
					</div>
				</div>

				<!-- Scenario 3: Security Researcher -->
				<div class="scenario glass-card p-6 border-l-4 border-warning">
					<div class="flex items-start gap-6">
						<div class="scenario-icon w-16 h-16 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
							<Shield class="w-8 h-8 text-warning" />
						</div>
						<div class="flex-1">
							<h3 class="text-xl font-bold mb-2">Security Researcher</h3>
							<p class="text-text-secondary mb-4">
								Jordan finds critical vulnerability in VuChat, reports responsibly, gets rewarded
							</p>
							<div class="earnings grid grid-cols-3 gap-4">
								<div>
									<div class="text-sm text-text-tertiary">Bounty Award</div>
									<div class="text-xl font-bold text-warning">50,000 VUT</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">Value</div>
									<div class="text-xl font-bold text-success">$500</div>
								</div>
								<div>
									<div class="text-sm text-text-tertiary">+ Hall of Fame</div>
									<div class="text-sm font-bold text-primary">Recognition</div>
								</div>
							</div>
							<p class="text-xs text-warning mt-3 flex items-center gap-1"><Lock class="w-3 h-3" /> Critical bugs = Maximum rewards. Help secure privacy for everyone.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Privacy Promise -->
	<section class="privacy-promise container mb-16 relative z-10">
		<div class="glass-card p-12 border-2 border-primary/30">
			<div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
				<div>
					<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 border border-primary/40 rounded-full mb-4">
						<Lock class="w-4 h-4 text-primary" />
						<span class="text-xs font-bold text-primary uppercase">Privacy Guarantee</span>
					</div>
					<h2 class="text-4xl font-black mb-6">Zero-Knowledge Token Transactions</h2>
					<p class="text-lg text-text-secondary leading-relaxed mb-6">
						VuToken is built on a privacy-preserving blockchain. Every transaction is completely private, 
						untraceable, and anonymous. We don't track who earns, who spends, or how tokens are used.
					</p>
					<div class="privacy-features space-y-4">
						<div class="flex items-start gap-3">
							<CheckCircle class="w-6 h-6 text-success flex-shrink-0 mt-1" />
							<div>
								<div class="font-semibold mb-1">Ring Signatures</div>
								<p class="text-sm text-text-tertiary">Sender anonymity protected</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle class="w-6 h-6 text-success flex-shrink-0 mt-1" />
							<div>
								<div class="font-semibold mb-1">Stealth Addresses</div>
								<p class="text-sm text-text-tertiary">Receiver privacy guaranteed</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle class="w-6 h-6 text-success flex-shrink-0 mt-1" />
							<div>
								<div class="font-semibold mb-1">Confidential Amounts</div>
								<p class="text-sm text-text-tertiary">Transaction values hidden</p>
							</div>
						</div>
						<div class="flex items-start gap-3">
							<CheckCircle class="w-6 h-6 text-success flex-shrink-0 mt-1" />
							<div>
								<div class="font-semibold mb-1">No KYC Ever</div>
								<p class="text-sm text-text-tertiary">Your identity stays private</p>
							</div>
						</div>
					</div>
				</div>

				<div class="relative">
					<div class="glass-card p-8 text-center">
						<div class="w-16 h-16 mx-auto mb-6 bg-primary/20 rounded-full flex items-center justify-center">
							<LockKeyhole class="w-10 h-10 text-primary" />
						</div>
						<h3 class="text-2xl font-bold mb-4">Your Tokens. Your Privacy.</h3>
						<p class="text-text-secondary mb-6">
							Built on proven privacy technology, VuToken ensures your financial activities remain completely private.
						</p>
						<div class="stats grid grid-cols-2 gap-4">
							<div>
								<div class="text-3xl font-black text-primary">0</div>
								<div class="text-xs text-text-tertiary">Tracking</div>
							</div>
							<div>
								<div class="text-3xl font-black text-success">100%</div>
								<div class="text-xs text-text-tertiary">Anonymous</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Roadmap -->
	<section class="roadmap container mb-16 relative z-10">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-black mb-4">VuToken Roadmap</h2>
			<p class="text-lg text-text-secondary">Privacy-first development, community-driven timeline</p>
		</div>

		<div class="timeline space-y-6">
			<!-- Q1 2026 -->
			<div class="timeline-item glass-card p-8 border-l-4 border-primary">
				<div class="flex items-start gap-6">
					<div class="timeline-date">
						<div class="text-3xl font-black text-primary">Q1</div>
						<div class="text-sm text-text-tertiary">2026</div>
					</div>
					<div class="flex-1">
						<h3 class="text-2xl font-bold mb-3">Token Launch</h3>
						<ul class="space-y-2 text-text-secondary">
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-primary flex-shrink-0" />
								<span>VuToken smart contract deployment</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-primary flex-shrink-0" />
								<span>Initial token distribution to early supporters</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-primary flex-shrink-0" />
								<span>Enable earning through app usage</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-primary flex-shrink-0" />
								<span>DEX listing on privacy-focused exchanges</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Q2 2026 -->
			<div class="timeline-item glass-card p-8 border-l-4 border-success">
				<div class="flex items-start gap-6">
					<div class="timeline-date">
						<div class="text-3xl font-black text-success">Q2</div>
						<div class="text-sm text-text-tertiary">2026</div>
					</div>
					<div class="flex-1">
						<h3 class="text-2xl font-bold mb-3">Ecosystem Expansion</h3>
						<ul class="space-y-2 text-text-secondary">
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-success flex-shrink-0" />
								<span>Developer bounty program with VuToken rewards</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-success flex-shrink-0" />
								<span>Subscription payments in VuToken enabled</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-success flex-shrink-0" />
								<span>Community governance implementation</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-success flex-shrink-0" />
								<span>Staking rewards program</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<!-- Q3-Q4 2026 -->
			<div class="timeline-item glass-card p-8 border-l-4 border-info">
				<div class="flex items-start gap-6">
					<div class="timeline-date">
						<div class="text-3xl font-black text-info">Q3-Q4</div>
						<div class="text-sm text-text-tertiary">2026</div>
					</div>
					<div class="flex-1">
						<h3 class="text-2xl font-bold mb-3">Advanced Features</h3>
						<ul class="space-y-2 text-text-secondary">
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-info flex-shrink-0" />
								<span>Cross-chain privacy bridges</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-info flex-shrink-0" />
								<span>Privacy-preserving DeFi integration</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-info flex-shrink-0" />
								<span>Anonymous token swap protocol</span>
							</li>
							<li class="flex items-start gap-2">
								<Check class="w-4 h-4 text-info flex-shrink-0" />
								<span>Mobile wallet with biometric security</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- FAQ -->
	<section class="faq-section container mb-16 relative z-10">
		<div class="max-w-4xl mx-auto">
			<h2 class="text-4xl font-black text-center mb-12">VuToken FAQ</h2>

			<div class="space-y-6">
				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">What is VuToken?</h3>
					<p class="text-text-secondary leading-relaxed">
						VuToken is a privacy-focused cryptocurrency that rewards users for supporting the privacy movement. 
						Earn tokens by using privacy apps, developing privacy software, contributing to open source, or finding security vulnerabilities.
					</p>
				</div>

				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">How are transactions kept private?</h3>
					<p class="text-text-secondary leading-relaxed">
						VuToken uses zero-knowledge cryptography similar to Monero. All transactions use ring signatures, 
						stealth addresses, and confidential amounts to ensure complete privacy. No one can trace who sent, 
						who received, or how much was transferred.
					</p>
				</div>

				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">What can I buy with VuTokens?</h3>
					<p class="text-text-secondary leading-relaxed">
						Pay for VU Suite subscriptions (256 VUT = $2.56), unlock premium features, access early releases, 
						or trade on decentralized exchanges. You can also cash out anonymously to Monero or Bitcoin.
					</p>
				</div>

				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">Is there KYC/AML required?</h3>
					<p class="text-text-secondary leading-relaxed">
						<strong class="text-error">NO.</strong> VuToken is completely decentralized and privacy-preserving. 
						No KYC, no AML, no identity verification. Your @username is all you need. This aligns with VU's 
						zero-knowledge philosophy.
					</p>
				</div>

				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">When does VuToken launch?</h3>
					<p class="text-text-secondary leading-relaxed">
						Target launch: Q1 2026. Early supporters who subscribe before launch will receive bonus tokens. 
						Sign up for updates to stay informed about the token generation event.
					</p>
				</div>

				<div class="faq-item glass-card p-6">
					<h3 class="font-bold text-lg mb-3">How do I earn tokens as a regular user?</h3>
					<p class="text-text-secondary leading-relaxed">
						Simply use VU Suite apps! Tokens are earned passively based on your privacy level. Level 0 apps 
						earn the most tokens. Average user earns 50-100 VUT/day, enough to offset 50-100% of subscription costs.
					</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Join Waitlist CTA -->
	<section class="waitlist-cta container mb-16 relative z-10">
		<div class="glass-card p-16 text-center border-2 border-warning/40">
			<Coins class="w-20 h-20 text-warning mx-auto mb-6" />
			<h2 class="text-4xl md:text-5xl font-black mb-6">Join the VuToken Waitlist</h2>
			<p class="text-xl text-text-secondary mb-8 max-w-2xl mx-auto">
				Be among the first to earn VuTokens. Early waitlist members receive bonus tokens at launch.
			</p>
			<form class="max-w-md mx-auto mb-6">
				<div class="flex gap-4">
					<input 
						type="email" 
						placeholder="your@vumail.app"
						class="flex-1 px-4 py-3 bg-surface border border-border rounded-lg focus:border-primary focus:outline-none"
					/>
					<button type="submit" class="btn btn-primary">
						Join Waitlist
					</button>
				</div>
				<p class="text-xs text-text-tertiary mt-3 flex items-center justify-center gap-1">
					<CheckCircle class="w-3 h-3" /> Only @vumail.app addresses accepted. No external email tracking.
				</p>
			</form>
			<div class="text-sm text-success font-semibold flex items-center justify-center gap-2">
				<Gift class="w-4 h-4" /> Bonus: First 10,000 signups receive 1,000 VUT at launch ($10 value)
			</div>
		</div>
	</section>
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.timeline-date {
		min-width: 80px;
		text-align: center;
	}
</style>

