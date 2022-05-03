
//Reading in the canvas
const canvas = document.getElementById('grid');
const ctx = canvas.getContext("2d");

//Dimensions of the canvas
canvas.width=800;

canvas.height=800;

const res = 10;
const w = canvas.width /res;
const h = canvas.height/res;


// Drawing a twoD Array of 0s and 1s
function DrawGrid(){
    return new Array(w).fill(null)
        .map(() => new Array(h).fill(null)
            .map(() => Math.floor(Math.random() * 2)));
}
const TheGrid = DrawGrid();
Display(TheGrid);

//NextGrid function draws the next version of the grid

//Some type of function to update the board to next gen

//Drawing the grid on the canvas
function Display(TheGrid){
    for(let column = 0; column < TheGrid.length; column++) {
        for(let row = 0; row < TheGrid[column].length; row++) {
            const GridPiece = TheGrid[column][row];
            
            ctx.beginPath();
            ctx.rect(column * res, row * res, res, res);
            ctx.stroke();
            ctx.fillStyle = GridPiece ? 'yellow' : 'white';
            ctx.fill();
        }
    }
}

//Any cell will 3 live neighbors creates another
//if(GridPiece == 0 && BorderCells == 3)
//elif (GridPiece == 1 && BorderCells < 3)
//elif (GridPiece == 1 && BorderCells > 2)
