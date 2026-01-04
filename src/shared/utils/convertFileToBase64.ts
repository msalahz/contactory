export function convertFileToBase64(file: File): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file) // Reads the file as a data URL (Base64)
    reader.onload = () => resolve(reader.result as string) // Resolve with the Base64 string
    reader.onerror = (error: ProgressEvent<FileReader>) => reject(error)
  })
}
