import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	webServer: {
		command: 'npm run build && npm run preview',
		port: 3700,
		reuseExistingServer: !process.env.CI,
		timeout: 120000
	},
	testDir: 'e2e',
	testMatch: /(.+\.)?(test|spec)\.[jt]s/,
	timeout: 30000,
	retries: process.env.CI ? 2 : 0,
	use: {
		baseURL: 'http://localhost:3700',
		trace: 'on-first-retry',
		screenshot: 'only-on-failure',
		video: 'on-first-retry'
	},
	projects: [
		{
			name: 'chromium',
			use: { browserName: 'chromium' }
		},
		{
			name: 'firefox',
			use: { browserName: 'firefox' }
		},
		{
			name: 'webkit',
			use: { browserName: 'webkit' }
		}
	],
	reporter: [['html', { open: 'never' }], ['list']]
};

export default config;
