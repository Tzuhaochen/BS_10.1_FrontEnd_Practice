var context = document.getElementById('puzzle').getContext('2d');
var img = new Image();
img.src = 'http://www.brucealderman.info/Images/dimetrodon.jpg';
img.addEventListener('load', drawTiles, false);
var boardSize = document.getElementById("puzzle").width;
var difficulty = document.getElementById("difficulty").value;
var PuzzleSize = boardSize / difficulty;
var clickLocation = new Object;
clickLocation.x = 0;
clickLocation.y = 0;
var originLocation = new Object;
originLocation.x = 0;
originLocation.y = 0;
var solved = false;
var Puzzles = new Object;
setBoard();
document.getElementById('difficulty').onchange = function () {
    difficulty = this.value;
    PuzzleSize = boardSize / difficulty;
    setBoard();
    drawTiles();
};
// 檢測滑鼠放的位置
document.getElementById('puzzle').onmousemove = function (e) {
    clickLocation.x = Math.floor((e.pageX - this.offsetLeft) / PuzzleSize);
    clickLocation.y = Math.floor((e.pageY - this.offsetTop) / PuzzleSize);
};
// 拼圖被點擊時，抓點到的座標
document.getElementById('puzzle').onclick = function () { // 若為上下左右相連則交換
    if (CalculateDistance(clickLocation.x, clickLocation.y, originLocation.x, originLocation.y) == 1) {
        SwapLocation(originLocation, clickLocation);
        drawTiles(); // 若得結果則匯出圖片
    }
    if (solved) {
        setTimeout(function () {
            alert("You solved it!");
        }, 500);
    }
};
function setBoard() { // let number = [];
    let initialNumberRow = "";
    let initialNumberCol = "";
    let numberRow = [];
    let numberCol = [];
    // 產生隨機的行列座標
    for (let i = 0; i < difficulty; i++) {
        numberRow[i] = Math.floor(Math.random() * difficulty).toString(); // returns a random integer from 0 to 9
        if (initialNumberRow.includes(numberRow[i].toString())) {
            i--;
            continue;
        }
        initialNumberRow += numberRow[i];
    }
    for (let i = 0; i < difficulty; i++) {
        numberCol[i] = Math.floor(Math.random() * difficulty).toString(); // returns a random integer from 0 to 9
        if (initialNumberCol.includes(numberCol[i].toString())) {
            i--;
            continue;
        }
        initialNumberCol += numberCol[i];
    }
    Puzzles = new Array(difficulty);
    for (var i = 0; i < difficulty; i++) {
        Puzzles[i] = new Array(difficulty);
        for (var j = 0; j < difficulty; j++) {
            Puzzles[i][j] = new Object;
            Puzzles[i][j].x = initialNumberRow[i];
            // console.log((difficulty - 1) - i);
            Puzzles[i][j].y = initialNumberCol[j];
        }
    }
    originLocation.x = Puzzles[difficulty - 1][difficulty - 1].x;
    originLocation.y = Puzzles[difficulty - 1][difficulty - 1].y;
    solved = false;
}
function drawTiles() {
    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < difficulty; i++) {
        for (var j = 0; j < difficulty; j++) {
            var x = Puzzles[i][j].x;
            var y = Puzzles[i][j].y;
            if (i != originLocation.x || j != originLocation.y || solved == true) {
                context.drawImage(img, x * PuzzleSize, y * PuzzleSize, PuzzleSize, PuzzleSize, i * PuzzleSize, j * PuzzleSize, PuzzleSize, PuzzleSize);
                // 從最左邊(0,0)開始設定  //每次左上角起始設定座標是tileSize(sx,sy)
                // sWidth, sHeight The width of the sub-rectangle of the source image to draw into the destination context
                // 繪製到目標的寬度.高度(dWidth,dHeight))
                // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
    }
}
function CalculateDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
function SwapLocation(toLoc, fromLoc) {
    if (! solved) {
        Puzzles[toLoc.x][toLoc.y].x = Puzzles[fromLoc.x][fromLoc.y].x;
        Puzzles[toLoc.x][toLoc.y].y = Puzzles[fromLoc.x][fromLoc.y].y;
        Puzzles[fromLoc.x][fromLoc.y].x = difficulty - 1;
        Puzzles[fromLoc.x][fromLoc.y].y = difficulty - 1;
        toLoc.x = fromLoc.x;
        toLoc.y = fromLoc.y;
        checkSolved();
    }
}
function checkSolved() {
    var flag = true;
    for (var i = 0; i < difficulty; i++) {
        for (var j = 0; j < difficulty; j++) {
            if (Puzzles[i][j].x != i || Puzzles[i][j].y != j) {
                flag = false;
            }
        }
    }
    solved = flag;
}
