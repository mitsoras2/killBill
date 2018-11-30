$(function(){                
    //make an AJAX call to get the kill list
    $.ajax({
        url:"peopleInJsonFormat.txt",
        type:"GET",
        success:function(result){
            //Insert your code here!
            $("#killTable").append(table_lines);
        }
    });
});