/*
Flipping cards
What happens when cards match
What happens when cards do not match
When the game finishes
*/

/*
Start by building a very simple grid of cards.
Don't worry about styling, just get something clickable on the page.
Figure out the HTML needed to represent a card. Remember, you have to represent two sides of the card. Are you going to have two separate elements stacked on top of each other?
Add the functionality to handle clicks.
This should reveal the hidden side of each card.
Work on the matching logic. How does your game "know" if a player guesses correctly or incorrectly?
Work on the winning condition. How does your game “know” if a player has won?
We recommend saving styling until the very end. Allow your game logic and functionality to dictate the styling.
*/

/*Checking if the DOM is Ready*/
document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready');
    /*add code that needs to be run as soon as possible here.*/

});


    /*This block of code start the game with all of the "cards" facedown*/
    /*Selecting all of the cards and storing them into an array*/
    let card = document.getElementsByClassName('card');
    for( i = 0; i < card.length; i++) {
        /*style for the facedown side of card,
        Something to play with later is diffrent colors
        for the facedown side of the card
        */
        card[i].style.color = 'white';
    }


    /*this block of code is for lisenting for click on the cards*/
    let deck =document.querySelector('.deck');
    deck.addEventListener('click', function(e) {
        if(e.target && e.target.nodeName == 'LI' || e.target.className == 'material-icons' ) {
            console.log("List item ", e.target.id.replace("post-", ""), " was clicked!");
            /*add code here to affect a card after it's been clicked*/

            /*this "flips" the card up after it's been clicked*/
            e.target.style.color = "black";
        }
    });