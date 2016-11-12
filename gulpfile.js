var gulp = require('gulp');
var gutil = require('gulp-util');
var merge = require('merge-stream');
var del = require('del');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

// 引入配置文件
var config = require('./src/common/config');
// 配置变量替换
var preprocess = require('gulp-preprocess');

// 复制文件
gulp.task('copy', function() {
  return merge(
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('public/images')),

    gulp.src('src/lib/**/*')
      .pipe(gulp.dest('public/lib')),

    gulp.src('src/common/config.static.scss')
      .pipe(preprocess({
        context: config
      }))
      .pipe(gulp.dest('src/styles'))
  );
});

// Production build 正式执行
gulp.task('webpack', function() {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      'compress': {
        'warnings': false
      }
    })
  );

  // run webpack
	webpack(myConfig, function(err, stats) {
		if (err) throw new gutil.PluginError('webpack', err);
		gutil.log('[webpack]', stats.toString({
			colors: true,
      chunks: false,
      children: false
		}));
	});
});

var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = 'cheap-module-eval-source-map';
myDevConfig.debug = true;
// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

// Development build 开发执行
gulp.task('webpack-dev', function() {
  // run webpack
	devCompiler.run(function(err, stats) {
		if (err) throw new gutil.PluginError('webpack-dev', err);
		gutil.log('[webpack-dev]', stats.toString({
			colors: true,
      chunks: false,
      children: false
		}));
	});
});

// Build and watch cycle (another option for development)
gulp.task('webpack-watch', ['webpack-dev'], function () {
  gulp.watch('src/**/*', ['webpack-dev']);
});

// 清理文件
gulp.task('clean', function () {
  return del(['public/**']);
});

// 监听图片，其它资源变动
gulp.task('watch', function () {
  gulp.watch(['src/images/**/*', 'src/libs/**/*'], function(e) {
    gutil.log('[watch]', e.path);
    gulp.src('src/images/**/*')
      .pipe(gulp.dest('public/images'));
    gulp.src('src/lib/**/*')
      .pipe(gulp.dest('public/lib'));
  });
});

// 开发任务
gulp.task('dev', ['copy', 'webpack-dev']);

// 生产任务
gulp.task('default', ['copy', 'webpack']);
