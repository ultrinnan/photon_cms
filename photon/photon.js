let photon_result;

function photon_wrapper() {


}

//some init actions here
function init(){
    var photon_top = document.createElement('div');
    photon_top.className = 'photon_top';
    photon_top.style.cssText = 'width:100%;min-height:100px;background:#fff;padding:8px 16px;';
    photon_top.innerHTML = '<hr><h2>Photon CMS installation</h2><hr><h5>you can always refer to the <a href="https://fedirko.pro/solutions/photon" target="_blank">manual</a> for any help.</h5><hr>';

    document.body.appendChild(photon_top);

    document.body.insertAdjacentElement('afterbegin', photon_top);
}

function sanitize(str) {
    str = encodeURI(str.trim().toLowerCase());
    return str;
}

/**
 * Performs GET request and stores it in temp variable
 * @param params - string of GET params
 */
function ajax_get(params) {
    let f_url = '/photon/photon.php?' + params;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {  // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function() {
        if (this.readyState===4 && this.status===200) {
            photon_result = this.responseText;
        }
    };
    xmlhttp.open("GET", f_url, true);
    xmlhttp.send();
}

/**
 * get action from address line, perform basic sanitizing and send/receive actions
 */
function action() {
    let params = window.location.search.substr(1).split("&");
    let action = sanitize(params[0]);
    if (action.includes('f=')){
        //send request to front or back
        ajax_get(action);
        //fucking js ajax is faster than 0 milliseconds. yes, it's js babe...
        setTimeout(function () {
            process(photon_result);
        }, 0);
    }
}

function process(result){
    console.log(result)
    init();
}

// function ajax_post(url, data, success) {
//     var httpRequest = new XMLHttpRequest()
//     httpRequest.onreadystatechange = function (data) {
//         // code
//     }
//     httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
//     httpRequest.open('POST', url)
//     httpRequest.send('username=' + encodeURIComponent(username))
// }
//
// // example request
// postAjax('../photon/photon.php', 'p1=1&p2=Hello+World', function(data){ console.log(data); });
//
// // example request with data object
// postAjax('../photon/photon.php', { p1: 1, p2: 'Hello World' }, function(data){ console.log(data); });

document.addEventListener("DOMContentLoaded", function(event) {
    // console.log('Photon is ready!');
    action();

    // // example request
    // ajax_get('../photon.php/?p1=1&p2=Hello+World', function(data){ console.log(data); });
    //
    // ajax_get('../photon.php/?p1=1&p2=Hello+World', function(data){
    //     var json = JSON.parse(data);
    //     console.log(json);
    // });

});