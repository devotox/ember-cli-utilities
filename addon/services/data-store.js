import { Store } from 'ember-orbit';

export default class DataStore extends Store {
	query(queryOrExpression, options = { reload: true }, id = undefined) {
		return super.query(queryOrExpression, options, id);
	}
	findRecordByAttribute(type, attribute, value, options) {
		return this.query((q) => {
			return q.findRecords(type).filter({ attribute, value });
		}, options);
	}
}