<script lang="ts">
	import { page } from '$app/stores';
	import { ShieldCheck, Search, User } from 'lucide-svelte';
	import SearchModal from '$lib/components/search/SearchModal.svelte';
	import ThemeToggle from '$lib/components/theme/ThemeToggle.svelte';

	let isScrolled = false;
	let showSearchModal = false;
	
	// Show theme toggle on all pages
	$: showThemeToggle = true;

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', () => {
			isScrolled = window.scrollY > 20;
		});

		// Keyboard shortcut: Cmd+K or Ctrl+K to open search
		window.addEventListener('keydown', (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
				e.preventDefault();
				showSearchModal = true;
			}
		});
	}

	function openSearch() {
		showSearchModal = true;
	}

	function closeSearch() {
		showSearchModal = false;
	}
</script>

<nav class="navbar sticky top-0 z-50 transition-all duration-200" class:scrolled={isScrolled}>
	<div class="container">
		<div class="navbar-content flex items-center justify-between py-3 md:py-4">
			<!-- Logo - Responsive sizing -->
			<a href="/" class="logo flex items-center gap-2 md:gap-3 no-underline">
				<div class="logo-icon flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-primary rounded-lg font-bold text-lg md:text-xl text-background">
					V
				</div>
				<div class="logo-text text-lg md:text-xl font-bold tracking-tight">VU Store</div>
			</a>

			<!-- Desktop Navigation -->
			<div class="nav-center hidden lg:flex gap-1 bg-glass rounded-lg p-1">
				<a href="/" class="nav-tab" class:active={$page.url.pathname === '/'}>Discover</a>
				<a href="/apps" class="nav-tab" class:active={$page.url.pathname.startsWith('/apps')}>All Apps</a>
				<a href="/pricing" class="nav-tab" class:active={$page.url.pathname === '/pricing'}>Pricing</a>
				<a href="/developers" class="nav-tab" class:active={$page.url.pathname.startsWith('/developers')}>Developers</a>
			</div>

			<!-- Mobile & Desktop Actions -->
			<div class="nav-actions flex items-center gap-2 md:gap-3 lg:gap-4">
				<!-- Theme Toggle - Always visible but responsive -->
				{#if showThemeToggle}
					<div class="theme-toggle-wrapper">
						<ThemeToggle variant="header" showLabel={false} />
					</div>
				{/if}
				
				<!-- Privacy Score - Hidden on mobile and small tablets -->
				<div class="privacy-score hidden xl:flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/30 rounded-lg">
					<ShieldCheck class="w-4 h-4 text-success" />
					<span class="text-xs font-semibold text-success">Privacy Score: A+</span>
				</div>
				
				<!-- Search Button - Always visible -->
				<button class="icon-btn" aria-label="Search" on:click={openSearch}>
					<Search class="w-4 h-4 md:w-5 md:h-5" />
				</button>
				
				<!-- Account Button - Always visible -->
				<a href="/account" class="icon-btn" aria-label="Account">
					<User class="w-4 h-4 md:w-5 md:h-5" />
				</a>
			</div>
		</div>
	</div>
</nav>

<!-- Search Modal -->
<SearchModal isOpen={showSearchModal} onClose={closeSearch} />

<style>
	.navbar {
		background: rgba(0, 0, 0, 0.8);
		backdrop-filter: blur(20px);
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
	}

	.navbar.scrolled {
		background: rgba(0, 0, 0, 0.95);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	.nav-tab {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: all 0.2s ease;
		text-decoration: none;
	}

	.nav-tab:hover {
		color: var(--color-text-primary);
	}

	.nav-tab.active {
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-text-primary);
	}

	.icon-btn {
		/* Mobile-first responsive sizing */
		width: 36px;
		height: 36px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--color-text-primary);
		text-decoration: none;
		/* Ensure minimum touch target on mobile */
		min-width: 44px;
		min-height: 44px;
	}

	/* Tablet and desktop sizing */
	@media (min-width: 768px) {
		.icon-btn {
			width: 40px;
			height: 40px;
			min-width: 40px;
			min-height: 40px;
		}
	}

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* Theme toggle responsive adjustments */
	.theme-toggle-wrapper {
		/* Ensure proper spacing on mobile */
		display: flex;
		align-items: center;
	}

	/* Mobile navigation adjustments */
	@media (max-width: 1023px) {
		.navbar-content {
			/* Reduce padding on smaller screens */
			padding-left: 0;
			padding-right: 0;
		}
		
		.nav-actions {
			/* Tighter spacing on mobile */
			gap: 0.5rem;
		}
	}

	/* Extra small mobile adjustments */
	@media (max-width: 374px) {
		.logo-text {
			/* Hide "Store" text on very small screens */
			display: none;
		}
		
		.icon-btn {
			width: 32px;
			height: 32px;
		}
	}
</style>

