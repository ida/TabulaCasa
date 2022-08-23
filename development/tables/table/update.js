function updateSumColumnEles(tableId, colPos) {
  // Recalculate sum-column-cells:
  var sumColCells = getSumColumnCells(tableId, colPos)
  // Update displayed sum-cells with new values:
  var cellEles = document.querySelectorAll(`#${tableId} > ul > li:nth-child(${colPos+2})`)
  for(var i=1; i < cellEles.length; i++) {
    cellEles[i].innerHTML = sumColCells[i]
  }
}
