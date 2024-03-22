"use strict";

 class Preloader extends Phaser.Scene
{
    constructor ()
    {
        super('Preloader');

        this.loadText;
    }

    preload ()
    {
        this.loadText = this.add.text(500, 445, 'Loading ...', { fontFamily: 'Arial', fontSize: 90, color: '#d74894' });

        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        this.load.setPath('assets/images');
        this.load.image('background', [  'kirbybg.png' ]); //loading the kirby images from here on 
        this.load.image('logo', [  'titlemain.png' ]);
        this.load.atlas('emojs', 'spritesheet.png', 'sprites.json');

        //  Audio ...
        this.load.setPath('assets/sounds/');

        this.load.audio('music', [  'Song.mp3' ]); //loading/calling the sounds for the program
        this.load.audio('countdown', ['bark.mp3' ]);
        this.load.audio('match', [ 'KirbyHi.mp3' ]); //hi sound that plays when the right images are matched 
    }


    //basically a draw function but in phaser 3 syntax from what I understood
    //it's my state function that swithces between the simulation and start screen
    create ()
    {
        if (this.sound.locked)
        {
            this.loadText.setText('Click to Start');

            this.input.once('pointerdown', () => {

                this.scene.start('MainMenu');

            });
        }
        else
        {
            this.scene.start('MainMenu');
        }
    }
}
