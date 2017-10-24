# 前端清单
[![Contributors](https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg)](https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors)
[![CC0](https://img.shields.io/badge/license-CC0-green.svg)](https://creativecommons.org/publicdomain/zero/1.0/)

**前端清单**是在将你的站点/HTML页面发布到生产环境之前需要测试的所有元素的详尽列表。

它基于前端开发人员多年的经验沉淀，以及其他优秀的开源清单。

## 目录

1. **[How to use](#how-to-use)**
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

## How to use?

**前端清单**中的所有项目都是大部分项目所必需的, 但某些元素可以省略或者并不是这么重要 (在管理Web应用程序的情况下，你可能并不需要RSS订阅源)。我们选择使用一下3级区分:

* ![Low][low_img] 意味着该项目被**推荐**，但在某些特定情况下可以省略。
* ![Medium][medium_img] 意味着该项目是**强烈推荐**的，但是可能在某些特殊情况下能被省略。某些元素，如果省略将会对性能或SEO方面产生不良影响。
* ![High][high_img] 意味着项目**不能被任何理由省略**。你的页面可能会导致功能障碍或有可访问性或SEO问题。测试优先级需要首先考虑这些元素。

某些资源拥有特定的标识符，帮助你去理解清单上不同类型的内容或帮助。

* 📖: 文档或文章
* 🛠: 在线工具/测试工具
* 📹: 媒体或视频内容

---

## Head

> **注意:** 你能在HTML文档的`<head>`中找到[所有的清单列表](https://github.com/joshbuchea/HEAD)。

### Meta 标签

* [ ] **Doctype:** ![High][high_img] Doctype是HTML5的属性，需要声明在HTML文件的顶部。

```html
<!-- Doctype HTML5 -->
<!doctype html>
```

> 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*接下来三个 meta 标签 (Charset, X-UA Compatible, Viewport) 需要首先在head中声明*

* [ ] **Charset:** ![High][high_img] 正确声明Charset标签(UTF-8)。
```html
<!-- 设置文档的字符编码 -->
<meta charset="utf-8">
```

* [ ] **X-UA-Compatible:** ![Medium][medium_img] `X-UA-Compatible` 元标签。

```html
<!-- 指示Internet Explorer使用其最新的渲染引擎 -->
<meta http-equiv="x-ua-compatible" content="ie=edge">
```

> 📖 [指定旧文档模式(Internet Explorer)](https://msdn.microsoft.com/en-us/library/jj676915(v=vs.85).aspx)

* [ ] **Viewport:** ![High][high_img] 正确声明`viewport`标签。

```html
<!-- 响应式网页设计viewpoint声明 -->
<meta name="viewport" content="width=device-width, initial-scale=1">
```

* [ ] **Title:** ![High][high_img] 所有页面都使用`title`(SEO:包括网站标题不超过65个字符)。

```html
<!-- 文档标题 -->
<title>Page Title less than 65 characters</title>
```

> 📖 [Title - HTML | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)

* [ ] **Description:** ![High][high_img] 提供`description`标签， 它是唯一的同时内容不能超过150个字符。

```html
<!-- Meta Description -->
<meta name="description" content="Description of the page less than 150 characters">
```

* [ ] **Favicons:** ![Medium][medium_img] 每个`favicon`都被创建并正确显示，如果你只有一个`favicon.ico`，把它放在你网站的根目录下。 通常来说你不需要做任何操作他就能正常显示。 然而, 使用一下示例中的方法是比较好的做法。不过现在我们推荐使用**PNG**格式，相比`.ico`格式有较好的优势(推荐尺寸: 32x32px)。

```html
<!-- 标准favicon -->
<link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
<!-- 推荐favicon格式 -->
<link rel="icon" type="image/png" href="https://example.com/favicon.png">
```

> * 🛠 [Favicon 生成器](https://www.favicon-generator.org/)
> * 🛠 [RealFaviconGenerator](https://realfavicongenerator.net/)
> * 📖 [Favicon Cheat Sheet](https://github.com/audreyr/favicon-cheat-sheet)
> * 📖 [Favicons, Touch Icons, Tile Icons, etc. Which Do You Need? - CSS 技巧](https://css-tricks.com/favicon-quiz/)
> * 📖 [PNG favicons - caniuse](https://caniuse.com/#feat=link-icon-png)

* [ ] **Apple Touch Icon:** ![Low][low_img] 苹果设备favicon适配。 *(创建至少200x200像素尺寸的Apple图标文件以支持你可能需要的用到的所有尺寸)*

```html
<!-- Apple Touch Icon -->
<link rel="apple-touch-icon" href="/custom-icon.png">
```

> 📖 [配置Web应用程序](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)

* [ ] **Canonical:** ![Medium][medium_img] 使用`rel="canonical"`以避免重复的内容。

```html
<!-- 帮助防止重复内容出现 -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-red.html">
```

### HTML 标签

* [ ] **Language tag:** ![High][high_img] 指定你网站的语言标签并与当前页面语言相关联。

```html
<html lang="zh_cn">
```

* [ ] **Direction tag:** ![Medium][medium_img] `direction`属性规定元素内容的文本方向。(可以在另一个HTML标签上使用)。

```html
<html dir="rtl">
```

> 📖 [dir - HTML | MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternate language:** ![Low][low_img] 指定网站的语言标签并与当前页面的语言相关联。

```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **条件注释:** ![Low][low_img] 如有需要，可针对IE添加条件注释。

> 📖 [关于条件注释(Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img] 如果你的项目是一个博客或者有大量的文章，可以添加一个RSS链接。
* 
* [ ] **CSS Critical:** ![Medium][medium_img] `CSS critical`收集并呈现当前页面可见部分的所有CSS。在主要的CSS调用之前以单行(最小化)在`<style></style>`中嵌入。

> 🛠 [Critical by Addy Osmani on Github](https://github.com/addyosmani/critical)

* [ ] **CSS 顺序:** ![High][high_img] 所有CSS文件都需要在JavaScript文件加载之前加载完成(除了有时JS文件异步加载到页面之外的情况)。

### Social meta

强烈推荐***Facebook OG*** and ***Twitter Cards***。如果你针对某些特定的存在并希望确保显示，也可以考虑其他社交媒体标签。

* [ ] **Facebook Open Graph:** ![Low][low_img] 所有Facebook Open Graph（OG）都经过测试并且没有任何错误。图片至少需要600 x 315像素，建议使用1200 x 630像素。
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
> * 🛠 使用[Facebook OG testing](https://developers.facebook.com/tools/debug/)测试你的页面。

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
> * 🛠 使用[Twitter card validator](https://cards-dev.twitter.com/validator)测试你的页面。

**[⬆ 返回顶部](#目录)**

---

## HTML

### 最佳实践

* [ ] **HTML5 Semantic Elements:** ![High][high_img] 正确的使用HTML5语义化标签(header, section, footer, main...).

> 📖 [HTML 参考](http://htmlreference.io/)

* [ ] **Error pages:** ![High][high_img] 404页面和5xx错误的存在。5xx错误页面需要集成其CSS(在当前服务器上无外部调用)。

* [ ] **Noopener:** ![Medium][medium_img] 如果你使用外部链接`target="_blank"`, 你的链接必须有个`rel="noopener"`属性，防止制表符的隐藏。如果你需要兼容旧版本的火狐浏览器，请使用`rel="noopener noreferrer"`。

> 📖 [关于 rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **清除注释:** ![Low][low_img] 在将页面发布到生产环境之前，应该删除不必要的代码。

### HTML 测试

* [ ] **W3C 兼容:** ![High][high_img] 所有页面需要使用W3C验证器进行测试，以检测HTML代码中的可能存在的问题。

> 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] 使用工具来帮助我们分析HTML代码中可能存在的问题。

> 🛠 [Dirty markup](https://dirtymarkup.com/)

* [ ] **Desktop Browsers:** ![High][high_img] 所有页面都在桌面浏览器上通过测试(Safari, Firefox, Chrome, Internet Explorer, EDGE...)。
* [ ] **Mobile Browsers:**  ![High][high_img] 所有页面都在移动端浏览器上通过测试(Native browser, Chrome, Safari...).

* [ ] **链接检查器:** ![High][high_img] 页面中链接没有断开，请确认你没有404错误。

> 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **广告拦截器测试:** ![Medium][medium_img] 你的的网站会在启用广告拦截器的情况下正确显示页面内容(你可以提供一条消息，引导人们停用其广告拦截器)。

- [ ] **Pixel perfect:** ![High][high_img] 页面的像素级实现。根据设计稿的质量，你的页面可能做不到100%的还原，但你的网页需要尽可能的靠近设计稿。

> [Pixel Perfect - Chrome 扩展](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

**[⬆ 返回顶部](#目录)**

---

## Webfonts

* [ ] **Webfont格式:** ![High][high_img] 现代浏览器都支持WOFF、WOFF2、TTF格式
> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)

* [ ] **Webfont 大小:** ![High][high_img] Webfont大小不超过 2 MB (包括所有版本在内)。

**[⬆ 返回顶部](#table-of-contents)**

---

## CSS

> **注意:** 大部分前端开发人员都会看看[CSS指南](https://cssguidelin.es/)和[Sass指南](https://sass-guidelin.es/)。如果你对CSS属性有疑问，可以访问[CSS参考文档](http://cssreference.io/).

* [ ] **响应式网站设计:** ![High][high_img] 网站使用响应式设计。
* [ ] **CSS打印属性:** ![Medium][medium_img] 提供打印样式表，并确保使用正确。
* [ ] **预处理器:** ![Medium][medium_img] 你的网站使用css预处理器(推荐[Sass](http://sass-lang.com/)).
* [ ] **唯一ID:** ![High][high_img] 如果使用了ID，确保ID的唯一性。
* [ ] **Reset CSS:** ![High][high_img] 使用CSS reset(如reset.css, normalize.css, reboot) *(如果你使用的是CSS框架，例如Bootstrap或Foundation，则reset css已被包含在其中)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS 前缀:** ![Low][low_img] 所有以**js-**开头的class(或者JavaScript文件中使用的id)不写入css文件。

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **CSS embed or line:** ![High][high_img] 避免使用CSS嵌入或内联，仅用于必要的情况(例如: background-image for slider, CSS critical).
* [ ] **浏览器内核前缀:** ![High][high_img] 对部分属性加上浏览器内核前缀，生成你浏览器兼容的属性。

> 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### 性能

- [ ] **连接:** ![High][high_img] 将CSS文件连接到一个文件中。 *(不适用HTTP/2)*
- [ ] **压缩:** ![High][high_img] 压缩所有CSS文件。
- [ ] **非阻塞:** ![Medium][medium_img] CSS文件需要非阻塞，以防在DOM加载时花费大量时间。

> * 📖 [loadCSS by filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [使用loadCSS预加载CSS的示例](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

- [ ] **未使用的CSS:** ![Low][low_img] 删除未使用的CSS。

> * 🛠 [UnCSS Online](https://uncss-online.com/)
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage)


### CSS 测试

* [ ] **格式检查:** ![High][high_img] 所有的CSS或SCSS文件没有任何格式错误。
> * 🛠 [stylelint, a CSS linter](https://stylelint.io/)
> * 📖 [Sass指南](https://sass-guidelin.es/)

* [ ] **响应式网页设计:** ![High][high_img] 所有页面都需要经过以下几种情况的测试: 320px, 768px, 1024px (根据自己的项目情况，可以设置更多)。

* [ ] **CSS验证器:** ![Medium][medium_img] CSS经过测试，同时所有错误都被修复。
> 🛠 [CSS验证器](https://jigsaw.w3.org/css-validator/)

* [ ] **Reading direction:** ![High][high_img] 如果需要的话，所有页面都需要对LTR和RTL语言进行测试。

> * 📖 [构建RTL-Aware Web Apps & Websites: Part 1 | Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [构建RTL-Aware Web Apps & Websites: Part 2 | Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ 返回顶部](#目录)**

---

## 图片

> **注意:** 想要完整的了解图像优化，可以在Addy Osmani查看免费电子书**[图像优化基础](https://images.guide/)**。

### 最佳实践

* [ ] **优化:** ![High][high_img] 所有图像都经过优化并且可在浏览器中正常显示。WebP格式可用于关键页面（如首页）。 All images are optimized to be rendered in the browser. WebP format could be used for critical pages (like Homepage).

> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 使用[ImageOptim](https://imageoptim.com/)免费优化您的图像。
* [ ] **视网膜屏:** ![Low][low_img] 提供x2 或 3x的图像来支持视网膜屏显示。
* [ ] **雪碧图:** ![Medium][medium_img] 小图片放到一个雪碧图中。
* [ ] **宽高:** ![High][high_img] 所有`<img>`都需要设置高度和宽度(不要指定px 和 %)。

> ***注意:*** 许多开发人员认为设置了宽度和高度就不能实现响应式设计，实际上并不是这样的。

* [ ] **Alternative text:** ![High][high_img] 所有 `<img>` 必须有`alt`属性来直观的描述图片。
* [ ] **懒加载:** ![Medium][medium_img] 图片懒加载 (A noscript fallback is always provided).

**[⬆ 返回顶部](#目录)**

---

## JavaScript

### 最佳实践

* [ ] **JavaScript 内联:** ![High][high_img] 确保没有任何js代码内联(与HTML代码混合)。
* [ ] **连接:** ![High][high_img] 将js文件连接起来。
* [ ] **压缩:** ![High][high_img] 压缩所有js文件(可以添加 `.min` 后缀)。

> [压缩资源 (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript安全性:**

> [用JavaScript开发安全应用程序指南](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)*

* [ ] **非阻塞:** ![Medium][medium_img] JavaScript文件使用async或延迟使用defer属性异步加载。

> 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Modernizr:** ![Low][low_img] 如果您需要定位某些特定功能，则可以使用自定义Modernizr在`<html>`标签中添加class。

> 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### JavaScript 测试

* [ ] **ESLint:** ![High][high_img] 用ESLint检测并没有错误(基于你的配置规则)。

> * 📖 [ESLint - The pluggable linting utility for JavaScript and JSX](https://eslint.org/)

**[⬆ back to top](#目录)**

---

## 安全

### 扫描并检查你的网站

> * [securityheaders.io](https://securityheaders.io/)
> * [Observatory by Mozilla](https://observatory.mozilla.org/)
> * [ASafaWeb - Automated Security Analyser for ASP.NET Websites](https://asafaweb.com/)

### 最佳实践

* [ ] **HTTPS:** ![Medium][medium_img] 每个页面和所有外部内容(插件、图像...)都使用HTTPS。

> * 🛠 [Let's Encrypt - 免费 SSL/TLS 证书](https://letsencrypt.org/)
> * 🛠 [免费 SSL 服务测试](https://www.ssllabs.com/ssltest/index.html)
> * 📖 [Strict Transport Security](http://caniuse.com/#feat=stricttransportsecurity)

* [ ] **HTTP严格传输安全性(HSTS):** ![Medium][medium_img] HTTP头设置 'Strict-Transport-Security'.

> * 🛠 [Check HSTS preload status and eligibility](https://hstspreload.org/)
> * 📖 [HTTP Strict Transport Security Cheat Sheet - OWASP](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security_Cheat_Sheet)
> * 📖 [Transport Layer Protection Cheat Sheet - OWASP](https://www.owasp.org/index.php/Transport_Layer_Protection_Cheat_Sheet)

* [ ] **跨站点请求伪造攻击(CSRF):** ![High][high_img] 确保向服务器端发出的请求是合法的，并来自您的网站/应用程序，以防止发生CSRF攻击。

> 📖 [跨站点请求伪造（CSRF）防范清单 - OWASP](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)

* [ ] **跨站脚本攻击(XSS):** ![High][high_img] 页面或网站没有XSS攻击的可能性。

> * 📖 [XSS (跨站脚本攻击) 防范清单 - OWASP](https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet)
> * 📖 [基于DOM的XSS防范清单 - OWASP](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet)

* [ ] **Content Type Options** ![Medium][medium_img] 防止Google Chrome和Internet Explorer尝试将响应的内容类型从服务器声明的内容类型中嗅探出来。

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO)** ![Medium][medium_img] 保护网站的访问者免受劫持攻击。

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

**[⬆ 返回顶部](#目录)**

---

## 性能

### 最佳实践

- [ ] **页面大小:** ![High][high_img] 每张网页的大小在0到500KB之间。

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

- [ ] **文件压缩:** ![Medium][medium_img] 压缩你的HTML文件。
> 🛠 [W3C Validator](https://validator.w3.org/)

* [ ] **懒加载:** ![Medium][medium_img] 图片、js脚本和CSS需要懒加载，以提高当前页面的响应时间（请参见各自部分的详细信息）。

* [ ] **Cookie大小:** 如果使用Cookie，确保每个Cookie不超过4096个字节，并且域名下不超过20个Cookie。

> * 📖 [Cookie规范: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [浏览器Cookie限制](http://browsercookielimits.squawky.net/)

### 为将到来的请求做准备

> 📖 [以下几种技术的详细说明](https://css-tricks.com/prefetching-preloading-prebrowsing/)

* [ ] **DNS解析:** ![Low][low_img] 使用`dns-prefetch`让第三方DNS服务商主动去执行域名解析的功能。

```html
<link rel="dns-prefetch" href="https://example.com">
```

* [ ] **预连接:** ![Low][low_img] 使用`preconnect`在空闲期间提前做好DNS查询, TCP三次握手和TLS 协商。

```html
<link rel="preconnect" href="https://example.com">
```

* [ ] **预获取:** ![Low][low_img] 使用`prefetch`在空闲期间提前请求即将需要的资源(例如：图像的懒加载)。

```html
<link rel="prefetch" href="image.png">
```

* [ ] **预加载:** ![Low][low_img] 使用`preload`提前加载当前页面所需要的资源(例如：js脚本放在`<body>`的最后)。

```html
<link rel="preload" href="app.js">
```

> 📖 [预加载和预获取之间的差异](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

### 性能测试

* [ ] **Google PageSpeed:** ![High][high_img] 所有的网页都经过测试（不仅仅是首页），而且得分至少为90/100。

> * 🛠 [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/)
> * 🛠 [用Google测试移动端速度](https://testmysite.withgoogle.com)
> * 🛠 [WebPagetest - 网站性能和优化测试](https://www.webpagetest.org/)

**[⬆ 返回顶部](#目录)**

---

## 无障碍浏览(Accessibility)

> **注意:** 查看播放列表[A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹

### 最佳实践

- [ ] **渐进式增强:** ![Medium][medium_img] 主要功能如主导航和搜索等功能应该在没有启用JavaScript的情况下工作。

> 📖 [在Chrome开发者具中启用/禁用JavaScript](https://www.youtube.com/watch?v=kBmvq2cE0D8)

- [ ] **颜色对比度:** ![Medium][medium_img] 颜色对比度至少通过WCAG AA标准(移动端需要通过AAA)。

> 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)

#### 标题

* [ ] **H1:** ![High][high_img] 所有页面都有H1，它不是网站的标题。
* [ ] **Headings:** ![High][high_img] 标题应以正确的顺序合理使用(H1至H6)。

> 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

#### Landmarks

- [ ] **banner角色:** ![High][high_img] `<header>` 标签中加入 `role="banner"`属性。
- [ ] **navigation角色:** ![High][high_img] `<nav>` 标签中加入 `role="navigation"`属性。
- [ ] **main角色:** ![High][high_img] `<main>` 标签中加入 `role="main"`属性。

> 📖 [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)

### 语义化

- [ ] **使用特定的HTML5输入类型:** ![Medium][medium_img] 这对于显示不同类型的自定义键盘和小部件的移动设备尤其重要。

> 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### 表单

* [ ] **Label:** ![High][high_img] `label`与每个输入表单元素相关联，如果`label`无法显示，请使用`aria-label`代替。

> 📖 [使用aria-label属性 - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Accessibility 测试

* [ ] **Accessibility标准测试:** ![High][high_img] 使用WAVE工具测试你的页面是否符合accessibility标准。

> 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation:** ![High][high_img] 在你的键盘上以可能出现的操作顺序去测试，确保所有交互式元素都可访问和可用。
* [ ] **Screen-reader:** ![Medium][medium_img] 所有页面都在屏幕阅读器(VoiceOver, ChromeVox, NVDA or Lynx)中进行了测试。
* [ ] **Focus style:** ![High][high_img] 如果焦点被禁用，它将被CSS中的可见状态所替代。

> 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ 返回顶部](#目录)**

---

## SEO

* [ ] **Google Analytics:** ![High][high_img] Google Analytics 正确安装和配置。
* [ ] **Headings logic:** ![Medium][medium_img] 标题文字有助于了解当前页面的主要内容。
* [ ] **sitemap.xml:** ![High][high_img] `sitemap.xml`存在并提交到Google Search Console(以前的Google管理员工具)。
* [ ] **robots.txt:** ![High][high_img] `robots.txt`正确配置，不阻止网页被爬取。

> * 🛠 使用[Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)测试你的`robots.txt`。 

* [ ] **结构化数据:** ![High][high_img] 使用结构化数据的页面通过测试并且没有错误。结构化数据帮助爬虫理解当前页面的内容。

> * 📖 [结构化数据简介 | 搜索 | Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 🛠 使用[Structured Data Testing Tool](https://developers.google.com/structured-data/testing-tool/)测试你的页面。

* [ ] **Sitemap HTML:** ![Medium][medium_img] 提供HTML网站地图，可通过网站页脚中的链接进行访问。

> * 📖 [Sitemap 指南 | Google 支持](https://support.google.com/webmasters/answer/183668?hl=en)
> * 🛠 [Sitemap 生成器](https://websiteseochecker.com/html-sitemap-generator/)


**[⬆ back to top](#目录)**

---

## Contributing

**提issue或提交合并请求以建议更改或添加。**

### Guide

**前端清单** 项目有两个分支:

#### 1. `master`

该分支包含`README.md`,内容会自动反映到[前端清单](http://frontendchecklist.com/)。
网站上。
#### 2. `develop`

这个分支将用于对结构和内容进行一些重大更改。不过最好还是使用主分支来修复小错误或添加新项目。

### 贡献

查看所有贡献人员 [contributors](https://github.com/thedaviddias/frontendchecklist/graphs/contributors).

## 作者

**[David Dias](https://github.com/thedaviddias/Front-End-Checklist)**, **[Geoffrey Signorato](https://github.com/geosenna)**, **[Sandeep Ramgolam](https://twitter.com/__Sun__)** and **[Cédric Poilly](https://github.com/CedricPoilly)**.

## Translators
**Chinese:** **[Johnsen](https://github.com/JohnsenZhou)**

## License

[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ 回到顶部](#目录)**

[low_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-low.png
[medium_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-medium.png
[high_img]: http://res.cloudinary.com/djnyaloac/image/upload/v1508238836/level-checklist-high.png
