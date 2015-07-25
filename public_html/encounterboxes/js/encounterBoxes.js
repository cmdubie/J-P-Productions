(function () {

    var listOfElements = document.getElementsByClassName('genre-section'),
        greatestHeight = listOfElements[0].scrollHeight,
        
        incrementOpacity = (1 / 20),
					
		i,
        
		modernElement,
	    fantasyElement,
		westernElement,
		nearFutureElement;

	function modernObject(modernIdIn, modernCounterIn, modernImageArrayIn, modernTitleArrayIn) {
		var modernID = modernIdIn;
		var modernCounter = modernCounterIn;
		var modernImageArray = modernImageArrayIn;
		var modernTitleArray = modernTitleArrayIn;

		this.changeImage = function () {
			modernElement = document.getElementById(modernID);
			fadeOutModernImage(modernElement, 1);
					
			function fadeOutModernImage(modernImageToFadeOut, opacityToFadeOut) {
				opacityToFadeOut -= incrementOpacity;
				modernImageToFadeOut.style.opacity = opacityToFadeOut;
				if (opacityToFadeOut > 0) {
					window.setTimeout(function () {fadeOutModernImage(modernImageToFadeOut, opacityToFadeOut)} , 50);
				} else {
					modernElement.src = modernImageArray[modernCounter % modernImageArray.length];
					modernElement.title = modernTitleArray[modernCounter % modernTitleArray.length];
					fadeInModernImage(modernImageToFadeOut, opacityToFadeOut);
				}
			};
			
			function fadeInModernImage(modernImageToFadeIn, opacityToFadeIn) {
				opacityToFadeIn += incrementOpacity;
				modernImageToFadeIn.style.opacity = opacityToFadeIn;
				if (opacityToFadeIn < 1) {
					window.setTimeout(function () {fadeInModernImage(modernImageToFadeIn, opacityToFadeIn)} , 50);
				} else {
					modernCounter ++;
					return;
				}
			};
		};
	};
	
	function fantasyObject(fantasyIdIn, fantasyCounterIn, fantasyImageArrayIn, fantasyTitleArrayIn) {
		var fantasyID = fantasyIdIn;
		var fantasyCounter = fantasyCounterIn;
		var fantasyImageArray = fantasyImageArrayIn;
		var fantasyTitleArray = fantasyTitleArrayIn;

		this.changeImage = function () {
			fantasyElement = document.getElementById(fantasyID);
			fadeOutFantasyImage(fantasyElement, 1);
					
			function fadeOutFantasyImage(fantasyImageToFadeOut, opacityToFadeOut) {
				opacityToFadeOut -= incrementOpacity;
				fantasyImageToFadeOut.style.opacity = opacityToFadeOut;
				if (opacityToFadeOut > 0) {
					window.setTimeout(function () {fadeOutFantasyImage(fantasyImageToFadeOut, opacityToFadeOut)} , 50);
				} else {
					fantasyElement.src = fantasyImageArray[fantasyCounter % fantasyImageArray.length];
					fantasyElement.title = fantasyTitleArray[fantasyCounter % fantasyTitleArray.length];
					fadeInFantasyImage(fantasyImageToFadeOut, opacityToFadeOut);
				}
			};
			
			function fadeInFantasyImage(fantasyImageToFadeIn, opacityToFadeIn) {
				opacityToFadeIn += incrementOpacity;
				fantasyImageToFadeIn.style.opacity = opacityToFadeIn;
				if (opacityToFadeIn < 1) {
					window.setTimeout(function () {fadeInFantasyImage(fantasyImageToFadeIn, opacityToFadeIn)} , 50);
				} else {
					fantasyCounter ++;
					return;
				}
			};
		};
	};

	function westernObject(westernIdIn, westernCounterIn, westernImageArrayIn, westernTitleArrayIn) {
		var westernID = westernIdIn;
		var westernCounter = westernCounterIn;
		var westernImageArray = westernImageArrayIn;
		var westernTitleArray = westernTitleArrayIn;

		this.changeImage = function () {
			westernElement = document.getElementById(westernID);
			fadeOutWesternImage(westernElement, 1);
					
			function fadeOutWesternImage(westernImageToFadeOut, opacityToFadeOut) {
				opacityToFadeOut -= incrementOpacity;
				westernImageToFadeOut.style.opacity = opacityToFadeOut;
				if (opacityToFadeOut > 0) {
					window.setTimeout(function () {fadeOutWesternImage(westernImageToFadeOut, opacityToFadeOut)} , 50);
				} else {
					westernElement.src = westernImageArray[westernCounter % westernImageArray.length];
					westernElement.title = westernTitleArray[westernCounter % westernTitleArray.length];
					fadeInWesternImage(westernImageToFadeOut, opacityToFadeOut);
				}
			};
			
			function fadeInWesternImage(westernImageToFadeIn, opacityToFadeIn) {
				opacityToFadeIn += incrementOpacity;
				westernImageToFadeIn.style.opacity = opacityToFadeIn;
				if (opacityToFadeIn < 1) {
					window.setTimeout(function () {fadeInWesternImage(westernImageToFadeIn, opacityToFadeIn)} , 50);
				} else {
					westernCounter ++;
					return;
				}
			};
		};
	};

	function nearFutureObject(nearFutureIdIn, nearFutureCounterIn, nearFutureImageArrayIn, nearFutureTitleArrayIn) {
		var nearFutureID = nearFutureIdIn;
		var nearFutureCounter = nearFutureCounterIn;
		var nearFutureImageArray = nearFutureImageArrayIn;
		var nearFutureTitleArray = nearFutureTitleArrayIn;

		this.changeImage = function () {
			nearFutureElement = document.getElementById(nearFutureID);
			fadeOutNearFutureImage(nearFutureElement, 1);
					
			function fadeOutNearFutureImage(nearFutureImageToFadeOut, opacityToFadeOut) {
				opacityToFadeOut -= incrementOpacity;
				nearFutureImageToFadeOut.style.opacity = opacityToFadeOut;
				if (opacityToFadeOut > 0) {
					window.setTimeout(function () {fadeOutNearFutureImage(nearFutureImageToFadeOut, opacityToFadeOut)} , 50);
				} else {
					nearFutureElement.src = nearFutureImageArray[nearFutureCounter % nearFutureImageArray.length];
					nearFutureElement.title = nearFutureTitleArray[nearFutureCounter % nearFutureTitleArray.length];
					fadeInNearFutureImage(nearFutureImageToFadeOut, opacityToFadeOut);
				}
			};
			
			function fadeInNearFutureImage(nearFutureImageToFadeIn, opacityToFadeIn) {
				opacityToFadeIn += incrementOpacity;
				nearFutureImageToFadeIn.style.opacity = opacityToFadeIn;
				if (opacityToFadeIn < 1) {
					window.setTimeout(function () {fadeInNearFutureImage(nearFutureImageToFadeIn, opacityToFadeIn)} , 50);
				} else {
					nearFutureCounter ++;
					return;
				}
			};
		};
	};
	
	var	modernImage = new modernObject("modern-img", 1, ["images/eb-M1Raw-CityStreet.jpg", "images/eb-M2Raw-SafeHouse.jpg", "images/eb-M4Raw-AlleyWay.jpg", "images/eb-M8Raw-DiveBar.jpg"], ["City Street (M1)", "Safe House (M2)", "Alley Way (M4)", "Dive Bar (M8)"]);

	var	fantasyImage = new fantasyObject("fantasy-img", 1, ["images/eb-F1Raw-DungeonEmptyRoom.jpg", "images/eb-F11Raw-WoodlandTrail.jpg", "images/eb-F13Raw-MountainTrail.jpg"], ["Dungeon - Empty Room (F1)", "Woodland Trail (F11)", "Mountain Trail (F13)"]);

	var	westernImage = new westernObject("western-img", 1, ["images/eb-W1Raw-WesternTownStreet.jpg", "images/eb-W2bRaw-DesertStagecoach.jpg"], ["Western Town Street (W1)", "Desert Stagecoach (W2)"]);

	var	nearFutureImage = new nearFutureObject("near-future-img", 1, ["images/eb-M2Raw-SafeHouse.jpg", "images/eb-NF1Raw-MatrixGrid.jpg"], ["Safe House (M2)", "Matrix Grid (NF1)"]);

    function resizeElements() {

        for (i = 1; i < listOfElements.length; i++) {
            if (listOfElements[i].scrollHeight > greatestHeight) {
                greatestHeight = listOfElements[i].scrollHeight;
            }
        }

        for (i = 0; i < listOfElements.length; i++) {
            listOfElements[i].style.height = greatestHeight + 'px';
        }
    }
	
    resizeElements();
    setInterval(function () {modernImage.changeImage(); }, (Math.floor((Math.random() * (8000 - 4000) + 8000))));
    setInterval(function () {fantasyImage.changeImage(); }, (Math.floor((Math.random() * (8000 - 4000) + 8000))));
    setInterval(function () {westernImage.changeImage(); }, (Math.floor((Math.random() * (8000 - 4000) + 8000))));
    setInterval(function () {nearFutureImage.changeImage(); }, (Math.floor((Math.random() * (8000 - 4000) + 8000))));
})();

