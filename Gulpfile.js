// Gulp
var gulp = require('gulp');

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
		.pipe(gulp.dest('./prod/css'));
});

gulp.task('uglify', function(){
	gulp.src('./dev/js/*.js')
		.pipe(uglify())
		.pipe(gulp.dest('./prod/js'));
});

gulp.task('stats', function () {
	gulp.src('./prod/**/*')
		.pipe(size())
		.pipe(gulp.dest('./prod'));
});

gulp.task('default', function(){
	gulp.watch("./dev/sass/**/*.scss", function(event){
		gulp.run('sass');
	});

	gulp.watch("./dev/js/**/*.js", function(event){
		gulp.run('uglify');
	});

});