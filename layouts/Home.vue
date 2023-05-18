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
                    <p>
                        <i class="material-symbols-outlined">movie</i>
                        Movie
                    </p>
                    <h1 v-if="id != null">
                        <NuxtLink :to="`/movies/${id}`" class="link" >
                            Now Streaming: {{ movieTitle }}
                        </NuxtLink>
                    </h1>
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
let movieTitle = ref('');

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
        movieTitle.value = result.original_title;
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
    font-family: 'Sigmar', cursive;
    color: white;
    margin: 1px;
    font-size: 3rem;
    display: initial;
    padding: 25px;
    border-radius: 46%;
}
p:hover{
    color: #ff4500;
}

h1 {
    color: white;
    font-weight: bolder;
    font-size:2.5rem;
}

div{
    display: block;
}

.material-symbols-outlined {
    font-size: 2.4rem;
    font-variation-settings:
    'FILL' 0,
    'wght' 600,
    'GRAD' 0,
    'opsz' 48
}

.link:hover{
    text-decoration: underline;
    color: #ff4500;

}

</style>