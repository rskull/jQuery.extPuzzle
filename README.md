# JQuery.excPuzzle

## 使い方

まずはjQueryと一緒にプラグインを読み込みます。

```html
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery.excPuzzle-1.0.min.js"></script>
```

以下の様な構造でマークアップします。widthとheightは絶対指定してください。

```html
    <div id="puzzle">
        <img src="images/chara_02.jpg" alt="puzzle" width="300" height="400">
    </div>
```

idを指定してパズル化を実行します。

```javascript
$(function () {

    $('#puzzle').excPuzzle({
        // パズルの分割数
        split: 3,
        // ピースを入れ替えるごとに実行されます
        change: function () {
            console.log('change');
        },
        // 完成したときに実行されます
        complate: function () {
            alert('Complate!');
        }
    });

});
```

## オプション機能

data-splitで分割数を指定することもできます。
この場合Script側の指定は無視されます。

```html
    <div id="puzzle" data-split="5">
        <img src="images/chara_02.jpg" alt="puzzle" width="300" height="400">
    </div>
```

## 対応ブラウザ

**Chorme** / **FireFox** / **Safari** / **Opera** / **IE9+**

現在Android 2系の動作が怪しいので、バージョンアップで対応していきます。

## バージョン履歴

v1.0

	- リリース
	
v1.1

	- Opera IE9+ に対応

