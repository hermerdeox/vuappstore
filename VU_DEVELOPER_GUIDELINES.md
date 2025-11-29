# VU Developer Guidelines - Privacy-First Development

## Quick Reference for Building VU-Compliant Features

---

## ❌ NEVER Do This

### Forbidden Fields

```typescript
// ❌ NEVER create these fields
interface User {
	firstName: string; // ❌ NO
	lastName: string; // ❌ NO
	fullName: string; // ❌ NO
	phoneNumber: string; // ❌ NO
	mobilePhone: string; // ❌ NO
	address: string; // ❌ NO
	city: string; // ❌ NO
	zipCode: string; // ❌ NO
	country: string; // ❌ NO
	dateOfBirth: string; // ❌ NO
	gender: string; // ❌ NO
	socialSecurity: string; // ❌ NO
	creditCard: string; // ❌ NO
	cvv: string; // ❌ NO
	bankAccount: string; // ❌ NO
}
```

### Forbidden Tracking

```typescript
// ❌ NEVER implement these
analytics.track('page_view'); // ❌ NO
analytics.track('button_click'); // ❌ NO
logger.log(user.ipAddress); // ❌ NO
fingerprint.generate(); // ❌ NO
session.trackBehavior(); // ❌ NO
database.saveDownloadHistory(); // ❌ NO
```

---

## ✅ ALWAYS Do This

### Correct User Model

```typescript
// ✅ The VU Way
interface VuUser {
	username: string; // ✅ @username format
	email: string; // ✅ Must end with @vumail.app
	privacyLevel: 0 | 1 | 2 | 3 | 4; // ✅ VU Zero-Level
	subscriptionStatus: 'active' | 'inactive'; // ✅ Minimal
	subscriptionPlan: string; // ✅ For billing only
	createdAt: Date; // ✅ Account age
	// That's it. Nothing more.
}
```

### Correct Form Fields

```svelte
<!-- ✅ Username (The VU Way) -->
<label>Username</label>
<input type="text" placeholder="@username" pattern="^@[a-z0-9_]+$" />
<p class="help-text">✓ Your username is how you're identified. No real names required.</p>

<!-- ✅ VuMail Email (The VU Way) -->
<label>VuMail Address</label>
<input type="email" placeholder="username@vumail.app" pattern="^[a-z0-9_]+@vumail\.app$" />
<p class="help-text">✓ Only @vumail.app addresses allowed for maximum privacy.</p>

<!-- ✅ Password (The VU Way) -->
<label>Password</label>
<input type="password" />
<p class="help-text">🔐 Hashed with Argon2id, never stored in plain text.</p>

<!-- ❌ NEVER ADD THESE -->
<!-- <input type="tel" /> --> ❌ NO PHONE
<!-- <input name="firstName" /> --> ❌ NO REAL NAME
<!-- <input name="cardNumber" /> --> ❌ NO PAYMENT
```

---

## 🛡️ Privacy Defaults

### Toggle States

```typescript
// ✅ The VU Way: Everything OFF except security
const privacySettings = {
	marketingEmails: false, // OFF
	productUpdates: false, // OFF
	securityAlerts: true, // ON ← Only this
	anonymousAnalytics: false, // OFF
	crashReports: false, // OFF
	betaAccess: false, // OFF
	newsletter: false, // OFF
	recommendations: false, // OFF
	socialSharing: false // OFF
};
```

### Required Notices

```svelte
<!-- ✅ Always include when relevant -->

<!-- Zero Tracking Notice -->
<div class="notice notice-success">
	<h4>Zero [Feature] Tracking</h4>
	<p>We don't track [what user does]. Your [data] stays on YOUR device.</p>
</div>

<!-- Zero Storage Notice -->
<div class="notice notice-primary">
	<h4>Zero [Data Type] Storage</h4>
	<p>We NEVER store your [sensitive data]. All handled by [trusted third party].</p>
</div>

<!-- Data Transparency -->
<div class="notice notice-info">
	<h4>What We Actually Store:</h4>
	<ul>
		<li>✓ Only what's essential</li>
	</ul>
</div>

<div class="notice notice-success">
	<h4>What We DON'T Store:</h4>
	<ul>
		<li>❌ Everything else</li>
	</ul>
</div>
```

---

## 🎨 UI Components

### User Display Component

```svelte
<!-- ✅ Standard VU user display -->
<div class="user-card">
	<div class="user-avatar">
		<User class="icon" />
	</div>
	<h2>{user.username}</h2>
	<p class="email">{user.email}</p>
	<div class="badges">
		<span class="badge">{user.plan} Plan</span>
		<span class="badge badge-info">Level {user.privacyLevel}</span>
	</div>
</div>
```

### Privacy Notice Template

```svelte
<!-- ✅ Reusable privacy notice -->
<div class="privacy-notice border-l-4 border-{color}">
	<Shield class="icon" />
	<div>
		<h3>{title}</h3>
		<p>{description}</p>
	</div>
</div>
```

### Danger Zone Template

```svelte
<!-- ✅ Account deletion UI -->
<div class="danger-zone border-l-4 border-error">
	<AlertTriangle class="icon text-error" />
	<h2 class="text-error">Danger Zone</h2>

	<div class="danger-action">
		<p>Permanent action warning...</p>
		<div class="consequences">
			<p>What happens:</p>
			<ul>
				<li>✓ Clear consequence 1</li>
				<li>✓ Clear consequence 2</li>
			</ul>
		</div>
		<button class="btn btn-danger"> Destructive Action </button>
	</div>
</div>
```

---

## 📋 Validation Rules

### Username Validation

```typescript
// ✅ VU Username Rules
function validateUsername(username: string): boolean {
	// Must start with @
	if (!username.startsWith('@')) return false;

	// Lowercase alphanumeric and underscore only
	const validPattern = /^@[a-z0-9_]{3,30}$/;
	if (!validPattern.test(username)) return false;

	// Reserved usernames
	const reserved = ['admin', 'root', 'system', 'vuapps', 'support'];
	const name = username.slice(1).toLowerCase();
	if (reserved.includes(name)) return false;

	return true;
}

// Examples:
validateUsername('@privacy_champion'); // ✅ Valid
validateUsername('@user123'); // ✅ Valid
validateUsername('username'); // ❌ No @
validateUsername('@User_Name'); // ❌ Uppercase
validateUsername('@admin'); // ❌ Reserved
```

### Email Validation

```typescript
// ✅ VU Email Rules
function validateVuMail(email: string): boolean {
	// Must be @vumail.app domain
	if (!email.endsWith('@vumail.app')) return false;

	// Lowercase alphanumeric and underscore before @
	const validPattern = /^[a-z0-9_]+@vumail\.app$/;
	return validPattern.test(email);
}

// Examples:
validateVuMail('privacy_champion@vumail.app'); // ✅ Valid
validateVuMail('user123@vumail.app'); // ✅ Valid
validateVuMail('user@gmail.com'); // ❌ Wrong domain
validateVuMail('User@vumail.app'); // ❌ Uppercase
```

---

## 🔒 Security Checklist

### Every New Feature Must:

- [ ] Use @username (not real name)
- [ ] Validate @vumail.app email
- [ ] Never ask for phone number
- [ ] Never store payment data
- [ ] Default all tracking to OFF
- [ ] Include privacy notices
- [ ] Show what data is collected
- [ ] Show what data is NOT collected
- [ ] Provide data export option
- [ ] Hash all passwords (Argon2id)
- [ ] Use 2FA via VuAuth (no SMS)
- [ ] Log only security events
- [ ] Never fingerprint sessions
- [ ] Never track IP addresses

---

## 📚 Code Examples

### Creating a New Account Page

```svelte
<script lang="ts">
	import { User, Shield } from 'lucide-svelte';

	// ✅ The VU Way
	const user = {
		username: '@privacy_champion',
		email: 'privacy_champion@vumail.app',
		privacyLevel: 0
	};
</script>

<div class="page">
	<!-- Always show user identity -->
	<div class="user-info">
		<h2>{user.username}</h2>
		<p>{user.email}</p>
		<span class="badge">Level {user.privacyLevel}</span>
	</div>

	<!-- Always include privacy notice -->
	<div class="privacy-notice">
		<Shield />
		<p>We don't track [relevant activity]. Your data stays yours.</p>
	</div>

	<!-- Main content here -->
</div>
```

### Adding a New Form

```svelte
<!-- ✅ Privacy-first form -->
<form on:submit={handleSubmit}>
	<!-- Username field -->
	<div class="field">
		<label>Username</label>
		<input
			type="text"
			bind:value={username}
			placeholder="@username"
			pattern="^@[a-z0-9_]+$"
			required
		/>
		<p class="help">No real names required</p>
	</div>

	<!-- Email field (VuMail only) -->
	<div class="field">
		<label>VuMail Address</label>
		<input
			type="email"
			bind:value={email}
			placeholder="username@vumail.app"
			pattern="^[a-z0-9_]+@vumail\.app$"
			required
		/>
		<p class="help">@vumail.app addresses only</p>
	</div>

	<!-- ❌ NO PHONE FIELD -->
	<!-- ❌ NO REAL NAME FIELDS -->
	<!-- ❌ NO ADDRESS FIELDS -->

	<button type="submit">Submit</button>
</form>
```

### Adding Privacy Toggles

```svelte
<script lang="ts">
	// ✅ All OFF by default (except security)
	let marketingEmails = false;
	let securityAlerts = true; // ← Only this ON
	let analytics = false;
</script>

<!-- Security Alert (ON by default) -->
<div class="setting border-l-4 border-success">
	<div>
		<p>Security Alerts</p>
		<p class="help">Critical notifications (recommended)</p>
	</div>
	<toggle bind:checked={securityAlerts} />
</div>

<!-- Marketing (OFF by default) -->
<div class="setting">
	<div>
		<p>Marketing Emails</p>
		<p class="help">Product updates via VuMail</p>
	</div>
	<toggle bind:checked={marketingEmails} />
</div>
```

---

## 🚨 Common Mistakes to Avoid

### ❌ Mistake 1: Asking for Real Name

```svelte
<!-- ❌ WRONG -->
<input type="text" placeholder="First Name" />
<input type="text" placeholder="Last Name" />

<!-- ✅ CORRECT -->
<input type="text" placeholder="@username" />
```

### ❌ Mistake 2: Allowing External Emails

```svelte
<!-- ❌ WRONG -->
<input type="email" placeholder="email@example.com" />

<!-- ✅ CORRECT -->
<input type="email" placeholder="username@vumail.app" pattern="^[a-z0-9_]+@vumail\.app$" />
```

### ❌ Mistake 3: Phone Number Fields

```svelte
<!-- ❌ WRONG -->
<input type="tel" placeholder="Phone Number" />

<!-- ✅ CORRECT -->
<!-- Don't add this field at all! -->
```

### ❌ Mistake 4: Storing Payment Data

```typescript
// ❌ WRONG
const user = {
	cardNumber: '4242...',
	cvv: '123'
};

// ✅ CORRECT
const user = {
	// Payment data handled by Stripe
	// We never see or store it
};
```

### ❌ Mistake 5: Tracking by Default

```typescript
// ❌ WRONG
const settings = {
	analytics: true, // Default ON
	marketing: true // Default ON
};

// ✅ CORRECT
const settings = {
	securityAlerts: true, // Only security ON
	analytics: false, // Everything else OFF
	marketing: false
};
```

---

## ✅ Quick Implementation Checklist

When adding a new feature:

1. [ ] Does it use @username? (not real name)
2. [ ] Does it validate @vumail.app? (not external email)
3. [ ] Does it avoid phone numbers?
4. [ ] Does it avoid payment data?
5. [ ] Are all non-security features OFF by default?
6. [ ] Does it include privacy notices?
7. [ ] Does it show what data is collected?
8. [ ] Does it show what data is NOT collected?
9. [ ] Can users export their data?
10. [ ] Can users delete their data?

**If all YES → VU Compliant ✅**

---

## 🎯 The VU Philosophy in One Sentence

**"We can't see what we don't collect, and we don't collect what we don't absolutely need."**

---

## 📞 When in Doubt

**Ask yourself:**

1. "Would I want this data collected about me?"
2. "Is this data absolutely necessary?"
3. "Could we build this without collecting it?"

**If the answer to #3 is YES → Don't collect it.**

---

**The VU Standard**: Privacy is not a feature. It's the foundation.
