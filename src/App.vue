<template>
  <div class="wrapper">
    <section class="quiz-section">
      <div id="quiz" class="quiz">
        <div
          class="progress"
          v-if="mode == 'start'"
          :style="{
            width:
              ((questionIndex + startProgress) / quiz.questions.length) * 100 +
              '%',
          }"
        ></div>
        <transition name="fade" mode="out-in">
          <div class="quiz-plug" ref="plugStart" v-if="!show">
            <transition name="fade" mode="out-in">
              <div class="quiz-head" v-if="mode == 'start'">
                <div class="quiz-head__question-number">
                  <p>{{ quiz.plug.heading.start }}</p>
                </div>

                <div class="quiz-head__image">
                  <div
                    :style="{
                      'background-image': 'url(' + quiz.plug.image.start + ')',
                    }"
                  ></div>
                </div>

                <div class="quiz-footer">
                  <button
                    @click="start"
                    ref="startButton"
                    class="quiz-footer__button"
                  >
                    {{ quiz.plug.buttontext.start }}
                  </button>
                </div>
              </div>

              <div class="quiz-head" v-else>
                <div class="quiz-head__question-number">
                  {{ totalText }}
                  <p>YOU SCORED A {{ correctAnswerSum }}</p>
                </div>
                <div class="quiz-head__image">
                  <div
                    :style="{
                      'background-image': 'url(' + quiz.plug.image.end + ')',
                    }"
                  ></div>
                </div>
                <div class="quiz-footer">
                  <button @click="restart" class="quiz-footer__button">
                    {{ quiz.plug.buttontext.end }}
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <div class="quiz-main" ref="main" v-else>
            <div class="quiz-head">
              <div class="quiz-head__question-text">
                <p>
                  {{ questionIndex + 1 }}.
                  {{ quiz.questions[questionIndex].text }}
                </p>
              </div>
              <transition name="fade">
                <div
                  class="quiz-head__image"
                  :key="quiz.questions[questionIndex].image"
                >
                  <div
                    :style="{
                      'background-image':
                        'url(' + quiz.questions[questionIndex].image + ')',
                    }"
                  ></div>
                </div>
              </transition>
            </div>

            <div class="quiz-body" :data-index="questionIndex">
              <div
                v-for="(response, index) in quiz.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
                @click.once="next(response)"
              >
                <input
                  type="radio"
                  :id="'response' + index"
                  :checked="selectedResponses[questionIndex] == response"
                />
                <label :for="'response' + index">
                  <span class="quiz-body__response-checkbox"> </span>
                  {{ response.text }}
                </label>
              </div>
            </div>

            <div class="quiz-footer">
              <button
                v-if="!questionIndex == 0"
                @click="prev"
                class="quiz-footer__button"
              >
                Previous
              </button>
              <div class="quiz-footer__question-number">
                {{ questionIndex + 1 }} /
                {{ quiz.questions.length }}
              </div>
            </div>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      quiz: window.quiz,
      questionIndex: 0,
      correctAnswerSum: 0,
      startProgress: 0,
      show: false,
      selectedResponses: [""],
      mode: "start",
      questionLength: quiz.questions.length,
      totalText: "",
    };
  },
  methods: {
    correctResponse: function (response) {
      if (response.correct) {
        this.correctAnswerSum += 1;
      }
    },

    resetQuiz: function () {
      this.selectedResponses = [];
      this.questionIndex = 0;
      this.mode = "start";
      this.correctAnswerSum = 0;
    },

    toggleShow: function () {
      this.show = !this.show;
    },

    totalScoreText: function () {
      const responseLevel = Math.floor(this.questionLength / 3);
      if (this.correctAnswerSum <= responseLevel) {
        this.totalText = quiz.plug.totalText.raw;
        console.log("мало");
      } else if (this.correctAnswerSum <= responseLevel * 2) {
        this.totalText = quiz.plug.totalText.middle;
        console.log("средне");
      } else if (this.correctAnswerSum > responseLevel * 2) {
        this.totalText = quiz.plug.totalText.top;
        console.log("гуд");
      }
    },

    start: function () {
      this.resetQuiz();
      this.startProgress += 1;
      this.toggleShow();
      this.$refs.startButton.setAttribute("disabled", "");
    },

    restart: function () {
      this.resetQuiz();
      this.startProgress = 0;
    },

    next: function (response) {
      if (this.questionIndex + 1 < this.questionLength) {
        setTimeout(() => (this.questionIndex += 1), 500);
        this.selectedResponses[this.questionIndex] = response;
        this.correctResponse(response);
      } else if (this.questionIndex + 1 == this.questionLength) {
        this.toggleShow();
        this.correctResponse(response);
        this.totalScoreText();
        this.mode = "end";
      }
    },
    prev: function () {
      if (this.questionIndex > 0) {
        this.questionIndex -= 1;
      }
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

.progress {
  background: rgba(102, 199, 255, 1);
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  transition: all 300ms;
}

.show {
  opacity: 1;
  z-index: 2;
}

.quiz {
  padding: 15px;
  box-shadow: 0px 11px 20px #e8eef4;
  border-radius: 0 0 10px 10px;
  background: rgba(255, 255, 255, 0.4);
  transition: all 300ms;
  font-size: 18px;
  position: relative;
  max-width: 600px;
  width: 100%;

  &-main {
    transition: all 300ms;
    position: relative;
    opacity: 1;
    z-index: 2;
    height: 100%;

    & .quiz-footer {
      text-align: left;
    }
    & .quiz-body {
      padding-top: 220px;
    }
  }

  &-plug {
    min-height: 250px;
    left: 0;
    top: 25%;
    width: 100%;
    transition: all 300ms;
    opacity: 1;
    z-index: 2;
    position: relative;
    & .quiz-footer {
      padding-top: 230px;
    }
  }

  &-head {
    padding: 0 10px;
    &__question-number {
      font-size: 24px;
    }
    &__image {
      max-height: 210px;
      div {
        border-radius: 5px;
        position: absolute;
        left: 0;
        background-size: cover;
        width: 100%;
        height: 200px;
      }
    }
  }

  &-body {
    &__response-checkbox {
      display: inline-block;
      position: absolute;
      left: 10px;
      top: 10px;
      background: #fff;
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid rgba(102, 199, 255, 0.6);
      transition: all 300ms;
    }
    &__response-text {
      cursor: pointer;
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba(102, 199, 255, 0.137);
      position: relative;
      transition: all 300ms;
      text-align: left;
      &:hover {
        background: rgba(102, 199, 255, 0.337);
      }
      label {
        cursor: pointer;
        display: block;
        padding: 10px;
        margin: 0;

        padding-left: 40px;
      }
      input[type="radio"] {
        position: absolute;
        width: 1px;
        height: 1px;
        z-index: -9;
        left: 10px;
        top: 10px;
      }

      input[type="radio"]:checked ~ label {
        border-radius: 10px;
        background: rgba(199, 102, 255, 0.137);
      }
      input[type="radio"]:checked ~ label .quiz-body__response-checkbox {
        background-image: url("../public/img/check.svg");
      }
    }
  }

  &-footer {
    min-height: 30px;
    text-align: center;
    position: relative;
    &__question-number {
      position: absolute;
      text-align: center;
      margin: 0 auto;
      left: 0;
      right: 0;
      top: 10px;
      z-index: 1;
    }
    &__button {
      background-color: rgba(102, 199, 255, 0.1);
      border-radius: 5px;
      color: inherit;
      border: none;
      z-index: inherit;
      padding: 10px;
      font: inherit;
      cursor: pointer;
      outline: inherit;
      transition: all 1s;
      position: relative;
      z-index: 2;
      &:hover {
        border-radius: 10px;
        background-color: rgba(255, 167, 166, 0.412);
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: 300ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>