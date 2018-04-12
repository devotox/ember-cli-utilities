[![Ember Observer Score](http://emberobserver.com/badges/ember-cli-utilities.svg)](http://emberobserver.com/addons/ember-cli-utilities)
[![Build Status](https://travis-ci.org/devotox/ember-cli-utilities.svg)](http://travis-ci.org/devotox/ember-cli-utilities)
[![Coverage Status](https://codecov.io/gh/devotox/ember-cli-utilities/branch/master/graph/badge.svg)](https://codecov.io/gh/devotox/ember-cli-utilities)
[![NPM Version](https://badge.fury.io/js/ember-cli-utilities.svg)](http://badge.fury.io/js/ember-cli-utilities)
[![NPM Downloads](https://img.shields.io/npm/dm/ember-cli-utilities.svg)](https://www.npmjs.org/package/ember-cli-utilities)
[![Dependency Status](https://david-dm.org/poetic/ember-cli-utilities.svg)](https://david-dm.org/poetic/ember-cli-utilities)
[![DevDependency Status](https://david-dm.org/poetic/ember-cli-utilities/dev-status.svg)](https://david-dm.org/poetic/ember-cli-utilities#info=devDependencies)
[![Greenkeeper](https://badges.greenkeeper.io/devotox/ember-cli-utilities.svg)](https://greenkeeper.io/)

ember-cli-utilities
==============================================================================

Multiple Utility Services / Mixins to use in your ember application

[DEMO](http://devotox.github.io/ember-cli-utilities)

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
    "animate.css": "3.6.1",
    "babel-plugin-transform-async-to-generator": "6.24.1",
    "babel-plugin-transform-object-rest-spread": "6.26.0",
    "ember-api-actions": "devotox/ember-api-actions",
    "ember-can": "1.0.0",
    "ember-cli-babel": "6.12.0",
    "ember-cli-head": "0.4.0",
    "ember-cli-htmlbars": "2.0.3",
    "ember-cli-htmlbars-inline-precompile": "1.0.2",
    "ember-cli-localforage": "1.0.2",
    "ember-cli-moment-shim": "3.6.0",
    "ember-cli-new-version": "devotox/ember-cli-new-version",
    "ember-cli-notifications": "4.2.1",
    "ember-cli-pushjs": "2.0.2",
    "ember-cli-roboto-fontface": "1.0.3",
    "ember-cli-sass": "7.1.7",
    "ember-cli-string-helpers": "1.8.0",
    "ember-composable-helpers": "2.1.0",
    "ember-cryptojs-shim": "4.2.0",
    "ember-fetch": "3.4.5",
    "ember-hammertime": "1.4.1",
    "ember-href-to": "1.15.1",
    "ember-i18n": "5.2.1",
    "ember-in-viewport": "3.0.1",
    "ember-lifeline": "3.0.1",
    "ember-material-design-icons-shim": "0.1.12",
    "ember-math-helpers": "2.4.1",
    "ember-moment": "7.6.0",
    "ember-notification-hub": "devotox/ember-notification-hub",
    "ember-object-update": "0.5.1",
    "ember-offline": "devotox/ember-offline",
    "ember-page-title": "4.0.3",
    "ember-paper": "1.0.0-beta.4",
    "ember-promise-helpers": "1.0.6",
    "ember-reactive-helpers": "0.5.0",
    "ember-route-action-helper": "2.0.6",
    "ember-simple-auth": "1.6.0",
    "ember-skeleton": "devotox/ember-skeleton",
    "ember-string-helpers": "1.0.2",
    "ember-truth-helpers": "2.0.0",
    "ember-velocity-mixin": "0.3.0",
    "normalize.css": "8.0.0"
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
    
## Initializers
* component-router
    - injects router main into components
* i18n-injection
    - injects i18n service into models, routes, controllers, components
* session-injection
    - injects session service into routes, controllers, components

## Instance Initializers
* i18n
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

### Installation

* `git clone <repository-url>`
* `cd ember-cli-utilities`
* `yarn install`

### Linting

* `yarn lint:js`
* `yarn lint:js --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).