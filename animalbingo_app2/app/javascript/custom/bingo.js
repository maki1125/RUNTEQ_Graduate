
// console.log(imagePaths);
// console.log(imagePathsArray);
// console.log(images[0].img);
// 先頭から行*列個の動物を使ってビンゴカードを作成する
const COLUMN_LENGTH = 3;
const ROW_LENGTH = 3;
const squareWidth = 100 / 3; // カラム数に基づいたマスの幅
let squareIdCounter = 1; // マスのID用のカウンターを初期化
let outer = document.getElementById('outer');
// 先頭から行*列個の動物を使ってビンゴカードを作成する
for(let i = 0; i < COLUMN_LENGTH * ROW_LENGTH; i++){
    // 画像をマス上に表示
    let divSquare = document.createElement('div');//セルのdiv要素作成。
    divSquare.classList.add('square'); //作成したセルにsquareクラスを追加。
    let div = document.createElement('div');//セル内に画像を配置するためのdiv要素作成。
    let img = document.createElement('img');//img要素の作成。
    img.src = imagePathsArray[i]; // 画像のパスを設定.htmlで変数作成。
    div.appendChild(img);//div要素の中にimg要素を追加。
    divSquare.appendChild(div)
    outer.appendChild(divSquare);

    // マスごとに連番のIDを設定
    divSquare.setAttribute('id', `square-${squareIdCounter}`);
    squareIdCounter++; // カウンターをインクリメント

    // .square 要素に対して直接クリックイベントを設定
    divSquare.addEventListener('click', function(event) {
        const squareId = event.currentTarget.id; // クリックされた要素のIDを取得
        console.log('Clicked square ID:', squareId);
    });
}

$('.square').css('flex', `0 0 ${squareWidth}%`);

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('square')) {
        const squareId = event.target.id;
        console.log('Clicked square ID:', squareId);
    }
    else{
        console.log('nai')
    }
});
//ビンゴカードの上のメッセージ
// テキストを表示する要素を取得
const headingElement = document.querySelector('.bingo-heading h2');
// 変数に入れたテキスト
let headingText = "ビンゴカード！！";
let mes = 2;
switch(mes){
    case 1: headingText = "いないね、、、"
        break;
    case 2: headingText = "どこかな？";
        break;
    default:
        break;
};
// テキストを変更
headingElement.textContent = headingText;