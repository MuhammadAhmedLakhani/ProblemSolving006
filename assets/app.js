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

// let score = document.querySelector("#score")

// // get click button

// let big = document.querySelector("#big")

// // get upgrade button

// let upgrade = document.querySelector("#upgrade")

// score.textContent = 0;


// //set initial 



// let updated = 0;

// //set power

// let power = 1

// //set buy status

// let buy = false

// //event setting for click to update Score

// big.addEventListener("click", () => {
//     console.log("working")

//     updated = updated + power;
//     score.textContent = `${updated}`;
//     console.log("condition", updated === 10)
//     if (updated >= 10) {
//         console.log("consition working")
//         if(!buy){
//             upgrade.disabled = false
//             // add class
//             upgrade.classList.add("active")
//         }
//     }


// })

// //
// upgrade.addEventListener("click", () => {
//     console.log("upgrade starts")
//     console.log(upgrade.ariaDisabled)
//     power = 2
//     // diable the upgrade again
//     upgrade.disabled = true
//     // remove the active class
//     upgrade.classList.remove("active")
//     //change text
//     upgrade.textContent = "Owned"
//     //update buy status
//     buy = true
// })


//===========================================================================================================



// Build 2: Password Strength Meter (about 60 to 75 minutes)

// A text box. As you type, a colored bar and a label show the strength,
//  and a checklist ticks off rules live. A Show/Hide button reveals the password.


// The rules (the checks)
// At least 8 characters
// Contains a number
// Contains an uppercase letter
// Contains a symbol (anything that isn’t a letter or number)

// Levels: empty text → none, then weak, fair, good, strong, based on how many checks pass.


// Think first (fill in the right column, then compare with what your code does)
// Password	                                  How many checks pass?	                       What level should it be?
// "" (empty)		                              none                                              none
// abc	                                          none                                             none
// abcdefgh		                                   one                                             weak
// abcdefg1		                                   two                                              fair
// Abcdefg1		                                   three                                             good
// Abcdef1!		                                    four                                             strong
// A1!		read this one carefully                 three                                            length
// ········ (8 spaces)		                        none                                             none


// -----------------------------------------------------------------------------------------------------------------

// *****************Stages***********************

// Stage 1: The logic, without any page. Write getStrength(password) that returns an object,
//  at least { level, checks }, where checks records which of the four rules passed. 
// It touches nothing on the page. Test it only in the console with the paste-ready
//  lines below. Logic you can test without a browser is the habit professionals build,
//  and it’s why this stage comes first.


// const getStrength = (password) => {
//     let checks = [];
//     let level = 0;
//     const lower = "abcdefghijklmnopqrstuvwxyz";
//     const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
//     const numbers = "0123456789"
//     //check type
//     if (typeof (password) !== "string") return { level: "none", checks }
//     //Check minimum Length
//     if (password.length >= 8) {
//         checks.push("length");
//         level = ++level;
//     }
//     const p = [...password]
//     // check Uppercase
//     if (p.some(elem => upper.includes(elem))) {
//         checks.push("uppercase");
//         level = ++level;
//     }
//     // check number
//     if (p.some(elem => numbers.includes(elem))) {
//         checks.push("number");
//         level = ++level;
//     }
//     // 
//     if (p.some(elem => ( ((!numbers.includes(elem)) && elem.trim() !== "") && (!(upper.includes(elem)) && !(lower.includes(elem)))))) {
//         checks.push("symbol");
//         level = ++level;
//     }

//     switch (level) {
//         case 1:
//             level = "weak";
//             break
//         case 2:
//             level = "fair";
//             break
//         case 3:
//             level = "good";
//             break
//         case 4:
//             level = "strong";
//             break
//             default:
//                 level = "none"
//             }

//     //cap if length not met
//     if (password.length < 8) {
//         console.log("debug-->")
//         return {
//             level: "none",
//             checks
//         }
//     } else {
//         return {
//             level, checks
//         }
//     }

// }


// console.log(getStrength("").level);              // "none"
// console.log(getStrength("abc").level);           // "weak"
// console.log(getStrength("abcdefgh").level);      // "weak"   (yours: "fair")
// console.log(getStrength("abcdefg1").level);      // "fair"   (yours: "good")
// console.log(getStrength("Abcdefg1").level);      // "good"   (yours: "none")
// console.log(getStrength("Abcdef1!").level);      // "strong" (yours: "none")
// console.log(getStrength("A1!"));           // "weak"   (yours: "good", the rule from point 4)
// console.log(getStrength("        "));      // "weak"   (yours: "fair")
// console.log(getStrength("abcdefghi").checks);    // ["length"]  (yours: ["symbol"])
// console.log(getStrength("Abcdefghijk1!").level); // "strong" (yours: "none", length is not exactly 8)
// console.log(getStrength(5).level);               // your decision, but not undefined


// ========================= claude version ======================================


const getStrength = (password) => {
    const empty = { length: false, uppercase: false, number: false, symbol: false };

    if (typeof password !== "string" || password.trim() === "") {
        return { level: "none", checks: empty };
    }

    const digits = "0123456789";
    const chars = [...password];
    const isLetter = (c) => c.toLowerCase() !== c.toUpperCase();

    const checks = {
        length: password.length >= 8,
        uppercase: chars.some((c) => c !== c.toLowerCase()),
        number: chars.some((c) => digits.includes(c)),
        symbol: chars.some((c) => !isLetter(c) && !digits.includes(c) && c.trim() !== ""),
    };

    const score = Object.values(checks).filter((passed) => passed).length;
    const levels = ["weak", "weak", "fair", "good", "strong"];

    let level = levels[score];
    if (!checks.length) level = "weak";   // too short: never better than weak

    return { level, checks };
};



// ******************************** Stage 2 ***************************************************

// Stage 2: wire it to the page

// The goal is that whatever the user types, #label shows the level.

// Think first. Fill in your own answers:

// Moment	                                                       What should #label show?
// Page just loaded, nothing typed	                              nothing            
// User has typed abc	                                          weak
// User has typed Abcdef1!	                                      strong
// User deleted everything	                                      nothing     

// Steps:

// Select #pw and #label.

const pw = document.querySelector("#pw");
const label = document.querySelector("#label");
const bar = document.querySelector("#bar");
// checks
const checks = document.querySelector("#checks");

// Add an input listener on #pw.
// Inside it, read the text from the event (event.target.value), call getStrength,
//  and put the level in #label with textContent.

// Stage 3: the colored bar
// keystroke, only your length cap in getStrength changes.

// What to do:

// Add <div id="bar" data-level="none"></div> and the CSS from the Build 2 setup, if you haven’t already.
// Select #bar.
// Inside update (the same function, so the page stays in sync with itself), set the bar’s data-level to the level that getStrength returned.

// const update = () => {
//     let level = getStrength(pw.value).level
//     console.log(level)
//     label.textContent  = level;
//     bar.dataset.level = level;
// }

// pw.addEventListener("input", update)


// update()
// Make the page correct before anyone types.
// Remember what happened in the Clicker  Game when the display wasn’t drawn on load.

// Stage 4: the live checklist (read it now, build it after Stage 3 works)

// Rules as data. 
// 1:There are four rules (length, uppercase, number, symbol),
//  and each needs a readable sentence for the page. Would you write the four 
// li elements out by hand, or keep the rules in an array of objects and build
//  the list from it with a loop? Which one makes it easy to add a fifth rule later?

//2:Build once, update many times. The four li elements should be created once,
//  at the start. On each keystroke, update only changes what they show.
//  What goes wrong if update rebuilds the list every time? (Think about what you proved in the render twice test.)


//setting up chcklists

 let val = Object.values(getStrength(""))[1]
 let checksPoints =  Object.entries(val);
checksPoints.forEach(elem => {
    let li = document.createElement("li");
    li.classList.add("description");
    checks.append(li);
    li.textContent = `Password  ${elem[0]} status is ${elem[1]}`
});


//description

let description = document.querySelectorAll(".description")

// console.log("checks-->",description)

const update = () => {
    let level = getStrength(pw.value).level;
    let checkStatus = Object.entries(getStrength(pw.value).checks);
    console.log(getStrength(pw.value).checks)
    label.textContent = level;
    //updating bar style attribute
    bar.dataset.level = level;

    // Updating the check status on DOM
    description.forEach((elem,i) => elem.textContent = `Password ${checkStatus[i][0]} status is ${checkStatus[i][1]}`)
}

pw.addEventListener("input", update)

