//class that kind of calls all the stuff to the main canvas

class Body {
    //settings of the giant canvas that holds everything
    static canvasH = 800;
    static canvasW = 1000;
    static bgcolor = "red";
    constructor(){
        this.animal = new Animal();
        this.color = new ColorNsize();
    }

    draw(){
        this.animal.draw();
        this.color.draw();
    }

}

