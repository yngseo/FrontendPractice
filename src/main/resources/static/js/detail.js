
let more = document.getElementById("hamburger-2");
more.addEventListener("click", () => { /*onclick*/
    document.querySelector("nav:not(#col)").classList.toggle('is-active');
    more.classList.toggle('is-active');
})

let mainList = document.querySelectorAll("nav > ul > li");
mainList.forEach((li, i) => {
    li.addEventListener("click", () => {
        if (document.querySelector(".active") != null && document.querySelectorAll("nav ul ul")[i].classList.value != 'active') {
            document.querySelector(".active").classList.remove('active');
            document.querySelectorAll("nav ul ul")[i].classList.add('active');
        } else {
            document.querySelectorAll("nav ul ul")[i].classList.toggle('active');
        }
    })
})

let btn = document.querySelectorAll(".sub_hide");
btn.forEach((down, i) => {
    down.parentElement.addEventListener("click", () => {
        if (document.querySelectorAll(".is-active").length > 0 && down != document.querySelector(".is-active").parentElement.querySelector(".sub_hide")) {
            document.querySelector(".is-active").classList.remove("is-active");
            document.querySelectorAll("#sub_nav > li > ul")[i].classList.add('is-active');
        } else {
            document.querySelectorAll("#sub_nav > li > ul")[i].classList.toggle('is-active'); /*toggle 대신 remove, add만*/
        }
    })
})

let contact = document.getElementById("contact_bt");
contact.addEventListener("click", () => {
    document.querySelector(".content").classList.toggle('is-active');
    document.querySelector(".contact").classList.toggle('is-active');
    contact.classList.toggle('is-active');
});

let subTitle = document.querySelector(".subtit");
let list = document.querySelectorAll("#sub_nav ul > li");
list.forEach((li, i) => {
    document.addEventListener("DOMContentLoaded", function () {
        if (subTitle.innerText == list[i].innerText) {
            list[i].style.backgroundColor = "#231f20";
            list[i].querySelector('span').style.color = "#fcfcfc";
        }
    })
})

/*가독성 향상 필요*/


/*수동 루프 배너*/
let slides = document.querySelector('.slide_wrap');
let slide = document.querySelectorAll('.slide_item');
let currentIdx = 0;
let slideCount = slide.length;
let slideWidth = 200;
let prevBtn = document.querySelector(".prev");
let nextBtn = document.querySelector(".next");

makeClone();

function makeClone() {
    for (let i = 0 ; i<slideCount ; i++) {
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for (let i = slideCount-1 ; i>=0 ; i--) {
        let cloneSlide = slide[i].cloneNode(true);
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();
    setTimeout(function () {
        slides.classList.add('animated');
    }, 100);
}

function updateWidth() { /*가로 업데이트*/
    let currentSlides = document.querySelectorAll('.slide_item');
    let newSlideCount = currentSlides.length;

    let newWidth = slideWidth * newSlideCount + 'px';
    slides.style.width = newWidth;
}

function setInitialPos() { /*clone이 아닌 원본으로 시작점*/
    let initialTranslateVal = -(slideWidth) * slideCount;
    slides.style.transform = 'translateX(' + initialTranslateVal + 'px)';
}

nextBtn.addEventListener('click', function () {
    moveSlide(currentIdx + 1);
})
prevBtn.addEventListener('click', function () {
    moveSlide(currentIdx - 1);
})

function moveSlide(num) {
    slides.style.left = -num * slideWidth + 'px';
    currentIdx = num;
    console.log(currentIdx, slideCount);

    if (currentIdx == slideCount || currentIdx == -slideCount) {
        setTimeout(function () {
            slides.classList.remove('animated');
            slides.style.left = '0px';
            currentIdx = 0;
        }, 500);
        setTimeout(function () {
            slides.classList.add('animated');
        }, 600)
    }
}
