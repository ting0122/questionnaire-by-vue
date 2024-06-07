<script>
import api from '@/api';

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
    <div class="Header">
        <div class="time">{{ new Date().toLocaleString() }}</div>
    </div>
    <div class="q-name">
        <div class="name">
            {{ questionnaire.name }}
        </div>
    </div>
    <div class="q-desc">
        <span>{{ questionnaire.description }}</span>
    </div>
    <div class="person">
        <label for="user-name">Name :</label><input id="user-name" type="text" v-model="userName"><br>
        <label for="phone">Phone :</label><input id="phone" type="text" v-model="phone"><br>
        <label for="mail">Mail :</label><input id="mail" type="text" v-model="email"><br>
        <label for="age">Age :</label><input id="age" type="text" v-model="age"><br>
    </div>
    <div class="qs">
        <!-- use ordered list by v-for for questions -->
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
        <button @click="save">儲存</button>
        <button @click="publish">儲存並發布</button>
    </div>
    </div>
</template>

<style scoped lang="scss">
.Header{
    position: absolute;
    top: 0;
    width: 90%;
    height: 5%;
    border: 1px solid black;
    display: flex;
    justify-content: right;
    .time{
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid black;
        width: 300px;
        height: 100%;
    }
}
.q-name{
    position: absolute;
    top: 5%;
    width: 90%;
    height: 15%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    .name{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 50%;
        width: 60%;
        border: 1px solid black;
        font-size: 30px;
    }
}
.q-desc{
    position: absolute;
    top: 20%;
    width: 90%;
    height: 20%;
    border: 1px solid black;
    padding: 20px 60px;
    font-size: 24px;
}
.person{
    position: absolute;
    top: 40%;
    height: 30%;
    width: 90%;
    border: 1px solid black;
    font-size: 35px;
    padding: 40px 6%;   
    input{
        position: absolute;
        left: 20%;
        width: 60%;
        height: 40px;
        padding: 20px;
        font-size: 24px;
    }
}
.qs{
    position: absolute;
    top: 70%;
    width: 90%;
    ol{
        position: absolute;
        left: 60px;
        top:5%;
        font-size: 30px;
        li{
            margin-left: 30px;
            margin-top: 40px;
            ul{
                li{
                    list-style: none;
                    margin-top: 12px;
                    input{
                        width: 3em;
                        height: 1.5rem;
                    }
                }
            }
        }
    }
    .btns{
        position:fixed;
        bottom: 10%;
        right: 15%;
        width: auto;
        button{
            width: 200px;
            margin-left: 18px;
            font-size: 24px;
        }
    }
}

</style>