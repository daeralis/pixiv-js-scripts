/**
* Pixiv bulk private/public follows
* 
* Sets all your follows from public to private or vice-versa based on the type viewed.
* To be used from your "Following" page.
*
* Wrapped in an IIFE for browser compatibility.
*/

(async function iife() {

// --------------------- If you have errors, please check that these classes are correct ---------------------
const FollowCount_Class = 'sc-1mr081w-0 kZlOCw' // Number next to "Users"
const ArtistName_Class = 'sc-d98f2c-0 sc-19z9m4s-2 QHGGh' // Artist's name
const DropdownMenuButton_Class = 'sc-1ij5ui8-0 QihHO sc-125tkm8-2 gUcOiA' // Dropdown menu button
const PrivatePublicButton_Class =  'sc-1o6692m-0 hVxezo gtm-profile-user-menu-restrict-changing' // Private/public button


function getSafe(fn, defaultVal) {
	try {
	  return fn();
	} catch (e) {
	  return defaultVal;
	}
}

const sleep = ms => new Promise(res => setTimeout(res, ms));

var FollowCount = 0
var FollowsEdited = 0

// Get the follow count
var FollowCount = getSafe(() => document.getElementsByClassName(FollowCount_Class)[0].getElementsByTagName('span')[0].textContent,'not-found').replace(/\D/g, "")

// error checking for follow count
if (FollowCount == 'not-found') {
	console.warn('Could not find follow count.')
} else {
	console.log(`Found ${FollowCount} follows.`)
}

var OldArtistName = ""

while ((FollowsEdited < FollowCount) || (FollowCount == 'not-found')) {
	
	// --------------------- Wait for follow list to refresh ---------------------
	var DurationCounter = 0
	while (true) {

		// Get the first name in the list
		var ArtistName = getSafe(() => document.getElementsByClassName(ArtistName_Class)[0].textContent)

		// Check if the name is new
		if ((ArtistName != OldArtistName) && (typeof ArtistName != 'undefined')) {
			break
		}
		
		DurationCounter++

		// Stop the script after 10 seconds of no progress
		if (DurationCounter > 100) {
			if (FollowsEdited >= 1) {
				throw new Error('No new follows found, script stopped.');
			}else {
				throw new Error('Could not find the artist name, check the guide for help with updating the class name.');
			}	
		}

		await sleep(100)
	}
	OldArtistName = ArtistName

	
	// --------------------- Click the buttons ---------------------
	var DurationCounter = 0
	while (true) {

		var Button = document.getElementsByClassName(PrivatePublicButton_Class)[0]
		var ButtonAriaDisabled = getSafe(() => Button.getAttribute('aria-disabled'))
		
		// Click private/public button when it exists & isn't disabled
		if (ButtonAriaDisabled == 'false')
		{
			Button.click()
			break
		}

		// Click the follow dropdown menu button if the private/public button is not visible
		if (ButtonAriaDisabled != 'true') {
			getSafe(() => document.getElementsByClassName(DropdownMenuButton_Class)[0].click())
		}

		DurationCounter++

		// Stop the script after 10 seconds of no progress
		if (DurationCounter > 100) {
			if (!document.getElementsByClassName(DropdownMenuButton_Class)[0])
			{
				throw new Error('Could not find the dropdown menu button, check the guide for help with updating the class name.');
			} else {
				throw new Error('Could not find the "Set as private/public" button, check the guide for help with updating the class name.');
			}
		}

		await sleep(100)
	}
	
	FollowsEdited++
	// error checking for follow count
	if (FollowCount != 'not-found') {
		console.log(`Changed ${FollowsEdited}/${FollowCount} follows, ${FollowCount - FollowsEdited} remaining.`)
	} else {
		console.log(`Changed ${FollowsEdited} follows.`)
	}
	
}

console.log('Script finished.')

})()
