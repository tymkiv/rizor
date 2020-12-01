module.exports = function () {
  $.gulp.task('html', function(){
    return $.gulp.src('./*.html')
    .pipe($.browserSync.reload({stream: true}))
  });
}
