class Animal {
    static width = Body.canvasW - 150
    static height = 175 
    constructor(){

    }

    draw(){
        push()
        rect(0, 0, Body.canvasW - 150, 175);
        translate(0, 0);
        this.grid()
        pop()
    }

     grid(){
        var i = 0
        for (var x = 0; x < Animal.width; x += Animal.width / 7) {
            for (var y = 0; y < Animal.height; y += Animal.height / 4) {
               
                stroke(0);
                strokeWeight(1);
                line(x, 0, x, Animal.height);
                line(0, y, Animal.width, y);
                textSize(20);
                textAlign(CENTER);
                 
                if(i < animalz.length)
                  text(animalz[i], x + (Animal.width / 7)/2 , (y +  Animal.height / 4)- 15);
                i++
            }
        }
    }

}

