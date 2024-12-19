export default class UI {

    // 
    // 
    // SETUP
    // 
    // 

    #options = { // private just for api and its same in both queries for getGames and getGameDetails
        method: 'GET',
        headers: {
            'x-rapidapi-key': '1149dbdf34mshabc9bb37d372e07p179a98jsnb86f18eb65d4',
            'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
        }
    };
    // constructor which will take a parameter that is element of the whole gameList element
    constructor(gameListElement, detailsElement) {
        this.gameListElement = gameListElement;
        this.detailsElement = detailsElement;
    }

    // 
    // 
    // API SETUP
    // 
    // 

    async #getGames(category) { // private method just for api and its data no need to be used outside the class
        try {
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`, this.#options);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
    async #getGameDetails(id) { // private method just for api and its data no need to be used outside the class
        try {
            const response = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`, this.#options);
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.log(error);
        }
    }

    // 
    // 
    // METHODS
    // 
    // 

    // display games
    async displayGames(category) {
        const loading = document.querySelector('.loading');
        loading.classList.remove('d-none');

        const games = await this.#getGames(category); // get the data from api
        this.gameListElement.innerHTML = ''; // clear previous data
        games.forEach(game => {
            this.gameListElement.innerHTML += `
                <div class="col">
                    <div data-id="${game.id}" class="card h-100 bg-transparent" role="button">
                        <div class="card-body">
                            <figure class="position-relative">
                                <img class="card-img-top object-fit-cover h-100"
                                    src="${game.thumbnail}">
                            </figure>
                            <figcaption>
                                <div class="d-flex align-items-center justify-content-between">
                                    <h3 class="h6 small">${game.title}</h3>
                                    <span class="badge text-bg-primary p-2">Free</span>
                                </div>
                                <p class="card-text small text-center opacity-50">
                                    ${game.short_description}
                                </p>
                            </figcaption>
                        </div>
                        <footer class="card-footer small hstack justify-content-between">
                            <span class="badge badge-color">${game.genre}</span>
                            <span class="badge badge-color">${game.platform}</span>
                        </footer>
                    </div>
                </div>
            `;

        });

        loading.classList.add('d-none');
    }


    // display game details
    async displayGameDetails(id) {
        const loading = document.querySelector('.loading');
        loading.classList.remove('d-none');

        const game = await this.#getGameDetails(id); // get the data from api
        this.detailsElement.querySelector('.row').innerHTML = `
            <div class="col-md-4">
                    <img src="${game.thumbnail}" alt="${game.title}">
                </div>
                <div class="col-md-8">
                    <h3>Title: ${game.title}</h3>
                    <p>
                        Category:
                        <span class="badge text-bg-info"> ${game.genre}</span>
                    </p>
                    <p>
                        Platform:
                        <span class="badge text-bg-info"> ${game.platform}</span>
                    </p>
                    <p>
                        Status:
                        <span class="badge text-bg-info"> ${game.status}</span>
                    </p>
                    <!-- game description -->
                    <p class="small">
                        ${game.description}
                    </p>
                    <a class="btn btn-outline-warning text-white" target="_blank"
                        href="${game.game_url}">Show Game</a>
            </div>
        `;

        loading.classList.add('d-none');
    }

}