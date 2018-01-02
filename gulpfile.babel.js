'use strict';

import path from 'path';
import fs from 'fs';

import gulp from 'gulp';
import runSequence from 'run-sequence';
import gutil from 'gulp-util';
import gulpIf from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';

import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import gcmq from 'gulp-group-css-media-queries';
const critical = require('critical').stream;

import pug from 'gulp-pug';
import data from 'gulp-data';
import htmlmin from 'gulp-htmlmin';

import webpack from "webpack";
import webpackStream from 'webpack-stream';
import webpackConfig from "./webpack.config.js";

import imagemin from 'gulp-imagemin';
import imageminWebp from 'imagemin-webp';

import browserSync from 'browser-sync';

import eslint from 'gulp-eslint';
import mocha from 'gulp-mocha';
import istanbul from 'gulp-istanbul';

import changed from 'gulp-changed';
import cached from 'gulp-cached';
import jsonConcat from 'gulp-json-concat';
import plumber from "gulp-plumber";
import htmlreplace from 'gulp-html-replace';
import cdnizer from "gulp-cdnizer";
import gulpif from 'gulp-if';

import modernizr from 'modernizr';
import modernizrConfig from './modernizr-config.json';

import del from "del";
import rename from "gulp-rename";

const argv = require('yargs').argv;

import pkg from './package.json';

// ========================================
// VARIABLES
// ========================================

const dataFolder = './data';

function getDirectories(srcPath) {
  return fs.readdirSync(srcPath).filter(file => fs.statSync(path.join(srcPath, file)).isDirectory())
}

const langs = getDirectories(dataFolder) || [];

if (argv.l === undefined) {
  argv.l = 'en'; // Default language
}

const dirs = {
	root: '.',
  src: 'src',
  dest: 'dist'
};

const sassPaths = {
  src: `${dirs.src}/styles/main.scss`,
  dest: `${dirs.dest}/styles/`
};

const pugPaths = {
  src: `${dirs.src}/views/index-${argv.l}.pug`,
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';



// ========================================
// PUG / HTML
// ========================================

gulp.task('compile-pug', () => {
  return gulp.src(pugPaths.src)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(data(() => {
      return require(`./data/${argv.l}/_project.json`);
    }))
		.pipe(pug({
      locals: {},
      pretty: true
    }))
    .pipe(rename({
      basename: 'index'
    }))
    .pipe(gulp.dest(dirs.dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('pug-rebuild', ['compile-pug'], () => {
	browserSync.reload();
});

// gulp.task('minify-html', () => {
//   langs.forEach(lang => {
//     return gulp.src(`./dist/index-en.html`)
//       .pipe(htmlmin({
//         collapseWhitespace: true,
//         removeComments: true
//       }))
//       .pipe(rename({
//         basename: 'index'
//       }))
//       // .pipe(gulpif(lang !== 'en', gulp.dest(`${dirs.dest}/${lang}`), gulp.dest(`${dirs.dest}`)))
//       .pipe(gulp.dest(`${dirs.dest}`));
//   })
// });

gulp.task('compile-all-pug', () => {
  langs.forEach(lang => {
    return gulp.src(`${dirs.src}/views/index-${lang}.pug`)
      .pipe(data(() => {
        return require(`./data/${lang}/_project.json`);
      }))
      .pipe(pug({
        locals: {},
        pretty: true
      }))
      .pipe(gulp.dest(`${dirs.dest}`));
  });
})

// ========================================
// CSS
// ========================================

gulp.task('compile-styles', () => {
  return gulp.src(sassPaths.src)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.init()))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gcmq())
    .pipe(cssnano())
    // .pipe(uncss({
    //   html: [dirs.dest + '/**/*.html']
    // }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulpIf(isDevelopment, sourcemaps.write('.')))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
  langs.forEach(lang => {
    return gulp.src(`${dirs.dest}/index-${lang}.html`)
      .pipe(critical({
        base: 'dist/',
        inline: true,
        css: 'dist/styles/main.min.css',
        minify: true,
        ignore: [/url\(/, '@font-face', /print/]
      }))
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(rename({
        basename: 'index'
      }))
      .pipe(gulpif(lang !== 'en', gulp.dest(`${dirs.dest}/${lang}`), gulp.dest(`${dirs.dest}`)))
  })
});

        // dest: '../.tmp/critical.min.css',

gulp.task('lint-css', function lintCssTask() {
  const gulpStylelint = require('gulp-stylelint');

  return gulp.src(dirs.src + '/styles/**/*.scss')
    .pipe(cached('css'))
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }));
});

// ========================================
// JAVASCRIPT
// ========================================

gulp.task('lint', () => {
  return gulp.src(dirs.src + '/scripts/**/*.js')
  .pipe(cached('lint'))
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.results(results => {
    // Called once for all ESLint results.
    console.log(`Total Results: ${results.length}`);
    console.log(`Total Warnings: ${results.warningCount}`);
    console.log(`Total Errors: ${results.errorCount}`);
  }));
});

gulp.task("webpack", () => {
  return gulp.src(dirs.src + '/scripts/main.js')
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(webpackStream(webpackConfig, webpack))
    .pipe(gulp.dest(dirs.dest + '/scripts/'))
    .pipe(browserSync.reload({stream: true}));
});


// ========================================
// IMAGES
// ========================================

gulp.task('compress-images', ['compress-webp'], () => {
  return gulp.src(dirs.src + '/img/**/*.{jpg,png,svg}')
    .pipe(imagemin([
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5})
    ]))
    .pipe(gulp.dest(dirs.dest + '/img/'));
});

gulp.task('compress-webp', () => {
  return gulp.src(dirs.src + '/img/**/*.webp')
    .pipe(imagemin([
      imageminWebp({quality: 70})
    ]))
    .pipe(gulp.dest(dirs.dest + '/img/'));
});

// ========================================
// TDD
// ========================================

gulp.task("coverage", function () {
  return  gulp.src(dirs.src + '/scripts/**/*.js')
    .pipe(istanbul({
        includeUntested: true
    }))
    .pipe(istanbul.hookRequire());
});

gulp.task("report", function () {
  gulp.src(dirs.src + '/scripts/**/*.js', { read: false })
    .pipe(istanbul.writeReports());
});

gulp.task("mocha", function () {
  return gulp.src("test/**/*.test.js", { read: false })
    .pipe(mocha({
      reporter: 'spec',
      compilers: 'js:babel-core/register',
      require: ['jsdom-global']
    }));
});

// ========================================
// SERVER
// ========================================

gulp.task('browser-sync', () => {
	browserSync({
		server: {
      baseDir: './dist',
      index: 'index.html'
    },
		notify: false,
    browser: true,
    open: true
	});
});

gulp.task('browser-reload', () => {
	browserSync.reload();
});

// ========================================
// MISC
// ========================================

gulp.task('cdn', () => {
  langs.forEach(lang => {
    return gulp.src(`./dist/index-${lang}.html`)
      .pipe(cdnizer({
        defaultCDNBase: "//everywhere-8a59.kxcdn.com",
        allowRev: true,
        files: [
          '/scripts/app.bundle.js',
          '/styles/main.min.css',
          '/favicon-32x32.png',
          '/favicon-16x16.png',
          '/apple-touch-icon.png',
          '/browserconfig.xml',
          '/service-worker.js',
          '/safari-pinned-tab.svg',
          '/manifest.json',
          '/img/social/facebook-banner.jpg',
          '/img/logos/logo-front-end-checklist.jpg',
          '/img/logos/logo-front-end-checklist.webp'
        ]
      }))
      .pipe(gulp.dest(dirs.dest))
    })
});

gulp.task("clean-dist",  () => {
  return del(['./dist'], {force: true});
});

gulp.task("clean-tmp",  () => {
  return del(['!./dist/index.html', './dist/index-*.html'], {force: true});
});

gulp.task("clean-coverage",  () => {
  return del(["./coverage"]);
});

gulp.task('json-rebuild', () => {
  return gulp.src(`./data/${argv.l}/items/*.json`)
    .pipe(jsonConcat('./_items.json', (data) => {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest(`./data/${argv.l}`))

    .on('finish', () => {
      return gulp.src([ `./data/${argv.l}/_items.json`, `./data/${argv.l}/project/*.json`])
        .pipe(jsonConcat('./_project.json', (data) => {
          return new Buffer(JSON.stringify(data));
        }))
        .pipe(gulp.dest(`./data/${argv.l}`));
    })
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('json-rebuild-all', () => {
  langs.forEach(lang => {
    return gulp.src(`./data/${lang}/items/*.json`)
      .pipe(jsonConcat('./_items.json', (data) => {
        return new Buffer(JSON.stringify(data));
      }))
      .pipe(gulp.dest(`./data/${lang}`))

      .on('finish', () => {
        return gulp.src([ `./data/${lang}/_items.json`, `./data/${lang}/project/*.json`])
          .pipe(jsonConcat('./_project.json', (data) => {
            return new Buffer(JSON.stringify(data));
          }))
          .pipe(gulp.dest(`./data/${lang}`));
      })
    });
});

gulp.task('copy', () => {
  return gulp.src([
    // Copy all files
    `${dirs.src}/*.*`,
    `${dirs.src}/_headers`,
    `!${dirs.src}/modernizr-custom.min.js`,
  ], {
    // Include hidden files by default
    dot: true
  })
  .pipe(gulp.dest(dirs.dest));
});


gulp.task( 'modernizr', done => {
  modernizr.build(modernizrConfig, code => {
    fs.writeFile(`${dirs.src}/modernizr-custom.min.js`, code, done);
  });
});


// ##########################################
// LIST TASKS
// ##########################################

gulp.task("watch", function () {
  gulp.watch(dirs.src + '/styles/**/*.scss', ['lint-css', 'compile-styles']);
  gulp.watch(dirs.src + '/views/**/*.pug', ['pug-rebuild']);
  gulp.watch(['!'+ dirs.src + `/data/${argv.l}/**/_*.json`, dirs.src + '/data/**/*.json'], ['json-rebuild']); // When JSON files are updated, concatenate these
  gulp.watch(dirs.src + '/data/**/_*.json', ['compile-pug']); // When JSON are updated, compile PUG files
  gulp.watch(dirs.src + "/img/**/*", ["compress-images"]);
  gulp.watch([dirs.src + '/scripts/**/*.js'], ['lint', 'webpack']);
  gulp.watch(['test/**'], ['mocha']);
});

gulp.task('dev', ['compile-pug', 'compile-styles', 'compress-images', 'webpack', 'json-rebuild', 'browser-sync', 'watch']);

gulp.task('build', done => {
  runSequence(
    ['clean-dist', 'json-rebuild-all', 'modernizr'],
    ['lint-css'],
    ['compile-all-pug'],
    ['compile-styles', 'compress-images', 'webpack'],
    ['cdn'],
    ['critical', 'copy'],

    // ['clean-tmp'],
    done);
});

gulp.task('test', done => {
  runSequence('clean-coverage', 'coverage', 'mocha', 'report', done);
});

gulp.task('default', ['browser-sync', 'watch']);
