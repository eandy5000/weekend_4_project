$(document).ready(function(){

        $('#userForm').submit(function(event){
            event.preventDefault();
            var values = {};

            $.each($(this).serializeArray(), function(i, field){
                values[field.name] = field.value;
            });
            console.log("serialized array values", values);
        });


});