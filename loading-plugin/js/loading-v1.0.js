/*!
 * loading Plugin v1.0
 * author:feng
 * date;2016/03/02
 */
;
(function ($) {
    var configKV = {};


    $.fn.loading = function () {

        var
            $this = this,
            params = arguments[0];
        if (Object.prototype.toString.call(params) === "[object String]") {
            operation[params]($this, configKV[this.selector]);
        } else {
            init($this, params);
        }
    };
    var operation = {
        show: function ($this, obj) {
            if (obj) {
                $this.find('#' + obj.uid).customFadeIn(obj.fade);
            }
        },
        hide: function ($this, obj) {
            if (obj) {
                $this.find('#' + obj.uid).customFadeOut(obj.fade);
            }
        },
        destroy: function ($this, obj) {
            if (obj) {
                $this.find('#' + obj.uid).customFadeOut(obj.fade, function () {
                    $this.find('#' + obj.uid).remove();
                });
            }
        }
    };

    function init($this, params) {
        var config = $.extend({}, $.loading, params);

        if (config.fade === '')
            config.fade = 0;

        configKV[$this.selector] = {uid: config.uid, fade: config.fade};

        if ($this.find('#' + config.uid).length > 0)
            $this.find('#' + config.uid).remove();

        if (config.width === '' && config.height === '') {
            var img = new Image();
            img.src = config.iconUrl + '?' + Math.random();
            img.onload = function () {
                config.width = img.width;
                config.height = img.height;
                htmlPart($this, config);
            };
        } else {
            htmlPart($this, config);
        }
    };
    function htmlPart($this, config) {
        var htmlPart = [
            '<div id="' + config.uid + '"  style="position:' + config.position + '; width: 100%;height: 100%;left: 0;top: 0;display:none;z-index:10001;">',
            '<div  style="position:' + config.position + ';opacity:' + config.opacity + ';filter: alpha(opacity=' + (config.opacity * 100) + '); width: 100%;height: 100%;left: 0;top: 0;background-color: black;"></div>',
            '<div  style="width: ' + config.width + 'px;height: ' + config.height + 'px;margin-left:' + -(config.width / 2) + 'px;margin-top:' + -(config.height / 2) + 'px;position: ' + (config.position === "absolute" ? 'absolute' : 'fixed') + ';top: 50%;left: 50%;">',
            '<img src="' + config.iconUrl + '" style="width:100%;">',
            '</div>',
            '</div>'
        ].join('');


        if (config.position === "absolute") {
            if ($this.css('position') === "absolute" || $this.css('position') === "relative" || $this.css('position') === "fixed") {
            } else {
                $this.css('position', 'relative');
            }
        }
        $this.append(htmlPart).find('#' + config.uid).customFadeIn(config.fade);
    };


    $.loading = {
        uid: '',
        position: '',
        opacity: 0.7,
        iconUrl: '',
        width: '',
        height: '',
        fade: ''
    };

    $.loading.setDefaults = function (settings) {
        $.extend($.loading, settings);
    };


})(jQuery);

// ie fix fadeIn/fadeOut
(function ($) {
    $.fn.customFadeIn = function (speed, callback) {
        $(this).fadeIn(speed, function () {

            if (navigator.userAgent.indexOf('MSIE') >= 0)
                $(this).get(0).style.removeAttribute('filter');
            if (callback != undefined)
                callback();
        });
    };
    $.fn.customFadeOut = function (speed, callback) {
        $(this).fadeOut(speed, function () {
            if (navigator.userAgent.indexOf('MSIE') >= 0)
                $(this).get(0).style.removeAttribute('filter');
            if (callback != undefined)
                callback();
        });
    };
})(jQuery);