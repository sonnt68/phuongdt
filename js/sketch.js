var cities = [];
var totalCities = 12;

var popSize = 500;
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestEver;
var currentBest;

var statusPopulation;

function setup() {
  createCanvas(600, 600);
  var order = [];
  for (let i = 0; i < totalCities; i++) {
    var v = createVector(random(width), random(height / 2));
    console.log(typeof v);
    cities[i] = v;
    order[i] = i;
  }
  for (let i = 0; i < popSize; i++) {
    population[i] = shuffle(order);
  }
}

function draw() {
  background(0);

  //GA
  calulatFitness();
  normalizeFitness();
  nextGeneration();

  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < bestEver.length; i++) {
    var n = bestEver[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();

  translate(0, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  beginShape();
  for (let i = 0; i < currentBest.length; i++) {
    var n = currentBest[i];
    vertex(cities[n].x, cities[n].y);
    ellipse(cities[n].x, cities[n].y, 16, 16);
  }
  endShape();
}

function swap(a, i, j) {
  var temp = a[i];
  a[i] = a[j];
  a[j] = temp;
}

function calcDistance(points, order) {
  var sum = 0;
  for (let i = 0; i < order.length - 1; i++) {
    var cityAIndex = order[i];
    var cityA = points[cityAIndex];
    var cityBIndex = order[i + 1];
    var cityB = points[cityBIndex];
    var d = dist(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}
