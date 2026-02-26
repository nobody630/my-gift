// 祝福语数组
const blessings = [
    "祝你上岸上岸再上岸，you can do this！❤️",
    "好好休息，注意保暖，十堰很冷❤️",
    "我在深圳很想你，你呢？❤️",
    "长沙见！！！！！！！！！！！！❤️",
    "爱笑的女孩运气怎么都不会差的❤️",
    "要是时间可以冻结。❤️",
    "平安喜乐，天天开心❤️",
    "以后一起去跳广场舞吧❤️",
    "五芒星的权威后知后觉❤️",
    "春风得意马蹄疾，一日看尽长安花❤️",
];

// 获取页面元素
const blessingText = document.getElementById('blessing-text');
const giftBtn = document.getElementById('gift-btn');

// 存储剩余未显示的祝福语（打乱后的副本）
let remainingBlessings = [];

// Fisher–Yates 洗牌算法：随机打乱数组
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// 初始化或重置剩余祝福语池
function resetRemainingBlessings() {
    remainingBlessings = shuffleArray(blessings);
}

// 显示一条祝福语（从剩余池中取，不重复）
function showRandomBlessing() {
    if (!blessingText) return;
    
    // 如果没有剩余的了，重新打乱填充
    if (remainingBlessings.length === 0) {
        resetRemainingBlessings();
    }
    
    // 从剩余池中取出第一条（或最后一条）并显示
    // 这里用 pop() 从末尾取，效率更高
    const nextBlessing = remainingBlessings.pop();
    blessingText.textContent = nextBlessing;
}

// 页面加载时初始化并显示第一条
resetRemainingBlessings();
window.addEventListener('load', function() {
    showRandomBlessing();
});

// “送给你”按钮点击事件
if (giftBtn) {
    giftBtn.addEventListener('click', function() {
        showRandomBlessing();
        // 这里可以保留你原来的飘爱心效果，如果有的话
    });
}

// ==================== 音乐播放器功能（独立模块）====================
window.addEventListener('load', function() {
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = document.getElementById('music-icon');
    
    // 检查元素是否存在
    console.log('bgMusic:', bgMusic);
    console.log('musicBtn:', musicBtn);
    console.log('musicIcon:', musicIcon);
    
    if (!bgMusic || !musicBtn || !musicIcon) {
        console.error('音乐播放器元素未找到！');
        return;
    }
    
    // 设置音乐音量
    bgMusic.volume = 0.5;
    
    let isPlaying = false;
    
    musicBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('音乐按钮被点击，当前播放状态：', isPlaying);
        
        if (isPlaying) {
            bgMusic.pause();
            musicBtn.classList.remove('playing');
            musicIcon.textContent = '♬';
            console.log('音乐暂停');
        } else {
            // 尝试播放
            bgMusic.play()
                .then(() => {
                    console.log('音乐播放成功');
                    musicBtn.classList.add('playing');
                    musicIcon.textContent = '♪';
                })
                .catch(error => {
                    console.error('音乐播放失败：', error);
                    alert('音乐加载失败，请检查 qingtian.mp3 文件是否存在');
                });
        }
        isPlaying = !isPlaying;
    });
    
    // 音乐播放结束自动重新开始（loop 属性已经处理）
});

// ==================== 飘落爱心特效（独立模块）====================
(function() {
    // 创建容器（如果不存在）
    let container = document.getElementById('falling-hearts-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'falling-hearts-container';
        container.style.position = 'fixed';
        container.style.top = '0';
        container.style.left = '0';
        container.style.width = '100%';
        container.style.height = '100%';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '999';
        document.body.appendChild(container);
    }

    // 爱心颜色数组
    const colors = ['#ff9a9e', '#ffb6c1', '#ffc0cb', '#ff85a2', '#fbc2eb', '#ff99cc'];

    function createHeart() {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = '-50px';
        heart.style.fontSize = Math.floor(Math.random() * 20 + 20) + 'px';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.transform = 'rotate(' + (Math.random() * 30 - 15) + 'deg)';
        heart.style.pointerEvents = 'none';
        
        container.appendChild(heart);
        
        // 向下飘落
        const duration = Math.random() * 5 + 5;
        const startTime = Date.now();
        const startTop = -50;
        const endTop = window.innerHeight + 100;
        
        function fall() {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            
            heart.style.top = startTop + (endTop - startTop) * progress + 'px';
            
            if (progress < 1) {
                requestAnimationFrame(fall);
            } else {
                heart.remove();
            }
        }
        
        requestAnimationFrame(fall);
    }

    // 控制爱心数量
    function maintainHearts() {
        const currentHearts = container.children.length;
        const targetCount = Math.floor(Math.random() * 6) + 15;
        
        if (currentHearts < targetCount) {
            const toAdd = targetCount - currentHearts;
            for (let i = 0; i < toAdd; i++) {
                setTimeout(createHeart, i * 200);
            }
        }
    }

    setInterval(maintainHearts, 2000);
    
    for (let i = 0; i < 15; i++) {
        setTimeout(createHeart, i * 100);
    }
})();

// ==================== 点击“送给你”炸出爱心效果 ====================
(function() {
    const giftBtn = document.getElementById('gift-btn');
    if (!giftBtn) return;

    const burstColors = ['#ff9a9e', '#ffb6c1', '#ffc0cb', '#ff85a2', '#fbc2eb'];

    function createBurstHeart(x, y) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = Math.floor(Math.random() * 10 + 20) + 'px';
        heart.style.color = burstColors[Math.floor(Math.random() * burstColors.length)];
        heart.style.opacity = '1';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.transition = 'all 1.5s ease-out';
        document.body.appendChild(heart);

        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 30;

        setTimeout(() => {
            heart.style.transform = `translate(${dx}px, ${dy}px) rotate(${Math.random() * 360}deg)`;
            heart.style.opacity = '0';
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, 1500);
    }

    giftBtn.addEventListener('click', function(e) {
        const rect = giftBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const count = Math.floor(Math.random() * 6) + 15;
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                createBurstHeart(centerX, centerY);
            }, i * 30);
        }
    });
})();