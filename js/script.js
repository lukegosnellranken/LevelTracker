
const all = [];
const caught = [];

const selectPokemon = document.getElementById("selectPokemon");
const caughtList = document.getElementById("caughtList");
const experienceList = document.getElementById("experienceList");


let bulbasaur = {name:"Bulbasaur", type:"grass", level:4, base:5, exp:4};
let ivysaur = {name:"Ivysaur", type:"grass", level:6, base:7, exp:6};
let venusaur = {name:"Venusaur", type:"grass", level:8, base:9, exp:8};

function onPageLoad() {
    console.log("test")
    populateAll();
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
    let selectedPokemon = selectPokemon.value;
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            caught.push(all[i]);
        }
    }
    for (let i = 0; i < all.length; i++) {
        if (all[i].name == selectedPokemon) {
            all.splice(i,1);
        }
    }
    console.log(caught);
    console.log(all);
    populateDropdown();
    addToCaughtList();
    addToExperienceList();
}

function addToCaughtList() {
    // depopulate caught list
    caughtList.innerHTML = "";

    // repopulate caught list
    for (let i = 0; i < caught.length; i++) {
        let name = caught[i].name;
        let level = caught[i].level;
        let base = caught[i].base;
        let exp = caught[i].exp;
        let el = document.createElement("li");
        let el1 = document.createElement("li");
        el.textContent = name;
        el1.textContent = " Lvl: " + level + " Atk: " + base + " Exp: " + exp;
        el.value = `"${name}"`;
        el.setAttribute("class", "pkmnName");
        el1.setAttribute("class", "pkmnStats");
        caughtList.appendChild(el);
        caughtList.appendChild(el1);
    }
}

function addToExperienceList() {
    experienceList.innerHTML = "";

    for (let i = 0; i < caught.length; i++) {
        let el = document.createElement("li");
        let el1 = document.createElement("button");
        let el2 = document.createElement("input");
        let inputIdName = caught[i].name + "-exp";
        let buttonIdName = caught[i].name + "-button";
        el1.setAttribute("id", buttonIdName);
        el1.setAttribute("onclick", `addExp("${caught[i].name}")`);
        el2.setAttribute("type", "text");
        el2.setAttribute("id", inputIdName);
        el2.setAttribute("class", "inputElement");
        experienceList.appendChild(el);
        el.appendChild(el2);
        el.appendChild(el1);
        let button = document.getElementById(buttonIdName);
        let input = document.getElementById(inputIdName);
        button.innerHTML = "Add Exp";
    }
}

function addExp(pkmn) {
    console.log("addExp hit:" + pkmn);
    let input = document.getElementById(pkmn + "-exp");
    let amount = input.value;
    for (i = 0; i < caught.length; i++) {
        if (caught[i].name == pkmn) {
            caught[i].exp += parseInt(amount);
        }
    }
    checkLevel();
    addToCaughtList();
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