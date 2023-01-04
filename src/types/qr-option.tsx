export type DotType = "dots" | "rounded" | "classy" | "classy-rounded" | "square" | "extra-rounded" | "diamond"
export type CornerDotType = "dot" | "square"
export type CornerSquareType = "dot" | "square" | "extra-rounded"

type TQROption = {
  icon: any,
  cornersSquareOptions: {
    color: string,
    type: CornerSquareType
  },
  cornersDotOptions: {
    color: string,
    type: CornerDotType
  },
  dotsOptions: {
    color: string,
    type: DotType
  },
  backgroundOptions: {
    color: string,
    margin?: number
  },
  imageOptions: {
    margin: number,
    imageSize: number,
    crossOrigin: string
  }
} 

export default TQROption
