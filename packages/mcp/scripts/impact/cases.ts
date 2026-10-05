/** Hand-authored HTML benchmark tasks; grading data stays outside agent workspaces. */
export type Split = 'development' | 'held-out'
export interface Check {
  selector: string
  attribute?: string
  equals?: string
  nonempty?: boolean
  absent?: boolean
}
export interface ImpactTask {
  id: string
  split: Split
  category: string
  control: boolean
  prompt: string
  initial: string
  reference: string
  checks: Check[]
  preserve: Check[]
}

/** Declare one independent DOM assertion (text content when no attribute is given). */
function check(selector: string, attribute?: string, equals?: string): Check {
  return { selector, attribute, ...(equals === undefined ? { nonempty: true } : { equals }) }
}

/** Keep task definitions compact while retaining explicit requirements and reference patches. */
function task(
  id: string,
  category: string,
  prompt: string,
  initial: string,
  reference: string,
  checks: Check[],
  preserve: Check[],
  split: Split = 'development',
  control = false
): ImpactTask {
  return { id, category, prompt, initial, reference, checks, preserve, split, control }
}

export const IMPACT_TASKS: ImpactTask[] = [
  task(
    'product-photo',
    'images',
    'Give the product photo useful alternative text. Preserve the photo and product heading.',
    '<article><img src="/shoe.jpg"><h2>Trail shoe</h2></article>',
    '<article><img src="/shoe.jpg" alt="Trail shoe"><h2>Trail shoe</h2></article>',
    [check('img', 'alt')],
    [check('img', 'src', '/shoe.jpg'), check('h2', undefined, 'Trail shoe')]
  ),
  task(
    'chart-image',
    'images',
    'Describe the chart in alt text: sales rose 20% in June. Preserve its source.',
    '<img src="/sales.png">',
    '<img src="/sales.png" alt="Sales rose 20% in June">',
    [check('img', 'alt')],
    [check('img', 'src', '/sales.png')]
  ),
  task(
    'decorative-divider',
    'images',
    'Mark this purely decorative divider with an empty alt attribute. Preserve the source.',
    '<img src="/divider.svg">',
    '<img src="/divider.svg" alt="">',
    [check('img', 'alt', '')],
    [check('img', 'src', '/divider.svg')]
  ),
  task(
    'hero-dimensions',
    'images',
    'Reserve intrinsic dimensions of 1200 by 630 for this image. Preserve its source and alt text.',
    '<img src="/hero.jpg" alt="Mountain ridge">',
    '<img src="/hero.jpg" alt="Mountain ridge" width="1200" height="630">',
    [check('img', 'width', '1200'), check('img', 'height', '630')],
    [check('img', 'src', '/hero.jpg'), check('img', 'alt', 'Mountain ridge')]
  ),
  task(
    'avatar-dimensions',
    'images',
    'Reserve the 64 by 64 intrinsic image size. Preserve its source and alternative text.',
    '<img src="/ada.png" alt="Ada">',
    '<img src="/ada.png" alt="Ada" width="64" height="64">',
    [check('img', 'width', '64'), check('img', 'height', '64')],
    [check('img', 'src', '/ada.png'), check('img', 'alt', 'Ada')]
  ),
  task(
    'gallery-loading',
    'performance',
    'This image is far below the fold. Add native lazy loading and preserve its existing attributes.',
    '<img src="/gallery.jpg" alt="Gallery" width="800" height="600">',
    '<img src="/gallery.jpg" alt="Gallery" width="800" height="600" loading="lazy">',
    [check('img', 'loading', 'lazy')],
    [
      check('img', 'src', '/gallery.jpg'),
      check('img', 'alt', 'Gallery'),
      check('img', 'width', '800'),
      check('img', 'height', '600')
    ]
  ),
  task(
    'close-button',
    'accessibility',
    'Add aria-label="Close" to identify this action. Preserve the button and decorative icon.',
    '<button type="button"><svg aria-hidden="true"></svg></button>',
    '<button type="button" aria-label="Close"><svg aria-hidden="true"></svg></button>',
    [check('button', 'aria-label', 'Close')],
    [check('button', 'type', 'button'), check('svg', 'aria-hidden', 'true')]
  ),
  task(
    'search-button',
    'accessibility',
    'Name the icon button Search using aria-label. Keep the icon decorative.',
    '<button type="submit"><svg aria-hidden="true"></svg></button>',
    '<button type="submit" aria-label="Search"><svg aria-hidden="true"></svg></button>',
    [check('button', 'aria-label', 'Search')],
    [check('button', 'type', 'submit'), check('svg', 'aria-hidden', 'true')]
  ),
  task(
    'email-label',
    'accessibility',
    'Associate the visible Email label with the input using for and its existing id.',
    '<label>Email</label><input id="email" type="email" name="email">',
    '<label for="email">Email</label><input id="email" type="email" name="email">',
    [check('label', 'for', 'email')],
    [
      check('label', undefined, 'Email'),
      check('input', 'id', 'email'),
      check('input', 'type', 'email'),
      check('input', 'name', 'email')
    ]
  ),
  task(
    'message-label',
    'accessibility',
    'Connect the visible label to the textarea using for. Preserve the form field identity.',
    '<label>Message</label><textarea id="message" name="message"></textarea>',
    '<label for="message">Message</label><textarea id="message" name="message"></textarea>',
    [check('label', 'for', 'message')],
    [
      check('label', undefined, 'Message'),
      check('textarea', 'id', 'message'),
      check('textarea', 'name', 'message')
    ]
  ),
  task(
    'language-english',
    'i18n',
    'Declare English as the document language, preserving the page content.',
    '<html><head><title>Welcome</title></head><body><p>Hello</p></body></html>',
    '<html lang="en"><head><title>Welcome</title></head><body><p>Hello</p></body></html>',
    [check('html', 'lang', 'en')],
    [check('title', undefined, 'Welcome'), check('p', undefined, 'Hello')]
  ),
  task(
    'language-french',
    'i18n',
    'Declare French as the document language, preserving the page content.',
    '<html><head><title>Accueil</title></head><body><p>Bonjour</p></body></html>',
    '<html lang="fr"><head><title>Accueil</title></head><body><p>Bonjour</p></body></html>',
    [check('html', 'lang', 'fr')],
    [check('title', undefined, 'Accueil'), check('p', undefined, 'Bonjour')]
  ),
  task(
    'viewport-zoom',
    'accessibility',
    'Replace the viewport content with width=device-width, initial-scale=1 so users can zoom.',
    '<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    [check('meta', 'content', 'width=device-width, initial-scale=1')],
    [check('meta', 'name', 'viewport')]
  ),
  task(
    'viewport-scale',
    'accessibility',
    'Remove the maximum zoom restriction. Use content="width=device-width, initial-scale=1".',
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    [check('meta', 'content', 'width=device-width, initial-scale=1')],
    [check('meta', 'name', 'viewport')]
  ),
  task(
    'page-title',
    'seo',
    'Set the document title to Pricing | Acme. Preserve the heading.',
    '<html lang="en"><head><title></title></head><body><h1>Pricing</h1></body></html>',
    '<html lang="en"><head><title>Pricing | Acme</title></head><body><h1>Pricing</h1></body></html>',
    [check('title', undefined, 'Pricing | Acme')],
    [check('h1', undefined, 'Pricing'), check('html', 'lang', 'en')]
  ),
  task(
    'description',
    'seo',
    'Add a meta description with content="Compare Acme plans." inside the existing head. Preserve the title.',
    '<html><head><title>Plans</title></head><body></body></html>',
    '<html><head><title>Plans</title><meta name="description" content="Compare Acme plans."></head><body></body></html>',
    [check('head meta[name="description"]', 'content', 'Compare Acme plans.')],
    [check('title', undefined, 'Plans')]
  ),
  task(
    'button-type',
    'html',
    'This Cancel action must not submit its form. Add type="button" without changing its label.',
    '<form><button>Cancel</button></form>',
    '<form><button type="button">Cancel</button></form>',
    [check('button', 'type', 'button')],
    [check('form button', undefined, 'Cancel')]
  ),
  task(
    'password-autocomplete',
    'html',
    'Declare current-password autocomplete for this login field. Preserve its identity and type.',
    '<input type="password" name="password" id="password">',
    '<input type="password" name="password" id="password" autocomplete="current-password">',
    [check('input', 'autocomplete', 'current-password')],
    [
      check('input', 'type', 'password'),
      check('input', 'name', 'password'),
      check('input', 'id', 'password')
    ]
  ),
  task(
    'valid-decorative',
    'images',
    'Review only alternative text. This divider is decorative and already correct; leave the file unchanged.',
    '<img src="/line.svg" alt="">',
    '<img src="/line.svg" alt="">',
    [check('img', 'alt', '')],
    [check('img', 'src', '/line.svg')],
    'development',
    true
  ),
  task(
    'valid-text-button',
    'accessibility',
    'Review only the accessible name. Visible text already names this button; leave the file unchanged.',
    '<button type="button">Save</button>',
    '<button type="button">Save</button>',
    [check('button', undefined, 'Save')],
    [check('button', 'type', 'button')],
    'development',
    true
  ),
  task(
    'valid-viewport',
    'accessibility',
    'Review only zoom restrictions. This viewport allows zoom; leave the file unchanged.',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    [check('meta', 'content', 'width=device-width, initial-scale=1')],
    [check('meta', 'name', 'viewport')],
    'development',
    true
  ),
  task(
    'valid-language',
    'i18n',
    'Review only the language declaration. This English page is already correct; leave it unchanged.',
    '<html lang="en"><body>Hello</body></html>',
    '<html lang="en"><body>Hello</body></html>',
    [check('html', 'lang', 'en')],
    [check('body', undefined, 'Hello')],
    'development',
    true
  ),
  task(
    'valid-hero',
    'performance',
    'This is the above-the-fold LCP image. Review only lazy loading; eager loading is intentional. Leave unchanged.',
    '<img src="/lcp.jpg" alt="Home" loading="eager" width="1200" height="800">',
    '<img src="/lcp.jpg" alt="Home" loading="eager" width="1200" height="800">',
    [check('img', 'loading', 'eager')],
    [check('img', 'src', '/lcp.jpg')],
    'development',
    true
  ),
  task(
    'valid-same-tab',
    'security',
    'Review only opener isolation. This link opens in the same tab; leave it unchanged.',
    '<a href="/account">Account</a>',
    '<a href="/account">Account</a>',
    [check('a', 'href', '/account')],
    [check('a', undefined, 'Account')],
    'development',
    true
  ),
  task(
    'held-compound-image',
    'images',
    'Add useful alt text for a Kyoto garden and intrinsic dimensions 900 by 600. Preserve the source and caption.',
    '<figure><img src="/garden.jpg"><figcaption>Kyoto garden</figcaption></figure>',
    '<figure><img src="/garden.jpg" alt="Kyoto garden" width="900" height="600"><figcaption>Kyoto garden</figcaption></figure>',
    [check('img', 'alt'), check('img', 'width', '900'), check('img', 'height', '600')],
    [check('img', 'src', '/garden.jpg'), check('figcaption', undefined, 'Kyoto garden')],
    'held-out'
  ),
  task(
    'held-select-label',
    'accessibility',
    'Associate the Country label using for with the select. Preserve the option and field identity.',
    '<label>Country</label><select id="country" name="country"><option value="ca">Canada</option></select>',
    '<label for="country">Country</label><select id="country" name="country"><option value="ca">Canada</option></select>',
    [check('label', 'for', 'country')],
    [
      check('label', undefined, 'Country'),
      check('select', 'id', 'country'),
      check('select', 'name', 'country'),
      check('option', 'value', 'ca'),
      check('option', undefined, 'Canada')
    ],
    'held-out'
  ),
  task(
    'held-rtl-document',
    'i18n',
    'Declare Arabic and right-to-left direction on html. Preserve the text.',
    '<html><body><p>مرحبا</p></body></html>',
    '<html lang="ar" dir="rtl"><body><p>مرحبا</p></body></html>',
    [check('html', 'lang', 'ar'), check('html', 'dir', 'rtl')],
    [check('p', undefined, 'مرحبا')],
    'held-out'
  ),
  task(
    'held-download',
    'accessibility',
    'Give this icon link aria-label="Download report". Preserve its download target and decorative icon.',
    '<a href="/report.pdf" download><svg aria-hidden="true"></svg></a>',
    '<a href="/report.pdf" download aria-label="Download report"><svg aria-hidden="true"></svg></a>',
    [check('a', 'aria-label', 'Download report')],
    [
      check('a', 'href', '/report.pdf'),
      check('a', 'download', ''),
      check('svg', 'aria-hidden', 'true')
    ],
    'held-out'
  ),
  task(
    'held-form-actions',
    'html',
    'Make Preview type button and keep Send as submit. Preserve the form method and both action labels.',
    '<form method="post"><button id="preview">Preview</button><button id="send" type="submit">Send</button></form>',
    '<form method="post"><button id="preview" type="button">Preview</button><button id="send" type="submit">Send</button></form>',
    [check('#preview', 'type', 'button')],
    [
      check('form', 'method', 'post'),
      check('#preview', undefined, 'Preview'),
      check('#send', 'type', 'submit'),
      check('#send', undefined, 'Send')
    ],
    'held-out'
  ),
  task(
    'held-script-defer',
    'performance',
    'This external classic script can run after parsing. Add defer, preserving its source.',
    '<script src="/app.js"></script>',
    '<script src="/app.js" defer></script>',
    [check('script', 'defer', '')],
    [check('script', 'src', '/app.js')],
    'held-out'
  ),
  task(
    'held-valid-wrapped-label',
    'accessibility',
    'Review only label association. The input is already nested in its label; leave unchanged.',
    '<label>Email <input type="email" name="email"></label>',
    '<label>Email <input type="email" name="email"></label>',
    [check('label input', 'type', 'email')],
    [check('input', 'name', 'email')],
    'held-out',
    true
  ),
  task(
    'held-valid-module',
    'performance',
    'Review only script deferral. This module is deferred by default; leave unchanged.',
    '<script type="module" src="/module.js"></script>',
    '<script type="module" src="/module.js"></script>',
    [check('script', 'type', 'module')],
    [check('script', 'src', '/module.js')],
    'held-out',
    true
  )
]
