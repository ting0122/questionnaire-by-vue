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
    <!-- input side -->
    <div class="search-bar">
        <form @submit.prevent="search">
            <div class="input-group">
                <label for="questionnaireName">問卷名稱：</label>
                <input type="text" id="questionnaireName" v-model="questionnaireName">
            </div>
            <div class="input-group">
                <label for="startDate">統計時間：</label>
                <input type="date" id="startDate" v-model="startDate">
                <span>到: </span>
                <input type="date" id="endDate" v-model="endDate">
                <button type="submit" @click="search">搜尋</button>
            </div>
        </form>
    </div>
    <!-- trash and edit button -->
    <div class="icons">
        <i class="fa-solid fa-trash" @click="trash"></i>
        <i class="fa-solid fa-pen-to-square" @click="edit"></i>
    </div>
    <!-- questionnaire bar -->
    <div class="search-list">   
        <table>
            <thead>
                <tr>
                    <th style="text-align: center;">勾選</th>
                    <th>編號</th>
                    <th>問卷名稱</th>
                    <th>發布狀態</th>
                    <th>開始時間</th>
                    <th>結束時間</th>
                    <th>結果</th>
                </tr>
            </thead>
        </table>
        <!-- show questionnaire -->
        <div class="tbody-container">
            <table>
                <tbody>
                    <tr v-for="(item, index) in searchResults" :key="index">
                        <td style="width: 130px;"><input type="checkbox" @change="toggleSelection(item)"></td>
                        <td style="width: 130px;">{{ item.id }}</td>
                        <td style="width: 250px;text-align: left;">{{ item.name }}</td>
                        <td style="width: 200px;">{{ item.published? '發布':'未發布' }}</td>
                        <td>{{ item.startDate }}</td>
                        <td>{{ item.endDate }}</td>
                        <td><a :href="item.resultLink">查看结果</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">
.search-bar {
    position: absolute;
    top: 0;
    border: 1px solid black;
    height: 30%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-items: center;
    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        font-size: 30px;
        .input-group {
            position: relative;
            left: 20%;
            width: 80%;
            height: 40%;
            margin: 10px 0;
            #questionnaireName {
                width: 780px;
                padding: 20px;
                font-size: 24px;
            }
            input {
                padding: 20px;
                font-size: 24px;
            }
            span {
                margin: 0 40px;
            }
            button {
                margin: 0 80px;
                padding: 20px;
            }
        }
    }
}
.icons {
    position: absolute;
    top: 30%;
    border: 1px solid black;
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: left;
    i {
        margin-left: 10px;
        margin-right: 20px;
        font-size: 40px;
        &:hover{
            scale: 1.1;
        }
        &:active{
            scale: 0.9;
        }
    }
}
.search-list {
    position: absolute;
    top: 40%;
    width: 100%;
    height: 60%;
    border: 1px solid black;
    font-size: 24px;
    table {
        width: 100%;
        border-collapse: collapse;
        table-layout: auto;
        thead th {
            border-bottom: 1px solid black;
            text-align: left;
            background-color: black;
            color: white;
        }
    }
    .tbody-container {
        height: calc(100% - 40px); /* 40px 是表頭的高度，可以根據需要調整 */
        overflow-y: auto;
        
        table {
            width: 100%;
            table-layout: auto;
            border-collapse: collapse;
            tbody td {
                text-align: center;
                font-size: 24px;
            }
        }
    }
}
</style>
