export function getImageSizeAndPos (imageRatio, canvasWidth, canvasHeight) {
  const canvasRatio = canvasWidth / canvasHeight
  if (imageRatio > canvasRatio) {
    const width = canvasWidth
    const height = canvasWidth / imageRatio
    return {
      width,
      height,
      posX: 0,
      posY: (canvasHeight - height) / 2
    }
  } else if (imageRatio < canvasRatio) {
    const width = canvasHeight / imageRatio
    return {
      width,
      height: canvasHeight,
      posX: (canvasWidth - width) / 2,
      posY: 0
    }
  } else {
    return {
      width: canvasWidth,
      height: canvasHeight,
      posX: 0,
      posY: 0
    }
  }
}
