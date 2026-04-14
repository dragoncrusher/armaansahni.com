const nameBox = document.getElementById("name");
const img = document.getElementById("img");

// DATA: Ensure every row has 16 items to avoid undefined
const row1 = [12, 5, 10, 3, 4, 5, 3, 6, 14, 10, 14, 11, 12, 3, 1, 4];
const row2 = [14, 11, 9, 12, 11, 15, 6, 16, 10, 8, 14, 3, 4, 14, 4, 14];
const row3 = [10, 11, 1, 17, 4, 13, 5, 2, 9, 16, 1, 3, 11, 2, 9, 7];
const row4 = [11, 4, 14, 12, 9, 14, 13, 7, 11, 5, 6, 19, 7, 9, 4, 1];
const row5 = [4, 12, 11, 12, 9, 3, 7, 9, 7, 1, 1, 7, 10, 5, 13, 11];
const row6 = [6, 3, 8, 1, 2, 9, 6, 13, 8, 3, 5, 1, 2, 9, 8, 6, 10]; // Added 1 to make 16
const row7 = [5, 7, 7, 8, 2, 14, 4, 11, 12, 6, 14, 5, 2, 4, 20, 10];
const row8 = [4, 14, 3, 7, 8, 11, 8, 6, 3, 8, 7, 7, 2, 1, 13, 8];
const row9 = [5, 1, 4, 4, 6, 18, 3, 12, 10, 6, 13, 6, 6, 14, 11, 5]; // Added 1 to make 16
const row10 = [8, 5, 12, 2, 15, 16, 10, 6, 1, 2, 11, 15, 8, 1, 1, 5];
const row11 = [5, 4, 4, 10, 13, 9, 6, 6, 2, 10, 7, 10, 2, 3, 4, 10];
const row12 = [2, 12, 1, 11, 3, 14, 7, 7, 14, 1, 17, 3, 5, 11, 9, 13];
const row13 = [2, 3, 9, 13, 8, 14, 8, 8, 9, 7, 9, 5, 8, 17, 7, 4];
const row14 = [8, 1, 6, 12, 1, 13, 12, 12, 2, 12, 13, 14, 10, 2, 3, 1];
const row15 = [14, 13, 11, 2, 9, 5, 10, 9, 8, 13, 6, 13, 5, 13, 12, 13];
const row16 = [8, 5, 10, 3, 19, 5, 4, 7, 18, 6, 13, 2, 10, 12, 1, 3];

const columb1andonly = [row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12, row13, row14, row15, row16];

function randomizer() {
    // Pick Row (x)
    let x = Math.floor(Math.random() * columb1andonly.length);
    // Pick Column (y) based on that row's actual length
    let y = Math.floor(Math.random() * columb1andonly[x].length);
    
    let theone = columb1andonly[x][y];
    let rarity = "common";

    // 1. Initial Rarity Check
    if (theone < 9) {
        rarity = "common";
    } else if (theone < 15) {
        rarity = "uncommon";
    } else if (theone < 18) {
        rarity = "rare";
    } else if (theone < 20) {
        rarity = "epic";
    } else {
        rarity = "legendary";
    }

// 2. The Fate Roll (1 in 40 chance to upgrade)
    let theFate = Math.floor(Math.random() * 16);
    
    if (theFate === 15) { 
        if (rarity === "common") rarity = "uncommon";
        else if (rarity === "uncommon") rarity = "rare";
        else if (rarity === "rare") rarity = "epic";
        else if (rarity === "epic") rarity = "legendary";
        else if (rarity === "legendary") rarity = "mythical";
        else if (rarity === "mythical") rarity = "unique";
        else if (rarity === "unique") rarity = "forgotten"; // New Tier!
    }
    theFate = Math.floor(Math.random() * 16);
    
    if (theFate === 15) { 
        if (rarity === "common") rarity = "uncommon";
        else if (rarity === "uncommon") rarity = "rare";
        else if (rarity === "rare") rarity = "epic";
        else if (rarity === "epic") rarity = "legendary";
        else if (rarity === "legendary") rarity = "mythical";
        else if (rarity === "mythical") rarity = "unique";
        else if (rarity === "unique") rarity = "forgotten"; // New Tier!
    }
    theFate = Math.floor(Math.random() * 16);
    
    if (theFate === 15) { 
        if (rarity === "common") rarity = "uncommon";
        else if (rarity === "uncommon") rarity = "rare";
        else if (rarity === "rare") rarity = "epic";
        else if (rarity === "epic") rarity = "legendary";
        else if (rarity === "legendary") rarity = "mythical";
        else if (rarity === "mythical") rarity = "unique";
        else if (rarity === "unique") rarity = "forgotten"; // New Tier!
    }

    // 3. Update the UI
    img.src = rarity + ".png";
    nameBox.innerHTML = rarity + " " + (theone || "Fate Upgrade");
    
    console.log(`Coords: x:${x+1}, y:${y+1} | Value: ${theone} | Final: ${rarity}`);
}