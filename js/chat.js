// 心理辅导聊天功能 - 带聊天历史
document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const chatMessages = document.getElementById('chat-messages');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const apiKeyInput = document.getElementById('api-key');
    const apiUrlInput = document.getElementById('api-url');
    const saveConfigButton = document.getElementById('save-config');
    const typingIndicator = document.getElementById('typing-indicator');
    const newChatBtn = document.getElementById('new-chat-btn');
    const chatHistoryList = document.getElementById('chat-history-list');
    const currentChatTitle = document.getElementById('current-chat-title');
    
    // 配置和状态
    let config = {
        apiKey: localStorage.getItem('deepseek-api-key') || '',
        apiUrl: localStorage.getItem('deepseek-api-url') || 'https://api.deepseek.com/v1/chat/completions'
    };
    
    let currentChatId = null;
    let chats = {};
    
    // 系统提示词
    const systemPrompt = `你是一个专业的中小学心理辅导助手，专门帮助中小学生解决心理问题。
    你的任务是：
    1. 提供温暖、支持性的心理辅导
    2. 帮助学生处理情绪问题、学习压力、人际关系等
    3. 用简单易懂的语言与学生交流
    4. 保持积极、鼓励的态度
    5. 针对中小学生特点提供适当的建议
    
    请用中文回复，语气亲切友好。保持回复在200-400字之间。`;
    
    // 初始化
    function init() {
        // 加载配置
        apiKeyInput.value = config.apiKey;
        apiUrlInput.value = config.apiUrl;
        
        // 如果已配置API密钥，隐藏配置区域
        if (config.apiKey) {
            document.getElementById('api-config').style.display = 'none';
        }
        
        // 加载聊天历史
        loadChatHistory();
        
        // 如果没有当前对话，创建新对话
        if (!currentChatId) {
            createNewChat();
        } else {
            loadChat(currentChatId);
        }
    }
    
    // 保存配置
    saveConfigButton.addEventListener('click', function() {
        config.apiKey = apiKeyInput.value.trim();
        config.apiUrl = apiUrlInput.value.trim();
        
        if (!config.apiKey) {
            alert('请输入DeepSeek API密钥');
            return;
        }
        
        localStorage.setItem('deepseek-api-key', config.apiKey);
        localStorage.setItem('deepseek-api-url', config.apiUrl);
        
        alert('配置已保存！');
        document.getElementById('api-config').style.display = 'none';
    });
    
    // 显示配置区域
    document.addEventListener('keydown', function(e) {
        // 按Ctrl+Shift+C显示配置
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            document.getElementById('api-config').style.display = 'block';
        }
    });
    
    // 创建新对话
    function createNewChat() {
        const chatId = 'chat_' + Date.now();
        currentChatId = chatId;
        
        chats[chatId] = {
            id: chatId,
            title: '新对话',
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "assistant",
                    content: "你好！我是你的心理辅导助手。今天有什么想聊的吗？无论是学习压力、人际关系还是情绪问题，我都很乐意帮助你。"
                }
            ],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        
        // 保存到本地存储
        saveChatHistory();
        
        // 更新UI
        renderChatHistory();
        loadChat(chatId);
        
        return chatId;
    }
    
    // 加载聊天历史
    function loadChatHistory() {
        const savedChats = localStorage.getItem('chat-history');
        if (savedChats) {
            chats = JSON.parse(savedChats);
        }
        
        // 获取当前对话ID
        currentChatId = localStorage.getItem('current-chat-id');
        
        renderChatHistory();
    }
    
    // 保存聊天历史
    function saveChatHistory() {
        localStorage.setItem('chat-history', JSON.stringify(chats));
        localStorage.setItem('current-chat-id', currentChatId);
    }
    
    // 渲染聊天历史列表
    function renderChatHistory() {
        chatHistoryList.innerHTML = '';
        
        const chatIds = Object.keys(chats).sort((a, b) => {
            return new Date(chats[b].updatedAt) - new Date(chats[a].updatedAt);
        });
        
        if (chatIds.length === 0) {
            chatHistoryList.innerHTML = '<div class="empty-history">暂无聊天记录</div>';
            return;
        }
        
        chatIds.forEach(chatId => {
            const chat = chats[chatId];
            const chatItem = document.createElement('div');
            chatItem.className = `chat-history-item ${chatId === currentChatId ? 'active' : ''}`;
            chatItem.dataset.chatId = chatId;
            
            // 获取第一条用户消息作为预览
            const userMessage = chat.messages.find(msg => msg.role === 'user');
            const preview = userMessage ? userMessage.content : '新对话';
            
            // 格式化日期
            const date = new Date(chat.updatedAt);
            const dateStr = date.toLocaleDateString('zh-CN');
            
            chatItem.innerHTML = `
                <div class="chat-history-title">${chat.title}</div>
                <div class="chat-history-preview">${preview}</div>
                <div class="chat-history-meta">
                    <span>${dateStr}</span>
                    <span>${chat.messages.filter(msg => msg.role === 'user').length} 条消息</span>
                </div>
            `;
            
            chatItem.addEventListener('click', () => {
                loadChat(chatId);
            });
            
            chatHistoryList.appendChild(chatItem);
        });
    }
    
    // 加载特定聊天
    function loadChat(chatId) {
        if (!chats[chatId]) return;
        
        currentChatId = chatId;
        const chat = chats[chatId];
        
        // 更新当前聊天标题
        currentChatTitle.textContent = chat.title;
        
        // 清空消息区域
        chatMessages.innerHTML = '';
        
        // 添加消息到界面（跳过系统消息）
        chat.messages.forEach(message => {
            if (message.role !== 'system') {
                addMessageToUI(message.content, message.role === 'user');
            }
        });
        
        // 更新聊天历史列表
        renderChatHistory();
        
        // 保存当前聊天ID
        saveChatHistory();
    }
    
    // 更新聊天标题
    function updateChatTitle(chatId, userMessage) {
        if (!chats[chatId]) return;
        
        // 如果还是默认标题，使用用户的第一条消息作为标题
        if (chats[chatId].title === '新对话') {
            const shortMessage = userMessage.length > 20 ? 
                userMessage.substring(0, 20) + '...' : userMessage;
            chats[chatId].title = shortMessage;
            
            // 更新UI
            if (chatId === currentChatId) {
                currentChatTitle.textContent = shortMessage;
            }
        }
        
        // 更新修改时间
        chats[chatId].updatedAt = new Date().toISOString();
        
        // 保存
        saveChatHistory();
        renderChatHistory();
    }
    
    // 添加消息到UI
    function addMessageToUI(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'ai-message');
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 显示/隐藏打字指示器
    function setTypingIndicator(show) {
        typingIndicator.style.display = show ? 'block' : 'none';
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // 调用DeepSeek API
    async function callDeepSeekAPI(userMessage) {
        if (!config.apiKey) {
            throw new Error('未配置API密钥，请先配置DeepSeek API密钥');
        }
        
        // 构建对话历史（包含系统消息）
        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            ...chats[currentChatId].messages.filter(msg => msg.role !== 'system')
        ];
        
        // 添加当前用户消息
        messages.push({
            role: "user",
            content: userMessage
        });
        
        try {
            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.apiKey}`
                },
                body: JSON.stringify({
                    model: "deepseek-chat",
                    messages: messages,
                    max_tokens: 1024,
                    temperature: 0.7,
                    stream: false
                })
            });
            
            if (!response.ok) {
                let errorMessage = `API请求失败: ${response.status} - ${response.statusText}`;
                
                // 尝试获取错误详情
                try {
                    const errorText = await response.text();
                    if (errorText) {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.error?.message || errorMessage;
                    }
                } catch (parseError) {
                    console.error('解析错误响应失败:', parseError);
                }
                
                throw new Error(errorMessage);
            }
            
            // 获取响应文本
            const responseText = await response.text();
            
            if (!responseText) {
                throw new Error('API返回了空响应');
            }
            
            // 解析JSON
            let data;
            try {
                data = JSON.parse(responseText);
            } catch (parseError) {
                console.error('JSON解析错误:', parseError, '响应内容:', responseText);
                throw new Error(`API返回了无效的JSON格式: ${parseError.message}`);
            }
            
            if (!data.choices || !data.choices[0] || !data.choices[0].message) {
                console.error('API返回数据格式异常:', data);
                throw new Error('API返回数据格式异常');
            }
            
            return data.choices[0].message.content;
            
        } catch (error) {
            console.error('API调用错误:', error);
            throw error;
        }
    }
    
    // 发送消息
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
        
        // 如果没有当前对话，创建新对话
        if (!currentChatId) {
            currentChatId = createNewChat();
        }
        
        // 禁用输入和按钮
        messageInput.disabled = true;
        sendButton.disabled = true;
        
        // 添加用户消息到UI
        addMessageToUI(message, true);
        
        // 添加用户消息到聊天历史
        chats[currentChatId].messages.push({
            role: "user",
            content: message,
            timestamp: new Date().toISOString()
        });
        
        // 更新聊天标题（如果是第一条用户消息）
        if (chats[currentChatId].messages.filter(msg => msg.role === 'user').length === 1) {
            updateChatTitle(currentChatId, message);
        }
        
        messageInput.value = '';
        
        // 显示打字指示器
        setTypingIndicator(true);
        
        try {
            // 调用DeepSeek API
            const aiResponse = await callDeepSeekAPI(message);
            
            // 隐藏打字指示器并添加AI回复
            setTypingIndicator(false);
            addMessageToUI(aiResponse, false);
            
            // 添加AI回复到聊天历史
            chats[currentChatId].messages.push({
                role: "assistant",
                content: aiResponse,
                timestamp: new Date().toISOString()
            });
            
            // 更新修改时间
            chats[currentChatId].updatedAt = new Date().toISOString();
            
            // 保存聊天历史
            saveChatHistory();
            renderChatHistory();
            
        } catch (error) {
            // 隐藏打字指示器
            setTypingIndicator(false);
            
            // 显示错误消息
            console.error('发送消息失败:', error);
            
            let errorMessage = '抱歉，我暂时无法回复您的消息。';
            if (error.message.includes('API密钥') || error.message.includes('401')) {
                errorMessage += ' 请检查API密钥是否正确。';
                document.getElementById('api-config').style.display = 'block';
            } else if (error.message.includes('网络') || error.message.includes('fetch')) {
                errorMessage += ' 网络连接出现问题，请检查网络后重试。';
            } else {
                errorMessage += ` 错误: ${error.message}`;
            }
            
            addMessageToUI(errorMessage, false);
            
            // 添加错误消息到聊天历史
            chats[currentChatId].messages.push({
                role: "assistant",
                content: errorMessage,
                timestamp: new Date().toISOString()
            });
            
            // 保存聊天历史
            saveChatHistory();
            renderChatHistory();
        } finally {
            // 重新启用输入和按钮
            messageInput.disabled = false;
            sendButton.disabled = false;
            messageInput.focus();
        }
    }
    
    // 事件监听
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    newChatBtn.addEventListener('click', function() {
        createNewChat();
    });
    
    // 初始化
    init();
});

// 调试和网络状态功能
document.addEventListener('DOMContentLoaded', function() {
    // 调试功能
    const debugToggle = document.getElementById('debug-toggle');
    if (debugToggle) {
        debugToggle.addEventListener('click', function() {
            const config = document.getElementById('api-config');
            config.style.display = config.style.display === 'none' ? 'block' : 'none';
        });
    }
    
    // 网络状态检测
    function checkConnection() {
        const statusElement = document.getElementById('connection-status');
        if (!statusElement) return;
        
        if (navigator.onLine) {
            statusElement.textContent = '在线';
            statusElement.className = 'connection-status connected';
            statusElement.style.display = 'block';
            setTimeout(() => {
                statusElement.style.display = 'none';
            }, 3000);
        } else {
            statusElement.textContent = '离线';
            statusElement.className = 'connection-status disconnected';
            statusElement.style.display = 'block';
        }
    }
    
    window.addEventListener('online', checkConnection);
    window.addEventListener('offline', checkConnection);
    checkConnection(); // 初始检查
});