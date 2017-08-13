$(document).ready(function () {
    $('#form').submit(function (e) {
        function showResult(code) {
            function constructResult(text, color) {
                var result = $('#result');
                result.text(text);
                result.css('color', color);
            }

            switch (code) {
                case '0':
                    $('#form')[0].reset();
                    constructResult('Thanks for your feedback!', 'green');
                    $('#form').css('border-color', 'green');
                    break;
                case '1':
                    constructResult('Please fill in all fields', 'red');
                    break;
                case '2':
                    constructResult('Please enter the correct email address', 'red');
                    break;
                case '3':
                    constructResult('Sorry, the request failed. Please try later', 'red');
                    break;
                default:
                    break;
            }
        }

        if ($('#subject').val() && $('#email').val() && $('#input-description').val()) {
            $.ajax({
                type: "POST",
                url: "mail/mail.php",
                data: $(this).serialize(),
                success: function (data) {
                    showResult(data);
                }
            });
        } else {
            showResult('1');
        }
        e.preventDefault();
    });
    var stopingSlider = (function () {
        var stopID;
        var lock = false;
        var slider = $('#slider-code');
        var callouts = $('.callout').toArray();
        var blockEvent = function (event) {
            event.stopImmediatePropagation();
            event.preventDefault();
        };
        return function () {
            if (lock) {
                alert("lock");
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
                    slider.tinycarousel_move(1);
                    slider.tinycarousel_start();
                    callouts.forEach(function (item) {
                        item.removeEventListener('click', blockEvent, true);
                    });
                }
            }
            lock = false;
        }
    })();
    stopingSlider();
    $(window).resize(stopingSlider);
});
