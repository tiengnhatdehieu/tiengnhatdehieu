var dtCoursesListing = function() {

    jQuery( 'body' ).delegate( '.coursefilter-orderby:not(.dtlms-without-ajax-load), .coursefilter-category:not(.dtlms-without-ajax-load), .coursefilter-instructor:not(.dtlms-without-ajax-load), .coursefilter-cost:not(.dtlms-without-ajax-load), .coursefilter-date:not(.dtlms-without-ajax-load)', 'change', function() {  

        var this_item = jQuery(this).parents('.dtlms-courses-listing-holder');
        var offset = 0;
        var current_page = 1;

        // list course ajax call
        dtlmsListCourses(offset, current_page, this_item);

    });

    jQuery('.dtlms-courses-search-text:not(.dtlms-without-ajax-load)').on('input', function() {

        var this_item = jQuery(this).parents('.dtlms-courses-listing-holder');
        var offset = 0;
        var current_page = 1;

        // list course ajax call
        setTimeout( function() {
            dtlmsListCourses(offset, current_page, this_item);
        }, 1600);			

    });

    jQuery( 'body' ).delegate( '.dtlms-courses-display-type:not(.dtlms-without-ajax-load)', 'click', function(e) {  

        jQuery('.dtlms-courses-display-type').removeClass('active');
        jQuery(this).addClass('active');
        var list_type = jQuery(this).attr('data-displaytype');
        jQuery(this).parents('.dtlms-courses-listing-holder').find('.dtlms-courses-listing-containers').removeClass('list grid');
        jQuery(this).parents('.dtlms-courses-listing-holder').find('.dtlms-courses-listing-containers').addClass(list_type);
        jQuery(this).trigger('change');

        var this_item = jQuery(this).parents('.dtlms-courses-listing-holder');
        var offset = 0;
        var current_page = 1;

        // list course ajax call
        dtlmsListCourses(offset, current_page, this_item);

        e.preventDefault();

    });

    jQuery( 'body' ).delegate( '.dtlms-courses-listing-containers .dtlms-pagination a', 'click', function(e){	
        
        var this_item = jQuery(this).parents('.dtlms-courses-listing-holder');

        if(jQuery(this).parent().hasClass('prev-post')) {
            current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)-1;
        } else if(jQuery(this).parent().hasClass('next-post')) {
            current_page = parseInt(jQuery(this).attr('data-currentpage'), 10)+1;
        } else {
            current_page = jQuery(this).text();
        }

        var post_per_page = jQuery(this).parents('.dtlms-courses-listing-holder').attr('data-postperpage');

        if(current_page == 1) { 
            var offset = 0; 
        } else if(current_page > 1) { 
            var offset = ((current_page-1)*post_per_page); 
        }

        // list course ajax call
        dtlmsListCourses(offset, current_page, this_item);

        e.preventDefault();
                        
    });	

    function dtlmsListCourses(offset, current_page, this_item) {
    
        // gathering all default values
        var search_text = this_item.find('.dtlms-courses-search-text').val();

        var display_type = this_item.find('.dtlms-courses-display-type.active').attr('data-displaytype');

        var order_by = this_item.find('.coursefilter-orderby').val();

        var category = this_item.find('.coursefilter-category:checked').map(function(){
            return this.value;
        }).get();

        var instructor = this_item.find('.coursefilter-instructor:checked').map(function(){
            return this.value;
        }).get();

        var cost_type = this_item.find('.coursefilter-cost:checked').map(function(){
            return this.value;
        }).get();

        var start_date = this_item.find('.coursefilter-date').val();


        var post_per_page = this_item.attr('data-postperpage');
        var columns = this_item.attr('data-columns');
        var enable_carousel = this_item.attr('data-enablecarousel');
        var show_author_details = this_item.attr('data-showauthordetails');
        var disable_filters = this_item.attr('data-disablefilters');

        var apply_isotope = this_item.attr('data-applyisotope');
        var enable_category_isotope_filter = this_item.attr('data-enablecategoryisotopefilter');

        var default_filter = this_item.attr('data-defaultfilter');
        var default_display_type = this_item.attr('data-defaultdisplaytype');
        var course_item_ids = this_item.attr('data-courseitemids');
        var course_category_ids = this_item.attr('data-coursecategoryids');
        var instructor_ids = this_item.attr('data-instructorids');
        var enable_fullwidth = this_item.attr('data-enablefullwidth');
        var type = this_item.attr('data-type');
        var show_description = this_item.attr('data-showdescription');
        var hide_labels = this_item.attr('data-hidelabels');
        var hide_category = this_item.attr('data-hidecategory');
        var hide_addtocartbutton = this_item.attr('data-hideaddtocartbutton');
        var dclass = this_item.attr('data-class');

        console.log('list course')
        jQuery.ajax({
            type: "POST",
            url: lmsfrontendobject.ajaxurl,
            data:
            {
                action: 'dtlms_generate_courses_listing',
                display_type: display_type,
                order_by: order_by,
                category: category,
                instructor: instructor,
                cost_type: cost_type,
                start_date: start_date,
                post_per_page: post_per_page,
                columns: columns,
                offset: offset,
                current_page: current_page,
                search_text: search_text,
                enable_carousel: enable_carousel,
                show_author_details: show_author_details,
                disable_filters: disable_filters,
                apply_isotope: apply_isotope,
                enable_category_isotope_filter: enable_category_isotope_filter,
                default_filter: default_filter,
                default_display_type: default_display_type,
                course_item_ids: course_item_ids,
                course_category_ids: course_category_ids,
                instructor_ids: instructor_ids,
                enable_fullwidth: enable_fullwidth,
                type: type,
                show_description: show_description,
                hide_labels: hide_labels,
                hide_category: hide_category,
                hide_addtocartbutton: hide_addtocartbutton,
                class: dclass,
            },
            beforeSend: function(){
                dtLMSFrontendUtils.dtLMSAjaxBeforeSend(this_item);				
            },
            error: function (xhr, status, error) {
                this_item.find('.dtlms-courses-listing-containers').html('Something went wrong!');
            },
            success: function (response) {
                this_item.find('.dtlms-courses-listing-containers').html(response);
                if(enable_carousel == 'true') {
                    dtlmsCoursesSwiper(this_item);
                } else {
                    dtLMSFrontendUtils.dtLMSCoursesListingIsotope();	
                    if(this_item.find('.dtlms-courselist-item-wrapper').hasClass('list-item type6')) { // Isotope fix
                        this_item.find('.dtlms-courses-listing-isotope-filter a.active-sort').trigger('click');
                    }
                    setTimeout( function() {
                        jQuery(window).trigger('resize');	
                    }, 3000);											
                }
            },
            complete: function(){
                dtLMSFrontendUtils.dtLMSAjaxAfterSend(this_item);
            } 
        });
    
    }

    jQuery('.dtlms-courses-listing-holder:not(.dtlms-without-ajax-load)').each(function() {
        if(jQuery(this).length) {
            dtlmsListCourses(0, 1, jQuery(this));
        }
    });


    
    // Courses listing carousel

    function dtlmsCoursesSwiper(this_item) {

        var swiperGallery = [];
        var swiperGalleryOptions = [];
        var swiperIterator = 1;
        this_item.find('.dtlms-courses-swiper-listing').each(function() {

            var $swiperItem = jQuery(this);
            var swiperUniqueId = 'swiperuniqueid-'+swiperIterator;
            swiperGalleryOptions[swiperUniqueId] = [];
            $swiperItem.attr('id', swiperUniqueId);

            // Get swiper options
            var effect = $swiperItem.attr('data-carouseleffect');
            var autoplay = parseInt($swiperItem.attr('data-carouselautoplay'), 10);
            if(autoplay > 0) {
                swiperGalleryOptions[swiperUniqueId]['autoplay'] = autoplay;
            } else {
                swiperGalleryOptions[swiperUniqueId]['autoplay'] = 0;
            }

            var slidesperview = parseInt($swiperItem.attr('data-carouselslidesperview'), 10);
            var loopmode = ($swiperItem.attr('data-carouselloopmode') == 'true') ? true : false;		
            var mousewheelcontrol = ($swiperItem.attr('data-carouselmousewheelcontrol') == 'true') ? true : false;

            var pagination_type = pagination_class = '';
            var bulletpagination = ($swiperItem.attr('data-carouselbulletpagination') == 'true') ? true : false;
            if(bulletpagination) {
                var pagination_class = '.dtlms-swiper-bullet-pagination';
                var pagination_type = 'bullets';
            }

            var spacebetween = parseInt($swiperItem.attr('data-carouselspacebetween'), 10);
            if(spacebetween == '') {
                spacebetween = 0;
            }

            if(slidesperview == 1) {
                var breakpoint_slides_1 = breakpoint_slides_2 = breakpoint_slides_3 = breakpoint_slides_4 = 1;
            } else if(slidesperview == 2) {
                var breakpoint_slides_1 = 2; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 1; var breakpoint_slides_4 = 1;
            } else if(slidesperview == 3) {
                var breakpoint_slides_1 = 3; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 1; var breakpoint_slides_4 = 1;
            } else if(slidesperview >= 4) {
                var breakpoint_slides_1 = 4; var breakpoint_slides_2 = 2; var breakpoint_slides_3 = 1; var breakpoint_slides_4 = 1;
            }							

            // Generate swiper
            swiperGallery[swiperUniqueId] = new Swiper($swiperItem, {
                 
                simulateTouch: true,
                roundLengths: true,
                keyboardControl: true,
                paginationClickable: true,
                autoHeight: true,

                spaceBetween: spacebetween,
                autoplay: autoplay,
                slidesPerView: slidesperview,
                loop:loopmode,
                mousewheelControl: mousewheelcontrol,
                direction: 'horizontal',                

                pagination: {
                    el: pagination_class,
                    type: pagination_type,
                    clickable: true
                },

                effect: effect,
                coverflow: {
                  rotate: 0,
                  stretch: 10,
                  depth: 200,
                  modifier: 1,
                },
                cube: {
                    shadow: true,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94
                },
              
                breakpoints: {
                    1199: {
                        slidesPerView: breakpoint_slides_1,
                    },
                    991: {
                        slidesPerView: breakpoint_slides_2,
                    },
                    767: {
                        slidesPerView: breakpoint_slides_3,
                    },
                    320: {
                        slidesPerView: breakpoint_slides_4,
                    }
                },  

            });
            
            swiperGallery[swiperUniqueId].on('transitionEnd', function () {
                if(swiperGalleryOptions[swiperUniqueId]['autoplay'] > 0) {
                    swiperGallery[swiperUniqueId].startAutoplay();
                }
            });		    	

            var arrowpagination = ($swiperItem.attr('data-carouselarrowpagination') == 'true') ? true : false;

            if(arrowpagination) {

                $swiperItem.find('.dtlms-swiper-arrow-pagination .dtlms-swiper-arrow-prev').on('click', function(e) {			    	
                    var swiperUniqueId = $swiperItem.attr('id');
                    swiperGallery[swiperUniqueId].slidePrev();
                    if(swiperGalleryOptions[swiperUniqueId]['autoplay'] > 0) {
                        swiperGallery[swiperUniqueId].startAutoplay();
                    }
                    e.preventDefault();		
                });

                 $swiperItem.find('.dtlms-swiper-arrow-pagination .dtlms-swiper-arrow-next').on('click', function(e) {
                    var swiperUniqueId = $swiperItem.attr('id');
                    swiperGallery[swiperUniqueId].slideNext();
                    if(swiperGalleryOptions[swiperUniqueId]['autoplay'] > 0 ) {
                        swiperGallery[swiperUniqueId].startAutoplay();
                    }
                    e.preventDefault();	
                });	

            }

            swiperIterator++;

        });	

    }	

}