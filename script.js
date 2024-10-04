// const gameEnd = document.querySelector('.game__end');
// const input = document.querySelector('.input');
// const time = document.querySelector('.time');
// const btn = document.querySelector('.btn');
// const box = document.querySelector('.game__block');

// const divEnd     = document.createElement('div')
// const divEnd_h2  = document.createElement('h2')
// const divEnd_btn = document.createElement('button');

// let interval = 0
// let gameTime = 0
// let score = 0

// btn.addEventListener('click', () => {
//     if (input.value > 0) {
//         gameTime = input.value
//         input.value = ''
//         btn.disabled = true
//         timer()
//     }
// })

// box.addEventListener('click', (e) => {
//     if (e.target.classList.contains('item')) {
//         score++
//         e.target.remove()
//         createItem()
//     }
// })

// function timer() {
//     time.innerHTML = gameTime
//     interval = setInterval(() => {
//         if (gameTime == 0) {
//             endGame()
//         }
//         else {
//             time.innerHTML = --gameTime
//         }
//     }, 1000)
//     createItem()
// }

// function endGame() {
//     clearInterval(interval)
//     endText()
// }

// function createItem() {
//     let item = document.createElement('div')
//     item.classList.add('item')
//     let size = random(20, 100)

//     let { width, height } = box.getBoundingClientRect()

//     let leftValue = random(0, width - size)
//     let topValue = random(0, height - size)

//     item.style.width = size + 'px'
//     item.style.height = size + 'px'
//     item.style.top = topValue + 'px'
//     item.style.left = leftValue + 'px'
//     item.style.background = randColor()

//     box.append(item)
// }
// divEnd_btn.addEventListener('click', () => {
//     btn.disabled = false
//     box.innerHTML = ''
// })

// function endText() {
//     divEnd.classList.add('game__end')
//     divEnd_h2.textContent  = `Вы набрали ${score == 1 ? '1 балл' : score + ' баллов' }`;
//     divEnd_btn.textContent = 'Начать заново';
    
//     divEnd.append(divEnd_h2, divEnd_btn)
    
//     box.innerHTML = ''
//     box.append(divEnd)
// }

// function random(min, max) {
//     return Math.floor(Math.random() * (max + 1 - min) + min)
// }

// function randColor() {
//     let r = Math.floor(Math.random() * 256)
//     let g = Math.floor(Math.random() * 256)
//     let b = Math.floor(Math.random() * 256)
//     return `rgb(${r}, ${g}, ${b})`
// }

const input = document.querySelector('.input');
const timeDisplay = document.querySelector('.time');
const btn = document.querySelector('.btn');
const box = document.querySelector('.game__block');

let interval;
let gameTime;
let score = 0;

btn.addEventListener('click', startGame);
box.addEventListener('click', (e) => {
    if (e.target.classList.contains('item')) {
        score++;
        e.target.remove();
        createItem();
    }
});

function startGame() {
    gameTime = parseInt(input.value, 10);
    if (gameTime > 0) {
        input.value = '';
        btn.disabled = true;
        timeDisplay.textContent = gameTime;
        interval = setInterval(updateTime, 1000);
        createItem();
    }
}

function updateTime() {
    if (gameTime <= 0) return endGame();
    timeDisplay.textContent = --gameTime;
}

function endGame() {
    clearInterval(interval);
    showEndScreen();
}

function createItem() {
    const item = document.createElement('div');
    item.classList.add('item');
    item.classList.add(randClass())
    const size = random(20, 100);
    const { width, height } = box.getBoundingClientRect();
    item.style.width = item.style.height = `${size}px`;
    item.style.top = `${random(0, height - size)}px`;
    item.style.left = `${random(0, width - size)}px`;
    item.style.background = randColor();
    box.append(item);
}

function showEndScreen() {
    box.innerHTML = `
        <div class="game__end">
            <h2>Вы набрали ${score} баллов</h2>
            <button class="restart">Начать заново</button>
        </div>
    `;
    box.querySelector('.restart').addEventListener('click', resetGame);
}

function resetGame() {
    score = 0;
    btn.disabled = false;
    box.innerHTML = '';
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function randColor() {
    return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
}

function randClass() {
    let classes = ['circle', 'square', 'triangle']
    let rand = random(0, classes.length)
    return classes[rand]
}

console.log(randClass());