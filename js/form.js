$(document).ready(function () {
    (function () {
        $('#appStore-link, #other-system-link').click(function (e) {
            return $('#notification-modal').modal('show');
        })
    })();


    (function () {
        function showResult(formName, code) {
            var form = $(formName + '-form');
            var resultElement = $(formName + '-result');
            function constructResult(text, color) {
                resultElement.text(text);
                resultElement.css('color', color);
                form.css('border-color', color);
            }
            switch (code) {
                case '0':
                    form[0].reset();
                    constructResult('Благодарим Вас за отзыв!', 'green');
                    break;
                case '1':
                    constructResult('Пожалуйста, заполните все поля', 'red');
                    break;
                case '2':
                    constructResult('Пожалуйста, введите правильно email', 'red');
                    break;
                case '3':
                    constructResult('Извините, запрос не отправлен. Пожалуйста, попробуйте позже', 'red');
                    break;
                default:
                    break;
            }
        }

        $('#feedback-form').submit(function (e) {
            if ($('#feedback-subject').val() && $('#feedback-email').val() && $('#feedback-input-description').val()) {
                $.ajax({
                    type: "POST",
                    url: "mail/feedbackMail.php",
                    data: $(this).serialize(),
                    success: function (data) {
                        showResult('#feedback', data);
                    }
                });
            } else {
                showResult('#feedback', '1');
            }
            e.preventDefault();
        });

        $('#notification-form').submit(function (e) {
            if ($('#notification-email').val()) {
                $.ajax({
                    type: "POST",
                    url: "mail/notificationMail.php",
                    data: $(this).serialize(),
                    success: function (data) {
                        showResult('#notification', data);
                    }
                });
            } else {
                showResult('#notification', '1');
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
