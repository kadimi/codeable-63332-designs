let browserSync = require('browser-sync').create();
let gulp        = require('gulp');
let less        = require('gulp-less');
// let rename      = require('gulp-rename');

// Static Server + watching less, JavaScript and PHP files
gulp.task('serve',['less'], () => {
	browserSync.init({
		server: {
			index: 'index.html'
		},
	});
	gulp.watch('css/*.less', ['less']);
	// gulp.watch('./**/*.css').on('change', browserSync.reload);
	gulp.watch('index.html').on('change', browserSync.reload);
});

// Compile less into CSS & auto-inject into browsers
gulp.task('less', () => gulp.src('css/*.less')
  .pipe(less())
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream())
);



gulp.task('default', ['serve']);

// gulp.task('serve', ['less', 'cleanCSS', 'jscs'], function () {
//   browserSync.init({
//     proxy: 'outsourcephp.dev',
//   });
//   gulp.watch(['gulpfile.js', 'public/js/*.js'], ['jscs']);
//   gulp.watch('./**/*.js').on('change', browserSync.reload);
//   gulp.watch('./**/*.php').on('change', browserSync.reload);

// });