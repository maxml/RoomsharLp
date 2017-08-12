$(document).ready(function(){
    $('#form').submit(function(){
        $.ajax({
            type: "POST",
            url: "mail/mail.php",
            data: $(this).serialize(),
            success: function(data){
                alert(data);
            },
            error: function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.status + errorThrown);
            }
        });
        return false;
    });
});
