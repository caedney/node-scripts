// toFixedNoRounding method found ➳
// https://helloacm.com/javascripts-tofixed-implementation-without-rounding/
//
Number.prototype.toFixedNoRounding = function (n) {
  const reg = new RegExp("^-?\\d+(?:\\.\\d{0," + n + "})?", "g");
  const a = this.toString().match(reg)[0];
  const dot = a.indexOf(".");

  if (dot === -1) {
    // integer, insert decimal dot and pad up zeros
    return a + "." + "0".repeat(n);
  }

  const b = n - (a.length - dot) + 1;

  return b > 0 ? a + "0".repeat(b) : a;
};

function validateJSON(json) {
  let obj;

  try {
    obj = JSON.parse(json);
  } catch (error) {
    console.log("%cError!! Check input", "color: red");
  }

  return obj;
}

const run =
  process.argv[2] && Array.isArray(validateJSON(process.argv[2]))
    ? validateJSON(process.argv[2])
    : [5, 5.02, 5.03, 5.06, 5.28, 5.3, 5.27, 5.25, 5.2, 4.59];

const toSeconds = time => {
  return Math.floor(time) + (time % 1) * 0.6;
};

const time = run.reduce(
  (a, b, i, src) => {
    if (typeof b === "number") {
      const seconds = a.seconds + Math.floor(b) * 60 + (b % 1) * 100;

      if (i < src.length - 1) {
        return { seconds };
      }

      const decimal = seconds / 60;
      const minutes = toSeconds(decimal);
      const pace = toSeconds(decimal / src.length);
      const kmh = 60 / (minutes / src.length);

      return {
        seconds,
        minutes: minutes.toFixed(2),
        pace: pace.toFixed(2),
        kmh: kmh.toFixed(2),
      };
    }

    return a;
  },
  { seconds: 0 }
);

console.log(`Total seconds is ${time.seconds}`);
console.log(`Total minutes is ${time.minutes}`);
console.log(`Average pace is ${time.pace}`);
console.log(`Average distance is ${time.kmh}kmh`);
console.log("Total " + time.seconds);
