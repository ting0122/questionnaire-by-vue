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
            selectedQuestionnaires:[],
            currentPage:1,
            itemsPerPage:10,
            pagesToShow:9
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
        },
        isLocked:{
            type: Boolean,
            required: true
        }
    },
    emits: ['updateQuestionnaire', 'updateQuestions', 'returnText', 'save-quiz', 'publish-quiz','return-text'],

    mounted(){
        this.fetchAllQuestionnaires();
    },
    computed:{
        totalPages(){
            return Math.ceil(this.searchResults.length/this.itemsPerPage);
        },
        visiblePages(){
            const totalPages = this.totalPages;
            const currentPage = this.currentPage;
            const pagesToShow = this.pagesToShow;
            let startPage = Math.max(1, currentPage - Math.floor(pagesToShow/2));
            let endPage = Math.min(totalPages, startPage+pagesToShow-1);

            if(endPage - startPage + 1 < pagesToShow){
                startPage = Math.max(1,endPage-pagesToShow+1);
            }

            return Array.from({ length:(endPage-startPage+1)},(_, i)=>startPage+i);

        }
    },
    methods: {
        firstPage(){
            if(this.currentPage > 1){
                this.currentPage = 1;
            }
        },
        previousPage(){
            if(this.currentPage > 1){
                this.currentPage--;
            }
        },
        goToPage(page){
            this.currentPage = page;
        },
        nextPage(){
            if(this.currentPage < this.totalPages){
                this.currentPage++;
            }
        },
        lastPage(){
            if(this.currentPage < this.totalPages){
                this.currentPage = this.totalPages;
            }
        },
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
            this.searchResults = [];
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
                return !item.published || new Date(item.startDate) > new Date();
            });
            toDelete.forEach(item =>{
                api.deleteQuestionnaire(item.id)
                    .then(response=>{
                        alert(`Deleted quesionnaire:${item.name}`);
                        this.fetchAllQuestionnaires();
                    })
                    .catch(error =>{
                        alert(`Error deleting questionnaire:${item.name}`);
                    });
            });
        },
        edit(){
            this.$emit('return-text','Title');
        },
        toggleSelection(item){
            console.log(item)
            const index = this.selectedQuestionnaires.indexOf(item);
            if(index > -1){
                this.selectedQuestionnaires.splice(index, 1);
            }else{
                this.selectedQuestionnaires.push(item);
            }
        },
        goToQuiz(id){
            const params = {
                id: id
            }
            api.getQuestionnaires(params)
                .then(response=>{
                    if(response.data.code === 200){
                        //renew the specify questionnaire information
                        const newQuiz = {
                            name: response.data.questionnaire.name,
                            description: response.data.questionnaire.description,
                            startDate: response.data.questionnaire.startDate,
                            endDate: response.data.questionnaire.endDate
                        }
                        console.log(newQuiz);
                        this.$emit('update-questionnaire',newQuiz);
                        //renew the specify questions information
                        this.$emit('update-questions',[...response.data.questionnaire.questions]);
                        //redirect to questionnaire page
                        this.$emit('return-text','SubmitPage');    
                    }else{
                        console.error('Error fetching questionnaire:' , response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error searching questionnaires:', error);
                });
        }
    }
}
</script>

<template>
    <!-- header -->
    <div class="header">
        <h1>QUESTIONNAIRE</h1>
    </div>
    <!-- left dash line -->
    <div class="LeftDash"></div>
    <!-- body -->
    <div class="ListContainer">
        <div class="SearchBar">
            <div class="QuizName">
                <label for="quizName">Questionnaire :</label>
                <input type="search" id="quizName" v-model="questionnaireName">
            </div>
            <div class="QuizPeriod">
                <div class="underContainer">
                    <label for="quizBegin">From :</label>
                    <input type="date" id="quizBegin" v-model="startDate">
                    <label for="quizEnd">To :</label>
                    <input type="date" id="quizEnd" v-model="endDate">
                    <button @click="search">Search</button>
                </div>
            </div>
        </div>
        <div class="icons" v-if="!isLocked">
            <i class="fa-solid fa-trash" @click="trash"></i>
            <i class="fa-solid fa-pen-to-square" @click="edit"></i>
        </div>
        <div class="SearchResult">
            <table>
                <thead>
                    <!-- table header -->
                    <tr class="table-header">
                        <th></th>
                        <th>NO.</th>
                        <th>Questionnaire</th>
                        <th>State</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Result</th>
                    </tr> 
                </thead>
                <!-- table content -->
                <tbody>
                    <tr v-for="(item, index) in searchResults.slice(0,10)" :key="index">
                        <td><input type="checkbox" @change="toggleSelection(item)"></td>
                        <td>{{ index+1 }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.ispublished?'Pub':'unPub' }}</td>
                        <td>{{ item.startDate }}</td>
                        <td>{{ item.endDate }}</td>
                        <td class="searchResultsGo"><span @click="goToQuiz(item.id)">Go</span></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="Pagination">
                <button @click="firstPage" :disabled="currentPage === 1 ">&laquo;&laquo;</button>
                <button @click="previousPage" :disabled="currentPage === 1">&laquo;</button>

                <template v-for="page in visiblePages" :key="page">
                    <button
                            @click="goToPage(page)"
                            :class="{ active: currentPage === page}">
                        {{ page }}
                    </button>
                </template>

                <button @click="nextPage" :disabled="currentPage === totalPages">&raquo;</button>
                <button @click="lastPage" :disabled="currentPage === totalPages">&raquo;&raquo;</button>
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
    font-size: 5dvw;
    // border: 1px solid black;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding-top: 40px;
    h1{
        text-align: center;
    }
}
.LeftDash{
    position: fixed;
    height: 100dvh;
    left: 4%;
    top: 0;
    border: 2px dotted rgb(77, 62, 62);
}
.ListContainer{
    width: 100%;
    height: 100dvh;
    // border: 1px solid black;
    flex-direction: column;
    display: flex;
    align-items: center;
    .SearchBar{
        background-color: rgb(221,216,216);
        position: relative;
        margin-top: 100px;
        margin-bottom:40px;
        width: 70%;
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
            .underContainer{
                width: 100%;
                height: 60%;
                // border: 1px solid black;
                input{
                    width: 24%;
                    font-size: 18px;
                }
                button{
                    margin-left: 50px;
                    width: 7dvw;
                    height: 46px;
                    
                }
            }
        }
    }
    .icons{
        width: 70dvw;
        height: 7%;
        // border: 1px solid black;
        // background-image: url('/src/assets/zebra.jpeg');
        // background-repeat: no-repeat;
        // background-size: cover;
        position: relative;
        //filter for background
        &::before{
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: inherit;
            z-index: 1;
        }
        i{
            margin-top: 1%;
            margin-left: 5px;
            margin-right: 10px;
            font-size: 35px;    
            background: rgba(255, 255, 255, 0.1);
            position: relative;
            z-index: 2;
        }
    }
    .SearchResult{
        width: 70dvw;
        height: 55dvh;
        // border: 1px solid black;
        background-color: rgb(221,216,216);
        margin-bottom:40px;
        table{
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            font-size: 20px;
            .table-header{
                th{
                    background-color: black;
                    color: white;
                    font-size: 1.5dvw;
                }
            }
            tbody {
                height: 80%;
                tr{
                text-align: center;
                border-bottom: 1px solid black;
                font-size: 1.2dvw;
            }
        }
            .searchResultsGo{
                background: transparent;
                &:hover{
                    scale: 1.05;
                    cursor: pointer;
                }
            }
            
            
        }
    }
    .Pagination{
        width:40%;
        height: 2%;
        // border: 1px solid black;
        display: flex;
        justify-content: center;
        button{
            width: 8%;
            border: none;
            font-size: 20px; 
            cursor: pointer;
            &:hover{
                scale: 1;
                color:rgb(0,0,0,0.6);
                font-size: 45px;
                font-family: "Cookie", cursive;
                font-weight: 400;
                font-style: normal;
            }
        }
    }
}
</style>
