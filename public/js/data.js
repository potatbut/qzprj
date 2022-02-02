const quiz = {
  questions: [
    {
      image: "./img/1.jpg",
      text: "Возможность выбрать только один ответ",
      responses: [
        { text: "Wolves and hares" },
        { text: "Bulls and bears" },
        { text: "Cats and mice", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Sheep and wolves" },
      ],
    },

    {
      manyAnswers: true,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов",
      responses: [
        { text: "Glossary", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Atlas", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Index", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Captions" },
      ],
    },

    {
      image: "./img/3.png",
      text: "Изображения вместо текстовых ответов",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter", correct: true, comment: 'Текст почему это правильный ответ' },
        { img: "./img/3.png", text: "Encyclopedia" },
        { img: "./img/start.png", text: "Biography" },
      ],
    },

    {
      manyAnswers: true,
      image: "./img/2.jpeg",
      text: "Возможность выбрать несколько ответов снова и они не повляют на предыдущие несколько ответов",
      responses: [
        { text: "Какой-то ответ", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Еще один", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Снова ответ", correct: true, comment: 'Текст почему это правильный ответ' },
        { text: "Это тоже ответ" },
      ],
    },

    {
      manyAnswers: true,
      image: "./img/3.png",
      text: "Возможность выбрать нресколько ответов-изображений",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        { img: "./img/2.jpeg", text: "Harry Potter", correct: true, comment: 'Текст почему это правильный ответ' },
        { img: "./img/3.png", text: "Encyclopedia" },
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