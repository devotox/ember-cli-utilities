import { Store } from 'ember-orbit';

export default class DataStore extends Store {
	findRecords(type, { filter, sort, page, include, ...options } = {}) {
		include && put(options, 'sources.remote.include', include);

		return this.query((q) => {
			let result = q.findRecords(type);

			page && (result = result.page(page));
			sort && (result = result.sort(...sort));
			filter && (result = result.filter(...filter));

			return result;
		}, options);
	}
	findRelatedRecords(type, id, relatedType, { filter, sort, page, include, ...options }) {
		include && put(options, 'sources.remote.include', include);

		return this.query((q) => {
			let result = q.findRelatedRecords({ type, id }, relatedType);

			page && (result = result.page(page));
			sort && (result = result.sort(...sort));
			filter && (result = result.filter(...filter));

			return result;
		}, options);
	}
	findRecordsByAttribute(type, attribute, value, options) {
		return this.findRecords(type, {
			...options,
			filter: [{ attribute, value }]
		})
	}
	async findRecordByAttribute(type, attribute, value, options) {
		const [record] = await this.findRecordsByAttribute(type, attribute, value, options);
		return record;
	}
	async findRelatedRecord(type, id, relatedType, options) {
		const [record] = await this.findRelatedRecords(type, id, relatedType, options);
		return record;
	}
}

/*!
 * Add items to an object at a specific path
 * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
 * @param  {Object}       obj  The object
 * @param  {String|Array} path The path to assign the value to
 * @param  {*}            val  The value to assign
 */
let put = function(obj, path, val) {

	/**
	 * If the path is a string, convert it to an array
	 * @param  {String|Array} path The path
	 * @return {Array}             The path array
	 */
	let stringToPath = function(path) {

		// If the path isn't a string, return it
		if (typeof path !== 'string') return path;

		// Create new array
		let output = [];

		// Split to an array with dot notation
		path.split('.').forEach(function(item) {

			// Split to an array with bracket notation
			item.split(/\[([^}]+)\]/g).forEach(function(key) {

				// Push to the new array
				if (key.length > 0) {
					output.push(key);
				}

			});

		});

		return output;
	};

	// Convert the path to an array if not already
	path = stringToPath(path);

	// Cache the path length and current spot in the object
	let length = path.length;
	let current = obj;

	// Loop through the path
	path.forEach(function(key, index) {

		// Check if the assigned key shoul be an array
		let isArray = key.slice(-2) === '[]';

		// If so, get the true key name by removing the trailing []
		key = isArray ? key.slice(0, -2) : key;

		// If the key should be an array and isn't, create an array
		if (isArray && Object.prototype.toString.call(current[key]) !== '[object Array]') {
			current[key] = [];
		}

		// If this is the last item in the loop, assign the value
		if (index === length - 1) {

			// If it's an array, push the value
			// Otherwise, assign it
			if (isArray) {
				current[key].push(val);
			} else {
				current[key] = val;
			}
		} else {
			// Otherwise, update the current place in the object

			// If the key doesn't exist, create it
			if (!current[key]) {
				current[key] = {};
			}

			// Update the current place in the object
			current = current[key];

		}
	});
};
