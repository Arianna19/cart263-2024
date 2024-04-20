//class for the color and size circle sidebar menu
//the same code is applied for both like the idea of it

class ColorNsize {
    static color = "Black"; //default colour
    constructor(){
        //circles for the color options
        new Color("rgb(183, 58, 149)");
        new Color("rgb(230, 164, 23)");
        new Color("rgb(56, 180, 153)");
        new Color("rgb(255, 255, 255)");
        new Color("rgb(3, 15, 3)");
        new Color("rgb(175, 174, 174)");

        //circles for the size options
        new Size();
        new Size();
        new Size();

    }

    draw(){
        push();
       fill(ColorNsize.color); //changes the colors of Size and Colours text to what the user selected 
        translate(Body.canvasW - 150, 175);
        Color.drawColor();
        Size.drawSize();

        //text settings for the grid
        push()
        textFont('Lucida Handwriting'); 
        textSize(20);
        text("Colors", 5 , -10);
        text("Size", 90 , 260);
        pop();
        
        pop();
    }


}

class Color{
    //color circle settings(size, position, color)
    static allColor = []
    constructor(color){
        this.x = 40;
        this.y = (80 *  Color.allColor.length) + 40;
        this.size = 60;
        this.color = color;
        this.canClick = false;
        Color.allColor.push(this);
    }


    draw(){
        push();
        strokeWeight(1);
        this.mousePressed();
        fill(this.color);
        circle(this.x,this.y,this.size);
        pop();
    }

    //mini highlight circle that pops up when mouse is over the selected circle
    mousePressed() {
        var val1 = createVector(mouseX, mouseY);
        var val2 = createVector(this.x,this.y).add(Body.canvasW - 150,175);

        if (val1.dist(val2) < this.size-20){
            strokeWeight(4);
            this.canClick = true;
        }else{
            this.canClick = false;
        }
    }

    static isClicked(){
        for(var i = 0; i < Color.allColor.length; i++){
            if(Color.allColor[i].canClick){
                ColorNsize.color = Color.allColor[i].color;
            }
        }
    }
    static drawColor(){
        for(var i = 0; i < Color.allColor.length; i++){
            Color.allColor[i].draw();
        }
    }
}

//p5.js on click
function mouseClicked() {
    Color.isClicked();
    Size.isClicked();
}

class Size{
    static allSize = [];
    constructor(){
        this.x = 115;
        this.y = (80 * Size.allSize.length) + 40;
        this.size = 60 - (Size.allSize.length * 18);
        this.pen = 15 - (Size.allSize.length * 6);
        this.canClick = false;
        Size.allSize.push(this);
    }

    draw(){
        push();
        strokeWeight(1);
        fill("grey");
        this.mousePressed();
        circle(this.x,this.y,this.size);
        pop();
    }

    mousePressed() {
        var val1 = createVector(mouseX, mouseY);
        var val2 = createVector(this.x,this.y).add(Body.canvasW - 150,175);

        if (val1.dist(val2) < this.size-20){
            strokeWeight(4);
            this.canClick = true;
        }else{
            this.canClick = false;
        }
    }
    static isClicked(){
        for(var i = 0; i < Size.allSize.length; i++){
            if(Size.allSize[i].canClick){
                sizeStroke = Size.allSize[i].pen;
                
            }
        }
    }

    static drawSize(){
        for(var i = 0; i < Size.allSize.length; i++){
            Size.allSize[i].draw();
        }
    }

}