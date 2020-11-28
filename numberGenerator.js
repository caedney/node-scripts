function generateEuroMillionNumbers() {
  function generateNumbers(n, limit, arr) {
    let i = 0;

    do {
      const randomNumber = Math.ceil(Math.random() * limit);

      if (arr.indexOf(randomNumber) < 0) {
        i += 1;
        arr.push(randomNumber);
      }
    } while (i < n);

    return arr.sort((a, b) => a - b);
  }

  const numbers = generateNumbers(5, 50, []);
  const stars = generateNumbers(2, 12, []);

  return numbers.concat("⭐", stars).join(" ");
}

const winningNumbers = generateEuroMillionNumbers();
console.log(winningNumbers);
