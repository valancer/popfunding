module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// bower
		bowercopy: {
			options: {
				clean: true
			},
			libs: {
	            options: {
	                destPrefix: 'sources/assets/scripts/libs/'
	            },
				files: {
					'jquery-1.11.1.min.js': 'jquery-1.11.1/dist/jquery.min.js'
				}
			}
/*
			,
			styles: {
				options: {
					destPrefix: 'sources/assets/styles/libs/'
				},
				files: {
				}
			}
*/
		},

		// charset
		charset: {
			dist: {
				options: {
					from: 'UTF-8',
					to: 'EUC-KR',
					fileTypes: {
						html5: {
							ext: ['.html'],
							detect: /<meta\s+charset=["']?.+?["']?\s*\/?>/i,
							replace: '<meta charset="{{charset}}">'
						},
							css: {
							ext: ['.css'],
							detect: /^@charset\s+(".+?"|'.+?')/,
							replace: '@charset "{{charset}}"'
						}
					}
				},
				files: [{
					expand: true,
					cwd: 'build/',
					dest: '../popfunding-dev/',
					src: ['**/*.{html,css}']

				}]
			},
		},

		// html
		includes: {
			build: {
				cwd: 'sources/html',
				src: [ '*.html'],
				dest: 'build/',
				options: {
					flatten: true,
					includePath: 'sources/html/include'
				}
			}
		},

		// css
		sprite: {
			all: {
				cssFormat: 'scss',
				src: 'sources/assets/images/sprites/*.png',
				// retinaSrcFilter: 'sources/assets/images/sprites/*@2x.png',
				dest: 'sources/assets/images/sprites.png',
				// retinaDest: 'sources/assets/images/sprites@2x.png',
				imgPath: '/assets/images/sprites.png',
				destCss: 'sources/assets/styles/scss/_sprites.scss',
				padding: 5,
				cssVarMap: function(sprite) {
					sprite.name = 'sprite-' + sprite.name;
				}
   			}
		},
		sass: {
			build: {
				files: [{
					expand: true,
					cwd: 'sources/assets/styles/scss',
					src: ['*.scss'],
					dest: 'sources/assets/styles/',
					ext: '.css'
				}]
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%']
			},
			build: {
				expand: true,
				flatten: true,
				dest: 'sources/assets/styles/',
				src: ['sources/assets/styles/*.css', '!sources/assets/styles/*.min.css']
			}
		},

		// scripts
		jshint: {
			files: ['Gruntfile.js', 'sources/assets/scripts/**/*.js', '!sources/assets/scripts/libs/**'],
			options: {
				reporter: require('jshint-stylish')
			}
		},


		// files
		clean: {
			clear: {
				files: [{
					src: ['build/**']
				}]
			}
		},

		copy: {
			assets: {
				files: [{
					expand: true,
					cwd: 'sources/assets',
					src: ['**', '!**/scss/**', '!**/psd/**', '!**/sprites/**'],
					dest: 'build/assets/'
				}]
			},
			scripts: {
				files: [{
					expand: true,
					cwd: 'sources/assets/scripts/',
					src: ['*.js'],
					dest: 'build/assets/scripts/'
				}]
			},
			styles: {
				files: [{
					expand: true,
					cwd: 'sources/assets/styles/',
					src: ['*.css'],
					dest: 'build/assets/styles/'
				}]
			},
			images: {
				files: [{
					expand: true,
					cwd: 'sources/assets/images/',
					src: ['**', '!**/sprites/**'],
					dest: 'build/assets/images/'
				}]
			},
			// html: {
			// 	files: [{
			// 		expand: true,
			// 		cwd: 'sources/html',
			// 		src: ['**', '!**/include/**'],
			// 		desc: 'build/'
			// 	}]
			// }
			release: {
				files: [{
					expand: true,
					cwd: 'build/',
					src: ['**/**'],
					dest: '../popfunding-dev/'
				}]
			}
		},


		// watch
		watch: {
			html: {
				files: ['sources/html/**/*.html'],
				tasks: ['includes'],
				options: {
					livereload: true
				}
			},

			sass: {
				files: ['sources/assets/styles/scss/**/*.scss'],
				tasks: ['sass', 'autoprefixer', 'copy:styles'],
				options: {
					livereload: true
				}
			},

			styles: {
				files: ['sources/assets/styles/*.css'],
				tasks: ['copy:styles'],
				options: {
					livereload: true
				}
			},

			scripts: {
				files: ['<%= jshint.files %>'],
				tasks: ['newer:jshint', 'copy:scripts'],
				options: {
					livereload: true
				}
			},

 			images: {
 				files: ['sources/assets/images/**'],
 				tasks: ['sprite', 'copy:images'],
 				options: {
 					livereload: true
 				}
 			}
		},

		// connect
		connect: {
			options: {
				port: 9000,
				livereload: true,
				// keepalive: true
			},
			livereload: {
				options: {
					open: {
						target: 'http://localhost:9000/'
					},
					base: [
						'build/'
					]
				}
			}
		}
	});

	// grunt.loadTasks('tasks');

	grunt.registerTask('sass-build', ['sprite', 'sass', 'autoprefixer']);
	grunt.registerTask('scripts-build', ['bowercopy', 'newer:jshint']);
	grunt.registerTask('html-build', ['includes']);
	grunt.registerTask('build', ['clean', 'sass-build', 'scripts-build', 'html-build', 'copy', 'connect', 'watch']);
	grunt.registerTask('release', ['clean', 'sass-build', 'scripts-build', 'html-build', 'copy', 'charset']);
};
