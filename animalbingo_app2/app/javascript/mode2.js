// ボタン要素を取得
var playButtons = document.querySelectorAll('.play-button');
var favoriteButtons = document.querySelectorAll('.favorite-button');
var levelButtons = document.querySelectorAll('.level-button');

// フォーム要素を取得
var form = document.getElementById('playModeForm');
var submitButton = form.querySelector('[type="submit"]');

var selectedPlayButton
var selectedFavoriteButton
var selectedLevelButton

// ボタンにクリックイベントを追加
playButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // クリックされたボタンにselectedクラスを追加
    button.classList.add('selected');
    // 他の選択されているボタンの選択状態を解除
    playButtons.forEach(function(otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove('selected');
      }
    });
    // ボタンの選択状態によって送信ボタンの活性/非活性を切り替える
    //toggleSubmitButton();
    // 遊び方ボタンの選択情報を取得
    selectedPlayButton = getButtonSelection(playButtons).textContent;
    if (selectedPlayButton) {
      console.log("遊び方: " + selectedPlayButton);
    }

    updateHiddenFieldValue('play_button', selectedPlayButton);
  });
});

//絵の選択
favoriteButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // クリックされたボタンにselectedクラスを追加
    button.classList.add('selected');
    // 他の選択されているボタンの選択状態を解除
    favoriteButtons.forEach(function(otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove('selected');
      }
    });
    // 好きな絵ボタンの選択情報を取得
    selectedFavoriteButton = getButtonSelection(favoriteButtons).textContent;
    if (selectedFavoriteButton) {
      console.log("好きな絵: " + selectedFavoriteButton);
    }
    updateHiddenFieldValue('favorite_button', selectedFavoriteButton);
    // ボタンの選択状態によって送信ボタンの活性/非活性を切り替える
    //toggleSubmitButton();
  });
});

//レベルの選択
levelButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    // クリックされたボタンにselectedクラスを追加
    button.classList.add('selected');
    // 他の選択されているボタンの選択状態を解除
    levelButtons.forEach(function(otherButton) {
      if (otherButton !== button) {
        otherButton.classList.remove('selected');
      }
    });
    // レベルボタンの選択情報を取得
    selectedLevelButton = getButtonSelection(levelButtons).textContent;
    if (selectedLevelButton) {
      console.log("レベル: " + selectedLevelButton);
    }
    updateHiddenFieldValue('level_button', selectedLevelButton);
    // ボタンの選択状態によって送信ボタンの活性/非活性を切り替える
    //toggleSubmitButton();
  });
});

// 送信ボタンの活性/非活性を切り替える関数
function toggleSubmitButton() {
  var allButtonsSelected = 
    document.querySelectorAll('.play-button.selected').length === 1 &&
    document.querySelectorAll('.favorite-button.selected').length === 1 &&
    document.querySelectorAll('.level-button.selected').length === 1;
  
  submitButton.disabled = !allButtonsSelected;
}

// 最初から選択されているボタンがある場合、フォームの送信ボタンを有効化する
toggleSubmitButton();

// hiddenフィールドを作成してフォームに追加する関数
//function addHiddenField(form, name, value) {
  //var hiddenField = document.createElement('input');
  //hiddenField.type = 'hidden';
  //hiddenField.name = name;
  //hiddenField.value = value;
  //form.appendChild(hiddenField);
//}

// ボタンが選択されたかどうかを取得する関数
function getButtonSelection(buttons) {
  var selectedButton = null;
  buttons.forEach(function(button) {
    if (button.classList.contains('selected')) {
      selectedButton = button;
    }
  });
  return selectedButton;
}


// hiddenフィールドの値を更新する関数
function updateHiddenFieldValue(name, value) {
  var hiddenField = document.querySelector('input[type="hidden"][name="' + name + '"]');
  if (hiddenField) {
    hiddenField.value = value;
  }
}


