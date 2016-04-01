var citeXplorePanel = {
	
	initialized: false,
	
	init: function() {
	},

	show: function() {
		if (!citeXplorePanel.initialized) {
			document.getElementById("citeXploreBrowser").loadURI("http://www.citexplore.com", null, null);
			citeXplorePanel.initialized = true;
        }
		
		document.getElementById("citeXploreSplitter").hidden = false;
		document.getElementById("citeXplorePanelBox").hidden = false;
	},
	
	hide: function() {
		document.getElementById("citeXplorePanelBox").hidden = true;
		document.getElementById("citeXploreSplitter").hidden = true;
	}
	
};