function calulatFitness() {
  var currentRecord = Infinity;
  for (let i = 0; i < population.length; i++) {
    var d = calcDistance(cities, population[i]);
    if (d < recordDistance) {
      recordDistance = d;
      bestEver = population[i];
    }
    if (d < currentRecord) {
      currentRecord = d;
      currentBest = population[i];
    }
    fitness[i] = 1 / (d + 1);
  }
}

function normalizeFitness() {
  var sum = 0;
  for (let i = 0; i < fitness.length; i++) {
    sum += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / sum;
  }
}

function nextGeneration() {
  var newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    var orderA = pickOne(population, fitness);
    var orderB = pickOne(population, fitness);
    var order = crossOver(orderA, orderB);
    mutate(order, 0.01);
    newPopulation[i] = order;
  }
  population = newPopulation;
}

function pickOne(list, prob) {
  var index = 0;
  var r = Math.random();
  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(orderA, orderB) {
  var start = Math.floor(Math.random() * (orderA.length + 1));
  var newOrder = orderA.slice(start, orderA.length-1);
  for (let i = 0; i < orderB.length; i++) {
    var city = orderB[i];
    if (!newOrder.includes(city)) {
      newOrder.push(city);
    }
  }
  return newOrder;
}

function mutate(order, mutationRate) {
  const mutationCapacity = Math.floor(totalCities * 0.7);
  for (let i = 0; i < mutationCapacity; i++) {
    if (Math.random() < mutationRate) {
      var indexA = Math.floor(Math.random() * order.length);
      var indexB = (indexA + 1) % totalCities;
      swap(order, indexA, indexB);
    }
  }
}
