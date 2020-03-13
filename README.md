[![Dependency Status](https://david-dm.org/devotox/ember-cli-utilities.svg)](https://david-dm.org/devotox/ember-cli-utilities)
[![DevDependency Status](https://david-dm.org/devotox/ember-cli-utilities/dev-status.svg)](https://david-dm.org/devotox/ember-cli-utilities#info=devDependencies)
[![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=devotox/ember-cli-utilities)](https://github.com/devotox/ember-cli-utilities)
[![Github Workflow](https://github.com/devotox/zenunu/workflows/CI/badge.svg)](https://github.com/devotox/zenunu/actions?query=workflow%3ACI)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-utilities/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-utilities)
[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-utilities.svg)](http://emberobserver.com/addons/ember-cli-utilities)
[![NPM Version](https://badge.fury.io/js/ember-cli-utilities.svg)](http://badge.fury.io/js/ember-cli-utilities)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-utilities.svg)](https://www.npmjs.org/package/ember-cli-utilities)

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
		"@glimmer/component": "1.0.0",
		"@glimmer/tracking": "1.0.0",
		"@orbit/data": "0.16.5",
		"@orbit/indexeddb": "0.16.5",
		"@orbit/indexeddb-bucket": "0.16.3",
		"@orbit/jsonapi": "0.16.5",
		"@orbit/local-storage": "0.16.5",
		"@orbit/local-storage-bucket": "0.16.3",
		"animate.css": "3.7.2",
		"ember-api-actions": "0.2.8",
		"ember-auto-import": "1.5.3",
		"ember-cli-babel": "7.18.0",
		"ember-cli-build-notifications": "0.4.0",
		"ember-cli-fastclick": "1.5.0",
		"ember-cli-htmlbars": "4.2.3",
		"ember-cli-moment-shim": "3.7.1",
		"ember-cli-notifications": "6.2.0",
		"ember-cli-pushjs": "2.0.8",
		"ember-cli-roboto-fontface": "2.0.5",
		"ember-cli-sass": "10.0.1",
		"ember-hammertime": "1.6.0",
		"ember-material-design-icons-shim": "0.1.13",
		"ember-moment": "8.0.0",
		"ember-offline": "devotox/ember-offline",
		"ember-orbit": "0.16.6",
		"ember-reactive-helpers": "devotox/ember-reactive-helpers",
		"ember-simple-auth": "3.0.0",
		"ember-skeleton": "devotox/ember-skeleton",
		"ember-string-helpers": "devotox/ember-string-helpers",
		"fast-sort": "2.1.1",
		"flatted": "2.0.1",
		"json-fn": "1.1.1",
		"moment": "2.24.0",
		"moment-timezone": "0.5.28",
		"normalize.css": "8.0.1",
		"sass": "1.26.3"
```

## Components
* notification-container
    - To be used with notification service to warn, alert, error notifications
* loading-mask
    - Added anywhere as a contextual component, sets a loading mask for the whole viewport that also yields the hide, show, loading actions 

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
* data-store
    - Ember Orbit Store with some wrappers for background reload
* fastboot-store
    - easier to use FastBoot store functions
* geometry
    - Geometry calculations to use with maps
* logger
    - Ember logger with interface to state where logs coming from
* loading-mask
    - works in tandem with loading mask component for programmatic access
* navigation
    - navigation shell
* notification
    - notification hub / notification center mashup
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
* orbit-main-bucket
    - initializes ember orbit bucket

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

## Orbit JS
* Has everything needed to have `memory + backup + remote` secenario
    - [Scenario](https://github.com/orbitjs/todomvc-ember-orbit#scenario-4-memory--backup--remote)
Contributing

## Defaults
* ember-fetch
    - preferNative: true
* ember-paper
    - insertFontLinks: false
* ember-cli-mirage
    - enabled: false
* ember-cli-head
    - suppressBrowserRender: false
* ember-cli-notifications
    - includeFontAwesome: false
    - clearDuration: 3500
    - autoClear: true
* ember-load-css
    - enabled: true
    - minifyJS: 
        - enabled: true
* ember-hammertime
    - touchActionSelectors: ['button', 'input', 'a', 'textarea']
    - touchActionProperties: 'touch-action: manipulation; -ms-touch-action: manipulation; cursor: pointer;'
* ember-offline
    - themes
        - theme: chrome
        - language: english
    - checkOnLoad: true
    - interceptRequests: true
    - requests: true
    - deDupBody: true
    - game: false
    - checks:
        - xhr: 
            - url: 'api/status'
    - reconnect
        - initalDelay: 10
        - delay: null 
* moment
    - allowEmpty: true,
    - outputFormat: 'L',
    - includeLocales: ['en'],
    - includeTimezone: 'subset'
* pace
    - color: blue
    - target: body 
    - theme: minimal 
    - minTime: 100
    - ghostTime: 50
    - catchupTime: 50 
    - easeFactor: 1.25 
    - initialRate: 0.01 
    - startOnPageLoad: true 
    - maxProgressPerFrame: 20 
    - restartOnPushState: true 
    - restartOnRequestAfter: 500 
    - elements: 
        - checkInterval: 100
        - selectors: ['body', '.ember-view']
    - eventLag:
        - minSamples: 10 
        - sampleCount: 3
        - lagThreshold: 3
    - ajax:
        - trackMethods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
        - trackWebSockets: false
        - ignoreUrls: []

------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
