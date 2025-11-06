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
	<div class="container-nav">
		<div class="navbar-content flex items-center justify-between py-2 md:py-3 lg:py-4">
			<!-- Logo - Mobile optimized -->
			<a href="/" class="logo flex items-center gap-2 no-underline flex-shrink-0">
				<div class="logo-icon flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-primary rounded-md md:rounded-lg font-bold text-base sm:text-lg md:text-xl text-background flex-shrink-0">
					V
				</div>
				<div class="logo-text text-base sm:text-lg md:text-xl font-bold tracking-tight whitespace-nowrap">VU Store</div>
			</a>

			<!-- Desktop Navigation -->
			<div class="nav-center hidden lg:flex gap-1 bg-glass rounded-lg p-1">
				<a href="/" class="nav-tab" class:active={$page.url.pathname === '/'}>Discover</a>
				<a href="/apps" class="nav-tab" class:active={$page.url.pathname.startsWith('/apps')}>All Apps</a>
				<a href="/pricing" class="nav-tab" class:active={$page.url.pathname === '/pricing'}>Pricing</a>
				<a href="/developers" class="nav-tab" class:active={$page.url.pathname.startsWith('/developers')}>Developers</a>
			</div>

			<!-- Mobile & Desktop Actions -->
			<div class="nav-actions flex items-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
				<!-- Theme Toggle - Always visible but responsive -->
				{#if showThemeToggle}
					<div class="theme-toggle-wrapper flex-shrink-0">
						<ThemeToggle variant="header" showLabel={false} />
					</div>
				{/if}
				
				<!-- Privacy Score - Hidden on mobile and small tablets -->
				<div class="privacy-score hidden xl:flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/30 rounded-lg flex-shrink-0">
					<ShieldCheck class="w-4 h-4 text-success" />
					<span class="text-xs font-semibold text-success">Privacy Score: A+</span>
				</div>
				
				<!-- Search Button - Always visible -->
				<button class="icon-btn flex-shrink-0" aria-label="Search" on:click={openSearch}>
					<Search class="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
				</button>
				
				<!-- Account Button - Always visible -->
				<a href="/account" class="icon-btn flex-shrink-0" aria-label="Account">
					<User class="w-4 h-4 sm:w-4 sm:h-4 md:w-5 md:h-5" />
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
		/* Prevent any overflow */
		max-width: 100vw;
		overflow-x: hidden;
	}

	.navbar.scrolled {
		background: rgba(0, 0, 0, 0.95);
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
	}

	/* Navbar-specific container to prevent stretching */
	.container-nav {
		max-width: 1536px;
		margin: 0 auto;
		padding-left: 1rem;
		padding-right: 1rem;
		width: 100%;
	}

	.navbar-content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		max-width: 100%;
	}

	/* Logo styling - prevent deformation */
	.logo {
		flex-shrink: 0;
		max-width: 50%;
	}

	.logo-icon {
		flex-shrink: 0;
	}

	.logo-text {
		flex-shrink: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-tab {
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--color-text-secondary);
		transition: all 0.2s ease;
		text-decoration: none;
		white-space: nowrap;
	}

	.nav-tab:hover {
		color: var(--color-text-primary);
	}

	.nav-tab.active {
		background: rgba(255, 255, 255, 0.05);
		color: var(--color-text-primary);
	}

	/* Icon button - mobile-first with proper touch targets */
	.icon-btn {
		/* Mobile: smaller visual but 44px touch target */
		width: 32px;
		height: 32px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 0.375rem;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		color: var(--color-text-primary);
		text-decoration: none;
		flex-shrink: 0;
		/* Padding to reach 44px touch target */
		padding: 6px;
	}

	/* Small mobile and up */
	@media (min-width: 375px) {
		.icon-btn {
			width: 36px;
			height: 36px;
			padding: 4px;
		}
	}

	/* Tablet and desktop sizing */
	@media (min-width: 768px) {
		.icon-btn {
			width: 40px;
			height: 40px;
			padding: 0;
		}
		
		.container-nav {
			padding-left: 1.5rem;
			padding-right: 1.5rem;
		}
	}

	@media (min-width: 1024px) {
		.container-nav {
			padding-left: 2rem;
			padding-right: 2rem;
		}
	}

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
	}

	/* Theme toggle responsive adjustments */
	.theme-toggle-wrapper {
		display: flex;
		align-items: center;
		flex-shrink: 0;
	}

	.nav-actions {
		flex-shrink: 0;
		max-width: 50%;
	}

	/* Extra small mobile adjustments - 320px */
	@media (max-width: 374px) {
		.container-nav {
			padding-left: 0.75rem;
			padding-right: 0.75rem;
		}
		
		.logo {
			max-width: 40%;
		}
		
		.logo-text {
			font-size: 0.875rem;
		}
		
		.logo-icon {
			width: 28px;
			height: 28px;
			font-size: 0.875rem;
		}
		
		.icon-btn {
			width: 28px;
			height: 28px;
			padding: 8px;
			border-radius: 0.25rem;
		}
		
		.nav-actions {
			gap: 0.25rem;
			max-width: 55%;
		}
	}

	/* Prevent any element from breaking layout */
	.navbar * {
		box-sizing: border-box;
		flex-shrink: 0;
	}
</style>

