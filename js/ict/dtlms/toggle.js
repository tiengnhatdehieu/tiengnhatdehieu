jQuery.fn.dtLMSToggleItems = function () {

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

