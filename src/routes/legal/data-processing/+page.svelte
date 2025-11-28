<script lang="ts">
	import LegalLayout from '$lib/components/legal/LegalLayout.svelte';
	const lastUpdated = '2024-01-15';
</script>

<LegalLayout title="Data Processing Agreement" {lastUpdated}>
	<section>
		<h2>1. INTRODUCTION</h2>
		<p>
			This Data Processing Agreement ("DPA") forms part of the Terms of Service between VU Technologies ("VuAppStore", "we", "us") and you ("Customer", "you") regarding the processing of personal data in connection with the VuAppStore services.
		</p>
		<p>
			This DPA reflects the parties' agreement on the terms governing the processing of personal data in accordance with the requirements of applicable Data Protection Laws, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
		</p>
	</section>

	<section>
		<h2>2. DEFINITIONS</h2>
		<ul>
			<li><strong>"Data Protection Laws"</strong> means all applicable laws relating to the processing of personal data including GDPR, CCPA, and other applicable privacy laws.</li>
			<li><strong>"Personal Data"</strong> has the meaning given in applicable Data Protection Laws.</li>
			<li><strong>"Processing"</strong> has the meaning given in applicable Data Protection Laws.</li>
			<li><strong>"Data Controller"</strong> means the entity that determines the purposes and means of processing personal data.</li>
			<li><strong>"Data Processor"</strong> means the entity that processes personal data on behalf of the Data Controller.</li>
		</ul>
	</section>

	<section>
		<h2>3. SCOPE AND ROLES</h2>
		<h3>3.1 Data Controller</h3>
		<p>
			For the purposes of this DPA, you (the Customer) act as the Data Controller for any personal data you process using VuAppStore services.
		</p>
		
		<h3>3.2 Data Processor</h3>
		<p>
			VuAppStore acts as a Data Processor when processing personal data on your behalf in connection with the provision of our services.
		</p>

		<h3>3.3 Minimal Data Processing</h3>
		<p>
			VuAppStore is designed with privacy-by-design principles. We process minimal personal data:
		</p>
		<ul>
			<li>Account email address (for service delivery)</li>
			<li>Payment information (cryptocurrency transactions only - Monero, Lightning, BTC, ETH - not stored by us)</li>
			<li>Download history (for re-download purposes)</li>
			<li>Support communications (when you contact us)</li>
		</ul>
	</section>

	<section>
		<h2>4. PROCESSING INSTRUCTIONS</h2>
		<h3>4.1 Lawful Instructions</h3>
		<p>
			VuAppStore will process personal data only in accordance with:
		</p>
		<ul>
			<li>Your documented lawful instructions as set out in this DPA and the Terms of Service</li>
			<li>Applicable Data Protection Laws</li>
			<li>Our Privacy Policy</li>
		</ul>

		<h3>4.2 Purpose Limitation</h3>
		<p>
			Personal data will be processed solely for the purpose of providing VuAppStore services and not for any other purpose without your explicit consent.
		</p>
	</section>

	<section>
		<h2>5. SECURITY MEASURES</h2>
		<h3>5.1 Technical and Organizational Measures</h3>
		<p>
			VuAppStore implements appropriate technical and organizational measures to ensure a level of security appropriate to the risk, including:
		</p>
		<ul>
			<li><strong>Encryption:</strong> All data encrypted at rest and in transit using AES-256 encryption</li>
			<li><strong>Access Controls:</strong> Role-based access controls and multi-factor authentication</li>
			<li><strong>Network Security:</strong> Firewalls, intrusion detection, and secure network protocols</li>
			<li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
			<li><strong>Incident Response:</strong> Documented procedures for security incident management</li>
		</ul>

		<h3>5.2 Zero-Knowledge Architecture</h3>
		<p>
			Where technically feasible, VuAppStore implements zero-knowledge architecture ensuring that even VuAppStore cannot access your personal data.
		</p>
	</section>

	<section>
		<h2>6. SUB-PROCESSORS</h2>
		<h3>6.1 Authorized Sub-Processors</h3>
		<p>
			VuAppStore may engage the following sub-processors:
		</p>
		<ul>
			<li><strong>Cryptocurrency Networks</strong> - Decentralized payment processing (Monero, Lightning Network, Bitcoin, Ethereum) - no centralized third party</li>
			<li><strong>Amazon Web Services</strong> - Cloud infrastructure (SOC 2 Type II certified)</li>
			<li><strong>Cloudflare, Inc.</strong> - Content delivery and security</li>
		</ul>

		<h3>6.2 Sub-Processor Obligations</h3>
		<p>
			All sub-processors are bound by data protection obligations equivalent to those set out in this DPA.
		</p>
	</section>

	<section>
		<h2>7. DATA SUBJECT RIGHTS</h2>
		<h3>7.1 Assistance with Rights Requests</h3>
		<p>
			VuAppStore will assist you in responding to data subject rights requests, including:
		</p>
		<ul>
			<li>Right of access</li>
			<li>Right to rectification</li>
			<li>Right to erasure ("right to be forgotten")</li>
			<li>Right to restrict processing</li>
			<li>Right to data portability</li>
			<li>Right to object to processing</li>
		</ul>

		<h3>7.2 Response Time</h3>
		<p>
			We will respond to data subject rights requests within 30 days of receipt, or as required by applicable law.
		</p>
	</section>

	<section>
		<h2>8. DATA TRANSFERS</h2>
		<h3>8.1 International Transfers</h3>
		<p>
			Personal data may be transferred to and processed in countries outside the European Economic Area. All such transfers will be protected by appropriate safeguards as required by GDPR.
		</p>

		<h3>8.2 Transfer Mechanisms</h3>
		<p>
			We rely on the following mechanisms for international data transfers:
		</p>
		<ul>
			<li>EU-US Data Privacy Framework</li>
			<li>Standard Contractual Clauses (SCCs)</li>
			<li>Adequacy decisions by the European Commission</li>
		</ul>
	</section>

	<section>
		<h2>9. DATA BREACH NOTIFICATION</h2>
		<h3>9.1 Notification Obligation</h3>
		<p>
			VuAppStore will notify you without undue delay after becoming aware of a personal data breach affecting your data, and in any case within 72 hours.
		</p>

		<h3>9.2 Breach Information</h3>
		<p>
			Breach notifications will include:
		</p>
		<ul>
			<li>Description of the nature of the breach</li>
			<li>Categories and approximate number of data subjects affected</li>
			<li>Likely consequences of the breach</li>
			<li>Measures taken or proposed to address the breach</li>
		</ul>
	</section>

	<section>
		<h2>10. DATA RETENTION AND DELETION</h2>
		<h3>10.1 Retention Period</h3>
		<p>
			Personal data will be retained only for as long as necessary to provide the services or as required by law.
		</p>

		<h3>10.2 Deletion</h3>
		<p>
			Upon termination of services or upon your request, VuAppStore will delete or return all personal data within 30 days, except where retention is required by law.
		</p>
	</section>

	<section>
		<h2>11. AUDITS AND COMPLIANCE</h2>
		<h3>11.1 Audit Rights</h3>
		<p>
			You have the right to audit VuAppStore's compliance with this DPA, subject to reasonable notice and confidentiality obligations.
		</p>

		<h3>11.2 Compliance Documentation</h3>
		<p>
			VuAppStore will provide reasonable assistance and information to demonstrate compliance with this DPA and applicable Data Protection Laws.
		</p>
	</section>

	<section>
		<h2>12. LIABILITY AND INDEMNIFICATION</h2>
		<h3>12.1 Limitation of Liability</h3>
		<p>
			Each party's liability under this DPA is subject to the limitation of liability provisions in the Terms of Service.
		</p>

		<h3>12.2 Indemnification</h3>
		<p>
			VuAppStore will indemnify you against claims arising from VuAppStore's non-compliance with this DPA, subject to the terms of the main agreement.
		</p>
	</section>

	<section>
		<h2>13. TERM AND TERMINATION</h2>
		<p>
			This DPA will remain in effect for as long as VuAppStore processes personal data on your behalf. Upon termination, the data deletion provisions in Section 10 will apply.
		</p>
	</section>

	<section>
		<h2>14. CONTACT INFORMATION</h2>
		<p>
			For questions regarding this DPA or data protection matters, please contact:
		</p>
		<p>
			<strong>Data Protection Officer</strong><br/>
			Email: privacy@vuappstore.com<br/>
			Address: VU Technologies<br/>
			1209 Orange Street<br/>
			Wilmington, DE 19801<br/>
			United States
		</p>
	</section>
</LegalLayout>
