# Front-End Checklist
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/modern-front-end-checklist.svg)](https://github.com/thedaviddias/modern-front-end-checklist/graphs/contributors)

The **Front-End Checklist** is based on Front-End developers year of experiences, with the addition from Open-Source checklists.

## Table of Contents
1. **[How to use](#how-to-use)**
2. **[Head](#head)**
3. **[HTML](#html)**
4. **[Webfonts](#webfonts)**
5. **[CSS](#css)**
6. **[Images](#images)**
7. **[JavaScript](#javascript)**
8. **[Performance](#performance)**
9. **[Accessibility](#accessibility)**
10. **[SEO](#seo)**

## How to use?

All items in the **Front-End Checklist** are required for the majority of the project, but some elements can be omitted or not essential (in case of an administration web app, you may not need RSS feed for example). We choose to use 3 levels of flexibility:

* ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) means that the item is **recommended** but can be omitted in some particular situations.
* ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) means that the item is **highly recommended** and can eventually be omited in some really particular cases. Some elements, if omited, can have bad repercutions in terms of performance or SEO.
* ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) means you **can't be omitted** by any reason. You may cause a disfunction in your page or have 

Some resources posessed an emoticon to help you to understand which type of content / help:

* 📖: documentation or article
* 🛠: online tool / testing tool
* 📹: media or video content

---
## Head

> **Reference:** You can find [a list of everything](https://github.com/joshbuchea/HEAD) that could be found in the `<head>` of an HTML document.

### Meta tag

* [ ] **Doctype**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The Doctype is HTML5 and is in the top of all your HTML pages.
* 
```html
<!-- Doctype HTML5 -->
<!DOCTYPE html>
```
*The next 3 meta tags (Charset, X-UA Compatible and Viewport) need to come first in the head.*

* [ ] **Charset**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The charset declared (UTF-8) is declared correctly.
* 
```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) The X-UA-Compatible meta tag is present.
* 
```html
<!-- Set character encoding for the document -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> 📖 [Specifying legacy document modes (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The viewport is declared correctly
* 
```html
<!-- Viewport for responsive web design -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

* [ ] **Title**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) A title is used on all pages (SEO: No more than 65 characters, website title include)
* 
```html
<!-- Document Title -->
<title>Page Title less than 65 characters</title>
```

> 📖 [Title - HTML | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)

* [ ] **Description**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) A meta description is provided, unique and don't possessed more than 150 characters.
* 
```html
<!-- Meta Description -->
<meta name="description" content="Description of the page less than 150 characters">
```

* [ ] **Favicons**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Each favicons have been created and displays correctly. If you have only a ``favicon.ico``, put it at the root of your site. You will normally don't need to use any markup. However, its still good practice to link to it using the example below. Today, **PNG format is recommended** over ``.ico`` format.
*(Create your favicon file with at least 200px x 200px dimension to support all dimensions needed)*
 
* 
```html
<!-- Standard favicon -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico" />
<!-- Recommended favicon format -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png" />
``` 

> * 🛠 [Favicon Generator](https://www.favicon-generator.org/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
>  * 📖 [Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS Tricks](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](http://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Touch Icon**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) Apple touch favicon apple-mobile-web-app-capable are present (The logo needs to be 200px by 200px). 

* 
```html
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/custom-icon.png">
```

> * 📖 [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)


* [ ] **Canonical**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Use ``rel="canonical"`` is present to avoid duplicate content.

* 
```html
<!-- Helps prevent duplicate content issues -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

### HTML tags
* [ ] **Language tag**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The language tag of your website is specified and related to the language of the current page.
* 
```html
<body lang="en">
```

* [ ] **Direction tag**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) The direction of lecture is specified on the body tag (It can be used on another HTML tag).
* 
```html
<body dir="rtl">
```

* [ ] **Alternate language**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) The language tag of your website is specified and related to the language of the current page.
* 
```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **Conditional comments**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) Conditional comments are present for IE if needed.

> [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) If your projet is a blog or has articles, an RSS link was provided.

* [ ] **CSS Critical**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) The CSS critical (or "above the fold") collects all the CSS used to render the visible portion of the page. It is embeded before your principal CSS call and between ``<style></style>`` in a single line (minified).

> 🛠 [Critical by Addy Osmany on Github](https://github.com/addyosmani/critical)

* [ ] **CSS order**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All CSS files are loaded before any JavaScript files in the ``<head>``. (Except the case which sometimes JS files are loaded asynchronously on top of your page).

### Social meta

***Facebook OG*** and ***Twitter Cards*** are, for any website, highly recommanded. The other social media tags can be considered if you target a particular presence on those and want to ensure the display.

* [ ] **Facebook Open Graph**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) All Facebook Open Graph (OG) are tested and no one is missing or with a false information.

* 
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
 
* [ ] **Twitter Card**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png)

* 
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

http://html5doctor.com/element-index/

### Best practices

* [ ] **HTML5 Semantic Elements:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) HTML5 Semantic Elements are used appropriately (header, section, footer, main...)
* [ ] **Structured Data:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Pages using structured data are tested and are without errors.

> 🛠 Test your page with the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)

* [ ] **Error pages:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Error 404 page and 500 exist.
* [ ] **Noopener:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) In case you are using ``target="_blank"`` on your links, ``rel="noreferrer noopener"`` is present on the ``<img>``.
* [ ] **Clean up comments:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) Unnecessary code needs to be removed before sending the page to production.
  
### Testing

* [ ] **W3C compliant:**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All pages need to be tested with the W3C validator to identify possible issues in the HTML code.
 
> 🛠 [W3C validator]( )

* [ ] **HTML Lint:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) I use tools to help me analyse any issue I could have on my HTML code.

> 🛠 [Dirty markup](https://dirtymarkup.com/)

* [ ] **Link checker**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) There is no broken links in my page, verify that you don't have any 404 error.
 
> * 🛠 [W3C Link Checker](http://validator.w3.org/checklink)

**[⬆ back to top](#table-of-contents)**

---
## Webfonts

* [ ] **Webfront format:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) WOFF, WOFF2 and TTF are supported by all modern browers.
  
> 📖 [to cover the most recent browsers](https://caniuse.com). 

* [ ] **Webfont size**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Webfont size don't exceed 2 MO (all variant included)

**[⬆ back to top](#table-of-contents)**

---
## CSS

> **References:** Take a look on [CSS guidelines](https://cssguidelin.es/) and [Sass Guidelines](https://sass-guidelin.es/) followed by most of Front-End developers.

* [ ] **Responsve Web Design:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The website is using responsive web design.
* [ ] **CSS Print:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) A print stylesheet is provided and is correct on each page.
* [ ] **Preprocessors:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Your page is using of a CSS preprocessor ([Sass](http://sass-lang.com/) is preferred).
* [ ] **Unique ID:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) If ID are used, they are unique to a page
* [ ] **Reset CSS:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) A CSS reset (reset, normalize or reboot) is used and up to date. *(If you are using a CSS Framework like Twitter Bootstrap or Foundation a Normalize is already include into it.)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://v4-alpha.getbootstrap.com/content/reboot/)

* [ ] **JS prefix:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) All classes (or id- used in JavaScript files) begin with **js-** and are not styled into the CSS files.

* 
```html
<div id="js-slider" class="my-slider">
<!- Or ->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **CSS embed or line:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Avoid at all cost the use of CSS embed or inline: only is for valid reasons (ex: background-image for slider, CSS critical).
* [ ] **Vendor prefixes:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) CSS vendor prefixes are used and are generated accordingly with your browser support compatibility.

> 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Performance

- [ ] **Concatenation**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) CSS files are concatened in a single file *(Not for HTTP2)*
- [ ] **Minification**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All CSS files are minified. *(Not for HTTP2)* 
- [ ] **Non-blocking:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) CSS files need to be non-blocking to prevent the DOM to take time to load.

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)

- [ ] **Unused CSS:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) Remove unused CSS

> * 🛠 [UnCSS Online](https://uncss-online.com/) 🛠
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)


### CSS testing

* [ ] **Stylelint**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All CSS or SCSS files are without any error. 

> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass guidelines](https://sass-guidelin.es/)

* [ ] **CSS Validator:**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) The CSS was tested and pertinents errors were corrected.

> 🛠 [CSS Validator](http://jigsaw.w3.org/css-validator/)

* [ ] **Debug CSS**: ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) Pages were tested with DebugCSS

> 🛠 [Debug CSS](http://yahoo.github.io/debugCSS) (you can use the bookmarklet)

* [ ] **Reading direction**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All pages need to be tested for LTR and RTL languages if they need to be supported.

**[⬆ back to top](#table-of-contents)**

---
## Images

For a complete understanding of image optimizations, check the free ebook **[Essential Image Optimization](https://images.guide/)** from Addy Osmani.

### Best practices
* [ ] **Optimization:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage).

> Imagemin

* [ ] **Retina:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) You provide layout images x2, support retina display
* [ ] **Sprite:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Small images are in a sprite file (in case of icons, they can be in an SVG sprite image).
* [ ] **Height and width:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All ``<img>`` have height and width set (Don't specify px or %)
* [ ] srcset

> ***Note:*** Lot of developers assume that width and height are not compatible with responsive web design. It's absolutely not the case.

* [ ] **Alternative text:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All ``<img>`` have an alternative text which describe the image visually.
* [ ] **Lazy loading:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Images are lazyloaded (A noscript fallback is always provided)

**[⬆ back to top](#table-of-contents)**

---
## JavaScript

### Best practices

- [ ] **Concatenation:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) JavaScript files are concatened
- [ ] **Minification:**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) JavaScript files are minified (and have the ``.min`` suffix)
* [ ] **Non-blocking:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) JavaScript files are loaded asynchronously using ``async`` or deferred using ``defer`` attribute.

> 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png) If you need to target some specific features you can use a custom Modernizr to add classes in your ``<html>`` tag.

> 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### JavaScript testing

* [ ] **ESLint:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) No errors are flaged by ESLint (base on your configuration or standards rules)

**[⬆ back to top](#table-of-contents)**

---
## Performance

### Best practices

- [ ] **Weight page:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The weight of each page is between 0ko and 500ko
- [ ] **Minified:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Your HTML is minified
> 🛠 [W3C Validator](http://validator.w3.org/)
 
* [ ] **Lazy loading:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Images, scripts and css need to be lazy loaded to improve the response time of the current page (See details in their respective sections).

**[⬆ back to top](#table-of-contents)**

---
## Accessibility

**Accessibility**

> **References:**
>  
> * [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹

### Best practices

- [ ] **Progressive enhancement:** ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Major functionality like main navigation and search should work without JavaScript enable.

> 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **Color contrast**: ![Medium](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png) Color contrast should at least pass WCAG AA (AAA for mobile)

> 🛠 [Contrast ratio](http://leaverou.github.io/contrast-ratio/)

#### Headings

* [ ] **H1**: ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) All pages have an H1 which is not the title of the website.
* [ ] **Headings:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Headings sould be used properly in the right order (H1 to H6 )

> 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) ``<header>`` has ``role="banner"``
- [ ] **Role navigation:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) ``<nav>`` has ``role="navigation"``
- [ ] **Role main:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) ``<main>`` has ``role="main"``

### Semantics

- [ ] **Specific HTML5 input types are used**: This is especially important for mobile devices that show customized keypads and widgets for different types.

> 📖 [Mobile Input Types](http://mobileinputtypes.com/)*

### Form
* [ ] **Label:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) A label is associated with each input form element (for attribute) or aria

### Testing
* [ ] **Accessibility standards testing:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Use the WAVE tool to test if your page respect the accessibility standards.
> 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation**: Test your website using only your keyboard in a previsible order

- [ ] **Focus style**: If the focus is disabled, it is replaced by visible state in CSS
*
> 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ back to top](#table-of-contents)**

---
## SEO

- [ ] **Google Analytics:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) Google Analytics is installed and correctly configured.
- [ ] **sitemap.xml:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) A sitemap.xml exist and was submit in Google Search Console (ex:Google Webmaster Tools)
- [ ] **robot.txt:** ![High](http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png) The robot.txt is not blocking webpages
Linked your website to the Google webmaster tools
* [ ] **Sitemap HTML:** A HTML sitemap is provided and accessible by a link in the footer of your website.

**[⬆ back to top](#table-of-contents)**

---
## Contributing

**Open an issue or a pull request to suggest changes or additions.**

### Guide

The **Front-End Checklist** repository consists of two branches:

#### 1. `master`

This branch consists of the `README.md` file that is automatically reflected on the [Front-End Checklist](http://frontendchecklist.com/) website.

#### 2. `develop`

This branch will be used to make some significant changes to the structure, content if needed. Prefer using the master branch to fix small errors or add a new item.

### Contributors

Check out all the super awesome [contributors](https://github.com/thedaviddias/frontendchecklist/graphs/contributors).

## Authors

**[David Dias]()**, **[Geoffrey Signorato](https://github.com/geosenna)**, **[Sandeep Ramgolam](https://twitter.com/__Sun__)** and **[Cédric Poilly](https://github.com/CedricPoilly)**.

## License

[![CC0](http://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ back to top](#table-of-contents)**







