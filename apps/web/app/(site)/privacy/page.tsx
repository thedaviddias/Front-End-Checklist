import Link from 'next/link'
import { getLegalContactEmail } from '@/lib/legal-contact'

export const metadata = {
  title: 'Privacy Policy | Front-End Checklist',
  description: 'How Front-End Checklist handles account, website, and MCP data.',
  alternates: { canonical: '/privacy' }
}

/** Explain the data handled by the website and hosted MCP service. */
export default function PrivacyPage() {
  const email = getLegalContactEmail()
  return (
    <main className="container-content py-12">
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <h1>Privacy Policy</h1>
        <p>Last updated: October 4, 2026.</p>
        <p>
          David Dias operates Front-End Checklist, including frontendchecklist.io and
          mcp.frontendchecklist.io. For private support or questions about your data, email{' '}
          <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <h2>Browsing and accounts</h2>
        <p>
          You can browse rules and use the public MCP without an account. If you sign in through
          GitHub, we store your account ID, name, email, avatar, public GitHub profile details,
          authentication records, and sessions. We store the checklists, rule progress, notes,
          feedback, and audit history you create to provide those features.
        </p>
        <p>
          Profiles are public by default. You can change profile visibility in your profile
          settings. Checklists stay private unless you enable sharing. Audit reports have shareable
          URLs: anyone with the link can view a report. Do not put confidential information in
          public profiles or shared reports.
        </p>
        <h2>MCP requests and public-page audits</h2>
        <p>
          Your AI client sends the tool inputs you authorize, including source snippets, search
          queries, and URLs, to our hosted MCP. We process these inputs to return rule guidance or
          static findings. Public-page audits fetch the supplied public HTTPS URL, so the
          destination website also receives a request from our server. Do not submit credentials,
          personal data, or confidential source code.
        </p>
        <p>
          MCP tools do not access your website account or private checklists. The MCP application
          does not persist submitted source snippets as review records. Website audit features may
          save the audited URL and findings as shareable reports. Hosting, security, and diagnostic
          systems may retain request metadata; this policy does not promise that infrastructure
          keeps no logs. Your AI client's own privacy policy also applies to conversations and tool
          use within that client.
        </p>
        <h2>Cookies, measurement, and diagnostics</h2>
        <p>
          We use session cookies for sign-in and browser storage for preferences. Where configured,
          OpenPanel measures page views, outgoing links, and service events. Signed-in website
          analytics can associate events with your account ID, name, and email. Sentry collects
          errors and diagnostic metadata. Our Sentry configuration disables automatic collection of
          user information, cookies, and request bodies, and filters sensitive headers and query
          fields. Some diagnostics may include an account ID.
        </p>
        <p>
          Where enabled, anonymous MCP usage records contain the tool name, timestamp, result
          status, execution duration, canonical rule slugs and categories requested or returned, and
          a best-effort client platform classification (Claude, OpenAI, or unknown). Raw client
          names and user-agent strings are not retained in these usage events. These analytics do
          not include submitted code, prompts, search queries, audited URLs, or website account
          identifiers. A returned rule does not mean that a user applied a change. IP-based rate
          limiting uses Redis to protect the service. We use this information to operate, secure,
          troubleshoot, and improve Front-End Checklist.
        </p>
        <h2>Email preferences</h2>
        <p>
          Creating an account does not enroll you in the newsletter. Newsletter and waitlist forms
          require a separate signup action. We send the email address and subscription information
          you provide to Resend to manage those communications. Unsubscribe using the link in an
          email, or contact us. Deleting your website account does not automatically remove a
          separate email subscription.
        </p>
        <h2>Service providers and storage</h2>
        <p>
          We use Vercel for hosting, Supabase Postgres for application records, GitHub for sign-in,
          Resend for email, OpenPanel for measurement, Sentry for diagnostics, and Upstash Redis for
          rate limiting where configured. These providers process information to deliver their
          services and may process it outside your country. We may also disclose information when
          required by law or necessary to protect the service and its users.
        </p>
        <h2>Retention and your choices</h2>
        <p>
          We keep account records while your account exists, and operational information as needed
          for security, troubleshooting, and service operation. You can export your account data and
          delete your account in Settings. Account deletion removes account records, sessions,
          checklists, progress, and feedback. Existing audit reports can remain accessible after
          their account association is removed. To request removal of a report, include its URL in a
          private email to us. Infrastructure logs, backups, and provider records may follow
          separate retention schedules; we do not claim a fixed deletion period for them.
        </p>
        <p>
          Contact <a href={`mailto:${email}`}>{email}</a> to request access, correction, deletion,
          or help with your privacy choices. We may need to verify account ownership. We will
          consider requests under applicable law and explain any limits.
        </p>
        <h2>Changes</h2>
        <p>
          We update this page when our practices change and revise the date above. See our{' '}
          <Link href="/terms">Terms of Service</Link> for service use and limitations.
        </p>
      </article>
    </main>
  )
}
