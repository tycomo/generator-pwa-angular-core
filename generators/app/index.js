'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
var fs = require('fs');
var path = require('path');

function exists(p) {
  try {
    fs.lstatSync(path.resolve(__dirname, 'templates', p));
    console.log('exists: ' + path.resolve(__dirname, 'templates', p));
    return true;
  } catch (e) {
    console.log('error: ' + path.resolve(__dirname, 'templates', p));
    return false;
  }
}


module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('Angular 4 + .Net Core') + ' generator.  This is a simple template that should get you started coding fast using the best practices!'
    ));

    var prompts = [{
      name: 'appName',
      message: 'What do you want to name your project? ' + chalk.red('(This will also be your namespace name)') 
    }, {
            type: 'input',
            name: 'selector',
            message: 'Enter a prefix that will be the angular root selector ' + chalk.red('(default is my-app)'),
            default: 'my-app'
        }
 ];

    return this.prompt(prompts).then(function (props) {
      var safeName = props.appName.replace(/^[^a-zA-Z]+/, '').replace(/[^a-zA-Z0-9]/g, '');
      
      if (safeName.length == 0) {
        safeName = 'AngularCore';
      }
      
        this.templateData = {
            safeName: safeName,
            author: props.author,
            selector: props.selector,
            project: props.appName
        }

      props.safeName = safeName;
      this.props = props;
    }.bind(this));
    
  }

writing() {
    this.log(chalk.red('\nCreating files...\n'));
    var basePath = this.props.safeName;
    //copy no templating
    [
      'package.json', 'tsconfig.json', 'web.config', 
      'karma.conf.js', 'protractor.conf.js', 'tslint.json', '.npmignore', '.travis.yml', 'hosting.json',
      'NuGet.conf', 'tsconfig.webpack', 'tslint', '.gitignore',  
    ].forEach(function (file) {
      if (!exists('AngularCore' + '/' + file)) return;
      else{
  
        this.fs.copy(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, file))  
        this.log("creating "+this.destinationPath(this.props.safeName, file));    
      }
    }.bind(this));

    //copy with templating
        ['package.json','.angular-cli.json','Program.cs', 'Startup.cs', 'AngularCore.csproj','appsettings.json'
    ].forEach(function (file) {
      if (!exists('AngularCore' + '/' + file)) return;
      else{
         if(file == "AngularCore.csproj"){
          this.fs.copyTpl(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, this.props.safeName+".csproj"),this.templateData) 
          this.log("creating "+this.destinationPath(this.props.safeName, this.props.safeName+".csproj"));
        }else{
        this.fs.copyTpl(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, file),this.templateData)    
        //this.props
        this.log("creating "+this.destinationPath(this.props.safeName, file));
        }
      }
    }.bind(this)); 
  
    ['Config', 'wwwroot'].forEach(function (file) {
      if (!exists('AngularCore' + '/' + file)) return;
      this.fs.copy(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, file)); 
    }.bind(this));

        ['Client', 'Server', 'Views'].forEach(function (file) {
      if (!exists('AngularCore' + '/' + file)) return;
      this.fs.copyTpl(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, file),this.templateData);
    }.bind(this));

    ['Client/assets/images/angularcore2.png'].forEach(function (file) {
      if (!exists('AngularCore' + '/' + file)) return;
      this.fs.copy(this.sourceRoot()+'/AngularCore/'+file,this.destinationPath(this.props.safeName, file)); 
    }.bind(this));

  }
  install() {
    this.log('\n' + chalk.red('Installing npm dependencies...') + '\n');
    var elementDir = process.cwd() + '/' + this.props.safeName;
        process.chdir(elementDir);

     this.spawnCommandSync("npm", ["install"]);
     this.spawnCommandSync('npm', ['run', 'build:dev']);
     this.spawnCommandSync('npm', ['run', 'build:dotnet']);
     this.log('\nHave fun working on ' + this.props.appName + '.  Be sure to check out my github (https://github.com/tylercomo) to get additional documentation or to submit an issue.');
  }
};
