class Body {
    static canvasH = 800;
    static canvasW = 1000;
    static bgcolor = "red"
    constructor(){
        this.animal = new Animal()
        this.color = new ColorNsize()
    }

    draw(){
        this.animal.draw()
        this.color.draw()
        push()
        fill("#c7b7b7")
        translate(0, 175);
        pop()
    }

}

