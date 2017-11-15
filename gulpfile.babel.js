'use strict';

import path from 'path';
import fs from 'fs';

import gulp from 'gulp';
import runSequence from 'run-sequence';

import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
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

import modernizr from 'modernizr';
import modernizrConfig from './modernizr-config.json';

import del from "del";
import rename from "gulp-rename";

import pkg from './package.json';

// ========================================
// VARIABLES
// ========================================

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
  src: `${dirs.src}/views/index.pug`,
};

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
      return require('./data/en/_project.json');
    }))
		.pipe(pug({
      locals: {},
      pretty: true
    }))
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('pug-rebuild', ['compile-pug'], () => {
	browserSync.reload();
});

gulp.task('minify-html', ['compile-pug'], () => {
  return gulp.src('./dist/*.html')
    .pipe(htmlreplace({
      css: {
        src: './styles/main.min.css',
        tpl: '<link rel="preload" href="%s" as="style" onload="this.rel=\'stylesheet\'">'
      },
      nocss: {
        src: './styles/main.min.css',
      }
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(dirs.dest));
});

// ========================================
// CSS
// ========================================

gulp.task('compile-styles', () => {
  return gulp.src(sassPaths.src)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles-prod', () => {
  return gulp.src(sassPaths.src)
    .pipe(plumber((error) => {
      console.log(error);
      this.emit('end');
    }))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    // .pipe(uncss({
    //   html: [dirs.dest + '/**/*.html']
    // }))
    .pipe(cssnano())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.reload({stream: true}));
});

// Generate & Inline Critical-path CSS
gulp.task('critical', () => {
  return gulp.src(dirs.src + '/*.html')
    .pipe(critical({
      base: 'dist/',
      inline: true,
      css: ['dist/styles/main.css']
    }))
    // .on('error', function(err) { gutil.log(gutil.colors.red(err.message)); })
    .pipe(gulp.dest(dirs.dest));
});

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

gulp.task('compress-images', () => {
  return gulp.src(dirs.src + '/img/**/*.{jpg,png,webp}')
   .pipe(imagemin([
     imagemin.jpegtran({progressive: true}),
     imagemin.optipng({optimizationLevel: 5}),
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
    browser: false,
    open: false
	});
});

gulp.task('browser-reload', () => {
	browserSync.reload();
});

// ========================================
// MISC
// ========================================


gulp.task("clean-dist",  () => {
  return del(["./dist"], {force: true});
});

gulp.task("clean-coverage",  () => {
  return del(["./coverage"]);
});

gulp.task('json-rebuild', () => {
  gulp.src("./data/en/items/*.json")
    .pipe(jsonConcat('./_items.json', (data) => {
      return new Buffer(JSON.stringify(data));
    }))
    .pipe(gulp.dest('./data/en'))

    .on('finish', () => {
      return gulp.src([ "./data/en/_items.json", './data/en/project/*.json'])
        .pipe(jsonConcat('./_project.json', (data) => {
          return new Buffer(JSON.stringify(data));
        }))
        .pipe(gulp.dest('./data/en'));
    })
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('copy', () => {
  return gulp.src([
    // Copy all files
    `${dirs.src}/*.*`,
    `${dirs.src}/CNAME`,
    `!${dirs.src}/modernizr-custom.min.js`,
  ], {
    // Include hidden files by default
    dot: true
  })
  .pipe(gulp.dest(dirs.dest));
});


gulp.task( 'modernizr', (done) => {
  modernizr.build(modernizrConfig, (code) => {
    fs.writeFile(`${dirs.src}/modernizr-custom.min.js`, code, done);
  });
});


// ##########################################
// LIST TASKS
// ##########################################

gulp.task("watch", function () {
  gulp.watch(dirs.src + '/styles/**/*.scss', ['lint-css', 'compile-styles']);
  gulp.watch(dirs.src + '/views/**/*.pug', ['pug-rebuild']);
  gulp.watch(['!'+ dirs.src + '/data/_*.json', dirs.src + '/data/*.json'], ['json-rebuild']);
  gulp.watch(dirs.src + "/img/**/*", ["compress-images"]);
  gulp.watch([dirs.src + '/scripts/**/*.js'], ['lint', 'webpack']);
  gulp.watch(['test/**'], ['mocha']);
});

gulp.task("dev", ['compile-styles', 'compile-pug', "browser-sync", "watch"]);
// gulp.task("build", ["compile-sass", "compile-js", "compile-pug", "compress-images"]);

gulp.task("build", (done) => {
  runSequence(
    ['json-rebuild', 'modernizr', "clean-dist"],
    ['lint-css'],
    ["minify-html", "styles-prod", "compress-images", "webpack"],
    'copy',
  done);
});

gulp.task("test", (done) => {
  runSequence("clean-coverage", "coverage", "mocha", "report", done);
});

gulp.task("default", ["browser-sync", "watch"]);
