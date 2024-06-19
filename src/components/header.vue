<script>
export default{
    name: 'Header',
    data(){
        return{
            
        }
    },
    emits:['return-text']
}
</script>

<template>
    <div class="header">
        <h1 @click="$emit('return-text','SearchList')">QUESTIONNAIRE</h1>
    </div>
</template>

<style scoped lang="scss">
*{
    background-color: #eeeae7;
    background-image: radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px);
    background-size: 4px 4px;
}
.header{
    width: 100%;
    height: 8dvh;
    // border-bottom: 3px dotted black;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: "Playfair Display", serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-style: normal;
}
</style>