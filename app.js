const word_el = document.getElementById('word');
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetter_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message')
let selectedWord =getRandomWords(); 
const playAgainBtn = document.querySelector('#play-again');
const pop = document.querySelector('.popup');

const correctLetters = [];
const wrongLetters = []; 

function getRandomWords() {
    const words = ['javascript','phyton','java','css','html'];
    const words2 = words;
    do{
        return words[Math.floor(Math.random() * words.length)]

    }while(words === words2)
};

function displayWord() {
    
    word_el.innerHTML = `${selectedWord.split('').map(letter => `
        <div class="letter">
            ${correctLetters.includes(letter) ? letter : ''}
        </div>
    `).join('')}`;

    const w = word_el.innerText.replace(/\n/g,'');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandiniz';
        pop.style.backgroundColor = "rgba(73, 229, 0, .9)"

    }
}

displayWord();

function updateWrongLetters() {

    wrongLetter_el.innerHTML = `
        ${wrongLetters.length > 0 ? `<h3>Hatali harfler</h3>`: ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    items.forEach(function (item,index) {
       const errorCount = wrongLetters.length; 
       if (index<errorCount) {
           item.style.display = 'block'
       } else {
            item.style.display = 'none'
       }
        
    });

    if (wrongLetters.length === items.length) {
        popup.style.display = 'flex';
        message_el.innerText = 'Kaybettiniz';
        pop.style.backgroundColor = "rgba(219, 6, 6, 0.9)"
    }
    
};

function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    },2000);
};

playAgainBtn.addEventListener("click", function() {
    correctLetters.splice(0);
    wrongLetters.splice(0);
    
    selectedWord = getRandomWords();

    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});


window.addEventListener('keydown', function (e) {
    const letter = e.key;
    if(e.keyCode >= 65 && e.keyCode <= 90){
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
               displayMessage();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLetters();
            }else{
               displayMessage();
                
            }
        }

    }
});



console.log(getRandomWords())