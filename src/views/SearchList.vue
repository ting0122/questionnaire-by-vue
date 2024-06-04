<script>
import Title from './Title.vue';

export default {
    name: 'SearchList',
    data() {
        return {
            searchResults: [
                { id: 1, questionnaireName: '问卷1', status: '已发布', startDate: '2024-06-01', endDate: '2024-06-10', resultLink: '#' },
                { id: 2, questionnaireName: '问卷2', status: '未发布', startDate: '2024-06-05', endDate: '2024-06-15', resultLink: '#' },
                { id: 3, questionnaireName: '问卷3', status: '已发布', startDate: '2024-06-03', endDate: '2024-06-12', resultLink: '#' },
                { id: 4, questionnaireName: '问卷4', status: '未发布', startDate: '2024-06-07', endDate: '2024-06-20', resultLink: '#' },
                { id: 5, questionnaireName: '问卷1', status: '已发布', startDate: '2024-06-01', endDate: '2024-06-10', resultLink: '#' },
                { id: 6, questionnaireName: '问卷2', status: '未发布', startDate: '2024-06-05', endDate: '2024-06-15', resultLink: '#' },
                { id: 7, questionnaireName: '问卷3', status: '已发布', startDate: '2024-06-03', endDate: '2024-06-12', resultLink: '#' },
                { id: 8, questionnaireName: '问卷4', status: '未发布', startDate: '2024-06-07', endDate: '2024-06-20', resultLink: '#' },
                { id: 3, questionnaireName: '问卷3', status: '已发布', startDate: '2024-06-03', endDate: '2024-06-12', resultLink: '#' },
                { id: 4, questionnaireName: '问卷4', status: '未发布', startDate: '2024-06-07', endDate: '2024-06-20', resultLink: '#' },
                { id: 5, questionnaireName: '问卷1', status: '已发布', startDate: '2024-06-01', endDate: '2024-06-10', resultLink: '#' },
                { id: 6, questionnaireName: '问卷2', status: '未发布', startDate: '2024-06-05', endDate: '2024-06-15', resultLink: '#' },
                { id: 7, questionnaireName: '问卷3', status: '已发布', startDate: '2024-06-03', endDate: '2024-06-12', resultLink: '#' },
                { id: 8, questionnaireName: '问卷4', status: '未发布', startDate: '2024-06-07', endDate: '2024-06-20', resultLink: '#' },
            ]
        }
    },
    methods: {
        search() {
            //Call api of searchResults
        },
        trash(){
            //delete the specify questionnaire
        },
        edit(){
            //go to the Title vue
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
                <button type="submit">搜尋</button>
            </div>
        </form>
    </div>
    <!-- trash and edit button -->
    <div class="icons">
        <i class="fa-solid fa-trash" v-on:click="trash"></i>
        <i class="fa-solid fa-pen-to-square" v-on:click="edit"></i>
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
                        <td style="width: 130px;"><input type="checkbox"></td>
                        <td style="width: 130px;">{{ item.id }}</td>
                        <td style="width: 250px;text-align: left;">{{ item.questionnaireName }}</td>
                        <td style="width: 200px;">{{ item.status }}</td>
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
