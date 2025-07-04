const friends = [
    {
        id: 1,
        name: "Ngọc",
        age: 18,
        address: "Hà Nội",
        img: "./assets/img/chau-2-1735655558-331-width740height818.jpg"
    },
    {
        id: 2,
        name: "Lê",
        age: 20,
        address: "HCM",
        img: "./assets/img/diem-danh-12-hot-girl-noi-bat-nhat-nam-2019-docx-1576850955802.webp"
    },
    {
        id: 3,
        name: "Linh",
        age: 17,
        address: "Đà Nẵng",
        img: "./assets/img/g1.webp"
    },
    {
        id: 4,
        name: "Huyền",
        age: 27,
        address: "Hà Giang",
        img: "./assets/img/images.jfif"
    }
]
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const container = $(".tinder-container");
const nopeBtn = $(".nope-btn");
const likeBtn = $(".like-btn");

console.log(likeBtn, nopeBtn)
// console.log(container);

let currentIndex = friends.length - 1;
let isTouching = false;
let startX = 0;
let startY = 0;
const threshold = 50;


function getCardElement() {
    const friend = friends[currentIndex];
    const cardElement = $(`[data-id="${friend.id}"]`);
    // console.log(cardElement);
    return cardElement;
}

function showStatus(card, type, show) {
    card.querySelector(`.${type}`).style.opacity = show ? 1 : 0;
}

container.addEventListener("pointerdown", function (e) {
    const card = e.target.closest('.card');
    if (!card) return;

    card.setPointerCapture(e.pointerId);
    // console.log("down");
    isTouching = true;
    startX = e.clientX;
    startY = e.clientY;
    card.style.transition = 'none';

});



container.addEventListener("pointermove", function (e) {
    // console.log("move")
       
    if (!friends.length) return;
    const cardEle = getCardElement();
    // reset opacity 
    showStatus(cardEle, "nope", false);
    showStatus(cardEle, "like", false);
    if (!isTouching) return;
    const distanceX = e.clientX - startX;
    const distanceY = e.clientY - startY;
    // set new status 
    if (distanceX > 0) {
        showStatus(cardEle, "like", true);
    } else {
        showStatus(cardEle, "nope", true);
    }
    cardEle.style.transform = `translate(${distanceX}px,${distanceY}px) rotate(${distanceX * 0.06}deg)`


})

container.addEventListener("pointerup", function (e) {
    // console.log("up")
    if (!friends.length) return;
    const cardEle = getCardElement();
    const distanceX = e.clientX - startX;
    if (Math.abs(distanceX) > threshold) {
        if (distanceX < 0) {
            cardEle.style.transform = `translate(-1000px,-60px) rotate(-25deg)`;
            cardEle.style.opacity = 0;
            setTimeout(() => {
                cardEle.remove();
                friends.pop();
                currentIndex = friends.length - 1;
            }, 350);
           
        } else {
            cardEle.style.transform = `translate(1000px,-60px) rotate(25deg)`;
            cardEle.style.opacity = 0;
            setTimeout(() => {
                cardEle.remove();
                friends.pop();
                currentIndex = friends.length - 1;
            }, 350);
        }
    } else {
        cardEle.style.transform = 'translate(0,0)';
    }
    isTouching = false;
    container.releasePointerCapture(e.pointerId);
    cardEle.style.transition = 'transform .35s ease, opacity .35s ease';
    showStatus(cardEle, "nope", false);
    showStatus(cardEle, "like", false);

})

// handle button
nopeBtn.addEventListener("click", (e) => {
    if (!friends.length) return;
    const cardEle = getCardElement();
    cardEle.style.transform = `translate(-1000px,-60px) rotate(-25deg)`;
    cardEle.style.opacity = 0;
    setTimeout(() => {
        cardEle.remove();
        friends.pop();
        currentIndex = friends.length - 1;
    }, 350);
    cardEle.style.transition = 'transform .5s ease, opacity .5s ease';
    showStatus(cardEle, "nope", true);
})

likeBtn.addEventListener("click", (e) => {
    if (!friends.length) return;
    const cardEle = getCardElement();
    cardEle.style.transform = `translate(1000px,-60px) rotate(25deg)`;
    cardEle.style.opacity = 0;
    setTimeout(() => {
        cardEle.remove();
        friends.pop();
        currentIndex = friends.length - 1;
    }, 350);
    cardEle.style.transition = 'transform .5s ease, opacity .5s ease';
    showStatus(cardEle, "like", true);
})

function renderFriends() {
    friends.forEach((friend, index) => {
        const item = document.createElement('div');
        item.className = "card";

        const img = document.createElement("img");
        img.src = friend.img;
        img.draggable = false;
        item.appendChild(img);

        const info = document.createElement("div");
        info.className = "info";
        const nameAge = document.createElement('h2');
        nameAge.textContent = `${friend.name}, ${friend.age}`;
        const address = document.createElement("P");
        address.textContent = friend.address;
        info.append(nameAge, address);
        item.append(info);

        const nopeSpan = document.createElement("span");
        nopeSpan.classList.add("nope", "decision");
        nopeSpan.textContent = "NOPE";
        const likeSpan = document.createElement("span");
        likeSpan.classList.add("like", "decision");
        likeSpan.textContent = "LIKE";
        item.append(likeSpan, nopeSpan);

        item.dataset.id = friend.id;
       
        container.appendChild(item);

    })
}

renderFriends();