    <script>
    //child components
    import Title from './Title.vue'
    import Question from './Question.vue';
    import FeedBack from './FeedBack.vue';
    import Statics from './Statics.vue';
    import SearchList from './SearchList.vue';
    import SubmitPage from './SubmitPage.vue';
    import { parse } from 'vue/compiler-sfc';
    import api from '@/api';

    export default{
        data(){
            return{
                //index page 
                //storage of the components input event information
                currentComponent: 'SearchList',
                questionnaire:{
                    name:'',
                    description: '',
                    startDate:'',
                    endDate:'',
                },
                //questions and choices
                questions:[],
                //manage or client mode
                isLocked:true
            }
        },
        components:{
            Title,
            Question,
            FeedBack,
            Statics,
            SearchList,
            SubmitPage,
        },
        methods:{
            //change manage or client mode
            toggleLock(){
                this.isLocked = !this.isLocked;
            },
            //change component page
            changeComponent(componentName){
                this.currentComponent = componentName;
            },
            //build a questionnaire
            updateQuestionnaire(newData){
                this.questionnaire = {...this.questionnaire, ...newData};
            },
            //build a question
            updateQuestions(newQuestions){
                this.questions = newQuestions;
            },
            //save to the web browser
            saveQuiz(){
                const data = {
                    questionnaire: this.questionnaire,
                    question: this.questions
                };
                api.saveQuestionnaire(data)
                    .then(response => {
                        console.log('Questionnaire saved:', response.data);
                    })
                    .catch(error =>{
                        console.log('Error saving questionnaire:', error);
                    });
            },
            //push questioinnaire to backend
            publishQuiz(){
                const data = {
                    questionnaire: this.questionnaire,
                    questions: this.questions
                };
                api.saveQuestionnaire(data)
                    .then(response => {
                        console.log('Questionnaire saved:', response.data);
                    })
                    .catch(error =>{
                        console.log('Error saving questionnaire:', error);
                    });
            }
        },
        mounted() {
                //take questionnaire information from web browser
                const saveData = localStorage.getItem('questionnaireData');
                if(saveData){
                    const parsedData = JSON.parse(saveData);
                    this.questionnaire = parsedData.questionnaire;
                    this.questions = parsedData.questions;
                }
        }
    }
    </script>

    <template>
        <div class="icons">
            <i class="fa-solid fa-lock" v-if="isLocked" @click="toggleLock"></i>
            <i class="fa-solid fa-lock-open" v-else @click="toggleLock"></i>
        </div>
        <div class="Show">
            <component  :is="currentComponent"
                        :questions="questions"
                        :questionnaire="questionnaire"
                        :is-locked="isLocked"
                        @update-questionnaire="updateQuestionnaire"
                        @update-questions="updateQuestions"
                        @return-text="changeComponent"
                        @save-quiz="saveQuiz"
                        @publish-quiz="publishQuiz"
                        >
            </component>
        </div>
    </template>
    <style scoped lang="scss">
    *{
        background-color: #eeeae7;
        background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
        background-size: 4px 4px;
    }
    .icons{
        z-index: 2;
        width: 100%;
        height: 1%;
        text-align: right;
        i{
            font-size: 30px;
        }
    }
    .Show{
        position: absolute;
        height: auto;
        width: 100dvw;
    }
    </style>