
jQuery.fn.jpQuestion = function () {
    function answerEffect(elm) {
        const answerGroup = jQuery(elm).parents('.answer-group');
        const formGroup = jQuery(elm).parents('.form-check');

        var effect = document.createElement('div');
        
        if (formGroup.hasClass('correct')) {
            effect.className = 'answer-effect correct';
            formGroup.find('.form-check-label').addClass('text-success');
        } else {
            effect.className = 'answer-effect incorrect';
            formGroup.find('.form-check-label').addClass('text-danger');
        }

        effect.style.left = '-30px';
        effect.style.top = '-30px';
   
        formGroup.append(effect);
        jQuery(effect).animate({ top: -50, opacity: 0 }, 800, function () { jQuery(this).remove(), "easeOutExpo" });
        jQuery('input[type=radio]', answerGroup).prop("disabled", true);

        answerGroup.find('.form-check.correct .form-check-label').addClass('text-success')

    }

    return this.each(function () {
        const radios = jQuery('input[type=radio]', this).on('click', function () {
            answerEffect(this)
        });
    });
};


jQuery(document).ready(function ($) {
    jQuery('.conversation-chat').jpConverstation();
});

jQuery.fn.jpConverstation = function () {
    function chatEvents(chatBlockElm) {
        const langCtr = jQuery('.chat-ctr-trans', chatBlockElm);
        langCtr.click(function (e) {
            jQuery('.chat-trans, .human-name .hira-name', chatBlockElm).toggleClass('d-none');
            langCtr
                .toggleClass('btn-primary')
                .toggleClass('btn-success')
                ;
        });
    }

    return this.each(function () {
        chatEvents(this)
    });
};

jQuery(document).ready(function ($) {
    jQuery('.conversation-chat').jpConverstation();
});
/*!
 * jQuery Toggle Click - v1.0.0 - 2020-11-18
 * Copyright DesignThemes
 */
(function( jQuery, window, undefined ) {
    // "use strict";

    var oldToggle = jQuery.fn.toggleClick;

    jQuery.fn.toggleClick = function( fn, fn2 ) {

        // Don't mess with animation or css toggles
        if ( !jQuery.isFunction( fn ) || !jQuery.isFunction( fn2 ) ) {
            return oldToggle.apply( this, arguments );
        }        
    
        // Save reference to arguments for access in closure
        var args = arguments,
            guid = fn.guid || jQuery.guid++,
            i = 0,
            toggler = function( event ) {
                // Figure out which function to execute
                var lastToggle = ( jQuery._data( this, "lastToggle" + fn.guid ) || 0 ) % i;
                jQuery._data( this, "lastToggle" + fn.guid, lastToggle + 1 );
    
                // Make sure that clicks stop
                event.preventDefault();
    
                // and execute the function
                return args[ lastToggle ].apply( this, arguments ) || false;
            };
    
        // link all the functions, so any of them can unbind this click handler
        toggler.guid = guid;
        while ( i < args.length ) {
            args[ i++ ].guid = guid;
        }
    
        return this.click( toggler );
    };

})( jQuery, window );
jQuery.fn.dtLMSToggleItems = function () {

    // if (jQuery('.dtlms-toggle').length) {

       
    
    // }

    return this.each(function () {
        const elm = this
        jQuery(elm).toggleClick(function () {
            jQuery(this).removeClass('active');  
        }, function() { 
            jQuery(this).addClass('active'); 
        });
    
        jQuery(elm).on('click',function(){ 
            jQuery(this).next('.dtlms-toggle-content').slideToggle(); 
        });
    });
};

jQuery(document).ready(function ($) {
    jQuery('.dtlms-toggle').dtLMSToggleItems();
});

