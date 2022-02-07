let more = document.getElementById("hamburger-2");
more.addEventListener("click", () => { /*onclick*/
    document.querySelector("nav:not(#col)").classList.toggle('is-active');
    more.classList.toggle('is-active');
})

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
let btn = document.querySelectorAll('.scroll_move');
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

/*자동 루프 배너*/
// moveType (0:left / 1:right)
let moveType = 0;
// 이동시간간격 3초
let moveSpeed = 3000;
// 움직이는 작업중 다시 명령 받지 않음
let moveWork = false;
// 일시정지 flag
let movePause = false;

function imgMove() {
    if (moveWork == false) {
        // 0d\일경우 left방향
        if (moveType == 0) {
            // 맨처음 이미지의 폭
            let aWidth = $(".slide_item:first").width();
            // 롤링마지막에 맨처음의 a태그 추가
            $(".slide_wrap").append($(".slide_item:first").clone(true));
            // 맨처음이미지를 왼쪽으로 이동시킨다.
            $(".slide_item:first").animate({marginLeft: -aWidth}, {
                duration: moveSpeed, step: function () {
                    // 이동중 만약 일시정지 flag가 true라면
                    if (movePause == true) {
                        // 이동을 멈춘다
                        $(this).stop();
                    }
                }, complete: function () {
                    // 이동을 마친후 첫번째 a태그를 지워버린다
                    $(this).remove();
                    // 이미지 움직이는것을 다시 실행
                    imgMove();
                }
            });
        } else {
            // 마지막 a태그의 폭
            let aWidth = $(".slide_item:last").width();
            // a태그 앞에 마지막의 a태그를 생성한다 단 스타일은 마지막 a태그의 폭만큼 빼준다
            $($("<li class=\"slide_item\" style=margin-left:-" + aWidth + "px><a>" + $(".slide_item img:last").clone(true).prop('outerHTML') + "</a></li>")).insertBefore(".slide_item:first");
            // 맨처음 a태그의 margin-left를 다시 0으로 맞춰준다.
            $(".slide_item:first").animate({marginLeft: 0}, {
                duration: moveSpeed, step: function () {
                    // 이동중 만약 일시정지 flag가 true라면
                    if (movePause == true) {
                        // 이동을 멈춘다
                        $(this).stop();
                    }
                }, complete: function () {
                    // 이동을 마친후 마지막 a태그를 지워버린다
                    $(".slide_item:last").remove();
                    // 이미지 움직이는것을 다시 실행
                    imgMove();
                }
            });
        }
    }
}

function goMove() {
    // 일시정지가 풀려있을 경우를 대비하여 일시정지를 풀러준다
    movePause = false;
    // 0d\일경우 left방향
    if (moveType == 0) {
        imgMove();
    } else {
        $(".slide_item:first").animate({marginLeft: 0}, {
            duration: moveSpeed, step: function () {
                // 이동중 만약 일시정지 flag가 true라면
                if (movePause == true) {
                    // 이동을 멈춘다
                    $(this).stop();
                }
            }, complete: function () {
                // 이동을 마친후 마지막 a태그를 지워버린다
                //$(".RollDiv > div > a:last").remove();
                // 이미지 움직이는것을 다시 실행
                imgMove();
            }
        });
    }

}

imgMove();