// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules:['@nuxtjs/tailwindcss'],
    app:{
        head: {
            title: 'Movie App',
            meta: [
                {name: 'description', content: 'app'}
            ],
            link: [
                {rel:'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'},
                
            ],
            bodyAttrs: {
                style: "width: 100%; background-color: black"
              }
        }
    }

})
