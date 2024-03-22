//  Based on the Emoji Match game by Tom Miller (https://codepen.io/creativeocean/full/OeKjmp)
"use strict";


const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 1000,
    backgroundColor: '#008eb0',
    parent: 'phaser-example',
    scene: [ Boot, Preloader, MainMenu, MainGame ]
};

let game = new Phaser.Game(config);
