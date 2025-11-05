<script lang="ts">
	import { Calendar, User, ArrowRight } from 'lucide-svelte';

	const blogPosts = [
		{
			id: 'privacy-first-architecture',
			title: 'Building Privacy-First Architecture from the Ground Up',
			excerpt: 'Learn how we designed VuAppStore with zero-knowledge encryption as the foundation, not an afterthought.',
			author: 'Sarah Chen',
			date: 'November 1, 2024',
			category: 'Engineering',
			readTime: '8 min read',
			image: '/api/placeholder/800/400'
		},
		{
			id: 'why-privacy-matters',
			title: 'Why Privacy Matters More Than Ever in 2024',
			excerpt: 'In an age of AI and mass surveillance, protecting personal data is not paranoia—it\'s prudence.',
			author: 'Michael Torres',
			date: 'October 28, 2024',
			category: 'Privacy',
			readTime: '5 min read',
			image: '/api/placeholder/800/400'
		},
		{
			id: 'vu-suite-launch',
			title: 'Introducing the VU Suite: 30 Apps, Zero Tracking',
			excerpt: 'Today we\'re excited to announce the complete VU Suite—30 privacy-focused applications that prove you don\'t need surveillance to build great software.',
			author: 'Alex Kumar',
			date: 'October 20, 2024',
			category: 'Product',
			readTime: '6 min read',
			image: '/api/placeholder/800/400'
		},
		{
			id: 'gdpr-ccpa-compliance',
			title: 'Beyond Compliance: How We Exceed GDPR and CCPA Requirements',
			excerpt: 'Compliance is just the beginning. Learn how VuAppStore goes above and beyond privacy regulations.',
			author: 'Emma Wilson',
			date: 'October 15, 2024',
			category: 'Legal',
			readTime: '7 min read',
			image: '/api/placeholder/800/400'
		},
		{
			id: 'encryption-explained',
			title: 'End-to-End Encryption Explained: How VU Apps Protect Your Data',
			excerpt: 'A deep dive into the encryption technologies that keep your data safe in every VU application.',
			author: 'David Park',
			date: 'October 10, 2024',
			category: 'Security',
			readTime: '10 min read',
			image: '/api/placeholder/800/400'
		},
		{
			id: 'privacy-vs-convenience',
			title: 'The False Choice Between Privacy and Convenience',
			excerpt: 'Why you shouldn\'t have to choose between powerful features and protecting your privacy.',
			author: 'Rachel Green',
			date: 'October 5, 2024',
			category: 'Opinion',
			readTime: '4 min read',
			image: '/api/placeholder/800/400'
		}
	];

	const categories = ['All', 'Engineering', 'Privacy', 'Product', 'Security', 'Legal', 'Opinion'];
	let selectedCategory = 'All';

	$: filteredPosts = selectedCategory === 'All' 
		? blogPosts 
		: blogPosts.filter(post => post.category === selectedCategory);
</script>

<svelte:head>
	<title>Blog - VuAppStore</title>
	<meta name="description" content="Insights on privacy, security, and building a surveillance-free digital future." />
</svelte:head>

<div class="blog-page container py-16 max-w-6xl relative z-10">
	<!-- Hero Section -->
	<section class="hero mb-12 text-center">
		<h1 class="text-4xl md:text-5xl font-black mb-4 text-gradient">
			VuAppStore Blog
		</h1>
		<p class="text-lg text-text-secondary max-w-2xl mx-auto">
			Insights on privacy, security, and building a surveillance-free digital future.
		</p>
	</section>

	<!-- Category Filter -->
	<section class="category-filter mb-8">
		<div class="flex flex-wrap gap-3 justify-center">
			{#each categories as category}
				<button 
					class="category-btn px-4 py-2 rounded-lg text-sm font-medium transition-all"
					class:active={selectedCategory === category}
					on:click={() => selectedCategory = category}
				>
					{category}
				</button>
			{/each}
		</div>
	</section>

	<!-- Featured Post -->
	{#if filteredPosts.length > 0}
		<section class="featured-post mb-12">
			<article class="glass-card overflow-hidden">
				<div class="grid grid-cols-1 lg:grid-cols-2">
					<div class="aspect-video bg-gradient-to-br from-primary/20 to-primary/5"></div>
					<div class="p-8">
						<span class="category-badge inline-block px-3 py-1 bg-primary/20 text-primary text-xs font-bold rounded-full mb-4">
							{filteredPosts[0].category}
						</span>
						<h2 class="text-3xl font-bold mb-4">
							<a href="/blog/{filteredPosts[0].id}" class="hover:text-primary transition-colors">
								{filteredPosts[0].title}
							</a>
						</h2>
						<p class="text-text-secondary mb-6">
							{filteredPosts[0].excerpt}
						</p>
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-4 text-sm text-text-tertiary">
								<span class="flex items-center gap-1">
									<User class="w-4 h-4" />
									{filteredPosts[0].author}
								</span>
								<span class="flex items-center gap-1">
									<Calendar class="w-4 h-4" />
									{filteredPosts[0].date}
								</span>
							</div>
							<a href="/blog/{filteredPosts[0].id}" class="text-primary font-medium flex items-center gap-2 hover:gap-3 transition-all">
								Read More
								<ArrowRight class="w-4 h-4" />
							</a>
						</div>
					</div>
				</div>
			</article>
		</section>
	{/if}

	<!-- Blog Posts Grid -->
	<section class="blog-posts">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each filteredPosts.slice(1) as post}
				<article class="blog-card glass-card overflow-hidden hover:-translate-y-1 transition-all">
					<div class="aspect-video bg-gradient-to-br from-primary/10 to-transparent"></div>
					<div class="p-6">
						<span class="category-badge inline-block px-2 py-1 bg-glass text-primary text-xs font-semibold rounded mb-3">
							{post.category}
						</span>
						<h3 class="text-lg font-bold mb-2">
							<a href="/blog/{post.id}" class="hover:text-primary transition-colors">
								{post.title}
							</a>
						</h3>
						<p class="text-sm text-text-secondary mb-4 line-clamp-2">
							{post.excerpt}
						</p>
						<div class="flex items-center justify-between text-xs text-text-tertiary">
							<span>{post.author}</span>
							<span>{post.readTime}</span>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<!-- Newsletter CTA -->
	<section class="newsletter-cta mt-16">
		<div class="glass-card p-8 text-center">
			<h2 class="text-2xl font-bold mb-4">Stay Updated</h2>
			<p class="text-text-secondary mb-6">
				Get the latest privacy news and product updates. No spam, ever.
			</p>
			<form class="max-w-md mx-auto flex gap-4">
				<input
					type="email"
					placeholder="your@email.com"
					class="flex-1 px-4 py-3 bg-glass border border-border rounded-lg focus:border-primary focus:outline-none transition-colors"
					required
				/>
				<button type="submit" class="btn btn-primary">
					Subscribe
				</button>
			</form>
			<p class="text-xs text-text-tertiary mt-4">
				We respect your privacy. Unsubscribe anytime.
			</p>
		</div>
	</section>
</div>

<style>
	.category-btn {
		@apply bg-glass border border-border text-text-secondary;
	}

	.category-btn:hover {
		@apply bg-glass-heavy text-text-primary;
	}

	.category-btn.active {
		@apply bg-primary/20 border-primary/50 text-primary;
	}

	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
