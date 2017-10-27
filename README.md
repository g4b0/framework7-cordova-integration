# framework7-cordova-integration
Framework7 cordova integration with ios/android template engine

## Description
Gulp task integrating Framwork7 android and ios html dialect into a simple (rough?) template engine.

## How it works
At the core of this task there is gulp-file-include plugin [https://www.npmjs.com/package/gulp-file-include]
Just launch gulp watch into the project directory, and it will watch for changes in *templates* directory, compiling them into
html files into *www* and *merges* directory.
It also watch for modifications in *www* directory, calling *cordova prepare browser* when ready.

The result is that on each file save the document root into *platforms/browser/www* is updated on the fly, and a simple call to 
*cordova run android* will build and run the android version on the attached device.

## Prerequisite
Cordova and npm should be installed on the developing machine

## Init
* Clone this repo
* Run *npm install*
* Add the desired platform, for example browser, android, ios
* Point the virtualhost document root in platforms/browser/www
* Build and run for the desired platform

git clone https://github.com/g4b0/framework7-cordova-integration.git
npm install
cordova platform add browser
cordova platform add android
cordova platform add ios (will only work on mac)
cordova run android

## Todo
Move css and js outside www and merges directory
