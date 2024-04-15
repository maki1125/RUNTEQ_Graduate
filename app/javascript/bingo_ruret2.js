const MASS = mass;
const squareWidth = 100 / MASS; // カラム数に基づいたマスの幅
let squareIdCounter = 0; // マスのID用のカウンターを初期化
let outer = document.getElementById('outer'); //htmlに設定
let name_card; //クリックしたビンゴますのID ID番号-動物の名前
let name; //クリックした動物の名前
let index; //クリックしたビンゴマスのID番号
let bingoAchieved = false; //ビンゴ成立か判定のフラグ
let bingoImages = [];// ビンゴした画像を格納する配列を定義
let del=1; //ルーレット用動物一覧の削除した履歴。0はまだ削除していないの意味。
let num=MASS*MASS; //カードの中のまだクリックしていないマス数。
let name_ruret; //カードの処理でも使いたいためここで宣言。
let names2 = names;
let images = imagePathsArray;
let random; //ビンゴカードのところで使用する。

// ビンゴカード作成
for(let i = 0; i < MASS * MASS; i++){// 画像をマス上に表示
    let divSquare = document.createElement('div');//セルのdiv要素作成。
    divSquare.classList.add('square'); //作成したセルにsquareクラスを追加。
    let div = document.createElement('div');//セル内に画像を配置するためのdiv要素作成。
    let img = document.createElement('img');//img要素の作成。
    img.src = imagePathsArray[i]; // 画像のパスを設定.htmlで変数作成。
    div.appendChild(img);//div要素の中にimg要素を追加。
    divSquare.appendChild(div)
    outer.appendChild(divSquare);
    divSquare.setAttribute('id', `${squareIdCounter}-${names[i]}`);
    squareIdCounter++; // カウンターをインクリメント
    divSquare.addEventListener('click', function(event) {// .square 要素に対して直接クリックイベントを設定
        name_card = event.currentTarget.id; // クリックされた要素のIDを取得
        const imgsrc = event.currentTarget.src; // クリックされた要素のIDを取得
        index = name_card.substr(0,name_card.indexOf("-")); //クリックしたマスのID取得。
        name = name_card.substr(name_card.indexOf("-")+1,10); //クリックしたマスのどうぶつ名取得。
        var x = index%MASS;
        var y = Math.floor(index/MASS);
        //ルーレットの動物と一致しているか確認
        if (name_ruret==name_card.substr(name_card.indexOf("-")+1,10)){ //動物名だけ抜き出す。
            headingElement.textContent = "正解！";// テキストを変更
            divSquare.classList.add('gray'); divSquare.onclick = null;//色をつける
            if (del==0){ //1回だけ削除するため
                names2.splice(random,1) //クリックされたものは、ルーレットの一覧から削除していく。
                images.splice(random,1) //クリックされたものは、ルーレットの一覧から削除していく。
                del=1;
                num -= 1;
            }
            checkBingo(); //ビンゴかチェックする。
            if (bingoAchieved) {
                headingElement.textContent = "ビンゴ！！";// テキストを変更
                animateBingoImages(); //動物を回転させる。
                // ボタン要素を取得する
                const button = document.getElementById('button'); // もしくは適切なセレクタでquerySelectorを使用して取得する
                button.textContent = "また遊ぶ";// ボタンのテキストを変更する
                button.style.backgroundColor = "orange";
            }else{ //まだビンゴにならない時にうんうんの動作
                $(div).animate({top: '+=20'},100);//左右に振るわせる。
                $(div).animate({top: '-=40'},100);
                $(div).animate({top: '+=40'},100);
                $(div).animate({top: '-=40'},100);
                $(div).animate({top: '+=20'},100);
            };
        }else{
            headingElement.textContent = "違うよ、、、";// テキストを変更
            $(div).animate({left: '+=20'},100);//左右に振るわせる。
            $(div).animate({left: '-=40'},100);
            $(div).animate({left: '+=40'},100);
            $(div).animate({left: '-=40'},100);
            $(div).animate({left: '+=20'},100);
        }
    });
}

//ビンゴカードの並びの設定
$('.square').css('flex', `0 0 ${squareWidth}%`);

//ビンゴカードの上のメッセージ
const headingElement = document.querySelector('.bingo-heading h2');// テキストを表示する要素を取得
headingElement.textContent = "STARTボタンを押してね";// テキストを変更

//ルーレットの上のメッセージ
const headingElement2 = document.querySelector('.ruret_text h2');// テキストを表示する要素を取得

//ルーレットの設定
//ルーレットの最初の画像の設定
function changeImageSource() {
    var image = document.getElementById('result');
    image.src = imagePathsArray[MASS * MASS]; // 新しい画像のファイルパスを設定
    headingElement2.textContent = names2[MASS * MASS];// テキストを変更
}
// ページが読み込まれたときに画像のsrc属性を変更する
window.onload = function() {
    changeImageSource();
};

//ルーレットの処理
$(function () {
    var timer;
    //var random;
    // START・STOPボタンクリックのイベント
    $("#button").on("click", function () {
        del=0; //削除の履歴をクリアする。
        //また遊ぶ
        if ($(this).text() == "また遊ぶ") {
            window.location.href = "/bingo"
            
        };
        // START
        if ($(this).text() == "START") {
            // ボタンのテキストを"STOP"に変更
            $(this).text("STOP").css("background-color", "red");
            headingElement.textContent = "stopボタンを押してね";// テキストを変更
            // ルーレットタイマーを設定
            timer = setInterval(function () {
                random = Math.floor(Math.random() * images.length);
                $("#result").attr("src",images[random]);
                headingElement2.textContent = names2[random];// テキストを変更
            }, 50);
        // STOP
        } else {
            $(this).text("START").css("background-color", "green");// ボタンのテキストを"START"に変更
            clearInterval(timer);// ルーレットタイマーを停止
            var result = images[random];// 停止時の数字を結果に反映
            //console.log(images[random]);
            //console.log(names[random]);
            name_ruret = names2[random]; //ルーレットででた動物の名前
            
            //console.log(name_ruret);
            //console.log(names.slice(0,9).includes(name_ruret));
            var aru = names2.slice(0,num).includes(name_ruret); //カードの中に、ルーレットの動物がいるか確認。
            if (aru) {
                headingElement.textContent = "どこかな？";// テキストを変更
            }else{
                headingElement.textContent = "いないね、、、";// テキストを変更
            }
            headingElement2.textContent = names2[random];// テキストを変更
        }
    });
});

//ビンゴか確認する
function checkBingo() {
    bingoImages = []
    bingoAchieved = false;
    var x = index%MASS //クリックした列番号　0,1,2
    var y = Math.floor(index/MASS) //クリックしたマスの行の番号　0,1,2

    //列の確認
    let bingo_count = 0;
    var columnSelector = `.square:nth-child(${MASS}n+${x+1})`; // クリックした列の取得
    var cells = document.querySelectorAll(columnSelector);// 指定の列のマスの要素を取得
    //console.log(cells)
    //const numberOfCells = cells.length;//要素の数を取得。
    //console.log(numberOfCells);
    for (let i = 0; i < cells.length; i++) {
        // 各セルに対する処理を記述する
        //console.log(cells[i]); // 例: 各セルの内容をコンソールに出力する
        if (cells[i].classList.contains('gray')) {
            bingo_count += 1;
            if (bingo_count==MASS){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                bingoImages.push(cells);
                break;
            };
        };
    };

    //行の確認
    bingo_count = 0;
    columnSelector = `.square:nth-child(n+${y*MASS+1}):nth-child(-n+${y*MASS+MASS})`; // クリックした列の取得
    cells = document.querySelectorAll(columnSelector);// 指定の列のマスの要素を取得
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('gray')) {
            bingo_count += 1;
            if (bingo_count==MASS){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                bingoImages.push(cells);
                //squaresInColumn1 = cells;
                break;
            };
        };
    };

    //左斜め
    bingo_count = 0;
    cells = document.querySelectorAll(`.square:nth-child(${MASS + 1}n + 1)`);//行の要素を取得。
    //console.log(cells);
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].classList.contains('gray')) {
            bingo_count += 1;
            if (bingo_count==MASS){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                bingoImages.push(cells);
                //squaresInColumn1 = cells;
                break;
            };
        };
    };

    //右斜め
    bingo_count = 0;
    cells = document.querySelectorAll(`.square:nth-child(${MASS - 1}n + ${MASS})`);//行の要素を取得。
    //console.log(cells);
    for (let i = 0; i < MASS; i++) {
        if (cells[i].classList.contains('gray')) {
            bingo_count += 1;
            if (bingo_count==MASS){
                bingoAchieved = true; // ビンゴ成立フラグを立てる
                bingoImages.push(Array.from(cells).slice(0,MASS)); //4つ目の要素を除くため。
                //squaresInColumn1 = cells;
                break;
            };
        };
    };
    //console.log(bingo_count);
    //console.log("bingoAchieved",bingoAchieved);
    //console.log("bingoImages",bingoImages);
};

function animateBingoImages() {
    if (bingoAchieved) {
        let bingo_list = [];
        //console.log(bingoImages);
        bingoImages.forEach(nodeList => {
            console.log("nodeList",nodeList)
            nodeList.forEach(element => {
                console.log("element",element);
                element.style.backgroundColor = "#30B7FF";
                //console.log(element.id.substr(name_card.indexOf("-")+1,10));
                bingo_list.push(element.id.substr(element.id.indexOf("-")+1,10));
                bingo_list = Array.from(new Set(bingo_list)); //重複を除く。
                console.log("bingo_list",bingo_list);
                let animalImg = element.querySelector('img'); // 動物のimg要素を取得
                animalImg.animate(
                    // 途中の状態を表す配列
                    [
                        { transform: 'scale(2) rotate(0deg)' }, // 開始時の状態（0度）
                        { transform: 'scale(1) rotate(360deg)' }, // 終了時の状態（360度）
                    ], 
                    // タイミングに関する設定
                    {
                        delay: 500,
                        duration: 2000, // 再生時間（1000ミリ秒）  
                    },
                );
            });
        //bingoしたデータをコレクションに送る
        $.ajax({
            url: '/collections/save',// 実行したいactionへのpath
            type: 'POST',// GET, POST, PUT, DELETEなどを設定します。
            data: {// urlにつけるパラメータを指定します。                 
                hoge: bingo_list// Rails からは parmas[:hoge] で受け取れます。
                
            },
            })
        });
    }
}
