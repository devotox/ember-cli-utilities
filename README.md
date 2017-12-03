# ember-cli-utilities

[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-utilities.svg)](http://emberobserver.com/addons/ember-cli-utilities)
[![Build Status](https://travis-ci.org/devotox/ember-cli-utilities.svg)](http://travis-ci.org/devotox/ember-cli-utilities)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-utilities/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-utilities)
[![NPM Version](https://badge.fury.io/js/ember-cli-utilities.svg)](http://badge.fury.io/js/ember-cli-utilities)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-utilities.svg)](https://www.npmjs.org/package/ember-cli-utilities)
[![Dependency Status](https://david-dm.org/poetic/ember-cli-utilities.svg)](https://david-dm.org/poetic/ember-cli-utilities)
[![DevDependency Status](https://david-dm.org/poetic/ember-cli-utilities/dev-status.svg)](https://david-dm.org/poetic/ember-cli-utilities#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-utilities.svg)](https://greenkeeper.io/)

## Description
Multiple Utility Services / Mixins to use in your ember application

[DEMO](http://devotox.github.io/ember-cli-utilities)

## Installation
* `ember install ember-cli-utilities`

## Addons
* Dependencies
```
	"animate.css": "3.5.2",
	"babel-plugin-transform-async-to-generator": "6.24.1",
	"babel-plugin-transform-object-rest-spread": "6.26.0",
	"ember-cli-babel": "6.10.0",
	"ember-cli-htmlbars": "2.0.3",
	"ember-cli-htmlbars-inline-precompile": "1.0.2",
	"ember-cli-localforage": "1.0.2",
	"ember-cli-moment-shim": "3.5.0",
	"ember-cli-new-version": "devotox/ember-cli-new-version",
	"ember-cli-notifications": "4.2.1",
	"ember-cli-roboto-fontface": "1.0.3",
	"ember-cli-sass": "7.1.1",
	"ember-cli-string-helpers": "1.5.0",
	"ember-composable-helpers": "2.0.3",
	"ember-fetch": "3.4.3",
	"ember-i18n": "5.0.2",
	"ember-lifeline": "2.0.0",
	"ember-material-design-icons-shim": "0.1.11",
	"ember-math-helpers": "2.3.0",
	"ember-moment": "7.5.0",
	"ember-notification-hub": "devotox/ember-notification-hub",
	"ember-offline": "devotox/ember-offline",
	"ember-paper": "1.0.0-beta.3",
	"ember-promise-helpers": "1.0.3",
	"ember-reactive-helpers": "0.5.0",
	"ember-route-action-helper": "2.0.6",
	"ember-string-helpers": "1.0.2",
	"ember-truth-helpers": "2.0.0",
	"normalize.css": "7.0.0"
```

## Components
* new-version
	- To be added to top of application.hbs and automatically alerts when an updated version of your application is available based on the package.json
* notification-center
	- used with notification service
	- To be added at the bottom of application.hbs and can hold notifications based on using the notification service
* notification-container
	- To be used with notification service to warn, alert, error notifications
* loading-mask
	- Added anywhere as a contextual component, sets a loading mask for the whole viewport that also yields the hide, show, loading actions 

## Mixins
* after-render
	- can hook into afterRender schedule on any ember object
* reset-scroll
	- scrolls back to top of window on route change
* setup-controller
	- adds application controller / after-render to current Ember object

## Services
* alpha-iterator
	- iterate through alphabet
* crypto
	- set of useable crypto functions
* device
	- set of functions to determine current device
* ember-utils
	- utility functions combining ember functions
* fastboot-store
	- easier to use fastboot store functions
* logger
	- Ember logger with interface to state where logs coming from
* loading-mask
	- works in tandem with loading mask component for programmatic access
* matrix
	- add matrix type screen sensation
* navigation
	- navigation shell
* notification
	- notification hub / notification center mashup
* printer
	- TODO: allow arbitrary printing of any ember object
* regex
	- set of useful regex
* sandbox
	- run custom code in a sandbox without access to globals you do not specify
* store
	- Ember Data Store which allows slugs / offline
* string-builder
	- Build strings efficiently
* translation
	- fetch translations
* utils
	- utility functions

#### License
MIT license.
