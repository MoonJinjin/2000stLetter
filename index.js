var bg_ul_div = document.getElementById("bg_ul_div");
var st_ul_div = document.getElementById("st_ul_div");
var st_upload = document.getElementById("st_upload");
var main_canvas = document.getElementById("main_canvas");
var controll_btn_list = document.getElementById("controll_btn_list");
var font_size_select = document.getElementById("font_size_select");
var font_color_input = document.getElementById("font_color_input");

// text 편집 버튼
var btn_add_text = document.getElementById("btn_add_text");
var btn_align_left = document.getElementById("btn_align_left");
var btn_align_justify = document.getElementById("btn_align_justify");
var btn_align_right = document.getElementById("btn_align_right");
var btn_downlod = document.getElementById("btn_download");

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
  for (var i = 1; i <= 16; i++) { // 나중에 로컬 폴더를 읽어서 폴더 내용 수만큼 반복하도록 변경
    bg_img_arr.push(`./img/background/background${i}.png`);
  }
}

// sticker image 배열 만들기
var st_img_arr = [];
function makeStickerImgArray() {
  for (var i = 1; i <= 16; i++) { // 나중에 로컬 폴더를 읽어서 폴더 내용 수만큼 반복하도록 변경
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
    bg_img.style.cursor = "pointer";
    bg_img.addEventListener("click", function (e) {
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
    st_img.style.cursor = "pointer";
    st_img.addEventListener("click", (e) => addSticker(e, "li"));
    st_li.appendChild(st_img);
    elem_st_ul.appendChild(st_li);
  }
  st_ul_div.appendChild(elem_st_ul);
}

// sticker 파일 업로드
st_upload.addEventListener("change", function(e) {
  addSticker(e, "files");
});

// 화면에 sticker 추가
function addSticker(e, flag) {
  var src = "";
  if(flag == "li") {
    src = e.target.src;
  } else {
    src = URL.createObjectURL(e.target.files[0]);
  }
  main_canvas.innerHTML += '<div class="sticker_div focus_st" style="width:50px; height:50px; position:absolute; left:180px; top:80px;" onmousedown="changeFocusSticker(event); startDrag(event, this)" ontouchstart="changeFocusSticker(event); startDrag(event, this)">'
    + '<img src="' + src + '" style="min-width:50px; min-height:50px; width:inherit; height:inherit; pointer-events:none;">'
    + '<button class="btn_sticker_rm" onmousedown="removeSticker(event)" ontouchstart="removeSticker(event)"><i class="fa-solid fa-x" style="pointer-events:none;"></i></button>'
    + '<button class="btn_sticker_mv" onmousedown="resizeSticker(event)" ontouchstart="resizeSticker(event)"><img src="img/resize_icon.png"></button>'
    + '</div>';
};

// sticker 삭제
function removeSticker(e) {
  var target = e.target.parentElement;
  target.remove();
}

// sticker 크기 변경
function resizeSticker(e) {
  const element = document.querySelector(".sticker_div.focus_st");
  let original_width = 0;
  let original_height = 0;
  let original_mouse_x = 0;
  let original_mouse_y = 0;

  e.preventDefault()
  original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''));
  original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''));
  original_mouse_x = e.pageX ? e.pageX : e.changedTouches[0].pageX;
  original_mouse_y = e.pageY ? e.pageY : e.changedTouches[0].pageY;
  window.addEventListener('mousemove', resize)
  window.addEventListener('mouseup', stopResize)
  window.addEventListener('touchmove', resize) // mobile
  window.addEventListener('touchend', stopResize)

  function resize(e) {
    const width = original_width + ((e.pageX ? e.pageX : e.changedTouches[0].pageX) - original_mouse_x);
    const height = original_height + ((e.pageY ? e.pageY : e.changedTouches[0].pageY) - original_mouse_y)
    if (width > 50) {
      element.style.width = width + 'px'
    }
    if (height > 50) {
      element.style.height = height + 'px'
    }
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize)
    window.removeEventListener('touchmove', resize)
  }
}

// background image ul 위로 넘기기
var bg_prev_btn = document.getElementById("bg_prev_btn");
bg_prev_btn.addEventListener("click", function () {
  var bg_li = document.getElementsByClassName("bg_li");
  bg_ul.insertBefore(bg_li[bg_li.length - 1], bg_li[0]);
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
  st_ul.insertBefore(st_li[st_li.length - 1], st_li[0]);
})

// sticker image ul 아래로 넘기기
var st_next_btn = document.getElementById("st_next_btn");
st_next_btn.addEventListener("click", function () {
  var st_li = document.getElementsByClassName("st_li");
  st_ul.insertBefore(st_li[0], null);
})

// textarea 요소 추가
btn_add_text.addEventListener("click", function () {
  var font_family = document.body.style.fontFamily;
  var font_size = document.getElementById("font_size_select").value;
  var hex = font_color_input.value;
  var red = parseInt(hex[1] + hex[2], 16);
  var green = parseInt(hex[3] + hex[4], 16);
  var blue = parseInt(hex[5] + hex[6], 16);
  var font_color = red + ',' + green + ',' + blue;
  main_canvas.innerHTML += '<div class="textarea_div focus_text" style="position:absolute; left:180px; top:80px;" onmousedown="changeFocusTextarea(event); startDrag(event, this)" ontouchstart="changeFocusTextarea(event); startDrag(event, this)">' +
    '<textarea draggable="true" autofocus="true" placeholder="Text" rows="1" onfocus="changeFocusTextarea(event)" oninput="changeTextarea(event, this)" onkeydown="resizeTextArea(this)" onkeyup="resizeTextArea(this)" style="font-family:'
    + font_family + '; font-size:' + font_size + '; color:rgb(' + font_color + ');"></textarea>'
    + '<button class="btn_textarea_rm" onmousedown="removeSticker(event)" ontouchstart="removeSticker(event)"><i class="fa-solid fa-x" style="pointer-events:none;"></i></button>'
    + '</div>';
})

// textarea 값 변경
function changeTextarea(e, obj) {
  obj.innerHTML = e.target.value;
}

// focus된 textarea 변경
function changeFocusTextarea(e) {
  var focus_text = document.getElementsByClassName("focus_text");
  for (var f = 0; f < focus_text.length; f++) {
    focus_text[f].classList.remove("focus_text");
  }
  var focus_st = document.getElementsByClassName("focus_st");
  for (var f = 0; f < focus_st.length; f++) {
    focus_st[f].classList.remove("focus_st");
  }
  e.target.parentElement.classList.add("focus_text");
}

// focus된 sticker 변경
function changeFocusSticker(e) {
  var focus_st = document.getElementsByClassName("focus_st");
  for (var f = 0; f < focus_st.length; f++) {
    focus_st[f].classList.remove("focus_st");
  }
  var focus_text = document.getElementsByClassName("focus_text");
  for (var f = 0; f < focus_text.length; f++) {
    focus_text[f].classList.remove("focus_text");
  }
  e.target.classList.add("focus_st");
}

// 화면 밖을 클릭하면 sticker, textarea focus 삭제
document.body.addEventListener("mousedown", function (e) {
  if (!e.target.classList.contains("focus_st")) {
    var focus_st = document.getElementsByClassName("focus_st");
    for (var f = 0; f < focus_st.length; f++) {
      focus_st[f].classList.remove("focus_st");
    }
  }

  if (!e.target.parentElement.classList.contains("focus_text") && e.target.id !== "font_color_input" && !e.target.classList.contains("btn_align")) {
    var focus_text = document.getElementsByClassName("focus_text");
    for (var f = 0; f < focus_text.length; f++) {
      focus_text[f].classList.remove("focus_text");
    }
  }
})

function getLeft(o) {
  return parseInt(o.style.left.replace('px', ''));
}
function getTop(o) {
  return parseInt(o.style.top.replace('px', ''));
}

// textarea 사이즈 변경
function resizeTextArea(obj) {
  obj.style.height = "auto";
  obj.style.height = (obj.scrollHeight) + 'px';
}

// 요소 움직이기
function moveDrag(e) {
  var e_obj = window.event ? window.event : e;
  var dmvx = parseInt(e_obj.clientX ? e_obj.clientX : e_obj.changedTouches[0].clientX) + img_L;
  var dmvy = parseInt(e_obj.clientY ? e_obj.clientY : e_obj.changedTouches[0].clientY) + img_T;
  targetObj.style.left = `${dmvx}px`;
  targetObj.style.top = `${dmvy}px`;

  return false;
}

// 드래그 시작
function startDrag(e, obj) {
  targetObj = obj;
  var e_obj = window.event ? window.event : e;
  img_L = getLeft(obj) - (e_obj.clientX ? e_obj.clientX : e_obj.changedTouches[0].clientX);
  img_T = getTop(obj) - (e_obj.clientY ? e_obj.clientY : e_obj.changedTouches[0].clientY);

  if (!e.target.classList.contains("btn_sticker_mv")) {
    document.onmousemove = moveDrag;
    document.onmouseup = stopDrag;
    document.ontouchmove = moveDrag;
    document.ontouchend = stopDrag;
  }
  if (e_obj.preventDefault && e.cancelable) e_obj.preventDefault();
}

// 드래그 멈추기
function stopDrag() {
  document.onmousemove = null;
  document.onmouseup = null;
  document.ontouchmove = null;
  document.ontouchend = null;
}

// 폰트 변경
function changeFont(e) {
  document.body.style.fontFamily = e.value;
  e.style.fontFamily = e.value;
  font_size_select.style.fontFamily = e.value;

  var option = font_size_select.getElementsByTagName("option");
  for (var o = 0; o < option.length; o++) {
    option[o].style.fontFamily = e.value;
  }
  var textarea = document.getElementsByTagName("textarea");
  for (var t = 0; t < textarea.length; t++) {
    textarea[t].style.fontFamily = e.value;
  }
}

// 폰트 크기 변경
function changeFontSize(e) {
  var textarea = document.getElementsByTagName("textarea");
  for (var t = 0; t < textarea.length; t++) {
    textarea[t].style.fontSize = e.value;
  }
}

// 폰트 색상 변경
font_color_input.addEventListener("input", function (e) {
  if (document.getElementsByClassName("focus_text").length > 0) {
    document.getElementsByClassName("focus_text")[0].childNodes[0].style.color = e.target.value;
  }
})

// 텍스트 왼쪽 정렬
btn_align_left.addEventListener("click", function () {
  if (document.getElementsByClassName("focus_text").length > 0) {
    document.getElementsByClassName("focus_text")[0].childNodes[0].style.textAlign = "left";
  }
})

// 텍스트 가운데 정렬
btn_align_justify.addEventListener("click", function () {
  if (document.getElementsByClassName("focus_text").length > 0) {
    document.getElementsByClassName("focus_text")[0].childNodes[0].style.textAlign = "center";
  }
})

// 텍스트 오른쪽 정렬
btn_align_right.addEventListener("click", function () {
  if (document.getElementsByClassName("focus_text").length > 0) {
    document.getElementsByClassName("focus_text")[0].childNodes[0].style.textAlign = "right";
  }
})

// 이미지 다운로드 (빈 화면으로 나옴)
function downImg() {
  var test_div = document.createElement("div");
  var test = document.getElementById("main_canvas");
  test_div.innerHTML = test.outerHTML
  document.body.insertAdjacentHTML("afterbegin", test.outerHTML);
  document.body.appendChild(test_div);
  console.log(test_div.childNodes[0])

  html2canvas(test_div.childNodes[0], {
    allowTaint: true,
    foreignObjectRendering: true,
  }).then(function (canvas) {
    var el = document.createElement("a")
    el.href = canvas.toDataURL("image/png")
    el.download = 'test.png'
    el.click()
  }).catch(function (error) {
    console.log(error)
  })
}
