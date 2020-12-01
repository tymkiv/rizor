module.exports = function() {
    // $.gulp.task('serve', function() {
    //     $.browserSync.init({
    //         server: './'
    //     });
    // });
    $.gulp.task('serve', function() {
      $.browserSync.init({
          server: {
              baseDir: "./"
          }
      });
    });
};
