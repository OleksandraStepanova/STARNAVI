export const gridPosition = (index: number, columns: number, cellSize: number, startX: number, startY: number) => {
    const row = Math.floor(index / columns);
    const col = index % columns;
    return { x: startX + col * cellSize, y: startY + row * cellSize };
};