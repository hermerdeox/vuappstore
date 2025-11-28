export interface VuApp {
	id: string;
	name: string;
	icon: string;
	ledger: string;
	color: string;
	colorRgb: string;
	tagline: string;
	category: 'Productivity' | 'Communication' | 'Finance' | 'Health' | 'Creative' | 'Learning' | 'Utilities' | 'Security';
	description: string;
	longDescription: string;
	privacyLevel: number;
	privacyName: string;
	privacyDesc: string;
	techStack: string[];
	features: Array<{
		icon: string;
		title: string;
		desc: string;
	}>;
	pricing: {
		monthly: number;
		yearly: number;
		lifetime: number;
	};
	status: 'available' | 'coming_soon' | 'beta';
	downloads: number;
	rating: number;
	reviews: number;
	certified?: boolean; // VuLabs Certified badge (official VU Suite apps)
	developer?: string; // Developer @username
}

export const vuApps: Record<string, VuApp> = {
	vunotes: {
		id: 'vunotes',
		name: 'VuNotes',
		icon: 'V',
		ledger: 'VN',
		color: '#00d4ff',
		colorRgb: '0, 212, 255',
		tagline: 'Your thoughts, encrypted',
		category: 'Productivity',
		description: 'Zero-knowledge note-taking with end-to-end encryption. Your notes never leave your device unencrypted.',
		longDescription: 'VuNotes is a privacy-first note-taking application that uses zero-knowledge encryption. All your notes are encrypted on your device before syncing, ensuring that not even we can read them. Features include markdown support, offline-first architecture, and cross-device sync.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'All data encrypted locally, zero server-side access',
		techStack: ['Svelte', 'TypeScript', 'IndexedDB', 'AES-256'],
		features: [
			{ icon: 'Lock', title: 'E2E Encryption', desc: 'Military-grade encryption for all notes' },
			{ icon: 'FileText', title: 'Markdown Support', desc: 'Rich text editing with markdown' },
			{ icon: 'Smartphone', title: 'Cross-Device Sync', desc: 'Seamless sync across all devices' },
			{ icon: 'Search', title: 'Full-Text Search', desc: 'Lightning-fast encrypted search' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 125430,
		rating: 4.8,
		reviews: 2341,
		certified: true,
		developer: '@vuapps'
	},
	vuwallet: {
		id: 'vuwallet',
		name: 'VuWallet',
		icon: 'V',
		ledger: 'VW',
		color: '#9333ea',
		colorRgb: '147, 51, 234',
		tagline: 'Your money, your control',
		category: 'Finance',
		description: 'Privacy-focused cryptocurrency wallet with zero-knowledge transactions and built-in security.',
		longDescription: 'VuWallet is a non-custodial cryptocurrency wallet that puts you in complete control. With built-in privacy features, hardware wallet support, and zero-knowledge architecture, your financial data stays yours.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Non-custodial, keys never leave your device',
		techStack: ['Go', 'WebAssembly', 'React', 'Blockchain'],
		features: [
			{ icon: 'Key', title: 'Hardware Wallet Support', desc: 'Connect Ledger, Trezor, and more' },
			{ icon: 'DollarSign', title: 'Multi-Currency', desc: 'Support for 100+ cryptocurrencies' },
			{ icon: 'Shield', title: 'Privacy Transactions', desc: 'Built-in privacy protocols' },
			{ icon: 'BarChart2', title: 'Portfolio Tracking', desc: 'Real-time market data' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 89234,
		rating: 4.9,
		reviews: 1876
	},
	vucalendar: {
		id: 'vucalendar',
		name: 'VuCalendar',
		icon: 'V',
		ledger: 'VC',
		color: '#ef4444',
		colorRgb: '239, 68, 68',
		tagline: 'Schedule with privacy',
		category: 'Productivity',
		description: 'Privacy-first calendar and scheduling app with encrypted events and zero tracking.',
		longDescription: 'VuCalendar keeps your schedule private with end-to-end encryption. Share your availability without sharing your data. Perfect for professionals who value privacy.',
		privacyLevel: 5,
		privacyName: 'End-to-End Encrypted',
		privacyDesc: 'Events encrypted on device, private scheduling links',
		techStack: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'WebRTC'],
		features: [
			{ icon: 'Calendar', title: 'Smart Scheduling', desc: 'AI-powered scheduling without tracking' },
			{ icon: 'Link', title: 'Private Links', desc: 'Share availability securely' },
			{ icon: 'Clock', title: 'Smart Reminders', desc: 'Local notifications, no cloud' },
			{ icon: 'Globe', title: 'CalDAV Sync', desc: 'Standard calendar protocol support' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 76543,
		rating: 4.7,
		reviews: 1542
	},
	vufit: {
		id: 'vufit',
		name: 'VuFit',
		icon: 'V',
		ledger: 'VF',
		color: '#22c55e',
		colorRgb: '34, 197, 94',
		tagline: 'Fitness without surveillance',
		category: 'Health',
		description: 'Privacy-focused fitness and health tracking. Your health data stays on your device, always.',
		longDescription: 'VuFit tracks your fitness goals without sharing your health data. All processing happens locally on your device. Connect wearables, track workouts, and achieve your goals privately.',
		privacyLevel: 5,
		privacyName: 'Offline-First',
		privacyDesc: 'All health data stored locally, no cloud sync',
		techStack: ['Swift', 'HealthKit', 'CoreML', 'SQLite'],
		features: [
			{ icon: 'Dumbbell', title: 'Workout Tracking', desc: 'Track runs, cycles, and workouts' },
			{ icon: 'Watch', title: 'Wearable Integration', desc: 'Connect Apple Watch, Garmin, Fitbit' },
			{ icon: 'TrendingUp', title: 'Progress Analytics', desc: 'Local AI-powered insights' },
			{ icon: 'Target', title: 'Goal Setting', desc: 'Personalized fitness goals' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 65432,
		rating: 4.6,
		reviews: 1234
	},
	vutext: {
		id: 'vutext',
		name: 'VuText',
		icon: 'V',
		ledger: 'VT',
		color: '#f97316',
		colorRgb: '249, 115, 22',
		tagline: 'Write privately',
		category: 'Creative',
		description: 'Distraction-free writing app with end-to-end encryption. For writers who value privacy.',
		longDescription: 'VuText is a minimalist writing environment designed for privacy. Write novels, articles, or journals without worrying about data collection. Features version control, markdown, and beautiful themes.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Documents encrypted locally, zero server access',
		techStack: ['Electron', 'Vue', 'Monaco Editor', 'CRDTs'],
		features: [
			{ icon: 'PenLine', title: 'Distraction-Free', desc: 'Minimalist writing interface' },
			{ icon: 'Book', title: 'Version Control', desc: 'Git-like versioning for documents' },
			{ icon: 'Palette', title: 'Beautiful Themes', desc: '20+ editor themes included' },
			{ icon: 'Upload', title: 'Export Anywhere', desc: 'PDF, DOCX, Markdown, HTML' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 54321,
		rating: 4.8,
		reviews: 987
	},
	vuphoto: {
		id: 'vuphoto',
		name: 'VuPhoto',
		icon: 'V',
		ledger: 'VP',
		color: '#eab308',
		colorRgb: '234, 179, 8',
		tagline: 'Photos, encrypted',
		category: 'Creative',
		description: 'Private photo library with AI-powered organization that runs entirely on your device.',
		longDescription: 'VuPhoto uses on-device machine learning to organize your photos without uploading them to the cloud. Facial recognition, object detection, and smart albums, all private.',
		privacyLevel: 5,
		privacyName: 'On-Device AI',
		privacyDesc: 'All ML processing happens locally, no cloud uploads',
		techStack: ['React Native', 'TensorFlow Lite', 'SQLite', 'C++'],
		features: [
			{ icon: 'Bot', title: 'Smart Albums', desc: 'AI organization without cloud' },
			{ icon: 'User', title: 'Face Recognition', desc: 'On-device facial detection' },
			{ icon: 'Search', title: 'Object Search', desc: 'Find photos by content locally' },
			{ icon: 'MapPin', title: 'Location Tags', desc: 'GPS tagging without sharing' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 87654,
		rating: 4.9,
		reviews: 2103
	},
	vucall: {
		id: 'vucall',
		name: 'VuCall',
		icon: 'V',
		ledger: 'VCL',
		color: '#3b82f6',
		colorRgb: '59, 130, 246',
		tagline: 'Calls without tracking',
		category: 'Communication',
		description: 'End-to-end encrypted voice and video calls. No servers, no logs, no surveillance.',
		longDescription: 'VuCall provides crystal-clear voice and video communication with end-to-end encryption. Uses peer-to-peer connections whenever possible, with no call records or metadata collection.',
		privacyLevel: 5,
		privacyName: 'E2E Encrypted',
		privacyDesc: 'Peer-to-peer calls, no server-side logs',
		techStack: ['WebRTC', 'Go', 'STUN/TURN', 'Opus Codec'],
		features: [
			{ icon: 'Phone', title: 'HD Voice', desc: 'Crystal-clear audio quality' },
			{ icon: 'Video', title: 'Video Calls', desc: '4K video support' },
			{ icon: 'Users', title: 'Group Calls', desc: 'Up to 50 participants' },
			{ icon: 'MessageSquare', title: 'Screen Sharing', desc: 'Share screen securely' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 134567,
		rating: 4.7,
		reviews: 3421
	},
	vuscan: {
		id: 'vuscan',
		name: 'VuScan',
		icon: 'V',
		ledger: 'VS',
		color: '#10b981',
		colorRgb: '16, 185, 129',
		tagline: 'Scan without sharing',
		category: 'Utilities',
		description: 'Privacy-focused document scanner with on-device OCR and encryption.',
		longDescription: 'VuScan turns your device into a powerful scanner with optical character recognition that happens entirely on your device. Scan documents, receipts, and business cards privately.',
		privacyLevel: 5,
		privacyName: 'On-Device OCR',
		privacyDesc: 'All text recognition happens locally',
		techStack: ['Swift', 'Vision Framework', 'CoreML', 'PDFKit'],
		features: [
			{ icon: 'FileText', title: 'Smart Scanning', desc: 'Auto-crop and enhance' },
			{ icon: 'Type', title: 'OCR', desc: 'Extract text from images' },
			{ icon: 'Clipboard', title: 'Multi-Page', desc: 'Scan multi-page documents' },
			{ icon: 'BarChart2', title: 'Export', desc: 'PDF, JPEG, or searchable PDF' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 45678,
		rating: 4.6,
		reviews: 876
	},
	vuvault: {
		id: 'vuvault',
		name: 'VuVault',
		icon: 'V',
		ledger: 'VV',
		color: '#f5f5f0',
		colorRgb: '245, 245, 240',
		tagline: 'Your digital fortress',
		category: 'Security',
		description: 'Military-grade encrypted file storage. Zero-knowledge architecture ensures maximum privacy.',
		longDescription: 'VuVault is your personal encrypted cloud storage with zero-knowledge architecture. We can\'t access your files even if we wanted to. Features automatic backup, file versioning, and secure sharing.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Client-side encryption, we can\'t access your files',
		techStack: ['Go', 'WebAssembly', 'AES-256-GCM', 'IPFS'],
		features: [
			{ icon: 'Key', title: 'Zero-Knowledge', desc: 'We can\'t access your files' },
			{ icon: 'Package', title: 'File Versioning', desc: 'Keep history of changes' },
			{ icon: 'Link', title: 'Secure Sharing', desc: 'Share with encrypted links' },
			{ icon: 'Cloud', title: 'Auto Backup', desc: 'Automatic encrypted backups' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 234567,
		rating: 4.9,
		reviews: 5432
	},
	vuchat: {
		id: 'vuchat',
		name: 'VuChat',
		icon: 'V',
		ledger: 'VCH',
		color: '#8b5cf6',
		colorRgb: '139, 92, 246',
		tagline: 'Chat with confidence',
		category: 'Communication',
		description: 'Quantum-resistant messaging with perfect forward secrecy and no metadata collection.',
		longDescription: 'VuChat provides military-grade encrypted messaging with advanced privacy features. Self-destructing messages, screenshot detection, and anonymous accounts ensure your conversations stay private.',
		privacyLevel: 5,
		privacyName: 'Quantum-Resistant',
		privacyDesc: 'Future-proof encryption, no metadata',
		techStack: ['Rust', 'Signal Protocol', 'KYBER', 'Tokio'],
		features: [
			{ icon: 'Lock', title: 'Quantum-Resistant', desc: 'Future-proof encryption' },
			{ icon: 'Clock', title: 'Self-Destruct', desc: 'Messages disappear automatically' },
			{ icon: 'UserX', title: 'Anonymous', desc: 'No phone number required' },
			{ icon: 'Eye', title: 'Screenshot Alert', desc: 'Know when screenshots are taken' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 198765,
		rating: 4.8,
		reviews: 4321
	},

	// Add 20 more apps to reach 30 total
	vumail: {
		id: 'vumail',
		name: 'VuMail',
		icon: 'V',
		ledger: 'VM',
		color: '#06b6d4',
		colorRgb: '6, 182, 212',
		tagline: 'Email, encrypted',
		category: 'Communication',
		description: 'Privacy-focused email with built-in PGP encryption and anonymous aliases.',
		longDescription: 'VuMail provides a secure email experience with automatic PGP encryption, disposable aliases, and zero tracking. Take back control of your inbox.',
		privacyLevel: 5,
		privacyName: 'PGP Encrypted',
		privacyDesc: 'End-to-end email encryption, no tracking',
		techStack: ['Go', 'OpenPGP', 'React', 'PostgreSQL'],
		features: [
			{ icon: 'Mail', title: 'PGP Built-in', desc: 'Automatic encryption' },
			{ icon: 'Mask', title: 'Email Aliases', desc: 'Unlimited disposable addresses' },
			{ icon: 'Ban', title: 'Spam Filter', desc: 'AI-powered local filtering' },
			{ icon: 'Inbox', title: 'Custom Domain', desc: 'Use your own domain' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 156789,
		rating: 4.7,
		reviews: 3210
	},

	vutask: {
		id: 'vutask',
		name: 'VuTask',
		icon: 'V',
		ledger: 'VTS',
		color: '#ec4899',
		colorRgb: '236, 72, 153',
		tagline: 'Tasks, organized privately',
		category: 'Productivity',
		description: 'Privacy-first task management with offline-first architecture and zero tracking.',
		longDescription: 'VuTask helps you stay organized without compromising privacy. Features include smart lists, recurring tasks, and cross-device sync with end-to-end encryption.',
		privacyLevel: 5,
		privacyName: 'Offline-First',
		privacyDesc: 'Local storage, encrypted sync',
		techStack: ['Svelte', 'IndexedDB', 'CRDTs', 'WebSocket'],
		features: [
			{ icon: 'CheckCircle', title: 'Smart Lists', desc: 'Auto-organize tasks' },
			{ icon: 'RefreshCw', title: 'Recurring Tasks', desc: 'Set it and forget it' },
			{ icon: 'Tag', title: 'Tags & Filters', desc: 'Powerful organization' },
			{ icon: 'BarChart2', title: 'Analytics', desc: 'Track productivity locally' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 98765,
		rating: 4.6,
		reviews: 1987
	},

	vubrowser: {
		id: 'vubrowser',
		name: 'VuBrowser',
		icon: 'V',
		ledger: 'VB',
		color: '#f59e0b',
		colorRgb: '245, 158, 11',
		tagline: 'Browse without footprints',
		category: 'Security',
		description: 'Privacy-focused browser with built-in ad blocking, tracker blocking, and VPN.',
		longDescription: 'VuBrowser is built from the ground up for privacy. Features include advanced fingerprint protection, automatic HTTPS, and built-in VPN.',
		privacyLevel: 5,
		privacyName: 'Zero-Tracking',
		privacyDesc: 'No telemetry, advanced fingerprint protection',
		techStack: ['Chromium', 'C++', 'Rust', 'V8'],
		features: [
			{ icon: 'Shield', title: 'Ad Blocker', desc: 'Block ads and trackers' },
			{ icon: 'Lock', title: 'Built-in VPN', desc: 'Browse anonymously' },
			{ icon: 'Globe', title: 'HTTPS Everywhere', desc: 'Always secure' },
			{ icon: 'Ghost', title: 'Anti-Fingerprint', desc: 'Advanced protection' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 345678,
		rating: 4.9,
		reviews: 7654
	},

	vupass: {
		id: 'vupass',
		name: 'VuPass',
		icon: 'V',
		ledger: 'VPS',
		color: '#84cc16',
		colorRgb: '132, 204, 22',
		tagline: 'Passwords, secured',
		category: 'Security',
		description: 'Zero-knowledge password manager with biometric unlock and secure sharing.',
		longDescription: 'VuPass securely stores all your passwords with zero-knowledge encryption. Features include password generator, breach monitoring, and secure family sharing.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Master password never leaves your device',
		techStack: ['Rust', 'Tauri', 'AES-256', 'Argon2'],
		features: [
			{ icon: 'Key', title: 'Password Generator', desc: 'Strong random passwords' },
			{ icon: 'Fingerprint', title: 'Biometric Unlock', desc: 'Face ID, Touch ID support' },
			{ icon: 'AlertTriangle', title: 'Breach Monitor', desc: 'Check for compromised passwords' },
			{ icon: 'Users', title: 'Family Sharing', desc: 'Share securely with family' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 234561,
		rating: 4.9,
		reviews: 5678
	},

	vudrive: {
		id: 'vudrive',
		name: 'VuDrive',
		icon: 'V',
		ledger: 'VD',
		color: '#7c3aed',
		colorRgb: '124, 58, 237',
		tagline: 'Cloud storage, zero knowledge',
		category: 'Utilities',
		description: 'Encrypted cloud storage with automatic backup and file versioning.',
		longDescription: 'VuDrive provides secure cloud storage with zero-knowledge encryption. Your files are encrypted before leaving your device, ensuring complete privacy.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Files encrypted before upload',
		techStack: ['Go', 'IPFS', 'WebAssembly', 'AES-256-GCM'],
		features: [
			{ icon: 'Cloud', title: 'Auto Sync', desc: 'Automatic backup' },
			{ icon: 'Folder', title: 'File Versioning', desc: 'Access previous versions' },
			{ icon: 'Link', title: 'Secure Sharing', desc: 'Share with expiring links' },
			{ icon: 'Smartphone', title: 'Cross-Platform', desc: 'All devices supported' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 187654,
		rating: 4.8,
		reviews: 4321
	},

	vucode: {
		id: 'vucode',
		name: 'VuCode',
		icon: 'V',
		ledger: 'VCD',
		color: '#0891b2',
		colorRgb: '8, 145, 178',
		tagline: 'Code privately',
		category: 'Productivity',
		description: 'Privacy-focused code editor with encrypted Git integration and collaboration.',
		longDescription: 'VuCode is a powerful code editor built for privacy. Features include AI-powered suggestions that run locally, encrypted Git, and private collaboration.',
		privacyLevel: 4,
		privacyName: 'Local Processing',
		privacyDesc: 'AI runs on device, encrypted Git',
		techStack: ['Electron', 'Monaco', 'LSP', 'Git'],
		features: [
			{ icon: 'Bot', title: 'Local AI', desc: 'Code suggestions without cloud' },
			{ icon: 'Key', title: 'Encrypted Git', desc: 'Private repositories' },
			{ icon: 'Users', title: 'Live Collab', desc: 'Real-time pair programming' },
			{ icon: 'Palette', title: 'Themes', desc: '100+ beautiful themes' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'beta',
		downloads: 67890,
		rating: 4.7,
		reviews: 1234
	},

	vumusic: {
		id: 'vumusic',
		name: 'VuMusic',
		icon: 'V',
		ledger: 'VMU',
		color: '#dc2626',
		colorRgb: '220, 38, 38',
		tagline: 'Music without tracking',
		category: 'Creative',
		description: 'Privacy-focused music player with local library management and no tracking.',
		longDescription: 'VuMusic is a beautiful music player that respects your privacy. Features include smart playlists, lyrics, and equalizer, all without data collection.',
		privacyLevel: 5,
		privacyName: 'Offline-First',
		privacyDesc: 'No streaming analytics, no tracking',
		techStack: ['Swift', 'CoreAudio', 'MusicKit', 'SQLite'],
		features: [
			{ icon: 'Music', title: 'Smart Playlists', desc: 'Auto-generated playlists' },
			{ icon: 'Mic', title: 'Lyrics', desc: 'Synced lyrics support' },
			{ icon: 'Sliders', title: 'Equalizer', desc: '10-band equalizer' },
			{ icon: 'Cloud', title: 'Self-Host', desc: 'Host your own music server' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 123456,
		rating: 4.6,
		reviews: 2345
	},

	vupodcast: {
		id: 'vupodcast',
		name: 'VuPodcast',
		icon: 'V',
		ledger: 'VPC',
		color: '#65a30d',
		colorRgb: '101, 163, 13',
		tagline: 'Podcasts, privately',
		category: 'Learning',
		description: 'Privacy-first podcast player with offline downloads and no tracking.',
		longDescription: 'VuPodcast lets you listen to your favorite podcasts without being tracked. Features include variable speed, sleep timer, and chapter support.',
		privacyLevel: 5,
		privacyName: 'No Analytics',
		privacyDesc: 'No listening data collected',
		techStack: ['React Native', 'SQLite', 'RSS', 'AudioWorklet'],
		features: [
			{ icon: 'Radio', title: 'Subscribe', desc: 'Follow unlimited podcasts' },
			{ icon: 'Download', title: 'Offline', desc: 'Download episodes' },
			{ icon: 'FastForward', title: 'Variable Speed', desc: '0.5x to 3x playback' },
			{ icon: 'Moon', title: 'Sleep Timer', desc: 'Auto-stop playback' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 89012,
		rating: 4.5,
		reviews: 1567
	},

	vulearn: {
		id: 'vulearn',
		name: 'VuLearn',
		icon: 'V',
		ledger: 'VL',
		color: '#a855f7',
		colorRgb: '168, 85, 247',
		tagline: 'Learn without surveillance',
		category: 'Learning',
		description: 'Privacy-focused flashcard and spaced repetition learning app.',
		longDescription: 'VuLearn uses science-backed spaced repetition to help you learn anything. All your study data stays private on your device.',
		privacyLevel: 5,
		privacyName: 'Local-Only',
		privacyDesc: 'All learning data stored locally',
		techStack: ['Svelte', 'IndexedDB', 'Web Workers', 'Canvas'],
		features: [
			{ icon: 'Brain', title: 'Spaced Repetition', desc: 'Science-backed learning' },
			{ icon: 'Layers', title: 'Custom Cards', desc: 'Create any flashcard' },
			{ icon: 'BarChart2', title: 'Progress Tracking', desc: 'Local analytics' },
			{ icon: 'Target', title: 'Study Goals', desc: 'Set daily targets' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 56789,
		rating: 4.7,
		reviews: 987
	},

	vudocs: {
		id: 'vudocs',
		name: 'VuDocs',
		icon: 'V',
		ledger: 'VDC',
		color: '#0ea5e9',
		colorRgb: '14, 165, 233',
		tagline: 'Documents, encrypted',
		category: 'Productivity',
		description: 'Privacy-first document editor compatible with Microsoft Office files.',
		longDescription: 'VuDocs is a powerful document editor that works with Word, Excel, and PowerPoint files, all while keeping your documents private with local processing.',
		privacyLevel: 4,
		privacyName: 'Local Processing',
		privacyDesc: 'All editing happens on device',
		techStack: ['WebAssembly', 'LibreOffice Core', 'React', 'IndexedDB'],
		features: [
			{ icon: 'FileText', title: 'Word Compatible', desc: 'Edit .docx files' },
			{ icon: 'Table2', title: 'Spreadsheets', desc: 'Excel compatibility' },
			{ icon: 'Presentation', title: 'Presentations', desc: 'PowerPoint support' },
			{ icon: 'Cloud', title: 'Auto-Save', desc: 'Never lose work' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 145678,
		rating: 4.6,
		reviews: 2876
	},

	vumap: {
		id: 'vumap',
		name: 'VuMap',
		icon: 'V',
		ledger: 'VMP',
		color: '#14b8a6',
		colorRgb: '20, 184, 166',
		tagline: 'Navigate privately',
		category: 'Utilities',
		description: 'Privacy-focused maps and navigation with offline support and no tracking.',
		longDescription: 'VuMap provides turn-by-turn navigation without tracking your location. Download maps for offline use and navigate without being surveilled.',
		privacyLevel: 5,
		privacyName: 'No Location Tracking',
		privacyDesc: 'Navigation without server-side tracking',
		techStack: ['OpenStreetMap', 'Mapbox', 'Rust', 'OSRM'],
		features: [
			{ icon: 'Map', title: 'Offline Maps', desc: 'Download entire regions' },
			{ icon: 'Compass', title: 'Turn-by-Turn', desc: 'Voice navigation' },
			{ icon: 'Car', title: 'Traffic', desc: 'Real-time updates (optional)' },
			{ icon: 'MapPin', title: 'Bookmarks', desc: 'Save favorite places' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 198765,
		rating: 4.8,
		reviews: 4321
	},

	vutranslate: {
		id: 'vutranslate',
		name: 'VuTranslate',
		icon: 'V',
		ledger: 'VTR',
		color: '#f43f5e',
		colorRgb: '244, 63, 94',
		tagline: 'Translate privately',
		category: 'Utilities',
		description: 'Privacy-focused translation app with on-device AI and 100+ languages.',
		longDescription: 'VuTranslate uses on-device machine learning to translate between 100+ languages without sending your text to servers.',
		privacyLevel: 5,
		privacyName: 'On-Device AI',
		privacyDesc: 'All translation happens locally',
		techStack: ['TensorFlow Lite', 'React Native', 'CoreML', 'ONNX'],
		features: [
			{ icon: 'Globe', title: '100+ Languages', desc: 'Comprehensive coverage' },
			{ icon: 'Camera', title: 'Camera Translate', desc: 'Point and translate' },
			{ icon: 'Mic', title: 'Voice Input', desc: 'Speak to translate' },
			{ icon: 'MessageSquare', title: 'Conversations', desc: 'Real-time chat translation' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 234567,
		rating: 4.7,
		reviews: 5432
	},

	vuhab: {
		id: 'vuhab',
		name: 'VuHabit',
		icon: 'V',
		ledger: 'VH',
		color: '#16a34a',
		colorRgb: '22, 163, 74',
		tagline: 'Build habits privately',
		category: 'Health',
		description: 'Privacy-first habit tracker with local analytics and no behavioral tracking.',
		longDescription: 'VuHabit helps you build better habits without surveillance. Track your progress with beautiful visualizations, all stored locally.',
		privacyLevel: 5,
		privacyName: 'Local-Only',
		privacyDesc: 'Habit data never leaves your device',
		techStack: ['Swift', 'SwiftUI', 'CoreData', 'HealthKit'],
		features: [
			{ icon: 'Calendar', title: 'Streak Tracking', desc: 'Never break the chain' },
			{ icon: 'BarChart2', title: 'Analytics', desc: 'Beautiful progress charts' },
			{ icon: 'Trophy', title: 'Achievements', desc: 'Celebrate milestones' },
			{ icon: 'Clock', title: 'Reminders', desc: 'Local notifications' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 78901,
		rating: 4.6,
		reviews: 1543
	},

	vufocus: {
		id: 'vufocus',
		name: 'VuFocus',
		icon: 'V',
		ledger: 'VFC',
		color: '#be123c',
		colorRgb: '190, 18, 60',
		tagline: 'Focus without tracking',
		category: 'Productivity',
		description: 'Privacy-focused Pomodoro timer and focus tracker with local analytics.',
		longDescription: 'VuFocus helps you stay productive with Pomodoro technique, website blocking, and focus sessions, all without tracking your activity.',
		privacyLevel: 5,
		privacyName: 'No Activity Tracking',
		privacyDesc: 'Focus time stored locally only',
		techStack: ['Electron', 'React', 'SQLite', 'Native APIs'],
		features: [
			{ icon: 'Timer', title: 'Pomodoro Timer', desc: 'Customizable intervals' },
			{ icon: 'Ban', title: 'Website Blocker', desc: 'Block distractions' },
			{ icon: 'Target', title: 'Deep Work', desc: 'Track focus sessions' },
			{ icon: 'TrendingUp', title: 'Insights', desc: 'Local productivity analytics' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 67890,
		rating: 4.5,
		reviews: 1234
	},

	vurecipe: {
		id: 'vurecipe',
		name: 'VuRecipe',
		icon: 'V',
		ledger: 'VR',
		color: '#ea580c',
		colorRgb: '234, 88, 12',
		tagline: 'Cook without surveillance',
		category: 'Health',
		description: 'Privacy-focused recipe manager and meal planner with no tracking.',
		longDescription: 'VuRecipe stores your favorite recipes and helps plan meals without collecting your dietary data. Features include shopping lists and nutrition info.',
		privacyLevel: 5,
		privacyName: 'Local-Only',
		privacyDesc: 'Recipes and meal data stored locally',
		techStack: ['React Native', 'SQLite', 'WebScraper', 'Spoonacular API (optional)'],
		features: [
			{ icon: 'BookOpen', title: 'Recipe Manager', desc: 'Organize all recipes' },
			{ icon: 'ShoppingCart', title: 'Shopping Lists', desc: 'Auto-generate lists' },
			{ icon: 'Calendar', title: 'Meal Planning', desc: 'Plan weekly meals' },
			{ icon: 'Apple', title: 'Nutrition Info', desc: 'Calculate nutrition locally' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 45678,
		rating: 4.4,
		reviews: 876
	},

	vubudget: {
		id: 'vubudget',
		name: 'VuBudget',
		icon: 'V',
		ledger: 'VBG',
		color: '#ca8a04',
		colorRgb: '202, 138, 4',
		tagline: 'Budget privately',
		category: 'Finance',
		description: 'Privacy-first budgeting and expense tracking with local data storage.',
		longDescription: 'VuBudget helps you manage your money without sharing financial data. Features include automatic categorization, budgets, and financial insights.',
		privacyLevel: 5,
		privacyName: 'Local-Only',
		privacyDesc: 'Financial data never leaves device',
		techStack: ['React', 'IndexedDB', 'Chart.js', 'Plaid SDK (optional)'],
		features: [
			{ icon: 'DollarSign', title: 'Budget Tracking', desc: 'Set and track budgets' },
			{ icon: 'BarChart2', title: 'Expense Reports', desc: 'Beautiful visualizations' },
			{ icon: 'Tag', title: 'Auto-Categorize', desc: 'AI categorization locally' },
			{ icon: 'CreditCard', title: 'Bank Sync', desc: 'Optional encrypted sync' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 112345,
		rating: 4.7,
		reviews: 2345
	},

	vujournal: {
		id: 'vujournal',
		name: 'VuJournal',
		icon: 'V',
		ledger: 'VJ',
		color: '#6366f1',
		colorRgb: '99, 102, 241',
		tagline: 'Journal privately',
		category: 'Health',
		description: 'Privacy-focused journaling app with mood tracking and encrypted entries.',
		longDescription: 'VuJournal provides a safe space for your thoughts with end-to-end encryption. Features include mood tracking, prompts, and beautiful templates.',
		privacyLevel: 5,
		privacyName: 'Zero-Knowledge',
		privacyDesc: 'Journal entries encrypted locally',
		techStack: ['Svelte', 'IndexedDB', 'CryptoJS', 'Markdown'],
		features: [
			{ icon: 'Book', title: 'Daily Journal', desc: 'Write daily entries' },
			{ icon: 'Smile', title: 'Mood Tracking', desc: 'Track your emotions' },
			{ icon: 'MessageCircle', title: 'Prompts', desc: 'Guided journaling' },
			{ icon: 'Palette', title: 'Templates', desc: 'Beautiful journal themes' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 89012,
		rating: 4.8,
		reviews: 1678
	},

	vuread: {
		id: 'vuread',
		name: 'VuRead',
		icon: 'V',
		ledger: 'VRD',
		color: '#94a3b8',
		colorRgb: '148, 163, 184',
		tagline: 'Read without tracking',
		category: 'Learning',
		description: 'Privacy-focused eBook reader with annotation and library management.',
		longDescription: 'VuRead is an elegant eBook reader that doesn\'t track what you read. Support for EPUB, PDF, and MOBI with highlighting and notes.',
		privacyLevel: 5,
		privacyName: 'No Reading Analytics',
		privacyDesc: 'Reading habits stay private',
		techStack: ['React Native', 'EPUB.js', 'PDF.js', 'SQLite'],
		features: [
			{ icon: 'Library', title: 'Library', desc: 'Organize your books' },
			{ icon: 'Pencil', title: 'Annotations', desc: 'Highlight and note' },
			{ icon: 'Moon', title: 'Night Mode', desc: 'Eye-friendly reading' },
			{ icon: 'Cloud', title: 'Sync', desc: 'Encrypted cloud sync' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 67890,
		rating: 4.6,
		reviews: 1345
	},

	vudraw: {
		id: 'vudraw',
		name: 'VuDraw',
		icon: 'V',
		ledger: 'VDR',
		color: '#d946ef',
		colorRgb: '217, 70, 239',
		tagline: 'Create without surveillance',
		category: 'Creative',
		description: 'Privacy-focused digital drawing and painting app with local processing.',
		longDescription: 'VuDraw is a powerful digital art tool that keeps your creative process private. Features include layers, brushes, and AI-powered tools that run locally.',
		privacyLevel: 5,
		privacyName: 'Local Processing',
		privacyDesc: 'All artwork stays on device',
		techStack: ['WebGL', 'Canvas', 'TensorFlow.js', 'IndexedDB'],
		features: [
			{ icon: 'Palette', title: 'Pro Brushes', desc: '100+ realistic brushes' },
			{ icon: 'Layers', title: 'Layers', desc: 'Unlimited layers' },
			{ icon: 'Bot', title: 'AI Tools', desc: 'Local AI assistance' },
			{ icon: 'Upload', title: 'Export', desc: 'PNG, PSD, SVG support' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'beta',
		downloads: 34567,
		rating: 4.7,
		reviews: 678
	},

	vuvpn: {
		id: 'vuvpn',
		name: 'VuVPN',
		icon: 'V',
		ledger: 'VVPN',
		color: '#0d9488',
		colorRgb: '13, 148, 136',
		tagline: 'Browse anonymously',
		category: 'Security',
		description: 'No-logs VPN with WireGuard protocol and distributed servers worldwide.',
		longDescription: 'VuVPN provides military-grade encryption for your internet connection with a strict no-logs policy. Features include kill switch, split tunneling, and ad blocking.',
		privacyLevel: 5,
		privacyName: 'No-Logs',
		privacyDesc: 'Independently audited zero-logs policy',
		techStack: ['WireGuard', 'Go', 'OpenVPN', 'IPSec'],
		features: [
			{ icon: 'Globe', title: '60+ Countries', desc: 'Global server network' },
			{ icon: 'Zap', title: 'WireGuard', desc: 'Lightning-fast protocol' },
			{ icon: 'Shield', title: 'Kill Switch', desc: 'Auto-disconnect protection' },
			{ icon: 'Ban', title: 'Ad Blocking', desc: 'Block ads at VPN level' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 456789,
		rating: 4.9,
		reviews: 9876
	},

	vumeet: {
		id: 'vumeet',
		name: 'VuMeet',
		icon: 'V',
		ledger: 'VMT',
		color: '#c026d3',
		colorRgb: '192, 38, 211',
		tagline: 'Meet privately',
		category: 'Communication',
		description: 'Privacy-focused video conferencing with end-to-end encryption and no recording.',
		longDescription: 'VuMeet provides secure video conferencing for teams and individuals. Features include screen sharing, breakout rooms, and end-to-end encryption.',
		privacyLevel: 5,
		privacyName: 'E2E Encrypted',
		privacyDesc: 'No server-side recording or storage',
		techStack: ['WebRTC', 'Go', 'React', 'Jitsi'],
		features: [
			{ icon: 'Users', title: '100 Participants', desc: 'Large meetings supported' },
			{ icon: 'Monitor', title: 'Screen Share', desc: 'Share your screen' },
			{ icon: 'MessageSquare', title: 'Chat', desc: 'Encrypted text chat' },
			{ icon: 'Mic', title: 'Background Blur', desc: 'Privacy in public spaces' }
		],
		pricing: { monthly: 2.56, yearly: 25.60, lifetime: 2560 },
		status: 'available',
		downloads: 178901,
		rating: 4.7,
		reviews: 3456
	}
};

// Helper functions
export function getAllApps(): VuApp[] {
	return Object.values(vuApps);
}

export function getAppById(id: string): VuApp | undefined {
	return vuApps[id];
}

export function getAppsByCategory(category: VuApp['category']): VuApp[] {
	return getAllApps().filter(app => app.category === category);
}

export function getAppsByStatus(status: VuApp['status']): VuApp[] {
	return getAllApps().filter(app => app.status === status);
}

export function getFeaturedApps(): VuApp[] {
	return getAllApps()
		.sort((a, b) => b.downloads - a.downloads)
		.slice(0, 4);
}

export function getPrivacyChampions(): VuApp[] {
	return getAllApps()
		.filter(app => app.privacyLevel === 5)
		.sort((a, b) => b.rating - a.rating)
		.slice(0, 6);
}

