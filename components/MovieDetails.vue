<template>
    <div>
        <NuxtLink :to="`/`">
            <button class="btn">Back</button>
        </NuxtLink>

        <div class="About">
            <div class="saw">
                <div class="imgblock">
                    <img :src=image>
                </div>
                <div class="des" >
                    <h1>{{movie.original_title}}</h1>
                    <p>Status: {{ movie.status }}</p>
                    <p>Released: {{ movie.release_date }}</p>
                    <p>Budget: {{ movie.budget }}</p>
                    <p>Language: {{ movie.original_language }}</p>
                    <p>Popularity: {{ movie.popularity }}</p>
                    <p>Runtime: {{ movie.runtime }} min</p>
                    <p class="overview" style="font-size: 1.3rem;">{{ movie.overview }}</p>
                </div>
            </div>
            <MovieReview :id="movie.id" />
        </div>
        <div class="moviesContainer">
            <SimilarMovie :id="movie.id" />
        </div>
    </div>
</template>

<script setup>
import store from 'store2'

useHead({
    title:'Movie Details'
})

const { movie} = defineProps(['movie'])

let image = `https://image.tmdb.org/t/p/w500//${ movie.backdrop_path}`;
if(movie.backdrop_path == null){
    image = 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg';
}



store.set('movieId',movie.id);

</script>

<style scoped>
    .v-application {
    background-color: #00a86b;
    }

    .About{
        display: flex;
        width: 100%;
        height: 55rem;
    }
    .btn{
        background-color: #ff4500;
        color:white;
        border: 1px solid #ff4500;
        padding: 8px 12px;
        cursor: pointer;
        margin-left: 5vw;
        margin-top: 1vw;
        border-radius: 8px;
    }
    .imgblock{
        width: 50%;
        height: 95%;
    }
    img{
        width: 100%;
        height: 100%;
    }
    img:hover{
        transform: scale(1.1);
    }
    .saw{
        display:flex;
        margin-top: 5vw;
        margin:5vw;
        width: 70%;
    }

    .des{
        width: 50%;
        padding: 0 3vw;
        text-align: left;
        background-color: black;
    }
    h1{
        font-weight: bolder;
        font-size: 3em;
        color: #ff4500;
    }
    h2{
        font-weight: bold;
        font-size: 1.8em;
        color: white;
    }

    .overview{
        color:white;
    }

    p{
        color: aliceblue;
        display: block;
        margin:1em
    }

    .moviesContainer{
        width:100%;
    }

</style>