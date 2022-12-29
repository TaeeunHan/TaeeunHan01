//header
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
};

//slider
const frame = document.querySelector('#visual .inner');
const boxs = frame.querySelectorAll('article');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
let enableClick = true;

init();

next.addEventListener('click', (e) => {
	if (!enableClick) return;
	enableClick = false;
	nextSlide(e);
});

prev.addEventListener('click', (e) => {
	if (!enableClick) return;
	enableClick = false;
	prevSlide(e);
});
function init() {
	frame.prepend(frame.lastElementChild);
	frame.prepend(frame.lastElementChild);
	boxs[0].classList.add('on');
}

function nextSlide(e) {
	e.preventDefault();
	frame.append(frame.firstElementChild);
	activation();
}

function prevSlide(e) {
	e.preventDefault();
	frame.prepend(frame.lastElementChild);
	activation();
}

function activation() {
	setTimeout(() => {
		const boxs = frame.querySelectorAll('article');
		for (const el of boxs) el.classList.remove('on');
		boxs[2].classList.add('on');
		enableClick = true;
	}, 500);
}

//tab
const main = document.querySelector('main');
const btns = main.querySelectorAll('ul li');
const tabBoxs = main.querySelectorAll('section article');
let speed = convertSpeed(tabBoxs[0]);

btns.forEach((el, ind) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		if (enableClick) {
			enableClick = false;
			activation(btns, ind);
			activation(tabBoxs, ind);
			new Anim(main, {
				prop: 'height',
				value: matchHT(ind),
				duration: speed,
			});
		}
	});
});

//이 부분이 문제!
function activation(arr, index) {
	for (let tabBox of arr) tabBox.classList.remove('on');
	arr[index].classList.add('on');

	setTimeout(() => {
		enableClick = true;
	}, speed);
}

function convertSpeed(el) {
	let sd = getComputedStyle(el).transitionDuration;

	sd = parseFloat(sd) * 1000;
	return sd;
}
