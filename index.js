var bg_ul_div = document.getElementById("bg_ul_div");
var main_canvas = document.getElementById("main_canvas");

var bg_prev = 1;
document.addEventListener("DOMContentLoaded", function () {
  makeBgImgArray();
  setBgImg();
});

var bg_img_arr = [];
function makeBgImgArray() {
  for (var i = 1; i < 15; i++) { // 나중에 로컬 폴더를 읽어서 폴더 내용 수만큼 반복하도록 변경
    bg_img_arr.push(`./img/background/background${i}.png`);
  }
}

function setBgImg() {
  var elem_bg_ul = document.createElement('ul');
  elem_bg_ul.setAttribute("id", "bg_ul");
  elem_bg_ul.style.padding = 0;

  for (var i = 0; i < bg_img_arr.length; i++) {
    var bg_li = document.createElement('li');
    bg_li.style.listStyle = "none";
    bg_li.classList.add("bg_li");

    var bg_img = document.createElement('img');
    bg_img.src = bg_img_arr[i];
    bg_img.width = 100;
    bg_img.height = 100;
    bg_img.addEventListener("click", function(e) {
      main_canvas.style.backgroundImage = `url('${e.target.src}')`;
    });
    bg_li.appendChild(bg_img);
    elem_bg_ul.appendChild(bg_li);
  }
  bg_ul_div.appendChild(elem_bg_ul);
}

var bg_prev_btn = document.getElementById("bg_prev_btn");
bg_prev_btn.addEventListener("click", function () {
  var bg_li = document.getElementsByClassName("bg_li");
  bg_ul.insertBefore(bg_li[bg_li.length-1], bg_li[0]);
})

var bg_next_btn = document.getElementById("bg_next_btn");
bg_next_btn.addEventListener("click", function () {
  var bg_li = document.getElementsByClassName("bg_li");
  bg_ul.insertBefore(bg_li[0], null);
})