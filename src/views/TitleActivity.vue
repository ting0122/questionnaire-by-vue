<script>
import Title from '@/views/Title.vue';
import Question from '@/views/Question.vue';
import FeedBack from '@/views/FeedBack.vue';
import Statics from '@/views/Statics.vue';

export default {
    data(){
        return{
            selectedContent: '',
            selectedContentComponent: null  
        }
    },
    methods: {
        changeContent(content){
            this.selectedContent = content;

            switch(content){
                case 'Title':
                    this.selectedContentComponent = Title;
                    break;
                case 'Question':
                    this.selectedContentComponent = Question;
                    break;
                case 'FeedBack':
                    this.selectedContentComponent = FeedBack;
                    break;
                case 'Statics':
                    this.selectedContentComponent = Statics;
                    break;
                default:
                    this.selectedContentComponent = null;
            }
        }
    },
    components:{
        Title,
        Question,
        FeedBack,
        Statics
    }
}
</script>

<template>
    <div class="bg">
        <div class="tags_bar">
            <div class="tags" @click="changeContent('Title')">Title</div>
            <div class="tags" @click="changeContent('Question')">Question</div>
            <div class="tags" @click="changeContent('FeedBack')">FeedBack</div>
            <div class="tags" @click="changeContent('Statics')">Statics</div>
        </div>
        <div class="content">
            <component :is="selectedContentComponent"></component>
        </div>
    </div>
</template>

<style scoped lang="scss">
.bg{
    position: absolute;
    left: 10%;
    top: 5%;
    width: 80%;
    height: 90%;
    /* border: 1px solid black; */
    .tags_bar{
        width: 100%;
        height: 10%;
        /* border: 1px solid black; */
        display: flex;
        .tags{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 200px;
            font-size: 30px;
            border: 1px solid black;
            border-radius: 0 40px 0 0;
        }
    }
    .content{
        width: 100%;
        height: 90%;
        border: 1px solid black;
    }
}
    
</style>