<template>
    
    <div class="all">
        <div class="searchBar">
            <div style="width: 92%">
                
                <input 
                    type="text" 
                    v-model="keyword"
                    class="searchInput" 
                    placeholder="Enter movie name" 
                />

                <button class="btn" @click="changeToOne();searchMovies()"> Search</button>

            </div>
            <div style="padding-top:1.5vw" >
                <button class="navbtn" @click="decrement">
                    <i class="material-icons" style="padding:5px 0px">keyboard_double_arrow_left</i>
                </button>
                <span class="pg"> {{ page }} </span>
                <button class="navbtn" @click="increment">
                    <i class="material-icons" style="padding:5px 0px">keyboard_double_arrow_right</i>
                </button>
            </div>
        </div>

        <div v-for="movie in movies" :key="movies.id" class="moviecard">
            <MovieCard :movie="movie"  />
        </div>
    </div>
</template>



<script setup>
definePageMeta({
    layout: 'home'
})

let result = ref({});
let movies = ref([]);
let keyword = ref('');
let hit = false;

let page = ref(1);

function increment(){
    page.value++;
    
    if(hit == true){
        searchMovies()
    }else{
        getNowMovies()
    }
}
function decrement(){
    if(page.value > 1){
        page.value--;
        if(hit == true){
            searchMovies()
        }else{
            getNowMovies()
        }
    }
}

function changeToOne(){
    if(keyword.value !== ''){
        page.value = 1;
    }
}

async function getNowMovies(){
    result = await fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=bb5c9a25161603cb7d1205e55e4cbe88&page=${page.value}`)
        .then((response) => {
            return response.json();
        })

    result.results.map((x) => {
            if(x.poster_path == null){
                x['poster_path'] = 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg';
            }else{
                x['poster_path'] = 'https://image.tmdb.org/t/p/w500/'+x.poster_path;
            }
    });

    movies.value = result.results;
    // console.log(movies);
}

async function searchMovies(){
    if(hit == false){
        page.value = 1;
        hit = true;
    }
    console.log(page.value);
    if(keyword.value){
        result = await fetch(`https://api.themoviedb.org/3/search/movie?page=1&api_key=bb5c9a25161603cb7d1205e55e4cbe88&query=${keyword.value}&page=${page.value}`)
        .then((response) => response.json())

    result.results.map((x) => {
        if(x.poster_path == null){
                x['poster_path'] = 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg';
            }else{
                x['poster_path'] = 'https://image.tmdb.org/t/p/w500/'+x.poster_path;
            }
    });

    movies.value =  result.results
    // console.log(movies);
    }
    // keyword.value = '';
}

await getNowMovies()


</script>



<style scoped>
.all {
    background-color: black;
}
.searchBar {
    display: flex;
    position: sticky;
    top: 0;
    padding-bottom: 2vw;
    background: linear-gradient(180deg, #000, #232323);
    z-index: 1000;
}

.moviecard {
    margin-left: 4vw;
    margin-top: 5vw;
    width: 20vw;
    height: 44vw;
    text-align: center;
    display: inline-flex;
}

.btn {
    background-color: #ff4500;
    color: white;
    border: 1px solid #ff4500;
    cursor: grab;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    padding: 8px 12px;
}

.searchInput {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 8px 15px;
    margin-left: 6vw;
    margin-top: 2vw;
    border: 1px solid #ff4500;
}
.navbtn{
    background-color: aliceblue;
}
.navbtn:hover{
    background-color: aqua;
}
.pg{
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 15px 9px 5px 9px;
}

</style>