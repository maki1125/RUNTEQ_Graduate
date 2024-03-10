const COLUMN_LENGTH = 5;
const ROW_LENGTH = 5;
const MAX_NUMBER = 75;
const array = Array.from({ length: 26 }, (_, i) => String(i + 1));
let targetNumber = [];
for(let i = 1; i <= MAX_NUMBER; i++){
  targetNumber.push(i);
}

let outer = document.getElementById('outer');

for(let i = 1; i <= COLUMN_LENGTH * ROW_LENGTH; i++){
  let divSquare = document.createElement('div');
  divSquare.classList.add('square');
  
  let div = document.createElement('div');
  //if(i === Math.round(COLUMN_LENGTH * ROW_LENGTH /2) ){
    //divSquare.classList.add('gray');
    //div.textContent = 'free';
  //}else{
    divSquare.onclick = () => divSquare.classList.toggle('gray');
    let targetIndex = Math.floor(Math.random() * targetNumber.length) ;     
    //画像を表示する
    //div.textContent = targetNumber[targetIndex];
    //targetNumber.splice(targetIndex, 1);
    let img = document.createElement('img');
    img.src = '/Users/maki/Downloads/26.png'; // 画像のURLを指定する
    img.alt = targetNumber[targetIndex]; // 代替テキスト（任意）
    div.appendChild(img);
    targetNumber.splice(targetIndex, 1);

  //}
  divSquare.appendChild(div)
  outer.appendChild(divSquare);
}