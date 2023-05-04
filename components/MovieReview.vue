<template>
    <div v-if="reviews.length != 0" class="container">
        <p class="pg2">Reviews</p>
        <div v-for="review in reviews" class="card">
            <div>
                <p class="Rname">Written by : {{ review.author }}</p>
                <div class="content">{{ review.content }}</div>
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


    let reviewsUrl = `https://api.themoviedb.org/3/movie/${id.id}/reviews?api_key=bb5c9a25161603cb7d1205e55e4cbe88&language=en-US&page=${page.value}`


    let reviewResult = await fetch(reviewsUrl)
        .then((response) => response.json())
        
    reviews.value = await reviewResult.results;



</script>

<style scoped>
.container{
    display: block;
}
.card{
    height: 30rem;
    width: 20rem;
    display:inline-flex;
    margin-left: 4rem;
    margin-top: 5rem;
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
    /* font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif; */
    font-family: 'Sigmar', cursive;
    font-size: 2em;
    text-align:left;
    /* font-weight: bold; */
    border: 2px solid #ff4500;
    /* border-radius: 10%; */
    width: fit-content;
    padding: 10px;
    margin-top: 1em;
    margin-left: 5em;

}

</style>