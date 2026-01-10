function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = src
  })
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob)
        } else {
          reject(new Error('Failed to create blob from canvas'))
        }
      },
      type,
      quality,
    )
  })
}

export async function stripFileMetadata(file: File, quality = 0.9): Promise<File> {
  const url = URL.createObjectURL(file)

  try {
    const img = await loadImage(url)

    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to get canvas 2D context')
    }

    ctx.drawImage(img, 0, 0)

    const blob = await canvasToBlob(canvas, file.type, quality)
    return new File([blob], file.name, { type: file.type })
  } finally {
    URL.revokeObjectURL(url)
  }
}
