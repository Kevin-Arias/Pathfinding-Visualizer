var cols = 28;
var rows = 28;
var grid;
var openSet = [];
var closedSet = [];
var q;
var start;
var end;
var w, h;
var path = [];
let pressed = false;
let a_starPressed = false;
let dfsPressed = false;
let bfsPressed = false;
let greedyPressed = false;
let locked = false;
let locked_end = false;
let a_starButton;
let dfsButton;
let bfsButton;
let greedyButton;
let restartButton;
var reachedEnd;
var mazeButton;
let buttonCounter = 0;


function removeFromArray(arr, element) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i]==element) {
      arr.splice(i,1);
    }
  }
}

function heuristic(a,b) {
  //var d = Math.max(Math.abs(a.i-b.i), Math.abs(a.j-b.j));
  var d = dist(a.i, a.j, b.i, b.j);
  return d;
}

function setup() {
  // put setup code here
  createCanvas(700, 700);



  grid = new Array(cols);

  w = width/cols;
  h = height/rows;

  reachedEnd = [undefined, false];

  //Create 2D Array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i,j);
    }
  }

  //Add all of the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  //Start and ending cells
  start = grid[4][9];
  end = grid[cols-5][rows-10];
  start.wall = false;

  end.wall = false;


  openSet.push(start);
  console.log(grid);


  a_starButton = createButton('A* Search');
  dfsButton = createButton('Depth First Search');
  bfsButton = createButton('Breadth First Search');
  greedyButton = createButton('Greedy Best First Search');
  mazeButton = createButton('Generate Maze');
  restartButton = createButton('Clear Path');

  a_starButton.style('font-size', '25px');
  a_starButton.style('background-color', color(235,235,235));

  dfsButton.style('font-size', '25px');
  dfsButton.style('background-color', color(235,235,235));

  bfsButton.style('font-size', '25px');
  bfsButton.style('background-color', color(235,235,235));

  greedyButton.style('font-size', '25px');
  greedyButton.style('background-color', color(235,235,235));

  mazeButton.style('font-size', '25px');
  mazeButton.style('background-color', color(235,235,235));

  restartButton.style('font-size', '25px');
  restartButton.style('background-color', color(235,235,235));

  a_starButton.mousePressed(a_star_is_pressed);
  dfsButton.mousePressed(dfs_is_pressed);
  bfsButton.mousePressed(bfs_is_pressed);
  greedyButton.mousePressed(greedy_is_pressed);
  mazeButton.mousePressed(makeMaze);
  restartButton.mousePressed(restart);
  a_starButton.position(730, 50);
  dfsButton.position(730, 120);
  bfsButton.position(730, 190);
  greedyButton.position(730, 260);
  mazeButton.position(730, 450);
  restartButton.position(730, 520);





}

function a_star_is_pressed() {
  pressed = true;
  a_starPressed = true;
}
function dfs_is_pressed() {
  pressed = true;
  dfsPressed = true;
}
function bfs_is_pressed() {
  pressed = true;
  bfsPressed = true;
}
function greedy_is_pressed() {
  pressed = true;
  greedyPressed = true;
}
function makeMaze() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if(random(1) < 0.2) {
        grid[i][j].wall = true;
      }
    }
  }
  start.wall = false;
  end.wall = false;
}

function restart() {
  pressed = false;
  a_starPressed = false;
  dfsPressed = false;
  bfsPressed = false;
  greedyPressed = false;
  openSet = [];
  closedSet = [];
  var tempStarti = start.i;
  var tempStartj = start.j;
  var tempEndi = end.i;
  var tempEndj = end.j;
  // put setup code here
  createCanvas(700, 700);
  console.log('A*');


  grid = new Array(cols);

  w = width/cols;
  h = height/rows;

  reachedEnd = [undefined, false];

  //Create 2D Array
  for (var i = 0; i < cols; i++) {
    grid[i] = new Array(rows);
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i,j);
    }
  }

  //Add all of the neighbors
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].addNeighbors(grid);
    }
  }

  //Start and ending cells
  start = grid[tempStarti][tempStartj];
  end = grid[tempEndi][tempEndj];
  start.wall = false;
  end.wall = false;


  openSet.push(start);
  console.log(grid);

}






function draw() {
  // draw continuosly loops so we can check for openSet emptiness here

  if (reachedEnd[1]) {
    setColors(reachedEnd[0]);
    setPath(reachedEnd[0]);
  }
  else {
    // Draw out grid
    if (!pressed) {
      background(0);
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          if(mouseX > (i*w) && mouseX < ((i+1)*w) && mouseY > (j*h) && mouseY < ((j+1)*h)) {
            if (mouseIsPressed == true) {
              if(grid[i][j] == start || grid[i][j] == end) {
                if(grid[i][j] == start) {
                  locked = true;
                  grid[i][j].show(color(0));
                } else {
                  locked_end = true;
                  grid[i][j].show(color(0));
                }

              }
              else {
                grid[i][j].show(color(0));
                grid[i][j].wall = true;
              }

            } else {
              locked = false;
              locked_end = false;
              grid[i][j].show(color(154,154,154));
            }


          } else {
            grid[i][j].show(color(255));
          }

        }
      }
    }

    //Button is pressed, lets execute A*
    if (pressed) {
      for (var i = 0; i < cols; i++) {
        for (var j = 0; j < rows; j++) {
          grid[i][j].checkNeighbors(grid);
        }
      }
      if(a_starPressed) {
        a_star();
      }
      else if(dfsPressed) {
        dfs();
      }
      else if(bfsPressed) {
        bfs();
      }
      else if(greedyPressed) {
        greedy();
      }
    }
  }

}

function mouseDragged() {
  if (locked) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if(mouseX > (i*w) && mouseX < ((i+1)*w) && mouseY > (j*h) && mouseY < ((j+1)*h)) {
          openSet = [];
          start = grid[i][j];
          openSet.push(start);
        }
      }
    }

  }
  if (locked_end) {
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        if(mouseX > (i*w) && mouseX < ((i+1)*w) && mouseY > (j*h) && mouseY < ((j+1)*h)) {
          end = grid[i][j];
        }
      }
    }

  }
}

function mouseReleased() {
  locked = false;
  locked_end = false;
}




//--*----*----*----*--GREEDY BEST FIRST SEARCH*----*----*----*----*----*----*--


function greedy() {
  if (openSet.length > 0) {

    //lowestH is index of cell in openSet having the lowest h value
    var lowestH = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].h < openSet[lowestH].h) {
        lowestH = i;
      }
    }

    var current = openSet[lowestH];
    //If current is end, then we have reached our goal and can finish
    if (current == end) {
      console.log('DONE!');
      reachedEnd = [current, true];
      return;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    var neighbors = current.neighbors;
    for(var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        neighbor.previous = current;
        neighbor.h = heuristic(neighbor, end);
        openSet.push(neighbor);
        closedSet.push(neighbor);
      }
    }


  } else {
    //No solution was found
    //console.log('No Solution Found');
    return;
  }
  setColors(current);

}

//--*----*----*----*--DEPTH FIRST SEARCH*----*----*----*----*----*----*----*

function dfs() {
  if (openSet.length > 0) {
    var current = openSet.pop();
    if (current == end) {
      console.log('DONE!');
      reachedEnd = [current, true];
      return;
    }

    if(!closedSet.includes(current)) {
      closedSet.push(current);
      var neighbors = current.neighbors;
      for(var i = 0; i < neighbors.length; i++) {
        var neighbor = neighbors[i];
        if (!closedSet.includes(neighbor) && !neighbor.wall) {
          neighbor.previous = current;
          openSet.push(neighbor);
        }
      }
    }

  } else {
    //No solution was found
    //console.log('No Solution Found');

    return;
  }

  setColors(current);
}


//--*----*----*----*--BREADTH FIRST SEARCH*----*----*----*----*----*----*----*--

function bfs() {
  if (openSet.length > 0) {
    var current = openSet.shift();
    if (current == end) {
      console.log('DONE!');
      reachedEnd = [current, true];
      return;
    }
    if (current == start) {
      closedSet.push(current);
    }

    var neighbors = current.neighbors;
    for(var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        neighbor.previous = current;
        openSet.push(neighbor);
        closedSet.push(neighbor);
      }
    }
  } else {
    //No solution was found
    //console.log('No Solution Found');

    return;
  }

  setColors(current);

}


//--*----*----*----*-- A* SEARCH *----*----*----*----*----*----*----*----*----*


function a_star() {
  //Search is still continuing

  if (openSet.length > 0) {

    //lowestF is index of cell in openSet having the lowest f value
    var lowestF = 0;
    for (var i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestF].f) {
        lowestF = i;
      }
    }

    var current = openSet[lowestF];
    //If current is end, then we have reached our goal and can finish
    if (current == end) {
      console.log('DONE!');
      reachedEnd = [current, true];
      return;
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    //Check all of the neighbors
    var neighbors = current.neighbors;
    for(var i = 0; i < neighbors.length; i++) {
      var neighbor = neighbors[i];

      //Check if neighbor is valid next option
      if (!closedSet.includes(neighbor) && !neighbor.wall) {
        //tempGval is the distance from start to the neighbor through current
        var tempGval = current.g + heuristic(neighbor, current);

        //Check if this is better path
        var newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempGval < neighbor.g) {
            neighbor.g = tempGval;
            newPath = true;
          }
        } else {
            neighbor.g = tempGval;
            newPath = true;
            openSet.push(neighbor);
          }


        //We have found a better path
        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }

  } else {
    //No solution was found
    //console.log('No Solution Found');

    return;
  }

  setColors(current);

}

function setColors(current) {
  background(0);

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if(mouseX > (i*w) && mouseX < ((i+1)*w) && mouseY > (j*h) && mouseY < ((j+1)*h)) {
        if (mouseIsPressed == true) {
          if(grid[i][j] == start || grid[i][j] == end) {
            grid[i][j].show(color(0));
          }
          else {
            grid[i][j].show(color(0));
            grid[i][j].wall = true;
          }
        } else {
          grid[i][j].show(color(154,154,154));
        }


      } else {
        grid[i][j].show(color(255));
      }

    }
  }

  //Already searched cells are red
  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].show(color(166,229,255));
  }
  //Cells that are yet to be checked are green
  for (var i = 0; i < openSet.length; i++) {
    openSet[i].show(color(53,134,255));
  }

}

function setPath(current) {
  //Displaying the path
  path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  }
  noFill();
  stroke(color(255,255,0));
  strokeWeight(w/4);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w/2, path[i].j * h + h/2);
    //path[i].show(color(255,255,0));
  }
  endShape();
}

function touchStarted() {
  getAudioContext().resume()
}
