<template>
    <nav>
            <NuxtLink to="/"></NuxtLink>
    </nav>
    <div>
        <header class="heading">
            <div style="position: absolute;">
                <div class="headclass">
                    <p>Movie App</p>
                    <h1>Now Streaming</h1>
                    <!-- <button>Movies</button> -->
                </div>
            </div>
        </header>
    </div>
<!--    output page content-->
    <div >
        <slot/>
    </div>
</template>

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
    background-image: url("../assets/img/movieHero.jpg");
}

.headclass{
    margin-top: 15vw;
    margin-left: 6vw;
}
p {
    margin: 0;
    color: #ff4500;
    margin: 1px;
    font-size: 2rem;
}
h1 {
    color: #fff;
    font-weight: bolder;
    font-size:4em
}.headclass button{
    background-color: #ff4500;
    color: aliceblue;
    border: 1px solid #ff4500;
    border-radius: 8px;
    padding: 8px 12px;
}

div{
    display: block;
}
</style>