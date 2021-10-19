
jQuery.fn.jpConverstation = function () {
    function chatEvents(chatBlockElm) {
        
        const langCtr = jQuery('.chat-ctr-trans', chatBlockElm);
        //console.log('jpConverstation.chatEvents', { chatBlockElm, langCtr });
        langCtr.unbind('click').click(function (e) {
            console.log(`===== btn click`);
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