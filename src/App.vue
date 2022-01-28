<template>
  <div class="wrapper">
    <section class="quiz-section">
      <div id="quiz" class="quiz">
        <div class="quiz-plug show" ref="plug">
          <div class="quiz-head">
            <div class="quiz-head__question-number">{{ quiz.plug.start }}</div>
            <div class="quiz-head__image">
              <img :src="quiz.plug.image.start" alt="cover" />
            </div>
            <div class="quiz-footer">
              <button @click="toggle" class="quiz-footer__button">Start</button>
            </div>
          </div>
        </div>
        <transition-group name="fade">
          <div class="quiz-main" ref="main" :v-if="show" :key="quiz">
            <div class="quiz-head">
              <div class="quiz-head__question-number">
                Question number
                {{ questionIndex + 1 }}/
                {{ quiz.questions.length }}
              </div>

              <div class="quiz-head__question-text">
                {{ quiz.questions[questionIndex].text }}
              </div>

              <div class="quiz-head__image">
                <img :src="quiz.questions[questionIndex].image" alt="cover" />
              </div>
            </div>

            <div class="quiz-body" ref="questionNumber" :data-index=questionIndex>
              <div
                v-for="(response, index) in quiz.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
                @click.once="next(response, $event)"
              >
                <input 
                  type="radio" 
                  :id="'response' + index"
                  :ref="'response' + index"
                  />
                <label
                  :for="'response' + index"
                  :class="{ checked: response.checked }"
                >
                  {{ response.text }}
                </label>
              </div>
            </div>

            <div class="quiz-footer" v-if="!questionIndex == 0">
              <button @click="prev" class="quiz-footer__button">Previous</button>
              <button @click="toggle" class="quiz-footer__button">
                Restart
              </button>
            </div>
          </div>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script>
import quiz from "./data/data.js";

export default {
  data() {
    return {
      quiz: quiz,
      questionIndex: 0,
      correctAnswer: 0,
      show: false,
      selectedResponses: [],
      questionNum: ''
    };
  },
  methods: {
    toggle: function() {
      this.$refs.plug.classList.toggle('show')
      this.$refs.main.classList.toggle('show')
      setTimeout(() => (this.questionIndex = 0), 500);
      
    },

    next: function (e, event) {
      const response = event.target.getAttribute('for')

      setTimeout(() => (this.questionIndex += 1), 500);
      this.checked = !this.checked;
      this.show = !this.show

      if (e.correct) {
        this.correctAnswer += 1;
      }

      this.selectedResponses.push(response)
      console.log("ответы: " + this.selectedResponses)

    },
    prev: function () {
      if (this.questionIndex > 0) {
        this.questionIndex -= 1;
      }

      
      this.questionNumber = this.$refs.questionNumber.getAttribute('data-index') - 1
      // console.log("номер вопроса:  " + this.questionNumber, this.selectedResponses[this.questionNumber])
      
      console.log(this.$refs.response1[0])
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");


body {
  font-family: "Roboto", arial, sans-serif;
  padding: 0;
  margin: 0;
  background-color: #f0f7fa;
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

.show {
  opacity: 1;
  z-index: 2;
}

.quiz {
  padding: 15px;
  box-shadow: 0px 11px 20px #e8eef4;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.4);
  transition: all 500ms;
  font-size: 18px;
  position: relative;

  &-main {
    opacity: 0;
    z-index: -10;
    transition: all 500ms;
    position: relative;

    &.show {
      opacity: 1;
      z-index: 2;
      height: 100%;
    }
  }

  &-plug {
    opacity: 0;
    z-index: -10;
    left: 0;
    top: 25%;
    width: 100%;
    transition: all 500ms;
    position: absolute;
    
    &.show {
      opacity: 1;
      z-index: 2;
    }

  }

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
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba(102, 199, 255, 0.137);
      position: relative;
      transition: all 500ms;
      &:hover {
        background: rgba(102, 199, 255, 0.337);
      }
      label {
        cursor: pointer;
        display: block;
        padding: 10px;
        margin: 0;
      }
      input[type="radio"] {
        position: absolute;
        width: 1px;
        height: 1px;
        z-index: -1;
      }

      input[type="radio"]:checked ~ label {
        border-radius: 10px;

        background: rgba(199, 102, 255, 0.137);
      }
    }
  }

  &-footer {
    display: flex;
    justify-content: space-around;
    &__button {
      background-color: rgba(102, 199, 255, 0.1);
      border-radius: 5px;
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

.fade-enter-active, .fade-leave-active {
  transition: 500ms;
}

.fade-enter-from, .fade-leave-to {
  transition: 500ms;
}

</style>