<template>
    
    <div class="all">
        <div class="searchBar">
            <div style="width: 92%">
                
                <input 
                    type="text" 
                    v-model="keyword"
                    class="searchInput" 
                    placeholder="Enter movie name" 
                    @keyup=searchController()
                />

                <button class="btn" @click="searchController()"> Search</button>

            </div>
            <div style="padding-top:1.5vw" >
                <i class="material-icons navbtn" style="padding:5px 0px" @click="decrement" >keyboard_double_arrow_left</i>
                <span class="pg" style="font-size: 2em;"> {{ page }} </span>
                <i 
                    class="material-icons navbtn" 
                    style="padding:5px 0px" 
                    @click="increment"
                    :class="totalItems < 20 ? 'disable' : ''"
                >keyboard_double_arrow_right</i>
            </div>
        </div>

        <div v-for="movie in movies" :key="movies.id" class="moviecard">
            <MovieCard :movie="movie"/>
        </div>
       
    </div>
</template>



<script setup>
import store from "store2"

definePageMeta({
    layout: 'home'
})

let keyword = ref('');
let receivedKeyword = ref(null);


let result = ref({});
let movies = ref([]);

let hit = false;
let totalItems = ref();
let page = ref(1);

receivedKeyword.value = store.get('receivedKeyword');


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

function searchController(){
    if(keyword.value == ''){
        hit = false;
        page.value = 1;
        store.remove('receivedKeyword');
        receivedKeyword.value = null;
        getNowMovies()
    }else{
        changeToOne();
        searchMovies();
    }
}

function changeToOne(){
    if(keyword.value !== ''){
        page.value = 1;
    }
}

async function getNowMovies(){
    console.log(" Get Now Movies Called ");
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
    hit == false ? hit = true : null;
    
    console.log(" Get Search Movies Called ");

    if(keyword.value !== ''){
        store.set('receivedKeyword', keyword.value)

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
    totalItems.value = result.results.length;

    
    // console.log(movies);
    }
    // keyword.value = '';
}

console.log(receivedKeyword.value)

if(receivedKeyword.value !== null){
    keyword.value = receivedKeyword.value;
    await searchMovies();
}else {
    console.log(receivedKeyword.value);
    await getNowMovies()
}

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
    color: aliceblue;
}
.navbtn:hover{
    color: aqua;
    cursor: pointer;
    transform: scale(1.5);
}
.pg{
    color: white;
    font-size: 2em;
    text-align: center;
    padding: 15px 9px 5px 9px;
}

.disable{
    pointer-events: none;
    cursor: not-allowed;
    opacity: 0.8;
}


</style>
