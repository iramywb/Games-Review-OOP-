import details from "./details.js";
import games from "./games.js";
import UI from "./ui.js";

document.addEventListener('click', async (e) => { // delegation for better performance
    // get gameList elemtent and details element and pass it to ui class
    const uiHandler = new UI(document.querySelector('#gameList'), document.querySelector('.details')); // OOP

    const gamesHandler = new games(document.querySelector('.games')); // OOP
    const detailsHandler = new details(document.querySelector('.details')); // OOP

    // switching nav links and display games in different categories
    if (e.target.closest('.navbar') && e.target.classList.contains('nav-link') && !e.target.classList.contains('active')) {
        // remove .active from .nav-link that has the active on it inside the .navbar element
        // this method is better than looping through the navbar elements as it's only 1 element that have the active class
        document.querySelector('.navbar .nav-link.active').classList.remove('active');
        // add active class to the clicked nav-link
        e.target.classList.add('active');

        const category = e.target.dataset.category;
        uiHandler.displayGames(category);
    }

    // to close the details
    else if (e.target.closest('.details') && e.target.classList.contains('btn-close')) {
        gamesHandler.show();
        detailsHandler.hide();
    }

    // to display details
    else if (e.target.closest('.card')) {

        // const id of the attribute data-id of the .card the closest to the target
        const id = e.target.closest('.card').dataset.id;
        gamesHandler.hide();
        await uiHandler.displayGameDetails(id);
        detailsHandler.show();
    }
})

// default display
new UI(document.querySelector('#gameList'), document.querySelector('.details')).displayGames('mmorpg');