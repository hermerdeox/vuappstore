// Stripe integration for low-risk SaaS categorization
// This file should only be imported in server-side code

// NOTE: This file is temporarily disabled until environment variables are configured
// To enable, set up your .env file with Stripe keys

export const stripe = null;

export const stripeBusinessProfile = {
	mcc: '5817', // Digital Goods: Software - Low-risk category
	business_type: 'company' as const,
	company: {
		name: 'VU Digital Privacy Solutions LLC',
		tax_id: '',
		address: {
			line1: '1209 Orange Street',
			city: 'Wilmington',
			state: 'DE',
			postal_code: '19801',
			country: 'US'
		}
	},
	support_email: 'support@vuappstore.com',
	support_phone: '+1-302-555-0100',
	support_url: 'https://vuappstore.com/support',
	product_description: 'Privacy-focused software applications subscription service',
	business_url: 'https://vuappstore.com'
};

// Placeholder functions that will be implemented when Stripe is configured
export async function createCustomer(params: any) {
	console.log('Stripe not configured - createCustomer placeholder');
	return null;
}

export async function createSubscription(params: any) {
	console.log('Stripe not configured - createSubscription placeholder');
	return null;
}

export async function createPaymentIntent(params: any) {
	console.log('Stripe not configured - createPaymentIntent placeholder');
	return null;
}

export async function createRefund(params: any) {
	console.log('Stripe not configured - createRefund placeholder');
	return null;
}

export async function updateCustomerMetadata(customerId: string, metadata: Record<string, string>) {
	console.log('Stripe not configured - updateCustomerMetadata placeholder');
	return null;
}

export async function handleWebhookEvent(event: any) {
	console.log('Stripe not configured - handleWebhookEvent placeholder');
}

export const PRICE_IDS = {
	monthly: 'price_monthly',
	annual: 'price_annual',
	lifetime: 'price_lifetime'
};

export const PRODUCT_DESCRIPTIONS = {
	main: 'VuAppStore - Privacy-First Software Suite',
	monthly: 'Monthly subscription to all VU privacy apps',
	annual: 'Annual subscription to all VU privacy apps (save 17%)',
	lifetime: 'Lifetime access to all VU privacy apps and future releases'
};