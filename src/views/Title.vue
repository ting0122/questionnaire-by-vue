<script>
    export default{
        data(){
            return {
                surveyName: '',
                surveyDescription: '',
                startTime: '',
                endTime: ''
            }
        },
        methods: {
            cancel() {
                // 取消操作
            },
            nextStep() {
                // 跳轉到下一步（Question組件）
            this.$emit('changeContent', 'Question');
            }
        }
    }
</script>

<template>
    <div class="title-container">
    <h2>問卷名稱：</h2>
    <input type="text" v-model="surveyName" placeholder="請輸入問卷名稱" />

    <h2>問卷說明：</h2>
    <input type="text" v-model="surveyDescription" placeholder="請輸入問卷說明" />

    <h2>開始時間：</h2>
    <input type="datetime-local" v-model="startTime" />

    <h2>結束時間：</h2>
    <input type="datetime-local" v-model="endTime" />

    <div class="button-container">
      <button @click="cancel">取消</button>
      <button @click="nextStep">下一步</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;

  h2 {
    margin-bottom: 10px;
  }

  input {
    width: 100%;
    padding: 5px;
    font-size: 20px;
    margin-bottom: 20px;
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }

  button {
    padding: 10px 20px;
    font-size: 20px;
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>