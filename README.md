# Front-End Checklist

[![Join the chat at https://gitter.im/Front-End-Checklist/Lobby](https://badges.gitter.im/Front-End-Checklist/Lobby.svg)](https://gitter.im/Front-End-Checklist/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg)](https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/thedaviddias/front-end-checklist)
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

The **Front-End Checklist** is an exhaustive list of all elements you need to have / to test before launching your site / HTML page to production.

It is based on Front-End developers' years of experience, with the additions coming from some other open-source checklists.

*Help to share the Front-End Checklist by voting and recommending on Product Hunt*
[![](http://res.cloudinary.com/djnyaloac/image/upload/v1508896898/upvote-producthunt_vzys4c.jpg)](https://www.producthunt.com/posts/front-end-checklist)

## Table of Contents

1. **[Head](#head)**
2. **[HTML](#html)**
3. **[Webfonts](#webfonts)**
4. **[CSS](#css)**
5. **[Images](#images)**
6. **[JavaScript](#javascript)**
7. **[Security](#security)**
8. **[Performance](#performance-1)**
9. **[Accessibility](#accessibility)**
10. **[SEO](#seo)**

## How to use?

All items in the **Front-End Checklist** are required for the majority of the projects, but some elements can be omitted or are not essential (in the case of an administration web app, you may not need RSS feed for example). We choose to use 3 levels of flexibility:

* ![Low][low_img] means that the item is **recommended** but can be omitted in some particular situations.
* ![Medium][medium_img] means that the item is **highly recommended** and can eventually be omitted in some really particular cases. Some elements, if omitted, can have bad repercussions in terms of performance or SEO.
* ![High][high_img] means that the item **can't be omitted** by any reason. You may cause a dysfunction in your page or have accessibility or SEO issues. The testing priority needs to be on these elements first.

Some resources possess an emoticon to help you understand which type of content / help you may find on the checklist:

* 📖: documentation or article
* 🛠: online tool / testing tool
* 📹: media or video content

---

## Head

> **Notes:** You can find [a list of everything](https://github.com/joshbuchea/HEAD) that could be found in the `<head>` of an HTML document.

### Meta tag

* [ ] **Doctype:** ![High][high_img] The Doctype is HTML5 and is at the top of all your HTML pages.

```html
<!-- Doctype HTML5 -->
<!doctype html>
```

> * 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*The next 3 meta tags (Charset, X-UA Compatible and Viewport) need to come first in the head.*

* [ ] **Charset:** ![High][high_img] The charset declared (UTF-8) is declared correctly.

```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medium][medium_img] The X-UA-Compatible meta tag is present.

```html
<!-- Instruct Internet Explorer to use its latest rendering engine -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> * 📖 [Specifying legacy document modes (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport:** ![High][high_img] The viewport is declared correctly.

```html
<!-- Viewport for responsive web design -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

* [ ] **Title:** ![High][high_img] A title is used on all pages (SEO: Google calculate the pixel width of the characters used in the title, cut off between 472 and 482 pixels. Average character limit would be around 55-characters).

```html
<!-- Document Title -->
<title>Page Title less than 65 characters</title>
```

> * 📖 [Title - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)

* [ ] **Description:** ![High][high_img] A meta description is provided, it is unique and doesn't possess more than 150 characters.

```html
<!-- Meta Description -->
<meta name="description" content="Description of the page less than 150 characters">
```

> * 📖[Meta Description - HTML - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description)

* [ ] **Favicons:** ![Medium][medium_img] Each favicon has been created and displays correctly. If you have only a `favicon.ico`, put it at the root of your site. Normally you won't need to use any markup. However, it's still good practice to link to it using the example below. Today, **PNG format is recommended** over `.ico` format (dimensions: 32x32px).

```html
<!-- Standard favicon -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
<!-- Recommended favicon format -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png">
```

> * 🛠 [Favicon Generator](https://www.favicon-generator.org/)
> * 🛠 [RealFaviconGenerator](https://realfavicongenerator.net/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
> * 📖 [Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS Tricks](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](https://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Touch Icon:** ![Low][low_img] Apple touch favicon apple-mobile-web-app-capable are present. *(Create your Apple Icon file with at least 200x200px dimension to support all dimensions that you may need)*

```html
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/custom-icon.png">
```

> * 📖 [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

- [ ] **Windows Tiles:**![Low][low_img] Windows tiles are present and linked.

```html
<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

Minimum required xml markup for the browserconfig.xml file is as follows:

```xml
<?xml version="1.0" encoding="utf-8"?>
<browserconfig>
   <msapplication>
     <tile>
        <square70x70logo src="small.png"/>
        <square150x150logo src="medium.png"/>
        <wide310x150logo src="wide.png"/>
        <square310x310logo src="large.png"/>
     </tile>
   </msapplication>
</browserconfig>
```

> * 📖 [Browser configuration schema reference](https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx)

* [ ] **Canonical:** ![Medium][medium_img] Use `rel="canonical"` to avoid duplicate content.

```html
<!-- Helps prevent duplicate content issues -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

> * 📖 [Use canonical URLs - Search Console Help - Google Support](https://support.google.com/webmasters/answer/139066?hl=en)
> * 📖 [5 common mistakes with rel=canonical - Google Webmaster Blog](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)

### HTML tags

* [ ] **Language attribute:** ![High][high_img] The `lang` attribute of your website is specified and related to the language of the current page.

```html
<html lang="en">
```

* [ ] **Direction attribute:** ![Medium][medium_img] The direction of lecture is specified on the html tag (It can be used on another HTML tag).

```html
<html dir="rtl">
```

> * 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternate language:** ![Low][low_img] The language tag of your website is specified and related to the language of the current page.

```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **Conditional comments:** ![Low][low_img] Conditional comments are present for IE if needed.

> * 📖 [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img] If your project is a blog or has articles, an RSS link was provided.

* [ ] **CSS Critical:** ![Medium][medium_img] The CSS critical (or "above the fold") collects all the CSS used to render the visible portion of the page. It is embedded before your principal CSS call and between `<style></style>` in a single line (minified).

> * 🛠 [Critical by Addy Osmani on Github](https://github.com/addyosmani/critical)

* [ ] **CSS order:** ![High][high_img] All CSS files are loaded before any JavaScript files in the `<head>`. (Except the case where sometimes JS files are loaded asynchronously on top of your page).

### Social meta

***Facebook OG*** and ***Twitter Cards*** are, for any website, highly recommended. The other social media tags can be considered if you target a particular presence on those and want to ensure the display.

* [ ] **Facebook Open Graph:** ![Low][low_img] All Facebook Open Graph (OG) are tested and no one is missing or with a false information. Images need to be at least 600 x 315 pixels, 1200 x 630 pixels recommended.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
```

> * 📖 [A Guide to Sharing for Webmasters](https://developers.facebook.com/docs/sharing/webmasters/)
> * 🛠 Test your page with the [Facebook OG testing](https://developers.facebook.com/tools/debug/)

* [ ] **Twitter Card:** ![Low][low_img]

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="https://example.com/page.html">
<meta name="twitter:title" content="Content Title">
<meta name="twitter:description" content="Content description less than 200 characters">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

> * 📖 [Getting started with cards — Twitter Developers](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)
> * 🛠 Test your page with the [Twitter card validator](https://cards-dev.twitter.com/validator)

**[⬆ back to top](#table-of-contents)**

---

## HTML

### Best practices

* [ ] **HTML5 Semantic Elements:** ![High][high_img] HTML5 Semantic Elements are used appropriately (header, section, footer, main...).

> * 📖 [HTML Reference](http://htmlreference.io/)

* [ ] **Error pages:** ![High][high_img] Error 404 page and 5xx exist. Remember that the 5xx error pages need to have their CSS integrated (no external call on the current server).

* [ ] **Noopener:** ![Medium][medium_img] In case you are using external links with `target="_blank"`, your link should have a `rel="noopener"` attribute to prevent tab nabbing. If you need to support older versions of Firefox, use `rel="noopener noreferrer"`.

> * 📖 [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Clean up comments:** ![Low][low_img] Unnecessary code needs to be removed before sending the page to production.

### HTML testing

* [ ] **W3C compliant:** ![High][high_img] All pages need to be tested with the W3C validator to identify possible issues in the HTML code.

> * 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] I use tools to help me analyze any issues I could have on my HTML code.

> * 🛠 [Dirty markup](https://dirtymarkup.com/)

* [ ] **Desktop Browsers:** ![High][high_img] All pages were tested on all current desktop browsers (Safari, Firefox, Chrome, Internet Explorer, EDGE...).
* [ ] **Mobile Browsers:**  ![High][high_img] All pages were tested on all current mobile browsers (Native browser, Chrome, Safari...).

* [ ] **Link checker:** ![High][high_img] There are no broken links in my page, verify that you don't have any 404 error.

> * 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Adblockers test:** ![Medium][medium_img] Your website shows your content correctly with adblockers enabled (You can provide a message encouraging people to disable their adblocker).

- [ ] **Pixel perfect:** ![High][high_img] Pages are close to pixel perfect. Depending on the quality of the creatives, you may not be 100% accurate, but your page needs to be close to your template.

> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

**[⬆ back to top](#table-of-contents)**

---

## Webfonts

* [ ] **Webfont format:** ![High][high_img] WOFF, WOFF2 and TTF are supported by all modern browsers.

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Webfont size:** ![High][high_img] Webfont sizes don't exceed 2 MB (all variants included).

**[⬆ back to top](#table-of-contents)**

---

## CSS

> **Notes:** Take a look at [CSS guidelines](https://cssguidelin.es/) and [Sass Guidelines](https://sass-guidelin.es/) followed by most  Front-End developers. If you have a doubt about CSS properties, you can visit [CSS Reference](http://cssreference.io/).

* [ ] **Responsive Web Design:** ![High][high_img] The website is using responsive web design.
* [ ] **CSS Print:** ![Medium][medium_img] A print stylesheet is provided and is correct on each page.
* [ ] **Preprocessors:** ![Low][low_img] Your page is using a CSS preprocessor ([Sass](http://sass-lang.com/) is preferred).
* [ ] **Unique ID:** ![High][high_img] If IDs are used, they are unique to a page.
* [ ] **Reset CSS:** ![High][high_img] A CSS reset (reset, normalize or reboot) is used and up to date. *(If you are using a CSS Framework like Bootstrap or Foundation, a Normalize is already included into it.)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS prefix:** ![Low][low_img] All classes (or id- used in JavaScript files) begin with **js-** and are not styled into the CSS files.

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **embedded or inline CSS:** ![High][high_img] Avoid at all cost embeding CSS in `<style>` tags or using inline CSS: only use for valid reasons (e.g. background-image for slider, critical CSS).
* [ ] **Vendor prefixes:** ![High][high_img] CSS vendor prefixes are used and are generated accordingly with your browser support compatibility.

> * 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Performance

- [ ] **Concatenation:** ![High][high_img] CSS files are concatenated in a single file. *(Not for HTTP/2)*
- [ ] **Minification:** ![High][high_img] All CSS files are minified.
- [ ] **Non-blocking:** ![Medium][medium_img] CSS files need to be non-blocking to prevent the DOM from taking time to load.

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Example of preload CSS using loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **Unused CSS:** ![Low][low_img] Remove unused CSS.

> * 🛠 [UnCSS Online](https://uncss-online.com/) 🛠
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)


### CSS testing

* [ ] **Stylelint:** ![High][high_img] All CSS or SCSS files are without any errors.

> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass guidelines](https://sass-guidelin.es/)

* [ ] **Responsive web design:** ![High][high_img] All pages were tested at the following breakpoints: 320px, 768px, 1024px (can be more / different according to your analytics).

* [ ] **CSS Validator:** ![Medium][medium_img] The CSS was tested and pertinent errors were corrected.

> * 🛠 [CSS Validator](https://jigsaw.w3.org/css-validator/)

* [ ] **Reading direction:** ![High][high_img] All pages need to be tested for LTR and RTL languages if they need to be supported.

> * 📖 [Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ back to top](#table-of-contents)**

---

## Images

> **Notes:** For a complete understanding of image optimization, check the free ebook **[Essential Image Optimization](https://images.guide/)** from Addy Osmani.

### Best practices

* [ ] **Optimization:** ![High][high_img] All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage).

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 Use [ImageOptim](https://imageoptim.com/) to optimise your images for free.

* [ ] **Retina:** ![Low][low_img] You provide layout images 2x or 3x, support retina display.
* [ ] **Sprite:** ![Medium][medium_img] Small images are in a sprite file (in the case of icons, they can be in an SVG sprite image).
* [ ] **Width and Height:** ![High][high_img] Set `width` and `height` attributes on `<img>` if the final rendered image size is known (can be omitted for CSS sizing).
* [ ] **Alternative text:** ![High][high_img] All `<img>` have an alternative text which describe the image visually.

> * 📖 [Alt-texts: The Ultimate Guide](https://axesslab.com/alt-texts/)

* [ ] **Lazy loading:** ![Medium][medium_img] Images are lazyloaded (A noscript fallback is always provided).

**[⬆ back to top](#table-of-contents)**

---

## JavaScript

### Best practices

* [ ] **JavaScript Inline:** ![High][high_img] You don't have any JavaScript code inline (mixed with your HTML code).
* [ ] **Concatenation:** ![High][high_img] JavaScript files are concatenated.
* [ ] **Minification:** ![High][high_img] JavaScript files are minified (you can add the `.min` suffix).

> * 📖 [Minify Resources (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript security:**

> * 📖 [Guidelines for Developing Secure Applications Utilizing JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)

* [ ] **Non-blocking:** ![Medium][medium_img] JavaScript files are loaded asynchronously using `async` or deferred using `defer` attribute.

> * 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low][low_img] If you need to target some specific features you can use a custom Modernizr to add classes in your `<html>` tag.

> * 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### JavaScript testing

* [ ] **ESLint:** ![High][high_img] No errors are flagged by ESLint (based on your configuration or standards rules).

> * 📖 [ESLint - The pluggable linting utility for JavaScript and JSX](https://eslint.org/)

**[⬆ back to top](#table-of-contents)**

---

## Security

### Scan and check your web site

> * [securityheaders.io](https://securityheaders.io/)
> * [Observatory by Mozilla](https://observatory.mozilla.org/)
> * [ASafaWeb - Automated Security Analyser for ASP.NET Websites](https://asafaweb.com/)

### Best practices

* [ ] **HTTPS:** ![Medium][medium_img] HTTPS is used on every pages and for all external content (plugins, images...).

> * 🛠 [Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)
> * 🛠 [Free SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
> * 📖 [Strict Transport Security](http://caniuse.com/#feat=stricttransportsecurity)

* [ ] **HTTP Strict Transport Security (HSTS):** ![Medium][medium_img] The HTTP header is set to 'Strict-Transport-Security'.

> * 🛠 [Check HSTS preload status and eligibility](https://hstspreload.org/)
> * 📖 [HTTP Strict Transport Security Cheat Sheet - OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
> * 📖 [Transport Layer Protection Cheat Sheet - OWASP](https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet)

* [ ] **Cross Site Request Forgery (CSRF):** ![High][high_img] You ensure that requests made to your server-side are legitimate and originate from your website / app to prevent CSRF attacks.

> * 📖 [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

* [ ] **Cross Site Scripting (XSS):** ![High][high_img] Your page or website is free from XSS possible issues.

> * 📖 [XSS (Cross Site Scripting) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
> * 📖 [DOM based XSS Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet)

* [ ] **Content Type Options** ![Medium][medium_img] Prevents Google Chrome and Internet Explorer from trying to mime-sniff the content-type of a response away from the one being declared by the server.

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO)** ![Medium][medium_img] Protects your visitors against clickjacking attacks.

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

**[⬆ back to top](#table-of-contents)**

---

## Performance

### Best practices

- [ ] **Weight page:** ![High][high_img] The weight of each page is between 0 and 500 KB.

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

- [ ] **Minified:** ![Medium][medium_img] Your HTML is minified.
> * 🛠 [W3C Validator](https://validator.w3.org/)

* [ ] **Lazy loading:** ![Medium][medium_img] Images, scripts and CSS need to be lazy loaded to improve the response time of the current page (See details in their respective sections).

* [ ] **Cookie size:** If you are using cookies be sure each cookie doesn't exceed 4096 bytes and your domain name doesn't have more than 20 cookies.

> * 📖 [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [Browser Cookie Limits](http://browsercookielimits.squawky.net/)

* [ ] **Third party components:** ![Medium][medium_img] Third party iframes or components relying on external JS (like sharing buttons) are replaced by static components when possible, thus limiting calls to external APIs and keeping your users activity private.

> * 🛠 [Simple sharing buttons generator](https://simplesharingbuttons.com/)

### Preparing upcoming requests

> * 📖 [Explanation of the following techniques](https://css-tricks.com/prefetching-preloading-prebrowsing/)

* [ ] **DNS resolution:** ![Low][low_img] DNS of third-party services that may be needed are resolved in advance during idle time using `dns-prefetch`.

```html
<link rel="dns-prefetch" href="https://example.com">
```

* [ ] **Preconnection:** ![Low][low_img] DNS lookup, TCP handshake and TLS negociation with services that will be needed soon is done in advance during idle time using `preconnect`.

```html
<link rel="preconnect" href="https://example.com">
```

* [ ] **Prefetching:** ![Low][low_img] Resources that will be needed soon (e.g. lazy loaded images) are requested in advance during idle time using `prefetch`.

```html
<link rel="prefetch" href="image.png">
```

* [ ] **Preloading:** ![Low][low_img] Resources needed in the current page (e.g. scripts placed at the end of `<body>`) in advance using `preload`.

```html
<link rel="preload" href="app.js">
```

> * 📖 [Difference between prefetch and preload](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

### Performance testing

* [ ] **Google PageSpeed:** ![High][high_img] All your pages were tested (not only the homepage) and have a score of at least 90/100.

> * 🛠 [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/)
> * 🛠 [Test your mobile speed with Google](https://testmysite.withgoogle.com)
> * 🛠 [WebPagetest - Website Performance and Optimization Test](https://www.webpagetest.org/)

**[⬆ back to top](#table-of-contents)**

---

## Accessibility

> **Notes:** You can watch the playlist [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹

### Best practices

- [ ] **Progressive enhancement:** ![Medium][medium_img] Major functionality like main navigation and search should work without JavaScript enabled.

> * 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **Color contrast:** ![Medium][medium_img] Color contrast should at least pass WCAG AA (AAA for mobile).

> * 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)

#### Headings

* [ ] **H1:** ![High][high_img] All pages have an H1 which is not the title of the website.
* [ ] **Headings:** ![High][high_img] Headings should be used properly in the right order (H1 to H6).

> * 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High][high_img] `<header>` has `role="banner"`.
- [ ] **Role navigation:** ![High][high_img] `<nav>` has `role="navigation"`.
- [ ] **Role main:** ![High][high_img] `<main>` has `role="main"`.

> * 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)

### Semantics

- [ ] **Specific HTML5 input types are used:** ![Medium][medium_img] This is especially important for mobile devices that show customized keypads and widgets for different types.

> * 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### Form

* [ ] **Label:** ![High][high_img] A label is associated with each input form element. In case a label can't be displayed, use `aria-label` instead.

> * 📖 [Using the aria-label attribute - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Accessibility testing

* [ ] **Accessibility standards testing:** ![High][high_img] Use the WAVE tool to test if your page respects the accessibility standards.

> * 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation:** ![High][high_img] Test your website using only your keyboard in a previsible order. All interactive elements are reachable and usable.
* [ ] **Screen-reader:** ![Medium][medium_img] All pages were tested in a screen-reader (VoiceOver, ChromeVox, NVDA or Lynx).
* [ ] **Focus style:** ![High][high_img] If the focus is disabled, it is replaced by visible state in CSS.

> * 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ back to top](#table-of-contents)**

---

## SEO

* [ ] **Google Analytics:** ![High][high_img] Google Analytics is installed and correctly configured.
* [ ] **Headings logic:** ![Medium][medium_img] Heading text helps to understand the content in the current page.
* [ ] **sitemap.xml:** ![High][high_img] A sitemap.xml exists and was submitted to Google Search Console (previously Google Webmaster Tools).
* [ ] **robots.txt:** ![High][high_img] The robots.txt is not blocking webpages.

> * 🛠 Test your robots.txt with [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

* [ ] **Structured Data:** ![High][high_img] Pages using structured data are tested and are without errors. Structured data helps crawlers understand the content in the current page.

> * 📖 [Introduction to Structured Data - Search - Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 🛠 Test your page with the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)
> * 🛠 Complete list of vocabularies that can be used as structured data. [Schema.org Full Heirarchy](http://schema.org/docs/full.html)

* [ ] **Sitemap HTML:** ![Medium][medium_img] An HTML sitemap is provided and is accessible via a link in the footer of your website.

> * 📖 [Sitemap guidelines - Google Support](https://support.google.com/webmasters/answer/183668?hl=en)
> * 🛠 [Sitemap generator](https://websiteseochecker.com/html-sitemap-generator/)


**[⬆ back to top](#table-of-contents)**

---

## Translation

The Front-End Checklist is also available in other languages. Thanks for all translators and their awesome work!

* 🇯🇵 Japanese: [miya0001/Front-End-Checklist](https://github.com/miya0001/Front-End-Checklist)
* 🇪🇸 Spanish: [eoasakura/Front-End-Checklist-ES](https://github.com/eoasakura/Front-End-Checklist-ES)
* 🇨🇳 Chinese: [JohnsenZhou/Front-End-Checklist](https://github.com/JohnsenZhou/Front-End-Checklist)
* 🇰🇷 Korean: [kesuskim/Front-End-Checklist](https://github.com/kesuskim/Front-End-Checklist)
* 🇧🇷 Portuguese: [jcezarms/Front-End-Checklist](https://github.com/jcezarms/Front-End-Checklist)
* 🇻🇳 Vietnamese: [euclid1990/Front-End-Checklist](https://github.com/euclid1990/Front-End-Checklist)

---

## Front-End Checklist Badge

If you want to show you are following the rules of the Front-End Checklist, put this badge on your README file!

➔ [![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)

```md
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
```

**[⬆ back to top](#table-of-contents)**

---

## Contributing

**Open an issue or a pull request to suggest changes or additions.**

### Guide

The **Front-End Checklist** repository consists of two branches:

#### 1. `master`

This branch consists of the `README.md` file that is automatically reflected on the [Front-End Checklist](http://frontendchecklist.com/) website.

#### 2. `develop`

This branch will be used to make some significant changes to the structure, content if needed. It is preferable to use the master branch to fix small errors or add a new item.

### Contributors

Check out all the super awesome [contributors](https://github.com/thedaviddias/frontendchecklist/graphs/contributors).

## Support

If you have any question or suggestion, don't hesitate to use Gitter or Twitter:

* [Chat on Gitter](https://gitter.im/Front-End-Checklist/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
* [Twitter](https://twitter.com/thedaviddias)

## Authors

**[David Dias](https://github.com/thedaviddias/Front-End-Checklist)**

## License

[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ back to top](#table-of-contents)**

[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png
