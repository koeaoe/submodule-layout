module.exports = function(grunt) {
    
    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        copy: {
            
            main: {
                expand: true, 
                cwd: 'bower_components',
                src: '**',
                dest: '<%= pkg.assetsDir %>'
            },
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= pkg.assetsDir %>jquery/dist',
                        src: 'jquery.js',
                        dest: '<%= pkg.vendorJS %>' 
                    },
                    {
                        expand: true,
                        cwd: '<%= pkg.assetsDir %>angular',
                        src: 'angular.js',
                        dest: '<%= pkg.vendorJS %>' 
                    }
                ]
            }
            
        },

        less: {
            
            development: {
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
                    '<%= pkg.vendorJS %>**/*.js', 
                    '<%= pkg.srcJS %>**/*.js',
                    '<%= pkg.assetsDir %>bootstrap/dist/js/bootstrap.js'
                ],
                dest: '<%= pkg.devDir %>app.js'
            },
            css: {
                src: [
                    '<%= pkg.vendorCSS %>**/*.css', 
                    '<%= pkg.srcCSS %>**/*.css',
                    '<%= pkg.assetsDir %>bootstrap/dist/css/bootstrap-theme.css',
                    '<%= pkg.assetsDir %>bootstrap/dist/css/bootstrap.css'
                ],
                dest: '<%= pkg.devDir %>app.css'
            }
            
        },
        
        homepage: {
            
            template: '<%= pkg.srcDir %>index.html',
            dev: {
                dest: '<%= pkg.devDir %>index.html',
                context: {
                    js: 'app.js',
                    css: 'app.css'
                }
            }
            
        },
        
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
            }
            
        }

    });  

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-less");
  
    grunt.loadTasks("tasks");
  
    grunt.registerTask("default", ["copy:main", "copy:dev", "less:development", "concat" , "homepage:dev", "watch" ] );
    
};