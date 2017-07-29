document.addEventListener("DOMContentLoaded", function() {
  var request = new XMLHttpRequest();
  var progReq = new XMLHttpRequest();
  var timeReq = new XMLHttpRequest();
  var elapReq = new XMLHttpRequest();
  // var urls = JSON.parse(data);

  var totalSec,elapsedTime;
  var url = urls.printerApi;
  var stream = urls.stream;

  document.getElementById('stream').src = stream;



  request.open('GET', url+'/printer', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var resp = request.responseText;
      var data = JSON.parse(resp)
      document.getElementById('bedTemp').innerHTML = "Bed Temp: " + data.bed.temperature.current;
      document.getElementById('hotEndTemp').innerHTML = "HotEnd Temp: " + data.heads[0].extruders[0].hotend.temperature.current;   }
  };

  progReq.open('GET',url+'/print_job/progress',true);

  progReq.onload=function(){
    if(progReq.status >= 200 && progReq.status < 400){
      var progResp = progReq.responseText;
      move(progResp);
      document.getElementById('myBar').innerHTML = Math.floor((progResp / 1) * 100)+ "%";

     }
   }
   timeReq.open('GET',url+'/print_job/time_total',true);

   timeReq.onload=function(){
     if(timeReq.status >= 200 && timeReq.status < 400){
       var timeResp = timeReq.responseText;
       var totalTime = secondsToHms(timeResp);
       totalSec = timeResp;

       document.getElementById('totalTime').innerHTML = "Total Time: " + totalTime;

     }
   }
   elapReq.open('GET',url+'/print_job/time_elapsed',true);

   elapReq.onload=function(){
     if(elapReq.status >= 200 && elapReq.status < 400){
       var elapResp = elapReq.responseText;
       var elapTime = secondsToHms(elapResp)
       // console.log(elapResp)
       document.getElementById('elapsedTime').innerHTML = "Elapsed Time: " + elapTime;
     }
   }

   elapReq.send();
   timeReq.send();
   request.send();
   progReq.send();

 });


 function move(percent) {
     var elem = document.getElementById("myBar");
     var width = Math.floor((percent / 1) * 100)+ "%";

     elem.style.width = width;
   }

   function secondsToHms(d) {
       d = Number(d);

       var h = Math.floor(d / 3600);
       var m = Math.floor(d % 3600 / 60);
       var s = Math.floor(d % 3600 % 60);

       return ('0' + h).slice(-2) + ":" + ('0' + m).slice(-2) + ":" + ('0' + s).slice(-2);
   }
