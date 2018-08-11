import { get } from '@ember/object';

import { debug } from '@ember/debug';

import { run } from '@ember/runloop';

import Service from '@ember/service';

import { w, capitalize } from '@ember/string';

const { Set, Math: { round, random, floor } } = window;

export default Service.extend({
	noop(_) {
		return _;
	},
	exists(value) {
		return (
			(value || value === false || value === 0 || value === '')
			&& !(value === null || typeof value === 'undefined' || Number.isNaN(value))
		);
	},
	isObject(value) {
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	},
	isArray(value) {
		return typeof value === 'object' && Array.isArray(value);
	},
	isNumber(value) {
		return !Number.isNaN(parseFloat(value)) && isFinite(value);
	},
	isFunction(value) {
		return typeof value === 'function';
	},
	isError(value) {
		return value instanceof Error;
	},
	ucfirst(value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	},
	random(min, max) {
		return floor(random() * (max - min + 1)) + min;
	},
	round(value, decimals) {
		return Number(`${round(`${value}e${decimals}`)}e-${decimals}`);
	},
	titleize(words) {
		return w(words.toString())
			.map(capitalize)
			.join(' ');
	},
	cleanObject(obj = {}) {
		Object.keys(obj).forEach((key) => (obj[key] === null || typeof obj[key] === 'undefined') && delete obj[key]);
		return obj;
	},
	stringToBoolean(value) {
		value
			= value
			&& value
				.toString()
				.toLowerCase()
				.trim();

		return this.switch(value, {
			'1': true,
			on: true,
			yes: true,
			true: true,
			default: false
		});
	},
	switch(input, cases = {}) {
		cases = Object.assign({
			default() {
				let message = 'default run for unhandled case:';
				debug(message, input);
			}
		}, cases);

		return this.exists(cases[input])
			? this.isFunction(cases[input]) ? cases[input]() : cases[input]
			: this.isFunction(cases.default) ? cases.default() : cases.default;
	},
	unique(obj, prop) {
		let result = [];
		let seen = new Set();

		Object.keys(obj)
			.forEach((key) => {
				let value = obj[key];

				let test = !prop
					? value
					: value[prop];

				!seen.has(test)
				&& seen.add(test)
				&& result.push(value);
			});

		return result;
	},
	contains(obj, item) {
		if (!obj || !item) {
			return;
		}
		return (
			obj.includes(item) && item
			|| obj.find((o) => {
				let objId = get(o, 'id');
				let itemId = get(item, 'id');

				objId = Number.isNaN(objId) ? objId : parseInt(objId, 10);
				itemId = Number.isNaN(itemId) ? itemId : parseInt(itemId, 10);

				return objId === itemId;
			})
		);
	},
	range(left, right, step = 1, inclusive = true) {
		let range = [];
		let ascending = left < right;
		let end = !inclusive ? right : ascending ? right + 1 : right - 1;
		for (let i = left; ascending ? i < end : i > end; ascending ? i += step : i -= step) {
			range.push(i);
		}
		return range;
	},
	scrollTo(element, to, duration) {
		let start = element.scrollTop;
		let change = to - start;
		let currentTime = 0;
		let increment = 20;

		let easeInOutQuad = (t, b, c, d) => {
			t /= d / 2;

			if (t < 1) {
				return c / 2 * t * t + b;
			}

			t--;
			return -c / 2 * (t * (t - 2) - 1) + b;
		};

		let animateScroll = () => {
			currentTime += increment;
			element.scrollTop = easeInOutQuad(currentTime, start, change, duration);

			if (currentTime < duration) {
				run.later(animateScroll, increment);
			}
		};

		animateScroll();
	},
	draf(cb) {
		let raf
			= typeof requestAnimationFrame !== 'undefined'
				? requestAnimationFrame
				: (cb) => cb && cb(0);

		return raf(() => raf(cb));
	}
});
