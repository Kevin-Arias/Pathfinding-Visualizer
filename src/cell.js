
//Cell object represents each cell in the grid
function Cell(i,j) {

  // Location of cell in grid
  this.i = i;
  this.j = j;

  //f, g, and h values for A*
  this.f = 0;
  this.g = 0;
  this.h = 0;

  //Neighbors of Cell
  this.neighbors = [];

  //Defines where we just came from
  this.previous = undefined;

  //Is this cell a barrier or not
  this.wall = false;



  //Displays this cell onto grid
  this.show = function(col) {
    if(this.i == start.i && this.j == start.j) {
      fill(color(0,199,33));
      noStroke();
      rect(this.i*w, this.j*h, w-1, h-1);
    }
    else if (this.i == end.i && this.j == end.j) {
      fill(235,51,51);
      noStroke();
      rect(this.i*w, this.j*h, w-1, h-1);
    }
    else if(this.wall) {
      fill(0);
      noStroke();
      rect(this.i*w, this.j*h, w-1, h-1);
    } else {
      fill(col);
      noStroke();
      rect(this.i*w, this.j*h, w-1, h-1);
    }

  };

  this.addNeighbors = function(grid) {
    var i = this.i;
    var j = this.j;

    //Add cell to the right
    if (i < cols - 1) {
      this.neighbors.push(grid[i + 1][j]);
    }
    //Add cell to the left
    if (i > 0) {
      this.neighbors.push(grid[i - 1][j]);
    }
    //Add bottom cell
    if (j < rows - 1) {
      this.neighbors.push(grid[i][j + 1]);
    }
    //Add top cell
    if (j > 0) {
      this.neighbors.push(grid[i][j - 1]);
    }
    //Add upper-left cell
    if (i > 0 && j > 0) {
      if(!(grid[i-1][j].wall && grid[i][j-1].wall)) {
        this.neighbors.push(grid[i - 1][j - 1]);
      }
    }
    //Add upper-right cell
    if (i < cols - 1 && j > 0) {
      if(!(grid[i+1][j].wall && grid[i][j-1].wall)) {
        this.neighbors.push(grid[i + 1][j - 1]);
      }

    }
    //Add bottom-left cell
    if (i > 0 && j < rows - 1) {
      if(!(grid[i-1][j].wall && grid[i][j+1].wall)) {
        this.neighbors.push(grid[i - 1][j + 1]);
      }
    }
    //Add bottom-right cell
    if (i < cols - 1 && j < rows - 1) {
      if(!(grid[i+1][j].wall && grid[i][j+1].wall)) {
        this.neighbors.push(grid[i + 1][j + 1]);
      }
    }
  };

  this.checkNeighbors = function(grid) {
    //Add upper-left cell

    if (i > 0 && j > 0) {
      if((grid[i-1][j].wall && grid[i][j-1].wall)) {

        removeFromArray(this.neighbors, grid[i-1][j-1]);
      }
    }
    //Add upper-right cell
    if (i < cols - 1 && j > 0) {
      if((grid[i+1][j].wall && grid[i][j-1].wall)) {
        removeFromArray(this.neighbors, grid[i+1][j-1]);
      }

    }
    //Add bottom-left cell
    if (i > 0 && j < rows - 1) {
      if((grid[i-1][j].wall && grid[i][j+1].wall)) {
        removeFromArray(this.neighbors, grid[i-1][j+1]);
      }
    }
    //Add bottom-right cell
    if (i < cols - 1 && j < rows - 1) {
      if((grid[i+1][j].wall && grid[i][j+1].wall)) {
        removeFromArray(this.neighbors, grid[i+1][j+1]);
      }
    }
  };
}
