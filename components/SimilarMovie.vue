<template>
    <div class="container">
        <div class="bar" >
            <p class="pg2">Similar Movies</p>
            <div style="padding-top:3.3vw; padding-left: 3vw;" >
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
                        :class="movies.length < 20 ? 'disable' : ''"
                    >keyboard_double_arrow_right</i>
            </div>
        </div>
        <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                
                <div class="carousel-inner">
                    <button class="carousel-control-prev " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev"
                    :class="index == 0 ? 'disable' : ''"
                    >
                    <span @click="index--" class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                    <div class="carousel-item active myContainer">
                        <MiniMovieCard :movie="movies[index]" class="moviecardMini"/>
                        <MiniMovieCard :movie="movies[index+1]" class="moviecardMini"/>
                        <MiniMovieCard :movie="movies[index+2]" class="moviecardMini"/>
                        <MiniMovieCard :movie="movies[index+3]" class="moviecardMini"/>
                    </div>
                    <button class="carousel-control-next " type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next"
                    :class="index+3 < movies.length - 1 ? '' : 'disable'"
                    >
                    <span @click="index++" class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
                </div>
            </div>
 
    </div>
   
</template>

<script setup>
    
    const id = defineProps(['id']);
    // console.log(id);

    let movies = ref([]);
    let page = ref(1);
    let index = ref(0);


    async function getSimilarMovies(){
        let Url = `https://api.themoviedb.org/3/movie/${id.id}/similar?api_key=bb5c9a25161603cb7d1205e55e4cbe88&language=en-US&page=${page.value}`


        let result = await fetch(Url)
        .then((response) => response.json())

        result.results.map((x) => {
            if(x.poster_path == null){
                x['poster_path'] = 'https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg';
            }else{
                x['poster_path'] = 'https://image.tmdb.org/t/p/w500/'+ x.poster_path;
            }
    });
        
        movies.value = await result.results;
    }
    function increment(){
        page.value++;
        getSimilarMovies()
    }
    function decrement(){
        page.value--;
        getSimilarMovies()    
    }

    await getSimilarMovies();

</script>

<style scoped>
.container{
    width: 100%;
}

.pg2{
    color: #ff4500;
    font-family: 'Sigmar', cursive;
    font-size: 2em;
    text-align:left;
    border: 2px solid #ff4500;
    width: fit-content;
    padding: 10px;
    margin-top: 1em;
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

.bar{
    display: flex;
}

.movies{
    margin-left: 3vw;
    margin-top: 4vw;
    text-align: center;
    display: inline-flex;
}

.moviecardMini {
    /* margin-left: 8vw; */
    margin: auto;
    /* margin-top: 2vw; */
    width: 15vw;
    height: 22vw;
    text-align: center;
    /* display: inline-flex; */
}
.moviecardMini:hover{
    transform: scale(1.1);
}
.myContainer{
    display: flex;
    padding: 10pc;
}
.carousel-inner {
    background: #080707;
    border: 5rem solid black;
}
.disable{
    pointer-events: none;
    display: none;
    opacity: 0.3;
}


</style>