$(document).ready(function(){
    
  $(".templates_slider").slick({
      centerMode: true,
      slidesToShow: 3,
      swipeToSlide: true,
      variableWidth: true,
      focusOnSelect: true,
      dots: true,
      dotsClass: "templates-dots",
      initialSlide: 2,
      infinite: false
  });
    
  $(window).scroll(function(){
      if ($(window).scrollTop() > 400) {
          $('.wrapper').addClass('top-fix');
      } else {
          $('.wrapper').removeClass('top-fix')
      }
  });
    
    
  new TypeIt('#hello-type', {
        speed: 80,
        strings: ['в новом формате', 'которые удивляют!','которые запомнят)'],
        loop: true,
      breakLines: false,
      nextStringDelay: 2500
  }).go();
    
});

function checkingInput(input) {  
    if (input.value !== '') {
        input.nextElementSibling.classList.add('input-full')
    } else {
        input.nextElementSibling.classList.remove('input-full')
    }
}

$('.to-go').click( function(){ 
	var scroll_el = $(this).attr('href'); 
        if ($(scroll_el).length != 0) { 
	    $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 0 }, 1000); 
        }
	    return false;
    });

function openTemplate() {
    var groom = document.getElementById('groom').value,
        bride = document.getElementById('bride').value,
        url = 'templates/index.html?template=template-1&groom=' + groom + '&bride=' + bride;
    
    if (groom && bride) {
        window.open(url, "_self");
        $('.validation').hide();
        $('#groom').removeClass('invalid');
        $('#bride').removeClass('invalid');
    } else {
        $('.validation').show();
        
        if (!groom) {
            $('#groom').addClass('invalid');
        }
        
        if (!bride) {
            $('#bride').addClass('invalid');
        }
    }
   
    
}

function viewTemplate(template) {
    url = 'templates/index.html?template=' + template;
    window.open(url, "_self");
    
}

var overlay = $('#overlay'); 
    var open_modal = $('.open-modal');
    var close = $('.modal-close, #overlay, .close-modal');
    var modal = $('.modal');

     open_modal.click( function(event){
         event.preventDefault();
         var div = $(this).attr('data-modal');
         var header = $(this).attr('data-header');
         overlay.fadeIn(400,
             function(){
             $('#call-h3').text(header);
                 $(div)
                     .css('display', 'block') 
                     .animate({opacity: 1, top: '50%'}, 200); 
                
                
         });
     });

     close.click( function(){
            modal
             .animate({opacity: 0, top: '45%'}, 200,
                 function(){ 
                     $(this).css('display', 'none');
                     overlay.fadeOut(400);
                 }
             );
     });

$('#call-back-form').submit(function(e){
        e.preventDefault();
        $.ajax({
          url: "/callback.php",
          type: "POST",
          data: $('#call-back-form').serialize(),
          success: function(response) {
            $('#call-back').animate({opacity: 0, top: '45%'}, 200, function(){$(this).css('display', 'none');}); 
            $('#ok-send').css('display', 'block').animate({opacity: 1, top: '50%'}, 200); 
          },
          error: function(response) {
            
         }
        });
        
        $(':input','#call-back-form')
         .not(':button, :submit, :reset, :hidden')
         .val('')
         .removeAttr('selected');               
                
        });

$('#form-question').submit(function(e){
        e.preventDefault();
        $.ajax({
          url: "/contact.php",
          type: "POST",
          data: $('#form-question').serialize(),
          success: function(response) {
            $('#overlay').fadeIn(400);
            $('#ok-send').css('display', 'block').animate({opacity: 1, top: '50%'}, 200);
          },
          error: function(response) {
            
         }
        });
        
        $(':input','#form-question')
         .not(':button, :submit, :reset, :hidden')
         .val('')
         .removeAttr('selected');               
                
        });
