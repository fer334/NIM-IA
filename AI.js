class AI {
  state;
  constructor() {}
  play() {
    const rowsWZeros = [];
    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i] != 0) {
        rowsWZeros.push({
          value: this.state[i],
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
