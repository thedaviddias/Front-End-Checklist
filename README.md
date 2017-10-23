# Front-End Checklist-ES
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg)](https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors)
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

La **Front-End Checklist** es una lista exahustiva de todos los elementos que necesitas tener/probar antes de lanzar tu sitio/página HTML a producción.

Esta basada en años de experiencia de desarrolladores Front-End, con agregados provenientes de otros checklist de código abierto.

## Tabla de contenidos

1. **[Cómo usar](#cómo-usar)**
2. **[Head](#head)**
3. **[HTML](#html)**
4. **[Webfonts](#webfonts)**
5. **[CSS](#css)**
6. **[Images](#images)**
7. **[JavaScript](#javascript)**
8. **[Security](#security)**
9. **[Performance](#performance-1)**
10. **[Accessibility](#accessibility)**
11. **[SEO](#seo)**
12. **[Translation](#translation)**
13. **[Contributing](#contributing)**

## ¿Cómo usar?

Todos los elementos en la **Front-End Checklist** son requeridos para la mayoría de los proyectos, pero algunos elementos pueden ser omitidos o no son esenciales (por ejemplo, en el caso de una aplicación web administrativa, quizás no necesitas la función de RSS). Elegimos usar 3 niveles de flexibilidad:

* ![Bajo][low_img] significa que el elemento es **recomendado** pero puede ser omitido en situaciones partículares.
* ![Medio][medium_img] significa que el elemento es **altamente recomendado** y eventualmente puede ser omitido en casos muy particulares. Algunos elementos, si son omitidos, pueden traer malas repercusiones en términos de rendimiento o SEO.
* ![Alto][high_img] means that the item **can't be omitted** by any reason. You may cause a dysfunction in your page or have accessibility or SEO issues. The testing priority needs to be on these elements first.

Algunos recursos poseen un emoticón para ayudar a entender el tipo de contenido/ayuda que podrás encontrar en el checklist:

* 📖: documentación o artículos
* 🛠: herramienta en línea / herramienta para pruebas
* 📹: media o contenido en video

> **Nota:** Debido a que este documento es una traducción, la documentación, artículos, herramientas y medios se encuentran en inglés. 

---

## Head

> **Nota:** Puedes encontrar [una lista de todo](https://github.com/joshbuchea/HEAD) lo que puede encontrarse en el `<head>` de un documento HTML.

### Meta tag

* [ ] **Doctype:** ![Alto][high_img] El Doctype es HTML5 y se localiza arriba del todo en tus páginas HTML.

```html
<!-- Doctype HTML5 -->
<!doctype html>
```

> 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*Los siguientes 3 meta etiquetas (Charset, X-UA Compatible and Viewport) necesitan ir primero en el head.*

* [ ] **Charset:** ![Alto][high_img] El charset definido (UTF-8) es declarado correctamente.

```html
<!-- Declaramos la codificación de juego de caracteres para el documento -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medio][medium_img] La meta etiqueta X-UA-Compatible está presente.

```html
<!-- Ordenamos a Internet Explorer usar su motor de renderizado más reciente -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> 📖 [Specifying legacy document modes (Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport:** ![Alto][high_img] El viewport es declarado correctamente.

```html
<!-- Viewport para diseño web responsivo -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

* [ ] **Title:** ![Alto][high_img] El título es usado en todas las páginas (SEO: No más de 65 caracteres, título del sitio web incluído).

```html
<!-- Título del documento -->
<title>Título de página menor a 65 caracteres</title>
```

> 📖 [Title - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)

* [ ] **Description:** ![Alto][high_img] Una meta descripción es proporcionada, es única y no posee más de 150 caracteres.

```html
<!-- Meta descripción -->
<meta name="description" content="Descripción de la página en menos de 150 caracteres">
```

* [ ] **Favicons:** ![Medio][medium_img] Cada favicon se ha creado y mostrado correctamente. Si solo tienes un `favicon.ico`, colocalo en la raíz de tu sitio. Normalmente no nececsitarás usar ningun marcado. Sin embargo, es una buena práctica enlazarlo usando el ejemplo debajo. Al día de hoy, **se recomienda el formato PNG** sobre el formato `.ico` (dimensión: 32x32px).

```html
<!-- Favicon estandar -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
<!-- Formato favicon recomendado -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png">
```

> * 🛠 [Favicon Generator](https://www.favicon-generator.org/)
> * 🛠 [RealFaviconGenerator](https://realfavicongenerator.net/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
> * 📖 [Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS Tricks](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](https://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Touch Icon:** ![Bajo][low_img] Apple touch favicon apple-mobile-web-app-capable está presente. *(Crea tu archivo Apple Icon con una dimensión de al menos 200x200px para dar soporte a todas las dimensiones que podrías necesitar)*

```html
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/custom-icon.png">
```

> 📖 [Configuring Web Applications](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

- [ ] **Windows Tiles:**![Low][low_img] Windows tiles están presentes y enlazadas.

```html
<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

El marcado xml mínimo requerido para el archivo browserconfig.xml es el siguiente:

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

> 📖 [Browser configuration schema reference](https://msdn.microsoft.com/en-us/library/dn320426(v=vs.85).aspx)

* [ ] **Canonical:** ![Medium][medium_img] Usa `rel="canonical"` para evitar contenido duplicado.

```html
<!-- Ayuda a prevenir problemas de contenido duplicado -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

### Etiquetas HTML

* [ ] **Language tag:** ![Alto][high_img] La etiqueta de lenguaje de tu sitio web está específicada y relacionada al lenguaje de la página actual.

```html
<!-- Indicamos el idioma definido para la página actual -->
<html lang="es">
```

* [ ] **Direction tag:** ![Medio][medium_img] La dirección de lectura es específicada en la etiqueta body (Puede ser usada en otra etiqueta HTML).

```html
<!-- Indicamos la dirección de lectura (rtl = right to left/ derecha a izquierda) -->
<html dir="rtl">
```

> 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternate language:** ![Bajo][low_img] La etiqueta de lenguaje de tu sitio web está específicada y relacionada al lenguaje de la página actual .

```html
<!-- Indicamos el idioma definido para la página actual -->
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **Comentarios condicionales:** ![Bajo][low_img] Comentarios condicionales están presentes para IE si son necesarios.

> 📖 [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Bajo][low_img] Si tu proyecto es un blog o tiene artículos, un enlace RSS fue proprocionado.

* [ ] **CSS Crítico:** ![Medio][medium_img] El CSS crítio (o "above the fold") contiene todo el CSS usado para renderizar la porción visible de la página. Se incrusta antes de la llamada principal a CSS y entre `<style></style>` en una sola línea (minificado).

> 🛠 [Critical by Addy Osmani on Github](https://github.com/addyosmani/critical)

* [ ] **Orden del CSS:** ![Alto][high_img] Todos los archivos CSS son cargados antes que cualquier archivo JavaScript en el `<head>`. (Excepto en los casos donde los archivos JS se cargan asíncronamente en tus páginas).

### Social meta

***Facebook OG*** y ***Twitter Cards*** son altamente recomendados para cualquier sitio. Otras etiquetas de medios sociales pueden ser considerados si tienes un objetivo partícular y quieres asegurar la visualización.

* [ ] **Facebook Open Graph:** ![Bajo][low_img] Todos los Facebook Open Graph (OG) fueron probados y ninguno es erroneo o contiene información falsa. Las imágenes necesitan ser de al menos 600 x 315 pixeles, se recomienda 1200 x 630 pixeles.

```html
<meta property="og:type" content="website">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="Título del contenido">
<meta property="og:image" content="https://example.com/image.jpg">
<meta property="og:description" content="Descripción aquí">
<meta property="og:site_name" content="Nombre del sitio">
<meta property="og:locale" content="en_US">
```

> * 📖 [A Guide to Sharing for Webmasters](https://developers.facebook.com/docs/sharing/webmasters/)
> * 🛠 Test your page with the [Facebook OG testing](https://developers.facebook.com/tools/debug/)

* [ ] **Twitter Card:** ![Bajo][low_img]

```html
<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@site_account">
<meta name="twitter:creator" content="@individual_account">
<meta name="twitter:url" content="https://example.com/page.html">
<meta name="twitter:title" content="Título del contenido">
<meta name="twitter:description" content="Descripción del contenido menor a 200 caracteres">
<meta name="twitter:image" content="https://example.com/image.jpg">
```

> * 📖 [Getting started with cards — Twitter Developers](https://developer.twitter.com/en/docs/tweets/optimize-with-cards/guides/getting-started)
> * 🛠 Test your page with the [Twitter card validator](https://cards-dev.twitter.com/validator)

**[⬆ volver a arriba](#tabla-de-contenidos)**

---

## HTML

### Mejores prácticas

* [ ] **Elementos semánticos HTML5:** ![Alto][high_img] Los elementos semánticos HTML5 son usados apropiadamente (header, section, footer, main...).

> 📖 [HTML Reference](http://htmlreference.io/)

* [ ] **Páginas de error:** ![Alto][high_img] Páginas de error 400 y 5xx existen. Recuerda que las páginas de error 5xx necesitan tener su CSS integrado (sin llamadas externas en el servidor actual).

* [ ] **Noopener:** ![Medio][medium_img] En caso que uses enlaces externos con `target="_blank"`, tu enlace debe tener un atributo `rel="noopener"`para evitar tab nabbing. Si necesitas dar soporte a versiones antigüas de Firefox, usa `rel="noopener noreferrer"`.

> 📖 [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Limpiar comentarios:** ![Bajo][low_img] Código innecesario necesita ser removido antes de enviar la página a producción.

### Pruebas HTML

* [ ] **Obedece al W3C:** ![Alto][high_img] Todas las páginas necesitan ser aprobadas por el validador W3C para identificar posibles problemas en el código HTML.

> 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![Alto][high_img] Uso herramientas para ayudarme a analizar cualquier problema que podría tener en mi código HTML.

> 🛠 [Dirty markup](https://dirtymarkup.com/)

* [ ] **Navegadores de escritorio:** ![Alto][high_img] Todas las páginas fueron probadas en todos los navegadores de escritorio actuales (Safari, Firefox, Chrome, Internet Explorer, EDGE...).
* [ ] **Navegadores móviles:**  ![Alto][high_img] Todas las páginas fueron probadas en todos los navegadores móviles actuales (Native browser, Chrome, Safari...).

* [ ] **Verificador de enlaces:** ![High][high_img] No hay enlaces rotos en la página,  verifica que no tienes ningún error 404.

> 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Prueba de Adblockers:** ![Medium][medium_img] Tu sitio web muesta el contenido correctamente cuando adblockers están habilitados (Puedes incluir un mensaje para sugerir a las personas deshabilitar su adblocker).

- [ ] **Pixel perfect:** ![High][high_img] Las páginas son similares al diseño. Dependiendo de la calidad de los creativos, podrías no ser 100% exacto, pero tu página necesita verse muy similar a tu plantilla.

> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

**[⬆ volver a arriba](#tabla-de-contenidos)**

---

## Webfonts

* [ ] **Formato de fuentes:** ![Alto][high_img] WOFF, WOFF2 y TTF son formatos soportados por todos los navegadores modernos.

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Tamaño de fuentes:** ![High][high_img] El tamaño de las fuentes no excede los 2 MB (todas las variantes incluidas).

**[⬆ volver a arriba](#tabla-de-contenidos)**

---

## CSS

> **Notas:** Echa un vistazo a los [Lineamientos CSS](https://cssguidelin.es/) y [Lineamientos Sass](https://sass-guidelin.es/) seguidos por la mayoría de los desarrolladores. Si tienes alguna duda acerca de las propiedades CSS, puedes visitar la [Referencia CSS](http://cssreference.io/).

* [ ] **Diseño Web Responsivo:** ![High][high_img] El sitio wen utiliza diseño web responsivo.
* [ ] **CSS Print:** ![Medium][medium_img] Se proporciona una hoja de estilo para impresión y es correcto en cada página.
* [ ] **Preprocesador:** ![Medium][medium_img] Tu página utiliza un preprocesador CSS ([Sass](http://sass-lang.com/) es recomendado).
* [ ] **ID único:** ![High][high_img] Si utilizas IDs, son únicos en la página.
* [ ] **Reinicio de CSS:** ![High][high_img] Un reinicio de CSS es usado y está actualizado. *(Si utilizas algún Framework CSS como Bootstrap o Fundation, el reinicio de CSS ya está implementado.)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **Prefijos JS:** ![Low][low_img] Todas las clases (o id- usados en archivos JavaScript) comienzan con **js-** y no son estilizados dentro del archivo CSS.

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **CSS incrustado:** ![High][high_img] Evita a todo costo el CSS inscrustado (directo al HTML): solo usalo por razones válidas (ej: imagen de fondo para un slider, CSS crítico).
* [ ] **Vendor prefixes:** ![High][high_img] Los vendor prefixes son usados y generados de acuerdo con la compatibilidad de tu navegador. *(Si utilizas un preprocesador, esta labor se puede automatizar)*

> 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Rendimiento

- [ ] **Concatenado:** ![High][high_img] Los archivos CSS son concatenados en un solo archivo. *(No aplica en HTTP/2)*
- [ ] **Minificado:** ![High][high_img] Todos los archivos CSS están minificados (estilos en una sola línea).
- [ ] **No bloquea renderizado:** ![Medium][medium_img] Los archivos CSS no deben afectar el tiempo carga del DOM.

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Example of preload CSS using loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **CSS sin utilizar:** ![Low][low_img] Remover CSS sin utilizar.

> * 🛠 [UnCSS Online](https://uncss-online.com/) 🛠
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)


### Pruebas CSS 

* [ ] **Stylelint:** ![High][high_img] Los archivos CSS o SCSS no contienen errores.

> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass guidelines](https://sass-guidelin.es/)


* [ ] **Diseño web responsivo:** ![High][high_img] Todas las páginas fueron probadas en los siguientes puntos: 320px, 768px, 1024px (pueden ser más / varia de acuerdo a tus resultados en analítica).

* [ ] **Validador CSS:** ![Medium][medium_img] El CSS fue probado y los errores pertinentes fueron corregidos.

> 🛠 [CSS Validator](https://jigsaw.w3.org/css-validator/)

* [ ] **Dirección de lectura:** ![High][high_img] Todas las páginas necesitan ser probadas para idiomas LTR y RTL si necesitan soporte.

> * 📖 [Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ volver a arriba](#tabla-de-contenidos)**

---

## Images

> **Notes:** For a complete understanding of image optimization, check the free ebook **[Essential Image Optimization](https://images.guide/)** from Addy Osmani.

### Best practices

* [ ] **Optimization:** ![High][high_img] All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage).

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 Use [ImageOptim](https://imageoptim.com/) to optimise your images for free.

* [ ] **Retina:** ![Low][low_img] You provide layout images x2 or 3x, support retina display.
* [ ] **Sprite:** ![Medium][medium_img] Small images are in a sprite file (in the case of icons, they can be in an SVG sprite image).
* [ ] **Width and Height:** ![High][high_img] All `<img>` have height and width set (Don't specify px or %).

> ***Note:*** Lots of developers assume that width and height are not compatible with responsive web design. It's absolutely not the case.

* [ ] **Alternative text:** ![High][high_img] All `<img>` have an alternative text which describe the image visually.
* [ ] **Lazy loading:** ![Medium][medium_img] Images are lazyloaded (A noscript fallback is always provided).

**[⬆ back to top](#table-of-contents)**

---

## JavaScript

### Best practices

* [ ] **JavaScript Inline:** ![High][high_img] You don't have any JavaScript code inline (mixed with your HTML code).
* [ ] **Concatenation:** ![High][high_img] JavaScript files are concatenated.
* [ ] **Minification:** ![High][high_img] JavaScript files are minified (you can add the `.min` suffix).

> [Minify Resources (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript security:**

> [Guidelines for Developing Secure Applications Utilizing JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)*

* [ ] **Non-blocking:** ![Medium][medium_img] JavaScript files are loaded asynchronously using `async` or deferred using `defer` attribute.

> 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low][low_img] If you need to target some specific features you can use a custom Modernizr to add classes in your `<html>` tag.

> 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

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

* [ ] **Cross Site Request Forgery (CSRF):** ![High][high_img] You are ensure that requests made to your server-side are legitimate and originate from your website / app to prevent CSRF attacks.

> 📖 [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet  - OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

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
> 🛠 [W3C Validator](https://validator.w3.org/)

* [ ] **Lazy loading:** ![Medium][medium_img] Images, scripts and CSS need to be lazy loaded to improve the response time of the current page (See details in their respective sections).

* [ ] **Cookie size:** If you are using cookies be sure each cookie doesn't exceed 4096 bytes and your domain name don't have more than 20 cookies.

> * 📖 [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [Browser Cookie Limits](http://browsercookielimits.squawky.net/)

### Preparing upcoming requests

> 📖 [Explanation of the following techniques](https://css-tricks.com/prefetching-preloading-prebrowsing/)

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

> 📖 [Difference between prefetch and preload](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

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

> 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **Color contrast:** ![Medium][medium_img] Color contrast should at least pass WCAG AA (AAA for mobile).

> 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)

#### Headings

* [ ] **H1:** ![High][high_img] All pages have an H1 which is not the title of the website.
* [ ] **Headings:** ![High][high_img] Headings should be used properly in the right order (H1 to H6).

> 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **Role banner:** ![High][high_img] `<header>` has `role="banner"`.
- [ ] **Role navigation:** ![High][high_img] `<nav>` has `role="navigation"`.
- [ ] **Role main:** ![High][high_img] `<main>` has `role="main"`.

> 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)

### Semantics

- [ ] **Specific HTML5 input types are used:** ![Medium][medium_img] This is especially important for mobile devices that show customized keypads and widgets for different types.

> 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### Form

* [ ] **Label:** ![High][high_img] A label is associated with each input form element. In case a label can't be displayed, use `aria-label` instead.

> 📖 [Using the aria-label attribute - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Accessibility testing

* [ ] **Accessibility standards testing:** ![High][high_img] Use the WAVE tool to test if your page respects the accessibility standards.

> 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation:** ![High][high_img] Test your website using only your keyboard in a previsible order. All interactive elements are reachable and usable.
* [ ] **Screen-reader:** ![Medium][medium_img] All pages were tested in a screen-reader (VoiceOver, ChromeVox, NVDA or Lynx).
* [ ] **Focus style:** ![High][high_img] If the focus is disabled, it is replaced by visible state in CSS.

> 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

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

* [ ] **Sitemap HTML:** ![Medium][medium_img] An HTML sitemap is provided and is accessible via a link in the footer of your website.

> * 📖 [Sitemap guidelines - Google Support](https://support.google.com/webmasters/answer/183668?hl=en)
> * 🛠 [Sitemap generator](https://websiteseochecker.com/html-sitemap-generator/)


**[⬆ back to top](#table-of-contents)**

---

## Translation

The Front-End Checklist is also available in other languages. Thanks for all translators and their awesome work!

* 🇯🇵 Japanese: [miya0001/Front-End-Checklist](https://github.com/miya0001/Front-End-Checklist)

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

## Authors

**[David Dias](https://github.com/thedaviddias/Front-End-Checklist)**, **[Geoffrey Signorato](https://github.com/geosenna)**, **[Sandeep Ramgolam](https://twitter.com/__Sun__)** and **[Cédric Poilly](https://github.com/CedricPoilly)**.

## License

[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ back to top](#table-of-contents)**

[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png
