# Visual Magazine
An interactive magazine with articles posts to permit users to read when they want.

## Features
- A card view showing an image and a description which updates it content each time you switch article.
- The description block updates its content when switching article.
- Catalogues view scrolls automatically and stops when hovering to allow you to scroll normally.
- Auto background update on updating card view.

## Process
- I divided the template into layers starting with the main one that shows on page load. I started by making a blured background for glassmorphism effect (like windows does with its task bar) then loaded an image from my PC to see if it worked.
- Then I designed the main layer dividing it into 2: The card view (left) and description block (right) and synchronized them so that when the card view updates, the description block follows smoothly.
- I downloaded images from pinterest that can fit the card view and asked Copilot to generate descriptions for each articles.
- On clicking on the catalogues icon, the second layer opens: that of the catalogues view.
- I asked feedback from ChatGPT on my idea and once verified, I applied it in the catalogues view: A flex-scrollable container containing the catalogues which scrolls automatically and stops when the mouse is in the container, then resumes after 4secs. I got this idea when visiting Microsoft Store.
- On clicking on a catalogue, a third layer opens which shows the opened catalogue and the articles under it.

The template in itself is not finished. Ideas are still to come.

## Running the Template
To run the template:
- Clone the repository (because the template has dependencies in the bin folder)
- Open `@index.html` (of this template) in your browser.

## Preview
I will add a demo video soon.
