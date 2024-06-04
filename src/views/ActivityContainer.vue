<script>
//child components
import Title from './Title.vue'
import Question from './Question.vue';
import FeedBack from './FeedBack.vue';
import Statics from './Statics.vue';
import SearchList from './SearchList.vue';

export default{
    data(){
        return{
            currentComponent: 'SearchList',
        }
    },
    components:{
        Title,
        Question,
        FeedBack,
        Statics,
        SearchList
    },
    methods:{
        changeComponent(componentName){
            this.currentComponent = componentName;
        }
    }
}
</script>

<template>
    <div class="tags">
            <button @click="changeComponent('Title')">Show Title</button>
            <button @click="changeComponent('Question')">Show Question</button>
            <button @click="changeComponent('FeedBack')">Show FeedBack</button>
            <button @click="changeComponent('Statics')">Show Statics</button>
            <button @click="changeComponent('SearchList')">Show SearchList</button>
    </div>
    <div class="show-bar">
        <component :is="currentComponent"></component>
    </div>
</template>

<style scoped lang="scss">
    .tags{
        position: absolute;
        left: 10%;
        border: 1px solid black;
        width: 80dvw;
        height: 5dvw;
    }
    .show-bar{
        position: absolute;
        left: 10%;
        top:15%;
        border: 1px solid black;
        height: 80dvh;
        width: 80dvw;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>