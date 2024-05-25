# pixiv-js-scripts
Collection of scripts to automate demanding Pixiv tasks.

# Pixiv bulk private/public follows
Sets all your follows from public to private or vice-versa based on the type viewed.
One follow is updated every ~1 second based on site refresh speed.

## Guide:
1. Visit the "Following" page from your Pixiv profile.
	- Example URL: https://www.pixiv.net/en/users/66523866/following
3. Open developer tools (`Ctrl+Shift+I`).
4. Switch to "Console" tab.
5. Paste in script and hit Enter.

If the script doesn't work, double check that it is searching for the correct buttons:
1. Find the button's class name: https://imgur.com/a/x3elGIw
2. Place the found name into the code: https://imgur.com/a/xRzoGsA
