<script>
export default {
    data(){
        return{

        }
    }
}
</script>

<template>
    <div class="bg">
        <div class="search_bar">
            <div class="topper_name">
                <h1>Survey :</h1>
                <div class="search_container">
                    <form action="/search" method="get">
                        <input type="search" name="q" placeholder="activity name...">
                    </form>
                </div>
            </div>
            <div class="time_range">
                <h1>From :</h1>
                <form action="submit_time" method="get">
                    <div class="form-group group1">
                        <input type="time" id="start_time" name="start_time">
                    </div>
                    <div class="form-group group2">
                        <label for="end_time">To :</label>
                        <input type="time" id="end_time" name="end_time">
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
        <div class="acts">

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
    border: 1px solid black;
    .search_bar{
        width: 100%;
        height: 30%;
        border: 1px solid black;
        .topper_name{
            display: flex;
            width: 100%;
            height: 50%;
            border: 1px solid black;
            h1{
                display: flex;
                width:425px;
                padding-left: 200px;
                height:100%;
                border: 1px solid black;
                align-items: center;
            }
            .search_container{
                width: 100%;
                height: 100%;
                border: 1px solid black;
                display: flex;
                justify-content: center;
                align-items: center;
                form{
                    width: 100%;
                    height: 80%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    input{
                        width: 80%;
                        height: 40px;
                        font-size: 20px;
                        padding-left: 60px;
                        &::placeholder {
                            text-align: left;
                            font-size: 25px;
                        }
                    }
                }
            }
        }
        .time_range{
            display: flex;
            width: 100%;
            height: 50%;
            border: 1px solid black;
            h1{
                display: flex;
                width:425px;
                padding-left: 200px;
                height:100%;
                border: 1px solid black;
                align-items: center;
            }
            form{
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                .form-group{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 300px;
                    label{
                        width: 100px;
                        font-size: 30px;
                    }
                    input{
                        width: 80%;
                        height: 40px;
                        font-size: 20px;
                        padding-left: 60px;
                    }
                }
                .group1{
                    margin-left: 80px;
                    margin-right: 100px;
                }
                button{
                    margin-left: 115px;
                    width: 100px;
                    height: 30%;
                }
            }
        }
    }
    .acts{
        width: 100%;
        height: 70%;
        border: 1px solid black;
    }
}
</style>