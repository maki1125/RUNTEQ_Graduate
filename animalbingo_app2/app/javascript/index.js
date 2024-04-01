console.log("collection/index")

//javascriptがちゃんと読み込まれるようにするため、"turbo:load"を追加。
document.addEventListener("turbo:load", function() {
  // ここにJavaScriptの処理を記述
  console.log(imagePaths);
  console.log(imagePaths[imagePaths.length -1]);
  console.log(imagePaths[2].match(/\d+/)[0]); //数字を抽出する。
  const allimg = imagePaths.map(path => path.match(/\d+/)[0]);//パスから数字を抽出して配列に入れる。
  console.log(allimg);
  var imgcount=0;
  console.log(allimg.includes(1));

  const COLUMN_LENGTH = 4;
  const ROW_LENGTH = 5;
  const squareWidth = 100 / 5; // カラム数に基づいたマスの幅
  console.log(squareWidth);
  let squareIdCounter = 0; // マスのID用のカウンターを初期化
  let outer = document.getElementById('outer'); //htmlに設定
  var name_card; //クリックしたビンゴますのID ID番号-動物の名前
  var index; //クリックしたビンゴマスのID番号
  var bingoAchieved = false; //ビンゴ成立か判定のフラグ
  let bingoImages = [];// ビンゴした画像を格納する配列を定義
  var del=1; //ルーレット用動物一覧の削除した履歴。0はまだ削除していないの意味。
  var num=9; //カードの中のまだクリックしていないマス数。

  // 一覧作成
  for(let i = 1; i <= COLUMN_LENGTH * ROW_LENGTH; i++){// 画像をマス上に表示
      let divSquare = document.createElement('div');//セルのdiv要素作成。
      divSquare.classList.add('square'); //作成したセルにsquareクラスを追加。
      let div = document.createElement('div');//セル内に画像を配置するためのdiv要素作成。
      let img = document.createElement('img');//img要素の作成。
      if (allimg.includes(i.toString())){
      img.src = imagePathsArray[imgcount]; // 画像のパスを設定.htmlで変数作成。
      imgcount += 1;  
       // クリックイベントを追加
    divSquare.addEventListener('click', function() {
      // クリックされたときに実行される関数を呼び出す
      handleImageClick(i);
  });
    }else{
      img.src = imagePathsArray[imagePaths.length -1];
      divSquare.addEventListener('click', function() {
        // クリックされたときに実行される関数を呼び出す
        console.log("クリックされました")
        $(div).animate({left: '+=20'},100);//左右に振るわせる。
        $(div).animate({left: '-=40'},100);
        $(div).animate({left: '+=40'},100);
        $(div).animate({left: '-=40'},100);
        $(div).animate({left: '+=20'},100);
    });
    }
      div.appendChild(img);//div要素の中にimg要素を追加。
      divSquare.appendChild(div)
      outer.appendChild(divSquare);
      divSquare.setAttribute('id', `${i}`);
      //console.log(names[i])
      squareIdCounter++; // カウンターをインクリメント  

    }
  //ビンゴカードの並びの設定
  $('.square').css('flex', `0 0 ${squareWidth}%`);

//詳細ページ表示
  function handleImageClick(imageId) {
    // クリックされた画像のIDを使用して詳細ページのURLを構築
    const detailPageUrl = `/collections/${imageId}`;
    // 詳細ページへリダイレクト
    window.location.href = detailPageUrl;
}
  //ビンゴカードの上のメッセージ
  const headingElement = document.querySelector('.bingo-heading h2');// テキストを表示する要素を取得
  headingElement.textContent = "STARTボタンを押してね";// テキストを変更

  });

