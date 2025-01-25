let modInfo = {
	name: "红鲨树",
	id: "mymod",
	author: "Designant",
	pointsName: "g质量",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0",
	name: "",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added Level.`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)
	if(hasUpgrade("r",11)) gain = gain.add(hasMilestone("s",3)&&player.points.gte(100)?player.points.sub(100).pow(0.5).add(100).mul(hasMilestone("r",4)?player.points.add(1).mul(hasMilestone("s",5)?player.s.points:1):1):player.points)		
	if(hasUpgrade("r",12)) gain = gain.mul(hasMilestone("s",4)&&player.points.gte(100)?player.points.sub(100).pow(0.5).add(100).mul(hasMilestone("r",5)?player.s.points:1):player.points.add(1))		
	if(hasUpgrade("r",13)) gain = gain.pow(hasMilestone("s",5)&&player.points.gte(2)?(player.points.add(1)).sub(2).pow(0.01).add(2):hasMilestone("s",2)&&player.points.gte(1.1)?(player.points.add(1)).sub(1.1).pow(0.1).add(1.1):player.points.add(1))	
	if(hasMilestone("s",4)) gain = gain.mul(player.s.points)
	if(hasMilestone("t",0)) gain = gain.pow(1.2)
	if(hasMilestone("s",0)&&gain.gte(10)) gain = gain.sub(10).pow(0.45).add(10)	
	if(hasMilestone("s",1)&&gain.gte(1000)) gain = gain.sub(1000).pow(0.2).add(1000)														
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}