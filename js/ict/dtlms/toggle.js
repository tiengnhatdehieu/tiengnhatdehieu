jQuery.fn.dtLMSToggleItems = function () {
    return this.each(function () {
        const elm = this
   
        jQuery(elm).on('click', function () {
            jQuery(this).toggleClass('active');
            jQuery(this).next('.dtlms-toggle-content').slideToggle(); 
        });
    });
};

jQuery.fn.collapseEvents = function () {
    return this.each(function () {
        const collapse = jQuery(this);
        const toggle = collapse.parent('div').find('.btn-collapse');
        const itemListGroup = collapse.parents('.list-group-item');
        const anchors = jQuery('a', itemListGroup).not(".btn-collapse");
        if( collapse.hasClass('show')){
            toggle.removeClass('collapsed');
        } else {
            toggle.addClass('collapsed');
        }
        if(toggle.attr('href')==='#'){
            toggle.attr('href', `#${this.id}`)
        }

        itemListGroup.find('.badge[data-count="item"]').html(anchors.length)
    });
};

jQuery(document).ready(function ($) {
    jQuery('.dtlms-toggle').dtLMSToggleItems();
    jQuery('.collapse').collapseEvents();
});

