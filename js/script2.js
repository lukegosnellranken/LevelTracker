// arrays
const all = [];
const caught = [];
const caughtObjects = [];

// get elements
const selectPokemon = document.getElementById("selectPokemon");
const selectPokemonAddBtn = document.getElementById("add");
const selectPokemonRemove = document.getElementById("selectPokemonRemove");
const selectPokemonSubBtn = document.getElementById("sub");
const fullList = document.getElementById("fullList-ul");

// pokemon with initial values
let bulbasaur = {name:"Bulbasaur", type:"grass", level:4, base:5, exp:4, stage:1, line:"bulbasaur", shiny:0, player: 0};
let ivysaur = {name:"Ivysaur", type:"grass", level:6, base:7, exp:6, stage:2, line:"bulbasaur", shiny:0, player: 0};
let venusaur = {name:"Venusaur", type:"grass", level:8, base:9, exp:8, stage:3, line:"bulbasaur", shiny:0, player: 0};

function onPageLoad() {
    // push pokemon variable objects to all array
    populateAll();
    // populate dropdown with name attribute of all objects in all array
    populateDropdown();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function populateAll() {
    all.push(bulbasaur, ivysaur, venusaur);
}

function populateDropdown() {
    // depopulate Add dropdown
    let i, L = selectPokemon.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectPokemon.remove(i);
    }

    // depopulate Sub dropdown
    let i2, L2 = selectPokemonRemove.options.length - 1;
    for(i2 = L2; i2 >= 0; i2--) {
       selectPokemonRemove.remove(i2);
    }

    // repopulate Add dropdown
    for (let i = 0; i < all.length; i++) {
        let opt = all[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectPokemon.appendChild(el);
    }

    // repopulate Sub dropdown
    for (let i = 0; i < caught.length; i++) {
        let opt = caught[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectPokemonRemove.appendChild(el);
    }
}

function checkEmptyArray() { 
    // if nothing in all array, hide add dropdown and button. otherwise, show them
    if (all.length == 0) {
        selectPokemon.setAttribute("class", "hideAddRemove");
        selectPokemonAddBtn.setAttribute("class", "hideAddRemove");
    } else {
        selectPokemon.setAttribute("class", "showAddRemove");
        selectPokemonAddBtn.setAttribute("class", "showAddRemove");
    }
    // if nothing in caught array, hide remove dropdown and button. otherwise, show them
    if (caught.length == 0) {
        selectPokemonRemove.setAttribute("class", "hideAddRemove");
        selectPokemonSubBtn.setAttribute("class", "hideAddRemove");
    } else {
        selectPokemonRemove.setAttribute("class", "showAddRemove");
        selectPokemonSubBtn.setAttribute("class", "showAddRemove");
    }
}

function addPokemon() {
    // get value of dropdown option
    let selectedPokemon = selectPokemon.value;

    // if selectedPokemon matches name in all array, add that object to caught array 
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            // shiny chance (1/100)
            let shinyChance = Math.floor(Math.random() * 3);
            if (shinyChance == 1) {
                all[i].shiny = 1;
            }
            caught.push(all[i]);
        }
    }

    // remove caught pokemon from all array
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            all.splice(i,1);
        }
    }
    
    // repopulate dropdown
    populateDropdown();
    // rebuild caught object array for captured pokemon
    buildCaughtObjects();
    // add caught pokemon to visible list
    addToFullList();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function removePokemon() {
    // get value of dropdown option
    let selectedPokemon = selectPokemonRemove.value;

    // if selectedPokemon matches name in caught array, add that object to all array 
    for (let i = 0; i < caught.length; i++) {
        if (caught[i].name == selectedPokemon) {
            all.push(caught[i]);
        }
    }

    // remove "all" pokemon from caught array
    for (let i = 0; i < caught.length; i++) {
        if (caught[i].name == selectedPokemon) {
            caught.splice(i,1);
        }
    }

    // repopulate dropdown
    populateDropdown();
    // rebuild caught object array for captured pokemon
    buildCaughtObjects();
    // add caught pokemon to visible list
    addToFullList();
    // check for empty all/remove arrays
    checkEmptyArray();
}

function buildCaughtObjects() {
    // depopulate caughtObjects array
    caughtObjects.splice(0, caughtObjects.length);

    // repopulate caughtObjects array
    for (var i = 0; i < caught.length; i++) {
        // build object for every caught pokemon
        let obj = {};
        let name = caught[i].name;
        let level = caught[i].level;
        let base = caught[i].base;
        let exp = caught[i].exp;
        let shiny = caught[i].shiny;
        obj.name = name;
        obj.sprite = "https://img.pokemondb.net/sprites/black-white/anim/normal/" + caught[i].name.toLowerCase() + ".gif";
        obj.stats =  " Lvl: " + level + " Atk: " + base + " Exp: " + exp;
        obj.shiny = shiny;
        // push built object to caughtObjects array
        caughtObjects.push(obj);
    }
}

function addToFullList() {

    // depopulate full list
    fullList.innerHTML = "";

    // repopulate full list
    for (var i = 0; i < caughtObjects.length; i++) {
        // build a list item for every caughtObject
        let name = caughtObjects[i].name;
        let stats = caughtObjects[i].stats;
        // create and set attributes for li and ul (which goes inside li)
        let li = document.createElement("li");
        let ul = document.createElement("ul");
        li.setAttribute("class", "list-pokemon-li");
        li.setAttribute("id", name.toLowerCase() + "-list-pokemon-li")
        ul.setAttribute("class", "list-pokemon-li-ul");
        ul.setAttribute("id", name.toLowerCase() + "list-pokemon-li-ul")

        // create and set attributes for sprite/stat li and ul (which goes inside li)
        let spriteAndStatsLiUl = document.createElement("li");
        spriteAndStatsLiUl.setAttribute("class", "ss-li-ul");
        let spriteAndStatsUl = document.createElement("ul");
        spriteAndStatsUl.setAttribute("class", "ss-ul");

        // create liSprite, liStats, and liExp
        let liSprite = document.createElement("li");
        let liStats = document.createElement("li");
        // run experience function, passing in the current caughtObject. An li containing all experience data is returned.
        let liExp = experience(caughtObjects[i]);

        let img = document.createElement("img");
        // grab sprite from external site. normal or shiny depending on caughtObject's shiny value
        if (caughtObjects[i].shiny == 1) {
            img.setAttribute("src", "https://img.pokemondb.net/sprites/black-white/anim/shiny/" + name.toLowerCase() + ".gif");
        } else {
            img.setAttribute("src", "https://img.pokemondb.net/sprites/black-white/anim/normal/" + name.toLowerCase() + ".gif");
        }
        // set img attributes
        img.setAttribute("class", "sprite");
        img.setAttribute("id", name + "-sprite");

        // create p element for statsText, set its textContent and add it to liStats (li element)
        let statsText = document.createElement("p");
        statsText.textContent = stats;
        liStats.appendChild(statsText);

        // img < liSprite = liStats < spriteAndStatsUl < spriteAndStatsLiUl
        liSprite.appendChild(img);
        spriteAndStatsUl.appendChild(liSprite);
        spriteAndStatsUl.appendChild(liStats);
        spriteAndStatsLiUl.appendChild(spriteAndStatsUl);
 
        // spriteAndStatsLiUl = liExp < ul < li
        ul.appendChild(spriteAndStatsLiUl);
        ul.appendChild(liExp);
        li.appendChild(ul);
        // add completed list item to fullList array
        fullList.appendChild(li);

        // get input
        let inputIdName = (name).toLowerCase() + "-exp";
        let input = document.getElementById(inputIdName);
        // get button
        let buttonIdName = (name).toLowerCase() + "-button";
        let button = document.getElementById(buttonIdName);
        // set +EXP button text
        button.innerHTML = "+EXP";
    }
}

function experience(p) {
    // p = caughtObjects[i] from addToFullList()
    // create names to be used as id/class names
    let inputIdName = (p.name).toLowerCase() + "-exp";
    let buttonIdName = (p.name).toLowerCase() + "-button";
    let ulIdName = (p.name).toLowerCase() + "-li-ul";
    // create elements and set attributes
    let returnedLi = document.createElement("li");
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let btn = document.createElement("button");
    let inp = document.createElement("input");
    returnedLi.setAttribute("class", "exp-li");
    li1.setAttribute("class", "input-li");
    li2.setAttribute("class", "plusExpBtn-li");
    btn.setAttribute("id", buttonIdName);
    btn.setAttribute("class", "plusExpBtn");
    // when +EXP button is clicked, run addExp function, passing in p.name
    btn.setAttribute("onclick", `addExp("${p.name}")`);
    inp.setAttribute("type", "text");
    inp.setAttribute("id", inputIdName);
    inp.setAttribute("class", "inputElement");
    ul.setAttribute("id", ulIdName);
    ul.setAttribute("class", "exp-li-ul");
    // ((inp < li1) = (btn < li2)) < ul < returnedLi
    li1.appendChild(inp);
    li2.appendChild(btn);
    ul.appendChild(li1);
    ul.appendChild(li2);
    returnedLi.appendChild(ul);
    // return returnLi to addToFullList()
    return returnedLi;
}

function addExp(pkmn) {
    // pkmn = p.name from experience()
    // create text input for caught pokemon
    let input = document.getElementById(pkmn.toLowerCase() + "-exp");
    // set amount to value of entered text in input
    let amount = input.value;
    // iterate through all items in caught array to find the pokemon with the correct name value
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            // add amount to the pokemon's experience value
            caught[i].exp += parseInt(amount);
        }
    }
    // rebuid all
    checkLevel();
    buildCaughtObjects();
    addToFullList();
}

function checkLevel() {
    // Check exp value of all pokemon in caught array in order to level up accordingly
    for (var i = 0; i < caught.length; i++) {
        let currentPkmn = caught[i];
        // Level < 10
        if (currentPkmn.level < 10) {
            if (currentPkmn.exp >= 10) {
                currentPkmn.exp -= 10;
                currentPkmn.level++;
                currentPkmn.base++;
            }
        }
        // Level < 15
        if (currentPkmn.level < 15) {
            if (currentPkmn.exp >= 15) {
                currentPkmn.exp -= 15;
                currentPkmn.level++;
                currentPkmn.base++;
            }
        }
        // Level < 20
        if (currentPkmn.level < 20) {
            if (currentPkmn.exp >= 20) {
                currentPkmn.exp -= 20;
                currentPkmn.level++;
                currentPkmn.base++;
            }
        }
        // Level cap
        if (currentPkmn.level >= 20) {
            currentPkmn.exp = 0;
            currentPkmn.level = 20;
        }
    }
}