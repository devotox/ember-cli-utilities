[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-utilities.svg)](http://emberobserver.com/addons/ember-cli-utilities)
[![Build Status](https://travis-ci.org/devotox/ember-cli-utilities.svg)](http://travis-ci.org/devotox/ember-cli-utilities)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-utilities/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-utilities)
[![NPM Version](https://badge.fury.io/js/ember-cli-utilities.svg)](http://badge.fury.io/js/ember-cli-utilities)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-utilities.svg)](https://www.npmjs.org/package/ember-cli-utilities)
[![Dependency Status](https://david-dm.org/devotox/ember-cli-utilities.svg)](https://david-dm.org/devotox/ember-cli-utilities)
[![DevDependency Status](https://david-dm.org/devotox/ember-cli-utilities/dev-status.svg)](https://david-dm.org/devotox/ember-cli-utilities#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-utilities.svg)](https://greenkeeper.io/)

ember-cli-utilities
==============================================================================

Multiple Utility Services / Mixins to use in your ember application

[DEMO](https://devotox.github.io/ember-cli-utilities)

Compatibility
------------------------------------------------------------------------------

* Ember.js v2.18 or above
* Ember CLI v2.13 or above

Installation
------------------------------------------------------------------------------

```
ember install ember-cli-utilities
```

Usage
------------------------------------------------------------------------------

## Addons
* Dependencies
```
		"animate.css": "3.7.2",
		"ember-auto-import": "1.5.2",
		"ember-cli-babel": "7.13.0",
		"ember-cli-htmlbars": "4.0.8",
		"ember-cli-notifications": "4.3.3",
		"ember-cli-pushjs": "2.0.8",
		"ember-cli-roboto-fontface": "2.0.5",
		"ember-cli-sass": "10.0.1",
		"ember-material-design-icons-shim": "0.1.13",
		"ember-notification-hub": "devotox/ember-notification-hub",
		"ember-offline": "devotox/ember-offline",
		"ember-reactive-helpers": "devotox/ember-reactive-helpers",
		"ember-simple-auth": "1.9.2",
		"ember-skeleton": "devotox/ember-skeleton",
		"ember-string-helpers": "devotox/ember-string-helpers",
		"flatted": "2.0.1",
		"json-fn": "1.1.1",
		"normalize.css": "8.0.1",
		"sass": "1.23.7"
```

## Components
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
* api
    - generic api connector to run all HTTP methods using ember-fetch
* alpha-iterator
    - iterate through alphabet
* crypto
    - set of useable crypto functions
* device
    - set of functions to determine current device
* ember-utils
    - utility functions combining ember functions
* ext-store
    - Ember Data Store which allows slugs / offline
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
* string-builder
    - Build strings efficiently
* translation
    - fetch translations
* utils
    - utility functions

## Helpers
* disable-bubbling
    - Disable bubbling of closure actions
* json-parse 
    - Parse JSON string
## Initializers
* component-router
    - injects router main into components
* session-injection
    - injects session service into routes, controllers, components

## Instance Initializers
* intl
    - initializes the instance with the accurate language based on a query string or the system language

## Transforms
* array
    - transform for arrays for models
* object
    - transform for objects for models
* pg-date
    - transforms for postgres dates for models
* uuid
    - transforms for uuids for models

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
