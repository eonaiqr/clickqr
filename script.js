let count = 0;
let gameTimer;
let countdownTimer;
let isPlaying = false;
const clickButton = document.createElement('button');
clickButton.textContent = 'クリック！';
const startButton = document.getElementById('startButton');
const clickCountDisplay = document.getElementById('clickCount');
const recordList = document.getElementById('recordList');
const countdownDisplay = document.createElement('p');

startButton.addEventListener('click', startCountdown);

function startCountdown() {
    if (!isPlaying) {
        let countdown = 3;
        countdownDisplay.textContent = `カウントダウン: ${countdown}`;
        document.body.insertBefore(countdownDisplay, startButton);
        startButton.disabled = true;

        countdownTimer = setInterval(() => {
            countdown--;
            countdownDisplay.textContent = `カウントダウン: ${countdown}`;
            if (countdown === 0) {
                clearInterval(countdownTimer);
                startGame();
            }
        }, 1000);
    }
}

function startGame() {
    isPlaying = true;
    count = 0;
    clickCountDisplay.textContent = count;
    clickButton.addEventListener('click', increaseCount);
    document.body.insertBefore(clickButton, startButton);
    gameTimer = 10;
    updateGameTimer();
}

function increaseCount() {
    if (isPlaying) {
        count++;
        clickCountDisplay.textContent = count;
    }
}

function updateGameTimer() {
    if (gameTimer > 0) {
        setTimeout(() => {
            gameTimer--;
            countdownDisplay.textContent = `残り時間: ${gameTimer}秒`;
            updateGameTimer();
        }, 1000);
    } else {
        endGame();
    }
}

function endGame() {
    isPlaying = false;
    startButton.disabled = false;
    clickButton.removeEventListener('click', increaseCount);
    document.body.removeChild(clickButton);
    document.body.removeChild(countdownDisplay);
    updateRecordList(count);
}

function updateRecordList(score) {
    const recordTime = new Date().toLocaleString('ja-JP');
    const newRecord = document.createElement('li');
    newRecord.textContent = `スコア: ${score} - 時刻: ${recordTime}`;
    recordList.appendChild(newRecord);
    sortRecords();
}

function sortRecords() {
    const records = Array.from(recordList.getElementsByTagName('li'));
    records.sort((a, b) => {
        const scoreA = parseInt(a.textContent.split(' ')[1]);
        const scoreB = parseInt(b.textContent.split(' ')[1]);
        return scoreB - scoreA;
    });
    recordList.innerHTML = '';
    records.forEach(record => recordList.appendChild(record));
}
