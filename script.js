// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('页面加载完成！');
    
    // 初始化主题
    initTheme();
    
    // 初始化计数器
    initCounter();
    
    // 初始化按钮事件
    initButtons();
    
    // 初始化滚动动画
    initScrollAnimations();
    
    // 初始化导航栏高亮
    initNavHighlight();
});

// 主题切换功能
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // 检查本地存储的主题偏好
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // 主题切换事件
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // 更新主题
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // 更新图标
        updateThemeIcon(newTheme);
        
        // 添加切换动画
        themeToggle.style.transform = 'scale(0.9)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
        
        console.log(`主题已切换为: ${newTheme}`);
    });
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.title = '切换到亮色主题';
    } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.title = '切换到暗色主题';
    }
}

// 计数器功能
function initCounter() {
    const counterValue = document.getElementById('counterValue');
    const incrementBtn = document.getElementById('incrementBtn');
    const decrementBtn = document.getElementById('decrementBtn');
    const resetBtn = document.getElementById('resetBtn');
    
    let count = parseInt(localStorage.getItem('counter')) || 0;
    updateCounterDisplay(count);
    
    // 增加计数
    incrementBtn.addEventListener('click', function() {
        count++;
        updateCounterDisplay(count);
        saveCounter(count);
        animateCounterChange('increment');
    });
    
    // 减少计数
    decrementBtn.addEventListener('click', function() {
        if (count > 0) {
            count--;
            updateCounterDisplay(count);
            saveCounter(count);
            animateCounterChange('decrement');
        } else {
            // 如果已经是0，添加一个警告动画
            counterValue.style.animation = 'shake 0.5s';
            setTimeout(() => {
                counterValue.style.animation = '';
            }, 500);
        }
    });
    
    // 重置计数
    resetBtn.addEventListener('click', function() {
        if (count !== 0) {
            count = 0;
            updateCounterDisplay(count);
            saveCounter(count);
            animateCounterChange('reset');
        }
    });
    
    // 添加键盘支持
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowUp' || event.key === '+') {
            incrementBtn.click();
            event.preventDefault();
        } else if (event.key === 'ArrowDown' || event.key === '-') {
            decrementBtn.click();
            event.preventDefault();
        } else if (event.key === 'r' || event.key === 'R') {
            resetBtn.click();
            event.preventDefault();
        }
    });
}

function updateCounterDisplay(value) {
    const counterValue = document.getElementById('counterValue');
    counterValue.textContent = value;
    
    // 根据数值改变颜色
    if (value === 0) {
        counterValue.style.color = '';
    } else if (value > 0) {
        counterValue.style.color = 'var(--success-color)';
    } else {
        counterValue.style.color = 'var(--danger-color)';
    }
}

function saveCounter(value) {
    localStorage.setItem('counter', value);
}

function animateCounterChange(type) {
    const counterValue = document.getElementById('counterValue');
    
    // 移除之前的动画类
    counterValue.classList.remove('counter-pulse', 'counter-bounce');
    
    // 强制重排以重新触发动画
    void counterValue.offsetWidth;
    
    // 根据类型添加不同的动画
    if (type === 'increment') {
        counterValue.classList.add('counter-pulse');
    } else if (type === 'decrement') {
        counterValue.classList.add('counter-pulse');
    } else if (type === 'reset') {
        counterValue.classList.add('counter-bounce');
    }
    
    // 动画结束后移除类
    setTimeout(() => {
        counterValue.classList.remove('counter-pulse', 'counter-bounce');
    }, 500);
}

// 按钮事件初始化
function initButtons() {
    const learnMoreBtn = document.getElementById('learnMoreBtn');
    const demoBtn = document.getElementById('demoBtn');
    
    // 了解更多按钮
    learnMoreBtn.addEventListener('click', function() {
        // 滚动到功能区域
        document.getElementById('features').scrollIntoView({
            behavior: 'smooth'
        });
        
        // 添加点击反馈
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log('滚动到功能区域');
    });
    
    // 演示按钮
    demoBtn.addEventListener('click', function() {
        // 显示欢迎消息
        showNotification('欢迎来到前端示例页面！🎉', 'success');
        
        // 添加点击反馈
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        console.log('演示按钮被点击');
    });
    
    // 为所有按钮添加悬停效果
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// 滚动动画
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // 观察需要动画的元素
    const animatedElements = document.querySelectorAll('.feature-card, .tech-item, .counter-container');
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// 导航栏高亮
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// 显示通知
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close"><i class="fas fa-times"></i></button>
    `;
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 添加样式
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--light-color);
        color: var(--dark-color);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius-md);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        border-left: 4px solid ${type === 'success' ? 'var(--success-color)' : 'var(--primary-color)'};
    `;
    
    // 关闭按钮事件
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', function() {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // 自动消失
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// 添加CSS动画
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-20px); }
        60% { transform: translateY(-10px); }
    }
    
    .counter-pulse {
        animation: pulse 0.5s ease;
    }
    
    .counter-bounce {
        animation: bounce 0.8s ease;
    }
    
    .animate-in {
        animation: fadeIn 0.8s ease-out;
    }
    
    .nav-links a.active {
        color: var(--primary-color) !important;
        background-color: var(--light-gray) !important;
        font-weight: 600;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: var(--gray-color);
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background-color: var(--light-gray);
    }
`;
document.head.appendChild(style);

// 页面性能监控
window.addEventListener('load', function() {
    const loadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    console.log(`页面加载时间: ${loadTime}ms`);
    
    // 如果加载时间较长，显示优化提示
    if (loadTime > 2000) {
        console.log('提示: 页面加载时间较长，建议优化资源加载');
    }
});

// 错误处理
window.addEventListener('error', function(event) {
    console.error('页面错误:', event.error);
    showNotification('页面出现错误，请刷新重试', 'error');
});

// 离线检测
window.addEventListener('offline', function() {
    showNotification('网络连接已断开', 'warning');
});

window.addEventListener('online', function() {
    showNotification('网络连接已恢复', 'success');
});

// 复制代码功能（可选）
document.querySelectorAll('.code-content').forEach(codeBlock => {
    codeBlock.addEventListener('click', function() {
        const code = this.querySelector('code').textContent;
        navigator.clipboard.writeText(code).then(() => {
            showNotification('代码已复制到剪贴板！', 'success');
        }).catch(err => {
            console.error('复制失败:', err);
        });
    });
    
    // 添加提示
    codeBlock.title = '点击复制代码';
    codeBlock.style.cursor = 'pointer';
});