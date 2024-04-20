//class for the grid that holds all the available animals

class Animal {

    static width = Body.canvasW - 150;
    static height = 175;
    constructor(){

    }

    draw(){
        push();
        rect(0, 0, Body.canvasW - 150, 175);
        translate(0, 0);
        this.grid();
        pop();
    }

     grid(){
        let i = 0
        for (let x = 0; x < Animal.width; x += Animal.width / 7) {
            for (let y = 0; y < Animal.height; y += Animal.height / 4) {
               
                stroke(0);
                strokeWeight(1);
                textFont('Lucida Handwriting');
                line(x, 0, x, Animal.height);
                line(0, y, Animal.width, y);
                textSize(18);
                textAlign(CENTER);
                 
                if(i < animalz.length)
                  text(animalz[i], x + (Animal.width / 7)/2 , (y +  Animal.height / 4)- 15);
                i++;
            }
        }
    }

}

