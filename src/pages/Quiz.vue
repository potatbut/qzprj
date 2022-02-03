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
        <div class="endAnswers" v-if="quiz.extraInfo.answersAtEnd">
          <div class="quiz-head" v-if="end">
            <div
              v-for="(question, index) in quiz.questions"
              :key="question.text"
              class="quiz-body__response-text"
            >
              <p>{{ index + 1 }}. {{ question.text }}</p>
              Правильный ответ:
              <div
                v-for="respones in question.responses"
                :key="respones.correct"
                class="quiz-body__response-text-answer"
              >
                <div v-if="respones.correct">{{ respones.text }}
                  <div v-if="respones.img"
                class="quiz-body__response-img"
                :style="{ 'background-image': 'url(' + respones.img + ')' }"></div></div>
                
              </div>
            </div>

            <button @click="end = !end" class="quiz-footer__button">Ok</button>
          </div>
        </div>
        <div class="popup" v-if="quiz.extraInfo.answersAtOnse">
          <div
            :class="'quiz-head answers answers' + correct"
            v-if="popup"
            ref="popup"
          >
            <div class="quiz-head__question-number" v-if="correctText">
              <p>{{ quiz.extraText.right }}</p>
              <p>{{ correctText }}</p>
            </div>
            <div class="quiz-head__question-number" v-else>
              <p>{{ quiz.extraText.wrong }}</p>
            </div>
            <div class="quiz-footer">
              <button @click="confirm" class="quiz-footer__button">
                {{ quiz.extraText.button }}
              </button>
            </div>
          </div>
        </div>
        <transition name="extra" mode="out-in">
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
                  <p>Количество правильных ответов: {{ correctAnswerSum }}</p>
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
                  <button
                    @click="end = !end"
                    v-if="quiz.extraInfo.answersAtEnd"
                    class="quiz-footer__button"
                  >
                    Answers
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
                  v-if="quiz.questions[questionIndex].image"
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

            <div
              class="quiz-body"
              :class="{ noimage: !quiz.questions[questionIndex].image }"
              :data-index="questionIndex"
              v-if="!quiz.questions[questionIndex].manyAnswers"
            >
              <div
                v-for="(response, index) in quiz.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
                :style="{ 'background-image': 'url(' + response.img + ')' }"
              >
                <input
                  @click="select(response)"
                  :checked="selectedResponses[questionIndex] == response"
                  type="radio"
                  :value="response"
                  name="radio"
                  :id="'response' + index"
                  v-model="selectedResponses[questionIndex]"
                />
                <label :for="'response' + index">
                  <span class="quiz-body__response-checkbox"> </span>
                  <span v-if="!response.img">{{ response.text }}</span>
                </label>
              </div>
            </div>

            <div
              class="quiz-body"
              :class="{ noimage: !quiz.questions[questionIndex].image }"
              :data-index="questionIndex"
              v-else-if="quiz.questions[questionIndex].manyAnswers"
            >
              <div
                v-for="(response, index) in quiz.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
                :style="{ 'background-image': 'url(' + response.img + ')' }"
              >
                <input
                  v-model="manySelected"
                  type="checkbox"
                  :value="{ [questionIndex]: response }"
                  :name="'response' + index"
                  :id="'response' + index"
                  @click="select(response)"
                />
                <label :for="'response' + index">
                  <span class="quiz-body__response-checkbox"> </span>
                  <span v-if="!response.img">{{ response.text }}</span>
                  <div
                    :style="{
                      'background-image': 'url(' + response.img + ')',
                    }"
                  ></div>
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
              <button
                @click="next([questionIndex])"
                class="quiz-footer__button"
              >
                Next
              </button>
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
      manySelected: {},
      manySelectedSort: [],
      selectedResponses: [],
      mode: "start",
      questionLength: quiz.questions.length,
      totalText: "",
      popup: false,
      correct: "",
      correctText: "",
      end: false,
    };
  },
  methods: {
    correctResponse: function (array, secondarray) {
      const filtered = array.filter(function (el) {
        return el != null;
      });

      const filteredMany = this.manySelectedSort.filter(function (el) {
        return el != undefined;
      });

      for (let i = 0; i < filtered.length; i++) {
        if (filtered[i].correct) {
          this.correctAnswerSum++;
        }
      }

      this.correctAnswerSum += filteredMany.length;
    },
    resetQuiz: function () {
      this.selectedResponses = [];
      this.manySelected = [];
      this.questionIndex = 0;
      this.mode = "start";
      this.correctAnswerSum = 0;
    },

    toggleShow: function () {
      this.show = !this.show;
    },

    totalScoreText: function () {
      /* Количество уровней правильных ответов взятое из головы */
      const responseLevel = Math.floor(this.questionLength / 3);
      if (this.correctAnswerSum <= responseLevel) {
        this.totalText = quiz.plug.totalText.raw;
      } else if (
        responseLevel < this.correctAnswerSum &&
        this.correctAnswerSum <= responseLevel * 2
      ) {
        this.totalText = quiz.plug.totalText.middle;
      } else if (this.correctAnswerSum > responseLevel * 2) {
        this.totalText = quiz.plug.totalText.top;
      }
    },

    confirm: function () {
      this.popup = !this.popup;
      this.correctText = false;
      this.correct = "";
    },

    select: function (response) {
      if (response.correct) {
        this.correct = "-right";
        this.correctText = response.comment;
      } else {
        this.correct = "-wrong";
        this.correctText = "";
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

    manyAnswerFunction: function (questionIndex) {
      if (quiz.questions[questionIndex].manyAnswers) {
        let sumSelected = [];
        let sumCorrect = 0;
        for (let i = 0; i < this.manySelected.length; i++) {
          if (this.manySelected[i][questionIndex]) {
            sumSelected.push(this.manySelected[i][questionIndex]);
          }
        }
        for (let i = 0; i < sumSelected.length; i++) {
          if (sumSelected[i].correct) {
            sumCorrect += 1;
          }
        }
        const selectedarr = sumSelected.length;
        const quizAnswer = quiz.questions[questionIndex].correctAnswers;
        if (selectedarr == quizAnswer || sumCorrect == quizAnswer) {
          this.manySelectedSort[questionIndex] = 1;
        } else {
          this.manySelectedSort.splice([questionIndex], 1);
        }
      }
    },

    next: function (questionIndex) {
      if (this.questionIndex + 1 < this.questionLength) {
        this.popup = !this.popup;
        this.questionIndex += 1;

        this.manyAnswerFunction(questionIndex);
      } else if (this.questionIndex + 1 == this.questionLength) {
        this.popup = !this.popup;
        this.manyAnswerFunction(questionIndex);

        this.toggleShow();
        this.correctResponse(this.selectedResponses, this.manySelectedSort);
        this.mode = "end";
        this.totalScoreText();
      }
    },
    prev: function () {
      if (this.questionIndex > 0) {
        this.questionIndex -= 1;
      }

      this.correctText = false;
      this.correct = "";
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
  height: 50vh;
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
  transition: all 400ms;
}

.quiz {
  padding: 15px;
  box-shadow: 0px 11px 20px #e8eef4;
  border-radius: 0 0 10px 10px;
  background: rgba(255, 255, 255, 0.4);
  transition: all 400ms;
  font-size: 18px;
  position: relative;
  max-width: 600px;
  width: 100%;

  .endAnswers {
    background-color: #fff;
    left: 0;
    top: 0;
    position: absolute;
    z-index: 7;
    & .quiz-body__response-text {
      cursor: text;
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba(204, 204, 204, 0.137);
      position: relative;
      transition: all 400ms;
      text-align: left;
      & p {
        margin: 10px 0;
      }
    }

    & .quiz-body__response-text-answer {
      background: rgba(207, 255, 221, 0.699);
      & p {
        margin: 10px 0;
        text-align: center;
      }
      & .quiz-body__response-img {
        width: 100px;
        height: 100px;
        background-size: cover;
      }
    }
  }

  &-main {
    transition: all 400ms;
    position: relative;
    opacity: 1;
    z-index: 2;
    height: 100%;

    & .quiz-footer {
      text-align: left;
    }
    & .quiz-body {
      padding-top: 220px;
      &.noimage {
        z-index: 3;
        padding-top: 20px;
        display: grid;
        grid-column-gap: 10px;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 150px);
      }
    }
  }

  &-plug {
    min-height: 250px;
    left: 0;
    top: 25%;
    width: 100%;
    transition: all 400ms;
    opacity: 1;
    z-index: 2;
    position: relative;
    & .quiz-footer {
      padding-top: 230px;
      justify-content: center;
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
        z-index: 3;
      }
    }
    &.answers {
      padding: 0;
      border-radius: 10px;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      z-index: 7;
      display: flex;
      flex-direction: column;
      text-align: center;
      justify-content: space-evenly;
      & .quiz-footer {
        justify-content: center;
      }
      &-right {
        background: rgb(172, 224, 181);
      }
      &-wrong {
        background: rgb(224, 172, 172);
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
      transition: all 400ms;
    }
    &__response-img {
      max-width: 100%;
    }
    &__response-text {
      cursor: pointer;
      margin-bottom: 10px;
      border-radius: 10px;
      background: rgba(102, 199, 255, 0.137);
      position: relative;
      transition: all 400ms;
      text-align: left;
      background-size: cover;
      &:hover {
        background-color: rgba(102, 199, 255, 0.337);
      }
      label {
        cursor: pointer;
        display: block;
        margin: 0;
        max-height: 50px;
        overflow: hidden;
        padding-left: 40px;
        height: 100%;
        max-height: 100%;
        line-height: 2.5;
        &:hover {
          background-color: rgba(102, 199, 255, 0.337);
          border-radius: 10px;
          opacity: 0.8;
        }
      }
      input[type="radio"],
      input[type="checkbox"] {
        position: absolute;
        width: 1px;
        height: 1px;
        z-index: -9;
        left: 10px;
        top: 10px;
      }
      input[type="radio"]:checked ~ label,
      input[type="checkbox"]:checked ~ label {
        border-radius: 10px;
        background: rgba(199, 102, 255, 0.137);
        height: 100%;
      }
      input[type="radio"]:checked ~ label .quiz-body__response-checkbox,
      input[type="checkbox"]:checked ~ label .quiz-body__response-checkbox {
        background-image: url("../../public/img/check.svg");
      }
    }
  }

  &-footer {
    min-height: 30px;
    text-align: center;
    position: relative;
    display: flex;
    justify-content: space-between;

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
  transition: 400ms;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.extra-enter-active,
.extra-leave-active {
  transition: 100ms;
}

.extra-enter-from,
.extra-leave-to {
  z-index: -3;
}
</style>