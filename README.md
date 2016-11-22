# MetaWebJS
Framework for developing web apps in small pieces.


MetaWebJS uses lerna and templating to generate configurations and webapps
that are portable, compatable, approachable, and testable.

## 1.0 Milestones
1. Build Target package generators

	Build target packages will be responsible for setup for a particular enviornment,
	and will import a meta package, that will handle it from there.
	* Cordova
	* Electron
	* chrome extension
	* firefox extension
	* Web
	* React Native
	* Native Script
	* NodeJS
	* CLI
	* probably more, should check node modules for metaweb-target-frameworkname

2. Meta package generators - Manages routes / caching / global state / config for widgets
	Meta packages are responsible for routing, caching, global state, and configuration.
	Their main job is to bootstrap widgets.
	* Angular 1&2
	* Ionic 1&2
	* React
	* VueJS
	* Ember
	* probably more, should check node modules for metaweb-meta-frameworkname

3. Widget generators - actual sub sections of the app to be loaded as a widgets
	Widgets are small webapps, which will be loaded as needed by the Meta apps.
	network request methods, configuration, initial state, routing infromation and authentication methods
	are provided to them by the meta package.

	* Angular 1
	* Angular 2
	* Ionic
	* React
	* VueJS
	* Ember
	* probably more, should check node modules for metaweb-widget-frameworkname

