//参考url
//https://magazine.techacademy.jp/magazine/32634
// Fisher-Yates シャッフルアルゴリズムを使って配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
// ビンゴした画像を格納する配列を定義
let bingoImages = [];

function checkBingo() {
    bingoAchieved = false;
    squaresInColumn = [];
    squaresInColumn1 = [];
    squaresInColumn2 = [];
    squaresInColumn3 = [];
    squaresInColumn4 = [];
    // 各列についてビンゴが成立しているかチェック
    console.log('列');
    for (let col = 0; col < COLUMN_LENGTH; col++) {
        let count = 0;
        const cells = document.querySelectorAll(`.square:nth-child(n + ${col * ROW_LENGTH + 1}):nth-child(-n + ${col * ROW_LENGTH + 3})`);//行の要素を取得。2つのnth-childを使って3つの要素を取得。
        //console.log(cells)
        //const numberOfCells = cells.length;//要素の数を取得。
        //console.log(numberOfCells);
        for (let i = 0; i < cells.length; i++) {
            // 各セルに対する処理を記述する
            //console.log(cells[i]); // 例: 各セルの内容をコンソールに出力する
            if (cells[i].classList.contains('gray')) {
                count += 1;
                if (count==COLUMN_LENGTH){
                    bingoAchieved = true; // ビンゴ成立フラグを立てる
                    squaresInColumn1 = cells;
                    break;
                };
            };
        };
    };
    // 各行についてビンゴが成立しているかチェック
    console.log('行');
    for (let row = 0; row < ROW_LENGTH; row++) {
        let count = 0;
        const cells = document.querySelectorAll(`.square:nth-child(${ROW_LENGTH}n + ${row + 1})`);//行の要素を取得。
        for (let i = 0; i < cells.length; i++) {
            if (cells[i].classList.contains('gray')) {
                count += 1;
                if (count==COLUMN_LENGTH){
                    bingoAchieved = true; // ビンゴ成立フラグを立てる
                    squaresInColumn2 = cells;
                    break;
                };
            };
        };
    }; 
    //左斜めにビンゴが成立しているかチェック
    console.log('斜め');
    let count = 0;
    let cells = [];
    cells = document.querySelectorAll(`.square:nth-child(${ROW_LENGTH + 1}n + 1)`);//行の要素を取得。
    console.log(cells)
    for (let i = 0; i < 3; i++) {
        if (cells[i].classList.contains('gray')) {
            count += 1;
            if (count==COLUMN_LENGTH){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                squaresInColumn3 = Array.from(cells).slice(0,3);//右肩上がりの斜めは4つ目のcellが取得されるので、それを除くため。
                break;
            };
        };
    };

    //右斜めにビンゴが成立しているかチェック
    console.log('斜め');
    count = 0;
    cells = [];
    cells = document.querySelectorAll(`.square:nth-child(${ROW_LENGTH - 1}n + 3)`);//行の要素を取得。
    console.log(cells)
    for (let i = 0; i < 3; i++) {
        if (cells[i].classList.contains('gray')) {
            count += 1;
            if (count==COLUMN_LENGTH){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                squaresInColumn4 = Array.from(cells).slice(0,3);//右肩上がりの斜めは4つ目のcellが取得されるので、それを除くため。
                break;
            };
        };
    };

    
    squaresInColumn = Array.from(squaresInColumn1).concat(Array.from(squaresInColumn2), Array.from(squaresInColumn3), Array.from(squaresInColumn4));
    //console.log(squaresInColumn)

    // ビンゴが成立したセルの画像を配列に保存
    bingoImages = squaresInColumn.map(square => square.querySelector('img').src);
    
    // コンソールにビンゴした画像を出力
    console.log("Bingo Images:", bingoImages);

};


const COLUMN_LENGTH = 3;
const ROW_LENGTH = 3;
const squareWidth = 100 / COLUMN_LENGTH; // カラム数に基づいたマスの幅
const MAX_NUMBER = 75;

const ANIMALS = [];
for (let i = 1; i <= 26; i++) {
    ANIMALS.push(String(i));
}
shuffleArray(ANIMALS);
let targetNumber = [];
for(let i = 1; i <= MAX_NUMBER; i++){
  targetNumber.push(i);
}

let outer = document.getElementById('outer');
// アニメーションを開始するためのフラグ
let bingoAchieved = false;
let squaresInColumn = [];
// 先頭から25個の動物を使ってビンゴカードを作成する
for(let i = 1; i <= COLUMN_LENGTH * ROW_LENGTH; i++){
    let divSquare = document.createElement('div');//セルのdiv要素作成。
    divSquare.classList.add('square'); //作成したセルにsquareクラスを追加。
    
    let div = document.createElement('div');//セル内に画像を配置するためのdiv要素作成。

    divSquare.onclick = () => divSquare.classList.toggle('gray');//クリックのたびにgrayクラスをon/offする。
    
    let filename = ANIMALS[i - 1]; // シャッフルされた動物の配列を使用。配列から要素取得。
    let img = document.createElement('img');//img要素の作成。
    img.src = `img/animal/${filename}.png`; // 画像のパスを設定します
    //img.alt = animalName; // 代替テキスト（任意）
    div.appendChild(img);//div要素の中にimg要素を追加。
    divSquare.appendChild(div)
    outer.appendChild(divSquare);

    // ビンゴが成立したときに、その列の動物を回転させて大きくする
    divSquare.addEventListener('click', () => {
        //let columnNumber = Math.floor((i - 1) / ROW_LENGTH); // クリックされたセルが所属する列の番号。floor()は切り捨てて整数に変換する関数。
        //let squaresInColumn = document.querySelectorAll(`.square:nth-child(${ROW_LENGTH}n + ${columnNumber + 1})`);
        console.log(bingoAchieved)
        checkBingo();
        console.log(bingoAchieved)
        if (bingoAchieved) {
            squaresInColumn.forEach(square => {
                let animalImg = square.querySelector('img'); // 動物のimg要素を取得
                //console.log(bingoAchieved)
                //checkBingo();
                //console.log(bingoAchieved)
                //if (bingoAchieved) {
                
                animalImg.animate(
                    // 途中の状態を表す配列
                    [
                        { transform: 'scale(2) rotate(0deg)' }, // 開始時の状態（0度）
                        { transform: 'scale(1) rotate(360deg)' } // 終了時の状態（360度）
                    ], 
                    // タイミングに関する設定
                    {
                        fill: 'backwards', // 再生前後の状態（再生前、開始時の状態を適用）
                        duration: 2000, // 再生時間（1000ミリ秒）
                    },
                );
            }
            )
        };
            //animalImg.style.transform = 'scale(1.2) rotate(90deg) rotate(180deg) rotate(360deg)'; // 動物だけを拡大して回転する
            //setTimeout(() => {
                //animalImg.style.transform = 'none'; // 元に戻す
            //}, 1000); // 1秒後に元に戻す
        //});
    });
    
}

$('.square').css('flex', `0 0 ${squareWidth}%`);
//console.log(squareWidth);
