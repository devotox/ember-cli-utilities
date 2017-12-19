import loadEmberExam from 'ember-exam/test-support/load';
import resolver from './helpers/resolver';
import {
	setResolver
} from 'ember-qunit';
import { start } from 'ember-cli-qunit';

loadEmberExam();
setResolver(resolver);
start();
