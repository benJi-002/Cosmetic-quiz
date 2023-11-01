const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename");
const cleanCSS = require("gulp-clean-css");
const browsersync = require("browser-sync");

const dist = "./dist";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [
                                  [
                                    '@babel/preset-env', {
                                      debug: true,
                                      corejs: 3,
                                      useBuiltIns: "usage"
                                  
                                    },
                                  ], 
                                ],
                                sourceType: "unambiguous"
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist + '/js'))
                .pipe(browsersync.stream());
});

gulp.task("build-sass", () => {
    return gulp.src("./src/scss/**/*.scss")
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
                .pipe(rename({suffix: '.min', prefix: ''}))
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest(dist + '/assets/css'))
                .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
      .pipe(gulp.dest(dist + "/assets"))
      .on("end", browsersync.reload);
  });

gulp.task("watch", () => {
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });

    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
      .pipe(webpack({
        mode: 'production',
        output: {
          filename: 'script.js'
        },
        module: {
          rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: [['@babel/preset-env', {
                  corejs: 3,
                  useBuiltIns: "usage"
                }]]
              }
            }
          }]
        }
      }))
      .pipe(gulp.dest(dist));
  });

gulp.task("default", gulp.parallel("watch", "build"));