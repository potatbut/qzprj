const quiz = {
  questions: [

    {
      image: "./img/1.svg",
      text: "What?",
      responses: [
        { text: "Cucumber" },
        { text: "Phone", correct: true },
        { text: "PC" },
        { text: "Table" },
      ],
    },

    {
      image: "./img/2.svg",
      text: "What is?",
      responses: [
        { text: "Perfume", correct: true },
        { text: "Wednesday" },
        { text: "Beef" },
        { text: "Hospital" },
        { text: "Tongue" },
      ],
    },

    {
      image: "./img/3.svg",
      text: "What is DIS?",
      responses: [
        { text: "Policy" },
        { text: "Orange" },
        { text: "Tower", correct: true },
      ],
    },


  ],

  plug: {
    start: "Hello yes u can start",
    end: "Bye u cool :^) Or start again",
    image: { 
      start: "./img/test.svg",
      end: "./img/end.svg"
    },
    
  }
    
  
};

export default quiz