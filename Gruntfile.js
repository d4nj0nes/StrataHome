/*global module:false*/
module.exports = function(grunt) {

		// Project configuration.
		grunt.initConfig({
			// Metadata.
			pkg: grunt.file.readJSON('package.json'),

		// CSS
		sass: {
			dist: {
				options: {
					style: 'compressed'
				},
				files: {
					'home/core.css': 'scss/core.scss'
				}
			}
		},

		postcss: {
			options: {
				map: true,
				processors: [
					require('autoprefixer')( { browsers: 'last 3 versions' } ), // vendor prefixes
					require('postcss-fixes')(),
					require('cssnano')({
						safe: true,
						calc: false,
						zindex : false
					}) // minify the result
				]
			},

			dist: {
				src: 'home/*.css'
			}
		},

		// modernizr
		modernizr: {
			dist: {
				"parseFiles": true,
				"devFile": false,
				"dest": "js/libs/modernizr.min.js",
				"excludeTests": [
					"emoji",
					"svg",
					"json"
				],
				"files" : {
					"src": [
						"home/core.css",
						"home/home.css",
						"js/*.js"
					]
				},
				"options": [
					"setClasses"
				],
				"classPrefix": "mz-",
				"uglify": true
			}
		},

		// JAVASCRIPT
		jshint: {
				all: ['js/core.js']
		},

		uglify: {
			options: {
				mangle: false
			},
			my_target: {
				files: {
					'home/core.min.js': ['js/core.js'],
					'home/libs.min.js': [
						'js/libs/modernizr.min.js',
						'js/libs/blobjectfit.js',
						'js/libs/blobselect.min.js',
					]
				}
			}
		},

		// WATCH
		watch: {
			styles: {
				files: ['scss/*.scss', 'scss/*/*.scss', 'css/*.css'],
				tasks: ['css', 'modernizr', 'notify:css'],
				options: {
					spawn: false
				},
			},

			scripts: {
				files: ['js/*.js', 'js/*/*.js', 'js/**/*.js'],
				tasks: ['javascript', 'notify:js'],
				options: {
					spawn: false
				},
			}
		},

		notify: {
			css: {
				options:{
								title: "CSS Files built",
								message: "SASS and Post CSS task complete"
						}
			},

			js: {
				options: {
					title: "JS Files built",
					message: "Uglify and JSHint task complete"
				}
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-modernizr');

	// tasks
	grunt.registerTask('default', ['css', 'javascript', 'images', 'svgs']);
	grunt.registerTask('css', ['sass', 'postcss']);
	grunt.registerTask('javascript', ['jshint', 'uglify', 'modernizr']);

	grunt.event.on('watch', function(action, filepath, target) {
		grunt.log.writeln(target + ': ' + filepath + ' has ' + action);
	});
};
