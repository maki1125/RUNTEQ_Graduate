let colnum //指定した絵柄のコレクション一覧　ex[1,4,7]
let colimgass //指定した絵柄のコレクションのアセット変換したimgパスの一覧
var colcount=0; //一覧表示時に使用するカウント。colimgassの要素指定に使用。
const COLUMN_LENGTH = 4; //表示マスの行数
const ROW_LENGTH = 5; //表示マスの列数
const squareWidth = 100 / ROW_LENGTH; // カラム数に基づいたマスの幅
let col_card = document.getElementById('col_card'); //htmlに設定
let pic = pic_mode //選択されている絵柄
var all_img //選択された絵柄の全ての画像

// 一覧作成
for(let i = 1; i <= COLUMN_LENGTH * ROW_LENGTH; i++){// 画像をマス上に表示
  //要素作成
  let divSquare = document.createElement('div');//セルのdiv要素作成。
  let div = document.createElement('div');//セル内に画像を配置するためのdiv要素作成。
  let img = document.createElement('img');//img要素の作成。
  col_card.appendChild(divSquare);
  divSquare.appendChild(div);
  div.appendChild(img);//div要素の中にimg要素を追加。
  divSquare.classList.add('square'); //作成したセルにsquareクラスを追加。
  img.setAttribute('id', `${i}`);
  //bingoリストにあるかどうか確認＋画像の表示
  pictureData(pic_mode)//選択されている絵柄のデータを取得
  if (colnum.includes(i.toString())){
    img.src = colimgass[colcount]; // 画像のパスを設定.htmlで変数作成。imagePathsでは画像表示できなくて、asset_pathに変換したものがcolimgass.ビンゴした画像のデータだけ。
    colcount += 1;  
    img.classList.add("ok"); //これによって絵の動きを変える。
  }else{
    img.src = question_imgass; //はてなマーク
    img.classList.remove("ok");
  }
  addClickEvent(img,i) //ますをクリックした時の動きを追加
}
//ビンゴカードの並びの設定
$('.square').css('flex', `0 0 ${squareWidth}%`);

// 画像に動きをつける関数
function addClickEvent(img,index) {
img.addEventListener('click', function(event) {
    if (img.classList.contains("ok")) {
        handleImageClick(index); //詳細ページにとぶ
    } else {
      //左右に振るわせる。
      let div = img.parentNode; // img要素の親ノードを取得
      $(div).animate({left: '+=20'},100);
      $(div).animate({left: '-=40'},100);
      $(div).animate({left: '+=40'},100);
      $(div).animate({left: '-=40'},100);
      $(div).animate({left: '+=20'},100);
    }
  });
}

//詳細ページ表示
function handleImageClick(imageId) {
  // クリックされた画像のIDを使用して詳細ページのURLを構築
  const detailPageUrl = `/collections/${imageId+(parseInt(page)-1)*20}?pic=${pic}`;
  // 詳細ページへリダイレクト
  window.location.href = detailPageUrl;
}

//下ボタンの要素の取得（ページの選択）
let page = 1;
let page_add = 0;
let page_btn = document.getElementById('pg1');//下のページ選択ボタンの初期選択の色変更
page_btn.classList.add('selected');
const buttons = document.querySelectorAll('.btn2');// ボタン要素を取得する
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // すべてのボタンの色を元に戻す
    buttons.forEach(btn => {
      btn.classList.remove('selected');
    });
    // クリックされたボタンの色を変更する
    button.classList.add('selected');
    // クリックされたボタンのテキストを変数に代入する
    page = button.textContent; //ページの取得
    page_add = (parseInt(page)-1)*20 //ページ→IDへ変換
    changeImage() //画像を変更する
  });
});

//上ボタンの要素（絵柄の選択）
const pic_buttons = document.querySelectorAll('.btn1');//ボタンの要素取得
pic_buttons.forEach(button => {
  button.addEventListener('click', () => {
    //上ボタンの色の操作
    pic_buttons.forEach(btn => {// すべてのボタンの色を元に戻す
      btn.classList.remove('selected');
    });
    button.classList.add('selected');// クリックされたボタンの色を変更する
    //下ボタンの色の操作
    let page_buttons = document.querySelectorAll('.btn2');
    page_buttons.forEach(btn => {// すべてのボタンの色を元に戻す
      btn.classList.remove('selected');
    });
    page_btn = document.getElementById('pg1');//下のページ選択ボタンの初期選択の色変更
    page_btn.classList.add('selected');
    // クリックされたボタンのテキストを変数に代入する
    page = 1; //ページの取得
    page_add = (parseInt(page)-1)*20 //ページ→IDへ変換
    pic = button.textContent;// クリックされたボタンのテキストを変数に代入する
    pictureData(pic)//選択した絵柄のデータ取得
    changeImage() //一覧の絵柄変更
  });
});

//指定のpictureデータの取得
function pictureData(pic) {  
  let pic_btn;
  switch (pic) {
    case "どうぶつ":
      all_img = allanimal_img;
      colnum = colanimal_img.map(path => path.match(/\d+/)[0]); // パスから数字を抽出して配列に入れる。最初は動物のデータを入れる。
      colimgass = colanimal_imgass;
      pic_btn = document.getElementById('animal');//上の絵柄選択ボタンの初期選択の色変更
      pic_btn.classList.add('selected');
      break;
    case "さかな":
      all_img = allfish_img;
      colnum = colfish_img.map(path => path.match(/\d+/)[0]); // パスから数字を抽出して配列に入れる。
      colimgass = colfish_imgass;
      pic_btn = document.getElementById('fish');
      pic_btn.classList.add('selected');
      break;
    case "きょうりゅう":
      all_img = alldinosaur_img;
      colnum = coldinosaur_img.map(path => path.match(/\d+/)[0]); // パスから数字を抽出して配列に入れる。
      colimgass = coldinosaur_imgass;
      pic_btn = document.getElementById('dinosaur');
      pic_btn.classList.add('selected');
      break;
    default:
      // 何もしない
  }
}

//マス一覧画像の変更
function changeImage(){
  for(let i = 1; i <= COLUMN_LENGTH * ROW_LENGTH; i++){
    let imgElement = document.getElementById(i);
    //bingoリストにあるかどうか確認
    if (colnum.includes((page_add+i).toString())){
      imgElement.src = all_img[page_add+i-1]; // 画像のパスを設定.htmlで変数作成。何故か-1しないと次のやつになる。
      imgElement.classList.add("ok");
    }else{
      //imgElement.src = colimgass[colimgass.length -1]; //はてなマーク
      imgElement.src = question_imgass;
      imgElement.classList.remove("ok");
    }
  }
}




