'use strict'

const gulp = require('gulp')
const nodemon = require('gulp-nodemon')

let jsFiles = ['**/*.js', '!node_modules/**', '!public/lib/**', '!public/js/lib/**']

gulp.task('inject', () => {
  let wiredep = require('wiredep').stream
  let inject = require('gulp-inject')
  let injectSrc = gulp.src(
    [
      './public/css/*.css',
      './public/js/*.js',
      './public/js/lib/*.js'
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

gulp.task('serve', ['inject'], () => {
  let options = {
    script: 'app.js',
    delayTime: 1,
    env: {
      'PORT': 5000
    },
    watch: jsFiles,
    ignore: [
      './node_modules/**',
      './public/lib/**'
    ]
  }
  return nodemon(options)
    .on('restart', (ev) => {
      console.log('Restarting...')
    })
})
