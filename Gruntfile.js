/*
 Created on : 2016-01-07, 15:40:33
 Author     : Krzysztof Proczek <proczekweb@gmail.com>
 */

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'bower_components', src: '**', dest: '<%= pkg.assetsDir %>'},
                    {expand: true, cwd: 'src/assets/font-awesome/fonts', src: '**', dest: '<%= pkg.distDir %>/fonts'},
                    {expand: true, cwd: 'src/images', src: '**', dest: '<%= pkg.distDir %>/images'}
                ]
            }
        },

        less: {

            dev: {
                options: {
                    paths: ["src/css"]
                },
                files: {
                    "<%= pkg.srcCSS %>app.css": "<%= pkg.srcCSS %>app.less"
                }
            }

        },

        concat: {

            js: {
                src: [
                    '<%= pkg.assetsDir %>jquery/dist/jquery.js',
                    '<%= pkg.assetsDir %>angular/angular.js',
                    '<%= pkg.srcJS %>**/*.js',
                    '<%= pkg.assetsDir %>bootstrap/dist/js/bootstrap.js'
                ],
                dest: '<%= pkg.distDir %>app.js'
            },
            css: {
                src: [
                    '<%= pkg.srcCSS %>**/*.css',
                    '<%= pkg.assetsDir %>bootstrap/dist/css/bootstrap-theme.css',
                    '<%= pkg.assetsDir %>bootstrap/dist/css/bootstrap.css'
                ],
                dest: '<%= pkg.distDir %>app.css'
            }

        },

        // template tasks
        homepage: {

            template: '<%= pkg.srcDir %>view/application/index/index<%= pkg.gruntTplExt %>',
            dev: {
                dest: '<%= pkg.zendModules %>Application/view/application/index/index<%= pkg.tplEngineExt %>',
                context: {
                    js: 'app.js',
                    css: 'app.css'
                }
            }

        },

        layout: {

            template: '<%= pkg.srcDir %>view/layout/layout<%= pkg.gruntTplExt %>',
            dev: {
                dest: '<%= pkg.zendModules %>Application/view/layout/layout<%= pkg.tplEngineExt %>',
                context: {
                    js: 'app.js',
                    css: 'app.css'
                }
            }

        },
        // end template tasks

        watch: {

            js: {
                files: ['<%= concat.js.src %>'],
                tasks: ['concat:js']
            },
            css: {
                files: ['<%= concat.css.src %>'],
                tasks: ['concat:css']
            },
            less: {
                files: ['src/css/app.less', 'src/css/media.less'],
                tasks: ['less']
            },
            homepage: {
                files: ['<%= homepage.template %>'],
                tasks: ['homepage:dev']
            },
            layout: {
                files: ['<%= layout.template %>'],
                tasks: ['layout:dev']
            }

        }

    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");

    grunt.loadTasks("tasks");

    grunt.registerTask("default", ["copy:main", "less:dev", "concat", "homepage:dev", "layout:dev", "watch"]);

};