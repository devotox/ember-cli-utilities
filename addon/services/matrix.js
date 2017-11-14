import $ from 'jquery';

import Service from '@ember/service';

import { later } from '@ember/runloop';

let { screen, document } = window;

export default Service.extend({

	matrixID: 'matrix',

	run() {
		$(document).on('keypress.matrix', ({ which, ctrlKey, altKey, shiftKey }) => {
			return which === 13 // m
				&& (ctrlKey && altKey && this.matrix())
				|| ctrlKey && shiftKey && this.clear()
				|| true;
		});
	},

	remove() {
		$(document).off('keypress.matrix');
	},

	matrix() {
		this.clear();
		this.timeout();

		let matrixID = this.get('matrixID');

		let $canvas = $('<canvas/>', { id: matrixID }).css({
			position: 'absolute', zIndex: 9999, left: 0, top: 0
		}).appendTo('body');

		let canvasElement = $canvas.get(0);
		let letters = new Array(256).join('1').split('');

		let width = canvasElement.width = screen.width;
		let height = canvasElement.height = screen.height;

		let draw = () => {
			canvasElement.getContext('2d').fillStyle = 'rgba(0,0,0,.05)';
			canvasElement.getContext('2d').fillRect(0, 0, width, height);
			canvasElement.getContext('2d').fillStyle = '#0F0';

			letters.map((yPos, index) => {
				let xPos = index * 10;
				let text = String.fromCharCode(3e4 + Math.random() * 33);

				canvasElement.getContext('2d').fillText(text, xPos, yPos);
				letters[index] = yPos > 758 + Math.random() * 1e4 ? 0 : yPos + 10;
			});
		};

		let matrixInterval = setInterval(draw, 33);
		this.set('matrixInterval', matrixInterval);
	},

	timeout() {
		let timeout = 30000; // 30 secs
		later(() => this.clear(), timeout);
	},

	clear() {
		let matrixInterval = this.get('matrixInterval');
		let matrixID = this.get('matrixID');

		clearInterval(matrixInterval);
		$(`#${matrixID}`).remove();
	}
});
