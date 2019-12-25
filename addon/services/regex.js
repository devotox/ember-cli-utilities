/* eslint max-len: ["error", { "ignoreRegExpLiterals": true, "code": 140 }]*/

import { debug } from '@ember/debug';

import Service from '@ember/service';

export default Service.extend({
	create(value) {
		return value
			&& (this.isRegex(value) && value
				|| this[value] || this.stringToRegex(value)
			);
	},
	isRegex(value) {
		return value instanceof RegExp;
	},
	stringToRegex(value) {
		let flags = value.replace(/.*\/([gimy]*)$/, '$1');
		let pattern = value.replace(new RegExp(`^/(.*?)/${flags}$`), '$1');
		flags === value && (flags = '');

		try {
			return new RegExp(pattern, flags);
		} catch(error) {
			debug('[String To Regex]', error);
		}
	},
	Numeric: /^\d+$/,
	Alpha: /^[a-z]+$/i,
	AlphaNumeric: /^\w+$/i,
	USZip: /\d{5}-\d{4}$|^\d{5}$/,
	AlphabetWithPunctuation: /^[a-z_.,\-()\s']+$/i,
	AlphaNumericWithPunctuation: /^[\w_.,\-()\s']+$/i,
	USPhone: /^(\+?1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/,
	NIN: /^[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-DFM]{0,1}$/i,
	Coordinates: /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/,
	Email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	UKMobile: /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)?44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)7(?:[1-4]\d\d|5(?:0[0-8]|[13-9]\d|2[0-35-9])|624|7(?:0[1-9]|[1-7]\d|8[02-9]|9[0-689])|8(?:[014-9]\d|[23][0-8])|9(?:[04-9]\d|1[02-9]|2[0-35-9]|3[0-689]))\d{6}$/,
	UKPhones: /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)?44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{5}\)?[\s-]?\d{4,5}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|#)\d+)?)$/,
	UKPostcode: /^(GIR 0AA)|(((A[BL]|B[ABDHLNRSTX]?|C[ABFHMORTVW]|D[ADEGHLNTY]|E[HNX]?|F[KY]|G[LUY]?|H[ADGPRSUX]|I[GMPV]|JE|K[ATWY]|L[ADELNSU]?|M[EKL]?|N[EGNPRW]?|O[LX]|P[AEHLOR]|R[GHM]|S[AEGKLMNOPRSTY]?|T[ADFNQRSW]|UB|W[ADFNRSV]|YO|ZE)[1-9]?[0-9]|((E|N|NW|SE|SW|W)1|EC[1-4]|WC[12])[A-HJKMNPR-Y]|(SW|W)([2-9]|[1-9][0-9])|EC[1-9][0-9])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
	UKLandline: /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)?44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(2\d[2-9]\d{7}|1(?:1\d|\d1)[2-9]\d{6}|1(?:[248][02-9]\d[2-9]\d{4,5}|(?:3(?:[02-79]\d|8[0-69])|5(?:[04-9]\d|2[0-35-9]|3[0-8])|6(?:[02-8]\d|9[0-689])|7(?:[02-5789]\d|6[0-79])|9(?:[0235-9]\d|4[0-5789]))[2-9]\d{4,5}|(?:387(?:3[2-9]|[24-9]\d)|5(?:24(?:2[2-9]|[3-9]\d)|39(?:[456][2-9]|[23789]\d))|697(?:[347][2-9]|[25689]\d)|768(?:[347][2-9]|[25679]\d)|946(?:7[2-9]|[2-689]\d))\d{3,4}))$/
});
