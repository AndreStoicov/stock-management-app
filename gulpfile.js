'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')
const eslint = require('gulp-eslint')

let jsFiles = ['**/*.js', '!node_modules/**', '!public/lib/**']

gulp.task('style', () => {
  return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format('node_modules/eslint-path-formatter'))
        .pipe(eslint.failAfterError())
        .pipe(eslint.result(result => {
          console.log(`ESLint result: ${result.filePath}`)
          console.log(`# Messages: ${result.messages.length}`)
          console.log(`# Warnings: ${result.warningCount}`)
          console.log(`# Errors: ${result.errorCount}`)
        }))
})

gulp.task('inject', () => {
  let wiredep = require('wiredep').stream
  let inject = require('gulp-inject')
  let injectSrc = gulp.src(
    [
      './public/css/*.css',
      './public/js/*.js'
    ], {read: false})
  let injectOptions = {
    ignorePath: '/public'
  }
  let options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  }

  return gulp.src('./src/views/*.jade')
  .pipe(wiredep(options))
  .pipe(inject(injectSrc, injectOptions))
  .pipe(gulp.dest('./src/views'))
})

gulp.task('serve', ['style', 'inject'], () => {
  let options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles,
    ignore:
    [
      './node_modules/**',
      './public/lib/**'
    ]
  }
  return nodemon(options)
        .on('restart', (ev) => {
          console.log('Restarting...')
        })
})
