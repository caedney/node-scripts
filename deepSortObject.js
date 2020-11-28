const deepSort = (data, sortField, ascending) => {
  let index = data.length;

  while (index > 0) {
    index -= 1;
    const childPrograms = data[index].childProgram;
    if (childPrograms && childPrograms.length) {
      deepSort(childPrograms, sortField, ascending);
    }
  }

  const sortedData = data.sort((a, b) => {
    let aF = a[sortField];
    let bF = b[sortField];
    // this is for case-insensitive sorting
    aF = typeof aF === "string" ? aF.toLowerCase() : aF;
    bF = typeof bF === "string" ? bF.toLowerCase() : bF;

    if (aF < bF) {
      return -1;
    }
    if (aF > bF) {
      return 1;
    }
    return 0;
  });

  return ascending ? sortedData : sortedData.reverse();
};
