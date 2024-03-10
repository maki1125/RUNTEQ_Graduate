// Fisher-Yates シャッフルアルゴリズムを使って配列をシャッフルする関数
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}
function checkBingo() {
    // 各列についてビンゴが成立しているかチェック
    for (let col = 0; col < COLUMN_LENGTH; col++) {
        let bingoInColumn = true; // 列のビンゴ成立フラグ
        for (let row = 0; row < ROW_LENGTH; row++) {
            let cell = document.querySelector(`.square:nth-child(${ROW_LENGTH}n + ${col + 1})`);
            if (!cell.classList.contains('gray')) {
                bingoInColumn = false;
                break;
            }
        }
        if (bingoInColumn) {
            // ビンゴが成立した列に対してアニメーションを開始する処理をここに記述
            //console.log(`Bingo in column ${col + 1}`);
            bingoAchieved = true; // ビンゴ成立フラグを立てる
        }
    }

    // 各行についてビンゴが成立しているかチェック
    for (let row = 0; row < ROW_LENGTH; row++) {
        let bingoInRow = true; // 行のビンゴ成立フラグ
        for (let col = 0; col < COLUMN_LENGTH; col++) {
            let cell = document.querySelector(`.square:nth-child(${ROW_LENGTH}n + ${col + 1})`);
            if (!cell.classList.contains('gray')) {
                bingoInRow = false;
                break;
            }
        }
        if (bingoInRow) {
            // ビンゴが成立した行に対してアニメーションを開始する処理をここに記述
            console.log(`Bingo in row ${row + 1}`);
            bingoAchieved = true; // ビンゴ成立フラグを立てる
        }
    }
}


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
        let columnNumber = Math.floor((i - 1) / ROW_LENGTH); // クリックされたセルが所属する列の番号。floor()は切り捨てて整数に変換する関数。
        let squaresInColumn = document.querySelectorAll(`.square:nth-child(${ROW_LENGTH}n + ${columnNumber + 1})`);
        squaresInColumn.forEach(square => {
            let animalImg = square.querySelector('img'); // 動物のimg要素を取得
            console.log(bingoAchieved)
            checkBingo();
            console.log(bingoAchieved)
            if (bingoAchieved) {
                
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
            }; 
            //animalImg.style.transform = 'scale(1.2) rotate(90deg) rotate(180deg) rotate(360deg)'; // 動物だけを拡大して回転する
            //setTimeout(() => {
                //animalImg.style.transform = 'none'; // 元に戻す
            //}, 1000); // 1秒後に元に戻す
        });
    });
    
}

$('.square').css('flex', `0 0 ${squareWidth}%`);
console.log(squareWidth);
