var cities = [];
var totalCities = 0;
var population = [];
var fitness = [];

var recordDistance = Infinity;
var bestEver;
var currentBest;

window.addEventListener("load", function () {
  document
    .getElementById("form-test")
    .addEventListener("submit", async function (e) {
      e.preventDefault(); // before the code
      /* do what you want with the form */
      document.getElementById("result").innerHTML = "calculating...";
      popSize = e.target["popSize"].value;
      const maxGen = e.target["maxGen"].value;
      const file = e.target["file"].files[0];
      const text = await file.text();
      cities = convertTextToArray(text).map((item) => {
        const splitText = item.split(" ");
        return {
          x: splitText[1],
          y: splitText[2],
        };
      });
      totalCities = cities.length;
      init(popSize);

      var start = window.performance.now();
      for (let i = 0; i < maxGen; i++) {
        handle();
      }
      var end = window.performance.now();
      document.getElementById("result").innerHTML = `
      Best cost:  ${recordDistance} </br>
      Best process:  ${bestEver} </br>
      Run time:  ${end - start} ms
      `;
      downloadCSV({
        BestCost: recordDistance,
        RunTime: end - start,
      }, totalCities);
    });
});

function convertTextToArray(text) {
  return text
    .substring(
      text.indexOf("NODE_COORD_SECTION") + 20,
      text.lastIndexOf("EOF") - 2
    )
    .split("\r\n");
}

function init(popSize) {
  const order = cities.map((_item, index) => index);

  for (let i = 0; i < popSize; i++) {
    population[i] = order.slice();
    shuffleArray(population[i]);
  }
}

function handle() {
  //GA
  calulatFitness();
  normalizeFitness();
  nextGeneration();
}

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
};

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
    var d = distance(cityA.x, cityA.y, cityB.x, cityB.y);
    sum += d;
  }
  return sum;
}

const distance = (x1, y1, x2, y2) => {
  let y = x2 - x1;
  let x = y2 - y1;
  return Math.sqrt(x * x + y * y);
};
