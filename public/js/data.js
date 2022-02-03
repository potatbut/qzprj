const quiz = {
  questions: [
    {
      image: "./img/1.jpg",
      text: "Возможность выбрать только один ответ",
      responses: [
        { text: "Wolves and hares" },
        { text: "Bulls and bears" },
        { text: "Cats and mice (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Sheep and wolves" },
      ],
    },

    {
      manyAnswers: true,
      correctAnswers: 3,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов",
      responses: [
        { text: "Glossary (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Atlas (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Index (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Captions" },
      ],
    },

    {
      text: "Изображения вместо текстовых ответов. 2-ой правильный",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { img: "./img/3.png", text: "Encyclopedia" },
        { img: "./img/start.png", text: "Biography" },
      ],
    },

    {
      manyAnswers: true,
      correctAnswers: 2,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов снова и они не повляют на предыдущие несколько ответов",
      responses: [
        { text: "Какой-то ответ (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Еще один (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Снова ответ"},
        { text: "Это тоже ответ" },
      ],
    },

    {
      manyAnswers: true,
      correctAnswers: 2,
      text: "Возможность выбрать несколько ответов-изображений. 2-ой и 3ий правильные",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter (Правильный)", correct: true, comment: 'Текст почему это правильный ответ' },
        { img: "./img/3.png", text: "Encyclopedia", correct: true, comment: 'Текст почему это правильный ответ' },
        { img: "./img/start.png", text: "Biography" },
      ],
    },

  ],

  plug: {
    heading: {
      start: "Встречающий текст",
    },
    image: { 
      start: "./img/start.png",
      end: "./img/end.jpg"
    },
    buttontext: {
      start: "Start",
      end: "Restart",
    },
    totalText: {
      raw : 'Это слова, если правильных ответов 1/3',
      middle: 'Это слова, если правильных ответов 2/3',
      top: 'Это слова, если ответов больше, чем 2/3'
    }
  },

  extraInfo: {
      answersAtOnse: false,
      answersAtEnd: true,
  },
  extraText: {
      button: "Ok",
      right: "Ответ правильный",
      wrong: "Ответ неверный"
  }
  
  
};

window.quiz = quiz