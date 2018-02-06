var gulp = require("gulp"),
    babel = require("gulp-babel"),
    connect = require("gulp-connect");

gulp.task("readJs", function () {
  return gulp.src("./js/index.js")
    .pipe(babel())
    .pipe(gulp.dest("dist/js"));
});

// var watcher = gulp.watch('index.js', ['default']);
// watcher.on('change', function(event) {
//   console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
// });


gulp.task('connect', function() {
    connect.server({
        root: './', //当前项目主目录
        livereload: true //自动刷新
    });
});
gulp.task('html', function() {
    gulp.src('./*.html')
        .pipe(connect.reload());
});


gulp.task('watch', function() {
    gulp.watch('./css/*.css', ['html']); //监控css文件
    gulp.watch('./js/*.js', ['readJs', 'html']); //监控js文件
    gulp.watch(['./*.html'], ['html']); //监控html文件
}); //执行gulp server开启服务器


gulp.task('default', ['readJs', 'connect', 'watch']);