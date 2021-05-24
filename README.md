<h1 align="center">
<br>
  <img src="https://raw.githubusercontent.com/thedaviddias/Front-End-Checklist/master/data/images/logo-front-end-checklist.jpg" alt="Front-End Checklist" width="130">
  <br>
    <br>
  Front-End Checklist
  <br>
</h1>

<h4 align="center">Front-End Checklist adalah daftar lengkap seluruh elemen yang anda butuhkan untuk pengujian sebelum publikasi website / halaman HTML ke produksi</h4>

<p align="center">
  <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square" alt="PRs Welcome">
  </a>
    <a href="https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/thedaviddias/Front-End-Checklist.svg?style=flat-square" alt="Contributors">
  </a>
  <a href="https://github.com/thedaviddias/Front-End-Checklist/">
    <img src="https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg?style=flat-square" alt="Front‑End_Checklist followed">
  </a>
    <a href="https://creativecommons.org/publicdomain/zero/1.0/">
    <img src="https://img.shields.io/badge/license-CC0-green.svg?style=flat-square" alt="CC0">
  </a>
</p>

<p align="center">
  <a href="#how-to-use">Cara Penggunaan</a> • <a href="#contributing">Kontribusi</a> • <a href="https://frontendchecklist.io">Situs Web</a> • <a href="https://www.producthunt.com/posts/front-end-checklist">Product Hunt</a>
</p>
<p align="center">
    <span>Checklist Lainnya:</span>
    <br>
  <a href="https://github.com/thedaviddias/Front-End-Performance-Checklist#---------front-end-performance-checklist-">🎮 Front-End Performance Checklist</a> • <a href="https://github.com/thedaviddias/Front-End-Design-Checklist#front-end-design-checklist">💎 Front-End Design Checklist</a>
</p>

Berdasarkan pengalaman tahunan para pengembang Front-End, dengan tambahan-tambahan dari beberapa checklist open-source lainnya.

## Daftar Isi

1. **[Head](#head)**
2. **[HTML](#html)**
3. **[Webfonts](#webfonts)**
4. **[CSS](#css)**
5. **[Gambar](#gambar)**
6. **[JavaScript](#javascript)**
7. **[Keamanan](#keamanan)**
8. **[Kinerja](#kinerja)**
9. **[Aksesibilitas](#aksesibilitas)**
10. **[SEO](#seo)**
11. **[Terjemahan](#terjemahan)**

---

## Cara penggunaan?

Seluruh item dalam **Front-End Checklist** dibutuhkan pada mayoritas proyek, namun beberapa elemen dapat diabaikan atau tidak esensial (contoh: dalam kasus dari sebuah aplikasi web administrasi, anda mungkin tidak membutuhkan RSS feed). Kami memilih untuk menggunakan 3 level fleksibilitas:



* ![Rendah][low_img] : **Direkomendasikan** tetapi dapat diabaikan pada beberapa keadaan khusus
* ![Sedang][medium_img] : **Sangat direkomendasikan** namun dapat diabaikan pada beberapa keadaan khusus. Beberapa elemen, jika diabaikan, dapat berdampak buruk dalam hal kinerja atau SEO.
* ![Tinggi][high_img] : **Tidak dapat diabaikan** dengan alasan apapun. Anda mungkin dapat mengakibatkan disfungsi pada sebuah laman, masalah aksesibilitas atau SEO. Prioritas pengujian diutamakan pada elemen ini.


Beberapa sumber memiliki emotikon yang dapat membantu anda untuk memahami tipe konten / membantu anda menemukan checklist:

* 📖: dokumentasi or artikel
* 🛠: online tool / testing tool
* 📹: media or konten video

> Anda dapat berkontribusi pada ***Front-End Checklist App***, penjelasan selengkapnya terkait proyek baca [CONTRIBUTING.md file](https://github.com/thedaviddias/Front-End-Checklist/blob/master/CONTRIBUTING.md)

---

## Head

> **Catatan:** Anda dapat menemukan [seluruh list](https://github.com/joshbuchea/HEAD) yang ada di dalam `<head>` dokumen HTML.

### Meta tag

* [ ] **Doctype:** ![High][high_img] Doctype adalah HTML5 dan terletak di kepala (head) seluruh halaman HTML

```html
<!doctype html> <!-- HTML5 -->
```

> * 📖 [Determining the character encoding - HTML5 W3C](https://www.w3.org/TR/html5/syntax.html#determining-the-character-encoding)

*Kedua meta tag (Charset dan Viewport) perlu didahulukan pada bagian kepala (head).*

* [ ] **Charset:** ![High][high_img] Charset (UTF-8) dideklarasikan dengan benar.

```html
<!-- Set character encoding for the document -->
<meta charset="utf-8">
```

* [ ] **Viewport:** ![High][high_img] Viewport dideklarasikan dengan benar.

```html
<!-- Viewport for responsive web design -->
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

* [ ] **Title:** ![High][high_img] Judul (title) digunakan pada semua halaman (SEO: Google mengkalkulasi lebar pixel dari karakter yang digunakan di judul, dan dipotong antara 472 dan 482 pixel. Limit rata-rata karakter berkisar 55 karakter.

```html
<!-- Document Title -->
<title>Page Title less than 55 characters</title>
```

> * 📖 [Title - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/title)
> * 🛠 [SERP Snippet Generator](https://www.sistrix.com/serp-snippet-generator/)

* [ ] **Description:** ![High][high_img] A meta description is provided, it is unique and doesn't possess more than 150 characters.

* [ ] **Description:** ![High][high_img] Deskripsi meta disediakan, unik dan tidak memiliki lebih dari 150 karakter

```html
<!-- Meta Description -->
<meta name="description" content="Description of the page less than 150 characters">
```

> * 📖 [Meta Description - HTML - MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/The_head_metadata_in_HTML#Adding_an_author_and_description)

* [ ] **Favicons:** ![Medium][medium_img] Setiap favicon telah dibuat dan ditampilkan dengan benar. Jika anda hanya memiliki sebuah `favicon.ico`, letakkan pada root situs anda. Biasanya anda tidak membutuhkan markup apapun. Namun, mengkoneksikan hal itu dengan contoh di bawah dapat menjadi latihan yang baik. Saat ini, **form PNG direkomendasikan** dibanding format `.ico` (berdimensi: 32x32px).

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

* [ ] **Apple Web App Meta:** ![Low][low_img] Meta-tag Apple tersedia.

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

* [ ] **Windows Tiles:** ![Low][low_img] Windows tiles (ubin) tersedia dan terhubung.

```html
<!-- Microsoft Tiles -->
<meta name="msapplication-config" content="browserconfig.xml" />
```

Markup xml minimum yang dibutuhkan untuk file `browserconfig.xml` adalah sebagai berikut:

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

* [ ] **Canonical:** ![Medium][medium_img] Gunakan `rel="canonical"` untuk menghindari duplikasi konten

```html
<!-- Helps prevent duplicate content issues -->
<link rel="canonical" href="http://example.com/2017/09/a-new-article-to-read.html">
```

> * 📖 [Use canonical URLs - Search Console Help - Google Support](https://support.google.com/webmasters/answer/139066?hl=en)
> * 📖 [5 common mistakes with rel=canonical - Google Webmaster Blog](https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html)

### HTML tags

* [ ] **Language attribute:** ![High][high_img] Atribut `lang` situs web anda ditentukan dan terkait dengan bahasa halaman saat ini.

```html
<html lang="en">
```

* [ ] **Direction attribute:** ![Medium][medium_img] Arah pembacaan ditentukan pada tag HTML (dapat digunakan pada tagl HTML lainnya)

```html
<html dir="rtl">
```

> * 📖 [dir - HTML - MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/dir)

* [ ] **Alternate language:** ![Low][low_img] Tag (penanda) bahasa dari situs web anda ditentukan dan terkait dengan bahasa halaman saat ini.

```html
<link rel="alternate" href="https://es.example.com/" hreflang="es">
```

* [ ] **x-default:** ![Low][low_img] Tag bahasa situs web anda untuk halaman internasional

```html
<link rel="alternate" href="https://example.com/" hreflang="x-default" />
```

> * 📖 [x-default - Google](https://webmasters.googleblog.com/2013/04/x-default-hreflang-for-international-pages.html)


* [ ] **Conditional comments:** ![Low][low_img] Komentar bersyarat tersedia untuk IE jika dibutuhkan

> * 📖 [About conditional comments (Internet Explorer) - MSDN - Microsoft](https://msdn.microsoft.com/en-us/library/ms537512(v=vs.85).aspx)

* [ ] **RSS feed:** ![Low][low_img] Jika proyek anda adalah sebuah blog atau mempunyai artikel, link RSS telah disediakan

* [ ] **CSS Critical:** ![Medium][medium_img] CSS critical mengumpulkan seluruh CSS yang digunakan untuk merender bagian halaman yang terlihat. Hal itu disematkan sembelum CSS dasar dipanggil dan di antara `<style></style>` dalam satu baris (yang diperkecil). 

> * 🛠 [Critical by Addy Osmani on GitHub](https://github.com/addyosmani/critical) mengotomatiskan ini.

* [ ] **CSS order:** ![High][high_img] Seluruh file CSS dimuat sebelum file JavaScript apapun di bagian `<head>`. (Kecuali dalam kasus di mana kadang-kadang file JS dimuat secara asinkron pada bagian atas halaman anda).

### Social meta

Visualisasikan dan hasilkan secara otomatis meta tag social kami dengan [Meta Tags](https://metatags.io/)

***Facebook OG*** dan ***Twitter Cards*** sangat direkomendasikan untuk situs web apapun. Social media lain dapat dipertimbangkan jika kamu menarget audiensi khusus dan ingin memastikan tampilannya

* [ ] **Facebook Open Graph:** ![Low][low_img] Seluruh Facebook Open Graph (OG) diuji dan tidak ada yang hilang atau berisi informasi yang salah. Gambar sedikitnya berukuran 600 x 315 pixel, walau demikian 1200 x 630 pixel lebih disarankan

> **Catatan:** Menggunakan `og:image:width` dan `og:image:height` akan menspesifikasikan dimensi gambar pada crawler sehingga dapat merender gambar secara langsung tanpa harus mengunduh secara asinkron dan memprosesnya.

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
> * 🛠 Uji halaman anda dengan [Facebook OG testing](https://developers.facebook.com/tools/debug/)

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
> * 🛠 Uji halaman anda dengan [Twitter card validator](https://cards-dev.twitter.com/validator)

**[⬆ back to top](#table-of-contents)**

---

## HTML

### Best Practices

* [ ] **HTML5 Semantic Elements:** ![High][high_img] Elemen semantik HTML5 digunakan dengan sesuai (header, section, footer, main...).

> * 📖 [HTML Reference](http://htmlreference.io/)

* [ ] **Error pages:** ![High][high_img] Halaman error 404 dan 5xx tersedia. Ingatlah bahwa halaman error 5xx butuh untuk diintegrasikan dengan file CSSnya (tidak ada panggilan keluar di server pada kondisi ini)

* [ ] **Noopener:** ![Medium][medium_img] Seandainya anda menggunakan link eksternal `target="_blank"`, link anda harus mempunyai atribut `rel="noopener"` untuk menghindari tab nabbing (eksploitasi tab). Jika anda memerlukan bantuan Firefox versi yang lebih lawas, gunakan `rel="noopener noreferrer"`.

> * 📖 [About rel=noopener](https://mathiasbynens.github.io/rel-noopener/)

* [ ] **Clean up comments:** ![Low][low_img] Kode yang tidak diperlukan perlu untuk dihapus sebelum dikirimkan pada halaman produksi.
### HTML testing

* [ ] **W3C compliant:** ![High][high_img] Seluruh halaman perlu diuji dengan validator W3C untuk mengidentifikasi kemungkinan masalah pada kode HTML.

> * 🛠 [W3C validator](https://validator.w3.org/)

* [ ] **HTML Lint:** ![High][high_img] Saya menggunakan alat untuk membantu saya menganalisis isu apapun yang ada pada kode HTML saya.

> * 🛠 [Dirty markup](https://www.10bestdesign.com/dirtymarkup/)

> * 🛠 [webhint](https://webhint.io/)


* [ ] **Link checker:** ![High][high_img] Tidak ada link yang rusak di halaman, menjamin bahwa anda tidak memiliki error 404.


> * 🛠 [W3C Link Checker](https://validator.w3.org/checklink)

* [ ] **Adblockers test:** ![Medium][medium_img] Situs web anda menampilkan konten dengan benar saat adblocker diaktifkan (Anda dapat menyediakan pesan yang mendukung orang-orang untuk menonaktifkan adblocker mereka)   

> * 📖 [Use AdBlocking in your Dev Environment](https://andreicioara.com/use-adblocking-in-your-dev-environment-48db500d9b86)


**[⬆ back to top](#table-of-contents)**

---

## Webfonts

> **Catatan:** Menggunakan font web dapat menyebabkan flash dari teks yang tidak berstyle/ flash dari teks yang tidak terlihat - pertimbangkan untuk menggunakan font dan/atau memanfaatkan pemuat font untuk mengontrol perilaku font

* [ ] **Webfont format:** ![High][high_img] WOFF, WOFF2 dan TTF didukung oleh semua browser moderen

> * 📖 [WOFF - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff).
> * 📖 [WOFF 2.0 - Web Open Font Format - Caniuse](https://caniuse.com/#feat=woff2).
> * 📖 [TTF/OTF - TrueType and OpenType font support](https://caniuse.com/#feat=ttf)
> * 📖 [Using @font-face - CSS-Tricks](https://css-tricks.com/snippets/css/using-font-face/)


* [ ] **Webfont size:** ![High][high_img] Ukuran webfont tidak melebihi 2 MB (termasuk seluruh varian)

* [ ] **Webfont loader:** ![Low][low_img] Mengontrol perilaku pemuatan dengan sebuah pemuat font

> * 🛠 [Typekit Web Font Loader](https://github.com/typekit/webfontloader)

**[⬆ back to top](#table-of-contents)**

---

## CSS

> **Catatan:** Take a look at [CSS guidelines](https://cssguidelin.es/) and [Sass Guidelines](https://sass-guidelin.es/) followed by most  Front-End developers. If you have a doubt about CSS properties, you can visit [CSS Reference](http://cssreference.io/). There is also a short [Code Guide](http://codeguide.co/) for consistency.

> **Catatan:** Lihat [Panduan CSS](https://cssguidelin.es/) dan [Panduan Sass](https://sass-guidelin.es/) yang diikuti oleh kebanyakan pengembang Front-End. Jika anda mempunyai keraguan tentang properti CSS, anda dapat melihat [Referensi CSS](http://cssreference.io/). Di sana juga tersedia sebuah [Panduan Singkat Code](http://codeguide.co/) untuk konsistensi.

* [ ] **Responsive Web Design:** ![High][high_img] Situs web menggunakan desain web responsif
* [ ] **CSS Print:** ![Medium][medium_img] Sebuah stylesheet cetak disediakan dan benar untuk setiap halaman
* [ ] **Preprocessors:** ![Low][low_img] Proyek anda menggunakan CSS preprocessor (e.g [Sass](http://sass-lang.com/), [Less](http://lesscss.org/), [Stylus](http://stylus-lang.com/)).
* [ ] **Unique ID:** ![High][high_img] Jika ID digunakan, mereka unik untuk setiap halaman
* [ ] **Reset CSS:** ![High][high_img] CSS reset (reset, normalize atau reboot) digunakan dan termutakhirkan. *(Jika anda menggunakan framework CSS seperti Bootstrap atau Foundation, fungsi Normalize sudah termasuk di dalamnya.)*

> * 📖 [Reset.css](https://meyerweb.com/eric/tools/css/reset/)
> * 📖 [Normalize.css](https://necolas.github.io/normalize.css/)
> * 📖 [Reboot](https://getbootstrap.com/docs/4.0/content/reboot/)

* [ ] **JS prefixes:** ![Low][low_img] Semua class (atau id- digunakan dalam file JavaScript) dimulai dengan **js-** dan tidak diberi style ke dalam file CSS

```html
<div id="js-slider" class="my-slider">
<!-- Or -->
<div id="id-used-by-cms" class="js-slider my-slider">
```

* [ ] **Embedded atau inline CSS:** ![High][high_img] Dengan alasan apapun hindari menerapkan CSS dalam tag `<style>` atau menggunakan CSS inline: gunakan hanya untuk alasan yang valid (contoh: background-image untuk slider, critical CSS). 

* [ ] **Vendor prefixes:** ![High][high_img] Awalan CSS digunakan dan digenerate sesuai dengan browser yang mendukung

> * 🛠 [Autoprefixer CSS online](https://autoprefixer.github.io/)

### Kinerja

* [ ] **Concatenation:** ![High][high_img] File CSS dirangkai dalam satu file *(tidak untuk HTTP/2)*.
* [ ] **Minification:** ![High][high_img] Seluruh file CSS diperkecil
* [ ] **Non-blocking:** ![Medium][medium_img] File CSS harus dalam kondisi 'non-blocking' untuk menghindari DOM memakan waktu memuat yang lebih banyak.

> * 📖 [loadCSS dengan filament group](https://github.com/filamentgroup/loadCSS)
> * 📖 [Contoh preload CSS menggunakan loadCSS](https://gist.github.com/thedaviddias/c24763b82b9991e53928e66a0bafc9bf)

* [ ] **Unused CSS:** ![Low][low_img] Hapus CSS yang tidak terpakai.

> * 🛠 [UnCSS Online](https://uncss-online.com/)
> * 🛠 [PurifyCSS](https://github.com/purifycss/purifycss)
> * 🛠 [PurgeCSS](https://github.com/FullHuman/purgecss)
> * 🛠 [Chrome DevTools Coverage](https://developers.google.com/web/updates/2017/04/devtools-release-Catatan#coverage)


### Pengujian CSS

* [ ] **Stylelint:** ![High][high_img] Seluruh file CSS or SCSS files tanpa error apapun.

> * 🛠 [stylelint, CSS linter](https://stylelint.io/)
> * 📖 [Panduan Sass](https://sass-guidelin.es/)

* [ ] **Responsive web design:** ![High][high_img] Seluruh halaman telah diuji pada poin-poin berikut: 320px, 768px, 1024px (dapat lebih / berbeda sesuai dengan analisis anda)

**Responsive Checker -**
> * 🛠 [Am I Responsive?](http://ami.responsivedesign.is/)
> * 🛠 [Mobile Friendly Test](https://search.google.com/test/mobile-friendly)
> * 🛠 [Responsive Website Design Tester](https://responsivedesignchecker.com/)
> * 🛠 [Responsinator](https://www.responsinator.com/)
> * 🛠 [XRespond](https://xrespond.com/)


* [ ] **CSS Validator:** ![Medium][medium_img] CSS telah diuji dan error terkait telah diperbaiki.

> * 🛠 [CSS Validator](https://jigsaw.w3.org/css-validator/)

* [ ] **Desktop Browsers:** ![High][high_img] Seluruh halaman telah diuji pada semua browser desktop terkini(Safari, Firefox, Chrome, Internet Explorer, EDGE...).

* [ ] **Mobile Browsers:**  ![High][high_img] Seluruh halaman telah diuji pada semua mobile browser terkini (Native browser, Chrome, Safari...).

* [ ] **OS:**  ![High][high_img] Seluruh halaman telah diuji pada OS terkini (Windows, Android, iOS, Mac...).

* [ ] **Design fidelity:** ![Low][low_img] Tergantung pada proyek dan kualitas materi kreatif, anda mungkin diminta menyesuaikan desain semirip mungkin. Anda dapat menggunakan beberapa alat untuk membandingkan materi kreatif dengan kode implementasi dan memastikan konsistensinya. 

> [Pixel Perfect - Chrome Extension](https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en)

* [ ] **Reading direction:** ![High][high_img] Seluruh halaman perlu diuji untuk bahasa LTR dan RTL jika mereka diperlukan.

> * 📖 [Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks](https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/)
> * 📖 [Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks](https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/)

**[⬆ kembali ke atas](#table-of-contents)**

---

## Gambar

> **Catatan:** Untuk pemahaman optimasi gambar secara menyeluruh, lihat ebook gratis dari Addy Osmani **[Essential Image Optimization](https://images.guide/)**.

### Best practices

* [ ] **Optimization:** ![High][high_img] Semua gambar dioptimalkan untuk dirender dalam browser. Format WebP dapat digunakan pada kondisi halaman yang sangat diperlukan (seperti halaman home).


> * 🛠 [Imagemin](https://github.com/imagemin/imagemin)
> * 🛠 Gunakan [ImageOptim](https://imageoptim.com/) untuk mengoptimasi gambar anda secara gratis
> * 🛠 Gunakan [KeyCDN Image Processing](https://www.keycdn.com/support/image-processing) untuk mengoptimasi gambar secara real-time
> * 🛠 Gunakan [Kraken.io](https://kraken.io/web-interface) alternatif yang memukau untuk optimasi png dan jpg. Hingga 1mb per file untuk paket gratis.
> * 🛠 [TinyPNG](https://tinypng.com/) optimasi losslessly gambar png, apng (animated png) dan jpg. Versi gratis dan berbayar tersedia.
> * 🛠 [ZorroSVG](http://quasimondo.com/ZorroSVG/) Kompresi jpg-sejenis untuk gambar transparan menggunakan svg masking.
> * 🛠 [SVGO](https://github.com/svg/svgo) tool berabasi Nodejs untuk optimasi grafik file SVG.
> * 🛠 [SVGOMG](https://jakearchibald.github.io/svgomg/) GUI berbasis web dari SVGO untuk optimasi svg secara online.


* [ ] **Picture/Srcset:** ![Medium][medium_img] Kamu menggunakan gambar/srcset untuk menyediakan gambar yang paling sesuai untuk viewport user terkini.

> * 📖 [How to Build Responsive Images with srcset](https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/)

* [ ] **Retina:** ![Low][low_img] Anda menyediakan layout gambar 2x atau 3x, mendukung tampilan retina.
* [ ] **Sprite:** ![Medium][medium_img] Gambar kecil dalam sebuah file sprite(dalam kasus ini ikon, mereka ada dalam gambar sprite SVG).
* [ ] **Width and Height:** ![High][high_img] Set atribut `width` dan `height` pada `<img>` jika gambar akhir yang dirender tidak diketahui (dapat diabaikan untuk ukuran CSS).
* [ ] **Alternative text:** ![High][high_img] Semua `<img>` mempunyai teks alternatif yang mendeskripsikan gambar secara visual.

> * 📖 [Alt-texts: The Ultimate Guide](https://axesslab.com/alt-texts/)

* [ ] **Lazy loading:** ![Medium][medium_img] Gambar lazyloaded (pengganti tanpa skrip selalu disediakan).
> * 🛠 [Native lazy loading polyfill](https://github.com/mfranzke/loading-attribute-polyfill/)

**[⬆ kembali ke atas](#table-of-contents)**

---

## JavaScript

### Best practices

* [ ] **JavaScript Inline:** ![High][high_img] Anda tidak mempunyai kode inline JavaScript (bercampur dengan kode HTML).
* [ ] **Concatenation:** ![High][high_img] File JavaScript disambungkan.
* [ ] **Minification:** ![High][high_img] File JavaScript diperkecil (anda dapat menambahkan akhiran `.min`).

> * 📖 [Minify Resources (HTML, CSS, and JavaScript)](https://developers.google.com/speed/docs/insights/MinifyResources)

* [ ] **JavaScript security:** ![High][high_img]

> * 📖 [Panduan untuk Mengembangkan Aplikasi Aman Menggunakan JavaScript](https://www.owasp.org/index.php/DOM_based_XSS_Prevention_Cheat_Sheet#Guidelines_for_Developing_Secure_Applications_Utilizing_JavaScript)

* [ ] **`noscript` tag:** ![Medium][medium_img] Gunakan tag `<noscript>` di body HTML jika tipe script pada halaman tidak didukung atau jika fitur scripting pada saat ini dimatikan pada browser. Hal ini akan membantu dari sisi client saat merender aplikasi yang berat seperti React.js, lihat [contoh](https://webdesign.tutsplus.com/tutorials/quick-tip-dont-forget-the-noscript-element--cms-25498).

```html
<noscript>
  You need to enable JavaScript to run this app.
</noscript>
```

* [ ] **Non-blocking:** ![Medium][medium_img] File JavaScript dimuat secara asinkron menggunakan `async` atau ditangguhkan menggunakan atribut `defer`. 

> * 📖 [Remove Render-Blocking JavaScript](https://developers.google.com/speed/docs/insights/BlockingJS)

* [ ] **Optimized and updated JS libraries:** ![Medium][medium_img] Seluruh library JavaScript yang digunakan dalam proyek anda diperlukan (Vanilla Javascript untuk fungsionalitas sederhana), diperbarui ke versi terakhir dan tidak membanjiri JavaScript dengan method yang tidak dibutuhkan.

> * 📖 [Anda mungkin tidak memerlukan jQuery](http://youmightnotneedjquery.com/)
> * 📖 [Vanilla JavaScript untuk membangun aplikasi web yang handal](https://plainjs.com/)

* [ ] **Modernizr:** ![Low][low_img] Jika anda memerlukan beberapa fitur yang dapat di-custom secara khusus anda dapat menggunakan Modernizr untuk menambahkan class dalam tag `<html>`. 

> * 🛠 [Customize your Modernizr](https://modernizr.com/download?setclasses)

### Pengujian JavaScript

* [ ] **ESLint:** ![High][high_img] Tidak ada error yang ditandai oleh ESLint (berdasarkan konfigurasi atau aturan baku).

> * 📖 [ESLint - The pluggable linting utility for JavaScript and JSX](https://eslint.org/)

**[⬆ kembali ke atas](#table-of-contents)**

---

## Keamanan

### Pindai and periksa situs web anda

> * [securityheaders.io](https://securityheaders.io/)
> * [Observatory by Mozilla](https://observatory.mozilla.org/)

### Best practices

* [ ] **HTTPS:** ![High][high_img] HTTPS digunakan untuk setiap halaman dan untuk seluruh konten eksternal (plugin, gambar...).

> * 🛠 [Let's Encrypt - Free SSL/TLS Certificates](https://letsencrypt.org/)
> * 🛠 [Free SSL Server Test](https://www.ssllabs.com/ssltest/index.html)
> * 📖 [Strict Transport Security](http://caniuse.com/#feat=stricttransportsecurity)

* [ ] **HTTP Strict Transport Security (HSTS):** ![Medium][medium_img] HTTP header diset 'Strict-Transport-Security'

> * 🛠 [Check HSTS preload status and eligibility](https://hstspreload.org/)
> * 📖 [HTTP Strict Transport Security Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/HTTP_Strict_Transport_Security_Cheat_Sheet.html)
> * 📖 [Transport Layer Protection Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Transport_Layer_Protection_Cheat_Sheet.html)

* [ ] **Cross Site Request Forgery (CSRF):** ![High][high_img] Anda dapat memastikan bahwa request yang dibuat untuk sisi server sah dan berasal dari situs web anda / app untuk menghindari penyerangan CSRF.

> * 📖 [Cross-Site Request Forgery (CSRF) Prevention Cheat Sheet  - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html)

* [ ] **Cross Site Scripting (XSS):** ![High][high_img] Halaman atau situs web anda bebas dari segala kemungkinan isu XSS. 

> * 📖 [XSS (Cross Site Scripting) Prevention Cheat Sheet  - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
> * 📖 [DOM based XSS Prevention Cheat Sheet  - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

* [ ] **Content Type Options:** ![Medium][medium_img] Mencegah Google Chrome dan Internet Explorer dari percobaan mime-sniff tipe konten dari respon yang dideklarasikan oleh server.

> * 📖 [X-Content-Type-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-content-type-options)

* [ ] **X-Frame-Options (XFO):** ![Medium][medium_img] Melindungi pengunjung anda dari serangan clickjacking (pembajakan berbasis click).

> * 📖 [X-Frame-Options - Scott Helme](https://scotthelme.co.uk/hardening-your-http-response-headers/#x-frame-options)
> * 📖 [RFC7034 - HTTP Header Field X-Frame-Options](https://tools.ietf.org/html/rfc7034)

* [ ] **Content Security Policy:** ![Medium][medium_img] Mendefenisikan bagaimana konten dimuat dalam website anda dan di bagian mana diizinkan untuk dimuat. Dapat juga digunakan untuk melindungi melawan serangan (clickjacking)

> * 📖 [Content Security Policy - An Introduction - Scott Helme](https://scotthelme.co.uk/content-security-policy-an-introduction/)
> * 📖 [CSP Cheat Sheet - Scott Helme](https://scotthelme.co.uk/csp-cheat-sheet/)
> * 📖 [CSP Cheat Sheet - OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
> * 📖 [Content Security Policy Reference](https://content-security-policy.com/)

**[⬆ back to top](#table-of-contents)**

---

## Kinerja

### Best practices

* [ ] **Tujuan yang ingin dicapai:** ![Medium][medium_img] Halaman anda harus mencapai sasaran ini:
  * First Meaningful Paint di bawah 1 detik 
  * Time To Interactive di bawah 5 detik untuk konfigurasi "rata-rata" (Gadget Android seharga $200 pada jaringan 3G yang lambat dengan 400ms RTT dan 400kbps kecepatan transfer) dan kunjungan ulang di bawah 2 detik
  * Ukuran file kritikal di bawah 170kb

> * 🛠 [Website Page Analysis](https://tools.pingdom.com)
> * 🛠 [WebPageTest](https://www.webpagetest.org/)
> * 📖 [Size Limit: Make the Web lighter](https://evilmartians.com/chronicles/size-limit-make-the-web-lighter)

* [ ] **Minified HTML:** ![Medium][medium_img] HTML anda diperkecil.

* [ ] **Lazy loading:** ![Medium][medium_img] Gambar, script dan CSS perlu 'lazy loaded' untuk meningkatkan waktu respons pada halaman saat ini (Lihat detail di bagiannya masing-masing)

* [ ] **Cookie size:** ![Medium][medium_img] Jika kamu menggunakkan cookie pastikan cookie tidak melebihi 4096 bytes dan domain name anda tidak mempunyai lebih dari 20 cookie. 

> * 📖 [Cookie specification: RFC 6265](https://tools.ietf.org/html/rfc6265)
> * 📖 [Cookies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies)
> * 🛠 [Browser Cookie Limits](http://browsercookielimits.squawky.net/)

* [ ] **Third party components:** ![Medium][medium_img] Iframe atau komponen pihak ketiga yang mengandalkan JS eksternal (seperti tombol berbagi) dapat digantikan dengan komponent statis ketika dimungkinkan, sehingga membatasi pemanggilan ke APIs eksternal dan menjaga aktivitas user anda tetap private.

> * 🛠 [Simple sharing buttons generator](https://simplesharingbuttons.com/)

### Mempersiapkan request yang akan datang

> * 📖 [Explanation of the following techniques](https://css-tricks.com/prefetching-preloading-prebrowsing/)

* [ ] **DNS resolution:** ![Low][low_img] DNS dari layanan pihak ketiga yang mungkin dibutuhkan diselesaikan terlebih dahulu selama waktu idle menggunakan `dns-prefetch`

```html
<link rel="dns-prefetch" href="https://example.com">
```

* [ ] **Preconnection:** ![Low][low_img] DNS lookup, TCP handshake dan TLS negotiation dengan layanan yang akan segera dibutuhkan diselesaikan terlebih dahulu selama waktu idle menggunakan `preconnect`.

```html
<link rel="preconnect" href="https://example.com">
```

* [ ] **Prefetching:** ![Low][low_img] Resources (sumber daya) yang akan dibutuhkan (cth: lazy loaded images) di-request terlebih dahlulu selama waktu idel menggunakan `prefetch`.

```html
<link rel="prefetch" href="image.png">
```

* [ ] **Preloading:** ![Low][low_img] Resources (sumber daya) yang dibutuhkan pada halaman saat ini (cth: script yang ditempatkan pada akhir `<body>`) didahulukan menggunakan `preload`. 

```html
<link rel="preload" href="app.js">
```

> * 📖 [Perbedaan antara prefetch dan preload](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)

### Pengujian Kinerja

* [ ] **Google PageSpeed:** ![High][high_img] Seluruh halaman telah diuji (tidak hanya beranda) dan mendapatkan skor setidaknya 90/100. 

> * 🛠 [Google PageSpeed](https://developers.google.com/speed/pagespeed/insights/)
> * 🛠 [Test your mobile speed with Google](https://testmysite.withgoogle.com)
> * 🛠 [WebPagetest - Website Performance and Optimization Test](https://www.webpagetest.org/)
> * 🛠 [GTmetrix - Website speed and performance optimization](https://gtmetrix.com/)
> * 🛠 [Speedrank - Improve the performance of your website](https://speedrank.app/)

**[⬆ kembali ke atas](#table-of-contents)**

---

## Aksesibilitas

> **Catatan:** Anda dapat menonton playlist [A11ycasts with Rob Dodson](https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g) 📹 

### Best practices

* [ ] **Progressive enhancement:** ![Medium][medium_img] Fungsi utama seperti navigasi dan pencarian harus bekerja tanpa JavaScript yang aktif.

> * 📖 [Enable / Disable JavaScript in Chrome Developer Tools](https://www.youtube.com/watch?v=kBmvq2cE0D8)

* [ ] **Color contrast:** ![Medium][medium_img] Kontras warna setidaknya harus melewati WCAG AA (AAA untuk mobile)

> * 🛠 [Contrast ratio](https://leaverou.github.io/contrast-ratio/)

#### Judul

* [ ] **H1:** ![High][high_img] Seluruh halaman mempunyai H1 yang bukan merupakan judul dari website
* [ ] **Headings:** ![High][high_img] Heading harus digunakan dengan layak dan dalam urutan yang tepat (H1 ke H6).

> * 📹 [Why headings and landmarks are so important -- A11ycasts #18](https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

### Semantik

* [ ] **Specific HTML5 input types are used:** ![Medium][medium_img] Hal ini penting khususnya untuk perangkat mobile yang menunjukkan keypad terkustomisasi dan widget untuk ukuran yang berbeda.

> * 📖 [Mobile Input Types](http://mobileinputtypes.com/)

### Form

* [ ] **Label:** ![High][high_img] Label diasosiasikan dengan setiap elemen input. Jikalau label tidak dapat ditampilkan, gunakan `aria-label`

> * 📖 [Using the aria-label attribute - MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_aria-label_attribute)

### Menguji Aksesibilitas

* [ ] **Accessibility standards testing:** ![High][high_img] Gunakan WAVE tool untuk menguji jika halaman anda tunduk pada standar aksibilitas.

> * 🛠 [Wave testing](http://wave.webaim.org/)

* [ ] **Keyboard navigation:** ![High][high_img] Uji situs web anda hanya menggunakan keyboard dalam urutan yang tak terlihat sebelumnya. Semua elemen interaktif dapat dijangkau dan digunakan.

* [ ] **Screen-reader:** ![Medium][medium_img] Semua halaman diuji dalam screen-reader (VoicerOver, ChromeVox, NVDA atau Lynx)

* [ ] **Focus style:** ![High][high_img] Jika fokus dinonaktifkan, akan digantikan dengan status yang terlihat di CSS.

> * 📹 [Managing Focus - A11ycasts #22](https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)

**[⬆ kembali ke atas](#table-of-contents)**

---

## SEO

* [ ] **Google Analytics:** ![Low][low_img] Google Analytics dipasang dan dikonfigurasi dengan benar.

> * 🛠 [Google Analytics](https://analytics.google.com/analytics/web/)
> * 🛠 [GA Checker (and others)](http://www.gachecker.com/)

* [ ] **Search Console:** ![Low][low_img] Konsol pencarian dipasang dan dikonfigurasi dengan benar. Fungsionalitas itu ditawarkan secara gratis oleh Google untuk membantu anda memonitor, memelihara, dan troubleshoot kehadiran situs web anda pada pencarian Google.

> * 🛠 [Search Console](https://search.google.com/search-console/about)

* [ ] **Headings logic:** ![Medium][medium_img] Teks judul membantu anda memahami konten di halaman saat ini

> * 🛠 [Tota11y, tab Headings](http://khan.github.io/tota11y/#Try-it)

* [ ] **sitemap.xml:** ![High][high_img] A sitemap.xml exists and was submitted to Google Search Console (previously Google Webmaster Tools). Sitemap.xml eksis dan dikirim ke konsol pencarian Google (sebelumnya Google Webmaster Tools).

> * 🛠 [Sitemap generator](https://websiteseochecker.com/html-sitemap-generator/)

* [ ] **robots.txt:** ![High][high_img] Robots.txt tidak memblok halaman-halaman situs web.

> * 📖 [The robots.txt file](https://varvy.com/robottxt.html)
> * 🛠 Uji robots.txt anda dengan [Google Robots Testing Tool](https://www.google.com/webmasters/tools/robots-testing-tool)

* [ ] **Structured Data:** ![High][high_img] Halaman menggunakan data terstruktur diuji dan tanpa error. Data terstruktur membantu crawler(fungsi perambah) memahami konten pada halaman saat ini.

> * 📖 [Pengantar Data Terstruktur - Search - Google Developers](https://developers.google.com/search/docs/guides/intro-structured-data)
> * 📖 [JSON-LD](https://json-ld.org/)
> * 📖 [Microdata](https://www.w3.org/TR/microdata/)
> * 🛠 Uji halaman anda dengan [Rich Restults Test](https://search.google.com/test/rich-results)
> * 🛠 Daftar lengkap kosakata yang dapat digunakan sebagai data terstruktur. [Schema.org Full Hierarchy](http://schema.org/docs/full.html)

* [ ] **Sitemap HTML:** ![Medium][medium_img] HTML sitemap disediakan dan dapat diakses melalui link di-footer dari situs web anda

> * 📖 [Panduan Sitemap - Bantuan Google](https://support.google.com/webmasters/answer/183668?hl=en)

* [ ] **Pagination link tags:** ![Medium][medium_img] Menyediakan `rel="prev"` dan `rel="next"` untuk mengindikasikan halaman yang dipaginasi.

> * 🛠 [Alat uji (rel="prev/next") Paginasi](https://technicalseo.com/seo-tools/rel-prev-next/)

> * 📖 [Panduan Paginasi - Bantuan Google](https://support.google.com/webmasters/answer/1663744?hl=en)

```html
<!-- Example: Pagination link tags for page 2 of a paginated list -->
<link rel="prev" href="https://example.com/?page=1">
<link rel="next" href="https://example.com/?page=3">
```

**[⬆ kembali ke atas](#table-of-contents)**

---

## Terjemahan

The Front-End Checklist is also available in other languages. Thanks for all translators and their awesome work!

Front-End Checklist juga tersedia dalam bahasa lain. Terima kasih kepada semua penerjemah dan pekerjaan mereka yang luar biasa!

* 🇯🇵 Jepang: [miya0001/Front-End-Checklist](https://github.com/miya0001/Front-End-Checklist)
* 🇪🇸 Spanyol: [eoasakura/Front-End-Checklist-ES](https://github.com/eoasakura/Front-End-Checklist-ES)
* 🇨🇳 Mandarin: [JohnsenZhou/Front-End-Checklist](https://github.com/JohnsenZhou/Front-End-Checklist)
* 🇰🇷 Korea: [kesuskim/Front-End-Checklist](https://github.com/kesuskim/Front-End-Checklist)
* 🇧🇷 Portugis: [jcezarms/Front-End-Checklist](https://github.com/jcezarms/Front-End-Checklist)
* 🇻🇳 Vietnam: [euclid1990/Front-End-Checklist](https://github.com/euclid1990/Front-End-Checklist)
* 🇹🇼 Mandarin Tradisional: [EngineLin/Front-End-Checklist](https://github.com/EngineLin/Front-End-Checklist)
* 🇫🇷 Prancis: [ynizon/Front-End-Checklist](https://github.com/ynizon/Front-End-Checklist)
* 🇷🇺 Rusia: [ungear/Front-End-Checklist](https://github.com/ungear/Front-End-Checklist)
* 🇹🇷 Turki: [eraycetinay/Front-End-Checklist](https://github.com/eraycetinay/Front-End-Checklist)
* 🇩🇪 Jerman: [xfuture603/Front-End-Checklist](https://github.com/xFuture603/Front-End-Checklist)
* 🇵🇱 Polandia: [mbiesiad/Front-End-Checklist](https://github.com/mbiesiad/Front-End-Checklist)
* 🇮🇩 Indonesia: [nniinnoo/Front-End-Checklist](https://github.com/nniinnoo/Front-End-Checklist)

---

## Front-End Checklist Badge

If you want to show you are following the rules of the Front-End Checklist, put this badge on your README file!

Jika anda ingin menunjukkan bahwa anda telah mengikuti aturan dari Front-End Checklist, letakkan badge ini di file README anda.

➔ [![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)

```md
[![Front‑End_Checklist followed](https://img.shields.io/badge/Front‑End_Checklist-followed-brightgreen.svg)](https://github.com/thedaviddias/Front-End-Checklist/)
```

**[⬆ kembali ke atas](#table-of-contents)**

---

## Kontribusi

**Open-issue atau pull-request untuk mengindikasikan perubahan atau penambahan.**


### Panduan

Repositori **Front-End Checklist** terdiri dari dua branch (cabang repositori):

#### 1. `master`

This branch consists of the `README.md` file that is automatically reflected on the [Front-End Checklist](https://frontendchecklist.io) website. Branch ini terdiri dari file `README.md` yang secara otomatis direfleksikan pada situs web [Front-End Checklist](https://frontendchecklist.io)

#### 2. `develop`

Branch ini akan digunakan untuk membuat perubahan yang signifikan pada struktur, konten jika dibutuhkan. Direkomendasikan untuk menggunakan branch master untuk memperbaiki error kecil atau menambahkan item baru.

## Bantuan

Jika kamu mempunya pertanyaan atau saran, jangan ragu untuk menggunakan Gitter atau Twitter:

* [Chat on Gitter](https://gitter.im/Front-End-Checklist/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link)
* [Facebook](https://www.facebook.com/frontendchecklist/)
* [Twitter](https://twitter.com/thedaviddias)

## Penggubah Utama

**[David Dias](https://github.com/thedaviddias)**

## Kontributor

Proyek ini ada berkat semua orang yang berkontribusi. [[Kontribusi]](.github/CONTRIBUTING.md).
<a href="https://github.com/thedaviddias/Front-End-Checklist/graphs/contributors"><img src="https://opencollective.com/front-end-checklist/contributors.svg?width=890" /></a>


## Pendukung

Terima kasih untuk semua pendukung/patron kami! 🙏 [[Menjadi Patron](https://opencollective.com/front-end-checklist#backer)]

<a href="https://opencollective.com/front-end-checklist#backers" target="_blank"><img src="https://opencollective.com/front-end-checklist/backers.svg?width=890"></a>


## Sponsors

Dukung proyek ini dengan menjadi sponsor. Logo anda kan dimunculkan di sini dengan link ke situs web anda. [[Menjadi Patron](https://opencollective.com/front-end-checklist#sponsor)]

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

## Lisensi

[![CC0](https://i.creativecommons.org/p/zero/1.0/88x31.png)](https://creativecommons.org/publicdomain/zero/1.0/)

**[⬆ kembali ke atas](#table-of-contents)**

[low_img]: data/images/priority/low.svg
[medium_img]: data/images/priority/medium.svg
[high_img]: data/images/priority/high.svg
