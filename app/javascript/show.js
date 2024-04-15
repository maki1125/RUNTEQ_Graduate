console.log("collection/show")

// JavaScriptを使用して要素を取得
const nameElement = document.getElementById('name');
const imageElement = document.getElementById('images');
const videoElement = document.getElementById('video');
const backButton = document.getElementById('back');

// name、image、iframeの内容を動的に変更する関数
function changeContent() {
  // テキストと画像の内容を変更
  //nameElement.textContent = '新しい名前';
  //imageElement.src = '1.png';
  // 動画のsrcを変更
  // videoElement.src = 'https://www.youtube.com/embed/new_video_id';
}
changeContent()