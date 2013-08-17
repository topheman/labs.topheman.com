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
            debug: {
                options: {
                    port: 9000,
                    hostname: "0.0.0.0",
                    keepalive: true,
                    base: ""
                }
            }
        },
        
        // grunt-open will open your browser at the project's URL
        open: {
            debug: {
                path: 'http://localhost:<%= connect.debug.options.port%>/index.html'
            }
        },
        
        //copy into release folder the release.html files + adds buildNumber in title tag via templating, at the end of the build
        processhtml: {
            options: {
                process: true,
                data: {
                    "buildNumber": (new Date()).getTime(),
                    "version": version
                }
            },
            dist: {
                files: {
                    'release/index.html': ['src/index.html'],
                    'release/game.html': ['src/game.release.html'],
                    'release/offline.html': ['src/offline.html']
                }
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

    grunt.registerTask('server', ['open:debug', 'connect:debug']);
    grunt.registerTask('server-debug', ['open:debug', 'connect:debug']);
    grunt.registerTask('server-release', ['open:release', 'connect:release']);

};