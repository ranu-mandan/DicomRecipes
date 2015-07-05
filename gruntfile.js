module.exports = function(grunt) {

    var srcFiles = ['public/app.js',
        'public/main.js',
        'public/config.js',
        'public/router.js',
        'public/views/*.js',
        'public/models/*.js',
        'public/collections/*.js'
    ];

    var cssFiles = ['public/bower_components/normalize.css/normalize.css',
        'public/bower_components/foundation/css/foundation.css',
        'public/custom/default.css',
        'public/bower_components/animate.css/animate.css'
    ];

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // jshint 
        jshint: {
            options: {
                curly: true
            },
            dev: {
                src: srcFiles
            }
        },

        // uglify
        uglify: {
            options: {
                mangle: false
            },
            my_target: {
                files: {
                    'public/release/scripts/script.min.js': srcFiles
                }
            }
        },

        // cssmin
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'public/release/styles/style.min.css': cssFiles
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // task setup 
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};