import { ImageAnnotatorClient } from '@google-cloud/vision'

const keyFilename = `./key/hackz-treasure-7ba4587659d1.json`
const vision = new ImageAnnotatorClient({ keyFilename })

export const gcloudVision = async (content: Buffer): Promise<string | null> => {
  try {
    const results = await vision.textDetection({ image: { content } })
    if (results[0].fullTextAnnotation) {
      const message = results[0].fullTextAnnotation.text
      if (message) {
        return message
      }
    }
    return null
  } catch (err) {
    if (err instanceof Error) console.error(err.message)
    console.error('gcloudVision handler')
    throw Error
  }
}
