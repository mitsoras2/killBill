var map;
function GetMap(){
    navigator.geolocation.getCurrentPosition(
            function(position){
                map=new Microsoft.Maps.Map("#mapId",{
                    center:position.coords
                });
                var me={
                    name:"Me",
                    nickname:"Revenger",
                    latitude:position.coords.latitude,
                    longitude:position.coords.longitude
                };
                addPin(me);
            });
}

function addPin(personPin){
    var coords=new Microsoft.Maps.Location(personPin.latitude,personPin.longitude);
    var pin=new Microsoft.Maps.Pushpin(coords,{
        subTitle:personPin.nickname,
        text:personPin.name,
        color:'red'
    });
    map.entities.push(pin);
    map.setView({center:coords,zoom:12});

}

function infoFor(deathListId){
    $.ajax({
        url:"peopleInJsonFormat.txt",
        type:"GET",
        success:function(result){
            var deathlist=JSON.parse(result);
            var currentPerson=deathlist[deathListId-1];
            
            var currentPersonPin={
                name:currentPerson.name,
                nickname:currentPerson.nickname,
                latitude:currentPerson.latitude,
                longitude:currentPerson.longitude
            };
            addPin(currentPersonPin);
        }
    });
}

$(function(){
    //make an AJAX call to get the kill list
    $.ajax({
        url:"peopleInJsonFormat.txt",
        type:"GET",
        success:function(result){
            var deathlist=JSON.parse(result);
            var len=deathlist.length;
            var table_lines="";
            var rowClass="";
            for (i=0;i<len;i++){
                
                if(deathlist[i].isAlive==="0"){
                    rowClass= "deadclass";
                }else{
                    rowClass= "";
                }
                table_lines+= "<tr class='"+rowClass+"'><td>"+deathlist[i].id+"</td>"+
                        "<td>"+deathlist[i].name+"</td>"+
                        "<td>"+deathlist[i].nickname+"</td>"+
                        "<td><button class='btn btn-info' onclick=infoFor("+deathlist[i].id+")>Info</button></td></tr>";
                
           }
            //Insert your code here!
            $("#killTable").append(table_lines);
        }
    });

    
});