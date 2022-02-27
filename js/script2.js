const all = [];
const caught = [];
const caughtObjects = [];

const selectPokemon = document.getElementById("selectPokemon");
const fullList = document.getElementById("fullList-ul");


let bulbasaur = {name:"Bulbasaur", type:"grass", level:4, base:5, exp:4, line:1};
let ivysaur = {name:"Ivysaur", type:"grass", level:6, base:7, exp:6, line:2};
let venusaur = {name:"Venusaur", type:"grass", level:8, base:9, exp:8, line:3};

function onPageLoad() {
    // push pokemon variable objects to all array
    populateAll();

    // populate dropdown with name attribute of all objects in all array
    populateDropdown();
}

function populateAll() {
    all.push(bulbasaur, ivysaur, venusaur);
}

function populateDropdown() {
    // depopulate dropdown
    let i, L = selectPokemon.options.length - 1;
    for(i = L; i >= 0; i--) {
       selectPokemon.remove(i);
    }

    // repopulate dropdown
    for (let i = 0; i < all.length; i++) {
        let opt = all[i].name;
        let el = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        selectPokemon.appendChild(el);
    }
}

function addPokemon() {
    // get value of dropdown option
    let selectedPokemon = selectPokemon.value;

    // if selectedPokemon matches name in all array, add that object to caught array 
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
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
}

function buildCaughtObjects() {
    // depopulate caughtObjects array
    caughtObjects.splice(0, caughtObjects.length);

    // repopulate caughtObjects array
    for (var i = 0; i < caught.length; i++) {
        let obj = {};
        let name = caught[i].name;
        let level = caught[i].level;
        let base = caught[i].base;
        let exp = caught[i].exp;
        obj.name = name;
        obj.sprite = "https://img.pokemondb.net/sprites/black-white/anim/normal/" + caught[i].name.toLowerCase() + ".gif";
        obj.stats =  " Lvl: " + level + " Atk: " + base + " Exp: " + exp;
        caughtObjects.push(obj);
    }
}

function addToFullList() {

    // depopulate full list
    fullList.innerHTML = "";

    for (var i = 0; i < caughtObjects.length; i++) {

        let name = caughtObjects[i].name;
        let stats = caughtObjects[i].stats;

        let ul = document.createElement("ul");
        ul.setAttribute("id", name.toLowerCase() + "-ul")

        let spriteAndStatsUl = document.createElement("ul");
        spriteAndStatsUl.setAttribute("class", "ss-ul");

        let liSprite = document.createElement("li");
        let liStats = document.createElement("li");
        let liExp = experience(caughtObjects[i]);

        let img = document.createElement("img");
        img.setAttribute("src", "https://img.pokemondb.net/sprites/black-white/anim/normal/" + name.toLowerCase() + ".gif");
        img.setAttribute("class", "sprite");
        img.setAttribute("id", name + "-sprite");

        let statsText = document.createElement("p");
        statsText.textContent = stats;
        liStats.appendChild(statsText);

        spriteAndStatsUl.appendChild(liSprite);
        spriteAndStatsUl.appendChild(liStats);

        liSprite.appendChild(img);
        ul.appendChild(spriteAndStatsUl);
        ul.appendChild(liExp);
        fullList.appendChild(ul);

        let inputIdName = (name).toLowerCase() + "-exp";
        let buttonIdName = (name).toLowerCase() + "-button";
        let input = document.getElementById(inputIdName);
        let button = document.getElementById(buttonIdName);
        button.innerHTML = "Add Exp";
    }
}

function experience(p) {
    let returnedLi = document.createElement("li");
    let ul = document.createElement("ul");
    let li1 = document.createElement("li");
    let li2 = document.createElement("li");
    let btn = document.createElement("button");
    let inp = document.createElement("input");
    let inputIdName = (p.name).toLowerCase() + "-exp";
    let buttonIdName = (p.name).toLowerCase() + "-button";
    let ulIdName = (p.name).toLowerCase() + "-li-ul";
    btn.setAttribute("id", buttonIdName);
    btn.setAttribute("onclick", `addExp("${p.name}")`);
    inp.setAttribute("type", "text");
    inp.setAttribute("id", inputIdName);
    inp.setAttribute("class", "inputElement");
    ul.setAttribute("id", ulIdName);

    li1.appendChild(inp);
    li2.appendChild(btn);
    ul.appendChild(li1);
    ul.appendChild(li2);
    returnedLi.appendChild(ul);
    
    return returnedLi;
}

function addExp(pkmn) {
    console.log("addExp hit:" + pkmn);
    let input = document.getElementById(pkmn.toLowerCase() + "-exp");
    console.log(input);
    let amount = input.value;
    console.log(amount);
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            caught[i].exp += parseInt(amount);
        }
    }
    checkLevel();
    buildCaughtObjects();
    addToFullList();
}

function checkLevel() {
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