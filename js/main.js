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
let SliderEnableClick = true;

init();

next.addEventListener('click', (e) => {
	if (!SliderEnableClick) return;
	SliderEnableClick = false;
	nextSlide(e);
});

prev.addEventListener('click', (e) => {
	if (!SliderEnableClick) return;
	SliderEnableClick = false;
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
	activation1();
}

function prevSlide(e) {
	e.preventDefault();
	frame.prepend(frame.lastElementChild);
	activation1();
}

function activation1() {
	setTimeout(() => {
		const boxs = frame.querySelectorAll('article');
		for (const el of boxs) el.classList.remove('on');
		boxs[2].classList.add('on');
		SliderEnableClick = true;
	}, 500);
}

//tab
const main = document.querySelector('main');
const btns = main.querySelectorAll('ul li');
const tabBoxs = main.querySelectorAll('section article');
let speed = convertSpeed(tabBoxs[0]);
let TabEnableClick = true;

btns.forEach((el, ind) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		if (TabEnableClick) {
			TabEnableClick = false;
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

function activation(arr, index) {
	for (let tabBox of arr) tabBox.classList.remove('on');
	arr[index].classList.add('on');

	setTimeout(() => {
		TabEnableClick = true;
	}, speed);
}

function convertSpeed(el) {
	let sd = getComputedStyle(el).transitionDuration;

	sd = parseFloat(sd) * 1000;
	return sd;
}
