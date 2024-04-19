class ColorNsize {
    static color = "Black";
    static pen = 3
    constructor(){
        new Color("rgb(183, 58, 149)")
        new Color("rgb(230, 164, 23)")
        new Color("rgb(56, 180, 153)")
        new Color("rgb(151, 216, 233)")
        new Color("rgb(3, 15, 3)")
        new Color("rgb(175, 174, 174)")

        new Size()
        new Size()
        new Size()

    }

    draw(){
        push()
        fill(ColorNsize.color)
      //  rect(Body.canvasW - 150, 175, 150 , Body.canvasH - 175);    
        translate(Body.canvasW - 150, 175);
        Color.drawColor()
        Size.drawSize()
        pop()
    }


}

class Color{
    static allColor = []
    constructor(color){
        this.x = 40
        this.y = (80 *  Color.allColor.length) + 40
        this.size = 60 
        this.color = color
        this.canClick = false
        Color.allColor.push(this)
    }

    draw(){
        push()
       // noStroke()
        strokeWeight(1)
        this.mousePressed()
        fill(this.color);
        circle(this.x,this.y,this.size)
        pop()
    }

    mousePressed() {
        var val1 = createVector(mouseX, mouseY)
        var val2 = createVector(this.x,this.y).add(Body.canvasW - 150,175)

        if (val1.dist(val2) < this.size-20){
            strokeWeight(4)
            this.canClick = true
        }else{
            this.canClick = false
        }
    }

    static isClicked(){
        for(var i = 0; i < Color.allColor.length; i++){
            if(Color.allColor[i].canClick){
                ColorNsize.color = Color.allColor[i].color
            }
        }
    }
    static drawColor(){
        for(var i = 0; i < Color.allColor.length; i++){
            Color.allColor[i].draw()
        }
    }
}
function mouseClicked() {
    Color.isClicked()
    Size.isClicked()
}

class Size{
    static allSize = []
    constructor(){
        this.x = 115
        this.y = (80 * Size.allSize.length) + 40
        this.size = 60 - (Size.allSize.length * 18)
        this.pen = 15 - (Size.allSize.length * 6)
        this.canClick = false
        Size.allSize.push(this)
    }

    draw(){
        push()
        strokeWeight(1)
        fill("grey");
        this.mousePressed()
        circle(this.x,this.y,this.size)
        pop()
    }

    mousePressed() {
        var val1 = createVector(mouseX, mouseY)
        var val2 = createVector(this.x,this.y).add(Body.canvasW - 150,175)

        if (val1.dist(val2) < this.size-20){
            strokeWeight(4)
            this.canClick = true
        }else{
            this.canClick = false
        }
    }
    static isClicked(){
        for(var i = 0; i < Size.allSize.length; i++){
            if(Size.allSize[i].canClick){
                sizeStroke = Size.allSize[i].pen 
                
            }
        }
    }

    static drawSize(){
        for(var i = 0; i < Size.allSize.length; i++){
            Size.allSize[i].draw()
        }
    }

}