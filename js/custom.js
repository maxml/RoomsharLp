$(document).ready(function () {
    (function () {
        $('#appStore-link').click(function (e) {
            return $('#appstore-modal').modal('show');
        });
        $('#other-system-link').click(function (e) {
            return $('#othersystem-modal').modal('show');
        });
    })();


    (function () {
        function showResult(formName, data) {
            var form = $(formName + '-form');
            var resultElement = $(formName + '-result');
            var color = data.result_status ? 'green' : 'red';
            resultElement.text(data.message);
            resultElement.css('color', color);
            form.css('border-color', color);
            if (data.result_status) {
                form[0].reset();
            }
        }

        $('#feedback-form').submit(function (e) {
            if ($('#feedback-subject').val() && $('#feedback-email').val() && $('#feedback-input-description').val()) {
                $.ajax({
                    type: "POST",
                    url: "mail/feedbackMail.php",
                    data: $(this).serialize(),
                    success: function (data) {
                        try {
                            showResult('#feedback', JSON.parse(data));
                        }
                        catch (e) {
                            showResult('#feedback', {result_status: false, message: 'Извините, запрос не отправлен. Пожалуйста, попробуйте позже'});
                        }

                    }
                });
            } else {
                showResult('#feedback', {result_status: false, message: 'Пожалуйста, заполните все поля'});
            }
            e.preventDefault();
        });

        $('#appstore-form').submit(function (e) {
            if ($('#appstore-email').val()) {
                $.ajax({
                    type: "POST",
                    url: "mail/appstoreMail.php",
                    data: $(this).serialize(),
                    success: function (data) {
                        try {
                            showResult('#appstore', JSON.parse(data));
                        }
                        catch (e) {
                            showResult('#appstore', {result_status: false, message: 'Извините, запрос не отправлен. Пожалуйста, попробуйте позже'});
                        }
                    }
                });
            } else {
                showResult('#appstore', {result_status: false, message: 'Пожалуйста, заполните поле для обратной связи'});
            }
            e.preventDefault();
        });

        $('#othersystem-form').submit(function (e) {
            if ($('#othersystem-email').val()) {
                $.ajax({
                    type: "POST",
                    url: "mail/othersystemMail.php",
                    data: $(this).serialize(),
                    success: function (data) {
                        try {
                            showResult('#othersystem', JSON.parse(data));
                        }
                        catch (e) {
                            showResult('#othersystem', {result_status: false, message: 'Извините, запрос не отправлен. Пожалуйста, попробуйте позже'});
                        }
                    }
                });
            } else {
                showResult('#othersystem', {result_status: false, message: 'Пожалуйста, заполните поле для обратной связи'});
            }
            e.preventDefault();
        });
    })();


    var stopingSlider = (function () {
        var stopID;
        var lock = false;
        var slider = $('#slider-code');
        var callouts = $('.callout').toArray();
        var blockEvent = function (event) {
            event.stopPropagation();
        };
        return function () {
            if (lock) {
                return;
            }
            lock = true;
            if ($(window).width() <= '991') {
                if (!stopID) {
                    stopID = setInterval(function () {
                        slider.tinycarousel_stop();
                    }, 500);
                    slider.tinycarousel_move(1);
                    callouts.forEach(function (item) {
                        item.addEventListener('click', blockEvent, true);
                    });
                }
            } else {
                if (stopID) {
                    clearInterval(stopID);
                    stopID = null;
                    callouts.forEach(function (item) {
                        item.removeEventListener('click', blockEvent, true);
                    });
                    slider.tinycarousel_start();
                }
            }
            lock = false;
        }
    })();

    stopingSlider();
    $(window).resize(stopingSlider);


    var resizeLines = (function () {
        var lines = $('.dotted-line');
        lines.each(function () {
            $(this).css('border-color', $(this).data('color'));
        });
        function resetLines(width) {
            lines.css({
                'width': width,
                'left': '-' + width
            });
        }
        return function () {
            if ($(window).width() <= '1199') {
                resetLines('124px');
            } else {
                var newWidth = Math.round($('#nmain-container').width() * 0.7 - 520) + 'px';
                resetLines(newWidth.toString());
            }
        }
    })();

    resizeLines();
    $(window).resize(resizeLines);
});
