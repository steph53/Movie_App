export class AppState {
    API_KEY= "40e8eb7753e6e2a1c96e0f5b065f187f";
    BASE_URL = "https://api.themoviedb.org/3/";
    IMAGE_BASE_URL= "https://image.tmdb.org/t/p/w500/";

    /**
     * store the data of the current page, and are rendered on the
     */
    data;
    /**
     * default endpoint
     */
    endPoint="discover/movie";
    /**
     * search
     */
    search;

    constructor(){
        this.data=[];
        this.page=1;
    }
    async fetchData(){
            const resourcePath= this.createResourceUrl();
        	const {results}= await(await fetch(resourcePath)).json();
            this.data = [];
            results.map((movie) =>{
                if (movie && movie.poster_path){
                  this.data.push(this.formatData(movie))
                 }
            });
    }
    async setSearch(query){
        this.search=query;
        await this.fetchData();
    }
    formatData(movie){
        const{original_title:movieTitle, vote_average:rating, overview, poster_path,}=movie;
        return {
            movieTitle, 
            rating,
            overview,
            poster: `${this.IMAGE_BASE_URL}/${poster_path}`
        };
    }  
    
   createResourceUrl(){
       if( !this.search||this.search==''){
           return `${this.BASE_URL}${this.endPoint}?api_key=${this.API_KEY}&language=en-US&page=1&include_adult=false`;
       }
       return `${this.BASE_URL}search/movie?api_key=${this.API_KEY}&language=en-US&page=1&include_adult=false&query=${this.search}`;
   }  



}