import quiz from "./modules/quiz";

window.addEventListener('DOMContentLoaded', () => {
    
    quiz('.circle', '#from', '#to', '.quiz_block', '#back', '#next', '#result', '.questions');

});