var DG = function(w,h){
var canvas = document.getElementById("grid");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = w;
ctx.canvas.height = h;

for (x = 0; x <= w; x += 20) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    for (y = 0; y <= h; y += 20) {
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
    }
}
ctx.stroke();
i = 1
while (i!=0){
    i++
}
};
drawGrid(800, 400, "grid");


