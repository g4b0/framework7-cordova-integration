var gulp = require('gulp');
var gutil = require('gulp-util');
var exec = require('gulp-exec');
var spawn = require('child_process').spawn;
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var fileinclude = require('gulp-file-include');

/**
 * Config obj
 */
var config = {
    jsDir: 'www/js',
    jsDirBrowser: 'platforms/browser/www/js',
    cssDir: 'www/css',
    cssDirBrowser: 'platforms/browser/www/css',
    templatesDir: 'templates',
    htmlDir: 'www',
    htmlDirAndroid: 'merges/android',
    htmlDirBrowser: 'platforms/browser/www',
    production: !!gutil.env.production
};

/**
 * Automatically run 'cordova prepare browser' after any modification 
 * into the www directory - really useful for development/deplyment purpose
 * 
 * @see watch task
 */
gulp.task('prepare', function () {
    gutil.log('Prepare browser');

    var options = {
        continueOnError: false, // default = false, true means don't emit error event 
        pipeStdout: false, // default = false, true means stdout is written to file.contents 
        customTemplatingThing: "test" // content passed to gutil.template() 
    };
    var reportOptions = {
        err: true, // default = true, false means don't write err 
        stderr: true, // default = true, false means don't write stderr 
        stdout: true // default = true, false means don't write stdout 
    }

    return gulp.src('./**/**')
            .pipe(exec('cordova prepare browser', options))
            .pipe(exec.reporter(reportOptions));

});

/**
 * Watch for changes in www
 */
gulp.task('watch', function () {
    gulp.watch('templates/**/*', [
        'fileinclude-ios', 
        'fileinclude-android'
    ]);
    gulp.watch('www/**/*', ['prepare']);
});

/**
 * Default task
 */
gulp.task('default', ['prepare']);


/**
 * Javascript production depolyment.
 */
gulp.task('deploy-js', function () {
    gutil.log('Deploy JS');
    return gulp.src(config.jsDir + '/*.js')
            .pipe(stripDebug())
            .pipe(uglify())
            .pipe(gulp.dest(config.jsDirBrowser));
});

gulp.task('deploy-css', function () {
    gutil.log('Deploy CSS');
    return gulp.src(config.cssDir + '/*.css')
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest(config.cssDirBrowser));
});

gulp.task('fileinclude-ios', function () {
    gutil.log('File include IOS');
    gulp.src([config.templatesDir + '/*.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: config.templatesDir + '/_ios/',
                context: {
                    os: 'ios'
                }
            }))
            .pipe(gulp.dest(config.htmlDir));
});

gulp.task('fileinclude-android', function () {
    gutil.log('File include ANDROID');
    gulp.src([config.templatesDir + '/*.html'])
            .pipe(fileinclude({
                prefix: '@@',
                basepath: config.templatesDir + '/_android/',
                context: {
                    os: 'android'
                }
            }))
            .pipe(gulp.dest(config.htmlDirAndroid));
});

gulp.task('deploy-html', function () {
    gutil.log('Deploy HTML');
    return gulp.src(config.htmlDir + '/*.html')
            .pipe(gulp.dest(config.htmlDirBrowser));
});

/**
 * Production deployment
 * To be run before uploading files to the server with no gulp instaces running
 */
gulp.task('deploy', [
    'deploy-js', 
    'deploy-css', 
    'fileinclude-ios', 
    'fileinclude-android', 
    'deploy-html'
]);
