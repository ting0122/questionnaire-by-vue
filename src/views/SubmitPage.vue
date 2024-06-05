<script>
export default{
    name: 'SubmitPage',
    data(){
        return{
            
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
            Good Question
        </div>
    </div>
    <div class="q-desc">
        <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo porro minus molestiae corrupti voluptatibus corporis aliquam assumenda ipsum est sed odit repellat saepe, omnis, maxime quidem. Modi maxime ducimus mollitia?</span>
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
            <li>apple</li>
            <li>apple</li>
            <li>apple</li>
            <li>apple</li>
            <li>apple</li>
            <li>apple</li>
        </ol>
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
    height: 80%;
    width: 90%;
    border: 1px solid black;
    ol{
        position: absolute;
        left: 60px;
        top:10%;
        font-size: 60px;
    }
}
</style>