//Build 3 is a short app on the surface, but it’s the first one where timing matters: 
// when your code runs relative to the page, and what the user sees in between. 
// The “flash of the wrong theme” is a real bug that professional sites have to solve.

// What’s new here: CSS custom properties as the theme, matchMedia to follow 
// the operating system live, validating a value read from localStorage, 
// aria - pressed, and a script that must run before the page paints.


// Think first                                                                     (fill in the right column)
// Situation	                                                                     What should the page do?   

// First visit, OS set to dark, nothing saved	                                     nothing change                                   
// Saved choice is dark, OS is light	                                              toggle the theme
// Saved value is banana (anyone can edit storage)	                                  
// Browser blocks storage entirely	
// Choice is system and the OS switches to dark while the page is open	
// Choice is light and the OS switches to dark	
// What exactly gets saved: the choice or the resulting theme?	



//Stages

// Stage 1: The decision, as a pure function. Write resolve(choice, osPrefersDark), 
// which returns "light" or "dark".
//  It touches no page and no storage, so you can test it like getStrength.
//  An unknown choice must behave like "system".


const resolve = (choice, osPrefersDark) => {

    let options = ["dark","light","system"];

     if(!(options.find(elem => elem === choice))) {
        choice ="system"
     }

    if(choice === "light") return "light";
    if(choice === "dark") return "dark";
    if(choice === "system") {
        let result = osPrefersDark?"dark":"light";
        return result
    }

}


// console.log(resolve("light", true));    // "light"  (an explicit choice beats the OS)
// console.log(resolve("dark", false));    // "dark"
// console.log(resolve("system", true));   // "dark"
// console.log(resolve("system", false));  // "light"
// console.log(resolve("banana", true));   // "dark"   (unknown acts like system)
// console.log(resolve(null, false));      // "light"






// Stage 2: Draw from state. Keep choice as a variable. 
// One render() sets data-theme on document.documentElement, 
// sets aria-pressed on the three buttons (the active one true),
// and writes a status line like Using system theme (dark). 
// Your handlers only change choice and call render().
//  Call it once at the start as well.

let osPrefersDark = false;

let choice = "system"

const render = () => {
    document.documentElement.dataset.theme = resolve(choice,osPrefersDark)

    //looping over buttons

    let parent = document.querySelector("#choice");
    console.log(parent.children.length)
    for(let i = 0;i < parent.children.length; i++){
        console.log(parent.children[i])
        if(parent.children[i].dataset.choice === choice) {
            console.log("inside if")
            parent.children[i].setAttribute("aria-pressed","true");
        }
    }
    
    const statusBrief = document.querySelector("#status");
    
    statusBrief.textContent = `Using ${choice} theme ${resolve(choice,osPrefersDark)}`; 

}

render()