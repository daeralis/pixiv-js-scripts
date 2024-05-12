/**
* Pixiv bulk private/public follows
* 
* Sets all your follows from public to private or vice-versa based on the type viewed.
* To be used on your "following" page:
* https://www.pixiv.net/en/users/111111/following
*
* Guide:
* 1. Open developer tools (Ctrl+Shift+I)
* 2. Switch to "Console" tab
* 3. Paste in code and hit Enter
*
* Wrapped in an IIFE for browser compatibility.
*
* Last updated 5/12/2024
*/

(async function iife() {

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
var FollowCount = getSafe(() => document.getElementsByClassName('sc-1mr081w-0 kZlOCw')[0].getElementsByTagName('span')[0].textContent,'not-found')

// error checking for follow count
if (FollowCount == 'not-found') {
	console.warn('Could not find follow count.')
} else {
	console.log(`Found ${FollowCount} follows.`)
}

var OldArtistName = ""

while ((FollowsEdited < FollowCount) || (FollowCount == 'not-found')) {
	
	// Wait for follow list to refresh
	var RefreshCounter = 0
	while (true) {
		var ArtistName = getSafe(() => document.getElementsByClassName('sc-d98f2c-0 sc-19z9m4s-2 QHGGh')[0].textContent)

		if ((ArtistName != OldArtistName) && (typeof ArtistName != 'undefined')) {
			break
		}
		
		RefreshCounter++

		// Stop the script after 10 seconds of no progress
		if (RefreshCounter > 100) {
			throw new Error('No new follows found, script stopped.');
		}

		await sleep(100)
	}
	OldArtistName = ArtistName
		
	// Click follow dropdown menu
	while (!document.getElementsByClassName('sc-1ij5ui8-0 QihHO sc-125tkm8-2 gUcOiA')[0]) {
		await sleep(100)
	}
	document.getElementsByClassName('sc-1ij5ui8-0 QihHO sc-125tkm8-2 gUcOiA')[0].click()
		
	// Click private/public button when it exists & isn't disabled
	while (true) {

		var Button = getSafe(() => document.getElementsByClassName('sc-1o6692m-0 hVxezo gtm-profile-user-menu-restrict-changing')[0])
		var ButtonText = getSafe(() => Button.getElementsByClassName('sc-1utla24-0 bTtACY')[0].textContent)
		var ButtonAriaDisabled = getSafe(() => Button.getAttribute('aria-disabled'))
		
		if (ButtonAriaDisabled == 'false')
		{
			if (ButtonText == 'Set as private') {
				break
			}
	
			if (ButtonText == 'Set as public') {
				break
			}
		}

		await sleep(100)
	}
	document.getElementsByClassName('sc-1o6692m-0 hVxezo gtm-profile-user-menu-restrict-changing')[0].click()
	
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
