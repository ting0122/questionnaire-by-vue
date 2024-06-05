<script>
//child components
import Title from './Title.vue'
import Question from './Question.vue';
import FeedBack from './FeedBack.vue';
import Statics from './Statics.vue';
import SearchList from './SearchList.vue';
import SubmitPage from './SubmitPage.vue';

export default{
    data(){
        return{
            currentComponent: 'SubmitPage',
        }
    },
    components:{
        Title,
        Question,
        FeedBack,
        Statics,
        SearchList,
        SubmitPage
    },
    methods:{
        changeComponent(componentName){
            this.currentComponent = componentName;
        }
    }
}
</script>

<template>
    <div class="show-bar">
        <component :is="currentComponent" @return-text="changeComponent"></component>
    </div>
</template>

<style scoped lang="scss">
    .show-bar{
        position: absolute;
        left: 10%;
        top:5%;
        border: 1px solid black;
        height: 90dvh;
        width: 80dvw;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow-y: auto;
    }
</style>