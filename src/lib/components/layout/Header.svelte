<script lang="ts">
	import { page } from '$app/stores';
	import { ShieldCheck, Search, User } from 'lucide-svelte';
	import SearchModal from '$lib/components/search/SearchModal.svelte';

	let isScrolled = false;
	let showSearchModal = false;

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
		<div class="navbar-content flex items-center justify-between py-4">
			<a href="/" class="logo flex items-center gap-3 no-underline">
				<div class="logo-icon flex items-center justify-center w-10 h-10 bg-primary rounded-lg font-bold text-xl text-background">
					V
				</div>
				<div class="logo-text text-xl font-bold tracking-tight">VU Store</div>
			</a>

			<div class="nav-center hidden md:flex gap-1 bg-glass rounded-lg p-1">
				<a href="/" class="nav-tab" class:active={$page.url.pathname === '/'}>Discover</a>
				<a href="/apps" class="nav-tab" class:active={$page.url.pathname.startsWith('/apps')}>All Apps</a>
				<a href="/pricing" class="nav-tab" class:active={$page.url.pathname === '/pricing'}>Pricing</a>
				<a href="/developers" class="nav-tab" class:active={$page.url.pathname.startsWith('/developers')}>Developers</a>
			</div>

			<div class="nav-actions flex items-center gap-4">
				<div class="privacy-score hidden lg:flex items-center gap-2 px-3 py-2 bg-success/10 border border-success/30 rounded-lg">
					<ShieldCheck class="w-4 h-4 text-success" />
					<span class="text-xs font-semibold text-success">Privacy Score: A+</span>
				</div>
				<button class="icon-btn" aria-label="Search" on:click={openSearch}>
					<Search class="w-5 h-5" />
				</button>
				<a href="/account" class="icon-btn" aria-label="Account">
					<User class="w-5 h-5" />
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
		width: 40px;
		height: 40px;
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
	}

	.icon-btn:hover {
		background: rgba(255, 255, 255, 0.08);
		border-color: rgba(255, 255, 255, 0.2);
	}
</style>

