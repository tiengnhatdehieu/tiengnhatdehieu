var dtLMSPackagesListingIsotope = function() {

    jQuery('.dtlms-apply-isotope .dtlms-packages-listing-items').each(function() {
        jQuery(this).isotope({
            itemSelector: '.dtlms-column',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }        	
        });
    });

}