class AI {
  constructor() {}
  play(rows) {
    const rowsWZeros = [];
    for (let i = 0; i < rows.length; i++) {
      if (rows[i] != 0) {
        rowsWZeros.push({
          value: rows[i],
          position: i,
        });
      }
    }
    let selectedRow = Math.floor(Math.random() * rowsWZeros.length);
    let selectedColumn =
      1 + Math.floor(Math.random() * rowsWZeros[selectedRow].value);
    return {
      from: rowsWZeros[selectedRow].position,
      count: selectedColumn,
    };
  }
}

export default AI;
