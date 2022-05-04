
//Reading in the canvas
const canvas = document.getElementById('grid');
const ctx = canvas.getContext("2d");

//Dimensions of the canvas
canvas.width=600;

canvas.height=600;

const res = 10;
const w = canvas.width /res;
const h = canvas.height/res;


// Drawing a twoD Array of 0s and 1s
function DrawGrid(){
    return new Array(w).fill(null)
        .map(() => new Array(h).fill(null)
          .map(() => Math.floor(Math.random() * 2)));
}

var TheGrid = DrawGrid();
Display(TheGrid);

console.log(TheGrid);

requestAnimationFrame(update);

function update(){
    TheGrid = NextVersion(TheGrid)
    Display(TheGrid);
    setTimeout(function(){ //throttle requestAnimationFrame to 20fps
        requestAnimationFrame(update)
    }, 1000/1)
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
        console.log("w")
        return counter;}
    // bottom
    else if (x-1 >= 0 && y-1 >= 0 && x+1 <= 59 && y+1 > 59){
        if (cell[x+1][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x+1][y] == 1){counter =counter + 1}
        console.log("h")
        return counter;}
    // right side
    else if (x-1 >= 0 && y-1 >= 0 && x+1 > 59 && y+1 <= 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        console.log("q")
        return counter;}
    //left
    else if (x-1 < 0 && y-1 >= 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y-1] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        console.log("g")
        return counter;}
    //top
    else if (x-1 >= 0 && y-1 < 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x-1][y] == 1){counter =counter + 1}
        console.log("v")
        return counter;}
    //top left
    else if (x-1 < 0 && y-1 < 0 && x+1 <= 59 && y+1 <= 59){
        if (cell[x+1][y] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x+1][y+1] == 1){counter =counter + 1}
        console.log("b")
        return counter;}
    //bottom right
    else if (x-1 >= 0 && y-1 >= 0 && x+1 > 59 && y+1 > 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x][y-1] == 1){counter =counter + 1}
        if (cell[x-1][y-1] == 1){counter =counter + 1}
        console.log("m")
        return counter;}

    //top right
    else if (x-1 >= 0 && y-1 < 0 && x+1 > 59 && y+1 <= 59){
        if (cell[x-1][y] == 1){counter =counter + 1}
        if (cell[x][y+1] == 1){counter =counter + 1}
        if (cell[x-1][y+1] == 1){counter =counter + 1}
        console.log("n")
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
                console.log("1")
            }
            else if (TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) < 2){
                NewGrid[column][row] = 0
                console.log("2")
            }
            else if ((TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) == 2)){
                NewGrid[column][row] = 1
                console.log("3")
            }
            else if ((TheGrid[column][row] == 1 && bordercells(TheGrid, column, row) == 3)){
                NewGrid[column][row] = 1
                console.log("4")
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
            
            console.log("yeah")
            ctx.beginPath();
            ctx.rect(column * res, row * res, res, res);
            ctx.stroke();
            ctx.fillStyle = GridPiece ? 'blue' : 'white';
            ctx.fill();
        }
    }
}


//Any cell will 3 live neighbors creates another
//if(GridPiece == 0 && BorderCells == 3)
//elif (GridPiece == 1 && BorderCells < 3)
//elif (GridPiece == 1 && BorderCells > 2)
