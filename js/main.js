
// Show Case js Start

const showCaseTrack = document.querySelector('.showCase__track')
const showCaseSlides = Array.from(showCaseTrack.children);
const showCaseBtnNav = document.querySelector('.showCase__btnNav')
const showCaseBtns = Array.from(showCaseBtnNav.children);

showCaseBtnNav.addEventListener('click',(e)=>{

    const showCaseTargetBtn = e.target.closest('.showCase__btn');

    if(!showCaseTargetBtn){return};

    const currentShowCaseSlide = showCaseTrack.querySelector('.active');
    const currentShowCaseBtn = showCaseBtnNav.querySelector('.active');

    const showCaseTargetBtnIndex = showCaseBtns.findIndex((showCaseBtn)=> showCaseBtn === showCaseTargetBtn);

    const showCaseTargetSlide = showCaseSlides[showCaseTargetBtnIndex];

    console.log(showCaseTargetSlide);

    currentShowCaseSlide.classList.remove('active');
    currentShowCaseBtn.classList.remove('active');
    showCaseTargetSlide.classList.add('active');
    showCaseTargetBtn.classList.add('active');

})

// Show case js End

