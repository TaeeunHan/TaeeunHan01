/*
Key: 89aae050d1d8c006bdb5bf866029199d

https://www.flickr.com/services/rest/?method=flickr.test.echo&name=value

flickr.interestingness.getList

https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

flickr.photos.search

*/

const body = document.querySelector("body");
const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btnSearch = document.querySelector(".btnSearch");
const base = "https://www.flickr.com/services/rest/?";
const method1 = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";
const key = "89aae050d1d8c006bdb5bf866029199d";
const per_page = 20;

const url = `${base}method=${method1}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;



callData(url);

btnSearch.addEventListener("click", (e) => {

  let tag = input.value;
  tag = tag.trim();

  const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

  if (tag != "") {
    callData(url);
  } else {
    frame.innerHTML = "";
    frame.classList.remove("on");
    frame.style.height = "auto";

    const errMsgs = frame.parentElement.querySelectorAll("p");
    if (errMsgs.length > 0) frame.parentElement.querySelector("p").remove();



    const errMeg = document.createElement("p");
    //errMeg.innerText = "검색어를 쓰지 않았어요";
    errMeg.append("검색어를 쓰지 않았습니다, 검색어를 입력하세요");
    frame.parentElement.append(errMeg);
    //closest("#wrap")vs parentElement  클로지스트는 부모요소가 정확하게 누구인지를 알야한다. 반면 엘레멘트는 단순하게 부모를 찾을때
  }

})
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    let tag = input.value;
    tag = tag.trim();

    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;

    if (tag != "") {
      callData(url);
    } else {
      frame.innerHTML = "";
      frame.classList.remove("on");
      frame.style.height = "auto";

      const errMsgs = frame.parentElement.querySelectorAll("p");
      if (errMsgs.length > 0) frame.parentElement.querySelector("p").remove();



      const errMeg = document.createElement("p");
      //errMeg.innerText = "검색어를 쓰지 않았어요";
      errMeg.append("검색어를 쓰지 않았습니다, 검색어를 입력하세요");
      frame.parentElement.append(errMeg);
      //closest("#wrap")vs parentElement  클로지스트는 부모요소가 정확하게 누구인지를 알야한다. 반면 엘레멘트는 단순하게 부모를 찾을때
    }
  }
})
frame.addEventListener("click", (e) => {
  e.preventDefault();

  //padding이 아닌 margin을 넣어서 공간을 벌렸다면 그 공간 ul즉 frame의 공간이 되기 때문에 이 코드가 필요하다
  if (e.target == frame) return;


  let target = e.target.closest(".item").querySelector(".thumb");

  if (e.target == target) {
    let imgSrc = target.parentElement.getAttribute("href");
    let pop = document.createElement("aside");
    pop.classList.add("pop");
    let pops = `
      <div class="con">
        <img src="${imgSrc}">
      </div>
      <span class="close">close</span>
    `;
    pop.innerHTML = pops;
    body.querySelector("#gallery").append(pop);
    //body.append(pop); 이렇게해도 결과 같은 같다, 하지만 pop이라는 aside태그가 붙는 위치는 달라진다 => 붙었다 떼는과정에서 차지하는 공간으로 인한 들뜸현상(계단현상)이 있을수 있다.
    body.style.overflow = "hidden";
    //이미지를 크게보았을때 스크롤을 하지 않토록 하는 코드
    //e.target.closest(".item").querySelector("a").getAttribute("href");
  }
})
//body가아니라 겔러리를 변수로잡아 사용해도된다
body.addEventListener("click", (e) => {
  let pop = body.querySelector(".pop");
  if (pop != null) {
    let close = pop.querySelector(".close");
    if (e.target == close) {
      pop.remove();
      body.style.overflow = "auto";
    }
  }
})





function callData(url) {
  fetch(url)
    .then((data) => {
      return data.json();
    })
    .then((json) => {
      let items = json.photos.photo;

      createList(items);

      delayLoading();

    })
}

function createList(items) {
  let htmls = "";
  items.map((el) => {

    let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

    let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

    htmls += `
        <li class="item">
          <div>
            <a href=${imgSrcBig}>
              <img src=${imgSrc} class="thumb">
            </a>
            <p>${el.title}</p>
            <span>
              <img class="profile" src="http://farm${el.farm}.staticflickr.com/${el.server}/buddyicons/${el.owner}.jpg">
              <strong>${el.owner}</strong>
            </span>
          </div>
        </li>
      `;
  })
  frame.innerHTML = htmls;
}

function delayLoading() {
  const imgs = frame.querySelectorAll("img");
  const len = imgs.length;
  let count = 0;

  for (let el of imgs) {
    el.onload = () => {
      count++;
      if (count == len) {
        isoLayout();
      }
    }

    // let thumb = el.closest(".item").querySelector(".thumb");//
    el.onerror = (e) => {
      e.currentTarget.setAttribute('src', "img/k1.jpg");
    }

    let profile = el.closest(".item").querySelector(".profile");
    profile.onerror = (e) => {
      e.currentTarget.setAttribute("src", "https://www.flickr.com/images/buddyicon.gif");
    }
  }
}

function isoLayout() {

  loading.classList.add("off");
  frame.classList.add("on");


  new Isotope("#list", {
    itemSelection: ".item",
    columnWidth: ".item",
    transitionDuration: "0.5s",
  })
}