var isContactsValid = false;
var isMessageValid = false;

$(document).ready(function() {
    
    // Click listener for add contact button
    jQuery('#add-contact').click(function() {
        
        // Toggle visiblity of add contact controls
        if (jQuery('#form-field-contact').css('display') === 'none') {
            jQuery('#form-field-contact').css('display','block');
            jQuery('#confirm-contact').css('display','block');
            jQuery('#form-field-contact').focus();
        } else if (jQuery('#form-field-contact').css('display') === 'block') {
            jQuery('#form-field-contact').removeAttr('style');
            jQuery('#confirm-contact').removeAttr('style');
            jQuery('#email-invalid').css('opacity', 0);
        }
    });
    
    // Click listener for confirm contact control
    jQuery('#confirm-contact').click(function() {
        
        // Email address validation
        if (jQuery('#form-field-contact').val().length > 5 && new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i).test($('#form-field-contact').val())) {
            jQuery('#email-invalid').css('opacity', 0);
            jQuery('#contact-invalid').css('opacity', 0);
            jQuery('.contacts-container').append('<div class="email-box">' + jQuery('#form-field-contact').val() + '</div>');
            jQuery('#form-field-contact').val('');
            jQuery('#form-field-contact').focus();
        } else {
            jQuery('#contact-invalid').css('opacity', 0);
            jQuery('#email-invalid').css('opacity', 1);
        }
    });
    
    // Message validation
    jQuery('#send-button').click(function() {
        
        // Validate if contacts are not empty
        if (jQuery('.email-box').val() === undefined) {
            jQuery('#email-invalid').css('opacity', 0);
            jQuery('#contact-invalid').css('opacity', 1);
            isContactsValid = false;
        } else {
            jQuery('#contact-invalid').css('opacity', 0);
            isContactsValid = true;
        }
        
        // Validate if message is not less than 50 characters long
        if (jQuery('#form-field-message').val().length < 50) {
            jQuery('#message-invalid').css('opacity', 1);
            isMessageValid = false;
        } else if (jQuery('#form-field-message').val().length >= 50) {
            jQuery('#message-invalid').css('opacity', 0);
            isMessageValid = true;
        }
        
        // Finalizing form
        if (isContactsValid && isMessageValid) {
            jQuery('#message-sent').css('opacity', 1);
            jQuery('#form-field-contact').removeAttr('style');
            jQuery('#confirm-contact').removeAttr('style');
            jQuery('#form-field-contact').val('');
            jQuery('#form-field-subject').val('');
            jQuery('#form-field-message').val('');
            jQuery('.email-box').remove();
        }
    });
});



