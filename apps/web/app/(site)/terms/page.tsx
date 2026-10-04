import Link from 'next/link'
import { getLegalContactEmail } from '@/lib/legal-contact'

export const metadata = {
  title: 'Terms of Service | Front-End Checklist',
  description: 'Terms for the Front-End Checklist website, plugins, and hosted MCP.',
  alternates: { canonical: '/terms' }
}

/** Describe service use, open-source licensing, and review limitations. */
export default function TermsPage() {
  const email = getLegalContactEmail()
  return (
    <main className="container-content py-12">
      <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl">
        <h1>Terms of Service</h1>
        <p>Last updated: October 4, 2026.</p>
        <p>
          David Dias provides the Front-End Checklist website, plugins, and hosted MCP. These terms
          describe your use of the hosted service. Questions or private support requests can be sent
          to <a href={`mailto:${email}`}>{email}</a>.
        </p>
        <h2>Using the service</h2>
        <p>
          Use the service only for content and websites you are authorized to review. Do not submit
          secrets, confidential information, or personal data unnecessarily. Do not attempt to
          bypass access controls, fetch private-network resources, disrupt the service, or use it
          for unlawful activity. Keep your sign-in account secure and review information before
          sharing a public profile, checklist, or audit report.
        </p>
        <h2>Review limits and your responsibility</h2>
        <p>
          Rules and automated findings are guidance. Static source checks and public-page audits can
          miss issues or produce false positives. They do not execute page JavaScript, measure
          real-user Web Vitals, or certify accessibility, security, or legal compliance. Confirm
          findings with appropriate testing and human review before making decisions or shipping
          changes. You remain responsible for your code, deployments, and compliance obligations.
        </p>
        <p>
          MCP tools are read-only. An AI client using the plugin may independently edit files or
          perform other actions with its own tools and permissions. That client's terms and policies
          apply to those actions. We do not control third-party clients or websites.
        </p>
        <h2>Your content and open-source materials</h2>
        <p>
          You retain rights to the content you submit. You authorize us to process it as necessary
          to provide the features you request, including displaying content you choose to share. The
          project's source code and bundled materials are distributed under their applicable
          licenses, including the{' '}
          <a href="https://github.com/thedaviddias/Front-End-Checklist/blob/main/LICENSE">
            MIT license
          </a>
          . These service terms do not replace those licenses or restrict rights they grant.
        </p>
        <h2>Availability and limits</h2>
        <p>
          The hosted service may change, become unavailable, or apply rate limits. We may restrict
          abusive use to protect users and infrastructure. Availability of a plugin in a third-party
          directory depends on that platform. We do not guarantee continuous access, complete
          findings, or a particular outcome.
        </p>
        <h2>Disclaimer and liability</h2>
        <p>
          To the extent permitted by applicable law, the service is provided as is, without
          warranties of accuracy, fitness for a particular purpose, or uninterrupted operation. To
          that same extent, David Dias is not liable for indirect or consequential losses arising
          from use of the service. Nothing in these terms excludes rights, warranties, or
          liabilities that applicable law does not allow to be excluded.
        </p>
        <h2>Privacy, account closure, and changes</h2>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> describes data handling and retention. You
          may stop using the service at any time and use Settings to delete your account. Contact us
          about removal of separately retained reports or email subscriptions. We may update these
          terms and will publish the revised date on this page.
        </p>
      </article>
    </main>
  )
}
