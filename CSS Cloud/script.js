let score = 0
let successSound = new Audio("./../audio/success.mp3")
let failSound = new Audio("./../audio/fail.mp3")

const _games = {
        game0:
        {
            title: 'Find Prime Numbers',
            key: 'KeyPrime',
            create: function () {
                return getRandomValue(1, 100);
            },
            check: function (_numString) {

                //const _numString = event.target.innerText;
                const _num = parseInt(_numString);
                for (let i = 2; i < _num / 2; i++) {
                    if ((_num % i) == 0)
                        return false;
                }
                if(_numString){
                    successPlay()
                    increaseScore()
                }
                else
                    failPlay()  
        
                return true;
            }
        },

        game1:
        {
            title: 'Find Even Numbers',
            key: 'KeyEven',
            create: function () {
                return getRandomValue(1, 100) ;
            },
            check: function (_numString) {
                
                const _result =  (parseInt(_numString)  %2) === 0

                if(_result){
                    successPlay()
                    increaseScore()
            
                }
                else
                    failPlay()  
                
                return _result;
                
            }
            
        },

        game2:
        {
                title: 'Find Negative Numbers',
                key: 'KeyNegative',
                
                create: function () {
                    return getRandomValue(1, 100) * (getRandomValue(1, 2) > 1 ? 1 : -1);
                },
                check: function (_numString) {
                    
                    const result = parseInt(_numString) < 0
                  
                if(result){
                    successPlay()
                    increaseScore()
                }
                else
                    failPlay()  
                   
                    
                return result;

                    
                }
        },
        game3:
        {
                title: 'Find Composite Numbers',
                key: 'KeyComposite',

                create: function () {
                    return getRandomValue(1, 100);
                },
                check: function (_numString) {
    
                    //const _numString = event.target.innerText;
                    const _num = parseInt(_numString);
                    let result = false;
                    for (let i = 2; i < _num / 2; i++) {
                        if ((_num % i) == 0){
                            result = true;
                            break;
                        }
                    }
                    
                    if(result){
                        successPlay()
                        increaseScore()
                    }
                    else
                    failPlay()  
                    return result;
                }
        },
        game4:
        {
            title: 'Find Odd Numbers',
            key: 'KeyOdd',

            create: function () {
                return getRandomValue(1, 100) ;
            },
            check: function (_numString) {
                
                const _result =  (parseInt(_numString)  %2) === 1

                if(_result){
                    successPlay()
                    increaseScore()
                }
                else
                    failPlay()  
                                
                return _result;
            }
        },

        game5:
        {
            title: 'Find Positive Numbers',
            key: 'KeyPositive',
            create: function () {
                return getRandomValue(1, 100) * (getRandomValue(1, 2) > 1 ? 1 : -1);
            },
            check: function (_numString) {
                  
                const result = parseInt(_numString) > 0
                  
                if(result){
                    successPlay()
                    increaseScore()
                }
                else
                    failPlay()  
                    
                return result;

            }
        }               
    }

let _game, titleContainer;
function pickGame(_index) {
    _index += getRandomValue(1, 2) > 1 ? 0 : 3;
    _game = _games['game' + _index];
    _game.level = 0;
    _game.speedUp = 1; 

    startGame();
}

function startGame() {

    const _clouds = document.querySelectorAll('.cloudJS');
    for (const _cloud of _clouds){
        _cloud.innerText = _game.create();
        _cloud.onclick = function () {
            const _result = _game.check(_cloud.innerText);
            if (_result){

                console.log("true")
                resetAnimation(_cloud);
            }
            else{
            console.log("false")
                resetAnimation(_cloud);
            }

            }
    }
}

function getRandomValue(min, max) {
    return Math.floor((Math.random() * max) + min)
}

function setAnimationTime(_elem) {
    const r = document.querySelector(':root');
    let ms = _elem.getAttribute('data-ms');
    if(_game.level > 0 ){
        ms *= (1-((_game.level) / 10));
    }
    r.style.setProperty('--' + _elem.id + '-ms', ms + 's');
    setResetTimer(_elem);
}

function setResetTimer(_elem) {
    const ms = _elem.getAttribute('data-ms');
    if(_elem.resetTimer)
        clearInterval(_elem.resetTimer);
    _elem.resetTimer = setInterval(function() {
        resetAnimation(_elem);
    }, parseInt(ms) * 1000);
}

function resetAnimation (_elem) {
        _elem.innerHTML = '<div class="num" style="color:rgb(' + getRandomValue(1, 255) + ',' + getRandomValue(1, 255) + ', ' + getRandomValue(1, 255) + ')"> '+ _game.create() +' </div>'
        _elem.style.animation = 'none';
        _elem.offsetHeight;
        _elem.style.animation = null;
        setResetTimer(_elem);
}

function increaseScore(){
        score++;
        if((score% _game.speedUp) === 0){
            _game.level++;
            if(_game.level < 8){
                setSpeed();
            }
            else{
                removeClouds();
                document.getElementById('modal-id').classList.add('dis-inherit')
            }

        }
        document.getElementById("score").textContent = score;
}

successSound.addEventListener("click", function(){
    successSound.play();
})

failSound.addEventListener("click", function(){
    failSound.play();
})

function successPlay() 
        {
        if(successSound.paused) {
            successSound.play();
        }
        else{
            successSound.currentTime = 0;
        }
}

function failPlay() 
        {
        if(failSound.paused) {
            failSound.play();
        }
        else{
            failSound.currentTime = 0;
        }

}

let clouds;

function load() {
        titleContainer = document.getElementById("game-title");
        pickGame(parseInt(getQueryString('v')));
        titleContainer.innerText = _game.title;
        clouds = document.querySelectorAll('.cloud');
        for(const cloud of clouds)
            resetAnimation(cloud);
        setSpeed();
        document.getElementById('score').innerText = score;
}

function getQueryString(_key){
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(_key);
}

function setSpeed(){
    for(const cloud of clouds)
        setAnimationTime(cloud);
}

function removeClouds(){
    for(const cloud of clouds)
        cloud.remove();
}