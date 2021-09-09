jQuery.fn.dtLMSToggleItems = function () {

    return this.each(function () {
        const elm = this
        console.log('click dtlms-toggle', { elm });

        // jQuery(elm).toggleClick(function () {
        //     jQuery(this).removeClass('active');  
        // }, function() { 
        //     jQuery(this).addClass('active'); 
        // });
    
        // jQuery(elm).toggleClick(function (e) {
        //     console.log('onclick click ', { elm , e});
        //     jQuery(this).toggleClass('active')
        // }, function (e) {
        //     console.log('fn2',{e})
        // });

        jQuery(elm).on('click', function () {
            jQuery(this).toggleClass('active');
            jQuery(this).next('.dtlms-toggle-content').slideToggle(); 
        });
    });
};

jQuery(document).ready(function ($) {
    jQuery('.dtlms-toggle').dtLMSToggleItems();
});

