
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <meta name=”description” content="قائمة التدقيق الشاملة لمطورين واجهات المستخدم تحتوى على عناصر قد تحتاجها او فحصها قبل اطلاق مشروعك / صفحتك.">
    <meta name="msapplication-config" content="browserconfig.xml" />
    <title>قائمة التدقيق لمطورين واجهات الويب</title>
    <link href="https://fonts.googleapis.com/css?family=Cairo" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css"/>
    <link rel="stylesheet" href="css/prism.css"/>
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=UA-139156431-1"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-139156431-1');
    </script>
</head>
<body>
    <nav>
        <h1>قائمة التدقيق لمطورين واجهات الويب</h1>
    </nav>
    <header>
        <img src="logo.jpg"/>
        <p>قائمة التدقيق الشاملة لمطورين واجهات المستخدم تحتوى على عناصر قد تحتاجها او فحصها قبل اطلاق مشروعك / صفحتك.        </p>
        <div class="update-note">مرحبَا بكم في الشكل الجديد من الموقع, سيتم اجراء العديد من التغيرات الاخرى  قريبا بالاضافة الى اطلاق قائمة اخرى لاحقا. 2019/12/08</div>
    </header>
    <section class="index container">
        <article>
        <h2>الفهرس</h2>
        <ul>
            <li><a href="#head">العناصر الداخل Head</a></li>
            <li><a href="#html">HTML</a></li>
            <li><a href="#webfonts">خطوط الويب</a></li>
            <li><a href="#css">CSS</a></li>
            <li><a href="#images">الصور</a></li>
            <li><a href="#js">جافاسكربت</a></li>
            <li><a href="#sec">الحماية</a></li>
            <li><a href="#performance">الأداء</a></li>
            <li><a href="#access">امكانية الوصول</a></li>
            <li><a href="#seo">السيو</a></li>
            <li><a href="#translation">الترجمات</a></li>
        </ul>
    </article>
    </section>
    <section class="how-to-use container">
        <article>
        <h2>كيفية الاستخدام؟</h2>
        <p>جميع العناصر في القائمة يجب أن تستخدم في غالبية المشاريع، لكن بعض العناصر يمكن تجاهلها، مثلا: لا تحتاج إلى تغذية RSS في موقع خاص لإدارة المدارس.</p>
        <p>اخترنا وجود ثلاث مراحل من العناصر وأهمية استخدامها:</p>
        <ul>
            <li>
                <span class="low-icon"></span>
                <p>يعني ان العنصر ينصح إستخدامه لكن يُمكن ان يتم اهماله في بعض الحالات.</p>
            </li>
            <li>
                <span class="medium-icon"></span>
                <p> يعني ان العنصر ينصح بشدة استخدامه، لكن يُمكن ان يهمل في بعض الحالات الخاصة، ولكن بعض العناصر إذا أُهملت يمكن ان تأثر على الأداء او SEO .</p>
            </li>
            <li>
                <span class="high-icon"></span>
                <p> يعني ان العنصر لا يمكن إهماله لأي سبب، اذا تم اهمالة سيتسبب بمشاكل في الصفحة و SEO، أولوية اختبارات الاداء تكون على هذة العناصر اولاً.</p>
            </li>
        </ul>
        <p>نوع المحتوى الذي ستجده في قائمة التدقيق:</p>
        <ul>
            <li>توثيقات أو مقالات</li>
            <li>أدوات اختبار</li>
            <li>محتوى مرئي</li>
        </ul>
    </article>
    </section>
    <section class="head container">
        <article>
        <h2 id="head">ما يتم ضبطه داخل العنصر HEAD</h2>
        <p>
            <span class='high-icon'>نوع المستند</span><span>: تعريف المتصفح انك تستخدم الاصدار الخامس من لغة HTML, يوضع في اعلى الملف</span>
            <pre dir="ltr"><code class="language-markup">&lt;!doctype html> &lt;!-- HTML5 --></code></pre>
        </p>
        <a target="_blank" class="note" href="https://wiki.hsoub.com/HTML#.D8.A8.D9.86.D9.8A.D8.A9_.D9.85.D8.B3.D8.AA.D9.86.D8.AF.D8.A7.D8.AA_HTML" target="_blank">تحديد ترميز الأحرف</a>
        <p>عنصران البيانات الوصفية القادمه (Charset و Viewport) يجب ان تكونا في بداية عنصر Head</p>
        <span class="high-icon">ترميز المحارف</span><span>: يجب على ترميز UTF-8 مكتوب بشكل صحيح</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- تحديد ترميز الاحرف للمستند -->
&lt;meta charset="utf-8"></code></pre>
        <span class="high-icon">العرض</span><span>: العنصر Viewport ايضا يجب ان يكتب بشكل صحيح</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- Viewport for responsive web design -->
&lt;meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"></code></pre>
        <span class="high-icon">العنوان</span><span>: العنوان يجب ان يستخدم في كل الصفحات (سيو : محرك البحث Google يحسب عرض الحرف بالبكسل ويقطع بين 472 الى 482 بكسل, يجب ان يكون الحد الاعلى للاحرف حوالي 55 حرف).</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- عنوان المستند -->
&lt;title>عنوان الصفحه&lt;/title></code></pre>
        <a target="_blank" href="https://wiki.hsoub.com/HTML/title">العنصر title - موسوعة حسوب</a><br/>
        <a target="_blank" href="https://app.sistrix.com/en/serp-snippet-generator">اداة لفحص كيفية ظهور اسم الموقع في محركات البحث</a></br>
        <span class="high-icon">الوصف</span><span>: يجب ان يكون الوصف فريدا من نوعه ولا يتجاوز 150 حرف.</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- الوصف -->
&lt;meta name="description" content="وصف الصفحة لا يتجاوز 150 حرف"></code></pre>
        <a target="_blank" href="https://wiki.hsoub.com/HTML/meta#name">الوصف - موسوعة حسوب</a></br>
        <span class="medium-icon">أَيْقُونَة</span><span>: يجب ان تظعها في عنصر Head, يمكنك استخدام الصيغة .ico ولكن ينصح الان باستخدام الصيغة PNG (الابعاد 32x32px)</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- الصيغة الأساسية -->
&lt;link rel="icon" type="image/x-icon" href="https://example.com/favicon.ico">
&lt;!-- الصيغة التي ينصح بها -->
&lt;link rel="icon" type="image/png" href="https://example.com/favicon.png"></code></pre>
        <span class="low-icon">البيانات الوصفية لتطبيقات Apple :</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- ايقونة Apple Touch (على الأقل 200 بكسل طولا وعرضا) -->
&lt;link rel="apple-touch-icon" href="/custom-icon.png">
            
&lt;!-- لتشغيل الموقع في وضع ملء الشاشة -->
&lt;meta name="apple-mobile-web-app-capable" content="yes">
            
&lt;!-- Status Bar Style (see Supported Meta Tags below for available values) -->
&lt;!-- Has no effect unless you have the previous meta tag -->
&lt;meta name="apple-mobile-web-app-status-bar-style" content="black"></code></pre>
        <a target="_blank" href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html">تكوين تطبيقات الويب</a><br/>
        <a target="_blank" href="https://developer.apple.com/library/archive/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html">البيانات الوصفية المعتمدة</a><br/>
        <span class="low-icon">قائمة ويندوز</span><span>: من ميزات اخر اصدار من نظام ويندوز</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- Microsoft Tiles -->
&lt;meta name="msapplication-config" content="browserconfig.xml" /></code></pre>
        <p>اقل ما يكتب في ملف browserconfig.xml :</p>
        <pre dir="ltr"><code class="language-markup">&lt;?xml version="1.0" encoding="utf-8"?>
&lt;browserconfig>
    &lt;msapplication>
     &lt;tile>
        &lt;square70x70logo src="small.png"/>
        &lt;square150x150logo src="medium.png"/>
        &lt;wide310x150logo src="wide.png"/>
        &lt;square310x310logo src="large.png"/>
     &lt;/tile>
   &lt;/msapplication>
&lt;/browserconfig></code></pre>
        <a target="_blank" href="https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/platform-apis/dn320426(v=vs.85)">تفاصيل أكثر</a><br/>
        <span class="medium-icon">دمج الصفحات</span><span>: يساعد في تجنب المحتوى المتكرر</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- Helps prevent duplicate content issues -->
&lt;link rel="canonical" href="http://example.com/2017/09/a-new-article-to-read.html</code></pre>
        <a target="_blank" href="https://support.google.com/webmasters/answer/139066?hl=ar">دمج عناوين URL المتكررة</a><br/>
        <a target="_blank" href="https://webmasters.googleblog.com/2013/04/5-common-mistakes-with-relcanonical.html">5 اخطاء شائعة مع rel=cononical</a>
        <h3>العنصر HTML</h3>
        <span class="high-icon">اللغة</span><span>: ضع رمز اللغة الاساسية التي تستخدم في الصفحه</span>
        <pre dir="ltr"><code class="language-markup">&lt;html lang="ar"></code></pre>
        <span class="medium-icon">اتجاه الصفحه</span><span>: في حالة اللغة العربية والعبرية والفارسية يستعمل rtl وفي الغات الاخرى يستعمل ltr</span>
        <pre dir="ltr"><code class="language-markup">&lt;html dir="rtl"></code></pre>
        <span class="low-icon">لغة اخرى</span><span>وضع رابط لنسخ اخرى من موقع بلغات مختلفة</span>
        <pre dir="ltr"><code class="language-markup">&lt;link rel="alternate" href="https://es.example.com/" hreflang="tr"></code></pre>
        <span class="low-icon">التعليقات الشرطية</span><span>التعليقات الشرطية لمتصفج IE اذا تحتاج</span><br/>
        <a target="_blank" href="https://docs.microsoft.com/en-us/previous-versions/windows/internet-explorer/ie-developer/compatibility/ms537512(v=vs.85)">التعليقات الشرطية - Microsoft</a><br/>
        <span class="low-icon">تغذية RSS</span><span>: اذا كان مشروعك مدونة او يحتوي على مقالات, يجب توفر وصلة RSS.</span><br/>
        <span class="medium-icon">ضغط شفرة CSS</span><span>: يجمع كل شفرة CSS في سطر واحد (تصغير).</span><br/>
        <span class="high-icon">ترتيب ملفات CSS</span><span>يجب على كلف ملفات CSS ان تحمل قبل اي ملف JavaScript. (عدا بعض الحالات التي تحمل ملفات JavaScript بشكل غير متزامن في اعلى صفحك)</span>
        <h3>مواقع التواصل الاجتماعي</h3>
        <p>مشاهدة وانشاء البيانات الوصفية لمواقع التواصل الاجتماعي بشكل تلقائي مع <a href="https://metatags.io/">Meta Tags</a></p>
        <p>بالنسبة لفيس بوك وتويتر فهما مهمين, المواقع الاجتماعيه الاخرى يمكن ان تاخذ بعين الأعتبار اذا كنت تستهدف جمهور معين.</p>
        <span class="low-icon">فيس بوك</span><span>: الصورة يجب ان تكون على الأقل 600 في 315 بكسل, وينصح 1200 في 630 بكسل.</span>
        <pre dir="ltr"><code class="language-markup">&lt;meta property="og:type" content="website">
&lt;meta property="og:url" content="https://example.com/page.html">
&lt;meta property="og:title" content="Content Title">
&lt;meta property="og:image" content="https://example.com/image.jpg">
&lt;meta property="og:description" content="Description Here">
&lt;meta property="og:site_name" content="Site Name">
&lt;meta property="og:locale" content="en_US">
&lt;!-- Next tags are optional but recommended -->
&lt;meta property="og:image:width" content="1200">
&lt;meta property="og:image:height" content="630"></code></pre>
        <a target="_blank" href="https://developers.facebook.com/docs/sharing/webmasters/">دليل المشاركة لمسؤولي مواقع الويب</a><br/>
        <a target="_blank" href="https://developers.facebook.com/docs/sharing/best-practices/">أفضل ممارسات المشاركة لمواقع الويب وتطبيقات الهواتف المحمولة</a><br/>
        <a target="_blank" href="https://developers.facebook.com/tools/debug/">أداة تصحيح أخطاء المشاركة</a>
        <p>شكرا لفيس بوك لتوفير كل الادوات والتوثيقات مترجمة الى الغة العربية</p>
        <span class="low-icon">تويتر :</span>
        <pre dir="ltr"><code class="language-markup">&lt;meta name="twitter:card" content="summary">
&lt;meta name="twitter:site" content="@site_account">
&lt;meta name="twitter:creator" content="@individual_account">
&lt;meta name="twitter:url" content="https://example.com/page.html">
&lt;meta name="twitter:title" content="Content Title">
&lt;meta name="twitter:description" content="Content description less than 200 characters">
&lt;meta name="twitter:image" content="https://example.com/image.jpg"></code></pre>
        <a target="_blank" href="docs/tweets/optimize-with-cards/guides/getting-started">التوثيق</a><br/>
        <a target="_blank" href="https://cards-dev.twitter.com/validator">اداة فصح التوافق لبطاقات تويتر</a>
        </article>
        <article>
        <h2 id="html">HTML</h2>
        <h3>افضل الممارسات</h3>
        <span class="high-icon">دلالات لفظية</span><span>: يجب ان تستعمل عناصر التي تحتوي دلالات لفظية بشكل مناسب مثل (header, footer, section, main ...)</span><br/>
        <a target="_blank" href="https://htmlreference.io/">مرجع</a><br/>
        <span class="high-icon">صفحات الخطأ</span><span>    : يجب على صفحات الاخطاء 404 و5xx ان تكون متوفر, تذكر صفحه خطا 5xx يجب ان تحتوي على شفرة CSS داخلية.</span><br/>
        <span class="medium-icon">خاصية Noopener</span><span>: في حالة تم استخداك رابط خارجي مع target="_blank", يجب ان يحتوي على خاصية rel="noopener" في الصفحه السابقة, اذا كنت تحتاج دعم الاصدارات القديمة من متصفح فايرفوكس, استخدم rel="noopener noreferrer".</span><br/>
        <span class="low-icon">تنضيف تعليقات</span><span>: احذف جميع التعليقات والشفرات الغير مستخدمة</span>
        <h3>اختبار HTML</h3>
        <span class="high-icon">اختبار W3C</span><span>: جميع الصفحات يجب ان تفحص على W3C وتحديد الاخطاء المحتملة.</span><br/>
        <a target="_blank" href="https://validator.w3.org">اختبار W3C</a><br/>
        <span class="high-icon">فحوصات اخرى</span><span>: استخدام ادوات لتحليل اي خطأ قد يوجد في شفرة HTML</span><br/>
        <a target="_blank" href="https://www.10bestdesign.com/dirtymarkup/">اداة Dirty Markup</a><br/>
        <a target="_blank" href="https://webhint.io/">موقع webhint</a><br/>
        <span class="high-icon">مدقق الارتباط</span><span>: فحص عدم وجود رابط لا يعمل, تاكد من عدم وجود خطأ 404.</span><br/>
        <a target="_blank" href="https://validator.w3.org/checklink">مدقق الروابط</a><br/>
        <span class="high-icon">مانع الاعلانات</span><span>: يجب على موقعك ان يظهر بشكل صحيح اثناء استعمال مانع اعلانات (يجب توفير رسالة تشجع الزائر على اغلاق مانع الاعلانات).</span><br/>
        <a target="_blank" href="https://andreicioara.com/use-adblocking-in-your-dev-environment-48db500d9b86">استخدام مانع الاعلانات في بيئة التطوير</a>
        </article>
        <article>
        <h2 id="webfonts">خطوط الويب</h2>
        <p>ملاحظة : استخدام خطوط ويب قد يسبب مشاكل في النص - خذ في عين الاعتبار ان يكون لديك خط احتياطي (اساسي في كل الاجهزة مثل Arial).</p>
        <a target="_blank" href="https://developers.google.com/fonts/docs/technical_considerations">اعتبارات فنية يجب  ان تاخذها في عين الاعتبار</a><br/>
        <span class="high-icon">صيغ خطوط الويب</span><span>: الصيغ الاتية WOFF و WOFF2 و TTF مدعومة في جميع المتصفحات الحديثة.</span><br/>
        <a target="_blank" href="https://caniuse.com/#feat=woff2">دعم WOFF في المتصفحات</a><br/>
        <a target="_blank" href="https://caniuse.com/#feat=woff2">دعم WOFF2 في المتصفحات</a></br/>
        <a target="_blank" href="https://caniuse.com/#feat=ttf">دعم TTF/OTF في المتصفحات</a><br/>
        <a target="_blank" href="https://css-tricks.com/snippets/css/using-font-face/">استخدام @font-face</a><br/>
        <span class="high-icon">حجم ملف الخط</span><span>: يجب ان لا يتجاوز 2MB</span><br/>
        <span class="low-icon">تحميل خطوط الويب</span><span>: التحكم بسلوك التحميل</span><br/>
        <a target="_blank" href="https://github.com/typekit/webfontloader">Typekit Web Font Loader</a>
        </article>
        <article>
        <h2 id="css">CSS</h2>
        <p>ملاحظة : اذا كان لديك شك في خاصية يمكنك زيارة <a target="_blank" href="https://wiki.hsoub.com/CSS">التوثيق</a></p>
        <span class="high-icon">تصميم ويب متجاوب</span><span>: يجب على التصميم ان يكون متجاوب.</span><br/>
        <span class="medium-icon">تصميم الطباعة</span><span>يجب كتابة تصميم خاص لنسخه الطباعه من موقعك</span><br/>
        <span class="low-icon">المعالجة الاولية</span><span>: مشروعك يستخدم (<a target="_blank" href="https://wiki.hsoub.com/Sass">Sass</a>, Less, Stylus).</span><br/>
        <span class="high-icon">ID مميز</span><span>: اذا استخدم خاصية ID, يجب ان تكون مميزة</span><br/>
        <span class="high-icon">اعادة تعيين CSS</span><span>: ابو خدوداستخدام احد هذة الملفات (reset ,Normalize , reboot) ويجب ان تكون باخر اصدار (اذا كنت تستخدم اطار عمل مثل Bootstrap او Foundation يكون ملف Normalize متضمن بالفعل).</span>
        <ul>
            <li><a target="_blank" href="https://meyerweb.com/eric/tools/css/reset/">Reset.css</a></li>
            <li><a target="_blank" href="https://necolas.github.io/normalize.css/">Normalize.css</a></li>
            <li><a target="_blank" href="https://getbootstrap.com/docs/4.0/content/reboot/">Reboot</a></li>
            <li><a target="_blank" href="https://getbootstrap.com/">Bootstrap</a></li>
            <li><a target="_blank" href="https://foundation.zurb.com/">Foundation</a></li>
        </ul>
        <span class="high-icon">شفرة CSS المضمنه</span><span>: تجنب تضمين شفرة CSS داخل العنصر &lt;style&gt; او كتابة الشفرة بشكل مباشر في ملف HTML.</span><br/>
        <span class="high-icon">البادئات</span><span>: يتم كتابة البادئات وفقا لتوافق المتصفح الخاص بك.</span><br/>
        <a target="_blank" href="https://autoprefixer.github.io/">Autoprefixer CSS online</a>
        <h3>الأداء</h3>
        <span class="high-icon">دمج</span><span>: يتم دمج كل ملفات CSS في ملف واحد بشكل متسلسل.</span><br/>
        <span class="high-icon">ضغط الملفات</span><span>: ملف CSS مضغوط.</span><br/>
        <span class="medium-icon">حظر العرض</span><span>: يجب على ملفات CSS عدم حظر الرؤية.</span><br/>
        <a target="_blank" href="https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css">حظر العرض - Google</a><br/>
        <a target="_blank" href="https://keithclark.co.uk/articles/loading-css-without-blocking-render/">Loading CSS without blocking render</a><br/>
        <span class="high-icon">الشفرات الغير مستعملة</span><span>: احذف كل الاسطر الغير مستعملة.</span>
        <ul>
            <li><a target="_blank" href="https://uncss-online.com/">UnCSS Online</a></li>
            <li><a target="_blank" href="https://github.com/purifycss/purifycss">PurifyCSS</a></li>
            <li><a target="_blank" href="https://github.com/FullHuman/purgecss">PurgeCSS</a></li>
            <li><a target="_blank" href="https://developers.google.com/web/updates/2017/04/devtools-release-notes#coverage">Chrome DevTools Coverage</a></li>
        </ul>
        <h3>اختبار شفرة CSS</h3>
        <span class="high-icon">تصميم ويب متجاوب</span><span>: كل الصفحات يجب ان تختبر في النقاط الاتية: 320px, 768px, 1024px.</span><br/>
        <span class="medium-icon">مدقق شفرة CSS</span><span>: شفرة CSS تم اختبارها وتصحيح اخطاءها.</span><br/>
        <a target="_blank" href="https://jigsaw.w3.org/css-validator/">CSS Validator</a><br/>
        <span class="high-icon">متصفحات سطح المكتب</span><span>: كل الصفحات يتم فحصها على (FireFox, Chrome , Opera , Microsoft Edge).</span><br/>
        <span class="high-icon">متصفحات الهاتف</span><span>: كل الصفحات تم اختبارها على : (Chrome, Safari , Samsung Browser, FireFox).</span><br/>
        <span class="high-icon">أنظمة التشغيل</span><span>: كل الصفحات تم اختبارها على الانظمة الاتية : (Windows, Android, IOS, Mac...).</span><br/>
        <span class="low-icon">الاخلاص في التصميم</span><span>: حسب المشروع وجودة التصميم, قد يطلب منك ان تبرمج نسخه قريبه من تصميم, في هذا الحالة يمكنك استخدام ادوات لتقارن التصميم بالتطبيق البرمجي وضمان التناسق.</span><br/>
        <a target="_blank" href="https://chrome.google.com/webstore/detail/perfectpixel-by-welldonec/dkaagdgjmgdmbnecmcefdhjekcoceebi?hl=en">Pixel Perfect - اضافة متصفح</a><br/>
        <span class="high-icon">قراءة الاتجاه</span><span>: دعم اللغات التي تقرا من اليمين اليسار.</span><br/>
        <a target="_blank" href="https://hacks.mozilla.org/2015/09/building-rtl-aware-web-apps-and-websites-part-1/">Building RTL-Aware Web Apps & Websites: Part 1 - Mozilla Hacks</a><br/>
        <a target="_blank" href="https://hacks.mozilla.org/2015/10/building-rtl-aware-web-apps-websites-part-2/">Building RTL-Aware Web Apps & Websites: Part 2 - Mozilla Hacks</a>
        </article>
        <article>
        <h2 id="images">الصور</h2>
        <p>لفهم اكثر في عملية تجاوب الصور, اقرا الكتاب الالكتروني <a href="https://images.guide/">Essential Image Optimization</a> من عدي عثماني</p>
        <h3>افضل الممارسات</h3>
        <span>تجاوب</span><span>: كل الصور يجب ان تظهر في الصفحه في احسن صورة, بعض الادوات التي ستساعدك :</span>
        <ul>
            <li><a target="_blank" href="https://github.com/imagemin/imagemin">Imagemin</a></li>
            <li><a target="_blank" href="https://imageoptim.com/api">ImageOptim</a></li>
            <li><a target="_blank" href="https://kraken.io/web-interface">Kraken.io</a></li>
            <li><a target="_blank" href="https://tinypng.com/">TinyPNG</a></li>
            <li><a target="_blank" href="http://quasimondo.com/ZorroSVG/">ZorroSVG</a></li>
            <li><a target="_blank" href="https://github.com/svg/svgo">SVGO</a></li>
            <li><a target="_blank" href="https://jakearchibald.github.io/svgomg/">SVGOMG</a></li>
        </ul>
        <span class="medium-icon">صور والعنصر srcset</span><span>: توفير صور مناسبة لكل مقاسات الشاشات.</span><br/>
        <a target="_blank" href="https://www.sitepoint.com/how-to-build-responsive-images-with-srcset/">How to Build Responsive Images with srcset</a><br/>
        <span class="low-icon">شاشات ريتنا</span><span>: بالنسبة للشاشات التي تحتوي معدل عالي من dpi, فان الصور يتم مدها وتَفقد جودتها.</span><br/>
        <a target="_blank" href="https://www.sitelock.com/blog/2018/04/how-to-enable-retina-screen-ready-images-on-your-wordpress-website/">How to Upgrade Website Images for Retina Displays</a><br/>
        <span class="high-icon">الدمج</span><span>: دمج الصور الصغيرة في ملف واحد.</span><br/>
        <a target="_blank" href="https://css.spritegen.com/">CSS Sprite Generator</a><br/>
        <span class="high-icon">العرض والطول</span><span>: تحديد العرض والطول للصورة اذا كانت الابعاد معلومة</span><br/>
        <span class="high-icon">نص بديل</span><span>: كل الصور يجب ان تحتوي على نص بديل يفسر الصورة اذا حدث خطأ في تحميلها.</span><br/>
        <span class="medium-icon">التحميل الكسول</span><span>: توفير خاصية التحميل الكسول في موقعك, مثال :</span>
        <img src="B1.jpg"/>
        </article>
        <article>
        <h2 id="js">Javascript</h2>
        <h3>افضل الممارسات</h3>
        <span class="high-icon">شفرة جافاسكربت في النسق</span><span>: عدم استعمال اي شفرة جافاسكربت مع شفرات HTML.</span><br/>
        <span class="high-icon">دمج</span><span>: دمج الملفات بشكل متسلسل.</span><br/>
        <span class="high-icon">تصغير الحجم</span><span>: ضغط ملفات Javascript.</span><br/>
        <a target="_blank" href="https://developers.google.com/speed/docs/insights/MinifyResources">Minify Resources (HTML, CSS, and JavaScript</a><br/>
        <span class="high-icon">الأمان</span><span>:</span><br/>
        <a target="_blank" href="https://github.com/OWASP/CheatSheetSeries">Guidelines for Developing Secure Applications Utilizing JavaScript</a><br/>
        <span class="high-icon">العنصر noscript</span><span>: العنصر noscript عبارة عن رسالة تظهر للمستخدم اذا تم الغاء تفعيل الجافاسكريبت في متصفحه.</span>
        <pre dir="ltr"><code class="language-markup">&lt;noscript>
    يجب عليك تفعيل الجافاسكريبت لأستخدام الموقع
&lt;/noscript></code></pre>
        <span class="medium-icon">تحديث مكتبات Javascript</span><span>: كل المكتباب المستخدمه يجب ان تكون ضرورية (تفضيل استخدام شفرة Javascript اصلية للمهام البسيطة), كل المكتبات بأخر اصدار ولا تغرق الشفرة بطرق غير مرغوبة او غير ضرورية.</span><br/>
        <a target="_blank" href="http://youmightnotneedjquery.com/">You may not need jQuery</a><br/>
        <a target="_blank" href="https://plainjs.com/"> Vanilla JavaScript for building powerful web applications</a><br/>
        <span class="low-icon">داله Modernizr (المرتب)</span><span>: تقوم باخبار المتصفخ اذا كان يدعم ميزة معينه أم لا ويتصرف بناءً على ذلك.</span>
        <pre dir="ltr"><code class="language-javascript">if (Modernizr.opacity){
    // يدعم
} else {
    // لا يدعم
}</code></pre>
        <a target="_blank" href="https://modernizr.com/download?setclasses">Customize your Modernizr</a><br/>
        <span class="high-icon">اداة ESLint</span><span>: عدم وجود اخطاء تم اعلامها من قبل ESLint (بناء على القواعد او المعايير الخاصة بك.</span><br/>
        <a target="_blank" href="https://eslint.org/">ESLint - The pluggable linting utility for JavaScript and JSX</a>
        </article>
        <article>
        <h2 id="sec">الحماية</h2>
        <h3>الفحص والتحقق من موقعك</h3>
        <a target="_blank" href="https://securityheaders.com/">SecurityHeaders</a><br/>
        <a target="_blank" href="https://observatory.mozilla.org/">Observatory by Mozilla</a><br/>
        <span class="high-icon">بروتوكول نقل النص التشعبي الآمن (HTTPS)</span><span>يجب على بروتوكول HTTPS ان يستخدم في كل صفحه وفي كل المحتوى الاضافي : (صور, مرئيات)</span><br/>
        <a target="_blank" href="https://letsencrypt.org/">Let's Encrypt - Free SSL/TLS Certificates</a><br/>
        <a target="_blank" href="https://www.ssllabs.com/ssltest/index.html">Free SSL Server Test</a><br/>
        <a target="_blank" href="https://caniuse.com/#feat=stricttransportsecurity">Strict Transport Security</a>
        <h3 class="note-un">"لم أتم ترجمه قسم الحماية لعدم خبرتي في المصطلحات المجال ولا فهم للتقنيات"</h3>
        </article>
        <article>
        <h2 id="performance">الاداء</h2>
        <h3>افضل الممارسات</h3>
        <span class="medium-icon">اهداف لتحقيقها</span>
        <ul>
            <li>اول رؤية ذو معنى من الزائر في اقل من ثانية</li>
            <li>الوقت الذي تحتاجه الصفحه لتجهز حوالي الخمس ثواني (على جهاز اندرويد بسعر 200 دولار مع انترنت 3G بطيء) ومعدل ثانيتين في حالة تكرار زيارة الموقع</li>
        </ul>
        <a target="_blank" href="https://tools.pingdom.com/">Website Page Analysis</a><br/>
        <a target="_blank" href="https://www.webpagetest.org/">WebPageTest</a><br/>
        <a target="_blank" href="https://evilmartians.com/chronicles/size-limit-make-the-web-lighter">Size Limit: Make the Web lighter</a><br/>
        <span class="high-icon">ضفط شفرة HTML</span><br/>
        <span class="medium-icon">حجم ملف تعريف الارتباط</span><span>: يجب على الملف ان لا يتجاوز 4096 بايت ويجب على النطاق الخاص بك ان لا يتاوز العشرين ملف ارتباط.</span><br/>
        <a target="_blank" href="https://tools.ietf.org/html/rfc6265">Cookie specification: RFC 6265</a><br/>
        <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies">Cookies</a><br/>
        <a target="_blank" href="http://browsercookielimits.squawky.net/">Browser Cookie Limits</a><br/>
        <span class="medium-icon">مكونات الطرف الثالث</span><span>مكونات الطرف الثالث مثل iframe او مكونات تعتمد على شفرة JS خارجيه يجب ان تستبدل بمكونات ثابته داخليه عند الامكان</span><br/>
        <a target="_blank" href="https://simplesharingbuttons.com/">Simple sharing buttons generator</a>
        <h3>اعداد الطلبات القادمه</h3>
        <p>اعطاء المتصفح تلميح على المحتويات التي سيحتاجها المستخدم للتحميل في الصفحات القادمه.</p>
        <span class="low-icon">التحميل المسبق لـDNS</span><span>: اخبار المتصفح بان هناك رابط معلين يجب ان تبحث عن عنوان IP الخاص به, فلن نحتاج الى الانتظار للبحث عن IP عند الحاجه للصفحة.</span>
        <pre dir="ltr"><code class="language-markup">&lt;link rel="dns-prefetch" href="https://example.com">
</code></pre>
        <span class="low-icon">الاتصال المسبق</span><span>: يستخدم نفس الطريقة السابقة ولكن مع TCP و TLS</span><br/>
        <pre dir="ltr"><code class="language-markup">&lt;link rel="preconnect" href="http://css-tricks.com"></code></pre>
        <span class="low-icon">الجلب المسبق</span><span>: اذا كان هناك اي محتوى يحتاجه المستخدم مستقبلا, مثلا اذا أشرت الى قميص في محل الملابس فصاخب المحال سيقوم بانزال القياسات الاخرى لنفس القميص, يمكن ان يكون المحتوى صورة او سكربت.</span>
        <pre dir="ltr"><code class="language-markup">&lt;link rel="prefetch" href="image.png"></code></pre>
        <span class="low-icon">العرض المسبق</span><span>انه القنبله النووية, يعطينا القابلية على تحميل كل الملفات والمحتوى لرابط معين.</span>
        <pre dir="ltr"><code class="language-markup">&lt;link rel="prerender" href="http://css-tricks.com"></code></pre>
        <a target="_blank" href="https://css-tricks.com/prefetching-preloading-prebrowsing/">مقالة من CSS Tricks لفهم اكبر</a>        
        <h3>فحص الاداء</h3>
        <ul>
            <li><a target="_blank" href="https://developers.google.com/speed/pagespeed/insights/">Google PageSpeed</a></li>
            <li><a target="_blank" href="https://testmysite.withgoogle.com/">Test your mobile speed with Google</a></li>
            <li><a target="_blank" href="https://www.webpagetest.org/">WebPagetest - Website Performance and Optimization Test</a></li>
            <li><a target="_blank" href="https://gtmetrix.com/">GTmetrix - Website speed and performance optimization</a></li>
            <li><a target="_blank"href="https://speedrank.app/">Speedrank - Improve the performance of your website</a></li>
        </ul>
        </article>
        <article>
        <h2 id="access">إمكانية الوصول</h2>
        <p>يمكنك مشاهدة الدورة التالية <a href="https://www.youtube.com/playlist?list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g">A11ycasts مع Rob Dodson</a></p>
        <h3>افضل الممارسات</h3>
        <span class="medium-icon">بدون JavaScript</span><span>: غالبية العمليات يجب ان تعمل بدون شفرة Javascript مثل البحث والتنقل.</span><br/>
        <a target="_blank" href="https://www.youtube.com/watch?v=kBmvq2cE0D8">Enable / Disable JavaScript in Chrome Developer Tools</a><br/>
        <span class="medium-icon">تباين الألوان</span><span>تناسق الالوان مهم ويمكنك قياسه في الاداة ادناه, او استعمل عيناك.</span><br/>
        <a target="_blank" href="https://contrast-ratio.com">Contrast ratio</a>
        <h3>العناوين</h3>
        <span class="high-icon">العنصر H1</span><span>: كل الصفحات يجب ان تحتوي على H1 ولا يجب ان يكون مشابها للـtitle.</span><br/>
        <span class="high-icon">العناوين</span><span>: يجب ان تستخدم بشكل بصورة صحيحه وبترتيب صحيح (h1-h6).</span><br/>
        <a target="_blank" href="https://www.youtube.com/watch?v=vAAzdi1xuUY&index=9&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g">Why headings and landmarks are so important -- A11ycasts #18</a>
        <h3>دلالات</h3>
        <span class="high-icon">تخصيص نوع الادخال</span><span>تخصيص نوع البيانات المدخله مهم جدا وخاصة للهواتف.</span><br/>
        <a target="_blank" href="https://iabdullahwaleed.github.io/Mobile-Input-types/">انواع المُدخلات واهميتها</a>
        <pre dir="ltr"><code class="language-markup">&lt;input type="date"></code></pre>
        <img src="Input.png"/>
        <h3>استمارة</h3>
        <span class="high-icon">العنصر Label</span><span>: عنصر Label يجب ان يكون مرفق مع كل عنصر ادخال</span>
        <h3>اختبارات إمكانية الوصول</h3>
        <span class="high-icon">إختبار معايير امكانية الوصول</span><span>: استخدم الأداة WAVE.</span><br/>
        <a target="_blank" href="http://wave.webaim.org/">Wave</a><br/>
        <span class="high-icon">لوحة المفاتيح</span><span>: فحص موقعك اثناء وجود لوحة المفاتيح, كل العناصر قابلة للوصول والاستعمال.</span><br/>
        <span class="high-icon">التركيز</span><span>: استعمال خاصية التركيز (Focus) لدعم اجهزة Screen Reader.</span><br/>
        <a target="_blank" href="https://www.youtube.com/watch?v=srLRSQg6Jgg&index=5&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g">Managing Focus - A11ycasts #22</a>
        </article>
        <article>
        <h2 id="seo">تحسين محركات البحث (SEO)</h2>
        <span class="high-icon">تحليلات Google</span><span>: تحليلات Google تم تفعليه في الموقع.</span><br/>
        <a target="_blank" href="https://analytics.google.com/analytics/web/provision/?authuser=0#/provision">Google Analytics</a><br/>
        <a target="_blank" href="http://www.gachecker.com/">GA Cheaker</a><br/>
        <span class="medium-icon">منطق العناوين</span><span>العناوين يجب ان تساعد لفهم محتوى الصفحه</span><br/>
        <a target="_blank" href="http://khan.github.io/tota11y/#Try-it">Tota11y, tab Headings</a><br/>
        <span class="high-icon">ملف sitemap.xml</span><span>: ملف sitemap.xml موجود.</span><br/>
        <a target="_blank" href="https://websiteseochecker.com/html-sitemap-generator/">Sitemap generator</a><br/>
        <span class="high-icon">ملف robots.xml</span><span>: ملف robots.xml لا يحظر الصفحه.</span><br/>
        <a target="_blank" href="https://varvy.com/robottxt.html">The robots.txt file</a><br/>
        <a target="_blank" href="https://www.google.com/webmasters/tools/robots-testing-tool?pli=1">فحص ملف robots.xml</a><br/>
        <span class="high-icon">البيانات المنظَّمة</span><span>الصفحات التي تستخدم البيانات المنظمة تم فحصها وبدون اخطاء</span><br/>
        <a target="_blank" href="https://developers.google.com/search/docs/guides/intro-structured-data">التعرّف على آلية عمل البيانات المنظَّمة - Google</a><br/>
        <a target="_blank" href="https://rdfa.info/">RDFa - Linked Data in HTML</a><br/>
        <a target="_blank" href="https://json-ld.org/">JSON-LD</a><br/>
        <a target="_blank" href="https://www.w3.org/TR/microdata/">Microdata</a><br/>
        <a target="_blank" href="https://developers.google.com/structured-data/testing-tool/">Structured Data Testing Tool</a><br/>
        <a target="_blank" href="http://schema.org/docs/full.html">Schema.org Full Hierarchy</a><br/>
        <span class="medium-icon">خريطة الموقع</span><span>: صفحه تعتبر فهرست للموقع يكون متوفر رابطها في اسفل الموقع.</span><br/>
        <a target="_blank" href="https://support.google.com/webmasters/answer/183668?hl=ar">إنشاء ملف Sitemap وإرساله - Google</a><br/>
        <span class="high-icon">توفير روابط لترقيم الصفحات</span><span>: توفير rel="prev" و rel="next".</span>
        <pre dir="ltr"><code class="language-markup">&lt;!-- مثال : توفير صفحات الترقيم للصفحه الثانية -->
&lt;link rel="prev" href="https://example.com/?page=1">
&lt;link rel="next" href="https://example.com/?page=3"></code></pre>
        </article>
        <article>
        <h2 id="translation">الترجمات</h2>
        <ul>
            <li><a target="_blank" href="https://github.com/thedaviddias/Front-End-Checklist">الانجليزية</a></li>
            <li><a target="_blank" href="https://github.com/miya0001/Front-End-Checklist">اليابانية</a></li>
            <li><a target="_blank" href="https://github.com/eoasakura/Front-End-Checklist-ES">الاسبانية</a></li>
            <li><a target="_blank" href="https://github.com/JohnsenZhou/Front-End-Checklist">الصينية</a></li>
            <li><a target="_blank" href="https://github.com/kesuskim/Front-End-Checklist">الكورية</a></li>
            <li><a target="_blank" href="https://github.com/jcezarms/Front-End-Checklist">البرتغالية</a></li>
            <li><a target="_blank" href="https://github.com/euclid1990/Front-End-Checklist">الفيتنامية</a></li>
            <li><a target="_blank" href="https://github.com/EngineLin/Front-End-Checklist">الصينية التقليدية</a></li>
            <li><a target="_blank" href="https://github.com/ynizon/Front-End-Checklist">الفرنسية</a></li>
            <li><a target="_blank" href="https://github.com/ungear/Front-End-Checklist">الروسية</a></li>
            <li><a target="_blank" href="https://github.com/eraycetinay/Front-End-Checklist">التركية</a></li>
            <li><a target="_blank" href="https://github.com/xFuture603/Front-End-Checklist">الالمانية</a></li>
        </ul>
        </article>
    </section>
    <footer class="container">
        <article>
        تمت الكتابة من قبل <a href="https://github.com/thedaviddias" target="_blank">David Dias</a> وتمت الترجمه من قبل <a href="https://github.com/iAbdullahWaleed" target="_blank">Abdullah Waleed</a>
        <a href="https://github.com/iAbdullahWaleed/FrontEnd-Checklist" target="_blank"><img height="32" width="32" src="github.svg" class="github-logo"/></a>
    </article>
    </footer>
    <!-- Javascript -->
    <script src="prism.js"></script>
</body>
</html>
