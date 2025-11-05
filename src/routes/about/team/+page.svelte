<script lang="ts">
	import { Shield, Code, Palette, Users, Heart, Globe } from 'lucide-svelte';

	const teamMembers = [
		{
			name: "Alex Chen",
			role: "Founder & CEO",
			bio: "Former security architect at Signal. Passionate about building technology that respects human dignity.",
			icon: Shield,
			expertise: ["Zero-Knowledge Systems", "Cryptography", "Privacy Engineering"]
		},
		{
			name: "Sarah Rodriguez",
			role: "Chief Technology Officer",
			bio: "Ex-Apple privacy engineer. Leading the development of the VU Suite's privacy-first architecture.",
			icon: Code,
			expertise: ["System Architecture", "Mobile Security", "End-to-End Encryption"]
		},
		{
			name: "Marcus Thompson",
			role: "Head of Product Design",
			bio: "Previously at ProtonMail. Believes great privacy tools should be beautiful and intuitive.",
			icon: Palette,
			expertise: ["UX/UI Design", "Privacy UX", "Accessibility"]
		},
		{
			name: "Dr. Elena Vasquez",
			role: "Chief Privacy Officer",
			bio: "Privacy law expert and former GDPR consultant. Ensures all VU apps meet the highest privacy standards.",
			icon: Users,
			expertise: ["Privacy Law", "GDPR/CCPA Compliance", "Data Protection"]
		}
	];

	const advisors = [
		{
			name: "Edward Snowden",
			role: "Privacy Advisor",
			bio: "Whistleblower and privacy advocate. Advises on global privacy initiatives."
		},
		{
			name: "Dr. Matthew Green",
			role: "Cryptography Advisor", 
			bio: "Johns Hopkins cryptographer. Ensures VU's encryption meets academic standards."
		},
		{
			name: "Laura Poitras",
			role: "Digital Rights Advisor",
			bio: "Documentary filmmaker and digital rights activist. Guides our advocacy efforts."
		}
	];
</script>

<svelte:head>
	<title>Our Team - VuAppStore</title>
	<meta name="description" content="Meet the privacy pioneers building VuAppStore and the VU Suite. Experts in cryptography, privacy law, and user experience." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6">
				<Users class="w-4 h-4 text-primary" />
				<span class="text-xs font-semibold text-primary uppercase tracking-wide">Our Team</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Privacy Pioneers<br>Building the Future
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Meet the experts, advocates, and engineers who are dedicated to creating technology that respects your privacy and digital rights.
			</p>
		</div>

		<!-- Core Team -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Core Team</h2>
			<div class="grid md:grid-cols-2 gap-8">
				{#each teamMembers as member}
					<div class="glass-card p-8 hover:scale-105 transition-transform duration-200">
						<div class="flex items-start gap-6">
							<div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
								<svelte:component this={member.icon} class="w-8 h-8 text-primary" />
							</div>
							<div class="flex-1">
								<h3 class="text-xl font-bold mb-1">{member.name}</h3>
								<p class="text-primary text-sm font-semibold mb-3">{member.role}</p>
								<p class="text-text-secondary text-sm leading-relaxed mb-4">{member.bio}</p>
								<div class="flex flex-wrap gap-2">
									{#each member.expertise as skill}
										<span class="px-3 py-1 bg-glass text-xs rounded-full border border-border">
											{skill}
										</span>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Advisors -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Advisory Board</h2>
			<div class="grid md:grid-cols-3 gap-6">
				{#each advisors as advisor}
					<div class="glass-card p-6 text-center">
						<div class="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
							<Heart class="w-6 h-6 text-success" />
						</div>
						<h3 class="text-lg font-bold mb-1">{advisor.name}</h3>
						<p class="text-success text-sm font-semibold mb-3">{advisor.role}</p>
						<p class="text-text-secondary text-sm leading-relaxed">{advisor.bio}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Company Values -->
		<div class="glass-card p-8 md:p-12 mb-16">
			<h2 class="text-3xl font-bold text-center mb-8">Our Values</h2>
			<div class="grid md:grid-cols-2 gap-8">
				<div>
					<h3 class="text-xl font-bold mb-4 flex items-center gap-3">
						<Shield class="w-6 h-6 text-primary" />
						Privacy by Design
					</h3>
					<p class="text-text-secondary leading-relaxed">
						Privacy isn't an afterthought—it's the foundation of everything we build. Every feature, every line of code, every design decision prioritizes user privacy.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-4 flex items-center gap-3">
						<Globe class="w-6 h-6 text-success" />
						Transparency First
					</h3>
					<p class="text-text-secondary leading-relaxed">
						We believe in radical transparency. Our code, our policies, our business model—everything is open and honest. No hidden agendas, no dark patterns.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-4 flex items-center gap-3">
						<Users class="w-6 h-6 text-warning" />
						User Empowerment
					</h3>
					<p class="text-text-secondary leading-relaxed">
						We build tools that give users control, not take it away. Every VU app is designed to empower users with choice, control, and ownership of their data.
					</p>
				</div>
				<div>
					<h3 class="text-xl font-bold mb-4 flex items-center gap-3">
						<Heart class="w-6 h-6 text-error" />
						Human-Centered Technology
					</h3>
					<p class="text-text-secondary leading-relaxed">
						Technology should serve humanity, not exploit it. We create apps that enhance human potential while respecting human dignity and rights.
					</p>
				</div>
			</div>
		</div>

		<!-- Join Us -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Join the Privacy Revolution</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				We're always looking for talented individuals who share our passion for privacy, security, and user empowerment. 
				Help us build the future of technology.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/developers/contribute" class="btn btn-primary">
					View Open Positions
				</a>
				<a href="/support/contact" class="btn btn-secondary">
					Get in Touch
				</a>
			</div>
		</div>
	</div>
</div>
