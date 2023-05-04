<template>
    <nav>
            <NuxtLink to="/"></NuxtLink>
    </nav>
    <div>
        <header 
            class="heading" 
            :style="{'backgroundImage':'url('+image+')'}"
        >
            <div style="position: absolute;">
                <div class="headclass">
                    <p>Movie</p>
                    <h1 v-if="id != null">Now Streaming: {{ result.original_title }}</h1>
                </div>
            </div>
        </header>
    </div>
<!--    output page content-->
    <div >
        <slot/>
    </div>
</template>


<script setup>
import store from 'store2'

let result = ref({});
let image = ref('');

let id = ref();
id = store.get('movieId');


if(id !== null){

    async function getSingleMovie(){
        result = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=bb5c9a25161603cb7d1205e55e4cbe88&language=en-US`)
        .then((response) => response.json())
        
        
        result['poster_path'] = 'https://image.tmdb.org/t/p/w500/'+ result.poster_path;
        result['backdrop_path'] = 'https://image.tmdb.org/t/p/w500/'+ result.backdrop_path;

        // console.log(`Poster path of single movie: ${result.poster_path}`);
        image.value = result.backdrop_path;
        console.log('backdrop path',result.backdrop_path);
        console.log(image.value);
    }
    getSingleMovie();

    store.remove('movieId');
}else{
    image = 'https://images.unsplash.com/photo-1574267432306-5ddbe53bda16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1631&q=80'
}


</script>

<style scoped>

#__nuxt {
    background-color: black;
}
.heading{
    width:100%;
    height: 27vw;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
}
.headingImg{
    background-image: url("../assets/img/movieHero.jpg");
}

.headclass{
    margin-top: 15vw;
    margin-left: 6vw;
}
p {
    color: white;
    margin: 1px;
    font-size: 3rem;
    display: initial;
    padding: 30px;
    border-radius: 46%;
}

h1 {
    color: white;
    font-weight: bolder;
    font-size:2.5rem;
}

div{
    display: block;
}
</style>