const gulp = require('gulp')
const each = require('gulp-each')
const webpack = require('webpack-stream')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const strip = require('gulp-strip-comments')
const rename = require("gulp-rename")
const gulpif = require('gulp-if')
const multipipe = require('multipipe')
const browserSync = require('browser-sync').create()
const del = require('del')
let mode = 'development'


function components() {
  return gulp.src('src/components/*.{html,htm}')
    .pipe(concat('components.htm'))
    .pipe(gulp.dest('dist'))
}

function compo() {
  return gulp.src('src/compo/index.js')
    .pipe(webpack({
      mode,
      output: { filename: 'compo.js' },
      optimization: { minimize: false },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
          }
        ]
      }
    }))
    .pipe(gulpif(mode === 'production', strip()))
    .pipe(gulp.dest('dist'))
    .pipe(gulpif(mode === 'production', multipipe(
      rename({suffix: '.min'}),
      uglify(),
      gulp.dest('dist')
    )))
}

function comments(done) {
  if(mode === 'production') return gulp.src('dist/*.js')
    .pipe(each(function(content, file, callback) {
      callback(null, `/*!
 * Components.js v3.1.0
 * (c) ${new Date().getFullYear()} compo.js@mail.ru
 * Released under the MIT License.
 */\n` + content)
    }))
    .pipe(gulp.dest('dist'))
  done()
}

function serve(done) {
  browserSync.init({
    server: { baseDir: "./" },
    notify: false,
    open: false
  })
  done()
}

function reload(done) {
  browserSync.reload()
  done()
}

function clean() {
  return del('dist')
}

function copy() {
  return gulp.src('src/assets/**/*.*')
    .pipe(gulp.dest('dist'))
}

function public(done) {
  mode = 'production'
  done()
}

function watch() {
  gulp.watch('index.html', gulp.series(reload))
  gulp.watch('src/**/*.{html,htm}', gulp.series(components, reload))
  gulp.watch('src/compo/**/*.js', gulp.series(compo, reload))
}

const dev = gulp.series(clean, copy, components, compo, comments, serve, watch)
const build = gulp.series(public, dev)

gulp.task('default', dev)
gulp.task('build', build)
