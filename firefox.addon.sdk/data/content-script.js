if (document.getElementsByClassName("t c_font")[0] != null) {
    var tCFonts = document.getElementsByClassName("t c_font");
   
    for (var i=0; i<tCFonts.length; i++) {
      tCFonts[i].childNodes[0].addEventListener("click", function() {
         var data = new Array();
         data[1] = window.location.href;
         data[2] = this.innerHTML.replace(new RegExp("<em>","gm"),"").replace(new RegExp("<\/em>","gm"),"");
         data[3] = this.href;

         if (data[1].indexOf("&rsv_bp") < data[1].indexOf("&tn")) {
            data[0] = data[1].substring(data[1].indexOf("wd=") + 3, data[1].indexOf("&rsv_bp"));
         } else {
            data[0] = data[1].substring(data[1].indexOf("wd=") + 3, data[1].indexOf("&tn"));
         }
         
         var urls = new Array();
         var source = this.parentNode.parentNode.getElementsByClassName('sc_allversion')[0].getElementsByClassName('v_item_span');
         for (var j=0; j<source.length; j++) {
            urls[j] = source[j].getElementsByTagName('a')[0].getAttribute('href');
            if (urls[j].indexOf("http:") < 0) {
                urls[j] = "http://xueshu.baidu.com" + urls[j];
            }
         };
         
         data[4] = urls;
         self.port.emit('click', data);
        });
    }
}



