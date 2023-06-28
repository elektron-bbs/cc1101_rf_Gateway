﻿/*
  JavaScript for website receive modes /cc110x_modes - cc110x_rf_Gateway
  Copyright (c) 2022 <HomeAutoUser & elektron-bbs>
  URL: https://github.com/HomeAutoUser/cc1101_rf_Gateway
*/

var store = document.querySelector(':root');        /* Get the CSS root element */
var value = getComputedStyle(store);                /* Get the styles (properties and values) for the root */
var color1 = value.getPropertyValue('--bt_reception_active');
var color2 = value.getPropertyValue('--bt_reception_enable');

var js = document.createElement("script");
js.src = '/all.js';
document.head.appendChild(js);

// Show the received message 
function onMessage(event) {
  console.log('received message: ' + event.data);

  if (event.data.includes('MODE_id') ) {
    var obj = JSON.parse(event.data);

    /*  erste Spalte | automatischer Farbwechsel aktiver Modus
        Zählweise Tabellen ID
        0,1,2
        ...
        33,34,35
        ...
        ENDE
    */

    const cell = document.getElementById("rec_mod").getElementsByTagName("td");
    for (var i = 0; i < cell.length; i++) {
      if (i % 3 == 0) {
        btnr = i / 3;
        var bt = '#bt' + btnr;
        var myEle = document.querySelector(bt);     /* to check element of error: Cannot set properties of null (setting 'innerHTML') */

        if (myEle!=null && bt != 'null' && bt != 'NULL') {
          if (btnr == obj.MODE_id) {                /* current button status */
            document.querySelector(bt).innerHTML = 'active reception';
            document.querySelector(bt).className = 'btn2';
          } else {
            document.querySelector(bt).innerHTML = 'enable reception';
            document.querySelector(bt).className = 'btn';
          }
        }
      }

      if (cell[i].innerHTML == obj.MODE) {
        var btnr = i / 3;
        cell[i].style.backgroundColor = color1;     /* MODE */
        cell[i+1].style.backgroundColor = color1;   /* set to bank 0 1 2 3 */
        cell[i+2].style.backgroundColor = color1;   /* button enable(d) reception */
        i = i + 2;
      } else {
        cell[i].style.backgroundColor = color2;
      }
    }

    var today = new Date();
    document.getElementById('stat').innerHTML = 'last action: ' + today.toLocaleTimeString('de-DE');
  }
}
