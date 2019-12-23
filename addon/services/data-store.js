import { Store } from 'ember-orbit';

export default class DataStore extends Store {
	query(queryOrExpression, options = { reload: true }, id = undefined) {
		return super.query(queryOrExpression, options, id);
	}
	findRecordsByAttribute(type, attribute, value, options) {
		return this.query((q) => {
			return q.findRecords(type).filter({ attribute, value });
		}, options);
	}
	async findRecordByAttribute(type, attribute, value, options) {
		const record = await this.findRecordsByAttribute(type, attribute, value, options);
		return record[0];
	}
}


// findRecordsByAttribute(
// 	type: string,
// 	attribute: string,
// 	value: string,
// 	options?: object
// ): Promise<Model[]> {
// 	return this.query((q) => {
// 		return q.findRecords(type).filter({ attribute, value });
// 	}, options);
// }

// async findRecordByAttribute(
// 	type: string,
// 	attribute: string,
// 	value: string,
// 	options?: object
// ): Promise<Model> {
// 	const record = await this.findRecordsByAttribute(type, attribute, value, options);

// 	return record[0];
// }