<template>
    <div v-if="reviews.length != 0" class="container">
        <div class="reviewBar">
            <p class="pg2">Reviews</p>
            <div style="padding-top:0vw; padding-left: 2vw;" >
                    <i 
                        class="material-icons navbtn" 
                        style="padding:5px 0px" 
                        @click="decrement" 
                        :class="page == 1 ? 'disable' : ''"
                    >keyboard_double_arrow_left</i>
                    <span class="pg" style="font-size: 1.7em;"> {{ page }} </span>
                    <i 
                        class="material-icons navbtn" 
                        style="padding:5px 0px" 
                        @click="increment"
                        :class="reviews.length <= 10 ? 'disable' : ''"
                    >keyboard_double_arrow_right</i>
            </div>
        </div>
        <div class="reviewsContainer">
            <div v-for="review in reviews" class="card">
            <div>
                <p class="Rname">Written by : {{ review.author }}</p>
                <div class="content">{{ review.content }}</div>
            </div>
            </div>
        </div>
        
 
    </div>
    <div v-else="reviews.length == 0" class="container">
        <p class="pg2">No reviews</p>
    </div>
</template>

<script setup>
    
    const id = defineProps(['id']);
    // console.log(id);

    let reviews = ref([]);
    let page = ref(1);


    async function getReviews(){
        let reviewsUrl = `https://api.themoviedb.org/3/movie/${id.id}/reviews?api_key=bb5c9a25161603cb7d1205e55e4cbe88&language=en-US&page=${page.value}`


        let reviewResult = await fetch(reviewsUrl)
        .then((response) => response.json())
        
        reviews.value = await reviewResult.results;
    }
    function increment(){
        page.value++;
        getReviews()
    }
    function decrement(){
        page.value--;
        getReviews()    
    }

    await getReviews();

</script>

<style scoped>
.container{
    display: block;
    width:30%;
    margin-top: 5vw;
}
.reviewBar{
    display: flex;
    width:max-content

}
.card{
    height: 30rem;
    width: 20rem;
    display:inline-flex;
    margin-left: 4rem;
    margin-top: 3rem;
    text-align: center;
    border-radius: 5%;
    background-color: #1c1919;
}
.card:hover{
    transform: scale(1.1);
}

.Rname{
    font-weight: bold;
    color: #ff4500;
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
}

.content{
    margin: 2rem;
    width: 80%; 
    height: 22rem;
    overflow:auto;
    text-overflow: ellipsis; 
    color: aliceblue;
    font-size: 1.1rem;
}

.content::-webkit-scrollbar{
    display: none;
}

.pg2{
    color: #ff4500;
    font-family: 'Sigmar', cursive;
    font-size: 2em;
    text-align:left;
    width: fit-content;
    margin-left: 5em;
}

.navbtn{
    color: aliceblue;
}
.navbtn:hover{
    color: aqua;
    cursor: pointer;
    transform: scale(1.5);
}
.disable{
    pointer-events: none;
    opacity: 0.3;
}
.pg{
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 15px 9px 5px 9px;
}

.reviewsContainer{
    /* margin-top: 1rem; */
    height: 80%;
    overflow-y: scroll;
}
.reviewsContainer::-webkit-scrollbar{
    display: none;
}
</style>