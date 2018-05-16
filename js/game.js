    /*
    Work on the winning condition
    How does your game “know” if a player has won?
    */

    /*Checking if the DOM is Ready*/
    document.addEventListener('DOMContentLoaded', function () {
    console.log('the DOM is ready');
    /*add code that needs to be run as soon as possible here.*/

    });

    /*This block of code start the game with all of the "cards" facedown*/
    /*Selecting all of the cards and storing them into an array*/
    let cards = document.getElementsByClassName('card');

    //scaning through the cards
    for( i = 0; i < cards.length; i++) {
    /*style for the facedown side of card,
    Something to play with later is diffrent colors
    for the facedown side of the card
     */
    cards[i].style.color = 'white';

    }

    //variables for handling moves
    /*number of face up cards in the current move*/
    let num_faceUp = 0;

    /*first card of a move*/
    let first_card = "";

    /*second card of a move*/
    let second_card = "";

    /*variables for keeping track of the player wining*/
    //boolean that turns true once you win the game.
    let you_win = false;

    //number that counts the correct number of mathces
    let found_match = 0;

    /*this block of code is lisenting for clicks on the cards*/
    let deck = document.querySelector('.deck');
    deck.addEventListener('click', function(e) {
        if(e.target && e.target.nodeName == 'LI' || e.target.className == 'material-icons' ) {
            //testing if it works as expected
            console.log("List item ", e.target.className.replace("post-", ""), " was clicked!");

            /*this "flips" the card up after it's been clicked*/
            e.target.style.color = "black";

            /*After a card has been flipped add a class of ".faceUp" to it.
            but check to see if the card is already fliped by checking if it contains
            a class name of "faceUp" or "matched" if so than do nothing to it.
            */

            /*If the card that is clicked already has a class of "faceUp" or "matched"*/
            if(e.target.className == "faceUp" || e.target.className == "matched") {
                //lets me know if a card is already faceup
                console.log("card is already faceup or has it's match.");
            }

            /*add a class of face up to the card */
            else{
                /*add the class both to the icon and the card*/

                /*if the icon was clicked*/
                if(e.target.className == 'material-icons') {
                    /*add class to current target*/
                    e.target.classList.add("faceUp");

                    /*add class to current targets parent*/
                    e.target.parentElement.classList.add("faceUp");

                    //tells me that the card is now faceup
                    console.log('card is now faceUp');

                    /*add one to the counter for the number of face cards in the current move*/
                     num_faceUp++;
                    console.log(`there is ${num_faceUp} card face up`);
                }

                /*if the card was clicked*/
                if(e.target.className == 'card') {
                    //add class to current target
                    e.target.classList.add("faceUp");

                    //add class to current targets child
                    e.target.firstElementChild.classList.add("faceUp");

                    //tells me that the card is now faceup
                    console.log('card is now faceUp');

                    /*add one to the counter for the number of face cards in the current move*/
                    num_faceUp++;
                    console.log(`there is ${num_faceUp} card face up`);
                }

            }

            /*if there is only one face up card then it
            is the first half of a move.
            store it's innerText into a temp variable for later comparison
            when checking if the cards flipped in a turn match.
            */
            if(num_faceUp == 1) {
                /*if the icon was clicked*/
                if(e.target.className == 'material-icons faceUp') {
                    first_card = e.target.innerText;
                    console.log(`the first card is a ${first_card}`);
                }

                /*if the card was clicked*/
                if(e.target.className == 'card faceUp') {
                    first_card = e.target.firstElementChild.innerText;
                    console.log(`the first card is a ${first_card}`);
                }

            }

            /*If there are two face up cards,
            then it is the second half of a move
            store it's innerText into a temp variable for comparison
            */
            if(num_faceUp == 2) {
                /*if the icon was clicked*/
                if(e.target.className == 'material-icons faceUp') {
                    second_card = e.target.innerText;
                    console.log(`the second card is a ${second_card}`);

                    /*If the card from the first half of the move
                    matches the card from the second half*/
                    if(first_card == second_card) {
                    //call the match function
                    match();
                    }

                    /*If the card from the first half of the move
                     does not matches the card from the second half*/
                    if(first_card != second_card) {
                        //call the do not match function
                        do_not_match();
                    }

                }

                /*if the card was clicked*/
                if(e.target.className =='card faceUp') {
                    second_card = e.target.firstElementChild.innerText;
                    console.log(`the second card is a ${second_card}`);

                    /*If the card from the first half of the move
                    matches the card from the second half*/
                    if(first_card == second_card) {
                    //call the match function
                    match();
                    }

                     /*If the card from the first half of the move
                     does not matches the card from the second half*/
                    if(first_card != second_card) {
                        //call the do not match function
                        do_not_match();
                    }

                }

            }

        }
    });

                /*controls what happens when cards match in a move*/
                function match() {
                    /*the cards match so keep them face up,
                    set the matching cards backgroung color to
                    green.
                    */
                    console.log(`the cards match`);
                    //TODO: add an animation for getting a correct match

                    /*scan through the cards*/
                    for( i = 0; i < cards.length; i++) {
                        /*If the card has a class of "card faceUp"*/
                        if(cards[i].classList == "card faceUp") {
                            /*set it's background color to green*/
                            cards[i].style.background = 'radial-gradient(#0f0,#0a0)';

                            //tell me it's green
                            console.log("it's green");

                            /*need to remove the class of faceup from the matching cards
                            so they are not affected by the next move*/

                            //remove class from card
                            cards[i].classList.remove("faceUp");

                            //remove class from icon
                            cards[i].firstElementChild.classList.remove("faceUp");

                            /*to prevent matching card from being selected again
                            add a class of matched to them*/

                            //add a class of mathced to the card
                            cards[i].classList.add("matched");

                            //add a class of mathced to the icon
                            cards[i].firstElementChild.classList.add("matched");

                            //keep the icon visible
                            cards[i].firstElementChild.style.color = 'black';
                        }

                    }

                    /*A move has been complete
                    set the num_faceUp to zero to reset the proccess
                    */
                    num_faceUp = 0;

                    /*apart of the win condition*/

                    //counting the correct number of matches
                    found_match++;

                    //tells me how many matches have been found
                    console.log(` the player has found ${found_match} matches`);

                    /*if the player has found 8 matches,
                     then set the bool you_win to true and
                     */
                    if(found_match == 8) {
                        you_win = true;
                    }

                    //start a you win process
                    if(you_win == true) {
                        console.log(`you win`);
                        //call game_won function
                        setTimeout(game_won, 1000);
                    }
            }

            /*controls what happens when cards do not match in a move*/
            function do_not_match() {
                console.log(`the cards do not match`);
                /*the cards do not match,
                set the cards color to red,
                then use a delay to keep the cards face up for a little bit
                until an animation of the cards fliping back over into face down position*/

                /*scan through the cards*/
                for(i = 0; i < cards.length; i++) {
                    /*If the card has a class of "card faceUp"*/
                    if(cards[i].classList == "card faceUp") {
                        /*animations*/

                        //animation for the card it's self
                        cards[i].classList.add('do_not_match_animation');

                        //animation for the icon to make it look like it's fliped down
                        cards[i].firstElementChild.classList.add('flip_down_animation');

                        //after the animation is done rest the two cards for the next move
                        //TODO:find shorter name for function
                        setTimeout(delayed_reset_no_match, 1000);

                    }
                }

                /*A move has been complete
                set the num_faceUp to zero to reset the proccess
                */
                num_faceUp = 0;

            }

            //TODO:find shorter name for function
            function delayed_reset_no_match() {

                            /*scan through the cards*/
                for( i = 0; i < cards.length; i++) {
                    /*If the card has a class of "card faceUp"*/
                    if(cards[i].classList == "card faceUp do_not_match_animation") {

                        //remove the do not match animtion class
                        cards[i].classList.remove('do_not_match_animation');

                        /*need to remove the class of faceup from the matching cards
                        so they are not affected by the next move*/

                        //remove class from card
                         cards[i].classList.remove("faceUp");

                        //remove class from icon
                        cards[i].firstElementChild.classList.remove("faceUp");

                        //remove the flip face down animation class
                        cards[i].firstElementChild.classList.remove('flip_down_animation');

                        //keep icon color white until cliked again
                        cards[i].firstElementChild.style.color = '';
                        cards[i].style.color = 'white';

                    }
                }
            }

            function game_won() {
                console.log(`game_won function was called`);
                alert('you win');

                //TODO:Create a Congratulations Popup

                /*When a user wins the game, a modal appears to congratulate the player and
                 ask if they want to play again.
                It should also tell the user how much time it took to win the game,
                and what the star rating was.*/
            }