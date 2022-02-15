# QUIZ 

## Настройки квиза:

#### Файл настроек: @/data/data.js
-----
``` javascript
/* questions - массив вопросов */
questions: [
  {
    manyAnswers: true, /* Строка добавляется, если в вопросе несколько ответов */
    correctAnswers: 2, /* Количество правильных ответов, если в вопросе несколько ответов */
    
    image: "./img/2.jpeg", /* Изображение для вопроса*/
    text: "Возможность выбрать несколько ответов", /* Вопрос */

    /* Массив ответов */
    responses: [ 
      /* Правильные ответы: 
        correct - указывает на то, что ответ верный, comment - комментарий или объяснение
      */
      { text: "Glossary", correct: true },
      { text: "Atlas", correct: true },

      /* Неправильные ответы: */
      { text: "Index" },
      { text: "Captions" },
    ],
    comment: 'Объяснение к парвильному ответу 1' /* Комментарий к ответу */
  },

  /* Вопрос с изображениями на месте текстовых ответов */
  {
    /* Не указывается image для вопроса */
    text: "Возможность выбрать несколько ответов - изображений. 2-ой и 3ий правильные", /* Вопрос */

    /* Массив ответов */
    responses: [
      /* Для изображений на месте текста, указывается параметр img со ссылкой на изображение */
      { img: "./img/1.jpg", text: "History Alive! Textbook" },
      { img: "./img/2.jpeg", text: "Harry Potter", correct: true },
      { img: "./img/3.png", text: "Encyclopedia" },
      { img: "./img/start.png", text: "Biography" },
    ],
    comment: 'Объяснение к парвильному ответу 2' /* Комментарий к ответу */
  },
],

/* Общие настройки */

plug: {
heading: {
  start: "Встречающий текст", /* Текст на стартовой странице */
},
image: { 
  start: "./img/start.png",  /* Изображение на старте */
  end: "./img/end.jpg" /* Изображение в конце */
},
buttontext: {
  start: "Start",  /* Текст для кнопок начала и конца */
  end: "Restart", /* Текст для кнопок начала и конца */
},
totalText: {
  raw : 'Это слова, если правильных ответов 1/3', /* <- */
  middle: 'Это слова, если правильных ответов 2/3',  /* Текст для разного количества правильных ответов */
  top: 'Это слова, если ответов больше, чем 2/3' /* <- */
  }
},

/* Доп. функции */
extraInfo: {
    answersAtEnd: true, /* Если указано true, в конце будет список правильных ответов */
},
extraText: {
    button: "Ok",  /* Текст для кнопки в ответах, скрывает ответы */
    right: "Ответ правильный", /* Текст для режима answersAtOnse */
    wrong: "Ответ неверный" /* Текст для режима answersAtOnse */
}
  
```
-----

### Project setup:
```
npm install
```

### Compiles and hot-reloads for development:
```
npm run serve
```

### Compiles and minifies for production:
```
npm run build
```

