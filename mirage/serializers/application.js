import sort from 'fast-sort';
import { JSONAPISerializer } from 'ember-cli-mirage';

const stringToBoolean = (str) =>
	({ 'true': true, 'false': false }[str?.trim().toLowerCase()] || str);

export default class Application extends JSONAPISerializer {
	// Can filter by any value on attributes
	// Or an ID on a relationship that MUST be in the `includes`
	filterResourceHash(resourceHash) {
		const params = this.getFilteringQueryParams();
		if (!params?.length) { return resourceHash; }

		return resourceHash.filter((item) => params.every((param) => {
			const { key: path } = param;

			if (path === 'id') {
				// Most of the time, the consumer will provide an integer id, hence the `==`.
				return item?.[path] === param.value;
			}

			const { attributes, relationships } = item;
			return attributes?.[path] === param?.value
				|| relationships?.[path]?.data?.id === param?.value;
		}));
	}

	paginateResourceHash(resourceHash) {
		const params = this.getPaginationQueryParams();

		if (!params) { return resourceHash; }

		const { number, size } = params;
		return resourceHash.slice((number - 1) * size, number * size);
	}

	sortResourceHash(resourceHash) {
		const params = this.getSortingQueryParam();
		if (!params?.length) { return resourceHash; }

		return sort(resourceHash).by(params.map(({ key, direction }) => {
			return { [direction]: (s) => s?.attributes?.[key] };
		}));
	}

	getHashForPrimaryResource(resource) {
		this._createRequestedIncludesGraph(resource);
		let resourceHash = this.getHashForResource(resource);

		if (Array.isArray(resourceHash)) {
			resourceHash = this.filterResourceHash(resourceHash);
			resourceHash = this.sortResourceHash(resourceHash);
			resourceHash = this.paginateResourceHash(resourceHash);
		}

		const hashWithRoot = { data: resourceHash };
		const addToIncludes = this.getAddToIncludesForResource(resource);

		return [hashWithRoot, addToIncludes];
	}

	getFilteringQueryParams() {
		const queryParams = this?.request?.queryParams || {};
		const regex = /^filter\[([a-z-_]*)]$/i;

		return Object.entries(queryParams)
			.filter(([key]) => regex.test(key))
			.map(([key, value]) => {
				value = stringToBoolean(value);
				/^\d+$/.test(value) && (value = Number(value));
				return { key: regex.exec(key)[1], value };
			});
	}

	getPaginationQueryParams() {
		const queryParams = this?.request?.queryParams || {};
		const { 'page[number]': number = 1, 'page[size]': size } = queryParams;

		if (!size) { return null; }

		return { number, size };
	}

	getSortingQueryParam() {
		const queryParams = this?.request?.queryParams || {};
		const { sort } = queryParams;

		if (!sort) { return null; }

		return sort.split(',').map((param) => ({
			direction: param.startsWith('-') ? 'desc' : 'asc',
			key: param.replace('-', '')
		}));
	}
}
