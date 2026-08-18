// Örnekler kaldırılmış tertemiz 6 aşamalı sorular
const prompts = [
    { key: "who", label: "Kim?" },
    { key: "where", label: "Nerede?" },
    { key: "withWho", label: "Kimle?" },
    { key: "when", label: "Ne zaman?" },
    { key: "what", label: "Ne yaptı?" },
    { key: "result", label: "En sonunda ne oldu?" }
];

let players = [];
let currentStepIndex = 0;
let storyLines = [];

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function startGame() {
    let namesInput = document.getElementById('player-names').value.trim();
    if (!namesInput) {
        alert("Lütfen oyuncu isimlerini gir kanka!");
        return;
    }

    players = namesInput.split(',').map(name => name.trim()).filter(name => name.length > 0);
    
    if (players.length < 1) {
        alert("En az 1 oyuncu olmalı!");
        return;
    }

    currentStepIndex = 0;
    storyLines = [];
    showInputScreen();
}

function showInputScreen() {
    showScreen('input-screen');
    
    let currentPlayer = players[currentStepIndex % players.length];
    let currentPrompt = prompts[currentStepIndex];

    document.getElementById('writer-name').textContent = currentPlayer;
    document.getElementById('prompt-label').textContent = `Soru ${currentStepIndex + 1}/6: ${currentPrompt.label}`;
    document.getElementById('user-input-field').value = "";
}

function submitAnswer() {
    let val = document.getElementById('user-input-field').value.trim();
    if (!val) {
        alert("Boş bırakma kanka, komik bir şeyler yaz!");
        return;
    }

    storyLines.push({
        promptName: prompts[currentStepIndex].key,
        text: val
    });

    currentStepIndex++;

    if (currentStepIndex >= prompts.length) {
        generateStory();
    } else {
        showInputScreen();
    }
}

function generateStory() {
    showScreen('result-screen');
    let outputDiv = document.getElementById('story-output');

    // Sadece yazılan cevapları aralarında boşluk bırakarak yan yana / düz metin halinde diziyoruz
    let rawStory = storyLines.map(item => item.text).join(" ");

    let storyHTML = `<div class="story-text" style="font-size: 18px; line-height: 1.8; text-align: center;">`;
    storyHTML += `<p style="margin-bottom: 15px; color: #38bdf8;"><b>📖 Ortaya Çıkan Eser:</b></p>`;
    storyHTML += `<p>"${rawStory}"</p>`;
    storyHTML += `</div>`;
    
    outputDiv.innerHTML = storyHTML;
}

function resetGame() {
    showScreen('lobby-screen');
}
