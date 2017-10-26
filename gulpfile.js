let browserSync = require('browser-sync').create();
let gulp        = require('gulp');
let less        = require('gulp-less');
let rename      = require('gulp-rename');
var replace     = require('gulp-replace');

// Static Server + watching less and HTML files.
gulp.task('serve',['less', 'tpl'], () => {
  browserSync.init({
    server: {
      index: 'index.html'
    },
  });
  gulp.watch('css/*.less', ['less']);
  gulp.watch(['gulpfile.js', '*.html'], ['tpl']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers.
gulp.task('less', () => gulp.src('css/*.less')
  .pipe(less())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
);

// Prepare templates.
gulp.task( 'tpl', function() {
  return gulp
    .src(['amazon-product.html', 'related-post.html'])
    .pipe(rename(function (path) {
      path.extname = ".tpl"
    }))

    //  Amazon Product image.
    .pipe(replace(/<a href="#(url|permalink)"><img src="img\/berries.jpg"><\/a>/g, '{{thumbnail}}'))
    // Related Post image.
    .pipe(replace(/<img src="img\/berries.jpg">/g, '{{thumbnail}}'))

    //  Links.
    .pipe(replace(/#permalink/g, '{{permalink}}'))
    .pipe(replace(/#url/g, '{{url}}'))

    .pipe(replace(/A Nice.+Purpose/g, '{{title}}'))
    .pipe(replace(/\$20/g, '{{price}}'))
    .pipe(replace(/nam.*erat\./i, '{{excerpt}}'))
    .pipe(replace(/<htm[\s\S]+<body>/, ''))
    .pipe(replace(/<script[\s\S]+/, ''))
    .pipe(replace(/(\n)\s/g, '$1'))
    .pipe(replace(/^\s+$/gm, ''))
    .pipe( gulp.dest( 'tpl/' ) )
  ;
});+

gulp.task('default', ['serve']);
