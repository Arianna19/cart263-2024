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
        this.loadText = this.add.text(400, 360, 'Loading ...', { fontFamily: 'Arial', fontSize: 64, color: '#e3f2ed' });

        this.loadText.setOrigin(0.5);
        this.loadText.setStroke('#203c5b', 6);
        this.loadText.setShadow(2, 2, '#2d2d2d', 4, true, false);

        this.load.setPath('assets/images');
        this.load.image('background', [  'kirbybg.png' ]);
        this.load.image('logo', [  'titlemain.png' ]);
        this.load.atlas('emojs', 'spritesheet.png', 'sprites.json');

        //  Audio ...
        this.load.setPath('assets/sounds/');

        this.load.audio('music', [  'bark.mp3' ]);
        this.load.audio('countdown', [  'bark.mp3' ]);
        this.load.audio('match', [ 'bark.mp3' ]);
    }

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
