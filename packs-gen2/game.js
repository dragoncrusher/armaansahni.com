const nameBox = document.getElementById("name");
const img = document.getElementById("img");

function randomizer() {
    // 1. Base Rarity Roll (Legendary is 0.3%)
    let roll = Math.random() * 100;
    let rarity = "";

    if (roll <= 0.3) rarity = "legendary";
    else if (roll <= 2.0) rarity = "mythical";
    else if (roll <= 5.0) rarity = "unique";
    else if (roll <= 12.0) rarity = "epic";
    else if (roll <= 25.0) rarity = "rare";
    else if (roll <= 50.0) rarity = "uncommon";
    else rarity = "common";

    // 2. Set default Variant
    let variant = "M1";

    // 3. Three Separate Fate Rolls (The Chained Upgrade)
    
    // --- Fate Roll 1 ---
    if (Math.floor(Math.random() * 2) === 0) {
        if (variant === "M1") variant = "M2";
    }

    // --- Fate Roll 2 ---
    if (Math.floor(Math.random() * 2) === 0) {
        if (variant === "M2") variant = "M3";
        else if (variant === "M1") variant = "M2"; // Catch-up if roll 1 failed
    }

    // --- Fate Roll 3 ---
    if (Math.floor(Math.random() * 2) === 0) {
        if (variant === "M3") variant = "M4";
        else if (variant === "M2") variant = "M3";
        else if (variant === "M1") variant = "M2";
    }

    // 4. Final Output
    img.src = rarity + ".png"; 
    nameBox.innerHTML = `${rarity} ${variant}`;

    console.log(`Roll: ${roll.toFixed(2)} | Result: ${rarity} ${variant}`);
}