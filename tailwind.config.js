/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			xs: '320px', // Extra small phones
			sm: '375px', // Small phones (iPhone SE)
			md: '768px', // Tablets
			lg: '1024px', // Small laptops
			xl: '1280px', // Laptops
			'2xl': '1536px', // Large screens
			'3xl': '1920px' // Ultra-wide
		},
		extend: {
			colors: {
				primary: '#00d4ff',
				'primary-dark': '#0099cc',
				background: '#000000',
				surface: 'rgba(0, 0, 0, 0.6)',
				glass: 'rgba(255, 255, 255, 0.05)',
				'glass-heavy': 'rgba(255, 255, 255, 0.08)',
				'text-primary': '#ffffff',
				'text-secondary': '#888888',
				'text-tertiary': '#666666',
				border: 'rgba(255, 255, 255, 0.1)',
				'border-hover': 'rgba(255, 255, 255, 0.2)',
				'accent-border': 'rgba(0, 212, 255, 0.1)',
				success: '#22c55e',
				warning: '#ffa500',
				error: '#ef4444',

				// Stripe-friendly professional colors
				'stripe-blue': '#635BFF',
				'trust-green': '#00D924',
				'secure-gold': '#FFB800'
			},
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				mono: ['IBM Plex Mono', 'Monaco', 'monospace']
			},
			animation: {
				'grid-move': 'gridMove 60s linear infinite',
				spotlight: 'spotlight 25s ease-in-out infinite',
				float: 'float 3s ease-in-out infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite'
			},
			keyframes: {
				gridMove: {
					'0%': { transform: 'translate(0, 0)' },
					'100%': { transform: 'translate(40px, 40px)' }
				},
				spotlight: {
					'0%, 100%': { transform: 'translate(0, 0) scale(1)', opacity: '1' },
					'33%': { transform: 'translate(100px, 50px) scale(1.1)', opacity: '0.8' },
					'66%': { transform: 'translate(-50px, 100px) scale(0.9)', opacity: '0.9' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			}
		}
	},
	plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')]
};
