//Build 1: Clicker Game (45 to 60 minutes)

// You learn: click, state in a variable, and one render().

// Use these exact ids so the tests below work: #big (the button you click),
//  #score (shows the score), and #upgrade (the upgrade button).

// Rules:

// Each click on #big adds the current power to the score (power starts at 1).
// #upgrade costs 10 points. It’s disabled until you have 10.
// Buying it subtracts 10, sets power to 2, and then the button
//  shows Owned and stays disabled. It’s a one-time purchase.



// Think first (fill in the right column yorself):

// Situation	                                   What should happen?
// Score is 9	                                    #upgrade remain disabled      
// Score is 10	                                    #ugrade becomes enabled
// Score is 25 when you buy	                        #upgrade become owned and power sets to 2            
// After buying, you click #big	                    #the scoer become 27
// After buying, you click #upgrade again	        #upgrade remain diabled 


//Button and score text. A click increases the score on screen.
//  (Where does the score live? Decide, and write it as a comment.)


//get score 

let score = document.querySelector("#score")

// get click button

let big = document.querySelector("#big")

// get upgrade button

let upgrade = document.querySelector("#upgrade")

score.textContent = 0;


//set initial 



let updated = 0;

//set power

let power = 1

//set buy status

let buy = false

//event setting for click to update Score

big.addEventListener("click", () => {
    console.log("working")

    updated = updated + power;
    score.textContent = `${updated}`;
    console.log("condition", updated === 10)
    if (updated >= 10) {
        console.log("consition working")
        if(!buy){
            upgrade.disabled = false
            // add class
            upgrade.classList.add("active")
        }
    }


})

//
upgrade.addEventListener("click", () => {
    console.log("upgrade starts")
    console.log(upgrade.ariaDisabled)
    power = 2
    // diable the upgrade again
    upgrade.disabled = true
    // remove the active class
    upgrade.classList.remove("active")
    //update but status
    buy = true
})











