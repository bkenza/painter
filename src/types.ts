export interface IImageSize  {
    height: number,
    width: number
}

export interface IImageContent {
    name?: string
    dimensions: IImageSize
    selected: string[]
    frames: string[][]
}

export enum PaintTool {
    Erase = 0,
    Paint = 1
}
