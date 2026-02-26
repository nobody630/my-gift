const blessings = [
    "愿你眼里有星辰大海，心里有繁花似锦 🌸",
    "生活虽忙碌，但别忘了给自己留一点甜 ✨",
    "希望你遇到的每件事，都是值得被温柔以待的 💖",
    "每一个普通的日子，都要开心地闪闪发光 🌈",
    "哪怕生活有点苦，你也是最可爱的那颗糖 🍬",
    "不管世界怎么变，你都要永远做最快乐的自己 🦋",
    "希望所有的好运气，都在这个春天如约而至 🍀",
    "愿你的笑容，能治愈生活中所有的不如意 😊",
    "今天的你也超级棒！加油呀，王梦溪！🎈",
    "平安喜乐，万事胜意，你要天天开心呀 💌"
];

const blessingText = document.getElementById('blessing-text');
const blessingCard = document.getElementById('blessing-card');
const heartBurstContainer = document.getElementById('heart-burst-container');
const giftBtn = document.getElementById('gift-btn');
const heart = document.querySelector('.beating-heart');

// 随机切换祝福语
function switchBlessing() {
    const randomIndex = Math.floor(Math.random() * blessings.length);
    // 添加一点淡入淡出效果
    blessingText.style.opacity = 0;
    setTimeout(() => {
        blessingText.innerText = blessings[randomIndex];
        blessingText.style.opacity = 1;
    }, 200);
}

// 飘出小爱心效果
function createFloatingHeart(x, y) {
    const heartEmoji = ['❤️', '💖', '💗', '💓', '💕', '🌸'][Math.floor(Math.random() * 6)];
    const floatingHeart = document.createElement('div');
    floatingHeart.className = 'floating-heart';
    floatingHeart.innerText = heartEmoji;
    
    // 随机位置偏移
    const offsetX = (Math.random() - 0.5) * 100;
    const size = Math.random() * 10 + 20; // 20px - 30px
    
    floatingHeart.style.left = `${x + offsetX}px`;
    floatingHeart.style.top = `${y}px`;
    floatingHeart.style.fontSize = `${size}px`;
    
    heartBurstContainer.appendChild(floatingHeart);
    
    // 动画结束后移除
    setTimeout(() => {
        floatingHeart.remove();
    }, 3000);
}

// 绑定事件
blessingCard.addEventListener('click', switchBlessing);
heart.addEventListener('click', switchBlessing);

giftBtn.addEventListener('click', (e) => {
    // 获取按钮中心位置
    const rect = giftBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top;

    // 爆发式产生爱心
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createFloatingHeart(centerX, centerY);
        }, i * 50);
    }
    
    // 每次点击也切换一句祝福
    switchBlessing();
});

// 初始随机一条
switchBlessing();
