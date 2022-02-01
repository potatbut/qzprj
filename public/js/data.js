const quiz = {
  questions: [

    {
      image: "./img/1.jpg",
      text: "Which animals live in the market?",
      responses: [
        { text: "Wolves and hares" },
        { text: "Bulls and bears" },
        { text: "Cats and mice", correct: true },
        { text: "Sheep and wolves" },
      ],
    },

    {
      image: "./img/2.jpeg",
      text: "This feature illustrates one or more geographical regions and can be found at the back of most history textbooks.",
      responses: [
        { text: "Glossary " },
        { text: "Atlas", correct: true },
        { text: "Index" },
        { text: "Captions" },
      ],
    },

    {
      image: "./img/3.png",
      text: "Which one of the following is not an Expository Text?",
      responses: [
        { text: "History Alive! Textbook" },
        { text: "Harry Potter", correct: true },
        { text: "Encyclopedia" },
        { text: "Biography" },
      ],
    },


  ],

  plug: {
    heading: {
      start: "How good you are at somthing?",
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
      raw : 'You have just started your way to know somthiung. You yet have a lot to learn to become a pro.',
      middle: 'Almost here',
      top: 'Good'
    }
    
  }
    
  
};

window.quiz = quiz