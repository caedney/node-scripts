const deepClone = data => {
  if (typeof data !== "object") {
    return data;
  }

  const output = Array.isArray(data) ? [] : {};

  Object.keys(data).forEach(key => {
    const val = data[key];
    output[key] = typeof val === "object" ? deepClone(val) : val;
  });

  return output;
};
