<template>
  <NuxtLink :to="`/movies/${movie.id}`"  >
     <div class="flipCard">
       <div class="flipCard-inner">
         <div class="flipCard-front">
             <div class="content_img">
               <span class="xyz">{{ movie.vote_average }}</span>
               <img :src=movie.poster_path class="image" />
             </div>
             <div class="baseOfCard">
               <p class="title">{{ movie.original_title }}</p>
               <p>Released: {{ movie.release_date }}</p>
             </div>
         </div>
         <div class="flipCard-back">
           <div class="backCard">
             <p class="details">Info:</p>
             <div class="overview">
               {{ movie.overview }}
             </div>
           </div>
         </div>
       </div>
     </div>  
 </NuxtLink>
</template>

<script setup>
 
 let { movie } = defineProps(['movie']);
 
</script>

<style scoped>
.flipCard{
   height: 25rem;
   width: 15rem;
   display:inline-flex;
   text-align: center;
   border-radius: 5%;
   background-color: #1c1919;
 }
 .image{
   text-align: center;
   height: 100%;
   width: 100%;
 }

 .content_img{
    width: 100%;
    height: 85%;
    position: relative;
 }
 .baseOfCard{
  margin-top: 1rem;
  height: 10%;
 }

 .xyz{
   position: relative;
   margin-bottom: -35px;
   float: left;
   background-color: #ff4500;
   padding: 3px 6px 10px 3px;
   border-bottom-right-radius: 8px;
 }

 .content_img:hover {
   cursor: pointer;
 }
 .content_img:hover div {
     visibility: visible;
     opacity: .9;
 }

   .title{
     font-size: 1.2em;
     font-weight: bold;
     color: aqua;
     overflow:hidden;
     height: 50%;
   }
   p{
    margin-top: 2px;
    font-size: 1rem;
    color: #ff4500;
   }

   .flipCard-inner{
     width: 100%;
     height: 100%;
     position: relative;
     text-align: center;
     transition: transform 0.6s;
     transform-style: preserve-3d ;
   }

   .flipCard:hover .flipCard-inner{
     transform: rotateY(180deg);
   }

   .flipCard-front{
     width: 100%;
     height: 100%;
     position: absolute;
     -webkit-backface-visibility: hidden;
     backface-visibility: hidden;
   }

   .flipCard-back{
     -webkit-backface-visibility: hidden;
     backface-visibility: hidden;
     transform: rotateY(180deg);
   }
   
   
   
   .details{
       color: #ff4500;
       font-family: 'Sigmar', cursive;
       font-size: 2em;
       width: fit-content;
       margin: 0 auto;
     }
     .overview{
       margin-top: 1rem;
       height:18rem;
       color: white;
       overflow:auto;
       text-overflow: ellipsis; 
       text-align: justify;
       padding: 1rem;
     }
     .overview::-webkit-scrollbar{
         display: none;
     }
</style>