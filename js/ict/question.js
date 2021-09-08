
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