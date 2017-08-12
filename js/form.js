$(document).ready(function(){
    $('#form').submit(function(e){
        function showResult(code) {
            function constructResult(text, color) {
                var result = $('#result');
                result.text(text);
                result.css('color', color);
            }
            switch(code) {
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
            return false;
        } else {
            showResult('1');
            e.preventDefault();
        }
    });
});
