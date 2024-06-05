<script>
export default{
    data(){
        return{
            questions: [],
            newQuestion: {
            questionText: '',
            choices: '',
            type: '單選題',
            required: false
            }
        }
    },
    methods:{
        Previous(){
            this.$emit('return-text','Title')
        },
        SubmitReq(){

        },
        addQuestion(){
            const choicesArray = this.newQuestion.choices.split(';').map(choice => choice.trim());
            this.questions.push(
                {
                    ...this.newQuestion,
                    choices: choicesArray
                }
            );
        },
        removeQuestion(index){
            this.questions.splice(index,1);
        }
    }
}
</script>

<template>
    <!-- questions -->
    <div class="question-bar">
        <div class="q1">
            <label>問題 :</label>
            <input v-model="newQuestion.questionText" placeholder="Enter Your Question" class="name-input"/>
            <select v-model="newQuestion.type">
                <option value="單選題">單選題</option>
                <option value="複選題">複選題</option>
                <option value="文字題">文字題</option>
            </select>
            <label>必填 : </label>
            <input type="checkbox" v-model="newQuestion.required" class="checkbox"/>
        </div>
        <div class="q2">
            <label>選項 :</label>
            <textarea v-model="newQuestion.choices" placeholder="Enter choices sperated by ;"></textarea>
            <button @click="addQuestion">Add Question</button>
        </div>
        <div class="icons">
            <i class="fa-solid fa-trash"></i>
        </div>
    </div>
    <!-- table -->
    <div class="bigContainer">
        <!-- question title bar -->
        <table>
            <thead>
                <tr>
                    <th>_</th>
                    <th>編號</th>
                    <th>內容</th>
                    <th>問題種類</th>
                    <th>必填</th>
                    <th>編輯</th>
                </tr>
            </thead>
        </table>
        <!-- question content table -->
        <div class="tbody-Container">
            <table>
                <tbody>
                    <tr v-for="(item,index) in questions" :key="index">
                        <td><input type="checkbox"></td>
                        <td>{{ index+1 }}</td>
                        <td>{{ item.questionText }}</td>
                        <td>{{ item.type }}</td>
                        <td>{{ item.required ? '是':'否' }}</td>
                        <td><a :href="item.resultLink">Edit</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="btns">
        <button @click="Previous">Previous</button>
        <button>SubmitReq</button>
    </div>
</template>

<style scoped lang="scss">
.question-bar {
    position: absolute;
    top: 3%;
    width: 80%;
    height: 40%;
    border: 1px solid black;
    .q1, .q2 {
        display: flex;
        justify-content: left;
        align-items: center;
        font-size: 24px;
        border: 1px solid black;
        width: 100%;
        height: 50%;
        padding: 30px;
    }
    .q1{
        input{
            height: 10%;
            margin-left: 80px;
            font-size: 24px;
            padding: 20px;
        }
        .name-input{
            margin-left: 125px;
        }
        select{
            width: 12%;
            height: 50%;
            margin: 0 40px;
            font-size: 24px;
        }
    }
    .q2{
        textarea{
            margin-left: 120px;
            resize: none;
            font-size: 24px;
            padding: 20px;
            width:50%;
        }
        button{
            margin-left: 80px ;
            width: 10%;
            height: 40%;
        }
    }
}
.icons{
    border: 1px solid black;
    width: 100%;
    height: 20%;
    display: flex;
    justify-content: left;
    align-items: center;
    i{
        margin-left: 8px;
        font-size: 40px;
    }
}
.bigContainer{
    position: absolute;
    top: 50%;
    width: 80%;
    height: 40%;
    border: 1px solid black;
    table{
        font-size: 24px;
        width: 100%;
        border-collapse: collapse;
        thead th {
            padding-left: 12px;
            border-bottom: 1px solid black;
            text-align: left;
            background-color: black;
            color: white;
        }
    }
    .tbody-container{
        height: calc(100% - 40px);
        overflow-y: auto;
        border: 1px solid red;
        table {
            width: 100%;
            table-layout: auto;
            // border-collapse: collapse;
            tbody td { 
                font-size: 24px;
            }
        }
    }
}
.btns{
    position: absolute;
    bottom: 0;
    width: 80%;
    display: flex;
    justify-content: right;
    align-items: center;
    border: 1px solid black;
    height: 80px;
    button{
        margin-left: 30px;
        height: 80%;
        width: 15%;
    }
}
</style>