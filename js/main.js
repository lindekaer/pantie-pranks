$(document).on('ready', function() {

  /*
  -----------------------------------------------------------------------------------
  |
  | Limited characters
  |
  -----------------------------------------------------------------------------------
  */

  var $msg = $('textarea[name="client-msg"]');
  var $progress = $('.progress-bar-success');
  var MAX = 100;

  $msg.on('keyup', keystroke);

  function keystroke(e) {
    var length = $(this).val().length;
    var fill = Math.ceil((length/MAX) * 100);
    $progress.css('width', fill + '%');
    $progress.find('span').text(length);
  }

  /*
  -----------------------------------------------------------------------------------
  |
  | Set unique identifier for client
  |
  -----------------------------------------------------------------------------------
  */

  $('[name="invoice"]').val(genUUID());

  /*
  -----------------------------------------------------------------------------------
  |
  | Submit form
  |
  -----------------------------------------------------------------------------------
  */

  $('#payment-form').on('submit', function(e) {
    var uniqueIdentifier = $('[name="client-name"]');
    $('[name="client_info]').val(uniqueIdentifier);
    $.ajax({
      method: 'POST',
      url: 'http://77.66.112.12:3000/add',
      data: $(this).serialize()
    }).
    success(successHandler)
    error(errorHandler);
  });

  /*
  -----------------------------------------------------------------------------------
  |
  | Utility methods
  |
  -----------------------------------------------------------------------------------
  */

  function genUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function successHandler() {}

  function errorHandler() {}

});