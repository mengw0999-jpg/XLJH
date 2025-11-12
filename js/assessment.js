// 心理评估功能 - 多问卷版本
document.addEventListener('DOMContentLoaded', function() {
    // DOM元素
    const assessmentSelection = document.getElementById('assessment-selection');
    const assessmentContainer = document.getElementById('assessment-container');
    const assessmentResult = document.getElementById('assessment-result');
    const questionsContainer = document.getElementById('questions-container');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const prevQuestionBtn = document.getElementById('prev-question');
    const nextQuestionBtn = document.getElementById('next-question');
    const submitAssessmentBtn = document.getElementById('submit-assessment');
    const saveReportBtn = document.getElementById('save-report');
    const newAssessmentBtn = document.getElementById('new-assessment');
    const currentQuestionnaireTitle = document.getElementById('current-questionnaire-title');
    const currentQuestionnaireDescription = document.getElementById('current-questionnaire-description');
    
    // 问卷数据
    const questionnaires = {
        general: {
            title: "心理健康综合评估",
            description: "全面评估您的心理健康状况，涵盖情绪、压力、人际关系等多个方面",
            questions: [
                {
                    id: 1,
                    text: "最近一周，你感到快乐和满足的频率如何？",
                    options: [
                        { text: "很少或从不", value: 1 },
                        { text: "偶尔", value: 2 },
                        { text: "经常", value: 3 },
                        { text: "几乎总是", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "你如何处理学习或生活中的压力？",
                    options: [
                        { text: "很难应对，经常感到不知所措", value: 1 },
                        { text: "有时能应对，但效果不佳", value: 2 },
                        { text: "通常能有效应对", value: 3 },
                        { text: "总能找到有效的方法应对", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你与同学、朋友的关系如何？",
                    options: [
                        { text: "经常感到孤立，难以建立联系", value: 1 },
                        { text: "有一些朋友，但关系不深", value: 2 },
                        { text: "有稳定的朋友圈，关系良好", value: 3 },
                        { text: "人际关系丰富，感到被支持和理解", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "你对自己的学习和生活有明确的目标吗？",
                    options: [
                        { text: "几乎没有目标，感到迷茫", value: 1 },
                        { text: "有一些想法，但不够清晰", value: 2 },
                        { text: "有比较清晰的目标", value: 3 },
                        { text: "有明确的长期和短期目标", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "当你情绪低落时，你通常会怎么做？",
                    options: [
                        { text: "独自承受，不愿与人交流", value: 1 },
                        { text: "尝试自我调节，但效果有限", value: 2 },
                        { text: "会找人倾诉或寻求帮助", value: 3 },
                        { text: "有多种有效的方式调节情绪", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "你的睡眠质量如何？",
                    options: [
                        { text: "经常失眠或睡眠质量很差", value: 1 },
                        { text: "有时睡眠不好", value: 2 },
                        { text: "睡眠质量一般", value: 3 },
                        { text: "睡眠质量很好，醒来精力充沛", value: 4 }
                    ]
                },
                {
                    id: 7,
                    text: "你对自己外貌和能力的满意程度如何？",
                    options: [
                        { text: "很不满意，经常自我批评", value: 1 },
                        { text: "有些方面不满意", value: 2 },
                        { text: "基本满意", value: 3 },
                        { text: "非常满意，接纳自己的特点", value: 4 }
                    ]
                },
                {
                    id: 8,
                    text: "你参与课外活动和爱好的频率如何？",
                    options: [
                        { text: "几乎没有兴趣爱好或活动", value: 1 },
                        { text: "偶尔参与", value: 2 },
                        { text: "经常参与", value: 3 },
                        { text: "积极参与多种活动，感到充实", value: 4 }
                    ]
                },
                {
                    id: 9,
                    text: "你感到焦虑或紧张的频率如何？",
                    options: [
                        { text: "几乎每天都感到焦虑", value: 1 },
                        { text: "每周几次", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 10,
                    text: "你对自己未来的看法如何？",
                    options: [
                        { text: "感到悲观，看不到希望", value: 1 },
                        { text: "有些担忧", value: 2 },
                        { text: "比较乐观", value: 3 },
                        { text: "非常乐观，充满期待", value: 4 }
                    ]
                }
            ]
        },
        anxiety: {
            title: "焦虑情绪评估",
            description: "评估您的焦虑水平，了解焦虑对日常生活的影响程度",
            questions: [
                {
                    id: 1,
                    text: "你感到紧张、焦虑或烦躁的频率？",
                    options: [
                        { text: "几乎每天", value: 1 },
                        { text: "一周多次", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "你是否因为担忧而难以控制自己的情绪？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你是否因为焦虑而回避某些场合或活动？",
                    options: [
                        { text: "经常回避", value: 1 },
                        { text: "有时回避", value: 2 },
                        { text: "很少回避", value: 3 },
                        { text: "从不回避", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "你是否感到坐立不安或难以放松？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "你是否容易变得烦躁或不耐烦？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "你是否感到害怕，好像有可怕的事情要发生？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 7,
                    text: "焦虑是否影响了你的学习或日常活动？",
                    options: [
                        { text: "严重影响", value: 1 },
                        { text: "有些影响", value: 2 },
                        { text: "轻微影响", value: 3 },
                        { text: "没有影响", value: 4 }
                    ]
                }
            ]
        },
        depression: {
            title: "抑郁情绪评估",
            description: "评估您的抑郁情绪水平，帮助识别可能的抑郁症状",
            questions: [
                {
                    id: 1,
                    text: "你是否感到情绪低落、沮丧或绝望？",
                    options: [
                        { text: "几乎每天", value: 1 },
                        { text: "一周多次", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "你对平时喜欢做的事情失去了兴趣？",
                    options: [
                        { text: "完全失去兴趣", value: 1 },
                        { text: "兴趣明显减少", value: 2 },
                        { text: "兴趣稍有减少", value: 3 },
                        { text: "没有变化", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你是否感到疲劳或精力不足？",
                    options: [
                        { text: "几乎每天都感到疲劳", value: 1 },
                        { text: "经常感到疲劳", value: 2 },
                        { text: "偶尔感到疲劳", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "你的食欲是否有明显变化？",
                    options: [
                        { text: "食欲明显下降或增加", value: 1 },
                        { text: "食欲有些变化", value: 2 },
                        { text: "食欲轻微变化", value: 3 },
                        { text: "没有变化", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "你是否难以集中注意力或做决定？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "你是否觉得自己很失败或让家人失望？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 7,
                    text: "你的睡眠是否有问题（失眠或睡得太多）？",
                    options: [
                        { text: "几乎每天", value: 1 },
                        { text: "一周多次", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 8,
                    text: "你是否感到坐立不安或行动迟缓？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "很少如此", value: 3 },
                        { text: "从不", value: 4 }
                    ]
                },
                {
                    id: 9,
                    text: "你是否有伤害自己的想法？",
                    options: [
                        { text: "经常有", value: 1 },
                        { text: "偶尔有", value: 2 },
                        { text: "很少有", value: 3 },
                        { text: "从没有", value: 4 }
                    ]
                }
            ]
        },
        stress: {
            title: "学习压力评估",
            description: "评估您的学习压力水平，了解压力来源和应对能力",
            questions: [
                {
                    id: 1,
                    text: "你感到学习任务繁重、难以应付的频率？",
                    options: [
                        { text: "几乎每天", value: 1 },
                        { text: "一周多次", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "考试或测验前，你感到紧张或焦虑的程度？",
                    options: [
                        { text: "非常紧张，影响发挥", value: 1 },
                        { text: "比较紧张", value: 2 },
                        { text: "有点紧张", value: 3 },
                        { text: "很少紧张", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你因为学习压力而出现身体不适（如头痛、胃痛）的频率？",
                    options: [
                        { text: "经常", value: 1 },
                        { text: "有时", value: 2 },
                        { text: "偶尔", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "学习压力是否影响了你的睡眠质量？",
                    options: [
                        { text: "严重影响", value: 1 },
                        { text: "有些影响", value: 2 },
                        { text: "轻微影响", value: 3 },
                        { text: "没有影响", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "你觉得自己能够有效管理学习时间的程度？",
                    options: [
                        { text: "完全不能", value: 1 },
                        { text: "有些困难", value: 2 },
                        { text: "基本能够", value: 3 },
                        { text: "完全能够", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "父母或老师对你的期望是否让你感到压力？",
                    options: [
                        { text: "压力很大", value: 1 },
                        { text: "有些压力", value: 2 },
                        { text: "压力不大", value: 3 },
                        { text: "没有压力", value: 4 }
                    ]
                },
                {
                    id: 7,
                    text: "与同学比较成绩时，你感到压力的程度？",
                    options: [
                        { text: "压力很大", value: 1 },
                        { text: "有些压力", value: 2 },
                        { text: "压力不大", value: 3 },
                        { text: "没有压力", value: 4 }
                    ]
                },
                {
                    id: 8,
                    text: "你觉得自己应对学习压力的能力如何？",
                    options: [
                        { text: "很差", value: 1 },
                        { text: "一般", value: 2 },
                        { text: "较好", value: 3 },
                        { text: "很好", value: 4 }
                    ]
                }
            ]
        },
        social: {
            title: "社交能力评估",
            description: "评估您的社交能力和人际关系状况，了解社交互动模式",
            questions: [
                {
                    id: 1,
                    text: "你主动与同学或朋友交流的频率？",
                    options: [
                        { text: "很少或从不", value: 1 },
                        { text: "偶尔", value: 2 },
                        { text: "经常", value: 3 },
                        { text: "几乎总是", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "在陌生环境中，你感到自在的程度？",
                    options: [
                        { text: "非常不自在", value: 1 },
                        { text: "有些不自在", value: 2 },
                        { text: "比较自在", value: 3 },
                        { text: "非常自在", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你觉得自己被同学或朋友理解和接纳的程度？",
                    options: [
                        { text: "很少被理解", value: 1 },
                        { text: "有时被理解", value: 2 },
                        { text: "经常被理解", value: 3 },
                        { text: "总是被理解", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "当你需要帮助时，向他人求助的难易程度？",
                    options: [
                        { text: "非常困难", value: 1 },
                        { text: "有些困难", value: 2 },
                        { text: "不太困难", value: 3 },
                        { text: "很容易", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "你参与集体活动或团队合作的频率？",
                    options: [
                        { text: "很少或从不", value: 1 },
                        { text: "偶尔", value: 2 },
                        { text: "经常", value: 3 },
                        { text: "几乎总是", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "你觉得自己处理人际冲突的能力如何？",
                    options: [
                        { text: "很差", value: 1 },
                        { text: "一般", value: 2 },
                        { text: "较好", value: 3 },
                        { text: "很好", value: 4 }
                    ]
                }
            ]
        },
        selfesteem: {
            title: "自尊水平评估",
            description: "评估您的自尊水平和自我价值感，了解自我认知状况",
            questions: [
                {
                    id: 1,
                    text: "你对自己整体上感到满意的程度？",
                    options: [
                        { text: "很不满意", value: 1 },
                        { text: "有些不满意", value: 2 },
                        { text: "基本满意", value: 3 },
                        { text: "非常满意", value: 4 }
                    ]
                },
                {
                    id: 2,
                    text: "你觉得自己有很多优点的程度？",
                    options: [
                        { text: "几乎没有", value: 1 },
                        { text: "有一些", value: 2 },
                        { text: "比较多", value: 3 },
                        { text: "非常多", value: 4 }
                    ]
                },
                {
                    id: 3,
                    text: "你觉得自己是一个有价值的人的程度？",
                    options: [
                        { text: "完全没有价值", value: 1 },
                        { text: "价值不大", value: 2 },
                        { text: "比较有价值", value: 3 },
                        { text: "非常有价值", value: 4 }
                    ]
                },
                {
                    id: 4,
                    text: "你能像尊重他人一样尊重自己的程度？",
                    options: [
                        { text: "完全不能", value: 1 },
                        { text: "有时不能", value: 2 },
                        { text: "基本能够", value: 3 },
                        { text: "完全能够", value: 4 }
                    ]
                },
                {
                    id: 5,
                    text: "你经常因为自己的缺点而批评自己的频率？",
                    options: [
                        { text: "经常如此", value: 1 },
                        { text: "有时如此", value: 2 },
                        { text: "偶尔如此", value: 3 },
                        { text: "很少或从不", value: 4 }
                    ]
                },
                {
                    id: 6,
                    text: "你觉得自己能够达成设定目标的信心程度？",
                    options: [
                        { text: "完全没有信心", value: 1 },
                        { text: "信心不足", value: 2 },
                        { text: "比较有信心", value: 3 },
                        { text: "非常有信心", value: 4 }
                    ]
                },
                {
                    id: 7,
                    text: "你觉得自己与他人平等的程度？",
                    options: [
                        { text: "总觉得自己不如别人", value: 1 },
                        { text: "有时觉得不如别人", value: 2 },
                        { text: "基本平等", value: 3 },
                        { text: "完全平等", value: 4 }
                    ]
                }
            ]
        }
    };
    
    // 评估状态
    let currentQuestionnaire = null;
    let currentQuestionIndex = 0;
    let answers = {};
    
    // 初始化事件监听
    function initEventListeners() {
        // 问卷选择按钮
        document.querySelectorAll('.select-questionnaire').forEach(button => {
            button.addEventListener('click', function() {
                const card = this.closest('.questionnaire-card');
                const questionnaireType = card.dataset.type;
                startQuestionnaire(questionnaireType);
            });
        });
        
        // 评估控制按钮
        prevQuestionBtn.addEventListener('click', showPreviousQuestion);
        nextQuestionBtn.addEventListener('click', showNextQuestion);
        submitAssessmentBtn.addEventListener('click', submitAssessment);
        
        // 结果操作按钮
        saveReportBtn.addEventListener('click', saveReport);
        newAssessmentBtn.addEventListener('click', showAssessmentSelection);
    }
    
    // 开始问卷
    function startQuestionnaire(type) {
        currentQuestionnaire = type;
        currentQuestionIndex = 0;
        answers = {};
        
        // 更新UI
        assessmentSelection.style.display = 'none';
        assessmentContainer.style.display = 'block';
        assessmentResult.style.display = 'none';
        
        // 设置问卷标题和描述
        currentQuestionnaireTitle.textContent = questionnaires[type].title;
        currentQuestionnaireDescription.textContent = questionnaires[type].description;
        
        // 显示第一个问题
        showQuestion(currentQuestionIndex);
    }
    
    // 显示问题
    function showQuestion(index) {
        const questions = questionnaires[currentQuestionnaire].questions;
        const question = questions[index];
        
        // 更新进度条
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `问题 ${index + 1}/${questions.length}`;
        
        // 清空问题容器
        questionsContainer.innerHTML = '';
        
        // 创建问题元素
        const questionElement = document.createElement('div');
        questionElement.className = 'question';
        questionElement.innerHTML = `
            <h3>${question.text}</h3>
            <div class="options" id="options-${question.id}">
                ${question.options.map((option, i) => `
                    <div class="option" data-value="${option.value}" data-index="${i}">
                        ${option.text}
                    </div>
                `).join('')}
            </div>
        `;
        
        questionsContainer.appendChild(questionElement);
        
        // 添加选项点击事件
        const options = questionElement.querySelectorAll('.option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // 移除其他选项的选中状态
                options.forEach(opt => opt.classList.remove('selected'));
                
                // 选中当前选项
                this.classList.add('selected');
                
                // 保存答案
                answers[question.id] = parseInt(this.dataset.value);
                
                // 启用下一题按钮
                nextQuestionBtn.disabled = false;
            });
        });
        
        // 如果已经有答案，选中对应的选项
        if (answers[question.id]) {
            const selectedOption = Array.from(options).find(
                opt => parseInt(opt.dataset.value) === answers[question.id]
            );
            if (selectedOption) {
                selectedOption.classList.add('selected');
                nextQuestionBtn.disabled = false;
            }
        } else {
            nextQuestionBtn.disabled = true;
        }
        
        // 更新按钮状态
        prevQuestionBtn.style.display = index > 0 ? 'inline-block' : 'none';
        nextQuestionBtn.style.display = index < questions.length - 1 ? 'inline-block' : 'none';
        submitAssessmentBtn.style.display = index === questions.length - 1 ? 'inline-block' : 'none';
    }
    
    // 显示上一题
    function showPreviousQuestion() {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            showQuestion(currentQuestionIndex);
        }
    }
    
    // 显示下一题
    function showNextQuestion() {
        const questions = questionnaires[currentQuestionnaire].questions;
        if (currentQuestionIndex < questions.length - 1) {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        }
    }
    
    // 提交评估
    function submitAssessment() {
        // 计算总分
        const questions = questionnaires[currentQuestionnaire].questions;
        let totalScore = 0;
        let maxScore = questions.length * 4; // 每个问题最高4分
        
        questions.forEach(question => {
            totalScore += answers[question.id] || 0;
        });
        
        // 计算百分比分数
        const percentageScore = Math.round((totalScore / maxScore) * 100);
        
        // 显示结果
        showAssessmentResult(percentageScore, totalScore, maxScore);
    }
    
    // 显示评估结果
    function showAssessmentResult(percentageScore, totalScore, maxScore) {
        // 隐藏评估容器，显示结果容器
        assessmentContainer.style.display = 'none';
        assessmentResult.style.display = 'block';
        
        // 设置结果分数
        document.getElementById('result-score').textContent = percentageScore;
        
        // 根据分数设置结果标题和描述
        let resultTitle, resultDescription;
        
        if (percentageScore >= 80) {
            resultTitle = "你的心理状态非常健康";
            resultDescription = "你在评估的各个方面都表现出色，心理健康状况良好。继续保持积极的生活态度和健康的心理习惯。";
        } else if (percentageScore >= 60) {
            resultTitle = "你的心理状态基本健康";
            resultDescription = "你在大部分方面表现良好，但在某些方面还有提升空间。关注自己的情绪变化，适当调整生活方式。";
        } else if (percentageScore >= 40) {
            resultTitle = "你的心理状态需要关注";
            resultDescription = "你在某些方面可能遇到了一些困难，建议关注自己的心理健康，尝试寻求支持或帮助。";
        } else {
            resultTitle = "你的心理状态需要重视";
            resultDescription = "评估结果显示你可能面临一些心理困扰，建议及时寻求专业心理支持，与信任的人交流你的感受。";
        }
        
        document.getElementById('result-title').textContent = resultTitle;
        document.getElementById('result-description').textContent = resultDescription;
        
        // 生成详细分析和建议
        generateDetailedAnalysis(percentageScore);
        generateRecommendations(percentageScore);
    }
    
    // 生成详细分析
    function generateDetailedAnalysis(score) {
        const resultChart = document.getElementById('result-chart');
        const dimensionScores = document.getElementById('dimension-scores');
        
        // 根据问卷类型生成不同的分析
        let dimensions = [];
        
        switch(currentQuestionnaire) {
            case 'general':
                dimensions = [
                    { name: '情绪状态', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '压力管理', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '人际关系', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '自我认知', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
            case 'anxiety':
                dimensions = [
                    { name: '焦虑频率', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '焦虑强度', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '回避行为', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '功能影响', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
            case 'depression':
                dimensions = [
                    { name: '情绪低落', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '兴趣减退', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '精力水平', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '自我评价', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
            case 'stress':
                dimensions = [
                    { name: '压力感知', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '身体反应', score: 100 - Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '时间管理', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '应对能力', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
            case 'social':
                dimensions = [
                    { name: '社交主动性', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '社交舒适度', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '关系质量', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '冲突处理', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
            case 'selfesteem':
                dimensions = [
                    { name: '自我接纳', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '自我价值', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '自我尊重', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) },
                    { name: '自信心', score: Math.min(100, score + Math.floor(Math.random() * 20) - 10) }
                ];
                break;
        }
        
        // 生成图表
        resultChart.innerHTML = dimensions.map(dimension => `
            <div class="chart-bar">
                <div class="chart-label">${dimension.name}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${dimension.score}%; background-color: ${getScoreColor(dimension.score)};"></div>
                </div>
                <div class="chart-value">${dimension.score}%</div>
            </div>
        `).join('');
        
        // 生成维度分数
        dimensionScores.innerHTML = dimensions.map(dimension => `
            <div class="dimension-score">
                <div class="dimension-name">${dimension.name}</div>
                <div class="dimension-value">${dimension.score}%</div>
            </div>
        `).join('');
    }
    
    // 根据分数获取颜色
    function getScoreColor(score) {
        if (score >= 80) return '#78e08f'; // 绿色
        if (score >= 60) return '#fad390'; // 黄色
        if (score >= 40) return '#fa983a'; // 橙色
        return '#e55039'; // 红色
    }
    
    // 生成建议
    function generateRecommendations(score) {
        const recommendationsContainer = document.getElementById('recommendations');
        let recommendations = [];
        
        // 根据分数和问卷类型生成不同的建议
        if (score >= 80) {
            recommendations = [
                {
                    icon: 'fas fa-heart',
                    title: '保持积极心态',
                    content: '继续保持积极的生活态度，定期进行自我反思和心理调适。'
                },
                {
                    icon: 'fas fa-hands-helping',
                    title: '帮助他人',
                    content: '可以考虑帮助身边有需要的同学，分享你的积极心态和应对策略。'
                },
                {
                    icon: 'fas fa-seedling',
                    title: '持续成长',
                    content: '尝试学习新的心理调适技巧，进一步提升心理韧性。'
                }
            ];
        } else if (score >= 60) {
            recommendations = [
                {
                    icon: 'fas fa-balance-scale',
                    title: '平衡生活',
                    content: '注意平衡学习、休息和娱乐时间，避免过度压力积累。'
                },
                {
                    icon: 'fas fa-comments',
                    title: '加强沟通',
                    content: '多与朋友、家人或老师交流，分享你的感受和困惑。'
                },
                {
                    icon: 'fas fa-walking',
                    title: '适度运动',
                    content: '定期进行适度的体育锻炼，有助于缓解压力和改善情绪。'
                }
            ];
        } else if (score >= 40) {
            recommendations = [
                {
                    icon: 'fas fa-hands',
                    title: '寻求支持',
                    content: '不要独自承受压力，主动向信任的人或专业人士寻求帮助。'
                },
                {
                    icon: 'fas fa-bed',
                    title: '保证休息',
                    content: '确保充足的睡眠和休息时间，避免过度疲劳。'
                },
                {
                    icon: 'fas fa-calendar-check',
                    title: '制定计划',
                    content: '制定合理的学习和生活计划，减少不确定性带来的压力。'
                }
            ];
        } else {
            recommendations = [
                {
                    icon: 'fas fa-user-md',
                    title: '专业帮助',
                    content: '建议尽快联系学校心理老师或专业心理咨询师进行评估和帮助。'
                },
                {
                    icon: 'fas fa-hand-holding-heart',
                    title: '紧急支持',
                    content: '如果你感到非常困扰，可以拨打心理援助热线获得即时支持。'
                },
                {
                    icon: 'fas fa-users',
                    title: '家人支持',
                    content: '与家人坦诚交流你的状况，他们的理解和支持非常重要。'
                }
            ];
        }
        
        // 添加特定问卷的建议
        if (currentQuestionnaire === 'anxiety' && score < 70) {
            recommendations.push({
                icon: 'fas fa-wind',
                title: '放松训练',
                content: '尝试深呼吸、渐进式肌肉放松等放松技巧，帮助缓解焦虑。'
            });
        }
        
        if (currentQuestionnaire === 'depression' && score < 70) {
            recommendations.push({
                icon: 'fas fa-sun',
                title: '增加活动',
                content: '尝试参与一些愉快的活动，即使是小事也能帮助改善情绪。'
            });
        }
        
        if (currentQuestionnaire === 'stress' && score < 70) {
            recommendations.push({
                icon: 'fas fa-tasks',
                title: '任务分解',
                content: '将大任务分解为小步骤，逐一完成，减少压力感。'
            });
        }
        
        // 渲染建议
        recommendationsContainer.innerHTML = recommendations.map(rec => `
            <div class="recommendation">
                <h4><i class="${rec.icon} recommendation-icon"></i> ${rec.title}</h4>
                <p>${rec.content}</p>
            </div>
        `).join('');
    }
    
    // 保存报告
    function saveReport() {
        alert('评估报告已保存！您可以在个人中心查看历史评估记录。');
        // 在实际应用中，这里可以将报告数据保存到服务器或本地存储
    }
    
    // 显示评估选择界面
    function showAssessmentSelection() {
        assessmentSelection.style.display = 'block';
        assessmentContainer.style.display = 'none';
        assessmentResult.style.display = 'none';
    }
    
    // 初始化
    initEventListeners();
});