export class MovieListComponent{
    state=[];

    htmlElement;    
    constructor(){
        this.htmlElement =document.createElement('section');
        this.htmlElement.innerHTML='';

        const main =document.querySelector('main');
        main.appendChild(this.htmlElement);
        if (this.state){
            this.render();
        }
    }
    render(){
        this.htmlElement.innerHTML="";
        if (this.state.length=== 0){
            this.htmlElement.appendChild(this.createEmptyList())
            return;
        }
        this.state.map(({movieTitle, poster, rating, overview})=>{
            const card=document.createElement('div');
            card.classList.add('card');
            card.innerHTML= `
                <img src="${poster}" alt="${movieTitle}">
                    <div class="movieInfo">
                        <span class="movie">${movieTitle}</span>
                        <span class="rating">${rating}</span>
                    </div>

                    <div class="movieOverview">
                        <h3> Overview </h3>
                        <p>
                            ${overview}
                        </p>
                    </div>
            `;
            this.htmlElement.appendChild(card);
        })
    }

    setState(state){
        this.state = state;
        this.render();
    }

    createEmptyList(){
        const empty = document.createElement("div");
        empty.innerHTML ='<h3> No Element found check if the element is correct</h3>';
    return empty;
    }
}