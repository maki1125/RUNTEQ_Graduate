//参考url https://nyanblog2222.com/programming/javascript/1194/#toc4

$(function () {

  // 1~75まで、bingoの数字一覧を作成
  var max = 75;
  var bingo = [];
  for (var i = 1; i <= max; i++) {
      bingo.push(i);
  }
  var images = [];
  for (var i = 1; i <= 26; i++) {
      images.push(`img/animal/${i}.png`);
  }

  var timer;
  var random;
  // START・STOPボタンクリックのイベント
  $("#button").on("click", function () {
      // START
      if ($(this).text() == "START") {
          // ボタンのテキストを"STOP"に変更
          $(this).text("STOP").css("background-color", "red");;

          // ルーレットタイマーを設定
          timer = setInterval(function () {
              random = Math.floor(Math.random() * images.length);
              $("#result").attr("src",images[random]);
          }, 50);
      // STOP
      } else {
          // ボタンのテキストを"START"に変更
          $(this).text("START").css("background-color", "green");;

          // ルーレットタイマーを停止
          clearInterval(timer);

          // 停止時の数字を結果に反映
          var result = images[random];
          // 一覧から削除（次のルーレットに表示させないため）
          //images.splice(random, 1);

          // 数字一覧に追加
          //$("#number").append($("<img>").attr("src", result));
          //$("#number img").addClass("centering");
      }
  });
});