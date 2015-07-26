    var listOfElements = document.getElementsByClassName('genre-section'), 
        greatestHeight = 0;
        
	const FADE_INTERVAL = 50;
	const OPACITY_CHANGE = 1 / 20;
	var imageObjects = null;
    var pausedImage = null;
	
    function changeInterval() {
        return Math.floor(Math.random() * (4000)) + 6000;
    }
    
	function ImageObject(imageId, listId, imageLinkId, imageArray, titleArray, linkArray){
		this.imageId = imageId;
		this.imageElement = document.getElementById(imageId);
		this.listId = listId;
		this.listElement = document.getElementById(listId);
		this.images = imageArray;
		this.imageLink = document.getElementById(imageLinkId);
		this.links = linkArray;
        this.titles = titleArray;
		this.opacity = 1;

		this.fadeIn = 	function() {
            if (this.opacity < 1) {
                this.opacity += OPACITY_CHANGE;
                this.imageElement.style.opacity = this.opacity;
                setTimeout('imageObjects["' + this.imageId + '"].fadeIn()', FADE_INTERVAL);
            }
        }
	
		this.fadeOut =	function() {
            if (this.opacity > 0) {
                this.opacity -= OPACITY_CHANGE;
                this.imageElement.style.opacity = this.opacity;
                setTimeout('imageObjects["' + this.imageId + '"].fadeOut()', FADE_INTERVAL);
            }
            else {
                var nextImage = this.images.shift();
                var nextTitle = this.titles.shift();
				var nextLink = this.links.shift();
				var highlightedTitle = this.titles.pop();
				
                this.imageElement.src = 'images/' + nextImage + '.jpg';
				this.imageLink.href = 'https://marketplace.secondlife.com/p/Encounter-Box-' + nextLink;
                this.imageElement.title = nextTitle;

				var textProp = 'textContent' in document ? 'textContent' : 'innerText';
				var highlighted = this.listElement.getElementsByClassName("highlight")
				highlighted[0].className = "";
								
				var nextHighlight = this.listElement.getElementsByTagName("li")
				for ( j = 0; j < nextHighlight.length; j++) {
					if (nextHighlight[j][textProp] === nextTitle) {
						nextHighlight[j].className = 'highlight';
					}
				}

				this.titles.push(highlightedTitle);
                this.images.push(nextImage);
				this.links.push(nextLink);
                this.titles.push(nextTitle);
				
                setTimeout('imageObjects["' + this.imageId + '"].fadeIn()', 500);
            }
        }
	}
			
	function changeImages() {
		imageObjects = {
			"fantasy-img" : new ImageObject("fantasy-img", "fantasy-list", "fantasy-img-link",
															   ["eb-F1Raw-DungeonEmptyRoom", 
																"eb-F2aRaw-DungeonTreasure", 
																"eb-F3Raw-DungeonRoundRoom", 
																"eb-F4Raw-DungeonBedroom", 
																"eb-F5Raw-DungeonTorture", 
																"eb-F7Raw-DungeonBarrack", 
																"eb-F8Raw-DungeonCrypt", 
																"eb-F9Raw-DungeonLab", 
																"eb-F10Raw-DungeonShrine", 
																"eb-F11Raw-WoodlandTrail", 
																"eb-F12Raw-WoodlandCamp", 
																"eb-F13Raw-MountainTrail", 
																"eb-F14Raw-WinterMountainTrail", 
																"eb-F15Raw-Tavern", 
																"eb-F16Raw-MedievalMarket", 
																"eb-F18Raw-Blacksmith", 
																"eb-F19Raw-GeneralGoods"], 
															   ["Dungeon - Empty Room (F1)", 
																"Dungeon - Treasure (F2a)", 
																"Dungeon - Round Room (F3)", 
																"Dungeon - Bedroom (F4)", 
																"Dungeon - Torture (F5)", 
																"Dungeon - Barrack (F7)", 
																"Dungeon - Crypt (F8)", 
																"Dungeon - Lab (F9)", 
																"Dungeon - Shrine (F10)", 
																"Woodland Trail (F11)", 
																"Woodland Camp (F12)", 
																"Mountain Trail (F13)", 
																"Winter Mountain Trail (F14)", 
																"Tavern (F15)", 
																"Medieval Market (F16)", 
																"Blacksmith (F18)", 
																"General Goods (F19)"],
															   ["F1-Empty-Dungeons/5985967",
																"F2a-Treasure-Room-Large/5986071",
																"F3-Empty-Round-Dungeons/5986088",
																"F4-Dungeon-Bedroom/5986137",
																"F5-Torture-Dungeon-Rooms/5986157",
																"F7-Barracks-Dungeon-Rooms/5986180",
																"F8-Dungeon-Crypt-Rooms/5986193",
																"F9-Dungeon-Laboritory-Rooms/5986198",
																"F10-Dungeon-Shrine-Rooms/5986212",
																"F11-Forest-Path/5986274",
																"F12-Forest-Camp/5986371",
																"F13-Mountain-Pass/5986379",
																"F14-Winter-Mountain-Pass/5986389",
																"F15-Tavern/5986403",
																"F16-Medieval-Market/6018178",
																"F18-Blacksmith/6064812",
																"F19-General-Goods-Shop/6105355"]),
			"modern-img" : new ImageObject("modern-img", "modern-list", "modern-img-link",
															   ["eb-M1Raw-CityStreet", 
																"eb-M2Raw-SafeHouse", 
																"eb-M3Raw-PenthouseApartment", 
																"eb-M4Raw-AlleyWay", 
																"eb-M5Raw-Warehouse", 
																"eb-M6Raw-PoliceStation", 
																"eb-M7Raw-Hospital", 
																"eb-M8Raw-DiveBar", 
																"eb-M9Raw-Diner", 
																"eb-M10Raw-RaveBar", 
																"eb-M11Raw-GroceryStore", 
																"eb-M12Raw-GameComplex", 
																"eb-M13Raw-Library", 
																"eb-M14Raw-OldFarmhouse"],     
															   ["City Street (M1)", 
																"Safe House (M2)", 
																"Penthouse Apartment (M3)", 
																"Alley Way (M4)", 
																"Warehouse (M5)", 
																"Police Station (M6)", 
																"Hospital (M7)", 
																"Dive Bar (M8)", 
																"Diner (M9)", 
																"Rave Bar (M10)", 
																"Grocery Store (M11)", 
																"Game Complex (M12)", 
																"Library (M13)", 
																"Old Farmhouse (M14)"],
															   ["M1-City-Street/5986415",
																"M2-Safe-House/5986430",
																"M3-Urban-Penthouse/5986467",
																"M4-The-Alley/5986492",
																"M5-Warehouse/5986498",
																"M6-Police-Station/5986504",
																"M7-Hospital/5986514",
																"M8-Dive-Bar/5986527",
																"M9-The-Diner/5986530",
																"M10-Rave-Club/5986541",
																"M11-Grocery-Store/6018161",
																"M12-Game-Complex/6040544",
																"M13-Library-12/6064863",
																"M14-Old-Farmhouse/6105405"]),
			"near-future-img" : new ImageObject ("near-future-img", "near-future-list", "near-future-img-link",
															   ["eb-NF1Raw-MatrixGrid", 
																"eb-NF2Raw-Stairwell", 
																"eb-NF3Raw-MuseumOfModernArt", 
																"eb-NF4Raw-CorporateOffice", 
																"eb-NF5Raw-MagicShop", 
																"eb-M1Raw-CityStreet", 
																"eb-M2Raw-SafeHouse", 
																"eb-M3Raw-PenthouseApartment", 
																"eb-M4Raw-AlleyWay", 
																"eb-M5Raw-Warehouse", 
																"eb-M6Raw-PoliceStation", 
																"eb-M7Raw-Hospital", 
																"eb-M8Raw-DiveBar", 
																"eb-M9Raw-Diner"], 
															   ["Matrix Grid (NF1)", 
															    "Stairwell (NF2)", 
															    "Museum of Modern Art (NF3)", 
																"Corporate Office (NF4)", 
																"Magic Shop (NF5)", 
																"City Street (M1)", 
																"Safe House (M2)", 
																"Penthouse Apartment (M3)", 
																"Alley Way (M4)", 
																"Warehouse (M5)", 
																"Police Station (M6)", 
																"Hospital (M7)", 
																"Dive Bar (M8)", 
																"Diner (M9)"],
															   ["NF1-Matrix-Grid/5986548",
																"NF2-Stairwell/6018227",
																"NF3-Museum-of-Modern-Art/6040371",
																"NF4-Corporate-Office/6064822",
																"NF5-Magic-Shop/6105396",
																"M1-City-Street/5986415",
																"M2-Safe-House/5986430",
																"M3-Urban-Penthouse/5986467",
																"M4-The-Alley/5986492",
																"M5-Warehouse/5986498",
																"M6-Police-Station/5986504",
																"M7-Hospital/5986514",
																"M8-Dive-Bar/5986527",
																"M9-The-Diner/5986530"]),
			"sci-fi-img" : new ImageObject ("sci-fi-img", "sci-fi-list", "sci-fi-img-link",
															   ["eb-SF1Raw-MedicalBay", 
																"eb-SF2Raw-ShuttleCraft", 
																"eb-SF3Raw-Corridors", 
																"eb-SF4Raw-CommandCenter", 
																"eb-SF5Raw-ShipsBridge", 
																"eb-SF6Raw-CryoChamber", 
																"eb-SF7Raw-SecurityBrig", 
																"eb-SF8Raw-FutureCityStreet", 
																"eb-SF9Raw-Hangar", 
																"eb-SF10Raw-Astrophysics", 
																"eb-SF11Raw-Apartment"],
															   ["Medical Bay (SF1)", 
																"Shuttle Craft (SF2)", 
																"Corridors (SF3)", 
																"Command Center (SF4)", 
																"Ship's Bridge (SF5)", 
																"Cryo Chamber (SF6)", 
																"Security Brig (SF7)", 
																"Future City Street (SF8)", 
																"Hangar (SF9)", 
																"Astrophysics Lab (SF10)", 
																"Apartment (SF11)"],
															   ["SF1-Medical-Bay/5986565",
																"SF2-Shuttle-Craft/5986575",
																"SF3-Corridors/5986585",
																"SF4-Command-Center/5986588",
																"SF5-Ships-Bridge/5986602",
																"SF6-Cryo-Chamber/5986609",
																"SF7-Security-Brig/5986615",
																"SF8-Future-City-Street/6018132",
																"SF9-Hanger/6040526",
																"SF10-Astrophysics/6064881",
																"SF11-Apartment/6105415"]),
			"victorian-img" : new ImageObject ("victorian-img", "victorian-list", "victorian-img-link",
															   ["eb-V1Raw-ExplorersOffice", 
																"eb-V2Raw-VictorianHospital", 
																"eb-V3Raw-VictorianTheater", 
																"eb-V4Raw-VictorianCityStreet", 
																"eb-V5Raw-VictorianHotel", 
																"eb-V6Raw-VictorianSteamFreighter", 
																"eb-V7Raw-AntarcticCamp", 
																"eb-V8Raw-Church", 
																"eb-V9Raw-CargoPlane", 
																"eb-M4Raw-AlleyWay", 
																"eb-M8Raw-DiveBar", 
																"eb-M9Raw-Diner"],
															   ["Explorer Office (V1)", 
																"Hospital (V2)", 
																"Theater (V3)", 
																"City Street (V4)", 
																"Hotel (V5)", 
																"Steam Freighter (V6)", 
																"Antarctic Camp (V7)",  
																"Church (V8)", 
																"Cargo Plane (V9)", 
																"Alley Way (M4)", 
																"Speakeasy (M8)", 
																"Diner (M9)"],
   															   ["V1-Explorers-Office/5986619",
																"V2-Victorian-Hospital/5986625",
																"V3-Victorian-Theater/5986751",
																"V4-Victorian-City-Street/5986757",
																"V5-Victorian-Hotel/5986759",
																"V6-Victorian-Steam-Freighter/6018233",
																"V7-Antarctic-Camp/6040399",
																"V8-Church/6064815",
																"V9-Cargo-Plane/6105369",
																"M4-The-Alley/5986492",
																"M8-Dive-Bar/5986527",
																"M9-The-Diner/5986530"]),
			"western-img" : new ImageObject("western-img", "western-list", "western-img-link",
															   ["eb-W1Raw-WesternTownStreet", 
																"eb-W2aRaw-RailroadTrack", 
																"eb-W2bRaw-DesertStagecoach", 
																"eb-W3Raw-Saloon", 
																"eb-W4Raw-SherrifsOfficeCourthouseJail", 
																"eb-W5Raw-Bank", 
																"eb-W6Raw-DoctorsOffice", 
																"eb-W7Raw-DesertCamp"], 
															   ["Western Town Street (W1)", 
																"Train Track (W2a)", 
																"Stage Coach (W2b)", 
																"Saloon (W3)", 
																"Sheriff's Office / Courthouse / Jail (W4)", 
																"Bank (W5)", 
																"Doctor's Office (W6)", 
																"Desert Camp (W7)"],
															   ["W1-Western-Street/5986766",
																"W2a-Railroad-Track/5986775",
																"W2b-Desert-Trail/5986780",
																"W3-Saloon/5986789",
																"W4-Sherrifs-Office-Court-House-Jail/6018141",
																"W5-Bank/6040482",
																"W6-Doctors-Office/6064844",
																"W7-Desert-Camp/6105382"])
		};
	
		for (var image in imageObjects) {
			setInterval('imageObjects["' + image + '"].fadeOut()', changeInterval());
		}
	}
    
    function pause(element){
        pausedImage = imageObjects[element.id];
        element.style.opacity = 1;
        pausedImage.opacity = 1;
        delete imageObjects[element.id];
    }
    
    function resume(element){
        imageObjects[element.id] = pausedImage;
    }
    
    function resizeElements() {    
        for (i = 0; i < listOfElements.length; i++) {
            listOfElements[i].getElementsByTagName('img')[0].onmouseover  = function() {pause(this)};
            listOfElements[i].getElementsByTagName('img')[0].onmouseout = function() {resume(this)};
            if (listOfElements[i].scrollHeight > greatestHeight) {
                greatestHeight = listOfElements[i].scrollHeight;
            }
			if ( i === 1 || i%2 > 0) {
				listOfElements[i-1].style.height = greatestHeight + 'px';
				listOfElements[i].style.height = greatestHeight + 'px';
				greatestHeight = 0;
			}
        }
    }
	
	function delay(ms) {
		ms += new Date().getTime();
		while (new Date() < ms){}
	}
	
	resizeElements();
	changeImages();
