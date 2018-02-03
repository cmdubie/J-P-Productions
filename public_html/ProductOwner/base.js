var randomMessages = ['It is certain.',
									'Nuggets nuggets nuggets. . .', 
									'Reply hazy, try again.',
									'<img src="images/music_note.jpg" class="left" /><img src="images/music_note.jpg" class="left" /><br>775 cans of Diet Coke on the wall<br>775 cans<br>Take one down, pass it around<br>774 cans of Diet Coke on the wall. . . <br><img src="images/music_note.jpg" class="right" /><img src="images/music_note.jpg" class="right" />',
									'Absolutely!',
									'It is decidedly so.',
									'Certainly NOT!',
									'Without a doubt.',
									'Ask again later.',
									'Excellent!',
									'Better not tell you now.',
									/*"<img src='images/music_note.jpg' class='left' /><img src='images/music_note.jpg' class='left' /><br>Dubie's Dubie's Boobies<br><img src='images/music_note.jpg' class='right' /><img src='images/music_note.jpg' class='right' />",*/
									'Yes, definitely.', 
									'<img src="images/music_note.jpg" class="left" /><img src="images/music_note.jpg" class="left" /><br>Deviled eggs<br>You take some mayonnaise<br>You get some paprika. . .<br><img src="images/music_note.jpg" class="right" /><img src="images/music_note.jpg" class="right" />',
									'Cannot predict now.',
									'Knoxes Boxes',
									'My reply is "No."',
									'<img src="images/music_note.jpg" class="left" /><img src="images/music_note.jpg" class="left" /><br>One banana, two banana, three banana, four. . .<br><img src="images/music_note.jpg" class="right" /><img src="images/music_note.jpg" class="right" />',
									'You may rely on it.',
									'Outlook not so good.',
									'As I see it, yes.',
									'Concentrate and ask again.',
									"Don't count on it.",
									'Most likely.',
									'Very doubtful.',
									'Outlook good.',
									'Yes.',
									'Signs point to "Yes."'
									]

function animateHead() {
	var animation = "bounce";
	var message = generateRandomMessage();
	hideMessageElements();
	$("#message").html(message);
	$('#feedback').prop('disabled', true);
	$('.animated').addClass(animation);
	unhideMessageElements();
	setTimeout(enableButtonAndRemoveAnimationClass, 3000, animation);
}

function enableButtonAndRemoveAnimationClass(className) {
	$('.animated').removeClass(className);
	$('#feedback').prop('disabled', false);	
}

function hideMessageElements() {
	$('#dot1').addClass("hidden");
	$('#dot2').addClass("hidden");
	$('#messageDiv').addClass("hidden");
}

function unhideMessageElements() {
	$('#dot1').removeClass("hidden");
	setTimeout(function(){$('#dot2').removeClass("hidden")}, 1000);
	setTimeout(function(){$('#messageDiv').removeClass("hidden")}, 2000);
}

function generateRandomMessage() {
	var index = Math.floor(Math.random() * randomMessages.length);
	return randomMessages[index];
}