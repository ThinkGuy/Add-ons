if (document.getElementsByClassName("t c_font")[0] != null) {
    var tCFonts = document.getElementsByClassName("t c_font");

    for (var i=0; i<tCFonts.length; i++) {
      tCFonts[i].childNodes[0].addEventListener("click", function() {
         var data = new Array();
         //queryUrl.
         data[1] = window.location.href;
         //title.
         data[2] = this.innerHTML.replace(new RegExp("<em>","gm"),"").replace(new RegExp("<\/em>","gm"),"");

         //queryText.
         var index = data[1].indexOf("wd=");
         if (index > 0) {
            data[0] = data[1].substring(index + 3, index + 7);
         }

         //urls.
         var urls = new Array();
         urls[0] = this.href;
         var source = this.parentNode.parentNode.getElementsByClassName('sc_allversion')[0].getElementsByClassName('v_item_span');
         for (var j=0; j<source.length; j++) {
            urls[j+1] = source[j].getElementsByTagName('a')[0].getAttribute('href');
            if (urls[j+1].indexOf("http:") < 0) {
                urls[j+1] = "http://xueshu.baidu.com" + urls[j+1];
            }
         };
         
         data[3] = urls;
         self.port.emit('click', data);
        });
    }

    var data = new Array();
    //queryUrl.
    data[1] = window.location.href;

    //queryText.
    var index = data[1].indexOf("wd=");
    if (index > 0) {
        data[0] = data[1].substring(index + 3, index + 7);
    }

    //query Riden.
    var date = null;
    index = data[1].indexOf("filter=sc_year");
    if (index > 0) {
        date = data[1].substring(index + 20, index + 24);
    }
    data[2] = {"date" : date};

    self.port.emit('detach', data);
}




