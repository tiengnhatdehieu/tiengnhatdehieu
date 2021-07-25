function IctTab() {
	const tab = this;
    this.dtLMSTabScroll = function() {
		if(jQuery('.dtlms-course-detail .dtlms-tabs-horizontal').length) {
			jQuery('.dtlms-course-detail .dtlms-tabs-horizontal').scrollTabs();
		}
		if(jQuery('.dtlms-class-detail .dtlms-tabs-horizontal').length) {
			jQuery('.dtlms-class-detail .dtlms-tabs-horizontal').scrollTabs();
		}
	}

	this.horizontal = function () {
		if(jQuery('ul.dtlms-tabs-horizontal').length > 0){
			jQuery('ul.dtlms-tabs-horizontal').each(function(){
				jQuery(this).dtLMSTabs('> .dtlms-tabs-horizontal-content', {
					effect: 'fade'
				});
			});
		}
	}

	this.vertical = function () {
		if(jQuery('ul.dtlms-tabs-vertical').length > 0){
			jQuery('ul.dtlms-tabs-vertical').each(function() {
				var this_item = jQuery('ul.dtlms-tabs-vertical');
				jQuery(this).dtLMSTabs('> .dtlms-tabs-vertical-content', {
					effect: 'fade',
				});
			});
		}	
	}

	this.init = function () {
		// tab.dtLMSTabScroll();
		
		tab.horizontal();
		tab.vertical();
		
	}

	return this;
}