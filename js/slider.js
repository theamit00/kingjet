const carousel = document.querySelector(".carousel");
const carouselTrack = document.querySelector(".carousel__track");
const slides = Array.from(carouselTrack.children); // Array.from() will convert array like structure into fully functional array
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);

// const slideSize = slides[0].getBoundingClientRect();
//      getBoundingClientRect() method returns a DOMRect object providing 
//      information about the size of an element and 
//      its position relative to the viewport.

// const slideWidth = slideSize.width;
// -----------OR---------------

const slideWidth = slides[0].getBoundingClientRect().width;
// console.log(slideWidth);



//  THINGS TO DO
// 1. Arrange the slides next to each other

// slides[0].style.left = `${slideWidth * 0}px`;
// slides[1].style.left = `${slideWidth * 1}px`;
// slides[2].style.left = `${slideWidth * 2}px`;

// -----------OR---------------

// for(let i = 0; i < slides.length; i++){
//     slides[i].style.left = `${slideWidth * i}px`;
// }

// -----------OR---------------

const setSlidePosition = (slide, index) => {        // for improving my good practices
    slide.style.left = `${slideWidth * index}px`;
}

slides.forEach(setSlidePosition);


const moveSlide = (carouselTrack, currentSlide, targetSlide) => {

    carouselTrack.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


const updateDot = (currentDot, targetDot) => {

    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}


const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {

    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }
    else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}




// 1. WHEN I CLICK LEFT ARROW, MOVE SLIDES TO THE LEFT


prevButton.addEventListener('click', () => {

    const currentSlide = carouselTrack.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    

    // move to the prev slide
    
    moveSlide(carouselTrack, currentSlide, prevSlide);
    
    
    //UPDATING DOTS ACCORDING TO THE SLIDE
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    
    updateDot(currentDot, prevDot);
    
    // HANDLING HIDDEN/VISIBLE FUNCTIONALITY OF ARROWS
    const prevIndex = slides.findIndex((slide) => slide === prevSlide);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);

})




// 2. WHEN I CLICK RIGHT ARROW, MOVE SLIDES TO THE RIGHT.


nextButton.addEventListener('click', (e) => {

    const currentSlide = carouselTrack.querySelector('.current-slide'); // instead of finding from whole doument this will find only from carouselTrack.
    const nextSlide = currentSlide.nextElementSibling;
    // const kitnaMoveKarnaH = nextSlide.style.left;

    // Move to the next slide

    // carouselTrack.style.transform = `translateX(-${kitnaMoveKarnaH})`; // yaha expected output nahi aaya tha toh maine css file mai jaakar .crousel__track mai changes kiye
    // currentSlide.classList.remove('current-slide');
    // nextSlide.classList.add('current-slide'); // next slide ko current slide bana do

    // ------------------- OR ---------------------

    moveSlide(carouselTrack, currentSlide, nextSlide);

    // after doing all these things left arrow is not visible
    // I go back to the css file and
    // make some changes in .carousel__track-container


    //UPDATING DOTS ACCORDING TO THE SLIDE
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    updateDot(currentDot, nextDot);

    // HANDLING HIDDEN/VISIBLE FUNCTIONALITY OF ARROWS
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
})




// 3. WHEN I CLICK THE NAV INDICATORS, MOVE TO THAT SLIDE.


// here I applied click event on every dot at a time
// instead of applying individually becz events are heavy this gives more load
dotsNav.addEventListener('click', (e) => {

    const targetDot = e.target.closest('button');
    // CLOSEST => the Element interface traverses the element and its parents
    // (heading toward the document root) until
    // it finds a node that matches the specified CSS selector

    // console.log('test1');
    // if(!targetDot) return; // if this give falsy value function will end
    // test2 will not run
    // console.log('test2');

    if (!targetDot) return;

    const currentSlide = carouselTrack.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');

    // i want the index of the dot i have clicked
    const targetDotIndex = dots.findIndex((dot) => dot === targetDot);
    // FINDEINDEX() => The findIndex() method returns the index of the first element
    // in an array that satisfies the provided testing function.
    // If no elements satisfy the testing function, -1 is returned.
    const targetSlide = slides[targetDotIndex];


    moveSlide(carouselTrack, currentSlide, targetSlide);

    // currentDot.classList.remove('current-slide');
    // targetDot.classList.add('current-slide');

    // -----------------------OR-------------------------

    updateDot(currentDot, targetDot);


    // HANDLING HIDDEN/VISIBLE FUNCTIONALITY OF ARROWS

        // if(targetDotIndex === 0){
        //     prevButton.classList.add('is-hidden');
        //     nextButton.classList.remove('is-hidden');
        // }
        // else if(targetDotIndex === slides.length-1){
        //     prevButton.classList.remove('is-hidden');
        //     nextButton.classList.add('is-hidden');
        // }
        // else{
        //     prevButton.classList.remove('is-hidden');
        //     nextButton.classList.remove('is-hidden');
        // }

    // ------------------------OR-----------------------------

    hideShowArrows(slides, prevButton, nextButton, targetDotIndex);

})

// 4. AUTOMATICALLY MOVE SLIDES

let intervalId = setInterval(automatic,4000)

function automatic(){

    let currentSlide = carouselTrack.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling;
    let currentDot = dotsNav.querySelector('.current-slide');
    let nextDot = currentDot.nextElementSibling;
    
    if(currentSlide === slides[slides.length-1]){
        
        nextSlide = slides[0];
        nextDot = dots[0];
    }
    moveSlide(carouselTrack, currentSlide, nextSlide);

    //UPDATING DOTS ACCORDING TO THE SLIDE

    updateDot(currentDot, nextDot);
    
    // HANDLING HIDDEN/VISIBLE FUNCTIONALITY OF ARROWS
    const nextIndex = slides.findIndex((slide) => slide === nextSlide);
    hideShowArrows(slides, prevButton, nextButton, nextIndex);
    
}

carousel.addEventListener('click',(e)=>{

    if(e.target === nextButton){
        clearInterval(intervalId);
        setTimeout(setInterval(automatic,4000),2000)
        return;
    }
    
    else if(e.target === prevButton){
        clearInterval(intervalId);
        setTimeout(setInterval(automatic,4000),2000)
        return;
    }

    
})


