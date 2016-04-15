if (document.getElementsByClassName("t c_font")[0] != null) {
    var tCFonts = document.getElementsByClassName("t c_font");
   
    for (var i=0; i<tCFonts.length; i++) {
      tCFonts[i].childNodes[0].addEventListener("click", function() {
         var data = new Array();
         data[0] = window.location.href;
         data[1] = this.innerHTML;
         data[2] = this.href;
         var urls = new Array();
         var source = this.parentNode.parentNode.getElementsByClassName('sc_allversion')[0].getElementsByClassName('v_item_span');
         
         for (var j=0; j<source.length; j++) {
            urls[j] = source[j].getElementsByTagName('a')[0].getAttribute('href');
         };
         
         data[3] = urls;
         self.port.emit('click', data);
        });
    }
}



