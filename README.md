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

If the script doesn't work, double check that it is searching for the correct element classes:
1. Visit this guide for a quick overview: https://imgur.com/a/DVwubBZ
2. Inspect the 4 elements show above.
3. Check that each class is correct.
4. Longer video showing how to find all 4 classes: https://imgur.com/a/HCjU1e7
