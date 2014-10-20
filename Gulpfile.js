var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var del = require('del');
 
var paths = {
    less: ['./src/css/less/*.less'],
    cssLibs: ['!./src/css/style.css', './src/css/*.css'],
    js: ['./src/js/*.js'],
    font: './src/font/**',
    img: './src/img/**',
    html: './src/*.html',
    dist: {
        css: './dist/css/',
        js: './dist/js/',
        html: './dist/',
        font: './dist/font',
        img: './dist/img'
    }
};
  

gulp.task('clean', function() {
    del.sync(paths.dist.css);
    del.sync(paths.dist.js);
    del.sync(paths.dist.html);
})
 
/**
 * compiles less files into css.
 */
gulp.task('less', function() {
  gulp.src(paths.less)
    .pipe(plugins.concat('style.css'))
    .pipe(plugins.less())
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(paths.dist.css));
});
 
gulp.task('js', function() {
  gulp.src(paths.js)
    .pipe(plugins.concat('app.js'))
    .pipe(plugins.uglify({mangle: false}))
    .pipe(gulp.dest(paths.dist.js));
});

gulp.task('css', function() {
  gulp.src(paths.cssLibs)
    .pipe(gulp.dest(paths.dist.css));
});

gulp.task('font', function() {
  gulp.src(paths.font)
    .pipe(gulp.dest(paths.dist.font));
});

gulp.task('img', function() {
  gulp.src(paths.img)
    .pipe(gulp.dest(paths.dist.img));
});

gulp.task('html', function() {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.dist.html));
});

 
gulp.task('watch', function() {
  gulp.watch(paths.less, ['less', 'dist']);
  console.log('watching directory:' + paths.less.join(', '));
  
  gulp.watch(paths.js, ['js', 'dist']);
  console.log('watching directory:' + paths.js.join(', '));
});
 
 
 
gulp.task('build', ['clean', 'less', 'js', 'css', 'font', 'img', 'html']);
 
gulp.task('default', ['build']);