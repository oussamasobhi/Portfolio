"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btnscrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
btnscrollto.addEventListener("click", function () {
  section1.scrollIntoView({ behavior: "smooth" });
});

/* document.querySelectorAll('.nav__link').forEach(function(el){
  
  el.addEventListener('click',function(e){
    e.preventDefault();
     const id=this.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'}); 
  });
}); */
/*
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    console.log(e.target.classList);
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});
*/

const tabs = document.querySelectorAll(".operations__tab");
const tabscontainer = document.querySelector(".operations__tab-container");
const tabscontent = document.querySelectorAll(".operations__content");

tabscontainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  if (!clicked) return;
  tabs.forEach((el) => el.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");
  const data = clicked.getAttribute("data-tab");

  tabscontent.forEach(function (el) {
    el.classList.remove("operations__content--active");
  });
  document
    .querySelector(`.operations__content--${data}`)
    .classList.add(`operations__content--active`);
});

const nav = document.querySelector(".nav");
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = 0.5;
      }
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((el) => {
      if (el != link) {
        el.style.opacity = 1;
      }
    });
    logo.style.opacity = 1;
  }
});

const coord = section1.getBoundingClientRect();
console.log(coord.top);
/* window.addEventListener('scroll',function(){
  
  if(window.scrollY>coord.top){
  if(!nav.classList.contains('sticky')){
    nav.classList.add('sticky');
  }
}
else{
  if(nav.classList.contains('sticky')){
    nav.classList.remove('sticky');
  }
}
}
); */

const header = document.querySelector(".header");
const stickynav = function (entries) {
  const [entry] = entries;
  //console.log(entry)
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const options = {
  root: null,
  threshold: 0, // until 100% hidden
  rootMargin: "-90px", // header become 90px shorter so we finish before section with 90px
};

const headerobserver = new IntersectionObserver(stickynav, options);
headerobserver.observe(header);

// reveal sections
const allsections = document.querySelectorAll(".section");

const revealsection = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionobserver = new IntersectionObserver(revealsection, {
  root: null,
  threshold: 0.15,
});

allsections.forEach(function (sec) {
  sectionobserver.observe(sec);
  sec.classList.add("section--hidden");
});

const allimages = document.querySelectorAll(".features__img");

const revealimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};
const imgobserver = new IntersectionObserver(revealimg, {
  root: null,
  threshold: 0,
});

allimages.forEach(function (img) {
  imgobserver.observe(img);
  //img.classList.add('lazy-img');
});
let currentslide = 0;

const slides = document.querySelectorAll(".slide");
const btnleft = document.querySelector(".slider__btn--left");
const btnright = document.querySelector(".slider__btn--right");
btnright.addEventListener("click", function () {
  if (currentslide == 1) currentslide = 0;
  else currentslide++;

  slides.forEach((slide, i) => {
    console.log(i);
    slide.style.transform = `translateX(${100 * (i - currentslide)}% )`;
  });
  activatedot(currentslide);
});

btnleft.addEventListener("click", function () {
  if (currentslide == 0) currentslide = 1;
  else {
    currentslide--;
  }

  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - currentslide)}% )`;
  });
  activatedot(currentslide);
});
const slider = document.querySelector(".slider");

slides.forEach((s, i) => {
  s.style.transform = `translateX(${100 * i}%)`;
});

const gotoslide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
  activatedot(slide);
};
const dot = document.querySelector(".dots");
const createdots = function () {
  slides.forEach(function (_, i) {
    dot.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createdots();

dot.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    gotoslide(slide);
  }
});

const activatedot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

allimages.forEach(function (img) {
  console.log(img.dataset.src);
});
let i = 2;
let j = 1;
let k = 1;
allimages.forEach(function (img) {
  img.addEventListener("mouseover", function (e) {
    if (img.classList.contains(1)) {
      i = i == 2 ? 1 : 2;
      img.src = `img/bankist${i}.jpg`;
    } else if (img.classList.contains(2)) {
      j = j == 2 ? 1 : 2;
      img.src = `img/demo${j}.jpg`;
    } else {
      k = k == 2 ? 1 : 2;
      img.src = `img/rentalscars${k}.jpg`;
    }
  });
});

allimages.forEach(function (img) {
  img.addEventListener("mouseout", function (e) {
    if (img.classList.contains(1)) {
      i = i == 1 ? 2 : 1;
      img.src = `img/bankist${i}.jpg`;
    } else if (img.classList.contains(2)) {
      j = j == 1 ? 2 : 1;
      img.src = `img/demo${j}.jpg`;
    } else {
      k = k == 1 ? 2 : 1;
      img.src = `img/rentalscars${k}.jpg`;
    }
  });
});
