        const _games = {
                game0:
                {
                   title: 'Find Prime Numbers',
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
                        
                        alert("Correct! " + _num + " is a prime number")
                        return true;
                    }
                },

                game1:
                {
                    title: 'Find Even Numbers',
                    create: function () {
                        return getRandomValue(1, 100) ;
                    },
                    check: function (_numString) {
                        return (parseInt(_numString)  %2) === 0;
                    }
                },

                game2:
                {
                        title: 'Find Negative Numbers',
                        create: function () {
                            return getRandomValue(1, 100) * (getRandomValue(1, 2) > 1 ? 1 : -1);
                        },
                        check: function (_numString) {
                            return parseInt(_numString) < 0;
                        }
                },
                game3:
                {
                     title: 'Find Composite Numbers',
                     create: function () {
                        return getRandomValue(1, 100);
                    },
                    check: function (_numString) {
                        //const _numString = event.target.innerText;
                        const _num = parseInt(_numString);
                        for (let i = 2; i < _num / 2; i++) {
                            if ((_num % i) == 0)
                                return true;
                        }
                        return false;
                    }
                },
                game4:
                {
                    title: 'Find Odd Numbers',
                    create: function () {
                        return getRandomValue(1, 100) ;
                    },
                    check: function (_numString) {
                        return (parseInt(_numString)  %2) === 1;
                    }
                },

                game5:
                {
                   title: 'Find Positive Numbers',
                   create: function () {
                        return getRandomValue(1, 100) * (getRandomValue(1, 2) > 1 ? 1 : -1);
                    },
                    check: function (_numString) {
                        return parseInt(_numString) > 0;
                    }
                }               
            }

            let _game, titleContainer;
            function pickGame(_index) {
                _index += getRandomValue(1, 2) > 1 ? 0 : 3;
                _game = _games['game' + _index];
               startGame();
            }

            function startGame() {
                const _clouds = document.querySelectorAll('.cloudJS');
                for (const _cloud of _clouds) {
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
                const ms = _elem.getAttribute('data-ms');
                r.style.setProperty('--' + _elem.id + '-ms', ms + 's');
                setResetTimer(_elem);
            }

            function setResetTimer(_elem) {
                const ms = _elem.getAttribute('data-ms');
                if(_elem.resetTimer)
                    clearInterval(_elem.resetTimer);
                _elem.resetTimer = setInterval(function() {
                    console.log('bittim ' + _elem.id);
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

function load() {
        titleContainer = document.getElementById("game-title");
        pickGame(parseInt(getQueryString('v')));
        titleContainer.innerText = _game.title;
        const cloud1 = document.getElementById('cloud-one');
        const cloud2 = document.getElementById('cloud-two');
        const cloud3 = document.getElementById('cloud-three');
        const cloud4 = document.getElementById('cloud-four');
        const cloud5 = document.getElementById('cloud-five');
        resetAnimation(cloud1);
        resetAnimation(cloud2);
        resetAnimation(cloud3);
        resetAnimation(cloud4);
        resetAnimation(cloud5);
        setAnimationTime(cloud1);
        setAnimationTime(cloud2);
        setAnimationTime(cloud3);
        setAnimationTime(cloud4);
        setAnimationTime(cloud5);
}

function getQueryString(_key){
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(_key);
}