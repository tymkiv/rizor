module.exports = function () {
    $.gulp.task('watch', function () {
        // $.gulp.watch('./dev/pug/**/*.pug', $.gulp.series('pug'));
        $.gulp.watch('./*.html', $.gulp.series('html'));
        $.gulp.watch('./dev/styles/**/*.scss', $.gulp.series('styles:dev'));
        $.gulp.watch(['./dev/images/general/**/*.{png,jpg,gif,svg}',
            './dev/images/content/**/*.{png,jpg,gif,svg}'], $.gulp.series('img:dev'));
        $.gulp.watch('./dev/images/svg/*.svg', $.gulp.series('svg'));
        $.gulp.watch('./dev/js/**/*.js', $.gulp.series('js:dev'));
        

    });
};
    