<script>
import headerVue from '@/components/header.vue';

export default{
    name: 'Title',
    props:{
        questionnaire: Object
    },
    data(){
        return{
            localQuestionnaire: {...this.questionnaire}
        }
    },
    emits: ['updateQuestionnaire', 'updateQuestions', 'returnText', 'save', 'publish','return-text'],
    components:{headerVue},
    methods:{
        //return to search list
        cancel(){
            this.$emit("return-text",'SearchList')
        },
        //go to next page
        next(){
            this.$emit("update-questionnaire",this.localQuestionnaire);
            this.$emit("return-text",'Question');
        }
    }
}
</script>

<template>
    <headerVue></headerVue>
    <div class="BasicQuiz">
        <div class="q1">
            <label for="quizName">Questionnaire :</label>
            <input type="text" name="quizName" id="quizName" v-model="localQuestionnaire.name">
        </div>
        <div class="q1">
            <label for="quizDesc">description :</label>
            <textarea name="quizDesc" id="quizDesc" v-model="localQuestionnaire.description"></textarea>
        </div>
        <div class="q1 dt" id="afterDesc">
            <label for="startDate">Start Date :</label>
            <input type="date" id="startDate" v-model="localQuestionnaire.startDate">
        </div>
        <div class="q1 dt">
            <label for="endDate">End Date :</label>
            <input type="date" id="endDate" v-model="localQuestionnaire.endDate">
        </div>
        <div class="btn">
            <button @click="cancel">Cancel</button>
            <button @click="next">Next</button>
        </div>
    </div>
    <div class="Content"></div>
</template>

<style scoped lang="scss">
*{
    background-color: #eeeae7;
    background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 4px 4px;
}
.BasicQuiz{
    width: 100%;
    height: 80dvh;
    border-bottom: 3px dotted black;
    font-size: 40px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
    .q1{
        margin-top: 20px;
        margin-left: 25%;
        input, textarea{
            position: absolute;
            left: 40%;
            width: 40%;
            height: 40px;
            font-size: 20px;
            padding-left: 30px;
            padding-right: 30px;
        }
        textarea{
            resize: none;
            padding: 10px 20px;
            min-height: 20%;
        }
    }
    .dt{
        input{
            width: 15%;
            padding-left: 60px;
        } 
    }
    #afterDesc{
        margin-top: 9%;
    }
    .btn{
        position: absolute;
        bottom: 20%;
        right: 5%;
        width: 30%;
        button{
            width: 25%;
            margin-left: 20px;
            font-size: 40px;
        }
    }
}
.Content{
    width: 100%;
    height: 12dvh;
}

</style>