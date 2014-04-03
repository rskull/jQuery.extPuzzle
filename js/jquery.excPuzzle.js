/**
 * Jquery excPuzzle
 *
 * @version 1.1 2014/03/12
 * @author r.mogi
 */
(function ($n, ua) {

    $.fn.excPuzzle = function (options) {

        var self = $(this),

        disable3d = /Opera|MSIE/i.exec(ua),

        // デフォルトのパラメータ
        options = $.extend({
            // 分割数
            split: 2,
            // パズルを動かしたとき呼ばれる
            change: false,
            // 完成したとき呼ばれる
            complate: false
        }, options),

        // シャッフル
        shuffle = function (container) {
            var content = container.find('> *'),
                total = content.size();
            content.each(function () {
                content.eq(Math.floor(Math.random() * total)).prependTo(container);
            })
        },

        // コンプリートチェック
        check = function (ans) {
            var _self,
                piece_list = self.find('div'),
                piece_num = piece_list.size();
            for (i = 0; i < piece_num; i++) {
                _self = piece_list.filter('[data-number=' + i + ']').css('transform');
                if (_self != ans[i]) return false;
            }
            return true;
        },

        // 復元率チェック
        recovery = function () {
            var i = 0, pieces = self.find('div');
            $.each(pieces, function (key, val) {
                if ($(val).attr('data-number') == key) {
                    i += 1;
                }
            });
            return Math.ceil(i / pieces.size() * 100);
        },

        // ベンダーごとのCSSプロパティ生成
        getVendorProp = function (prop, val) {
            var css_prop = {}
            vendors = ['', '-webkit-', '-moz-', '-o-', '-ms-'],
            $.each(vendors, function (i, vendor) {
                css_prop[vendor + prop] = val;
            });
            return css_prop;
        },

        // 初期化
        init = function () {

            // 初期化
            var j = 0,
                bg_width = 0,
                bg_height = 0,

                // パズルの分割数
                split = self.data('split') || options.split,

                // 完成後の飛び先
                redirect = self.data('url') || options.url,

                // パズルのベース画像
                puzzle = self.find('img'),
                src = puzzle.attr('src'),
                width = puzzle.attr('width'),
                height = puzzle.attr('height'), 

                // １ピースのサイズ
                piece_width = width / split,
                piece_height = height / split,

                // ピースの総数
                piece_num = split * split;

            // 初期設定
            puzzle.hide();
            self.css({
                'height' : height,
                'position': 'relative',
                'width' : width
            });

            // ピースの絵柄を設定
            for (i = 0; i < piece_num; i++) {
                if (i % split == 0) {
                    bg_height = -piece_height * j++;
                    bg_width = 0;
                } else {
                    bg_width = -piece_width * (i % split);
                }
                self.append($('<div>').css({
                    'background': 'url(' + src + ') no-repeat',
                    'background-size': width + 'px ' + height + 'px',
                    'background-position': bg_width + 'px ' + bg_height + 'px', 
                    'border': '1px solid #000',
                    'float': 'left',
                    'height': piece_height,
                    'position': 'absolute',
                    'width': piece_width
                }).attr('data-number', i));
            }

            // 完全にバラバラになるまでシャッフル
            shuffle(self);
            while (recovery() != 0) {
                shuffle(self);
            }

            var j = 0,
                css_prop,
                piece_list = self.find('div'),
                trans_width = 0,
                trans_height = 0;

            // ピースの位置設定
            piece_list.each(function (i, val) {
                if (i % split == 0) {
                    trans_height = piece_height * j++;
                    trans_width = 0;
                } else {
                    trans_width = piece_width * (i % split);
                }
                if (disable3d) {
                    css_prop = getVendorProp('transform', 'translate(' + trans_width + 'px, ' + trans_height + 'px)');
                } else {
                    css_prop = getVendorProp('transform', 'translate3d(' + trans_width + 'px, ' + trans_height + 'px, 0)');
                }
                $(val).css(css_prop);
            });

            piece_list.css(getVendorProp('transition', 'all 500ms ease'))
                .css(getVendorProp('box-sizing', 'content-box'));

            // 位置指定を答えとする
            var answer = [];
            piece_list.each(function (i, val) {
                answer.push($(val).css('transform'));
            });

            // PC Event Handler
            var touch_start = 'mousedown',
            touch_move = 'mousemove',
            touch_end = 'mouseup';

            // SmartPhone Event Handler
            if ('ontouchstart' in window) {
                touch_start = 'touchstart';
                touch_move = 'touchmove';
                touch_end = 'touchend';
            }

            // ピースをタップした時のイベント
            self.find('div').bind(touch_start, function () {
                this.touched = true;
            }).bind(touch_move, function () {
                this.touched = false;
            }).bind(touch_end, function () {

                if (!this.touched) return;

                var _self = $(this);

                // 入れ替え対象を選択してる時
                if (piece_list.hasClass('active')) {

                    // 同じピースをタップしたらキャンセル
                    if (_self.hasClass('active')) {
                        _self.removeClass('active');
                    } else {

                        var active_piece = self.find('.active'),

                        // ピースの位置情報取得
                        active_style = active_piece.css('transform'),
                        self_style = _self.css('transform'),

                        // ピーズの番号
                        active_number = active_piece.attr('data-number'),
                        self_number = _self.attr('data-number');

                        // ピース位置入れ替え
                        active_piece.css(getVendorProp('transform', self_style)).removeClass('active');
                        _self.css(getVendorProp('transform', active_style));

                        // ピーズ入れ替え時のコールバック
                        if (typeof options.change == 'function') {
                            options.change();
                        }

                        // 回答チェック
                        setTimeout(function () {
                            if (check(answer)) {
                                piece_list.unbind().css('border-color', 'transparent');
                                // コンプリート時のコールバック
                                if (typeof options.complate == 'function') {
                                    options.complate();
                                }
                            }
                        }, 700);

                    }

                } else {
                    _self.addClass('active');
                }
            });

        }

        // Start
        init();

    }

})(jQuery, navigator.userAgent);
