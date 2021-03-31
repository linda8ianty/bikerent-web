// ==== PORTFOLIO ==== //

$(document).ready(function(){
    $('.imgSmall').click(function(){
        var text = $(this).attr('src');
        $('.imgSmall').removeClass('img-thumbnail');
        $(this).addClass('img-thumbnail');
        $('#imgBig').attr('src', text);
    });    
});

var imgBig = document.getElementById("imgBig");
var imgSmall = document.getElementsByClassName("imgSmall");
var nextButton = document.getElementById("portfolio-next");
var prevButton = document.getElementById("portfolio-prev");
var count = 0;

for(var i = 0; i < imgSmall.length; i++) {
    imgSmall[i].onclick = function() {
        count = this.alt;
    }

    // button next
    nextButton.onclick = function() {
        count++;
        if(count >= imgSmall.length) {
            count = 0;
        }
        if(count > 0) {
            imgSmall[count-1].classList.remove('img-thumbnail');
        }else{
            imgSmall[imgSmall.length-1].classList.remove('img-thumbnail');
        }

        imgSmall[count].classList.add('img-thumbnail');
        imgBig.src = imgSmall[count].src;
    }
    // button prev
    prevButton.onclick = function() {
        count--;
        if(count < 0) {
            count = imgSmall.length-1;
        }
        
        if(count < imgSmall.length-1) {
            imgSmall[count+1].classList.remove('img-thumbnail');
        }else{
            imgSmall[0].classList.remove('img-thumbnail');
        }
        imgSmall[count].classList.add('img-thumbnail');
        imgBig.src = imgSmall[count].src; 
    }
}


//OWL CAROUSEL
// owl carousel index.html
$('.owl-home').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:2
        },
        900:{
            items:3
        }
    }
})

// owl carousel portfolio.html
$('.owl-brand').owlCarousel({
    loop:true,
    margin:10,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    responsive:{
        0:{
            items:1
        },
        600:{
            items:4
        },
        900:{
            items:6
        }
    }
})

//==== MODAL ===//
// Modal Registration Session
var signUpButton = document.getElementById('signUp');
var signInButton = document.getElementById('signIn');
var container = document.getElementById('container');

signUpButton.addEventListener('click', function() {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', function() {
	container.classList.remove("right-panel-active");
});

// // Tooltip
// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

// // Registration Modal Form

// // Example starter JavaScript for disabling form submissions if there are invalid fields
// (function() {
//     'use strict';
//     window.addEventListener('load', function() {
//       // Fetch all the forms we want to apply custom Bootstrap validation styles to
//       var forms = document.getElementsByClassName('needs-validation');
//       // Loop over them and prevent submission
//       var validation = Array.prototype.filter.call(forms, function(form) {
//         form.addEventListener('submit', function(event) {
//           if (form.checkValidity() === false) {
//             event.preventDefault();
//             event.stopPropagation();
//           }
//           form.classList.add('was-validated');
//         }, false);
//       });
//     }, false);
// })();


