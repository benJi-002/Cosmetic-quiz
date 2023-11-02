/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./src/js/services/services.js");

const getCards = () => {
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__["default"])('https://raw.githubusercontent.com/benJi-002/Cosmetic-quiz/main/products.json').then(data => createCards(data));
  function trimTitle(title) {
    if (title.length > 35) {
      return title.slice(0, 35) + '...';
    } else {
      return title;
    }
  }
  ;
  function checkOldPrice(oldPrice) {
    if (oldPrice) {
      return `<div class="tabs_item_price old_price">${oldPrice}</div>`;
    }
    return "";
  }
  ;
  function createCards(data) {
    data.forEach(_ref => {
      let {
        title,
        image,
        price,
        oldPrice
      } = _ref;
      const element = document.createElement('div');
      element.classList.add('tabs_item');
      element.innerHTML = `

                <div class="tabs_item_img">
                    <img src="./assets/icons/heart.svg" alt="#" class="heart">
                    <img src=${image} alt="${title.split(' ', 1)}" class="product">
                </div>
                    <a href="#" class="tabs_item_link">${trimTitle(title)}</a>
                <div class="tabs_item_price-box">
                    ${checkOldPrice(oldPrice)}
                    <div class="tabs_item_price">${price} <span>руб.</span></div>
                </div>
            `;
      document.querySelector('.tabs_wrapper').append(element);
    });
  }
};
const showCards = (tabsBlockSelector, titleSelector, subtitleSelector) => {
  const tabsBlock = document.querySelector(tabsBlockSelector),
    title = document.querySelector(titleSelector),
    subtitle = document.querySelector(subtitleSelector);
  title.textContent = 'Результат';
  subtitle.textContent = 'Мы подобрали для вас наиболее подходящие средства';
  tabsBlock.classList.add('animated');
  tabsBlock.classList.add('slideInRight');
  tabsBlock.classList.remove('hide');
  getCards();
};
/* harmony default export */ __webpack_exports__["default"] = (showCards);

/***/ }),

/***/ "./src/js/modules/quiz.js":
/*!********************************!*\
  !*** ./src/js/modules/quiz.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cards */ "./src/js/modules/cards.js");

const quiz = (circlesSelector, fromSelector, toSelector, questionsSelector, prevSelector, nextSelector, resultSelector, questionsBlockSelector) => {
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
    circles[questionIndex - 1].classList.add('active');
    questions[questionIndex - 1].classList.remove('hide');
  }
  ;
  showQuestions(questionIndex);
  function changeSlides(n) {
    showQuestions(questionIndex += n);
  }
  ;
  function buttonListener() {
    switch (questionIndex) {
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
        (0,_cards__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabs', '.title_header', '.subtitle_header');
      }, 300);
    });
  } catch (e) {}
};
/* harmony default export */ __webpack_exports__["default"] = (quiz);

/***/ }),

/***/ "./src/js/services/services.js":
/*!*************************************!*\
  !*** ./src/js/services/services.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const getResources = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
  }
  return await res.json();
};
/* harmony default export */ __webpack_exports__["default"] = (getResources);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_quiz__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/quiz */ "./src/js/modules/quiz.js");

window.addEventListener('DOMContentLoaded', () => {
  (0,_modules_quiz__WEBPACK_IMPORTED_MODULE_0__["default"])('.circle', '#from', '#to', '.quiz_block', '#back', '#next', '#result', '.questions');
});
}();
/******/ })()
;
//# sourceMappingURL=script.js.map