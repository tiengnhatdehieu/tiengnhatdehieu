var dtLMSClassesListingIsotope = function() {

    jQuery('.dtlms-apply-isotope .dtlms-classes-listing-items').each(function() {

        //jQuery(this).isotope('destroy');
        jQuery(this).isotope({
            itemSelector: '.dtlms-column',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }        	
        });

    });    

}