import Service from '@ember/service';

export default class GeometryService extends Service {
	radius = 6378137;
	toRadians(degrees) {
		return degrees * Math.PI / 180;
	}
	toDegrees(radians) {
		return radians * 180 / Math.PI;
	}
	mapArea(points) {
		let area = 0;
		let sin = Math.sin;
		let rad = this.toRadians;
		let radius = this.get('radius');

		for (let i = 0; i < points.length; i++) {
			let p1 = points[i];
			let p2 = points[(i + 1) % points.length];

			area += 
				rad(p2.lng - p1.lng) *
				(2 + sin(rad(p2.lat)) + sin(rad(p1.lat)))
			;
		}

		return Math.abs(area * Math.pow(radius, 2) / 2);
	}
	mapArea2(points) {
		let cos = Math.cos;
		let rad = this.toRadians;
		let radius = this.get('radius');
		let lat_dist = Math.PI * radius / 180;

		let new_points = points.map( (point) => {
			return {
				lat: point.lat * lat_dist,
				lng: point.lng * lat_dist * cos(rad(point.lat))
			};
		});

		return this.polygonArea(new_points);
	}
	polygonArea(points) {
		let area = 0;

		for (let i = 0; i < points.length; i++) {
			let p1 = points[i];
			let p2 = points[(i + 1) % points.length];
			area += (p2.lng + p1.lng) * (p2.lat - p1.lat);
		}

		return Math.abs(area) / 2;
	}
	polygonCenter(points) {
		let twoTimesSignedArea = 0;
		let cxTimes6SignedArea = 0;
		let cyTimes6SignedArea = 0;

		for (let i = 0; i < points.length; i++) {
			let p1 = points[i];
			let p2 = points[(i + 1) % points.length];
			let twoSA =  p1.lng * p2.lat  -  p1.lat * p2.lng ;

			twoTimesSignedArea += twoSA;
			cxTimes6SignedArea += (p1.lng + p2.lng) * twoSA;
			cyTimes6SignedArea += (p1.lat + p2.lat) * twoSA;
		}

		let sixSignedArea = 3 * twoTimesSignedArea;
		return [ cxTimes6SignedArea / sixSignedArea, cyTimes6SignedArea / sixSignedArea];
	}
	pointInPolygon(point, points) {
		let x = point.lng, y = point.lat;

		let inside = false;
		for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
			let xi = points[i].lng, yi = points[i].lat;
			let xj = points[j].lng, yj = points[j].lat;

			let intersect = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
			if (intersect) { inside = !inside; }
		}

		return inside;
	}
	convexHull(points) {
		function cross(o, a, b) {
			return (a.lng - o.lng) * (b.lat - o.lat) - (a.lat - o.lat) * (b.lng - o.lng);
		}

		points.sort(function(a, b) {
			return a.lng === b.lng ? a.lat - b.lat : a.lng - b.lng;
		});

		let lower = [];
		for (let i = 0; i < points.length; i++) {
			while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], points[i]) <= 0) {
				lower.pop();
			}
			lower.push(points[i]);
		}

		let upper = [];
		for (let i = points.length - 1; i >= 0; i--) {
			while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], points[i]) <= 0) {
				upper.pop();
			}
			upper.push(points[i]);
		}

		upper.pop();
		lower.pop();
		return lower.concat(upper);
	}
}
