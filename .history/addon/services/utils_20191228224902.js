import { debug } from '@ember/debug';

import { run } from '@ember/runloop';

import Service from '@ember/service';

import { w, capitalize } from '@ember/string';

import { get } from '@ember/object';

const { Set, Math: { round, random, floor } } = window;

export default class UtilsService extends Service {
	noop(_) {
		return _;
	}
	exists(value) {
		return (
			(value || value === false || value === 0 || value === '')
			&& !(value === null || typeof value === 'undefined' || Number.isNaN(value))
		);
	}
	isObject(value) {
		return typeof value === 'object' && value !== null && !Array.isArray(value);
	}
	isArray(value) {
		return typeof value === 'object' && Array.isArray(value);
	}
	isNumber(value) {
		return !Number.isNaN(parseFloat(value)) && isFinite(value);
	}
	isFunction(value) {
		return typeof value === 'function';
	}
	isError(value) {
		return value instanceof Error;
	}
	isUUID(value){
		return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
	}
	ucfirst(value) {
		return value.charAt(0).toUpperCase() + value.slice(1);
	}
	random(min, max) {
		return floor(random() * (max - min + 1)) + min;
	}
	round(value, decimals) {
		return Number(`${round(`${value}e${decimals}`)}e-${decimals}`);
	}
	titleize(words) {
		return w(words.toString())
			.map(capitalize)
			.join(' ');
	}
	cleanObject(obj = {}) {
		Object.keys(obj).forEach((key) => (obj[key] === null || typeof obj[key] === 'undefined') && delete obj[key]);
		return obj;
	}
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
	}
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
	}
	toLowerCase(str) => {
		return this.isFunction(str?.toLowerCase) 
				? str.toLowerCase() 
				: str;
	}
	sortObjects(arrayOfObjects, sortBy, reverse) {
		let sortingFunction = null;
		let ordering = (A, B) => { return  A > B ? 1 : A === B ? 0 : -1 ; };
		let lower = (A, B) => {
			return [this.toLowerCase(A), this.toLowerCase(B)]; 
		}

		if(typeof sortBy === 'string') {
			sortingFunction = function(a, b) {
				let A = a[sortBy];
				let B = b[sortBy];
				let AB = lower(A, B);
				return ordering(AB[0], AB[1]);
			};
		} else if(get(this, 'utils').isFunction(sortBy)) {
			sortingFunction = function(a, b) {
				let A = sortBy.apply(a);
				let B = sortBy.apply(b);
				let AB = lower(A, B);
				return ordering(AB[0], AB[1]);
			};
		}
		return arrayOfObjects.sort(function() {
			return sortingFunction.apply(this, arguments) * (reverse ? -1 : 1);
		});
	}
	arrayToTree(rows) {
		let tree = [];

		let nodeMap = rows.reduce(function(map, node) {
			map[node.id || node.name] = node;
			return map;
		}, {});

		rows.forEach(function(node) {
			let parent = nodeMap[node.parent_id || node.parent_name];
			if (parent) {
				( parent.children || ( parent.children = [] ) ).push(node);
			} else {
				tree.push(node);
			}
		});

		return tree;
	}
	permute(input) {
		let used = [], permArr = [];

		function _permute(input) {
			let i, ch;
			for (i = 0; i < input.length; i++) {
				ch = input.splice(i, 1)[0];
				used.push(ch);

				if (input.length === 0) {
					permArr.push(used.slice());
				}
				_permute(input);
				input.splice(i, 0, ch);
				used.pop();
			}
			return permArr;
		}

		return _permute(input);
	}
	shuffle(array = []) {
		array = array.slice(0);
		let m = array.length, t, i;

		while (m) {
			i = floor(random() * m--);
			t = array[m];
			array[m] = array[i];
			array[i] = t;
		}

		return array;
	}
	unique(obj, prop, lower) {
		let result = [];
		let seen = new Set();

		Object.keys(obj)
			.forEach((key) => {
				let value = obj[key];
				lower
					&& value = value.toLowerCase())

				let test = !prop
					? value
					: value[prop];

				!seen.has(test)
					&& seen.add(test)
					&& result.push(value);
			});

		return result;
	}
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
	}
	range(left, right, step = 1, inclusive = true) {
		let range = [];
		let ascending = left < right;
		let end = !inclusive ? right : ascending ? right + 1 : right - 1;
		for (let i = left; ascending ? i < end : i > end; ascending ? i += step : i -= step) {
			range.push(i);
		}
		return range;
	}
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
	}
	draf(cb) {
		let raf
			= typeof requestAnimationFrame !== 'undefined'
				? requestAnimationFrame
				: (cb) => cb && cb(0);

		return raf(() => raf(cb));
	}
}
