import Application from '../app';
import { start } from 'ember-qunit';
import config from '../config/environment';
import { setApplication } from '@ember/test-helpers';
import loadEmberExam from 'ember-exam/test-support/load';

loadEmberExam();
setApplication(Application.create(config.APP));

start();
