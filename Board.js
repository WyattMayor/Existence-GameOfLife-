
//Reading in the canvas
const canvas = document.getElementById('grid');
const ctx = canvas.getContext("2d");
let canvaselem = document.querySelector("#grid");

//Dimensions of the canvas
canvas.width=600;

canvas.height=600;

const res = 10;
const w = canvas.width /res;
const h = canvas.height/res;
var evolution = 0
var StartClicked = false
var Shape1Clicked = false
var Shape2Clicked = false
var RandomClicked = false
var PauseClicked = false
var co = 0
var ro = 0
var PauseClick = 2

function EvoCounter(){
    document.getElementById("TurnCounter").innerHTML = evolution;
    evolution++;
}

// Drawing a twoD Array of 0s and 1s
function DrawGrid(){
    return new Array(w).fill(null)
        .map(() => new Array(h).fill(null)
          .map(() => Math.floor(Math.random() * 2)));
}

var TheGrid = DrawGridEmpty();
var ClickedGrid = TheGrid
Display(TheGrid);

requestAnimationFrame(update);

function update(){
    if(StartClicked == false){
        TheGrid = ClickedGrid
        ClickedGrid = TheGrid
        Display(TheGrid)
        setTimeout(function(){ //throttle requestAnimationFrame to 20fps
            requestAnimationFrame(update)
        }, 1000/60)
    }
    else if(PauseClick % 2 != 0){
        Display(TheGrid)
        setTimeout(function(){ //throttle requestAnimationFrame to 20fps
            requestAnimationFrame(update)
        }, 1000/1)
    }
    else{
    EvoCounter();
    TheGrid = NextVersion(TheGrid);
    if(Shape1Clicked == true){
        evolution = 0
        TheGrid = DrawGridEmpty()
        TheGrid [30][30] = 1;
        TheGrid [31][30] = 1;
        TheGrid [32][30] = 1;
        console.log(TheGrid)
        Shape1Clicked = false
    }
    else if(Shape2Clicked == true){
        evolution = 0
        TheGrid = DrawGridEmpty()
        TheGrid [30][30] = 1;
        TheGrid [31][30] = 1;
        TheGrid [32][30] = 1;        
        TheGrid [33][29] = 1;
        TheGrid [33][28] = 1;
        TheGrid [33][27] = 1;
        TheGrid [29][29] = 1;
        TheGrid [29][28] = 1;
        TheGrid [29][27] = 1;
        TheGrid [33][27] = 1;
        TheGrid [33][27] = 1;
        TheGrid [33][27] = 1;
        console.log(TheGrid)
        Shape2Clicked = false
    }
    else if(RandomClicked == true){
        evolution = 0
        TheGrid = DrawGrid()
        RandomClicked = false   
    }

    Display(TheGrid);
    setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(update)
    }, 1000/3)
}
}

//NextGrid function draws the next version of the grid
function bordercells(cell, x, y){
    var counter = 0
    // normal case
    if (x-1 >= 0 && y-1 >= 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y-1] == 1){counter = counter + 1}
        if (cell[x-1][y] == 1){counter = counter + 1}
        if (cell[x-1][y-1] == 1){counter = counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        return counter;}
    // bottom
    else if (x-1 >= 0 && y-1 >= 0 && x+1 <= 59 && y+1 > 59){
        if (cell[x+1][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x+1][y] == 1){counter =counter + 1}
        return counter;}
    // right side
    else if (x-1 >= 0 && y-1 >= 0 && x+1 > 59 && y+1 <= 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        return counter;}
    //left
    else if (x-1 < 0 && y-1 >= 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        return counter;}
    //top
    else if (x-1 >= 0 && y-1 < 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x-1][y] == 1){counter =counter + 1}
        return counter;}
    //top left
    else if (x-1 < 0 && y-1 < 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        return counter;}
    //bottom right
    else if (x-1 >= 0 && y-1 >= 0 && x+1 > 59 && y+1 > 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        return counter;}

    //top right
    else if (x-1 >= 0 && y-1 < 0 && x+1 > 59 && y+1 <= 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        return counter;}
    //top left
    else if (x-1 < 0 && y-1 >= 0 && x+1 <= 59 && y+1 > 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x+1][y-1] == 1){counter =counter + 1}
        return counter;}
    else{console.log("frick")}
    }

function NextVersion(TheGrid){
    var NewGrid = [ ];
    for(let column = 0; column < TheGrid.length; column++){
        NewGrid[column] = [ ];
        for (let row = 0; row < TheGrid[column].length; row++){
            if((TheGrid[column][row] == 0 && bordercells(TheGrid, column, row) == 3)){
            
                NewGrid[column][row] = 1
            }
            else if ((TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) > 3)){
                NewGrid[column][row] = 0
            }
            else if (TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) < 2){
                NewGrid[column][row] = 0
            }
            else if ((TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) == 2)){
                NewGrid[column][row] = 1
            }
            else if ((TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) == 3)){
                NewGrid[column][row] = 1
            }
            else{NewGrid[column][row] = 0}
        }
    }
    return NewGrid
}


//Some type of function to update the board to next gen

//Drawing the grid on the canvas
function Display(TheGrid){
    for(let column = 0; column < TheGrid.length; column++) {
        for(let row = 0; row < TheGrid.length; row++) {
            const GridPiece = TheGrid[column][row];
            
            ctx.beginPath();
            ctx.rect(column * res, row * res, res, res);
            ctx.stroke();
            ctx.fillStyle = GridPiece ? 'blue' : 'white';
            ctx.fill();
        }
    }
}
    document.getElementById('startButton').addEventListener("click", function() {
    StartClicked = true
    });
    
    document.getElementById('Random').addEventListener("click", function() {
    RandomClicked = true});
    
    document.getElementById('Shape1').addEventListener("click", function() {
    Shape1Clicked = true});

    document.getElementById('Shape2').addEventListener("click", function() {
    Shape2Clicked = true});
    
    document.getElementById('Pause').addEventListener("click", function() {
    PauseClicked = true
    PauseClick++
    });
    
    function getMousePosition(canvas, event) {
       let rect = canvas.getBoundingClientRect()
       let x = event.clientX - rect.left
       let y = event.clientY - rect.top
       DrawFunction(x,y)
    }
    canvaselem.addEventListener("mousedown", function(e) {
        console.log("register")
        getMousePosition(canvaselem,e)
    }); 
    

    function DrawGridEmpty(){
        return new Array(w).fill(0)
            .map(() => new Array(h).fill(0))
    }

    function DrawFunction(co, ro){
    ClickedGrid[Math.floor(co/10)][Math.floor(ro/10)] = 1
    }
    
//Any cell will 3 live neighbors creates another
//if(GridPiece == 0 && BorderCells == 3)
//elif (GridPiece == 1 && BorderCells < 3)
//elif (GridPiece == 1 && BorderCells > 2)
