;(function($){
	$.loginHandler = function(options) {
		var settings = $.extend({
			'option': 'value'
		}, options||{} );

        function overlayHandlerEvent(){
            jQuery( 'body' ).delegate( '.dtlms-login-form-overlay', 'click', function(e){  
                const overlay = this;
                jQuery('.dtlms-login-form-container').fadeOut('d-none',function(){
                    console.log(`=====`, {overlay})
                    jQuery(overlay).remove();    
                });
                e.preventDefault;
            });
        }
    
        function eventsHandler_old(){
            jQuery( 'body' ).delegate( '.dtlms-login-link', 'click', function(e){  
                jQuery.ajax({
                    type: "POST",
                    url: lmsfrontendobject.ajaxurl,
                    data:
                    {
                        action: 'dtlms_show_login_form_popup',
                    },
                    success: function (response) {
    
                        jQuery('body').find('.dtlms-login-form-container').remove();
                        jQuery('body').find('.dtlms-login-form-overlay').remove();
                        jQuery('body').append(response);	
    
                        jQuery('#user_login').focus();
    
                    }
                });	
    
                e.preventDefault();
                
            });
        }
    
        function eventsHandler(){
            jQuery('<div />',{class:"dtlms-login-form-overlay"}).appendTo('body');
            jQuery('.dtlms-login-form-container').removeClass('d-none').show();
            jQuery('#user_login').focus();
            
        }

        jQuery( 'body' ).delegate( '.dtlms-login-link', 'click', function(e){
            console.log(`==== event click button`)
            eventsHandler();
            e.preventDefault();
        });
        overlayHandlerEvent();
	}
})(jQuery);

// jQuery.fn.loginHandler = function () {

//     return this.each(function () {
//         const btn = this;
//         afterLogin();
//         jQuery( 'body' ).delegate( btn, 'click', function(e){
//             console.log(`==== event click`, {btn})
//             eventsHandler();
//             e.preventDefault();
//         });
//     });
// };

// jQuery(document).ready(function ($) {
//     jQuery( 'body' ).delegate( '.dtlms-login-link', 'click', loginHandler);
// });

