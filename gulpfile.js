/* jshint camelcase:false */
var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var plug = require('gulp-load-plugins')();
var paths = require('./gulp.config.json');
var log = plug.util.log;
var port = process.env.PORT || 7203;

/**
 * List the available gulp tasks
 */
gulp.task('help', plug.taskListing);

gulp.task('release', function (done) {
    runSequence(
        'clean',
        'copy-assets',
        'buildjs',
        'buildcss',
        'buildhtml',
        function () {
            done();
        }
    );
});

gulp.task('clean', function () {
    del(paths.build);
});

gulp.task('styles', function () {
    return gulp.src(paths.css.source)
        .pipe(plug.sass({
            precision: 10
        }).on('error', plug.sass.logError))
        .pipe(gulp.dest(paths.css.targetDir));
});

gulp.task('copy-assets', function () {
    return gulp
        .src(paths.assets)
        .pipe(gulp.dest(paths.build + 'assets'));
});

gulp.task('buildjs', function () {
    return gulp.src(paths.src)
        .pipe(plug.jspm({
            inject: true,
            minify: true,
            mangle: true,
            skipSourceMaps: true,
            selfExecutingBundle: true
        }))
        .pipe(plug.stripDebug())
        .pipe(plug.rev())
        .pipe(gulp.dest(paths.build + 'assets/js'))
        .pipe(plug.rev.manifest())
        .pipe(gulp.dest(paths.build));
});

gulp.task('buildcss', function () {
    return gulp.src(paths.css.source)
        .pipe(plug.sass({
            precision: 10,
            outputStyle: 'compressed'
        }).on('error', plug.sass.logError))
        .pipe(plug.rev())
        .pipe(gulp.dest(paths.build + paths.css.targetDir))
        .pipe(plug.rev.manifest(paths.build + 'rev-manifest.json', {merge: true}))
        .pipe(gulp.dest(''));
});

gulp.task('buildhtml', function () {

    var manifest = require(paths.build + 'rev-manifest.json');

    return gulp.src(paths.html)
        .pipe(plug.replace('assets/css/styles.css', 'assets/css/' + manifest['styles.css']))
        .pipe(plug.replace('<script type="text/javascript" src="jspm.config.js"></script>', ''))
        .pipe(plug.replace('<script type="text/javascript" src="jspm_packages/system.js"></script>', ''))
        .pipe(plug.replace('<script type="text/javascript">System.import(\'src/app.js\');', '<script type="text/javascript" src="assets/js/' + manifest['app.bundle.js'] + '">'))
        .pipe(gulp.dest(paths.build));
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', function () {
    serve({
        mode: 'dev'
    });

    gulp.watch(paths.css.sourceFiles, ['styles']);
});

/**
 * serve the build environment
 */
gulp.task('serve-build', function () {
    serve({
        mode: 'build'
    });
});

////////////////
/**
 * Start the node server using nodemon.
 * Optionally start the node debugging.
 * @param  {Object} args - debugging arguments
 * @return {Stream}
 */
function serve(args) {
    var options = {
        script: 'serve.js',
        delayTime: 1,
        env: {
            'NODE_ENV': args.mode,
            'PORT': port
        }
    };

    var exec;
    if (args.debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        options.nodeArgs = [args.debug + '=5858'];
    }

    return plug.nodemon(options);
}