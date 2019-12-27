/* eslint max-len: ["error", { "ignoreRegExpLiterals": true, "code": 140 }]*/
import JSON from 'json-fn';

import { Promise } from 'rsvp';

import Service from '@ember/service';

import CircularJSON from 'flatted/esm';

export default class CryptoService extends Service {
	JSON = JSON;

	CircularJSON = CircularJSON;

	exists(value) {
		return value !== null && typeof value !== 'undefined';
	}
	toBase64(str) {
		try {
			return btoa(unescape(encodeURIComponent(str)));
		} catch(e) {
			return btoa(str);
		}
	}
	fromBase64(str) {
		try {
			return decodeURIComponent(escape(atob(str)));
		} catch(e) {
			return atob(str);
		}
	}
	encodeUTF8(s) {
		return unescape(encodeURIComponent(s));
	}
	decodeUTF8(s) {
		return decodeURIComponent(escape(s));
	}
	hash(s) {
		let h = 0;
		for (let i = 0; i < s.length; i++) {
			h = s.charCodeAt(i) + ((h << 5) - h);
		}
		return h;
	}
	uuid(len) {
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
			let r, v;
			r = Math.random() * 16 | 0;
			v = c === 'x' ? r : r & 0x3 | 0x8;
			return v.toString(16);
		});

		return !len
			? uuid
			: uuid.replace(/-/g, '').substring(0, len);
	}
	createURL(blob) {
		return URL.createObjectURL(blob);
	}
	fromBlob(blob, type = 'text') {
		let func = type === 'data' ? 'readAsDataURL' : 'readAsText';

		return new Promise((resolve, reject) => {
			let reader = new FileReader();

			reader[func](blob);
			reader.onerror = (error) => reject(error);
			reader.onload = () => resolve(reader.result);
		});
	}
	toBlob(dataURI) {
		let { buffer, mimeString } = this.toArrayBuffer(dataURI);

		// write the ArrayBuffer to a blob, and you're done
		return new Blob([buffer], { type: mimeString });
	}
	toArrayBuffer(dataURI) {
		// convert base64 to raw binary data held in a string
		// doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
		let byteString = atob(dataURI.split(',')[1]);

		// separate out the mime component
		// let [[, [mimeString]]] = dataURI.split(',')[0].split(':')[1].split(';');
		let [mimeString] = dataURI.split(',');
		[, mimeString] = mimeString.split(':');
		[mimeString] = mimeString.split(';');

		// write the bytes of the string to an ArrayBuffer
		let buffer = new ArrayBuffer(byteString.length);
		let uArray = new Uint8Array(buffer);

		for (let i = 0; i < byteString.length; i++) {
			uArray[i] = byteString.charCodeAt(i);
		}

		return {
			buffer,
			uArray,
			mimeString
		};
	}
	isDataURI(dataURI) {
		let regex = /^\s*data:([a-z]+\/[a-z0-9\-+]+(;[a-z-]+=[a-z0-9-]+)?)?(;base64)?,[a-z0-9!$&',()*+;=\-._~:@/?%\s]*\s*$/i;
		return dataURI && typeof dataURI === 'string' &&  !!dataURI.match(regex);
	}
}
