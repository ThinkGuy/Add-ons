var citeXplore = {
	
	init: function() {
		console.log("init");
		window.removeEventListener("load", citeXplore.init, true);
        
		var appcontent = window.document.getElementById("appcontent");
		if (appcontent) {
            appcontent.addEventListener("DOMContentLoaded", citeXplore.onPageLoad, false);
        }
	},

	onPageLoad: function(aEvent) {
		console.log("onPageLoad");
        var urls_reg = "^(https*:\/\/xueshu\.baidu\.com\/.*)";
        var doc = aEvent.originalTarget;
        var m = (new RegExp(urls_reg, 'i')).test(doc.location.href);
        
        //获得关键字。
        var href = doc.location.href;
        var keyWord = href.substring(href.indexOf("wd=")+3, href.indexOf("&tn"));
        //alert(keyWord);
        
        if (!m) return;
        
        //知道点击了什么
        
        var data = doc.createElement("script");
			data.id = "citeXplore";
            data.innerHTML = "function getUrl(i){var data = document.getElementById(i);var allSourceUrl = new Array(); var source = data.getElementsByClassName(\"sc_allversion\")[0].getElementsByClassName(\"v_item_span\");for (var i=0; i<source.length; i++) {allSourceUrl[i] = source[i].getElementsByTagName('a')[0].innerHTML + \"**http://xueshu.baidu.com\" + source[i].getElementsByTagName('a')[0].getAttribute(\"href\");}; alert(allSourceUrl[0]);}"
			
            doc.getElementsByTagName('body')[0].appendChild(data);
            
            var list = doc.getElementsByClassName('result sc_default_result xpath-log');
            
            for (var i=0; i<list.length; i++) {
                var button = doc.createElement("span");
                button.innerHTML ="<input type=\"button\" value=\"getData\" onclick=\"getUrl(" + (i+1) + ")\">";
                button.id="getUrl" + (i+1);
                list[i].appendChild(button);
            } 
		
		citeXplorePanel.show();
	}
	
};

window.addEventListener("load", citeXplore.init, true);