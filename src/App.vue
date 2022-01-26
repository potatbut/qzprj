<template>
  <div class="wrapper">
    <section class="quiz-section">
      <div id="quiz" class="quiz">
        <div class="quiz-head">
          <div class="quiz-head__question-number">
            Question number
            {{ quiz.questions[questionIndex].questionNumber }} /
            {{ quiz.questions.length }}
          </div>

          <div class="quiz-head__question-text">
            {{ quiz.questions[questionIndex].text }}
          </div>

          <div class="quiz-head__image">
            <img :src="quiz.questions[questionIndex].image" alt="cover" />
          </div>
        </div>

        <div class="quiz-body">
            <div
              v-for="response in quiz.questions[questionIndex].responses"
              :key="response.text"
              class="quiz-body__response-text"
              @click="next"
            >
              <p >
                {{ response.text }}
              </p>
            </div>
        </div>

        <div class="quiz-footer">
          <button @click="prev" class="quiz-footer__button">Previous</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
const quiz = {
  questions: [
    {
      questionNumber: 1,
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
      questionNumber: 2,
      image: "./img/2.svg",
      text: "What is?",
      responses: [
        { text: "Perfume", correct: true },
        { text: "Phone" },
        { text: "Beef" },
        { text: "Hospital" },
        { text: "Tongue" },
      ],
    },
    {
      questionNumber: 3,
      image: "./img/3.svg",
      text: "What is DIS?",
      responses: [
        { text: "Policy" },
        { text: "Orange" },
        { text: "Tower", correct: true },
      ],
    },
  ],
};

export default {
  data() {
    return {
      quiz: quiz,
      questionIndex: 0,
      correctAnswer: 0,
    };
  },
  methods: {
    next: function() {
      if (this.questionIndex < quiz.questions.length - 1) {
        this.questionIndex += 1;
      }
    },
    prev: function() {
      if (this.questionIndex > 0) {
        this.questionIndex -= 1;
      }
    }
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

body {
  font-family: "Roboto", arial, sans-serif;
  padding: 0;
  margin: 0;
  background-color: #F0F7FA;
}
.wrapper {
  height: 90vh;
  display: flex;
  align-items: center;
}
.quiz-section {
  margin: auto;
  min-width: 300px;
  text-align: center;
}

.quiz {
  padding: 15px;
  box-shadow: 0px 11px 20px #E8EEF4;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.4);
  transition: all 1s;
  font-size: 18px;
  &-head {
    &__question-number {
      font-size: 24px;
    }
    &__image {
      padding: 10px;
      img {
        width: 100px;
        height: 100px;
      }
    }
  }

  &-body {
    &__response-text {
      cursor: pointer;
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba(102, 199, 255, 0.137);
      &:hover {
      background: rgba(102, 199, 255, 0.337);
      }
      p {
        margin: 0;
      }
    }
  }

  &-footer {
    text-align: left;
    &__button {
        background: none;
        color: inherit;
        border: none;
        padding: 10px;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        transition: all 1s;
        &:hover {
          border-radius: 10px;
          background-color: rgba(255, 167, 166, 0.412);
        }
    }
  }
}
</style>