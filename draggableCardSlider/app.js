const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = document.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft;

let cardPerview = Math.round(carousel.offset / firstCardWidth);

carouselChildrens.slice(-cardPerview).reverse().forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outherHTML);
});

carouselChildrens.slice(0, cardPerview).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outherHTML);
});

arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging")
}

const infiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        console.log("You've reached to the left end");
    } else if(carousel.scrollLeft === carousel.scrollWidth - carousel.offsetWidth) {
        console.log("You've reached to the right end");
    }
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);