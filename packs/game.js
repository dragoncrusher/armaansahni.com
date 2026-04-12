const nameBox = document.getElementById("name")
const img = document.getElementById("img")
const row1 = [12, 5, 10, 3, 4, 5, 3,6,14,10,14,11,12,3,1,4]
const row2 = [14,11,9,12,11,15,6,16,10,8,14,3,4,14,4,14]
const row3 = [10,11,1,17,4,13,5,2,9,16,1,3,11,2,9,7]
const row4 = [11,4,14,12,9,14,13,7,11,5,6,19,7,9,4,1]
const row5 = [4,12,11,12,9,3,7,9,7,1,1,7,10,5,13,11]
const row6 = [6,3,8,1,2,9,6,13,8,3,5,1,2,9,8,6]
const row7 = [5,7,7,8,2,14,4,11,12,6,14,5,2,4,20,10]
const row8 = [4,14,3,7,8,11,8,6,3,8,7,7,2,1,13,8]
const row9 = [,5,1,4,4,6,18,3,12,10,6,13,6,6,14,11]
const row10 = [8,5,12,2,15,16,10,6,1,2,11,15,8,1,1,5]
const row11 = [5,4,4,10,13,9,6,6,2,10,7,10,2,3,4,10]
const row12 = [2,12,1,11,3,14,7,7,14,1,17,3,5,11,9,13]
const row13 = [2,3,9,13,8,14,8,8,9,7,9,5,8,17,7,4]
const row14 = [8,1,6,12,1,13,12,12,2,12,13,14,10,2,3,1]
const row15 = [14,13,11,2,9,5,10,9,8,13,6,13,5,13,12,13]
const row16 = [8,5,10,3,19,5,4,7,18,6,13,2,10,12,1,3]
const columb1andonly = [row1,row2,row3,row4,row5,row6,row7,row8,row9,row10,row11,row12,row13,row14,row15,row16,]
let x = 0
let y = 0
let theone = 0
let rarity = "common"
function randomizer() {
x = Math.floor(Math.random() * 15);
y = Math.floor(Math.random() * 15);
theone = columb1andonly[x][y]
if (theone < 9){
rarity = "common"
img.src = "common.png"
} else if (theone > 8 && theone < 15)
{
    rarity = "uncommon"
    img.src = "uncommon.png"
} else if (theone > 14 && theone < 18)
{
    rarity = "rare"
    img.src = "rare.png"
} else if (theone > 17 && theone < 20)
{
    rarity = "epic"
    img.src = "epic.png"
} else if (theone == 20) 
{
    rarity = "legendary"
    img.src = "legendary.png"
}
console.log("x " + (x+1) + "y " + (y+1))
console.log(rarity + " " + theone)
nameBox.innerHTML = rarity + " " + theone
}