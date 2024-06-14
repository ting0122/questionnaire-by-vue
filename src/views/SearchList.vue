<script>
import api from '@/api';


export default {
    name: 'SearchList',
    data() {
        return {
            searchResults:[],
            questionnaireName:'',
            startDate:'',
            endDate:'',
            selectedQuestionnaires:[]
        }
    },
    props:{
        questions: {
            type: Array,
            required: true
        },
        questionnaire: {
            type: Object,
            required: true
        }
    },
    emits: ['updateQuestionnaire', 'updateQuestions', 'returnText', 'save', 'publish'],

    mounted(){
        this.fetchAllQuestionnaires();
    },
    methods: {
        fetchAllQuestionnaires(){
            api.getAllQuestionnaires()
                .then(response => {
                    if(response.data.code === 200){
                        this.searchResults = response.data.questionnaires;
                    }
                    else{
                        console.error('Error fetching questionnaire:' , response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching questionnaires:', error);
                });
        },
        search() {
            const params = {
                name: this.questionnaireName,
                startDate: this.startDate,
                endDate: this.endDate
            };
            api.getQuestionnaires(params)
                .then(response => {
                    if(response.data.code === 200){
                        this.searchResults = response.data.questionnaires;
                    }
                    else{
                        console.error('Error fetching questionnaire:' , response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error searching questionnaires:', error);
                });
        },
        trash(){
            const toDelete = this.selectedQuestionnaires.filter(item =>{
                return !item.published || new Date(item.startTime) > new Date();
            });

            toDelete.forEach(item =>{
                api.deleteQuestionnaire(item.id)
                    .then(response=>{
                        console.log('Deleted quesionnaire:' , item.id);
                        this.fetchAllQuestionnaires();
                    })
                    .catch(error =>{
                        console.log('Error deleting questionnaire:', error);
                    });
            });
        },
        edit(){
            this.$emit('return-text','Title');
        },
        toggleSelection(item){
            const index = this.selectedQuestionnaires.indexOf(item);
            if(index > -1){
                this.selectedQuestionnaires.splice(index, 1);
            }else{
                this.selectedQuestionnaires.push(item);
            }
        }
    }
}
</script>

<template>
    <div class="header">
        <h1>NOT ONLY QUESTIONNAIRE</h1>
    </div>
    <div class="ListContainer">
        <div class="SearchBar">
            <div class="QuizName">
                <label for="quizName">Questionnaire :</label>
                <input type="search" id="quizName">
            </div>
            <div class="QuizPeriod">
                <label for="quizBegin">From :</label>
                <input type="date" id="quizBegin">
                <label for="quizEnd">To :</label>
                <input type="date" id="quizEnd">
                <button>Search</button>
            </div>
        </div>
        <div class="SearchResult">

        </div>
    </div>
</template>

<style scoped lang="scss">
*{
    background-color: #eeeae7;
    background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 4px 4px;
}
.header{
    font-family: "Playfair Display", serif;
    font-optical-sizing: auto;
    font-weight: 100;
    font-style: normal;
    font-size: 70px;
    // border: 1px solid black;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 40px;
    h1{
        width: 60%;
        text-align: center;
    }
}
.ListContainer{
    width: 100%;
    height: 200dvh;
    // border: 1px solid black;
    flex-direction: column;
    display: flex;
    align-items: center;
    .SearchBar{
        background-color: rgb(221,216,216);
        position: relative;
        margin-top: 80px;
        width: 40%;
        height: 13rem;
        // border: 1px solid black;
        display: flex;
        flex-direction: column;
        font-size: 40px;
        justify-content: start;
        padding-top: 20px;
        *{
            background-color: inherit;
        }
        .QuizName, .QuizPeriod{
            background-color: inherit;
            width: 100%;
            height: 50%;
            // border: 1px solid black;
            label, input{
                height: 40px;
                width: 65%;
                margin-left: 20px;
                font-size: 20px;
                padding: 20px;
            }
        }
        .QuizPeriod{
            input{
                width: 24%;
                font-size: 18px;
            }
            button{
                margin-left: 20px;
                width: 65px;
                height: 40px;
            }
        }
    }
    .SearchResult{
        width: inherit;
        height: 600px;
        border: 1px solid black;
    }
}
</style>
