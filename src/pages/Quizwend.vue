<template>
  <div class="links">
    <router-link to="/">Главный</router-link>
  </div>
  <div class="wrapper">
    <section class="quiz-section">
      <div id="quiz" class="quiz">
        <div
          class="progress"
          v-if="mode == 'start'"
          :style="{
            width:
              ((questionIndex + startProgress) / quizwend.questions.length) *
                100 +
              '%',
          }"
        ></div>
        <div class="endAnswers" v-if="quizwend.extraInfo.answersAtEnd">
          <div class="quiz-head" v-if="end">
            <div
              v-for="(question, index) in quizwend.questions"
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
                <p v-if="respones.correct">{{ respones.text }}</p>
              </div>
            </div>

            <button @click="end = !end" class="quiz-footer__button">Ok</button>
          </div>
        </div>
        <div class="popup" v-if="quizwend.extraInfo.answersAtOnse">
          <div
            :class="'quiz-head answers answers' + correct"
            v-if="popup"
            ref="popup"
          >
            <div class="quiz-head__question-number" v-if="correctText">
              <p>{{ quizwend.extraText.right }}</p>
              <p>{{ correctText }}</p>
            </div>
            <div class="quiz-head__question-number" v-else>
              <p>{{ quizwend.extraText.wrong }}</p>
            </div>
            <div class="quiz-footer">
              <button @click="confirm" class="quiz-footer__button">
                {{ quizwend.extraText.button }}
              </button>
            </div>
          </div>
        </div>
        <transition name="extra" mode="out-in">
          <div class="quiz-plug" ref="plugStart" v-if="!show">
            <transition name="fade" mode="out-in">
              <div class="quiz-head" v-if="mode == 'start'">
                <div class="quiz-head__question-number">
                  <p>{{ quizwend.plug.heading.start }}</p>
                </div>

                <div class="quiz-head__image">
                  <div
                    :style="{
                      'background-image':
                        'url(' + quizwend.plug.image.start + ')',
                    }"
                  ></div>
                </div>

                <div class="quiz-footer">
                  <button
                    @click="start"
                    ref="startButton"
                    class="quiz-footer__button"
                  >
                    {{ quizwend.plug.buttontext.start }}
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
                      'background-image':
                        'url(' + quizwend.plug.image.end + ')',
                    }"
                  ></div>
                </div>
                <div class="quiz-footer">
                  <button @click="restart" class="quiz-footer__button">
                    {{ quizwend.plug.buttontext.end }}
                  </button>
                  <button
                    @click="end = !end"
                    v-if="quizwend.extraInfo.answersAtEnd"
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
                  {{ quizwend.questions[questionIndex].text }}
                </p>
              </div>
              <transition name="fade">
                <div
                  class="quiz-head__image"
                  :key="quizwend.questions[questionIndex].image"
                >
                  <div
                    :style="{
                      'background-image':
                        'url(' + quizwend.questions[questionIndex].image + ')',
                    }"
                  ></div>
                </div>
              </transition>
            </div>

            <div
              class="quiz-body"
              :data-index="questionIndex"
              v-if="!quizwend.questions[questionIndex].manyAnswers"
            >
              <div
                v-for="(response, index) in quizwend.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
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
                  <img
                    v-if="response.img"
                    :src="response.img"
                    :alt="response.text"
                    class="quiz-body__response-img"
                  />
                </label>
              </div>
            </div>

            <div
              class="quiz-body"
              :data-index="questionIndex"
              v-else-if="quizwend.questions[questionIndex].manyAnswers"
            >
              <div
                v-for="(response, index) in quizwend.questions[questionIndex]
                  .responses"
                :key="response.text"
                class="quiz-body__response-text"
              >
                <input
                  @click="select(response)"
                  type="checkbox"
                  :value="response"
                  :name="'response' + index"
                  :id="'response' + index"
                  v-model="manySelected"
                />
                <label :for="'response' + index">
                  <span class="quiz-body__response-checkbox"> </span>
                  <span v-if="!response.img">{{ response.text }}</span>
                  <img
                    v-if="response.img"
                    :src="response.img"
                    :alt="response.text"
                    class="quiz-body__response-img"
                  />
                </label>
              </div>
            </div>

            <div class="quiz-footer">
              <!-- <br />
              из радио: {{ selectedResponses }}
              <br />
              из чекбоксов: {{ manySelected }}
              <br /> -->

              <button
                v-if="!questionIndex == 0"
                @click="prev"
                class="quiz-footer__button"
              >
                Previous
              </button>
              <div class="quiz-footer__question-number">
                {{ questionIndex + 1 }} /
                {{ quizwend.questions.length }}
              </div>
              <button @click="next" class="quiz-footer__button">Next</button>
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
      quizwend: quizwend,
      questionIndex: 0,
      correctAnswerSum: 0,
      startProgress: 0,
      show: false,
      manySelected: [],
      selectedResponses: [],
      mode: "start",
      questionLength: quizwend.questions.length,
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

      const totalArray = filtered.concat(secondarray);

      for (let i = 0; i < totalArray.length; i++) {
        if (totalArray[i].correct) {
          this.correctAnswerSum++;
        }
      }
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
      const responseLevel = Math.floor(9 / 3);
      if (this.correctAnswerSum <= responseLevel) {
        this.totalText = quizwend.plug.totalText.raw;
      } else if (
        responseLevel < this.correctAnswerSum &&
        this.correctAnswerSum <= responseLevel * 2
      ) {
        this.totalText = quizwend.plug.totalText.middle;
      } else if (this.correctAnswerSum > responseLevel * 2) {
        this.totalText = quizwend.plug.totalText.top;
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

    next: function () {
      if (this.questionIndex + 1 < this.questionLength) {
        this.popup = !this.popup;
        this.questionIndex += 1;
      } else if (this.questionIndex + 1 == this.questionLength) {
        this.popup = !this.popup;

        this.toggleShow();
        this.correctResponse(this.selectedResponses, this.manySelected);
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

const quizwend = {
  questions: [
    {
      image: "./img/1.jpg",
      text: "Ut enim ad minim veniam, unde omnis iste natus error...",
      responses: [
        { text: "Wolves and hares" },
        { text: "Bulls and bears" },
        {
          text: "Cats and mice",
          correct: true,
          comment: "Текст почему это правильный ответ",
        },
        { text: "Sheep and wolves" },
      ],
    },

    {
      image: "./img/2.jpeg",
      text: "Nemo enim ipsam voluptatem, consectetur adipiscing elit, ut et voluptates...",
      responses: [
        { text: "Glossary" },
        {
          text: "Atlas",
          correct: true,
          comment: "Текст почему это правильный ответ",
        },
        { text: "Index" },
        { text: "Captions" },
      ],
    },

    {
      image: "./img/3.png",
      text: "Duis aute irure dolor in reprehenderit in voluptate, quis nostrum...",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        {
          img: "./img/2.jpeg",
          text: "Harry Potter",
          correct: true,
          comment: "Текст почему это правильный ответ",
        },
        { img: "./img/3.png", text: "Encyclopedia" },
        { img: "./img/start.png", text: "Biography" },
      ],
    },

    {
      image: "./img/2.jpeg",
      text: "Et harum quidem rerum facilis est et expedita distinctio, quia...",
      responses: [
        { text: "Какой-то ответ" },
        {
          text: "Еще один",
          correct: true,
          comment: "Текст почему это правильный ответ",
        },
        { text: "Снова ответ" },
        { text: "Это тоже ответ" },
      ],
    },

    {
      image: "./img/3.png",
      text: "Lorem ipsum dolor sit amet, qui blanditiis praesentium voluptatum deleniti...",
      responses: [
        { img: "./img/1.jpg", text: "History Alive! Textbook" },
        {
          img: "./img/2.jpeg",
          text: "Harry Potter",
          correct: true,
          comment: "Текст почему это правильный ответ",
        },
        { img: "./img/3.png", text: "Encyclopedia" },
        { img: "./img/start.png", text: "Biography" },
      ],
    },
  ],

  plug: {
    heading: {
      start: "Список правильных ответов выводится в конце",
    },
    image: {
      start: "./img/start.png",
      end: "./img/end.jpg",
    },
    buttontext: {
      start: "Start",
      end: "Restart",
    },
    totalText: {
      raw: "Какая-то система подсчета",
      middle: "Это слова, если правильных ответов 2/3",
      top: "Это слова, если ответов больше, чем 2/3",
    },
  },

  extraInfo: {
    answersAtOnse: false,
    answersAtEnd: true,
  },
  extraText: {
    button: "Ok",
    right: "Ответ правильный",
    wrong: "Ответ неверный",
  },
};
</script>
<style lang="scss">
</style>