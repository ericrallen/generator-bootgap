'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var BootgapGenerator = module.exports = function BootgapGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
	this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BootgapGenerator, yeoman.generators.Base);

BootgapGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
  	{
		name: 'appName',
		message: 'What is the name of your app?',
		default: 'Application'
	},
	{
		name: 'appPackage',
		message: 'What is the name of your Application Package?',
		default: 'com.developer.application'
	}
];

  this.prompt(prompts, function (props) {
	this.appName = props.appName;
	this.appPackage = props.appPackage;

	cb();
  }.bind(this));
};

BootgapGenerator.prototype.app = function app() {
  this.mkdir('www');
  this.mkdir('www/assets');
  this.mkdir('www/assets/css');
  this.mkdir('www/assets/js');
  this.mkdir('www/assets/img');
  this.mkdir('www/assets/fonts');
  this.mkdir('www/res/icon');
  this.mkdir('www/res/icon/ios');
  this.mkdir('www/res/icon/android');
  this.mkdir('www/res/screen/android');
  this.mkdir('www/res/screen/ios');
  this.mkdir('www/assets/components');
  this.mkdir('www/assets/components/bootstrap');
  this.mkdir('www/assets/components/bootstrap/dist');
  this.mkdir('www/assets/components/bootstrap/dist/css');
  this.mkdir('www/assets/components/bootstrap/dist/fonts');
  this.mkdir('www/assets/components/bootstrap/dist/js');

  this.copy('_package.json', 'package.json');
  this.copy('_bowerrc', '.bowerrc');
  this.copy('_bower.json', 'bower.json');
  this.copy('phonegap/index.js', 'www/assets/js/index.js');
  this.copy('bootstrap/css/bootstrap.min.css', 'www/assets/components/bootstrap/dist/css/bootstrap.min.css');
  this.copy('bootstrap/css/bootstrap-theme.min.css', 'www/assets/components/bootstrap/dist/css/bootstrap-theme.min.css');
  this.copy('bootstrap/js/bootstrap.min.js', 'www/assets/components/bootstrap/dist/js/bootstrap.min.js');
  this.copy('bootstrap/fonts/glyphicons-halflings-regular.eot', 'www/assets/components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot');
  this.copy('bootstrap/fonts/glyphicons-halflings-regular.svg', 'www/assets/components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg');
  this.copy('bootstrap/fonts/glyphicons-halflings-regular.ttf', 'www/assets/components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf');
  this.copy('bootstrap/fonts/glyphicons-halflings-regular.woff', 'www/assets/components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff');

  this.template('phonegap/_index.html', 'www/index.html');
  this.template('phonegap/_config.xml', 'www/config.xml');
};

BootgapGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('gitignore', '.gitignore');
  this.copy('jshintrc', '.jshintrc');
};
