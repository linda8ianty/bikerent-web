// ==== INDEX.HTML ==== //

// Modal Registration Session
$('#signUp').click(function(){
    $('#registration-container').addClass('right-panel-active');
});

$('#signIn').click(function(){
    $('#registration-container').removeClass('right-panel-active');
});

// Modal Registration Validation Tooltip (from Bootstrap)
(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();


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
});

// Product Pagination
$(document).ready(function(){
    $('.list-nav-product').click(function(e){
        $('.list-nav-product').removeClass('active');
        $('.list-nav-product').addClass('non-active');
        $(this).addClass('active');
        $(this).removeClass('non-active');
        e.preventDefault();
    });
});

$(document).ready(function(){
    $('.list-nav-category').click(function(e){
        $('.list-nav-category').removeClass('active');
        $('.list-nav-category').addClass('non-active');
        $(this).addClass('active');
        $(this).removeClass('non-active');
        e.preventDefault();
    });
});

$(document).ready(function(){
    $('.list-nav-blog').click(function(e){
        $('.list-nav-blog').removeClass('active');
        $('.list-nav-blog').addClass('non-active');
        $(this).addClass('active');
        $(this).removeClass('non-active');
        e.preventDefault();
    });
});

// ==== LOCATION.HTML ==== //

$(document).ready(function(){
    $('.location-link').click(function(e){
        $('.location-link').removeClass('active text-info');
        $(this).addClass('active text-info');
        e.preventDefault();
    });
});


// ==== PORTFOLIO.HTML ==== //

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

// ==== TODO.HTML ==== //
// Elements
var list = document.getElementById("list");
var input = document.getElementById("input");

// Classes
var CHECK = "fa-check-circle";
var UNCHECK = "fa-circle";
var LINE_THROUGH = "lineThrough";

// Variables
var LIST = null;
var id = null;
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else{
    LIST = [];
    id = 0;
};

// load items to the user's interface
function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

// clear the local storage
$('.clear').click(function(){
    localStorage.clear();
    location.reload();
});

// Show todays date
var options = {weekday : "long", month:"short", day:"numeric", year:"numeric"};
var today = new Date();
var dateToday = today.toLocaleDateString("en-US", options);

// set date
$('#date').html(dateToday);

// if submit button is clicked
$('#btnSubmit').click(function(e){
    e.preventDefault();
    var toDo = input.value;
        
    if(toDo){
        addToDo(toDo, id, false, false);
        
        LIST.push({
            name : toDo,
            id : id,
            done : false,
            trash : false
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
    }
    input.value = "";
});

// add to do function
function addToDo(toDo, id, done, trash){
    if(trash){ return; }
    
    var DONE = done ? CHECK : UNCHECK;
    var LINE = done ? LINE_THROUGH : "";
    
    var item = `<li class="item">
                    <i class="far ${DONE} circle" status="complete" id="${id}" data-toggle="tooltip" data-placement="left" title="mark as completed"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-trash-alt trash" status="delete" id="${id}" data-toggle="tooltip" data-placement="right" title="delete this list"></i>
                  </li>
                `;
    
    var position = "beforeend";
    list.insertAdjacentHTML(position, item);
};


// complete to do
function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    
    LIST[element.id].done = LIST[element.id].done ? false : true;
};

// remove to do
function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    
    LIST[element.id].trash = true;
};

$('#list').click(function(event){
    var element = event.target;
    var elementStatus = element.attributes.status.value;
    
    if(elementStatus == "complete"){
        completeToDo(element);
    }else if(elementStatus == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});















