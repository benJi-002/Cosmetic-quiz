import getResources from '../services/services'

const getCards = () => {

    getResources('https://raw.githubusercontent.com/benJi-002/Cosmetic-quiz/main/products.json')

        .then(data => createCards(data));

    function trimTitle(title) {
        if (title.length > 35) {
            return title.slice(0, 35) + '...';
        } else {
            return title;
        }
    };

    function checkOldPrice(oldPrice) {
        if (oldPrice) {
            return `<div class="tabs_item_price old_price">${oldPrice}</div>`
        }
        return "";
    };

    function createCards(data) {
        data.forEach(({title, image, price, oldPrice}) => {
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

export default showCards;