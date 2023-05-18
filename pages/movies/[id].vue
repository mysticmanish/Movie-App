<template>
    <div class="myContainer">
        <MovieDetails :movie="Singlemovie" />
        <!-- <MovieReview :id="id" /> -->
    </div>
</template>

<script setup>

definePageMeta({layout: 'default'})
    
    const id = useRoute().params.id;
    
    let Singlemovie = ref([])

    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=bb5c9a25161603cb7d1205e55e4cbe88&language=en-US`;
    
    let result = await fetch(url)
        .then((response) => response.json())

    Singlemovie = await result;
    
</script>

<style scoped>

</style>

