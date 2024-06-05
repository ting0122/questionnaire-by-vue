<script>
export default{
    name: 'Title',
    data(){
        return{
            
        }
    },
    methods:{
        //return to search list
        cancel(){
            this.$emit("return-text",'SearchList')
        },
        //go to next page
        next(){
            this.$emit("return-text",'Question')
        }
    }
}
</script>

<template>
    <div class="qes-container">
        <div class="title q1">
            <label for="title">Name :</label>
            <input type="text">
        </div>
        <div class="title q2">
            <label for="description">Description :</label>
            <input type="text">
        </div>
        <div class="title q3">
            <label for="start-date">Start Date :</label>
            <input type="date">
        </div>
        <div class="title q4">
            <label for="end-date">End Date :</label>
            <input type="date">
        </div>
        <div class="bnts">
            <button @click="cancel">Cancel</button>
            <button @click="next">Next</button>
        </div>      
    </div>
</template>

<style scoped lang="scss">
.qes-container{
    width: 60%;
    height: 80%;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .title{
        width: 100%;
        height: 15%;
        font-size: 30px;
        position: relative;
        label{
            position: absolute;
            left: 40px;
        }   
        input{
            position: absolute;
            left: 200px;
            margin-left: 30px;
            width: 60%;
            height: 40px;
            font-size: 24px;
            padding: 20px;
        }
    }
    .bnts{
        display: flex;
        justify-content: right;
        width: 72%;
        height: 10%;
        // border: 1px solid black;
        button{
            font-size: 24px;
            width: 100px;
            height: 100%;
            margin-left: 30px;
            &:hover{
                scale: 1.1;
            }
            &:active{
                scale:0.9;  
            }
        }
    }
}
</style>