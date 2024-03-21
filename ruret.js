$ = function(x) {
    return document.getElementById(x);
  }
  
  // ビンゴ用数字配列
  var numList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75];
  
  var isStop = true;
  
  function startBingo() {
    // ボタンの表示切り替え
    $("start").style.display = "none";
    $("stop").style.display = "inline";
    isStop = false;
    roulette();
  }
  
  function stopBingo() {
    // ボタンの表示切り替え
    $("start").style.display = "inline";
    $("stop").style.display = "none";
    isStop = true;
  }
  
  function roulette() {
    var id = "";
    var rnd = Math.floor(Math.random() * numList.length);
    
    // ストップボタンが押された
    if (isStop) {
      // 遅延呼び出しを解除
      clearTimeout(id);
      
      $("view").innerText = numList[rnd];
      if (!$("out").innerText) {
        $("out").innerText = $("out").innerText + numList[rnd];
      }
      else {
        $("out").innerText = $("out").innerText + "　" + numList[rnd];
      }
      
      //決定した数字をリストから削除する
      numList.splice(rnd, 1);
      // リストが空になったら終了
      if (numList.length == 0) {
        alert("最後です。");
        $("start").disabled = true;
      }
      return false;
    }
    
    // 乱数を画面に表示
    $("view").innerText = numList[rnd];
    // 100ms後に再帰的に実行するよう登録する
    id = setTimeout("roulette()", 100);
}