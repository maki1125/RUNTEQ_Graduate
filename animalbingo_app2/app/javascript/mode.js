//console.log(play_mode,pic_mode+2,level_mode+5)
if (play_mode==""){
  play_mode=1
  pic_mode=1
  level_mode=1
}
//console.log(play_mode,pic_mode+2,level_mode+5)

document.addEventListener("DOMContentLoaded", function() {
  //play_modeの処理
  //現在選択中のものを表示する
  const nowplay = document.getElementById(`radio${play_mode}`); //現在のモード取得　
  const nowplaylabel = document.querySelector(`label[for='radio${play_mode}']`); //現在のモード取得　
  nowplay.checked = true;
  nowplaylabel.classList.add("selected");
  //クリックしたときにselectedにする
  const plays = document.querySelectorAll(".play-mode");
  console.log(plays)
  plays.forEach(function(one) {
    one.addEventListener("click", function() {
      // 選択されたボタンを強調表示
      plays.forEach(function(rb) {
        rb.classList.remove("selected");
      });
      one.classList.add("selected");
    });
  });

  //絵柄の選択の処理
  //現在選択中のものを表示する
  const nowpic = document.getElementById(`radio${parseInt(pic_mode)+2}`); //現在のモード取得　
  const nowpiclabel = document.querySelector(`label[for='radio${parseInt(pic_mode)+2}']`); //現在のモード取得　
  nowpic.checked = true;
  nowpiclabel.classList.add("selected");
  //クリックしたときにselectedにする
  const pics = document.querySelectorAll(".picture-mode");
  pics.forEach(function(one) {
    one.addEventListener("click", function() {
      // 選択されたボタンを強調表示
      pics.forEach(function(rb) {
        rb.classList.remove("selected");
      });
      one.classList.add("selected");
    });
  });

  //レベルの選択の処理
  //現在選択中のものを表示する
  const nowlevel = document.getElementById(`radio${parseInt(level_mode)+5}`); //現在のモード取得　
  const nowlevellabel = document.querySelector(`label[for='radio${parseInt(level_mode)+5}']`); //現在のモード取得　
  nowlevel.checked = true;
  nowlevellabel.classList.add("selected");
  //クリックしたときにselectedにする
  const levels = document.querySelectorAll(".level-mode");
  levels.forEach(function(one) {
    one.addEventListener("click", function() {
      // 選択されたボタンを強調表示
      levels.forEach(function(rb) {
        rb.classList.remove("selected");
      });
      one.classList.add("selected");
    });
  });

  
});
