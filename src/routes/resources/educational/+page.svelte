<script lang="ts">
	import { BookOpen, Video, Headphones, FileText, ExternalLink, Download } from 'lucide-svelte';

	const resources = [
		{
			category: "Privacy Fundamentals",
			icon: BookOpen,
			color: "primary",
			items: [
				{
					title: "Digital Privacy 101",
					type: "Guide",
					description: "Complete beginner's guide to understanding digital privacy and why it matters",
					link: "/resources/privacy-guide",
					duration: "15 min read"
				},
				{
					title: "Understanding Encryption",
					type: "Article",
					description: "How encryption works and why it's essential for protecting your data",
					link: "#",
					duration: "10 min read"
				},
				{
					title: "Privacy vs Security",
					type: "Explainer",
					description: "The difference between privacy and security, and why you need both",
					link: "#",
					duration: "8 min read"
				}
			]
		},
		{
			category: "Video Tutorials",
			icon: Video,
			color: "success",
			items: [
				{
					title: "Setting Up VuVault",
					type: "Tutorial",
					description: "Step-by-step guide to setting up secure file storage with VuVault",
					link: "#",
					duration: "12 minutes"
				},
				{
					title: "VuChat Security Features",
					type: "Demo",
					description: "Overview of VuChat's end-to-end encryption and privacy features",
					link: "#",
					duration: "8 minutes"
				},
				{
					title: "Migration from Google Drive",
					type: "Tutorial",
					description: "How to safely migrate your files from Google Drive to VuVault",
					link: "#",
					duration: "15 minutes"
				}
			]
		},
		{
			category: "Podcasts & Audio",
			icon: Headphones,
			color: "warning",
			items: [
				{
					title: "The Privacy Revolution",
					type: "Podcast Series",
					description: "Weekly discussions about digital privacy, security, and the future of technology",
					link: "#",
					duration: "30-45 min episodes"
				},
				{
					title: "VU Founder Interviews",
					type: "Audio Series",
					description: "Conversations with privacy advocates and security experts",
					link: "#",
					duration: "20-30 min episodes"
				},
				{
					title: "Privacy News Roundup",
					type: "Weekly Update",
					description: "Latest news and developments in digital privacy and security",
					link: "#",
					duration: "15 min episodes"
				}
			]
		},
		{
			category: "Technical Documentation",
			icon: FileText,
			color: "error",
			items: [
				{
					title: "VU Architecture Whitepaper",
					type: "Technical Doc",
					description: "Detailed technical overview of VU Suite's zero-knowledge architecture",
					link: "#",
					duration: "45 min read"
				},
				{
					title: "Encryption Implementation",
					type: "Technical Guide",
					description: "How VU apps implement end-to-end encryption and key management",
					link: "#",
					duration: "30 min read"
				},
				{
					title: "Security Audit Reports",
					type: "Reports",
					description: "Independent security audit reports for all VU Suite applications",
					link: "#",
					duration: "Various"
				}
			]
		}
	];

	const courses = [
		{
			title: "Privacy Fundamentals Course",
			level: "Beginner",
			duration: "2 hours",
			modules: 6,
			description: "Learn the basics of digital privacy, common threats, and how to protect yourself online.",
			topics: ["Digital footprints", "Data collection", "Privacy tools", "Threat modeling"]
		},
		{
			title: "Advanced Security Practices",
			level: "Intermediate",
			duration: "4 hours", 
			modules: 8,
			description: "Deep dive into advanced security techniques and privacy-preserving technologies.",
			topics: ["Cryptography", "Network security", "Operational security", "Anonymous communications"]
		},
		{
			title: "VU Suite Mastery",
			level: "All Levels",
			duration: "3 hours",
			modules: 10,
			description: "Complete guide to using all VU Suite applications for maximum privacy and productivity.",
			topics: ["App setup", "Data migration", "Advanced features", "Integration workflows"]
		}
	];

	const webinars = [
		{
			title: "The Future of Digital Privacy",
			date: "December 15, 2024",
			time: "2:00 PM EST",
			speaker: "Alex Chen, VU Founder",
			description: "Exploring emerging privacy technologies and what the future holds for digital rights."
		},
		{
			title: "Migrating from Big Tech",
			date: "December 22, 2024", 
			time: "3:00 PM EST",
			speaker: "Sarah Rodriguez, CTO",
			description: "Live demonstration of migrating from Google Workspace to VU Suite applications."
		},
		{
			title: "Privacy for Businesses",
			date: "January 5, 2025",
			time: "1:00 PM EST",
			speaker: "Dr. Elena Vasquez, CPO",
			description: "How businesses can implement privacy-first practices and protect customer data."
		}
	];
</script>

<svelte:head>
	<title>Educational Resources - VuAppStore</title>
	<meta name="description" content="Free educational resources about digital privacy and security. Courses, tutorials, guides, and webinars to help you master privacy-first computing." />
</svelte:head>

<div class="container py-16">
	<div class="max-w-6xl mx-auto">
		<!-- Header -->
		<div class="text-center mb-16">
			<div class="inline-flex items-center gap-2 px-4 py-2 bg-success/10 border border-success/30 rounded-full mb-6">
				<BookOpen class="w-4 h-4 text-success" />
				<span class="text-xs font-semibold text-success uppercase tracking-wide">Educational Resources</span>
			</div>
			<h1 class="text-4xl md:text-6xl font-black leading-tight mb-6 text-gradient">
				Learn Privacy<br>& Security
			</h1>
			<p class="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
				Free educational resources to help you understand digital privacy, master security best practices, 
				and get the most out of privacy-first applications.
			</p>
		</div>

		<!-- Resource Categories -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Learning Resources</h2>
			<div class="space-y-12">
				{#each resources as category}
					<div>
						<div class="flex items-center gap-4 mb-6">
							<div class="w-12 h-12 bg-{category.color}/10 rounded-lg flex items-center justify-center">
								<svelte:component this={category.icon} class="w-6 h-6 text-{category.color}" />
							</div>
							<h3 class="text-2xl font-bold">{category.category}</h3>
						</div>
						<div class="grid md:grid-cols-3 gap-6">
							{#each category.items as item}
								<div class="glass-card p-6">
									<div class="flex items-center justify-between mb-3">
										<span class="px-3 py-1 bg-{category.color}/20 text-{category.color} text-xs rounded-full">
											{item.type}
										</span>
										<span class="text-xs text-text-secondary">{item.duration}</span>
									</div>
									<h4 class="text-lg font-bold mb-2">{item.title}</h4>
									<p class="text-text-secondary text-sm mb-4">{item.description}</p>
									<a href={item.link} class="text-{category.color} text-sm font-semibold hover:underline">
										Read More →
									</a>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Online Courses -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-center mb-12">Free Online Courses</h2>
			<div class="grid md:grid-cols-3 gap-6">
				{#each courses as course}
					<div class="glass-card p-6">
						<div class="flex items-center justify-between mb-4">
							<span class="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full">
								{course.level}
							</span>
							<div class="text-right text-xs text-text-secondary">
								<div>{course.duration}</div>
								<div>{course.modules} modules</div>
							</div>
						</div>
						<h3 class="text-xl font-bold mb-3">{course.title}</h3>
						<p class="text-text-secondary text-sm mb-4">{course.description}</p>
						<div class="mb-4">
							<h4 class="font-semibold text-sm mb-2">Topics Covered:</h4>
							<div class="flex flex-wrap gap-2">
								{#each course.topics as topic}
									<span class="px-2 py-1 bg-glass text-xs rounded border border-border">
										{topic}
									</span>
								{/each}
							</div>
						</div>
						<button class="btn btn-primary w-full">
							Start Course
						</button>
					</div>
				{/each}
			</div>
		</div>

		<!-- Upcoming Webinars -->
		<div class="mb-16">
			<h2 class="text-3xl font-bold text-center mb-12">Upcoming Webinars</h2>
			<div class="space-y-6">
				{#each webinars as webinar}
					<div class="glass-card p-8">
						<div class="flex flex-col lg:flex-row lg:items-center justify-between">
							<div class="flex-1">
								<h3 class="text-xl font-bold mb-2">{webinar.title}</h3>
								<p class="text-text-secondary mb-4">{webinar.description}</p>
								<div class="flex items-center gap-4 text-sm text-text-secondary">
									<span>📅 {webinar.date}</span>
									<span>🕐 {webinar.time}</span>
									<span>👤 {webinar.speaker}</span>
								</div>
							</div>
							<div class="mt-4 lg:mt-0">
								<button class="btn btn-primary">
									Register Free
								</button>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Call to Action -->
		<div class="text-center">
			<h2 class="text-3xl font-bold mb-6">Start Learning Today</h2>
			<p class="text-text-secondary mb-8 max-w-2xl mx-auto">
				Take control of your digital privacy with our comprehensive educational resources. 
				From beginner guides to advanced security practices, we have everything you need.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<a href="/resources/privacy-guide" class="btn btn-primary">
					<BookOpen class="w-4 h-4" />
					Start with Privacy Guide
				</a>
				<a href="/apps" class="btn btn-secondary">
					Explore VU Apps
				</a>
				<a href="/support/contact" class="btn btn-secondary">
					Ask Questions
				</a>
			</div>
		</div>
	</div>
</div>
