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
                {rel:'stylesheet', href:"https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"},
                {rel:'stylesheet', href:"https://fonts.googleapis.com/css2?family=Sigmar&family=Vina+Sans&display=swap" },
                {rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css'}
                
            ],
            bodyAttrs: {
                style: "width: 100%; background-color: black"
              }
              
        }
    }

})
