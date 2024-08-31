export const testCanvas = {
  isColoring: false,
  grid: 5,
  pallete: [
    '#ff0000',
    '#00ff00',
    '#0000ff'
  ],
  rects: [
    {
      indexRect: 0,
      indexColor: 0
    },
    {
      indexRect: 6,
      indexColor: 0
    },
    {
      indexRect: 12,
      indexColor: 0
    },
    {
      indexRect: 18,
      indexColor: 0
    },
    {
      indexRect: 24,
      indexColor: 0
    },
  ]
}

export const testColoring = {
  isColoring: true,
  grid: 5,
  pallete: [
    '#ff0000',
    '#00ff00'
  ],
  rects: [
    {
      indexRect: 0,
      indexColor: 0,
      isFilling: true
    },
    {
      indexRect: 6,
      indexColor: 1,
    },
    {
      indexRect: 12,
      indexColor: 1,
      isFilling: true
    },
    {
      indexRect: 13,
      isFilling: true,
    },
    {
      indexRect: 18,
      indexColor: 0,
    },
    {
      indexRect: 24,
      indexColor: 0,
    },
  ]
}