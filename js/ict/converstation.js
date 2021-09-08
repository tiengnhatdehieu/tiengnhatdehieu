
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