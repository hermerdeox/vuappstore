<script lang="ts">
	import LegalLayout from '$lib/components/legal/LegalLayout.svelte';
	const lastUpdated = '2024-11-04';
</script>

<LegalLayout title="CCPA Compliance" {lastUpdated}>
	<section>
		<h2>CALIFORNIA CONSUMER PRIVACY ACT (CCPA) COMPLIANCE</h2>
		<p>
			This section applies to California residents and describes your rights under the California
			Consumer Privacy Act (CCPA) and the California Privacy Rights Act (CPRA).
		</p>
	</section>

	<section>
		<h2>YOUR CCPA RIGHTS</h2>

		<h3>1. Right to Know</h3>
		<p>You can request information about:</p>
		<ul>
			<li>Categories of personal information we collect</li>
			<li>Specific pieces of personal information we have</li>
			<li>Categories of sources from which we collect</li>
			<li>Business purposes for collection</li>
			<li>Categories of third parties we share with</li>
		</ul>

		<h3>2. Right to Delete</h3>
		<p>You can request deletion of your personal information, subject to certain exceptions.</p>

		<h3>3. Right to Opt-Out of Sale</h3>
		<p class="bg-success/10 border border-success/30 rounded-lg p-4 my-4">
			<strong>We Do Not Sell Your Personal Information</strong><br />
			VuAppStore has never sold and will never sell your personal information.
		</p>

		<h3>4. Right to Non-Discrimination</h3>
		<p>We will not discriminate against you for exercising your CCPA rights.</p>

		<h3>5. Right to Correct</h3>
		<p>You can request correction of inaccurate personal information.</p>

		<h3>6. Right to Limit Use of Sensitive Personal Information</h3>
		<p>We do not use or disclose sensitive personal information beyond what's necessary.</p>
	</section>

	<section>
		<h2>PERSONAL INFORMATION WE COLLECT</h2>

		<h3>Categories of Information:</h3>
		<table class="w-full my-4">
			<thead>
				<tr class="border-b border-border">
					<th class="text-left py-2">Category</th>
					<th class="text-left py-2">Examples</th>
					<th class="text-left py-2">Collected</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-b border-border/50">
					<td class="py-2">Identifiers</td>
					<td class="py-2">Email, name</td>
					<td class="py-2 text-success">Yes</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Commercial Information</td>
					<td class="py-2">Purchase history</td>
					<td class="py-2 text-success">Yes</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Internet Activity</td>
					<td class="py-2">Downloads</td>
					<td class="py-2 text-warning">Limited</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Geolocation Data</td>
					<td class="py-2">Precise location</td>
					<td class="py-2 text-error">No</td>
				</tr>
				<tr class="border-b border-border/50">
					<td class="py-2">Biometric Information</td>
					<td class="py-2">Fingerprints, face scans</td>
					<td class="py-2 text-error">No</td>
				</tr>
			</tbody>
		</table>
	</section>

	<section>
		<h2>HOW TO EXERCISE YOUR RIGHTS</h2>

		<h3>Verified Requests:</h3>
		<p>To exercise your CCPA rights, you can:</p>
		<ul>
			<li>Email: <a href="mailto:ccpa@vuappstore.com">ccpa@vuappstore.com</a></li>
			<li>Call: 1-800-VUAPPS (1-800-882-7771) toll-free</li>
			<li>Online Form: <a href="/privacy-request">/privacy-request</a></li>
		</ul>

		<h3>Verification Process:</h3>
		<p>To verify your identity, we'll ask for:</p>
		<ul>
			<li>Your account email address</li>
			<li>Recent transaction information</li>
			<li>Additional verification for sensitive requests</li>
		</ul>

		<h3>Response Times:</h3>
		<ul>
			<li><strong>Acknowledgment:</strong> Within 10 days</li>
			<li><strong>Response:</strong> Within 45 days (extendable to 90 days if needed)</li>
			<li><strong>Deletion:</strong> Completed within 30 days</li>
		</ul>
	</section>

	<section>
		<h2>DO NOT SELL MY PERSONAL INFORMATION</h2>
		<p class="bg-primary/10 border border-primary/30 rounded-lg p-4 my-4">
			<strong>We don't sell your information, period.</strong><br />
			We have never sold personal information in the past 12 months, and we never will. Therefore, we
			do not offer an opt-out mechanism because there is nothing to opt out of.
		</p>
	</section>

	<section>
		<h2>AUTHORIZED AGENTS</h2>
		<p>You may designate an authorized agent to make requests on your behalf. The agent must:</p>
		<ul>
			<li>Provide written authorization signed by you</li>
			<li>Verify their own identity</li>
			<li>We may still require you to verify your identity directly</li>
		</ul>
	</section>

	<section>
		<h2>CALIFORNIA "SHINE THE LIGHT" LAW</h2>
		<p>
			Under California Civil Code Section 1798.83, California residents can request information
			about disclosure of personal information to third parties for direct marketing purposes.
		</p>
		<p>
			<strong>Our Response:</strong> We do not share personal information with third parties for their
			direct marketing purposes.
		</p>
	</section>

	<section>
		<h2>CONTACT FOR CALIFORNIA RESIDENTS</h2>
		<p>
			<strong>California Privacy Rights Coordinator</strong><br />
			Email:
			<a href="mailto:california-privacy@vuappstore.com">california-privacy@vuappstore.com</a><br />
			Phone: 1-800-882-7771 (toll-free)<br />
			Response Time: Within 10 business days
		</p>
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
