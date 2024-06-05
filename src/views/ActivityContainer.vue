<script>
//child components
import Title from './Title.vue'
import Question from './Question.vue';
import FeedBack from './FeedBack.vue';
import Statics from './Statics.vue';
import SearchList from './SearchList.vue';
import SubmitPage from './SubmitPage.vue';
import { parse } from 'vue/compiler-sfc';

export default{
    data(){
        return{
            currentComponent: 'SearchList',
            questionnaire:{
                name:'',
                description: '',
                startDate:'',
                endDate:'',
            },
            questions:[]
        }
    },
    components:{
        Title,
        Question,
        FeedBack,
        Statics,
        SearchList,
        SubmitPage
    },
    methods:{
        changeComponent(componentName){
            this.currentComponent = componentName;
        },
        updateQuestionnaire(newData){
            this.questionnaire = {...this.questionnaire, ...newData};
        },
        updateQuestions(newQuestions){
            this.questions = newQuestions;
        },
        saveToLocalStorage(){
            const data = {
                questionnaire: this.questionnaire,
                question: this.questions
            };
            localStorage.setItem('questionnaireData', JSON.stringify(data));
        },
        publishToServer(){
            const data = {
                questionnaire: this.questionnaire,
                questions: this.questions
            };
            // Send data to server
            // axios.post('/api/save', data).then(...);
        },
        mounted() {
            const saveData = localStorage.getItem('questionnaireData');
            if(savedData){
                const parsedData = JSON.parse(saveData);
                this.questionnaire = parsedData.questionnaire;
                this.questions = parseData.questions;
            }
        },
    }
}
</script>

<template>
    <div class="show-bar">
        <component  :is="currentComponent"
                    :questions="questions"
                    :questionnaire="questionnaire"
                    @update-questionnaire="updateQuestionnaire"
                    @update-questions="updateQuestions"
                    @return-text="changeComponent"
                    @save="saveToLocalStorage"
                    @publish="publishToServer">
        </component>
    </div>
</template>

<style scoped lang="scss">
    .show-bar{
        position: absolute;
        left: 10%;
        top:5%;
        border: 1px solid black;
        height: 90dvh;
        width: 80dvw;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
    }
</style>