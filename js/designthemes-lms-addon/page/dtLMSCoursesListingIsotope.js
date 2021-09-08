var dtLMSCoursesListingIsotope = function() {

    jQuery('.dtlms-apply-isotope .dtlms-courses-listing-items').each(function() {
        //jQuery(this).isotope('destroy');
        jQuery(this).isotope({
            itemSelector: '.dtlms-column',
            percentPosition: true,
            masonry: {
                columnWidth: '.grid-sizer'
            }        	
        });

    });

    jQuery('.dtlms-apply-isotope .dtlms-courses-listing-isotope-filter').each(function() {

        var isotope_filter = jQuery(this);

        isotope_filter.find('a').on('click', function() {

            isotope_filter.find('a').removeClass('active-sort');
            var selector = jQuery(this).attr('data-filter');
            jQuery(this).addClass('active-sort');

            jQuery(this).parents('.dtlms-apply-isotope').find('.dtlms-courses-listing-items').isotope({ filter: selector, masonry: {  }, animationEngine : 'jquery' });

            return false;

        });

    });

}