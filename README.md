# JQuery.excPuzzle

## �g����

�܂���jQuery�ƈꏏ�Ƀv���O�C����ǂݍ��݂܂��B

```html
    <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="js/jquery.excPuzzle-1.0.min.js"></script>
```

�ȉ��̗l�ȍ\���Ń}�[�N�A�b�v���܂��Bwidth��height�͐�Ύw�肵�Ă��������B

```html
    <div id="puzzle">
        <img src="images/chara_02.jpg" alt="puzzle" width="300" height="400">
    </div>
```

id���w�肵�ăp�Y���������s���܂��B

```javascript
$(function () {

    $('#puzzle').excPuzzle({
        // �p�Y���̕�����
        split: 3,
        // �s�[�X�����ւ��邲�ƂɎ��s����܂�
        change: function () {
            console.log('change');
        },
        // ���������Ƃ��Ɏ��s����܂�
        complate: function () {
            alert('Complate!');
        }
    });

});
```

## �I�v�V�����@�\

data-split�ŕ��������w�肷�邱�Ƃ��ł��܂��B
���̏ꍇScript���̎w��͖�������܂��B

```html
    <div id="puzzle" data-split="5">
        <img src="images/chara_02.jpg" alt="puzzle" width="300" height="400">
    </div>
```

## �Ή��u���E�U

**Chorme** / **FireFox** / **Safari** / **Opera** / **IE9+**

����Android 2�n�̓��삪�������̂ŁA�o�[�W�����A�b�v�őΉ����Ă����܂��B

## �o�[�W��������

v1.0

	- �����[�X
	
v1.1

	- Opera IE9+ �ɑΉ�

