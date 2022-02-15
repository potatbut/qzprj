const quiz = {
  questions: [
    {
      image: "./img/1.jpg",
      text: "Возможность выбрать только один ответ",
      responses: [
        { text: "Wolves and hares" },
        { text: "Bulls and bears" },
        { text: "Cats and mice (Правильный)", correct: true, },
        { text: "Sheep and wolves" },
      ],
      comment: 'Объяснение к парвильному ответу 1' 
    },

    {
      manyAnswers: true,
      correctAnswers: 3,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов",
      responses: [
        { text: "Glossary (Правильный)", correct: true },
        { text: "Atlas (Правильный)", correct: true }, 
        { text: "Index (Правильный)", correct: true },
        { text: "Captions" },
      ],
      comment: 'Объяснение к парвильному ответу 2' 
    },

    {
      text: "Изображения вместо текстовых ответов. 2-ой правильный",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter (Правильный)", correct: true },
        { img: "./img/3.png", text: "Encyclopedia" },
        { img: "./img/start.png", text: "Biography" },
      ],
      comment: 'Объяснение к парвильному ответу 3' 
    },

    {
      manyAnswers: true,
      correctAnswers: 2,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов снова и они не повляют на предыдущие несколько ответов",
      responses: [
        { text: "Какой-то ответ (Правильный)", correct: true},
        { text: "Еще один (Правильный)", correct: true },
        { text: "Снова ответ"},
        { text: "Это тоже ответ" },
      ],
      comment: 'Объяснение к парвильному ответу 4' 
      
    },

    {
      manyAnswers: true,
      correctAnswers: 2,
      text: "Возможность выбрать несколько ответов-изображений. 2-ой и 3ий правильные",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter (Правильный)", correct: true},
        { img: "./img/3.png", text: "Encyclopedia  (Правильный)", correct: true},
        { img: "./img/start.png", text: "Biography" },
      ],
      comment: 'Объяснение к парвильному ответу 5' 
    },

  ],

  plug: {
    heading: {
      start: "Встречающий текст",
      startSubText: "Встречающий подтекст"
    },
    image: { 
      start: "./img/start.png",
      end: "./img/end.jpg"
    },
    buttontext: {
      start: "Начать",
      end: "Restart",
    },
    totalText: {
      raw : 'Это слова, если правильных ответов 1/3',
      middle: 'Это слова, если правильных ответов 2/3',
      top: 'Это слова, если ответов больше, чем 2/3'
    }
  },
  extraInfo: {
      answersAtEnd: true,
  },
  extraText: {
      button: "Далее",
      correct: "Ответ правильный",
      wrong: "Ответ неверный"
  }
};

window.quiz = quiz
