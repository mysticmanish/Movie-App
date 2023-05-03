<template>
     <NuxtLink :to="`/movies/${movie.id}`"  >
        <div class="main">
        <div class="content_img">
            <span class="xyz">{{ movie.vote_average }}</span>
            <img :src=movie.poster_path class="image" />
        </div>
        <h2>{{ movie.original_title }}</h2>
        <p>Released: {{ movie.release_date }}</p>
        
    </div>
    
    </NuxtLink>
  </template>
  
  <script setup>
    
    let { movie } = defineProps(['movie']);
    
  </script>
  
  <style scoped>
    .image{
      text-align: center;
      height: auto;
      width: 100%;
    }
  
    .content_img{
      position: relative;
    }
  
    .xyz{
      position: relative;
      margin-bottom: -35px;
      float: left;
      background-color: #ff4500;
      padding: 3px 6px 10px 3px;
      border-bottom-right-radius: 8px;
    }
  
    .content_img div{
      position: absolute;
      bottom: 0;
      background: black;
      color: white;
      font-family: sans-serif;
      visibility: hidden;
      transition: visibility 0s,opacity .5s linear;
      overflow: hidden;
      text-overflow: ellipsis;
      max-height: 40%;
    }
    .content_img:hover {
      cursor: pointer;
    }
    .content_img:hover div {
        visibility: visible;
        opacity: .9;
    }
  
    .btn{
          background-color: #ff4500;
          color:white;
          border: 1px solid #ff4500;
          cursor: pointer;
          border-radius: 8px;
          padding: 2px 6px;
      }
      h2{
        font-size: 1em;
        font-weight: bold;
        color: aqua;
        overflow:unset;
        text-overflow:ellipsis ;
      }
      p{
        font-size: small;
        color: #ff4500;
      }
      .main{
        display: block;
      }
  </style>