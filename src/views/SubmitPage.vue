<script>
import api from '@/api';
import Header from '@/components/header.vue';

export default{
    name: 'SubmitPage',
    props:{
        questions: Array,
        questionnaire: Object
    },
    data(){
        return{
            userName:'',
            phone:'',
            email:'',
            age:''
        }
    },
    components:{Header},
    methods:{
        validateForm(){
            if (!this.userName || !this.phone || !this.email || !this.age) {
                alert('Please fill out all fields.');
                return false;
            }
            if (!this.validateEmail(this.email)) {
                alert('Please enter a valid email.');
                return false;
            }
            return true;
        },
        validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        },
        save(){
            if(!this.validateForm())
                return;
            const data = {
                userName: this.userName,
                phone: this.phone,
                email: this.email,
                age: this.age,
                questionnaire: this.questionnaire,
                questions: this.questions
            };

            api.saveQuestionnaire(data)
                .then(response => {
                    alert('Data saved successfully');
                })
                .catch(error => {
                    console.log('Error saving data:', error);
                })
        },
        publish(){
            if(!this.validateForm())
                return;
            const data = {
                userName: this.userName,
                phone: this.phone,
                email: this.email,
                age: this.age,
                questionnaire: { ...this.questionnaire, published: true },
                questions: this.questions
            };
            api.saveQuestionnaire(data)
                .then(response => {
                    alert('Data saved successfully');
                })
                .catch(error => {
                    console.log('Error saving data:', error);
                })
        }   
    }
}
</script>

<template>
    <Header></Header>
    <div class="BigContainer">
        <div class="QuizName">{{ questionnaire.name }}</div>
        <div class="QuizDesc">{{ questionnaire.description }}</div>
        <div class="PersonInfo">
            <label for="user-name">Name :</label><input id="user-name" type="text"><br>
            <label for="phone">Phone :</label><input id="phone" type="text"><br>
            <label for="mail">Mail :</label><input id="mail" type="text"><br>
            <label for="age">Age :</label><input id="age" type="text"><br>
        </div>
        <div class="Qs">
            <ol>
                <li v-for="(question, index) in questions" :key="index">
                    {{ question.questionText }}
                    <ul v-if="question.choices && question.choices.length">
                        <li v-for="choice in question.choices" :key="choice">
                            <input type="checkbox">{{ choice }}
                        </li>
                    </ul>
                </li>
            </ol>
            <div class="btns">
                <button @click="save">SAVE</button>
                <button @click="publish">SAVE AND PUBLISH</button>
            </div>
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
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .QuizName{
        width: 60%;
        height: 10dvh;
        // border-bottom: 3px dotted black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .QuizDesc{
        width: 60%;
        height: 20dvh;
        // border-bottom: 3px dotted black;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .PersonInfo{
        width: 60%;
        height: 25dvh;
        // border-bottom: 3px dotted black;
        padding: 30px 10%;
        position: relative;
        font-size: 40px;
        input{
            position: absolute;
            left: 40%;
            width: 500px;
            height: 40px;
            font-size: 24px;
            padding: 0 20px;
        }
    }
    .Qs{
        width: 60%;
        height: 50dvh;
        // border: 3px dotted black;
        .btns{
            position: fixed;
            bottom: 1%;
            right: 20%;
            button{
                font-size: 30px;
                margin-left:20px;
            }
        }
    }
}
</style>