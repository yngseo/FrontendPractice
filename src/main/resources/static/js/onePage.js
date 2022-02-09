
let list = document.querySelectorAll("nav > ul > li");
list.forEach((li, i) => {
    li.addEventListener("click", () => {
        if (document.querySelector(".active") != null && document.querySelectorAll("nav ul ul")[i].classList.value != 'active') {
            document.querySelector(".active").classList.remove('active');
            document.querySelectorAll("nav ul ul")[i].classList.add('active');
        } else {
            document.querySelectorAll("nav ul ul")[i].classList.toggle('active');
        }
    })
})

/*자바스크립트 스크롤*/
let btn = document.querySelectorAll('.scroll-move');
let target = document.querySelector('.main');
let target_top = target.offsetTop;
let target_height = document.querySelector('.main section').offsetHeight;

btn.forEach(_btn => {
    _btn.addEventListener('click', (e) => {
        e.preventDefault();
        let num = _btn.innerText;
        window.scroll({top: ((num - 1) * target_height + target_top), behavior: 'smooth'});
    })
})

let section = document.querySelectorAll(".main section");
let sectionCnt = section.length;
window.addEventListener('scroll', () => {
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    section.forEach((list, i) => {
        let sectionTop = section[i].offsetTop;
        if (scrollLocation >= sectionTop && scrollLocation < sectionTop+section[i].offsetHeight) {
            btn[i].style.backgroundColor = "#21409A"
        } else {
            btn[i].style.backgroundColor = "#dcdcdc"
        }
    })
})