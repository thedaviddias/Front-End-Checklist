[![Front-End Checklist Logo](https://github.com/thedaviddias/Front-End-Checklist/blob/master/src/img/banners/front-end-checklist-banner-light.jpg?raw=true)](https://frontendchecklist.io)

<h2 align="center"><a href="https://frontendchecklist.io">Front-End Checklist</a></h2>

<p align="center">
  <em>Die Front-End Checklist ist eine gründlich erstellte liste von sämtlichen Elementen, welche du benötigst / um deine Seite/HTML Seite vor dem produktiven Start zu testen.</em>
</p>

[![Join the chat at https://gitter.im/Front-End-Checklist/Lobby](https://badges.gitter.im/Front-End-Checklist/Lobby.svg)](https://gitter.im/Front-End-Checklist/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
[![Backers on Open Collective](https://opencollective.com/front-end-checklist/backers/badge.svg)](#backers) [![Sponsors on Open Collective](https://opencollective.com/front-end-checklist/sponsors/badge.svg)](#sponsors)
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg)](https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/thedaviddias/front-end-checklist)
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

Diese Liste basiert auf jahrelanger Erfahrung von Front-End Entwicklern und einigen Zusätzen aus anderen Open Source Checklisten. 

## Inhaltsverzeichnis

1. **[Head](#head)**
2. **[HTML](#html)**
3. **[Webfonts](#webfonts)**
4. **[CSS](#css)**
5. **[Bilder](#images)**
6. **[JavaScript](#javascript)**
7. **[Sicherheit](#security)**
8. **[Leistung](#performance-1)**
9. **[Zugänglichkeit](#accessibility)**
10. **[SEO/Suchmaschinenoptimierung](#seo)**

## Wie benutzt man es?

Alle Punkte in der **Front-End Checklist**, werden für den Großteil von Projekten benötigt, jedoch sind manche Elemente nicht grundlegend wichtig, oder können weggelassen werden. Zum Beispiel benötigt man nicht unbedingt einen RSS Feed für eine Administrative Web App. Wir haben uns für 3 "Level" der Flexibilität entschieden:

* ![Low][low_img] bedeutet, dass es **empfohlen** wird, jedoch kann es in speziellen Situationen weggelassen werden.
* ![Medium][medium_img] bedeutet, dass es **stark empfohlen** wird, jedoch kann es in wirklich stark speziellen Situationen ausgelassen werden. Sollte man manche Elemente davon weglassen, kann dies schlechte Auswirkungen auf die Leistung, oder auf die Suchmaschinenoptimierung haben. 
* ![High][high_img] bedeutet, dass dieses "Item" **nicht ausgelassen** werden darf, egal aus was für einem Grund! Sonst kann es dadurch zu Fehlfunktionen der Seite, Zugriffsstörungen bei der Suchmaschinenoptimierung, oder andere Probleme geben. Die Priorität der Tests, sollte bei diesen Elementen die höchste Priorität haben. 

Manche Hilfsquellen haben ein Emoticon, damit du besser verstehen kannst um welchen Inhalt es sich handelt:

* 📖: Dokumentation oder Artikel
* 🛠: Online Tool / Tool zum testen
* 📹: Media oder Videoinhalt

---

## Head

> **Information:** Du findest [eine Liste von allem](https://github.com/joshbuchea/HEAD) was im `<head>` eines HTML Dokumentes vorkommt in diesem Link.

### Meta Element

* [ ] **Doctype:** ![High][high_img] Der Dokumententyp ist HTML5 and ist auf all deinen HTML Seiten ganz oben eingetragen.

```html
<!doctype html> <!-- HTML5 -->
```

> * 📖 [Bestimmen der Zeichenkodierung - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*Die nächsten 3 meta tags (Charset, X-UA Compatible and Viewport) kommen ganz nach oben im head Teil der HTML Seite.*

* [ ] **Charset:** ![High][high_img] Das charset (UTF-8) ist richtig angegeben worden.

```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medium][medium_img] Das X-UA-Compatible meta tag ist präsent.

```html
<!-- Weist den Internet Explorer an, die neuste "Rendering engine" zu benutzen  -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> * 📖 [Spezifizieren von älteren Dokumentmodi (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Ansichtsfenster/Viewport:** ![High][high_img] Das Ansichtsfenster ist korrekt deklariert.

```html
<!-- Ansichtsfenster für responsives Webdesign -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

* [ ] **Titel:** ![High][high_img] Ein Titel wird auf allen Seiten genutzt (SEO: Google kalkuliert zum Beispiel die Pixelbreite der Zeichen, welche im Titel verwendet werden und schneidet den Titel zwischen 472 und 482 Pixel. Das Durchschnittszeichenlimit liegt bei ca. 55 Zeichen).

```html
<!-- Dokument Titel -->
<title>Page Title less than 55 characters</title>
```

> * 📖 [Titel - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
> * 🛠 [SERP Snippet Generator](https://www.sistrix.com/serp-snippet-generator/)

* [ ] **Beschreibung:** ![High][high_img] Eine meta Beschreibung ist vorausgesetzt, ist einzigartig und besitzt nicht mehr als 150 Zeichen.

```html
<!-- Meta Beschreibung -->
<meta name="Beschreibung" content="Description of the page less than 150 characters">
```

> * 📖 [Meta Beschreibung - HTML - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description)

* [ ] **Favicons/Symbol:** ![Medium][medium_img] Jedes favicon wurde erstellt und korrekt angezeigt. Wenn du nur ein `favicon.ico` hast, setze es nach oben an den Anfang deiner Seite. Normalerweise braucht ein favicon kein spezielles Highlight mehr, jedoch ist es eine gute und saubere Arbeitsmethode, wenn man es so verlinkt wie in dem Beispiel unten drunter. Heutzutage, **wird PNG Formatierung** über `.ico` Formatierung empfohlen. (Maße: 32x32px).

```html
<!-- Standard favicon -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
<!-- Empfohlenes favicon Format -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png">
```

> * 🛠 [Favicon Generator](https://www.favicon-generator.org/)
> * 🛠 [RealFaviconGenerator](https://realfavicongenerator.net/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
> * 📖 [Favicons, Touch Icons, Tile Icons, etc. Was benötigst du? - CSS Tricks](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](https://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Web App Meta:** ![Low][low_img] Apple meta-tags sind vorhanden.

```html
<!-- Apple Touch Icon (mindestens 200x200px) -->
<link rel="apple-touch-icon" href="/custom-icon.png">

<!-- Um die Web Applikation im Fullscreen laufen zu lassen-->
<meta name="apple-mobile-web-app-capable" content="yes">

<!-- Status Bar Style (siehe die unterstützten Meta Tags unten drunter für verfügbare Werte) -->
<!-- Hat keinen Effekt, außer du hast den vorherigen Meta Tag  -->
<meta name="apple-mobile-web-app-status-bar-style" content="black">
```

> * 📖 [Konfigurieren von Web Applikationen](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
> * 📖 [Unterstützte Meta Tags](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html)

- [ ] **Windows Kacheln/Tiles:** ![Low][low_img] Windows Kacheln sind vorhanden und verknüpft.

```html
<!-- Microsoft Kacheln -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

Das minimal benötigte xml markup/Auszeichnung für die Datei `browserconfig.xml` lautet wie folgt:

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

> * 📖 [Browser Konfigurations Schema Empfehlung](https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx)

* [ ] **Autorisiert/Canonical:** ![Medium][medium_img] Nutze `rel="canonical"` um duplizierten Inhalt zu vermeiden.

```html
<!-- Hilft vorbeugend gegen Probleme mit dupliziertem Inhalt  -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-read.html">
```

> * 📖 [Nutze autorisierte/anerkannte URLs - Such Konsolen Hilfe - Google Support](https://support.google.com/webmasters/answer/139066?hl=en)
> * 📖 [5 der häufigsten Fehler mit rel=canonical - Google Webmaster Blog](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)

### HTML Tags

* [ ] **Sprachen Attribut:** ![High][high_img] Das `lang` Attribut deiner Webseite ist spezifiziert und verbunden mit der derzeitigen Seite.

```html
<html lang="en">
```

* [ ] **dir Attribut/Direction attribute:** ![Medium][medium_img] Das Direction/Ausrichtungsattribut der Leserichtung ist spezifiziert im HTML Tag. (Es kann in einem anderen HTML Tag benutzt werden).

```html
<html dir="rtl">
```

> * 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternative Sprache/Alternate language:** ![Low][low_img] Das Sprachtag deiner Webseite ist spezifiziert und zugehörig zu der Sprache deiner derzeitigen Seite.

```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **Bedingte Kommentare/Conditional comments:** ![Low][low_img] Bedingte Kommentare sind vorfindlich für den IE, falls benötigt.

> * 📖 [Über bedingte Kommentare (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img] Wenn dein Projekt ein Blog ist, oder diverse Artikel besitzt, kann man es mit einem RSS Link ausstatten.

* [ ] **Kritischer Pfad/CSS Critical:** ![Medium][medium_img] Der kritische Pfad (oder "minified CSS") sammelt all das CSS, welches benötigt wird um die Seite zu rendern. Es ist vor dem hauptsächlichen CSS eingebettet und steht zwischen `<style></style>` in einer Einzelzeile (minimiert).

> * 🛠 [Critical von Addy Osmani on GitHub](https://github.com/addyosmani/critical) automatisiert dies.

* [ ] **CSS Reihenfolge/CSS order:** ![High][high_img] Alle CSS Dateien, werden vor den JavaScript Dateien im Bereich `<head>` geladen. (Außer im Sonderfall, wo manchmal JS Dateien asynchron am Anfang der Seite geladen werden ).

### Soziales meta

***Facebook OG*** und ***Twitter Cards***, werden für jede Webseite empfohlen. Die anderen sozialen Medien Tags, können je nach Ziel/Zielgruppe noch hinzugefügt werden.

* [ ] **Facebook Open Graph:** ![Low][low_img] Alle "Facebook Open Graph" (OG) wurden getestet. Keiner fehlt oder besitzt falsche Informationen. Bilder müssen mindestens 600 x 315 Pixel haben, empfohlen wird jedoch 1200 x 630.

> **Information:** Das nutzen von `og:image:width` und `og:image:height` spezifiziert die Dimension des Bildes zum Crawler, damit das Bild direkt gerendert wird, ohne asynchronen Download.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Content Title">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="en_US">
<!-- Die nächsten Tags sind optional, werden aber empfohlen -->
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
```

> * 📖 [Eine Anleitung zum teilen für Webmaster ](https://developers.facebook.com/docs/sharing/webmasters/)
> * 📖 [Best Practices - Sharing](https://developers.facebook.com/docs/sharing/best-practices/)
> * 🛠 Teste deine Seite mit [Facebook OG testing](https://developers.facebook.com/tools/debug/)

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

> * 📖 [Starte mit den cards von Twitter — Twitter Developers](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)
> * 🛠 Teste deine Seite mit [Twitter card validator](https://cards-dev.twitter.com/validator)

**[⬆ Zurück zum Anfang](#table-of-contents)**

---

## HTML

### Best practices/Erfolgsmethode

* [ ] **HTML5 Semantische Elemente:** ![High][high_img] Semantische Elemente in HTML5, werden passend genutzt (header, section, footer, main...).

> * 📖 [HTML Referenz](http://htmlreference.io/)

* [ ] **Fehler Seiten/Error pages:** ![High][high_img] Error 404 und 5xx existieren. Denk dran, dass die 5xx Error Seiten, ihr CSS mit integriert haben müssen (also kein externer Aufruf zum momentanen Server).

* [ ] **Noopener:** ![Medium][medium_img] Im Falle, dass du externe Links mit `target="_blank"` nutzt sollte dein Link ein `rel="noopener"` Attribut besitzen um "tab nabbing" vorzubeugen. Solltest du ältere Versionen von Firefox supporten müssen, benutze `rel="noopener noreferrer"`.

> * 📖 [Über rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Aufräum Kommentare/Clean up comments:** ![Low][low_img] Unwichtiger Code muss entfernt werden, bevor die Seite zur Produktion übergeht. 

### HTML testing

* [ ] **W3C konform:** ![High][high_img] Jede Seite muss mit dem W3C Validierer getestet werden, um mögliche Fehler im HTML Code festzustellen.

> * 🛠 [W3C Validierer](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] Ich nutze Tools, welche mir helfen diverse Fehler in meinem HTML Code zu finden.

> * 🛠 [Dirty markup](https://dirtymarkup.com/)

> * 🛠 [Sonar ein linting tool für das Web](https://sonarwhal.com/)

* [ ] **Link checker:** ![High][high_img] Es sind keine kaputten Links auf meiner Seite. So stelle ich sicher, dass keine 404 Errors geworden werden.

> * 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Adblockers Test:** ![Medium][medium_img] Deine Webseite zeigt deinen Inhalt korrekt an, wenn Nutzer ihren Adblocker aktiviert haben. (Du kannst Nachrichten vorschalten, welche die Nutzer dazu auffordert, ihren Adblocker auszuschalten).



**[⬆ Zurück zum Anfang](#table-of-contents)**

---

## Webfonts

> **Information:** Das nutzen von Webfonts kann zu "Flash Of Unstyled Text/Flash of Invisible Text" führen. Erwäge mit "fallback fonts" und/oder "webfont loaders" zu benutzen. 
> * 📖 [Google's technische Betrachtung über Webfonts](https://developers.google.com/fonts/docs/technical_considerations)

* [ ] **Webfont Format:** ![High][high_img] WOFF, WOFF2 und TTF werden von allen modernen Browsern unterstützt.

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Nutzen von @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Webfont Größe/webfont size:** ![High][high_img] Webfonts dürfen die Größe von 2 MB nicht überschreiten (Alle Varianten inbegriffen)

* [ ] **Webfont Lader/webfont loader:** ![Low][low_img] Kontrolliere das Ladeverhalten mit einem "webfont loader"
> * 🛠 [Typekit Web Font Loader](https://github.com/typekit/webfontloader)

**[⬆ Zurück zum Anfang](#table-of-contents)**

---

## CSS

> **Information:** Schaue dir [CSS Richtlinien](https://cssguidelin.es/) und [Sass Richtlinien](https://sass-guidelin.es/) an, welche von den meisten Front-End Entwicklern befolgt werden. Wenn du Zweifel an CSS Eigenschaften hast kannst du [CSS Referenzen](http://cssreference.io/) besuchen. Dort gibt es außerdem eine kurze [Code Anleitung](http://codeguide.co/) für Einheitlichkeit.

* [ ] **Responsives Web Design:** ![High][high_img] Die Webseite benutzt responsives Web Design.
* [ ] **CSS Print:** ![Medium][medium_img] Es existiert ein "print stylesheet", welcher korrekt auf jeder Seite ist.
* [ ] **Präprozessor/Preprocessors:** ![Low][low_img] Dein Projekt nutzt einen CSS Präprozessor
* [ ] **Einzigartige ID's/Unique ID:** ![High][high_img] Solltest du ID's nutzen, sind diese einzigartig zur Seite
* [ ] **Reset CSS:** ![High][high_img] Ein CSS reset (reset, normalize or reboot) ist in Benutzung und auf dem neusten Stand. *(Solltest du ein CSS Framework wie Bootstrap oder Foundation nutzen, ist eine "Normalize" bereits enthalten)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS prefix:** ![Low][low_img] oder ID's, welche in JavaScript Dateien genutzt werden, beginnen mit **js-** und sind nicht mit CSS Dateien vermischt.

```html
<div id="js-slider" class="my-slider">
<!-- Oder -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **eingebettetes CSS/embedded or inline CSS:** ![High][high_img] Vermeide es dringlichst eingebettetes CSS in `<style>` Tags zu schreiben. Nutze dies nur für einen zulässigen Grund (z.B. background-image für slilder, critical CSS).
* [ ] **"Lieferanten Präfixe"/Vendor prefixes:** ![High][high_img] Es werden CSS-Herstellerpräfixe verwendet, die entsprechend der Kompatibilität mit Ihrem Browser generiert werden.


> * 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Performanz

- [ ] **Verknüpfung/Concatenation:** ![High][high_img] CSS Dateien sind in einer einzelnen Datei verknüpft *(gilt nicht für HTTP/2)*.
- [ ] **Minimierungen/Minification:** ![High][high_img] Alle Dateien sind minimiert.
- [ ] **Non-blocking:** ![Medium][medium_img] CSS Dateien müssen non-blocking sein, um zu verhindern das der DOM Zeit zum laden benötigt

> * 📖 [loadCSS von filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Beispiel von "preload CSS", welches loadCSS nutzt ](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **Ungenutztes/Unused CSS:** ![Low][low_img] Entferne ungenutztes CSS.

> * 🛠 [UnCSS Online](https://uncss-online.com/)
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)


### CSS testing

* [ ] **Stylelint:** ![High][high_img] Alle CSS oder SCSS Dateien haben keine Fehler.

> * 🛠 [stylelint, ein CSS linter](https://stylelint.io/)
> * 📖 [Sass Richtlinien](https://sass-guidelin.es/)

* [ ] **Responsives/Responsive web design:** ![High][high_img] Alle Seiten wurden an folgenden Punkten getestet: 320px, 768px, 1024px (könnte eventuell mehr/anders sein, abhängig von deinen analytics)

* [ ] **CSS Validierer/CSS Validator:** ![Medium][medium_img] Der CSS Code wurde getestet und alle relevanten Fehler wurden beseitigt

> * 🛠 [CSS Validierer](https://jigsaw.w3.org/css-validator/)

* [ ] **Desktop Browsers:** ![High][high_img] Alle Seiten wurden in den derzeitig aktuellen Desktop Browsern getestet (Safari, Firefox, Chrome, Safari...).
* [ ] **Mobile Browsers:**  ![High][high_img] Alle Seiten wurden in den derzeitig aktuellen mobilen Browsern getestet (Native browser, Chrome, Safari...).
* [ ] **OS:**  ![High][high_img] Alle Seiten wurden auf allen derzeitigen OS getestet (Windows, Android, iOS, Mac...).

- [ ] **Pixel perfect:** ![High][high_img] Alle Seiten sind nahe an der Perfektion. Hängt von der Kreativität der Designer ab, jedoch sollte die Seite sehr nah an dem vorgebenen Template anliegen. 

> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

* [ ] **Leserichtung/Reading direction:** ![High][high_img] Alle Seiten sollten auf LTR und RTL Sprachen getestet werden, wenn man sie unterstützen muss.

> * 📖 [Bauen von RTL Web Apps & Webseiten: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Bauen von RTL Web Apps & Webseiten: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ Zurück zum Anfang](#table-of-contents)**

---

## Bilder

> **Information:** Um die Optimierung von Bildern komplett zu verstehen sollte man sich das eBook **[Essential Image Optimization](https://images.guide/)** von Addy Osmani anschauen.

### Optimale Vorgehensweise/best practices

* [ ] **Optimierung/Optimization:** ![High][high_img] Alle Bilder sind optimiert, damit sie im Browser gerendert werden. Das WebP Format sollte für kritische Seiten (z.B. Homepage) genutzt werden.

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 Nutze [ImageOptim](https://imageoptim.com/) um deine Bilder kostenlos zu optimieren.
> * 🛠 Nutze [Kraken.io](https://kraken.io/web-interface) fantastische Alternative für .png und .jpg Optimierung. (Bis zu 1mb pro Datei sind kostenlos bereit gestellt dort).

* [ ] **Bilder&/Picture/Srcset:** ![Medium][medium_img] Nutze picture/srcset um das bestmöglichste Bild auf den derzeitigen "viewport" des Users anbieten zu können.

> * 📖 [Wie baut man responsive Bilder mit srcset](https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/)

* [ ] **Retina:** ![Low][low_img] Biete dem Nutzer Layoutbilder 2x oder 3x an, welche Retina Display supporten.
* [ ] **Sprite:** ![Medium][medium_img] Kleine Bilder sind in einem "Sprite". (Wenn man Icons hat, können diese in einem SVP sprite image abgespeichert werden). 
* [ ] **Width and Height:** ![High][high_img] Setze `width` und `height` attributes on `<img>` if the final rendered image size is known (can be omitted for CSS sizing).
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

* [ ] **JavaScript security:** ![High][high_img]

> * 📖 [Guidelines for Developing Secure Applications Utilizing JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)

* [ ] **`noscript` tag:** ![Medium][medium_img] Use `<noscript>` tag in the HTML body if a script type on the page is unsupported or if scripting is currently turned off in the browser. This will be helpful in client-side rendering heavy apps such as React.js, see [examples](https://webdesign.tutsplus.com/tutorials/quick-tip-dont-forget-the-noscript-element--cms-25498).

```html
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
```

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

* [ ] **Content Type Options:** ![Medium][medium_img] Prevents Google Chrome and Internet Explorer from trying to mime-sniff the content-type of a response away from the one being declared by the server.

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO):** ![Medium][medium_img] Protects your visitors against clickjacking attacks.

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

* [ ] **Content Security Policy:** ![Medium][medium_img] Defines how content is loaded on your site and from where it is permitted to be loaded. Can also be used to protect against clickjacking attacks.

> * 📖 [Content Security Policy - An Introduction - Scott Helme](https://scotthelme.co.uk/content-security-policy-an-introduction/)
> * 📖 [CSP Cheat Sheet - Scott Helme](https://scotthelme.co.uk/csp-cheat-sheet/)
> * 📖 [CSP Cheat Sheet - OWASP](https://www.owasp.org/index.php/Content_Security_Policy_Cheat_Sheet)
> * 📖 [Content Security Policy Reference](https://content-security-policy.com/)

**[⬆ back to top](#table-of-contents)**

---

## Performance

### Best practices

- [ ] **Page weight:** ![High][high_img] The weight of each page is between 0 and 500 KB.

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

* [ ] **Minified HTML:** ![Medium][medium_img] Your HTML is minified.

* [ ] **Lazy loading:** ![Medium][medium_img] Images, scripts and CSS need to be lazy loaded to improve the response time of the current page (See details in their respective sections).

* [ ] **Cookie size:** ![Medium][medium_img] If you are using cookies be sure each cookie doesn't exceed 4096 bytes and your domain name doesn't have more than 20 cookies.

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

* [ ] **Preconnection:** ![Low][low_img] DNS lookup, TCP handshake and TLS negotiation with services that will be needed soon is done in advance during idle time using `preconnect`.

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
> * 🛠 [GTmetrix - Website speed and performance optimization](https://gtmetrix.com/)

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
* [ ] **Headings:** ![High][high_img] Headings should be used properly and in the right order (H1 to H6).

> * 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High][high_img] `<header>` has `role="banner"`.
- [ ] **Role navigation:** ![High][high_img] `<nav>` has `role="navigation"`.
- [ ] **Role main:** ![High][high_img] `<main>` has `role="main"`.

> * 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)
> * 📖 [ARIA roles categorization](https://www.w3.org/TR/wai-aria/roles#roles_categorization)

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

> * 🛠 [Google Analytics](https://analytics.google.com/analytics/web/)
> * 🛠 [GA Checker (and others)](http://www.gachecker.com/)

* [ ] **Headings logic:** ![Medium][medium_img] Heading text helps to understand the content in the current page.

> * 🛠 [Tota11y, tab Headings](http://khan.github.io/tota11y/#Try-it)

* [ ] **sitemap.xml:** ![High][high_img] A sitemap.xml exists and was submitted to Google Search Console (previously Google Webmaster Tools).

> * 🛠 [Sitemap generator](https://websiteseochecker.com/html-sitemap-generator/)

* [ ] **robots.txt:** ![High][high_img] The robots.txt is not blocking webpages.

> * 📖 [The robots.txt file](https://varvy.com/robottxt.html)
> * 🛠 Test your robots.txt with [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

* [ ] **Structured Data:** ![High][high_img] Pages using structured data are tested and are without errors. Structured data helps crawlers understand the content in the current page.

> * 📖 [Introduction to Structured Data - Search - Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 📖 [RDFa - Linked Data in HTML](https://rdfa.info/)
> * 📖 [JSON-LD](https://json-ld.org/)
> * 📖 [Microdata](https://www.w3.org/TR/microdata/)
> * 🛠 Test your page with the [Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)
> * 🛠 Complete list of vocabularies that can be used as structured data. [Schema.org Full Hierarchy](http://schema.org/docs/full.html)

* [ ] **Sitemap HTML:** ![Medium][medium_img] An HTML sitemap is provided and is accessible via a link in the footer of your website.

> * 📖 [Sitemap guidelines - Google Support](https://support.google.com/webmasters/answer/183668?hl=en)

* [ ] **Pagination link tags:** ![Medium][medium_img] Provide `rel="prev"` and `rel="next"` to indicate paginated content.

> * 🛠 [Pagination (rel="prev/next") Testing Tool](https://technicalseo.com/seo-tools/rel-prev-next/)

> * 📖 [Pagination guidelines - Google Support](https://support.google.com/webmasters/answer/1663744?hl=en)

```html
<!-- Example: Pagination link tags for page 2 of a paginated list -->
<link rel="prev" href="https://example.com/?page=1">
<link rel="next" href="https://example.com/?page=3">
```

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
* 🇹🇼 Traditional Chinese: [EngineLin/Front-End-Checklist](https://github.com/EngineLin/Front-End-Checklist)
* 🇫🇷 French: [ynizon/Front-End-Checklist](https://github.com/ynizon/Front-End-Checklist)
* 🇷🇺 Russian: [ungear/Front-End-Checklist](https://github.com/ungear/Front-End-Checklist)
* 🇹🇷 Turkish: [eraycetinay/Front-End-Checklist](https://github.com/eraycetinay/Front-End-Checklist)

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
