(function(document) {
  'use strict';
  var URL = urls.printerApi;



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

  function get(url) {
    return new Promise(function(resolve, reject) {
      var req = new XMLHttpRequest();
      req.open('GET', url);
      req.onload = function() {
        // console.log(req)
        if (req.status === 200) {
          resolve(req.response);
        } else {
          reject(Error(req.statusText));
        }
      };
      req.onerror = function() {
        reject(Error('Network Error'));
      };
      req.send();
    });
  }

  window.addEventListener('DOMContentLoaded', function() {
    var totalSec,elapsedTime,printerStatus;
    var stream = urls.stream;
    document.getElementById('stream').src = stream;

    get(URL+'/printer')
    .then(function(response) {
      var data = JSON.parse(response);

      printerStatus = data.status;

      document.getElementById('bedTemp').innerHTML = "Bed Temp: " + data.bed.temperature.current;
      document.getElementById('hotEndTemp').innerHTML = "HotEnd Temp: " + data.heads[0].extruders[0].hotend.temperature.current;
      document.getElementById('filamentA').innerHTML = 'filamentA: ' + Math.round(data.heads[0].extruders[0].active_material.length_remaining)+"mm"
      if(data.heads[0].extruders[1].active_material.length_remaining == -1){
        document.getElementById('filamentB').innerHTML = 'filamentB: Not Loaded'
      }
      else{
        document.getElementById('filamentB').innerHTML = 'filamentB: ' + Math.round(data.heads[0].extruders[1].active_material.length_remaining)+"mm";
      }
    })
    .catch(function(error) {
      console.log(error);
    });


    get(URL+'/print_job/progress')
    .then(function(response){
      move(response);
      document.getElementById('myBar').innerHTML = Math.floor((response / 1) * 100)+ "%";
    })
    .catch(function(error){
      console.log(error);
    })

    get(URL+'/print_job/time_total')
    .then(function(response){
      var totalTime = secondsToHms(response);

      document.getElementById('totalTime').innerHTML = "Total Time: " + totalTime;
    })
    .catch(function(error){
      console.log(error);
    })

    get(URL+'/print_job/time_elapsed')
    .then(function(response){
      var elapTime = secondsToHms(response);
      console.log(elapTime)
      document.getElementById('elapsedTime').innerHTML = "Elapsed Time: " + elapTime;
    })
    .catch(function(error){
      console.log(error);
    })
  });


})(document);
