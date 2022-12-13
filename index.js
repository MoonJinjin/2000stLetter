var bg_ul_div = document.getElementById("bg_ul_div");
var st_ul_div = document.getElementById("st_ul_div");
var main_canvas = document.getElementById("main_canvas");
var controll_btn_list = document.getElementById("controll_btn_list");

// text 편집 버튼
var btn_set_text = document.getElementById("btn_set_text");
var btn_align_left = document.getElementById("btn_align_left");
var btn_align_justify = document.getElementById("btn_align_justify");
var btn_align_right = document.getElementById("btn_align_right");

// drag 변수
var img_L = 150;
var img_T = 0;
var targetObj;

document.addEventListener("DOMContentLoaded", function () {
  makeBgImgArray();
  setBgImg();

  makeStickerImgArray();
  setStickerImg();
});

// background image 배열 만들기
var bg_img_arr = [];
function makeBgImgArray() {
  for (var i = 1; i <= 14; i++) { // 나중에 로컬 폴더를 읽어서 폴더 내용 수만큼 반복하도록 변경
    bg_img_arr.push(`./img/background/background${i}.png`);
  }
}

// sticker image 배열 만들기
var st_img_arr = [];
function makeStickerImgArray() {
  for (var i = 2; i <= 8; i++) { // 나중에 로컬 폴더를 읽어서 폴더 내용 수만큼 반복하도록 변경
    st_img_arr.push(`./img/sticker/sticker${i}.png`);
  }
}

// background image 배열 아이템으로 ul에 li 추가
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

// sticker image 배열 아이템으로 ul에 li 추가
function setStickerImg() {
  var elem_st_ul = document.createElement('ul');
  elem_st_ul.setAttribute("id", "st_ul");
  elem_st_ul.style.padding = 0;

  for (var i = 0; i < st_img_arr.length; i++) {
    var st_li = document.createElement('li');
    st_li.style.listStyle = "none";
    st_li.classList.add("st_li");

    var st_img = document.createElement('img');
    st_img.src = st_img_arr[i];
    st_img.width = 100;
    st_img.height = 100;
    st_img.addEventListener("click", function(e) {
      main_canvas.innerHTML += '<img src="' + e.target.src + '" style="width:100px; height:100px; position:absolute; left:150px; top:40px;" onmousedown="startDrag(event, this)">'
    });
    st_li.appendChild(st_img);
    elem_st_ul.appendChild(st_li);
  }
  st_ul_div.appendChild(elem_st_ul);
}

// background image ul 위로 넘기기
var bg_prev_btn = document.getElementById("bg_prev_btn");
bg_prev_btn.addEventListener("click", function () {
  var bg_li = document.getElementsByClassName("bg_li");
  bg_ul.insertBefore(bg_li[bg_li.length-1], bg_li[0]);
})

// background image ul 아래로 넘기기
var bg_next_btn = document.getElementById("bg_next_btn");
bg_next_btn.addEventListener("click", function () {
  var bg_li = document.getElementsByClassName("bg_li");
  bg_ul.insertBefore(bg_li[0], null);
})

// sticker image ul 위로 넘기기
var st_prev_btn = document.getElementById("st_prev_btn");
st_prev_btn.addEventListener("click", function () {
  var st_li = document.getElementsByClassName("st_li");
  st_ul.insertBefore(st_li[st_li.length-1], st_li[0]);
})

// sticker image ul 아래로 넘기기
var st_next_btn = document.getElementById("st_next_btn");
st_next_btn.addEventListener("click", function () {
  var st_li = document.getElementsByClassName("st_li");
  st_ul.insertBefore(st_li[0], null);
})

// textarea 요소 추가 <--
btn_set_text.addEventListener("click", function () {
  main_canvas.innerHTML = '<textarea draggable="true" rows="1" ondragstart="startDrag(event, this)" onkeydown="resize(this)" onkeyup="resize(this)" style="position:absolute; left:150px; top:40px;"></textarea>'
})

function getLeft(o){
  return parseInt(o.style.left.replace('px', ''));
}
function getTop(o){
  return parseInt(o.style.top.replace('px', ''));
}

// textarea 사이즈 변경
function resize(obj) {
  obj.style.height = "auto";
  obj.style.height = (12 + obj.scrollHeight) + 'px';
}

// 요소 움직이기
function moveDrag(e){
  var e_obj = window.event? window.event : e;
  var dmvx = parseInt(e_obj.clientX) + img_L;
  var dmvy = parseInt(e_obj.clientY) + img_T;
  targetObj.style.left = `${dmvx}px`;
  targetObj.style.top = `${dmvy}px`;

  return false;
}

// 드래그 시작
function startDrag(e, obj){
  targetObj = obj;
  var e_obj = window.event? window.event : e;
  img_L = getLeft(obj) - e_obj.clientX;
  img_T = getTop(obj) - e_obj.clientY;

  document.onmousemove = moveDrag;
  document.onmouseup = stopDrag;
  if(e_obj.preventDefault) e_obj.preventDefault();
}

// 드래그 멈추기
function stopDrag(){
  document.onmousemove = null;
  document.onmouseup = null;
}

// 텍스트 왼쪽 정렬
btn_align_left.addEventListener("click", function() {
  document.getElementsByTagName("textarea")[0].style.textAlign = "left";
})

// 텍스트 가운데 정렬
btn_align_justify.addEventListener("click", function() {
  document.getElementsByTagName("textarea")[0].style.textAlign = "center";
})

// 텍스트 오른쪽 정렬
btn_align_right.addEventListener("click", function() {
  document.getElementsByTagName("textarea")[0].style.textAlign = "right";
})