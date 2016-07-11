var gulp        = require('gulp');
var browserSync = require('browser-sync');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');

var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        }
    });
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch(['index.html', '_config.yml', '_layouts/**/*.html', '_includes/**/*.html', 'emails/**/*'], ['jekyll-rebuild']);
});

/**
 * Creates/Compile _site folder.
 */
gulp.task('build', ['jekyll-build']);

/**
 * Serve task, running just `gulp serve` will
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('serve', ['browser-sync', 'watch']);

/**
 * Default task, running just `gulp` will
 * Creates/Compile _site folder.
 */
gulp.task('default', ['build']);
