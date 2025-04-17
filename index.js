/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
 */

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from "./games.js";

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
 */

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

//check if the goal is reached or not
function checkGoal(goal, pledged) {
  if (goal > pledged) {
    return `We still need $${(goal - pledged).toLocaleString(
      "en-US"
    )} to reach our goal.`;
  } else if (goal < pledged) {
    return `We've passed our goal by $${(pledged - goal).toLocaleString(
      "en-US"
    )}!`;
  } else {
    return `We've just managed to reach our goal!`;
  }
}

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
  // loop over each item in the data
  for (let i = 0; i < games.length; i++) {
    const game = games[i];
    // create a new div element, which will become the game card
    const game_card = document.createElement("div");

    // add the class game-card to the list
    game_card.classList.add("game-card");

    // set the inner HTML using a template literal to display some info
    // about each game
    // TIP: if your images are not displaying, make sure there is space
    // between the end of the src attribute and the end of the tag ("/>")
    game_card.innerHTML = `
    <img class="game-img" src="${game.img}" />
        <p> ${game.name} </p>
        <p> ${game.description} </p>
        <p> Goal: $${game.goal.toLocaleString("en-US")} </p>
        <p> Pledged: $${game.pledged.toLocaleString("en-US")} </p>
        ${checkGoal(game.goal, game.pledged)}
    `;

    // append the game to the games-container
    const parent = document.getElementById("games-container");
    parent.appendChild(game_card);
  }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);

// later, we'll call this function using a different list of games

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
 */

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalBackers = GAMES_JSON.reduce((acc, games) => {
  return acc + games.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
<p> ${totalBackers.toLocaleString("en-US")} </p>
`;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, games) => {
  return acc + games.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `
<p> $${totalRaised.toLocaleString("en-US")} </p>
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = `
<p>${GAMES_JSON.length}</p>
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
 */
let unFunded = GAMES_JSON.filter((game) => {
  return game.pledged < game.goal;
});
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have not yet met their goal
  

  // use the function we previously created to add the unfunded games to the DOM
  addGamesToPage(unFunded);
}
let beenFunded = GAMES_JSON.filter((game) => {
  return game.pledged > game.goal;
});
// show only games that are fully funded
function filterFundedOnly() {
  deleteChildElements(gamesContainer);

  // use filter() to get a list of games that have met or exceeded their goal
  

  // use the function we previously created to add unfunded games to the DOM
  addGamesToPage(beenFunded);
}

// show all games
function showAllGames() {
  deleteChildElements(gamesContainer);

  // add all games from the JSON data to the DOM
  addGamesToPage(GAMES_JSON);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);
/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
 */

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
/*


*/
// create a string that explains the number of unfunded games using the ternary operator
const unFundedStr = `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${GAMES_JSON.length} games. 
Currently, ${unFunded.length} ${unFunded.length > 0 ? "games remain " : "game remains"} unfunded. 
We need your help to fund the remaining ${unFunded.length > 0 ? "games!" : "game!"}`;
//console.log(unFundedStr);

// create a new DOM element containing the template string and append it to the description container
const paragraph = document.createElement('p');
paragraph.textContent = unFundedStr;
const description = document.getElementById('description-container');
description.appendChild(paragraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames = GAMES_JSON.sort((item1, item2) => {
  return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...games] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFunded = document.createElement('p');
topFunded.textContent = first.name;
const topContainer = document.getElementById('first-game');
topContainer.appendChild(topFunded);
// do the same for the runner up item
const secondFunded = document.createElement('p');
secondFunded.textContent = second.name;
const secondContainer = document.getElementById('second-game');
secondContainer.appendChild(secondFunded);
