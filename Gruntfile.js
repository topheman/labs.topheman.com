module.exports = function(grunt) {

    // Load Grunt tasks declared in the package.json file
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var version = require('./package.json').version,
            gruntSpecificOptions;

    try {
        gruntSpecificOptions = grunt.file.readJSON('./grunt.options.json');//specific options meant to be split from the hard code of the GruntFile.js
    }
    catch (e) {
        grunt.log.error("No grunt.options.json file find (you will need it for ftp-deploy)");
    }

    // Configure Grunt 
    grunt.initConfig({
        
        // grunt-contrib-connect will serve the files of the project
        // on specified port and hostname
        connect: {
            all: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    keepalive: false,//must be at false for livereload
                    base: ""
                }
            }
        },
        
        // grunt-open will open your browser at the project's URL
        open: {
            dev: {
                path: 'http://localhost:<%= connect.all.options.port%>/index.dev.html'
            },
            release: {
                path: 'http://localhost:<%= connect.all.options.port%>/index.html'
            }
        },

        ejs_static: {
            dev: {
                options: {
                    dest: '',
                    path_to_data: 'templating/data/index.dev.json',
                    parent_dirs: false,
                    underscores_to_dashes: true,
                    file_extension: '.html'
                }
            },
            release: {
                options: {
                    dest: '',
                    path_to_data: 'templating/data/index.json',
                    parent_dirs: false,
                    underscores_to_dashes: true,
                    file_extension: '.html'
                }
            }
        },
        
        watch : {
            options:{
                livereload : true
            },
            //when the tpl or data changes, rebuild the html and trigger a reload (livereload only on dev)
            "dev-tpl": {
                files : [
                    'templating/data/*.json',
                    'templating/layouts/**/*.ejs'
                ],
                tasks : ['build-dev']
            },
            //when a css is changed, only trigger a reload
            "dev-css" : {
                files : ['css/*.css']
            }
        }
        
    });

    if (gruntSpecificOptions) {
        grunt.config("ftp-deploy", {
            release: {
                auth: {
                    host: gruntSpecificOptions["ftp-deploy"].release.host,
                    port: gruntSpecificOptions["ftp-deploy"].release.port,
                    authKey: 'key1'
                },
                src: 'release',
                dest: gruntSpecificOptions["ftp-deploy"].release.dest,
                exclusions: ['release/build.txt']
            }
        });
        grunt.registerTask('deploy', ['ftp-deploy:release']);
    }

    grunt.registerTask('server', ['ejs_static:dev','open:dev', 'connect','watch']);
    grunt.registerTask('server-dev', ['ejs_static:dev','open:dev', 'connect','watch']);
    grunt.registerTask('server-release', ['ejs_static:release','open:release', 'connect','watch']);
    
    grunt.registerTask('build-dev', ['ejs_static:dev']);
    grunt.registerTask('build-release', ['ejs_static:release']);

};