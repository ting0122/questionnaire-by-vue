<script>
export default{
    name: 'SubmitPage',
    props:{
        questions: Array,
        questionnaire: Object
    },
    data(){
        return{
            questions: [
                
            ]
        }
    },
    methods:{
        save(){
            this.$emit('save');
        },
        publish(){
            this.$emit('publish');
        }  
    }
}
</script>

<template>
    <div class="Header">
        <div class="time">time</div>
    </div>
    <div class="q-name">
        <div class="name">
            {{ quesionnaire.name }}
        </div>
    </div>
    <div class="q-desc">
        <span>{{ questionnaire.description }}</span>
    </div>
    <div class="person">
        <label for="user-name">Name :</label><input type="text"><br>
        <label for="phone">Phone :</label><input type="text"><br>
        <label for="mail">Mail :</label><input type="text"><br>
        <label for="age">Age :</label><input type="text"><br>
    </div>
    <div class="qs">
        <!-- use ordered list by v-for for questions -->
        <ol>
            <li v-for="(question, index) in questions" :key="index">
                {{ question.questionText }}
                <ul>
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