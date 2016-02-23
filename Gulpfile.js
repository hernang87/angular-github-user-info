// Gulp
var gulp = require('gulp');
var connect = require('gulp-connect');

// Sass/CSS stuff
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// JavaScript
var uglify = require('gulp-uglify');

// Stats and Things
var size = require('gulp-size');
	
gulp.task('sass', function (){
	gulp.src(['./dev/sass/*.scss', '!./dev/sass/_variables.scss'])
		.pipe(sass({
			includePaths: ['./dev/sass'],
			outputStyle: 'expanded'
		}))
		.pipe(prefix(
			"last 1 version", "> 1%", "ie 8", "ie 7"
			))
		.pipe(gulp.dest('./dev/css'))
		.pipe(minifycss())
		.pipe(gulp.dest('./prod/css'))
		.pipe(connect.reload());
});

gulp.task('uglify', function(){
	gulp.src('./dev/js/*.js')
		//.pipe(uglify())
		.pipe(gulp.dest('./prod/js'))
		.pipe(connect.reload());
});

gulp.task('stats', function () {
	gulp.src('./prod/**/*')
		.pipe(size())
		.pipe(gulp.dest('./prod'));
});

gulp.task('html', function() {
	gulp.src('./dev/*.html')
		.pipe(gulp.dest('./prod'))
		.pipe(connect.reload());
});

gulp.task('webserver', function() {
  	connect.server({
    	livereload: true    	  	
  	});
});

gulp.task('watch', function() {
	gulp.watch("./dev/sass/**/*.scss",['sass']);
	gulp.watch("./dev/js/**/*.js", ['uglify']);	
	gulp.watch("./dev/*.html", ['html']);	
});

gulp.task('default', ['webserver','watch']);