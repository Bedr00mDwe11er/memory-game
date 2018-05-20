    /*Checking if the DOM is Ready*/
    document.addEventListener('DOMContentLoaded', function() {
        console.log('the DOM is ready');
        /*add code that needs to be run as soon as possible here.*/

    });

    /*star rating*/
    //star elements
    //select the right most star icon
    let right_star = document.querySelector('.star-right');

    //select the mid star
    let mid_star = document.querySelector('.star-mid');

    //select the left most star icon
    let left_star = document.querySelector('.star-left');

    /*count the number of wrong moves*/
    let number_wrong = 0;

    /*time variables*/
    //seconds
    let seconds = 0;

    //minutes
    let minutes = 0;

    //Hours
    let hours = 0;

    //time elements

    //element that will display seconds
    let seconds_element = document.querySelector('.seconds');

    //element that will display minutes
    let minutes_element = document.querySelector('.minutes');

    //element that will display hours
    let hours_element = document.querySelector('.hours');

    //timer
    let timerId = window.setInterval(timer, 1000);

    //move counter
    let move_counter = 0;

    //will show the numbers of moves
    let move_number = document.querySelector('.moves-number');

    //will change the moves words depending on circumstances
    let move_word = document.querySelector('.moves-word');

    //variables for handling moves
    /*number of face up cards in the current move*/
    let num_faceUp = 0;

    /*first card of a move*/
    let first_card = '';

    /*second card of a move*/
    let second_card = '';

    /*variables for keeping track of the player wining*/
    //boolean that turns true once you win the game.
    let you_win = false;

    //number that counts the correct number of mathces
    let found_match = 0;


    /*This block of code start the game with all of the 'cards' facedown*/
    /*Selecting all of the cards and storing them into an array*/
    let cards = document.getElementsByClassName('card');

    //scaning through the cards
    for (i = 0; i < cards.length; i++) {
        /*style for the facedown side of card,
        Something to play with later is diffrent colors
        for the facedown side of the card
         */
        cards[i].style.color = 'white';

        //randomly shuffle the cards at the start of a game
        cards[i].style.order = `${Math.floor(Math.random() * 16)}`;

    }

    /*this block of code is lisenting for clicks on the cards*/
    let deck = document.querySelector('.deck');
    deck.addEventListener('click', function(e) {
        if (e.target && e.target.nodeName == 'LI' || e.target.className == 'material-icons md-36 md-48 md-60 md-72') {
            //testing if it works as expected
            console.log('List item ', e.target.className.replace('post-', ''), ' was clicked!');

            //if the card was clicked
            if (e.target.className == 'card') {
                /*this 'flips' the card up after it's been clicked*/
                e.target.style.color = 'black';

                //for the icon
                e.target.firstElementChild.style.color = 'black';
            }

            //if the icon was clicked
            if (e.target.className == 'material-icons md-36 md-48 md-60 md-72') {
                //flips the card
                e.target.style.color = 'black';
            }




            /*After a card has been flipped add a class of '.faceUp' to it.
            but check to see if the card is already fliped by checking if it contains
            a class name of 'faceUp' or 'matched' if so than do nothing to it.
            */

            /*If the card that is clicked already has a class of 'faceUp' or 'matched'*/
            if (e.target.className == 'faceUp' || e.target.className == 'matched') {
                //lets me know if a card is already faceup
                console.log('card is already faceup or has its match.');
            }

            /*add a class of face up to the card */
            else {
                /*add the class both to the icon and the card*/

                /*if the icon was clicked*/
                if (e.target.className == 'material-icons md-36 md-48 md-60 md-72') {
                    /*add class to current target*/
                    e.target.classList.add('faceUp');

                    /*add class to current targets parent*/
                    e.target.parentElement.classList.add('faceUp');

                    //tells me that the card is now faceup
                    console.log('card is now faceUp');

                    /*add one to the counter for the number of face cards in the current move*/
                    num_faceUp++;
                    console.log(`there is ${num_faceUp} card face up`);
                }

                /*if the card was clicked*/
                if (e.target.className == 'card') {
                    //add class to current target
                    e.target.classList.add('faceUp');

                    //add class to current targets child
                    e.target.firstElementChild.classList.add('faceUp');

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
            if (num_faceUp == 1) {
                /*if the icon was clicked*/
                if (e.target.className == 'material-icons md-36 md-48 md-60 md-72 faceUp') {
                    first_card = e.target.innerText;
                    console.log(`the first card is a ${first_card}`);
                }

                /*if the card was clicked*/
                if (e.target.className == 'card faceUp') {
                    first_card = e.target.firstElementChild.innerText;
                    console.log(`the first card is a ${first_card}`);
                }

            }

            /*If there are two face up cards,
            then it is the second half of a move
            store it's innerText into a temp variable for comparison
            */
            if (num_faceUp == 2) {
                /*if the icon was clicked*/
                if (e.target.className == 'material-icons md-36 md-48 md-60 md-72 faceUp') {
                    second_card = e.target.innerText;
                    console.log(`the second card is a ${second_card}`);

                    /*If the card from the first half of the move
                    matches the card from the second half*/
                    if (first_card == second_card) {
                        //call the match function
                        match();
                    }

                    /*If the card from the first half of the move
                     does not matches the card from the second half*/
                    if (first_card != second_card) {
                        //call the do not match function
                        do_not_match();
                    }

                }

                /*if the card was clicked*/
                if (e.target.className == 'card faceUp') {
                    second_card = e.target.firstElementChild.innerText;
                    console.log(`the second card is a ${second_card}`);

                    /*If the card from the first half of the move
                    matches the card from the second half*/
                    if (first_card == second_card) {
                        //call the match function
                        match();
                    }

                    /*If the card from the first half of the move
                    does not matches the card from the second half*/
                    if (first_card != second_card) {
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
        for (i = 0; i < cards.length; i++) {
            /*If the card has a class of 'card faceUp'*/
            if (cards[i].classList == 'card faceUp') {
                /*set it's background color to green*/
                cards[i].style.background = 'radial-gradient(#0f0,#0a0)';

                //tell me it's green
                console.log('it is green');

                /*need to remove the class of faceup from the matching cards
                so they are not affected by the next move*/

                //remove class from card
                cards[i].classList.remove('faceUp');

                //remove class from icon
                cards[i].firstElementChild.classList.remove('faceUp');

                /*to prevent matching card from being selected again
                add a class of matched to them*/

                //add a class of mathced to the card
                cards[i].classList.add('matched');

                //add a class of mathced to the icon
                cards[i].firstElementChild.classList.add('matched');

                //keep the icon visible
                cards[i].firstElementChild.style.color = 'black';
            }



        }

        /*A move has been complete
        set the num_faceUp to zero to reset the proccess
        */
        num_faceUp = 0;

        /*add one to the move counter*/
        move_counter++;
        console.log(`moves ${move_counter}`);

        /*Display the moves*/
        move_number.textContent = move_counter;

        //for words moves or move depending
        if (move_counter == 1) {
            move_word.textContent = 'move';
        }

        if (move_counter > 1) {
            move_word.textContent = 'moves';
        }



        /*apart of the win condition*/
        //counting the correct number of matches
        found_match++;

        //tells me how many matches have been found
        console.log(` the player has found ${found_match} matches`);

        /*if the player has found 8 matches,
         then set the bool you_win to true and
         */
        if (found_match == 8) {
            you_win = true;
        }

        //start a you win process
        if (you_win == true) {
            console.log(`you win`);

            //stop the timer
            window.clearInterval(timerId);

            //call game_won function
            setTimeout(game_won, 1000);
        }
    }

    /*controls what happens when cards do not match in a move*/
    function do_not_match() {
        console.log(`the cards do not match`);

        //add one to the wrong move counter variable number wrong
        number_wrong++;

        console.log(`the number of wrong moves made is ${number_wrong}`);

        /*star rating*/
        /*If the player has made 9 wrong lose half a star*/
        if (number_wrong == 9) {
            console.log('lose a half star');

            //change the icon for the right most star icon to a half star
            right_star.textContent = 'star_half';
        }

        //If the player makes five more wrong moves lose another half a star
        if (number_wrong == 14) {
            console.log('lose another half a star');

            //change the icon for the right most star to an empty star
            right_star.textContent = 'star_border';
        }

        //If the player makes 4 more wrong moves lose another half a star
        if (number_wrong == 18) {
            console.log('lose another half a star');

            //change the icon for the mid star to a half star
            mid_star.textContent = 'star_half';
        }

        //If the player makes 3 more wrong moves lose another half a star
        if (number_wrong == 21) {
            console.log('lose another half a star');

            //change the icon for the mid star to an empty star
            mid_star.textContent = 'star_border';
        }

        //If the player makes 2 more wrong moves lose another half star
        if (number_wrong == 23) {
            console.log('lose another half star');

            //change the icon for the left most star to a half star
            left_star.textContent = 'star_half';
        }

        //If the player makes one more wrong move lose another half star
        if (number_wrong == 24) {
            console.log('lose another half star');

            //change the icon to the left  most star to a empty star
            left_star.textContent = 'star_border';
        }

        /*the cards do not match,
        set the cards color to red,
        then use a delay to keep the cards face up for a little bit
        until an animation of the cards fliping back over into face down position*/

        /*scan through the cards*/
        for (i = 0; i < cards.length; i++) {
            /*If the card has a class of 'card faceUp'*/
            if (cards[i].classList == 'card faceUp') {
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

        /*add one to the move counter*/
        move_counter++;
        console.log(`moves ${move_counter}`);

        /*Display the moves*/
        move_number.textContent = move_counter;

        //for words moves or move depending
        if (move_counter == 1) {
            move_word.textContent = 'move';
        }

        if (move_counter > 1) {
            move_word.textContent = 'moves';
        }


    }

    //TODO:find shorter name for function
    function delayed_reset_no_match() {

        /*scan through the cards*/
        for (i = 0; i < cards.length; i++) {
            /*If the card has a class of 'card faceUp'*/
            if (cards[i].classList == 'card faceUp do_not_match_animation') {

                //remove the do not match animtion class
                cards[i].classList.remove('do_not_match_animation');

                /*need to remove the class of faceup from the matching cards
                so they are not affected by the next move*/

                //remove class from card
                cards[i].classList.remove('faceUp');

                //remove class from icon
                cards[i].firstElementChild.classList.remove('faceUp');

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
        //TODO:Create a Congratulations Popup

        /*When a user wins the game, a modal appears to congratulate the player and
         ask if they want to play again.
        It should also tell the user how much time it took to win the game,
        and what the star rating was.*/

        //select the congragulations modal
        let congragulations_popUp = document.querySelector('.congraulations-modal');

        //select the play again button
        let play_again_button = document.querySelector('.play-again-button');

        //add an event listener to the 'button'
        play_again_button.addEventListener('click', function() {
            //have the modal close by not displaying it any
            congragulations_popUp.style.display = 'none'
            //reset the game
            board_reset();
        })

        //show play time
        //selecet the hours spent playing
        let hours_spent = document.querySelector('.hours-spent');

        //change it's text content to show the hours spent playing
        hours_spent.textContent = hours;

        //select the minutes spent playing
        let minutes_spent = document.querySelector('.minutes-spent');

        //change it's text content to show the minutes spent playing
        minutes_spent.textContent = minutes;

        //select  seconds spent playing
        let seconds_spent = document.querySelector('.seconds-spent');

        //change it's text content to display the seconds spent playing
        seconds_spent.textContent = seconds;

        //show number of moves it took
        //select the moves it took
        let moves_used = document.querySelector('.moves-counter-used');

        //select the moves used number
        let moves_number_used = document.querySelector('.moves-number-used');

        /*Display the number of moves used*/
        moves_number_used.textContent = move_counter;

        //show the star rating
        //select the end stars
        //select the right most star icon
        let right_star_end = document.querySelector('.star-right-end');

        //select the mid star
        let mid_star_end = document.querySelector('.star-mid-end');

        //select the left most star icon
        let left_star_end = document.querySelector('.star-left-end');

        /*star rating*/
        /*If the player has made 9 wrong lose half a star*/
        if (number_wrong >= 9 && number_wrong < 14) {
            console.log('lose a half star');

            //change the icon for the right most star icon to a half star
            right_star_end.textContent = 'star_half';
        }

        //If the player makes five more wrong moves lose another half a star
        if (number_wrong >= 14 && number_wrong < 18) {
            console.log('lose another half a star');
            //change the icon for the right most star to an empty star
            right_star_end.textContent = 'star_border';
        }

        //If the player makes 4 more wrong moves lose another half a star
        if (number_wrong >= 18 && number_wrong < 21) {
            console.log('lose another half a star');

            //change the icon for the right most star to an empty star
            right_star_end.textContent = 'star_border';

            //change the icon for the mid star to a half star
            mid_star_end.textContent = 'star_half';
        }

        //If the player makes 3 more wrong moves lose another half a star
        if (number_wrong >= 21 && number_wrong < 23) {
            console.log('lose another half a star');

            //change the icon for the right most star to an empty star
            right_star_end.textContent = 'star_border';

            //change the icon for the mid star to an empty star
            mid_star_end.textContent = 'star_border';
        }

        //If the player makes 2 more wrong moves lose another half star
        if (number_wrong >= 23 && number_wrong < 24) {
            console.log('lose another half star');

            //change the icon for the right most star to an empty star
            right_star_end.textContent = 'star_border';

            //change the icon for the mid star to an empty star
            mid_star_end.textContent = 'star_border';

            //change the icon for the left most star to a half star
            left_star_end.textContent = 'star_half';
        }

        //If the player makes one more wrong move lose another half star
        if (number_wrong >= 24) {
            console.log('lose another half star');

            //change the icon for the right most star to an empty star
            right_star_end.textContent = 'star_border';

            //change the icon for the mid star to an empty star
            mid_star_end.textContent = 'star_border';

            //change the icon to the left  most star to a empty star
            left_star_end.textContent = 'star_border';
        }




        //change the display so it shows up on the page when the user has won
        congragulations_popUp.style.display = 'block';

    }

    //timer function
    function timer() {
        /*Math for time variables*/
        seconds++;

        //display seconds passed
        seconds_element.textContent = seconds;

        /*if 60 seconds has passed add one to minutes  display minutes,
        set seconds to zero*/
        if (seconds == 60) {
            //set seconds to zero
            seconds = 0;

            //display seconds passed
            seconds_element.textContent = seconds;

            //add one to minutes
            minutes++;

            //display minutes
            minutes_element.textContent = minutes;

            /*if 60 minutes has passed add one to hours display hours,
            set minutes to zero*/
            if (minutes == 60) {
                //set minutes to zero
                minutes = 0;

                //display minutes passed
                minutes_element.textContent = minutes;

                //add one to hours
                hours++;

                //display hours
                hours_element.textContent = hours
            }

        }

    }

    //select the reset icon
    let reset_button = document.querySelector('.restart-button');

    reset_button.addEventListener('click', function() {
        console.log('reset button was clicked');




        for (i = 0; i < cards.length; i++) {
            //
            if (cards[i].className == 'card faceUp do_not_match_animation') {
                setTimeout(board_reset, 2000);
            } else {
                board_reset();
            }

        }

        //    board_reset();


    })

    //function that resets the game board and flips the cards face down
    function board_reset() {

        you_win = false;
        //scaning through the cards
        for (i = 0; i < cards.length; i++) {

            /*style for the facedown side of card,
            Something to play with later is diffrent colors
            for the facedown side of the card
                */

            cards[i].style.color = 'white';

            //randomly shuffle the cards at the start of a game
            cards[i].style.order = `${Math.floor(Math.random() * 16)}`;

            //undo the move

            //for unmatcheds cards
            if (cards[i].className == 'card faceUp') {
                /*reomve the faceUp class from the icon*/
                cards[i].firstElementChild.classList.remove('faceUp');

                cards[i].firstElementChild.style.color = 'white';

                /*remove the faceUp class from the card*/
                cards[i].classList.remove('faceUp');

                //only subtract from the num face up if it's zero or greater
                //to prevent negative.
                if (num_faceUp >= 0) {
                    /*minus one to the counter for the number of face cards in the current move*/
                    num_faceUp--;
                }

            }

            //for matched cards
            if (cards[i].className == 'card matched') {
                /*reomve the matched class from the icon*/
                cards[i].firstElementChild.classList.remove('matched');

                //flip the card back over
                cards[i].firstElementChild.style.color = 'white';

                /*remove the faceUp class from the card*/
                cards[i].classList.remove('matched');

                //flip the card back over
                cards[i].style.background = 'white';

                //set the number of matches found to zero
                found_match = 0;

            }

            /*restart the move counter*/
            //set move counter to zero
            move_counter = 0;

            //display zero for the move counter
            move_number.textContent = move_counter;

            /*reset the star rating*/

            //reset the number of wrong moves
            number_wrong = 0;

            //reset the number of matches found
            found_match = 0;

            //reset the stars
            right_star.textContent = 'star';

            mid_star.textContent = 'star';

            left_star.textContent = 'star';

            /*reset the timer*/

            //stop the timer
            window.clearInterval(timerId);

            //reset the seconds
            seconds = 0;

            //show zero seconds
            seconds_element.textContent = seconds;


            //reset the minutes
            minutes = 0;

            //show zero minutes
            minutes_element.textContent = minutes;

            //reset the hours
            hours = 0;

            //show zero hours
            hours_element.textContent = hours;

            //restart the timer
            timerId = window.setInterval(timer, 1000);


        }

    }