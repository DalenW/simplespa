# SimpleSPA
A simple single page application via JS.

You can use this file as is, or you can copy it and edit it as needed. This will turn your website into a single page application where everything in main is loaded and replaced dynamically. This will work fine as long as you follow the standard HTML layout where you have a body, with header, main, and footer beneath it. 

# How to Use

Take a look at the example.html, your page layout will need to look something like that. Remember only content under main will be replaced, nothing else will. So if you need to refresh content outside of main, you can add the "data-internal" attribute to your <a> tag. 

document.ready only triggers when the page is refreshed, so I have a pageReady() function that is called when the page finishes loading. I replace my document.readys with that. 

CSS styles should be in the head, so if you have a <style id="page-styles"> in your head, all custom CSS for that page under custom-styles under the page append will be put into the head. 

Along with CSS, the page append section includes an append-to-bottom. All HTML here gets appended to the bottom of body. I mostly use this for JS, but I needed to write this for bootsrap models. They don't work when they're in main, or anywhere else but the bottom of the body. Not sure why. But this fixes it. 
