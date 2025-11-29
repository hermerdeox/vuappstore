<script lang="ts">
	import LegalLayout from '$lib/components/legal/LegalLayout.svelte';
	const lastUpdated = '2024-11-04';
</script>

<LegalLayout title="Refund Policy" {lastUpdated}>
	<section>
		<h2>CLEAR AND FAIR REFUND POLICY</h2>
		<p>
			We stand behind our products with a customer-friendly refund policy that reduces payment
			disputes and maintains low chargeback rates. Your satisfaction is our priority, and we want to
			make the refund process as simple and transparent as possible.
		</p>
	</section>

	<section>
		<h2>30-DAY MONEY-BACK GUARANTEE</h2>
		<p>
			All VuAppStore subscriptions come with a <strong>30-day money-back guarantee</strong>:
		</p>
		<ul>
			<li>
				<strong>Full Refund:</strong> Get a 100% refund within 30 days of your initial purchase
			</li>
			<li><strong>No Questions Asked:</strong> First-time buyers receive automatic approval</li>
			<li><strong>Fast Processing:</strong> Refunds processed within 5-7 business days</li>
			<li>
				<strong>Original Payment Method:</strong> Refund credited to your original payment method
			</li>
			<li>
				<strong>All Plans Covered:</strong> Applies to monthly, annual, and lifetime subscriptions
			</li>
		</ul>
		<p class="bg-primary/10 border border-primary/30 rounded-lg p-4 my-4">
			<strong>Note:</strong> The 30-day guarantee applies to first-time purchases. If you've previously
			refunded and re-purchased, please contact support for eligibility.
		</p>
	</section>

	<section>
		<h2>SUBSCRIPTION CANCELLATIONS</h2>
		<p>You have full control over your subscription:</p>
		<ul>
			<li><strong>Cancel Anytime:</strong> No cancellation fees or penalties</li>
			<li><strong>Self-Service:</strong> Cancel instantly through your account dashboard</li>
			<li>
				<strong>Access Until End:</strong> Continue using apps until current billing period ends
			</li>
			<li><strong>Easy Reactivation:</strong> Reactivate anytime with one click</li>
			<li><strong>Data Retention:</strong> Account data retained for 90 days after cancellation</li>
		</ul>

		<h3>Monthly Subscriptions:</h3>
		<ul>
			<li>Access continues until the end of the current month</li>
			<li>No refund for partial month (except within 30-day guarantee period)</li>
			<li>No automatic renewal after cancellation</li>
		</ul>

		<h3>Annual Subscriptions:</h3>
		<ul>
			<li><strong>Within 30 Days:</strong> Full refund available</li>
			<li><strong>After 30 Days:</strong> Pro-rated refund for unused months</li>
			<li><strong>Minimum Usage:</strong> Refund calculated from cancellation date forward</li>
			<li><strong>Processing Time:</strong> 7-10 business days</li>
		</ul>

		<h3>Lifetime Subscriptions:</h3>
		<ul>
			<li><strong>Within 30 Days:</strong> Full refund available</li>
			<li><strong>After 30 Days:</strong> Partial refund based on fair usage (contact support)</li>
		</ul>
	</section>

	<section>
		<h2>HOW TO REQUEST A REFUND</h2>
		<p>We've made the refund process simple and straightforward:</p>

		<h3>Method 1: Self-Service (Recommended)</h3>
		<ol>
			<li>Log into your <a href="/account">account dashboard</a></li>
			<li>Navigate to <strong>Billing & Subscriptions</strong></li>
			<li>Click <strong>"Request Refund"</strong> next to your subscription</li>
			<li>Select reason (optional but helps us improve)</li>
			<li>Confirm request</li>
			<li>Receive confirmation email immediately</li>
		</ol>

		<h3>Method 2: Email Support</h3>
		<p>
			Email <a href="mailto:support@vuappstore.com">support@vuappstore.com</a> with:
		</p>
		<ul>
			<li>Your account email address</li>
			<li>Subscription or order number</li>
			<li>Brief reason for refund (optional)</li>
		</ul>
		<p>We respond to all refund requests within 24 hours.</p>
	</section>

	<section>
		<h2>REFUND PROCESSING TIMES</h2>
		<table class="w-full my-4">
			<thead>
				<tr class="border-b border-border">
					<th class="text-left py-2">Payment Method</th>
					<th class="text-left py-2">Processing Time</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-b border-border/50">
					<td class="py-2">Monero (XMR)</td>
					<td class="py-2">Within 24 hours</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Bitcoin Lightning</td>
					<td class="py-2">Within 1 hour</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Bitcoin/Ethereum</td>
					<td class="py-2">Within 24-48 hours</td>
				</tr>
			</tbody>
		</table>
		<p class="text-sm text-text-secondary">
			Note: Refunds are sent to the same cryptocurrency address used for payment. Processing times
			depend on blockchain network conditions.
		</p>
	</section>

	<section>
		<h2>EXCEPTIONS AND SPECIAL CASES</h2>

		<h3>Non-Refundable Items:</h3>
		<ul>
			<li>Gift subscriptions (refund goes to original purchaser)</li>
			<li>Promotional or discounted subscriptions obtained through violations of terms</li>
			<li>Subscriptions purchased with fraudulent payment methods</li>
		</ul>

		<h3>Technical Issues:</h3>
		<p>If you're requesting a refund due to technical problems:</p>
		<ul>
			<li>Contact support first - we can usually resolve issues quickly</li>
			<li>Technical issues are not a reason to deny refunds within 30 days</li>
			<li>We may extend the refund period for unresolved technical issues</li>
		</ul>

		<h3>Billing Errors:</h3>
		<p>If you were charged incorrectly:</p>
		<ul>
			<li>
				Contact us immediately at <a href="mailto:billing@vuappstore.com">billing@vuappstore.com</a>
			</li>
			<li>Billing errors are refunded in full, regardless of timeframe</li>
			<li>Duplicate charges refunded within 48 hours</li>
		</ul>
	</section>

	<section>
		<h2>DISPUTE PREVENTION</h2>
		<p class="bg-warning/10 border border-warning/30 rounded-lg p-4 my-4">
			<strong>Important:</strong> Before initiating a chargeback with your bank or credit card
			company, please contact our support team at
			<a href="mailto:support@vuappstore.com">support@vuappstore.com</a>.
		</p>
		<p>We typically resolve all issues within 24 hours. Chargebacks:</p>
		<ul>
			<li>Take 60-90 days to resolve (vs. 24 hours with us)</li>
			<li>May result in account suspension during investigation</li>
			<li>Hurt our standing with payment processors</li>
			<li>Are unnecessary when we offer such flexible refund policies</li>
		</ul>
		<p>
			We prefer to handle refunds directly to maintain good standing with payment processors and
			ensure you receive your money back as quickly as possible.
		</p>
	</section>

	<section>
		<h2>REFUND STATISTICS</h2>
		<p>We're proud of our low refund and chargeback rates:</p>
		<ul>
			<li><strong>Refund Rate:</strong> Less than 2% of all transactions</li>
			<li><strong>Chargeback Rate:</strong> 0.1% (industry average is 1-2%)</li>
			<li><strong>Average Resolution Time:</strong> 4.5 hours</li>
			<li><strong>Customer Satisfaction:</strong> 98% of refund requests handled satisfactorily</li>
		</ul>
	</section>

	<section>
		<h2>QUESTIONS ABOUT REFUNDS?</h2>
		<p>We're here to help:</p>
		<ul>
			<li>
				<strong>Email:</strong> <a href="mailto:support@vuappstore.com">support@vuappstore.com</a>
			</li>
			<li><strong>Live Chat:</strong> Available 9 AM - 6 PM ET Monday-Friday</li>
			<li><strong>Response Time:</strong> Within 24 hours (usually much faster)</li>
			<li><strong>Phone:</strong> +1-302-555-0100 (9 AM - 6 PM ET)</li>
		</ul>
	</section>
</LegalLayout>

<style>
	table {
		@apply text-sm;
	}

	th {
		@apply font-semibold text-text-primary;
	}

	td {
		@apply text-text-secondary;
	}
</style>
