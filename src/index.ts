function randomNoGenerator(min: number, max: number) {
  if (typeof max !== "number" && typeof min !== "number") {
    min = 0;
    max = 1;
  }
  return Math.random() * (max - min) + min;
}
module.exports = randomNoGenerator;

console.log(randomNoGenerator(5, 8));
