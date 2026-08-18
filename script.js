// 5 Aşamalı Tam Kombinasyon Soruları
const prompts = [
    { key: "who", label: "Kim? (Örn: Ön kaldıran Berat, Nurgül Toksöz...)" },
    { key: "where", label: "Nerede? (Örn: Hendekte, Metrobusün üstünde...)" },
    { key: "withWho", label: "Kimle? (Örn: Köpek gören Mushab ile, tek başına...)" },
    { key: "when", label: "Ne zaman? (Örn: Sınavda, gece 3'te, stajda...)" },
    { key: "what", label: "Ne yapıyor? (Örn: Twerk atıyor, dildo arıyor, masaya dayıyor...)" }
];

let players = [];
let currentPlayerIndex = 0;
let currentPromptIndex = 0;
let gameData = {};

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

    gameData = {};
    players.forEach(p => gameData[p] = {});

    currentPlayerIndex = 0;
    currentPromptIndex = 0;
    showInputScreen();
}

function showInputScreen() {
    showScreen('input-screen');
    let currentPlayer = players[currentPlayerIndex];
    let currentPrompt = prompts[currentPromptIndex];

    document.getElementById('writer-name').textContent = currentPlayer;
    document.getElementById('prompt-label').textContent = `${currentPlayer} için soru (${currentPromptIndex + 1}/5): ${currentPrompt.label}`;
    document.getElementById('user-input-field').value = "";
}

function submitAnswer() {
    let val = document.getElementById('user-input-field').value.trim();
    if (!val) {
        alert("Boş bırakma kanka, komik bir şeyler yaz!");
        return;
    }

    let currentPlayer = players[currentPlayerIndex];
    let currentPromptKey = prompts[currentPromptIndex].key;

    // Cevabı kaydet
    gameData[currentPlayer][currentPromptKey] = val;

    // Sonraki soruya veya sonraki oyuncuya geç
    currentPromptIndex++;
    if (currentPromptIndex >= prompts.length) {
        currentPromptIndex = 0;
        currentPlayerIndex++;
    }

    if (currentPlayerIndex >= players.length) {
        generateStory();
    } else {
        showInputScreen();
    }
}

function generateStory() {
    showScreen('result-screen');
    let outputDiv = document.getElementById('story-output');

    let storyHTML = `<div class="story-text">`;

    players.forEach((p, index) => {
        let d = gameData[p];
        storyHTML += `<p style="margin-bottom: 14px;"><b>Olay ${index + 1}:</b> <b>${d.when}</b> zamanında, <b>${d.where}</b> mekanında, <b>${d.who}</b>, <b>${d.withWho}</b> yanına alarak <b>${d.what}</b> yapmaya başladı ve ortalık karıştı! 😎</p>`;
    });

    storyHTML += `</div>`;
    outputDiv.innerHTML = storyHTML;
}

function resetGame() {
    showScreen('lobby-screen');
}
