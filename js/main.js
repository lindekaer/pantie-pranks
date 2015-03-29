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
  var MAX = 60;

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

  function errorHandler() {
    $('#payment-form').append('<div class="alert alert-danger">Something went wrong - please try again.</div>');
  }

  /*
  -----------------------------------------------------------------------------------
  |
  | Typed.js
  |
  -----------------------------------------------------------------------------------
  */

  $(function(){
      $("#typed").typed({
        strings: [
          "Prank a geeky friend", 
          "Prank a married dude",
          "Prank the guy with the anal girlfriend",
          "Prank an annoying colleague",
          "Prank your boss",
          "Prank your roommate",
          "Prank your neighbour",
          "Ignite someones relationship",
          "Release the gagmeister in you"
        ],
        typeSpeed: 10
      });
  });

  /*
  -----------------------------------------------------------------------------------
  |
  | Terms
  |
  -----------------------------------------------------------------------------------
  */

  $('.terms-trigger').on('click', function(e) {
    e.preventDefault();
    $('.terms-text').toggleClass('hidden');
  });

});