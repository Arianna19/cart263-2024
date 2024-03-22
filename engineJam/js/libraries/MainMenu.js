/*Title: Kirby Matching gmae
Author: Arianna Narita

Trying my first ever game using Phaser 3 libraries and syntax 

Overall concept: 
1. Use a template from phaser 3 and personalize it 
2. Create a kirby concept to personalize it and learn how phaser 3 workds in the proccess 
3. The user has to find the matching kirbies/images amongst a bunch of other kirby images
4. Have a fun audio aspect elements
5. Final product is just a personalized phaser 3 game with EVERYTHING KIRBY

*/

"use strict";

class MainMenu extends Phaser.Scene
{
    constructor ()
    {
        super('MainMenu');

        this.music;
    }

    create ()
    {
        let background = this.add.image(400, 300, 'background');

        this.tweens.add({
            targets: background,
            alpha: { from: 0, to: 1 },
            duration: 1000
        });

        const fontStyle = {
            fontFamily: 'Arial',
            fontSize: 48,
            color: '#ffffff',
            fontStyle: 'bold',
            padding: 16,
            shadow: {
                color: '#000000',
                fill: true,
                offsetX: 2,
                offsetY: 2,
                blur: 4
            }
        };

        this.add.text(20, 20, 'High Score: ' + this.registry.get('highscore'), fontStyle);

        let logo = this.add.image(500, -500, 'logo');

        logo.setScale(.5)
        if (!this.music)
        {
            this.music = this.sound.play('music', { loop: true });
        }

        this.tweens.add({
            targets: logo,
            y: 300,
            ease: 'bounce.out',
            duration: 1200
        });

        this.input.once('pointerdown', () => {

            this.scene.start('MainGame');

        });
    }
}
