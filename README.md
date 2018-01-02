[![Front-End Checklist Logo](https://github.com/thedaviddias/Front-End-Checklist/blob/master/src/img/banners/front-end-checklist-banner-light.jpg?raw=true)](https://frontendchecklist.io)

<h2 align="center"><a href="https://frontendchecklist.io">Front-End Checklist</a></h2>

<p align="center">
  <em>Das Front-End Checklist ist eine vollständige Liste aller wichtigen Elemente, die Sie für die Erstellung Ihrer Website / HTML-Seite benötigen.</em>
</p>

[![Join the chat at https://gitter.im/Front-End-Checklist/Lobby](https://badges.gitter.im/Front-End-Checklist/Lobby.svg)](https://gitter.im/Front-End-Checklist/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![Backers on Open Collective](https://opencollective.com/front-end-checklist/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/front-end-checklist/sponsors/badge.svg)](#sponsors)
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg)](https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/thedaviddias/front-end-checklist)
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

Diese Liste basiert auf der jahrelangen Erfahrung aus Frontend-Entwicklung, wobei die Ergänzungen aus einigen anderen Open-Source Checklisten stammen.

<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/HxqChNNHFKFaMpEpEikk4EM4/thedaviddias/Front-End-Checklist'>
  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/HxqChNNHFKFaMpEpEikk4EM4/thedaviddias/Front-End-Checklist.svg' />
</a>

## Inhaltsverzeichnis

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

## Wie nutze ich die Checkliste?

Alle Elemente in der **Front-End-Checkliste** werden für die meisten Projekte benötigt, aber einige Elemente können weggelassen werden oder sind nicht zwingend erforderlich (im Falle einer Administrations-Webanwendung benötigen Sie z.B. keinen RSS-Feed). Wir entschieden uns für 3 Flexibilitätsstufen:

* ![Low][low_img] _Niedrig_ bedeutet, dass der Artikel **empfohlen** ist, aber in bestimmten Situationen weggelassen werden kann..
* ![Medium][medium_img] _Mittel_ bedeutet, dass der Artikel **hoch empfohlen** ist und in einigen wirklich besonderen Fällen eventuell weggelassen werden kann. Einige Elemente, wenn sie weggelassen werden, können sich negativ auf die Performance oder SEO auswirken.
* ![High][high_img] _Hoch_ bedeutet, dass das Element aus einem bestimmten Grund **nicht weggelassen werden kann**. Sie können eine Funktionsstörung auf Ihrer Seite verursachen oder Probleme mit der Erreichbarkeit oder der Suchmaschinenoptimierung bewirken. Die Priorität beim testen muss sich zunächst auf diese Elemente beziehen.

Für einige Ressourcen benutzen wir folgende Emoticon:

* 📖: Dokumentation oder Artikel
* 🛠: Online-/ Test-Hilfen
* 📹: Medien oder Video Inhalte

---

## Head

> **Anmerkung:** Hier finden Sie [eine Liste von allem](https://github.com/joshbuchea/HEAD), die Sie im `<head>` eines HTML-Dokuments finden können.

### Meta tag

* [ ] **Doctype:** ![High][high_img] In HTML5 ist der Doctype eine erforderliche Präambel und steht ganz oben auf allen Ihren HTML-Seiten.

```html
<!-- Doctype HTML5 -->
<!doctype html>
```

> * 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*Die nächsten 3 Meta-Tags (Charset, X-UA Compatible und Viewport) müssen an erster Stelle im Head stehen.*

* [ ] **Charset:** ![High][high_img] Der Zeichensatz (UTF-8) ist korrekt deklariert.

```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medium][medium_img] Das X-UA-kompatible Meta-Tag ist vorhanden.

```html
<!-- Instruct Internet Explorer to use its latest rendering engine -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> * 📖 [Specifying legacy document modes (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport:** ![High][high_img] Das Viewport ist korrekt deklariert.

```html
<!-- Viewport for responsive web design -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

* [ ] **Titel:** ![High][high_img] Ein Titel wird auf allen Seiten verwendet (SEO: Google berechnet die Pixelbreite der im Titel verwendeten Zeichen und schneidet zwischen 472 und 482 Pixel ab. Das durchschnittliche Zeichenlimit liegt bei ca. 55 Zeichen).

```html
<!-- Document Title -->
<title>Seitentitel sollte e´weniger als 55 Zeichen haben</title>
```

> * 📖 [Title - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
> * 🛠 [SERP Snippet Generator](https://www.sistrix.com/serp-snippet-generator/)

* [ ] **Beschreibung:** ![High][high_img] Eine Meta-Beschreibung wird mitgeliefert, ist eindeutig und hat nicht mehr als 150 Zeichen.

```html
<!-- Meta Description -->
<meta name="description" content="Beschreibung der Seite mit weniger als 150 Zeichen.">
```

> * 📖 [Meta Description - HTML - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description)

* [ ] **Favicons:** ![Medium][medium_img] Jedes Favicon wurde erstellt und wird korrekt angezeigt. Wenn Sie nur ein `favicon.ico` haben, legen Sie es unter das Hauptverzeichnis Ihrer Website an. Normalerweise brauchen Sie kein Markup zu verwenden. Es ist jedoch immer noch eine gute Praxis, einen Link mit dem untenstehenden Beispiel zu erstellen. Heute wird das **PNG-Format gegenüber dem `.ico'-Format (Abmessungen: 32x32px) empfohlen.

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

* [ ] **Apple Web App Meta:** ![Low][low_img] Apple Meta-Tags sind vorhanden.

```html
<!-- Apple Touch Icon (at least 200x200px) -->
<link rel="apple-touch-icon" href="/custom-icon.png">

<!-- To run web application in full-screen -->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- Status Bar Style (see Supported Meta Tags below for available values) -->
<!-- Has no effect unless you have the previous meta tag -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

> * 📖 [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
> * 📖 [Supported Meta Tags](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

- [ ] **Windows Tiles:** ![Low][low_img] Windows tiles sind vorhanden und verlinkt.

```html
<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

Die minimal erforderliche XML-Markup für die Datei `browserconfig.xml` ist wie folgt:

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

* [ ] **Canonical:** ![Medium][medium_img] Verwenden Sie `rel="canonical"` um doppelte Inhalte zu vermeiden.

```html
<!-- Hilft um doppelte Inhalte zu vermeiden -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

> * 📖 [Use canonical URLs - Search Console Help - Google Support](https://support.google.com/webmasters/answer/139066?hl=en)
> * 📖 [5 common mistakes with rel=canonical - Google Webmaster Blog](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)

### HTML tags

* [ ] **Sprachattribute:** ![High][high_img] Das `lang` Attribut Ihrer Website ist spezifiziert und bezieht sich auf die Sprache der aktuellen Seite.

```html
<html lang="en">
```

* [ ] **Richtungsattribut:** ![Medium][medium_img] Die Richtung der Lesung wird auf dem HTML-Tag angegeben (es kann auch auf einem anderen HTML-Tag verwendet werden).

```html
<html dir="rtl">
```

> * 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternative Sprache:** ![Low][low_img] Das Sprach-Tag Ihrer Website ist spezifiziert und bezieht sich auf die Sprache der aktuellen Seite.

```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **Bedingte Kommentare:** ![Low][low_img] Bedingte Kommentare sind für IE (Internet Explorer) vorhanden, falls Sie es benötigen.

> * 📖 [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img] Wenn es sich bei Ihrem Projekt um einen Blog oder Artikel handelt, wurde ein RSS-Link bereitgestellt.

* [ ] **Inline kritisches CSS:** ![Medium][medium_img] CSS, das Inhalte formatiert, die während des Seitenaufrufs sofort sichtbar sind ("above the fold content"), wird als " kritisches CSS " bezeichnet. Es ist eingebettet vor dem eigentlichen CSS-Aufruf und zwischen `<style></style></style>` in einer einzigen Zeile (minified).
> * 🛠 [Critical by Addy Osmani on GitHub](https://github.com/addyosmani/critical) automates this.

* [ ] **CSS Reihenfolge:** ![High][high_img] Alle CSS-Dateien werden vor allen JavaScript-Dateien im `<head>` geladen. (Ausgenommen ist der Fall, dass manchmal JS-Dateien asynchron am Anfang der Seite geladen werden).

### Soziale Meta

Die beiden ***Facebook OG*** und ***Twitter Cards*** sind für jede Website sehr empfehlenswert. Die anderen Social-Media-Tags können in Betracht gezogen werden, wenn Sie eine bestimmte Präsenz gezielt ansprechen und die Anzeige sicherstellen wollen.

* [ ] **Facebook Open Graph:** ![Low][low_img] Alle Facebook Open Graph (OG) sind getestet und beinhalten keine fehlenden oder falschen Informationen. Bilder müssen mindestens 600 x 315 Pixel groß sein, jedoch wird die Größe 1200 x 630 Pixel empfohlen.

> **Anmerkung:** Durch die Verwendung von `og:image:width` und `og:image:height` werden die Bildabmessungen an den Crawler übergeben, so dass er das Bild sofort rendern kann, ohne es asynchron herunterladen und verarbeiten zu müssen.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<!-- Next tags are optional but recommended -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

> * 📖 [A Guide to Sharing for Webmasters](https://developers.facebook.com/docs/sharing/webmasters/)
> * 📖 [Best Practices - Sharing](https://developers.facebook.com/docs/sharing/best-practices/)
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

### Empfohlene Vorgehensweise

* [ ] **HTML5 Semantische Elemente:** ![High][high_img] HTML5 Semantische Elemente werden entsprechend verwendet (Header, Section, Footer, Main...).

> * 📖 [HTML Reference](http://htmlreference.io/)

* [ ] **Fehlerseiten:** ![High][high_img] Es existieren 404 und 5xx Fehlerseiten. Denken Sie daran, dass die 5xx-Fehlerseiten ihr CSS integriert haben müssen (kein externer Aufruf auf dem aktuellen Server).

* [ ] **Noopener:** ![Medium][medium_img] Falls Sie externe Links mit `target="_blank"`verwenden, sollte Ihr Link ein `rel="noopener"`-Attribut haben, um Tabulatoren zu verhindern. Wenn Sie ältere Versionen von Firefox unterstützen müssen, verwenden Sie `rel="noopener noreferrer"`.

> * 📖 [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Kommentare bereinigen:** ![Low][low_img] Unnötiger Code muss entfernt werden, bevor die Seite an die Online gestellt wird / in die Produktion geht.

### HTML testing

* [ ] **W3C konform:** ![High][high_img] Alle Seiten müssen mit dem W3C-Validator getestet werden, um mögliche Probleme im HTML-Code zu identifizieren.

> * 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] Ich benutze Tools, die mir helfen, Probleme mit meinem HTML-Code zu analysieren.

> * 🛠 [Dirty markup](https://dirtymarkup.com/)

> * 🛠 [Sonar a linting tool for the web](https://sonarwhal.com/)

* [ ] **Link überprüfen:** ![High][high_img] Es gibt keine defekten Links auf meiner Seite, vergewissern Sie sich, dass Sie keinen 404-Fehler haben.

> * 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Adblockers test:** ![Medium][medium_img] Ihre Website zeigt Ihren Inhalt korrekt mit aktivierten Adblockern an (Sie können eine Nachricht senden, die Leute dazu anregt, ihren Adblocker zu deaktivieren.

**[⬆ back to top](#table-of-contents)**

---

## Webfonts

> **Anmerkung:** Die Verwendung von Webfonts kann dazu führen, dass folgendes Problem auftauchT: Flash Of Unstyled Text/Flash Of Invisible Text - erwägen Sie, Fallback-Fonts und/oder Webfont-Loader zu verwenden, um das Problem zu vermeiden.
> * 📖 [Google Technical considerations about webfonts](https://developers.google.com/fonts/docs/technical_considerations)

* [ ] **Webfont Formate:** ![High][high_img] WOFF, WOFF2 und TTF werden von allen modernen Browsern unterstützt.

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Webfont Größe:** ![High][high_img] Die Größe der Webfonts überschreiten nicht 2 MB (inklusiver aller Varianten).

* [ ] **Webfont Loader:** ![Low][low_img] Kontrollieren Sie das Ladeverhalten von Webfonts mit einem Webfont Loader.

> * 🛠 [Typekit Web Font Loader](https://github.com/typekit/webfontloader)

**[⬆ back to top](#table-of-contents)**

---

## CSS

> **Anmerkung:** Werfen Sie einen Blick auf [CSS-Richtlinien](https://cssguidelin.es/) und [Sass-Richtlinien](https://sass-guidelin.es/), welches von den meisten Frontend Entwicklern genutzt wird. Wenn Sie nicht sicher über CSS-Eigenschaften sind, können Sie auch [CSS-Referenz] (http://cssreference.io/) besuchen. Es gibt auch einen kurzen [Code Guide] (http://codeguide.co/) über Konsistenz.

* [ ] **Responsive Web Design:** ![High][high_img] Die Website verwendet responsive Webdesign.
* [ ] **CSS Print:** ![Medium][medium_img] Ein Druck-Stylesheet wird mitgeliefert und ist auf jeder Seite korrekt.
* [ ] **Preprocessors:** ![Low][low_img] Ihr Projekt verwendet einen CSS-Präprozessor.
* [ ] **Unique ID:** ![High][high_img] Wenn IDs verwendet werden, sind sie eindeutig für eine Seite.
* [ ] **Reset CSS:** ![High][high_img] Ein CSS-Reset (Reset, Normalize oder Reboot) wird verwendet und ist aktuell. *(Wenn Sie ein CSS-Framework wie Bootstrap oder Foundation verwenden, ist eine Normalisierung bereits enthalten.)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS prefix:** ![Low][low_img] Alle Klassen (oder id-, die in JavaScript-Dateien verwendet werden) beginnen mit **js-** und werden nicht in die CSS-Dateien gestylt.

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **Eingebettet oder Inline-CSS:** ![High][high_img] Vermeiden Sie unbedingt die Einbettung von CSS in `<style>`-Tags oder die Verwendung von Inline-CSS: Verwenden Sie CSS nur aus triftigen Gründen (z.B. Hintergrundbild für Slider, kritisches CSS).
* [ ] **Vendor prefixes:** ![High][high_img] Es werden CSS-Herstellerpräfixe verwendet, die entsprechend der Kompatibilität mit Ihrem Browser generiert werden.

> * 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Performance

- [ ] **Concatenation:** ![High][high_img] CSS-Dateien werden in einer einzigen Datei zusammengefasst *(Not for HTTP/2)*.
- [ ] **Minification:** ![High][high_img] Alle CSS Dateien sind minified.
- [ ] **Non-blocking:** ![Medium][medium_img] CSS-Dateien müssen nicht blockiert werden, um zu verhindern, dass das DOM Zeit zum Laden benötigt.

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Example of preload CSS using loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **Nicht genutztes CSS:** ![Low][low_img] Entfernen Sie nicht genutztes CSS.

> * 🛠 [UnCSS Online](https://uncss-online.com/)
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)


### CSS testen

* [ ] **Stylelint:** ![High][high_img] Alle CSS- oder SCSS-Dateien sind fehlerfrei.

> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass guidelines](https://sass-guidelin.es/)

* [ ] **Responsive web design:** ![High][high_img] Alle Seiten wurden an den folgenden Breakpoints getestet: 320px, 768px, 1024px (kann je nach Analyse mehr / anders sein).

* [ ] **CSS Validator:** ![Medium][medium_img] Das CSS wurde getestet und entsprechende Fehler wurden korrigiert.

> * 🛠 [CSS Validator](https://jigsaw.w3.org/css-validator/)

* [ ] **Desktop Browsers:** ![High][high_img] Alle Seiten wurden mit allen gängigen Desktop-Browsern (Safari, Firefox, Chrome, Internet Explorer, EDGE...) getestet.
* [ ] **Mobile Browsers:**  ![High][high_img] Safari...) getestet.
* [ [  [ ª **OS:** ! !Alle Seiten wurden auf allen gängigen Betriebssystemen (Windows, Android, iOS, Mac...) getestet.

- [ ] **Pixel perfect:** ![High][high_img] Die Seiten sind nahezu pixelgenau. Abhängig von der Qualität der Kreativen, können Sie nicht 100% genau sein, sollten jedoch der Vorgabe sehr nahe liegen.

> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

* [ ] **Leserichtung:** ![High][high_img] Alle Seiten müssen auf LTR- und RTL-Sprachen getestet werden, wenn sie unterstützt werden sollen.

> * 📖 [Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ back to top](#table-of-contents)**

---

## Images

> **Anmerkung:** Für ein vollständiges Verständnis der Bildoptimierung, überprüfen Sie das kostenlose eBook **[Essential Image Optimization](https://images.guide/)** von Addy Osmani.

### Empfohlene Vorgehensweise

* [ ] **Optimierung:** ![High][high_img] All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage).

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 Use [ImageOptim](https://imageoptim.com/) to optimise your images for free.
> * 🛠 Use [Kraken.io](https://kraken.io/web-interface) awesome alternative for both png and jpg optimization. Up to 1mb per files on free plan.

* [ ] **Picture/Srcset:** ![Medium][medium_img] Sie verwenden picture/srcset, um das am besten geeignete Bild für das aktuelle Ansichtsfenster des Benutzers bereitzustellen.

> * 📖 [How to Build Responsive Images with srcset](https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/)

* [ ] **Retina:** ![Low][low_img] Sie stellen Layoutbilder 2x oder 3x zur Verfügung, unterstützen Retina-Darstellung.
* [ ] **Sprite:** ![Medium][medium_img] Kleine Bilder befinden sich in einer Sprite-Datei (im Falle von Icons können sie in einem SVG-Sprite-Bild sein).
* [ ] **Breite und Höhe:** ![High][high_img] Setzen Sie die Attribute `width` und `height` auf `<img>`, wenn die endgültige Größe des gerenderten Bildes bekannt ist (kann bei der CSS-Größe weggelassen werden).
* [ ] **Alternativer Text:** ![High][high_img] Alle `<img>` haben einen alternativen Text, der das Bild visuell beschreibt.

> * 📖 [Alt-texts: The Ultimate Guide](https://axesslab.com/alt-texts/)

* [ ] **Lazy loading:** ![Medium][medium_img] Bilder sind lazyloaded (Ein noscript Fallback wird immer zur Verfügung gestellt).

**[⬆ back to top](#table-of-contents)**

---

## JavaScript

### Empfohlene Vorgehensweise

* [ ] **JavaScript Inline:** ![High][high_img] Sie haben keinen JavaScript-Code inline (gemischt mit Ihrem HTML-Code).
* [ ] **Concatenation:** ![High][high_img] JavaScript-Dateien werden zusammengefügt.
* [ ] **Minification:** ![High][high_img] JavaScript-Dateien werden verkleinert (Sie können das Suffix `.min` hinzufügen).

> * 📖 [Minify Resources (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript Security:** ![High][high_img]

> * 📖 [Guidelines for Developing Secure Applications Utilizing JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)

* [ ] **`noscript` tag:** ![Medium][medium_img] Verwenden Sie den `<noscript>`-Tag im HTML-Body, wenn ein Skripttyp auf der Seite nicht unterstützt wird oder wenn das Skripting im Browser deaktiviert ist. Dies ist hilfreich beim Rendern schwerer Anwendungen wie React.js auf der Client-Seite, siehe [Beispiele](https://webdesign.tutsplus.com/tutorials/quick-tip-dont-forget-the-noscript-element--cms-25498).

```html
<noscript>
  Sie müssen JavaScript aktivieren um diese Seite anzeigen zu lassen.
</noscript>
```

* [ ] **Non-blocking:** ![Medium][medium_img] JavaScript-Dateien werden asynchron mit `async` oder verzögert mit `defer`-Attribut geladen.

> * 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low][low_img] Wenn Sie einige spezifische Funktionen benötigen, können Sie ein benutzerdefiniertes Modernizr verwenden, um Klassen in Ihrem `<html>`-Tag hinzuzufügen.

> * 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### JavaScript testen

* [ ] **ESLint:** ![High][high_img] ESLint kennzeichnet keine Fehler (basierend auf Ihren Konfigurations- oder Standardregeln).

> * 📖 [ESLint - The pluggable linting utility for JavaScript and JSX](https://eslint.org/)

**[⬆ back to top](#table-of-contents)**

---

## Security

### Scanne und überprüfe deine Webseite

> * [securityheaders.io](https://securityheaders.io/)
> * [Observatory by Mozilla](https://observatory.mozilla.org/)
> * [ASafaWeb - Automated Security Analyser for ASP.NET Websites](https://asafaweb.com/)

### Empfohlene Vorgehensweise

* [ ] **HTTPS:** ![Medium][medium_img] HTTPS wird auf allen Seiten und für alle externen Inhalte (Plugins, Bilder...) verwendet.

> * 🛠 [Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)
> * 🛠 [Free SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
> * 📖 [Strict Transport Security](http://caniuse.com/#feat=stricttransportsecurity)

* [ ] **HTTP Strict Transport Security (HSTS):** ![Medium][medium_img] Der HTTP-Header ist auf 'Strict-Transport-Security' gesetzt.

> * 🛠 [Check HSTS preload status and eligibility](https://hstspreload.org/)
> * 📖 [HTTP Strict Transport Security Cheat Sheet - OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
> * 📖 [Transport Layer Protection Cheat Sheet - OWASP](https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet)

* [ ] **Cross Site Request Forgery (CSRF):** ![High][high_img] Sie stellen sicher, dass die Anfragen an Ihre Server-Seite legitim sind und von Ihrer Website / App stammen, um CSRF-Angriffe zu verhindern.

> * 📖 [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

* [ ] **Cross Site Scripting (XSS):** ![High][high_img] Ihre Seite oder Website ist frei von XSS möglichen Problemen.

> * 📖 [XSS (Cross Site Scripting) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
> * 📖 [DOM based XSS Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet)

* [ ] **Content Type Optionen:** ![Medium][medium_img] Verhindert, dass Google Chrome und Internet Explorer versuchen, den Content-Type einer Antwort außerhalb des vom Server deklarierten Content-Typs zu mimen.

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO):** ![Medium][medium_img] Schützt Ihre Besucher vor Clickjacking-Angriffen.

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

* [ ] **Content Security Policy:** ![Medium][medium_img] Definiert, wie Inhalte auf Ihrer Website geladen werden und von wo aus sie geladen werden dürfen. Kann auch zum Schutz vor Clickjacking-Angriffen verwendet werden.

> * 📖 [Content Security Policy - An Introduction - Scott Helme](https://scotthelme.co.uk/content-security-policy-an-introduction/)
> * 📖 [CSP Cheat Sheet - Scott Helme](https://scotthelme.co.uk/csp-cheat-sheet/)
> * 📖 [CSP Cheat Sheet - OWASP](https://www.owasp.org/index.php/Content_Security_Policy_Cheat_Sheet)
> * 📖 [Content Security Policy Reference](https://content-security-policy.com/)

**[⬆ back to top](#table-of-contents)**

---

## Performance

### Empfohlene Vorgehensweise

- [ ] **Seitengröße:** ![High][high_img] Die Größe der Seite liegt zwischen 0 und 500 KB.

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

* [ ] **Minified HTML:** ![Medium][medium_img] Ihr HTML ist verkleinert.

* [ ] **Lazy loading:** ![Medium][medium_img] Bilder, Skripte und CSS müssen nachträglich geladen werden, um die Antwortzeit der aktuellen Seite zu verbessern (siehe Details in den jeweiligen Abschnitten).

* [ ] **Cookiegröße:** ![Medium][medium_img] Wenn Sie Cookies verwenden, stellen Sie sicher, dass jedes Cookie nicht mehr als 4096 Bytes und Ihr Domainname nicht mehr als 20 Cookies enthält.

> * 📖 [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [Browser Cookie Limits](http://browsercookielimits.squawky.net/)

* [ ] **Komponenten von Drittanbietern:** ![Medium][medium_img] iFrames von Drittanbietern oder Komponenten, die auf externe JS (wie z.B. Freigabeschaltflächen) angewiesen sind, werden nach Möglichkeit durch statische Komponenten ersetzt, wodurch Aufrufe an externe APIs eingeschränkt werden und die Aktivitäten Ihrer Benutzer privat bleiben.

> * 🛠 [Simple sharing buttons generator](https://simplesharingbuttons.com/)

### Vorbereitung anstehender Anfragen

> * 📖 [Explanation of the following techniques](https://css-tricks.com/prefetching-preloading-prebrowsing/)

* [ ] **DNS Resolution:** ![Low][low_img] DNS-Dienste von Drittanbietern, die eventuell benötigt werden, werden vorab während der Leerlaufzeit mit Hilfe von `dns-prefetch` aufgelöst.

```html
<link rel="dns-prefetch" href="https://example.com">
```

* [ ] **Preconnection:** ![Low][low_img] DNS-Lookup, TCP-Handshake und TLS-Verhandlungen mit Diensten, die bald benötigt werden, werden im Voraus während der Leerlaufzeit mit `preconnect` durchgeführt.

```html
<link rel="preconnect" href="https://example.com">
```

* [ ] **Prefetching:** ![Low][low_img] Ressourcen, die demnächst benötigt werden (z.B. Bilder mit langer Ladezeit), werden vorab während der Leerlaufzeit mit `prefetch` angefordert.

```html
<link rel="prefetch" href="image.png">
```

* [ ] **Preloading:** ![Low][low_img] Ressourcen, die in der aktuellen Seite benötigt werden (z.B. Skripte, die am Ende von `<body>` platziert werden), werden vorab mit `preload` geladen.

```html
<link rel="preload" href="app.js">
```

> * 📖 [Difference between prefetch and preload](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

### Performance testen

* [ ] **Google PageSpeed:** ![High][high_img] Alle Ihre Seiten wurden getestet (nicht nur die Homepage) und haben eine Punktzahl von mindestens 90/100.

> * 🛠 [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/)
> * 🛠 [Test your mobile speed with Google](https://testmysite.withgoogle.com)
> * 🛠 [WebPagetest - Website Performance and Optimization Test](https://www.webpagetest.org/)
> * 🛠 [GTmetrix - Website speed and performance optimization](https://gtmetrix.com/)

**[⬆ back to top](#table-of-contents)**

---

## Zugänglichkeit

> **Anmerkung:** Sie können folgende Playlist sich anschauen: [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹

### Empfohlene Vorgehensweise

- [ ] **Progressive Verbesserung:** ![Medium][medium_img] Wichtige Funktionen wie Hauptnavigation und Suche sollten ohne aktiviertes JavaScript funktionieren.

> * 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **Farbkontrast:** ![Medium][medium_img] Der Farbkontrast sollte mindestens WCAG AA (AAA für Mobiltelefone) passieren.

> * 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)

#### Überschriften

* [ ] **H1:** ![High][high_img] Alle Seiten haben eine H1, die nicht der Titel der Webseite ist.
* [ ] **Überschriften:** ![High][high_img] Überschriften sollten richtig und in der richtigen Reihenfolge (H1 bis H6) verwendet werden.

> * 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High][high_img] `<header>` has `role="banner"`.
- [ ] **Role navigation:** ![High][high_img] `<nav>` has `role="navigation"`.
- [ ] **Role main:** ![High][high_img] `<main>` has `role="main"`.

> * 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)
> * 📖 [ARIA roles categorization](https://www.w3.org/TR/wai-aria/roles#roles_categorization)

### Semantik

- [ ] **Es werden spezifische HTML5-Eingabetypen verwendet:** ![Medium][medium_img] Dies ist besonders wichtig für mobile Geräte, die kundenspezifische Tastaturen und Widgets für verschiedene Typen anzeigen.

> * 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### Formulare

* [ ] **Label:** ![High][high_img] Jedem Eingabeformular-Element ist ein Label zugeordnet. Falls ein Label nicht angezeigt werden kann, verwenden Sie stattdessen `aria-label`.

> * 📖 [Using the aria-label attribute - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Zugänglichkeit testen

* [ ] **Accessibility standards testing:** ![High][high_img] Verwenden Sie das WAVE-Tool, um zu testen, ob Ihre Seite die Standards für Zugänglichkeit erfüllt.

> * 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard Navigation:** ![High][high_img] Testen Sie Ihre Website mit nur Ihrer Tastatur in keiner festen Reihenfolge. Alle interaktiven Elemente sind erreichbar und nutzbar.
* [ ] **Screen-reader:** ![Medium][medium_img] Alle Seiten wurden in einem Screenreader (VoiceOver, ChromeVox, NVDA oder Lynx) getestet.
* [ ] **Focus style:** ![High][high_img] Wenn der Fokus deaktiviert ist, wird er durch den sichtbaren Zustand in CSS ersetzt.

> * 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ back to top](#table-of-contents)**

---

## SEO

* [ ] **Google Analytics:** ![High][high_img] Google Analytics ist installiert und korrekt konfiguriert.

> * 🛠 [Google Analytics](https://analytics.google.com/analytics/web/)
> * 🛠 [GA Checker (and others)](http://www.gachecker.com/)

* [ ] **Logik der Überschriften:** ![Medium][medium_img] Überschriftentext hilft, den Inhalt der aktuellen Seite zu verstehen.

> * 🛠 [Tota11y, tab Headings](http://khan.github.io/tota11y/#Try-it)

* [ ] **sitemap.xml:** ![High][high_img] Es existiert eine Sitemap.xml, die an die Google Search Console (früher Google Webmaster Tools) übermittelt wurde.

> * 🛠 [Sitemap Generator](https://websiteseochecker.com/html-sitemap-generator/)

* [ ] **robots.txt:** ![High][high_img] Robots.txt blockiert nicht die Webseite.

> * 📖 [The robots.txt file](https://varvy.com/robottxt.html)
> * 🛠 Testen Sie Ihre robots.txt mit [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

* [ ] **Strukturierte Daten:** ![High][high_img] Seiten mit strukturierten Daten werden getestet und sind fehlerfrei. Strukturierte Daten helfen Crawlern, den Inhalt der aktuellen Seite zu verstehen.

> * 📖 [Introduction to Structured Data - Search - Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 📖 [RDFa - Linked Data in HTML](https://rdfa.info/)
> * 📖 [JSON-LD](https://json-ld.org/)
> * 📖 [Microdata](https://www.w3.org/TR/microdata/)
> * 🛠 Testen Sie Ihre Seite mit [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)
> * 🛠 Vollständige Liste von Vokabularen, die als strukturierte Daten verwendet werden können. [Schema.org Full Hierarchy](http://schema.org/docs/full.html)

* [ ] **Sitemap HTML:** ![Medium][medium_img] Eine HTML-Sitemap wird mitgeliefert und ist über einen Link in der Fußzeile Ihrer Website zugänglich.

> * 📖 [Sitemap guidelines - Google Support](https://support.google.com/webmasters/answer/183668?hl=en)

* [ ] **Seitenumbruch-Link-Tags:** ![Medium][medium_img] Geben Sie `rel="prev"` und `rel="next"` an, um paginierte Inhalte anzuzeigen.

> * 🛠 [Pagination (rel="prev/next") Testing Tool](https://technicalseo.com/seo-tools/rel-prev-next/)

> * 📖 [Pagination guidelines - Google Support](https://support.google.com/webmasters/answer/1663744?hl=en)

```html
<!-- Example: Pagination link tags for page 2 of a paginated list -->
<link rel="prev" href="https://example.com/?page=1">
<link rel="next" href="https://example.com/?page=3">
```

**[⬆ back to top](#table-of-contents)**

---

## Übersetzungen

Die Frontend-Checkliste ist auch in anderen Sprachen verfügbar. Vielen Dank für alle Übersetzer und ihre großartige Arbeit!

* 🇯🇵 Japanese: [miya0001/Front-End-Checklist](https://github.com/miya0001/Front-End-Checklist)
* 🇪🇸 Spanish: [eoasakura/Front-End-Checklist-ES](https://github.com/eoasakura/Front-End-Checklist-ES)
* 🇨🇳 Chinese: [JohnsenZhou/Front-End-Checklist](https://github.com/JohnsenZhou/Front-End-Checklist)
* 🇰🇷 Korean: [kesuskim/Front-End-Checklist](https://github.com/kesuskim/Front-End-Checklist)
* 🇧🇷 Portuguese: [jcezarms/Front-End-Checklist](https://github.com/jcezarms/Front-End-Checklist)
* 🇻🇳 Vietnamese: [euclid1990/Front-End-Checklist](https://github.com/euclid1990/Front-End-Checklist)
* 🇹🇼 Traditional Chinese: [EngineLin/Front-End-Checklist](https://github.com/EngineLin/Front-End-Checklist)
* 🇫🇷 French: [ynizon/Front-End-Checklist](https://github.com/ynizon/Front-End-Checklist)
* 🇷🇺 Russian: [ungear/Front-End-Checklist](https://github.com/ungear/Front-End-Checklist)
* 🇹🇷 Turkish: [eraycetinay/Front-End-Checklist](https://github.com/eraycetinay/Front-End-Checklist)

---

## Front-End Checklist Badge

Wenn du zeigen willst, dass du die Regeln der Front-End-Checkliste befolgst, dann trage diesen Badge in deine README-Datei ein!

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

## Support

If you have any question or suggestion, don't hesitate to use Gitter or Twitter:

* [Chat on Gitter](https://gitter.im/Front-End-Checklist/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
* [Facebook](https://www.facebook.com/frontendchecklist/)
* [Twitter](https://twitter.com/thedaviddias)

## Authors

**[David Dias](https://github.com/thedaviddias/Front-End-Checklist)**

## Contributors

This project exists thanks to all the people who contribute. [[Contribute]](CONTRIBUTING.md).
<a href="https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors"><img src="https://opencollective.com/front-end-checklist/contributors.svg?width=890" /></a>


## Backers

Thank you to all our backers! 🙏 [[Become a backer](https://opencollective.com/front-end-checklist#backer)]

<a href="https://opencollective.com/front-end-checklist#backers" target="_blank"><img src="https://opencollective.com/front-end-checklist/backers.svg?width=890"></a>


## Sponsors

Support this project by becoming a sponsor. Your logo will show up here with a link to your website. [[Become a sponsor](https://opencollective.com/front-end-checklist#sponsor)]

<a href="https://opencollective.com/front-end-checklist/sponsor/0/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/0/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/1/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/1/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/2/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/2/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/3/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/3/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/4/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/4/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/5/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/5/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/6/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/6/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/7/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/7/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/8/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/8/avatar.svg"></a>
<a href="https://opencollective.com/front-end-checklist/sponsor/9/website" target="_blank"><img src="https://opencollective.com/front-end-checklist/sponsor/9/avatar.svg"></a>



## License

[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ back to top](#table-of-contents)**

[low_img]: https://front-end-checklist.now.sh/low.svg
[medium_img]: https://front-end-checklist.now.sh/medium.svg
[high_img]: https://front-end-checklist.now.sh/high.svg
