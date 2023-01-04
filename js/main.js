//header
const btnCall = document.querySelector('.btnCall');
const menuMo = document.querySelector('.menuMo');

btnCall.onclick = function (e) {
	e.preventDefault();

	btnCall.classList.toggle('on');
	menuMo.classList.toggle('on');
};

//slider
const frame = document.querySelector('#visual');
const panels = frame.querySelectorAll('.panel li');
const btns = frame.querySelectorAll('.btns li');
const btnPlay = frame.querySelector('.fa-play');
const btnPause = frame.querySelector('.fa-pause');
const bar = frame.querySelector('.bar');
const len = panels.length - 1;
const interval = 5000;
let num = 0;
let timer = null;

//로딩시 startRolling함수 호출해서 패널 자동롤링 시작
startRolling();

//각 버튼 클릭시 활성화 함수실행 및 stopRoliing으로 롤링기능 정지
btns.forEach((btn, idx) => {
	btn.addEventListener('click', () => {
		activation(idx);
		stopRolling();
	});
});

//재생, 정지 버튼 클릭시 startRolling, stopRolling함수 호출
btnPlay.addEventListener('click', startRolling);
btnPause.addEventListener('click', stopRolling);

//버튼 , 패널 활성화함수
function activation(index) {
	//인수로 전달받은 버튼과 패널만 활성화
	for (const el of panels) el.classList.remove('on');
	for (const el of btns) el.classList.remove('on');
	panels[index].classList.add('on');
	btns[index].classList.add('on');
	//인수로 전달받은 순번으로 전역 활성화 순번 갱신
	num = index;
	//패널 활성화시 진행바의 넓이값을 0%로 초기화
	bar.style.width = '0%';
}

//롤링함수
function rolling() {
	num < len ? num++ : (num = 0);
	//활성화 순번에 맞게 패널, 버튼 활성화
	activation(num);
	//진행바 모션 시작
	progress();
}

//롤링 시작 함수
function startRolling() {
	//진행바 보임처리
	bar.style.display = 'block';
	//setTimeout으로 progress함수를 강제 동기화 해서
	//bar보임처리 이후에 모션실행
	setTimeout(progress, 0);

	//활성화 함수 호출하면서
	//다시 롤링시작
	activation(num);
	timer = setInterval(rolling, interval);

	//재생버튼 활성화
	btnPlay.classList.add('on');
	btnPause.classList.remove('on');
}

//롤링 정지 함수
function stopRolling() {
	//진행바 숨김처리
	bar.style.display = 'none';
	//자동롤링 중지
	clearInterval(timer);
	//정지버튼 활성화
	btnPause.classList.add('on');
	btnPlay.classList.remove('on');
}

//진행바 모션 함수
function progress() {
	new Anime(bar, {
		prop: 'width',
		value: '100%',
		duration: interval,
	});
}

//scroll

//tab
const main = document.querySelector('#tab main');
const Tbtns = main.querySelectorAll('ul li');
const tabBoxs = main.querySelectorAll('section article');
let speed = convertSpeed(tabBoxs[0]);
let TabEnableClick = true;

Tbtns.forEach((el, ind) => {
	el.addEventListener('click', (e) => {
		e.preventDefault();

		if (TabEnableClick) {
			TabEnableClick = false;
			activation2(Tbtns, ind);
			activation2(tabBoxs, ind);
		}
	});
});

function activation2(arr, index) {
	for (let tabBox of arr) tabBox.classList.remove('on');
	arr[index].classList.add('on');
	console.log(arr);

	setTimeout(() => {
		TabEnableClick = true;
	}, speed);
}

function convertSpeed(el) {
	let sd = getComputedStyle(el).transitionDuration;

	sd = parseFloat(sd) * 1000;
	return sd;
}
