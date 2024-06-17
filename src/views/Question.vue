<script>
import Header from '@/components/header.vue';

export default{
    name: 'Question',
    props:{
        questions: Array
    },
    data(){
        return{
            newQuestion: {
                questionText: '',
                choices: '',
                type: '單選題',
                required: false
            }
        }
    },
    emits: ['updateQuestionnaire', 'updateQuestions', 'returnText', 'save', 'publish'],
    components:{Header},
    methods:{
        Previous(){
            this.$emit('return-text','Title')
        },
        addQuestion(){
            const choicesArray = this.newQuestion.choices.split(';').map(choice => choice.trim());
            const question = { ...this.newQuestion, choices: choicesArray};
            this.$emit('update-questions',[...this.questions,question]);
            this.newQuestion.questionText='';
            this.newQuestion.choices='';
            this.newQuestion.type='單選題';
            this.newQuestion.required=false;
        },
        removeQuestion(index){
            const updateQuestions = [...this.questions];
            updateQuestions.splice(index,1);
            this.$emit('update-questions', updateQuestions);
        },
        submitQuestions(){
            this.$emit('return-text','SubmitPage');
        }
    }
}
</script>

<template>
    <Header></Header>
    <div class="BigContainer">
        <div class="QuizAdd">
            <div class="q1">
                <label for="question">Question :</label>
                <input type="text" id="question" v-model="newQuestion.questionText" placeholder="Enter your Question...">
                <select name="type" id="type" v-model="newQuestion.type">
                    <option value="單選題">MCQ</option>
                    <option value="複選題">MRQ</option>
                    <option value="文字題">FITB</option>
                </select>
                <label for="required">Required :</label>
                <input type="checkbox" v-model="newQuestion.required" id="cb">
            </div>
            <div class="q2">
                <label for="choices">Choice :</label>
                <textarea name="choices" id="choices" v-model="newQuestion.choices" placeholder="Enter choices seperated by ;"></textarea>
                <button @click="addQuestion">Add</button>
            </div>
        </div>
        <div class="icons">
            <i class="fa-solid fa-trash" @click="removeQuestion"></i>
        </div>
        <div class="QuizShow">
            <table>
                <thead>
                    <th></th>
                    <th>No.</th>
                    <th>Question</th>
                    <th>Type</th>
                    <th>Required</th>
                    <th>Edit</th>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in questions" :key="index">
                        <td><input type="checkbox"></td>
                        <td>{{ index+1 }}</td>
                        <td>{{ item.questionText }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.required? 'yes':'no' }}</td>
                        <td><a :href="item.resultLink">Edit</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="btns">
            <button @click="Previous">Prev</button>
            <button @click="submitQuestions">Submit</button>
        </div>
    </div>
</template>

<style scoped lang="scss">
*{
    background-color: #eeeae7;
    background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 4px 4px;
}
.BigContainer{
    width: 100%;
    height: 92dvh;
    display: flex;
    align-items: center;
    flex-direction: column;
    font-family: "Cookie", cursive;
    font-weight: 400;
    font-style: normal;
    *{
        font: inherit   ;
    }
    .QuizAdd{
        margin-top: 30px;
        width: 60%;
        height: 40dvh;
        border: 3px dotted black;
        display: flex;
        flex-direction: column;
        align-items: center;
        .q1{
            width: 100%;
            height: 50%;
            border-bottom: 3px dotted black;
            font-size: 40px;
            align-content: center;
            padding: 10px 60px;
            input{
                margin-left: 20px;
                width: 30%;
                height: 20%;
                font-size: 20px;
                padding:1px 20px;
            }
            select{
                margin-left:20px;
                margin-right: 100px;
                width: 10%;
                height: 20%;
                font-size: 20px;
            }
            #cb{
                width: 40px;
            }
        }
        .q2{
            width: 100%;
            height: 50%;
            // border: 1px solid black;
            font-size: 40px;
            align-content: center;
            padding: 10px 60px;
            position: relative;
            label{
                position: absolute;
                top: 10;
            }
            textarea{
                margin-left: 18%;
                margin-right: 60px;
                resize: none;
                padding: 10px 20px;
                font-size: 20px;
                min-height: 100%;
                min-width: 50%;
            }
            button{
                position: absolute;
                top: 35%;
                right: 10%;
                font-size: 40px;
                width: 10%;
            }
        }
    }
    .icons{
        width: 60%;
        height: 5%;
        font-size: 30px;
        padding-top: 5px;
        padding-left: 5px;
    }
    .QuizShow{
        width: 60%;
        height: 30dvh;
        border: 3px dotted black;
        table{
            width: 100%;
            border-collapse: collapse;
            font-size: 30px;
            th{
                background-color: black;
                color: white;
            }
            tr{
                text-align: center;
            }
        }
    }
    .btns{
        width: 60%;
        text-align: right;
        button{
            margin-left: 20px;
            font-size: 40px;
        }
    }
    
}
</style>