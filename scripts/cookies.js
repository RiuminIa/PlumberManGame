checkCookie();
function checkCookie() {
    let level = getCookie();
    console.log(level);
    if (level== "") {
        return false;
    } else {
       return true;
    }
}
function setCookie(level,points) {
    let cname="level";
    let cname2="data";
    let exdays=365;
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + JSON.stringify(level) + ";" + expires + ";path=/";
    document.cookie = cname2 + "=" + JSON.stringify(points) + ";" + expires + ";path=/";
}

function getCookie() {
    let name ="level"+"=";
    let name2 ="data"+"=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    console.log(ca);
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      console.log(c);
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        var level = JSON.parse(c.substring(name.length, c.length));
        console.log(level);
      }
      else if((c.indexOf(name2) == 0)){
        var points = JSON.parse(c.substring(name2.length, c.length));
      }
    }
    if(level==undefined){
        return "";
    }
    return [level,points];
  }

  function deleteCookie(){
    document.cookie = "level=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "data=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}