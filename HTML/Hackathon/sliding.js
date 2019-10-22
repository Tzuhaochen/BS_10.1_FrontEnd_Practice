// obtain the rendering context and its drawing functions(MDN)
// var context = document.getElementById('puzzle').getContext('2d');
// console.log(context);

// var img = new Image();
// img.src = 'http://w3.tkgsh.tn.edu.tw/97c111/images/photos/animal/01.jpg';
var boardSize = document.getElementById("puzzle").width;
// 選切幾等分
var difficulty = document.querySelector("option").value;

var clickLocation = new Object;
clickLocation.x = 0;
clickLocation.y = 0;
var emptyLocation = new Object;
emptyLocation.x = 0;
emptyLocation.y = 0;
var solved = false;

var PuzzleSize = boardSize / difficulty;
var Puzzles = new Object;

window.onload = function () {
    init();
};

function init() { // console.log(document.getElementById("input-img"));
    doInput(document.getElementById("input-img"));
    readFile();
}

function doInput(id) {
    var inputObj = document.createElement('input');
    inputObj.addEventListener('change', readFile, false);
    inputObj.type = 'file';
    inputObj.accept = 'image/*';
    inputObj.id = id;
    // console.log(inputObj);
    inputObj.click();
}

function readFile() {
    var file = this.files[0]; // 獲取input輸入的圖片
    if (!/image\/\w /.test(file.type)) {
        alert("請確保檔案為影象型別");
        return false;
    } // 判斷是否圖片，在移動端由於瀏覽器對呼叫file型別處理不同，雖然加了accept = 'image/*'，但是還要再次判斷
    var reader = new FileReader();
    reader.readAsDataURL(file); // 轉化成base64資料型別
    reader.onload = function (e) {
        drawToCanvas(this.result);
    }
}

function drawToCanvas(imgData) {
    var cvs = document.querySelector('#puzzle');
    // console.log(cvs);
    cvs.width = 480;
    cvs.height = 480;
    // var context = document.getElementById('puzzle').getContext('2d');
    // console.log(context);
    // var context = cvs.getContext('2d');
    var img = new Image();
    // console.log(img);
    img.src = imgData;
    // console.log(img.src);
    img.onload = function () {
        // 必須onload之後再畫
        // console.log(img.src);
        img.addEventListener('load', drawTiles, true);
        context.setBoard("initial");
        context.drawTiles();
        strDataURI = cvs.toDataURL(); // 獲取canvas base64資料
    }
}


// img.addEventListener('load', drawTiles, true);
let count = 0;
// setBoard("initial");

// An onchange attribute is an event listener to the object for the Event change.
document.getElementById('difficulty').onchange = function () {
    difficulty = this.value;
    PuzzleSize = boardSize / difficulty; // width per puzzle
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
    if (CalculateDistance(clickLocation.x, clickLocation.y, emptyLocation.x, emptyLocation.y) == 1) {
        SwapLocation(emptyLocation, clickLocation);
        drawTiles(); // 若得結果則匯出圖片
    }
    if (solved) {
        setTimeout(function () {
            alert("You solved it!");
        }, 500);
    }
};
// 選亂數
function RandomNumber() {
    let initialNumber = "";
    let number = [];
    // 產生隨機的列座標
    for (let i = 0; i < difficulty; i++) {
        number[i] = Math.floor(Math.random() * difficulty).toString(); // returns a random integer from 0 to
        if (initialNumber.includes(number[i].toString())) {
            i--;
            continue;
        }
        initialNumber += number[i];
    }
    return initialNumber;
}
// 建立每個東西的座標
function setBoard(initial) { // let number = [];
    initialNumberRow = RandomNumber();
    initialNumberCol = RandomNumber();
    Puzzles = new Array(difficulty);
    for (var i = 0; i < difficulty; i++) {
        Puzzles[i] = new Array(difficulty);
        for (var j = 0; j < difficulty; j++) {
            Puzzles[i][j] = new Object;
            Puzzles[i][j].x = initialNumberRow[i];
            Puzzles[i][j].y = initialNumberCol[j];
            // 如果是剛開始給人看的時候
            if (initial === "initial") {
                Puzzles[i][j].x = i;
                Puzzles[i][j].y = j;
            }
        }
    }
    // 空的位置被擺到隨機的一塊
    emptyLocation.x = Puzzles[difficulty - 1][difficulty - 1].x;
    emptyLocation.y = Puzzles[difficulty - 1][difficulty - 1].y;
    solved = false;
}
// 把畫圖這件事抽象
function drawTiles() { // 清除畫布並重畫
    context.clearRect(0, 0, boardSize, boardSize);
    for (var i = 0; i < difficulty; i++) {
        for (var j = 0; j < difficulty; j++) {
            var x = Puzzles[i][j].x;
            var y = Puzzles[i][j].y;
            // 前兩個敘述是 如果不是空的就畫出來                //但如果已經求解了就全畫出來  //困難度
            if (i != emptyLocation.x || j != emptyLocation.y || solved == true || difficulty == 1) {
                context.drawImage(img, x * PuzzleSize, y * PuzzleSize, PuzzleSize, PuzzleSize, i * PuzzleSize, j * PuzzleSize, PuzzleSize, PuzzleSize);
                count++;
                // 從最左邊(0,0)開始設定  //每次左上角起始設定座標是tileSize(sx,sy)
                // sWidth, sHeight The width of the sub-rectangle of the source image to draw into the destination context
                // 繪製到目標座標的的寬度.高度起始點(dWidth,dHeight))
                // 繪製到目標座標的的寬度.高度
                // void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
            }
        }
    }
}
// 計算可以移動的距離
function CalculateDistance(x1, y1, x2, y2) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}
// 點圖片後交換位置的方式
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

// 求解
function checkSolved() {
    var flag = true;
    for (var i = 0; i < difficulty; i++) {
        for (var j = 0; j < difficulty; j++) {
            // console.log(Puzzles[i][j].x, Puzzles[i][j].y);
            // 如果那片原本的位置是(i,j) 但目前實際上的位置(Puzzles[i][j].x,Puzzles[i][j].y)不在(i,j)時
            if (Puzzles[i][j].x != i || Puzzles[i][j].y != j) {
                // console.log("");
                // console.log(Puzzles[i][j].x, Puzzles[i][j].y);
                flag = false;
            }
        }
    }
    solved = flag;
}
