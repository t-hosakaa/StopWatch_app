'use strict';

// idから各要素を取得し変数に代入
let timer = document.getElementById('timer');
let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

// クリック時の時間を保持するための変数定義
let startTime;

// 経過時刻を更新するための変数。初めは0から
let elapsedTime = 0;

// タイマーを止めるために使うタイマーのid
let timerId;

// タイマーストップ後、再開した時に0になってしまうのを避けるための変数
let timeToadd = 0;



const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');

const okBtn = document.getElementById('okbtn');
const tryBtn = document.getElementById('trybtn');




okBtn.addEventListener('click', function(){
  modal1.classList.remove('block');
  modal1.classList.add('none');
  // timer.textContent = '00:00:00';
});

tryBtn.addEventListener('click', function(){
  modal2.classList.remove('block');
  modal2.classList.add('none');
  // timer.textContent = '00:00:00';
});


function updateTimeText(){

  let m = Math.floor(elapsedTime / 60000);

  let s = Math.floor(elapsedTime % 60000 / 1000);

  let ms = elapsedTime % 1000;

  m = ('0' + m).slice(-2); 
  s = ('0' + s).slice(-2);
  ms = ('0' + ms).slice(-2);

  timer.textContent = `${m}:${s}:${ms}`;

}

function countUp(){
  timerId = setTimeout(function(){
    elapsedTime = Date.now() - startTime + timeToadd;
    updateTimeText();

    countUp();
  }, 10);
}

start.addEventListener('click', function(){
  startTime = Date.now();
  
  countUp();
});

stop.addEventListener('click', function(){
  clearTimeout(timerId);

  timeToadd += Date.now() - startTime;
  // 選択された目標タイムを変数に代入
  let targetTime = document.getElementById('scoreform').select.value;

  if(targetTime !== timer.textContent){
    modal2.classList.remove('none');
    modal2.classList.add('block');
    document.getElementById('yourscore2').textContent = timer.textContent;
  }else{
    modal1.classList.remove('none');
    modal1.classList.add('block');
    document.getElementById('yourscore1').textContent = timer.textContent;
  }
});

reset.addEventListener('click', function(){
  elapsedTime = 0;

  timeToadd = 0;

  updateTimeText();
});

document.getElementById('modeselect').select.onchange = function(){
  let value = document.getElementById('modeselect').select.value
  if(value === "secret"){
    document.getElementById('timer').style.color = "white";
  }else{
    document.getElementById('timer').style.color = "black";
  }
}