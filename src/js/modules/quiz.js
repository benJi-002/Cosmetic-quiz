import showCards from "./cards";

const quiz = (
    circlesSelector, 
    fromSelector, 
    toSelector, 
    questionsSelector, 
    prevSelector, 
    nextSelector, 
    resultSelector,
    questionsBlockSelector
) => {
    
    let questionIndex = 1;
    const questions = document.querySelectorAll(questionsSelector),
        prevBtn = document.querySelector(prevSelector),
        nextBtn = document.querySelector(nextSelector),
        resultBtn = document.querySelector(resultSelector),
        circles = document.querySelectorAll(circlesSelector),
        from = document.querySelector(fromSelector),
        to = document.querySelector(toSelector),
        questionsBlock = document.querySelector(questionsBlockSelector);


    function showQuestions() {

        from.textContent = questionIndex;
        to.textContent = questions.length;

        questions.forEach(item => {
            item.classList.add('animated');
            item.classList.add('hide');
        });

        circles.forEach(item => {
            item.classList.remove('active');
        });

        circles[questionIndex - 1].classList.add('active')
        questions[questionIndex - 1].classList.remove('hide');
    };

    showQuestions(questionIndex);

    function changeSlides(n) {
        showQuestions(questionIndex += n);
    };

    function buttonListener() {

        switch(questionIndex) {
            case 1:
                if (prevBtn.classList.contains('show')) {
                    
                    prevBtn.classList.remove('show');
                } 
                break;
            case 2: 
                if (resultBtn.classList.contains('show')) {
                    resultBtn.classList.remove('show');
                } 
                prevBtn.classList.add('show');
                nextBtn.classList.add('show');
                break;
            case 3: 
                nextBtn.classList.remove('show');
                resultBtn.classList.add('show');
                break;
        }
    }

    try {

        nextBtn.addEventListener('click', () => {
            changeSlides(1);
            buttonListener();
            questions[questionIndex - 1].classList.remove('slideInLeft');
            questions[questionIndex - 1].classList.add('slideInRight');
            
            
        });
        
        prevBtn.addEventListener('click', () => {
            changeSlides(-1);
            buttonListener();
            questions[questionIndex - 1].classList.remove('slideInRight');
            questions[questionIndex - 1].classList.add('slideInLeft');
            
        });

        resultBtn.addEventListener('click', () => {
            questionsBlock.classList.add('animated');
            questionsBlock.classList.add('slideOutLeft');
            setTimeout(() => {
                questionsBlock.classList.add('hide');
            }, 300);
            setTimeout(() => {
                showCards('.tabs', '.title_header', '.subtitle_header');
            }, 300);
            
        });

    } catch(e) {}

};

export default quiz;