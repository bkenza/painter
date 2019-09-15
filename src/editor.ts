import { Config } from "./config.js"
import { Palette } from "./palette.js"
import { Tools } from "./tools.js"
import { IImageContent, IImageSize, PaintTool } from "./types.js"

export class Editor {

    public static dimensions: IImageSize

    private static editorContainer: HTMLElement
    private static editorEl: HTMLElement
    private static editorMouseDown: boolean
    private static imageName: string

    public static get imageData(): IImageContent {

        const data: IImageContent = {
            dimensions: Editor.dimensions,
            frames: [],
            selected: Palette.selectedData,
        }

        const frame: string[] = []
        const pixels = Editor.editorEl.querySelectorAll("i")

        pixels.forEach((pixel) => { frame.push(pixel.dataset.color) })
        data.frames.push(frame)
        return data
    }

    // tslint:disable-next-line: member-ordering
    public static init() {

        Editor.editorContainer = document.querySelector(".editor-container")
        Editor.editorEl = document.querySelector(".editor")

        Editor.editorEl.onmousedown = (ev) => { Editor.editorMouseDown = true }
        Editor.editorEl.onmouseup = (ev) => { Editor.editorMouseDown = false }
        Editor.editorEl.onmouseleave = (ev) => { Editor.editorMouseDown = false }

        Editor.editorEl.onmousemove = Editor.onMouseMove

        Editor.newImage(Config.defaultSize)
        window.onresize = Editor.resize_editor
    }

    // tslint:disable-next-line: member-ordering
    public static clear() {

        while (Editor.editorEl.firstChild) {
            Editor.editorEl.removeChild(Editor.editorEl.firstChild)
        }
    }

    // tslint:disable-next-line: member-ordering
    public static loadImage(data: IImageContent) {

        Palette.loadSelected(data.selected)
        Editor.imageName = data.name
        Editor.dimensions = data.dimensions
        Editor.clear()

        const frameData = data.frames[0]
        const size = Editor.dimensions.height * Editor.dimensions.width
        for (let i = 0, ii = size; i !== ii; ++i) {

            const pixel = document.createElement("i")
            pixel.style.height = pixel.style.width = "0px"
            pixel.onclick = Editor.onClickPixel
            Editor.updatePixel(pixel, frameData[i])
            Editor.editorEl.appendChild(pixel)
        }

        Editor.resize_editor()
    }

    // tslint:disable-next-line: member-ordering
    public static newImage(dimensions: IImageSize) {

        Palette.resetSelected()
        Palette.initSelected()
        Editor.dimensions = dimensions
        Editor.clear()

        const size = Editor.dimensions.height * Editor.dimensions.width
        for (let i = 0, ii = size; i !== ii; ++i) {

            const pixel = document.createElement("i")
            pixel.style.height = pixel.style.width = "0px"
            pixel.onclick = Editor.onClickPixel
            Editor.editorEl.appendChild(pixel)
        }

        Editor.resize_editor()
    }

    // tslint:disable-next-line: member-ordering
    public static resize_editor() {

        const boundRect = Editor.editorContainer.getBoundingClientRect()
        const dims = { height: boundRect.height - 24, width: boundRect.width - 24 }
        const pxSize = Math.min((dims.width / Editor.dimensions.width), (dims.height / Editor.dimensions.height))

        Editor.editorEl.style.height = (pxSize * Editor.dimensions.height) + "px"
        Editor.editorEl.style.width = (pxSize * Editor.dimensions.width) + "px"

        Editor.editorEl.childNodes.forEach((node) => {

            const el = node as HTMLElement
            el.style.width = el.style.height = pxSize + "px"
        })
    }

    // tslint:disable-next-line: member-ordering
    public static updatePixel(pixel: HTMLElement, color?: string) {

        pixel.style.backgroundColor = (color) ? "#" + color : null
        pixel.dataset.color = color
    }

    // tslint:disable-next-line: member-ordering
    public static onClickPixel(ev) {

        switch (Tools.currentTool) {

            case (PaintTool.Paint):
                Editor.updatePixel(ev.target, Palette.currentColor)
                return

            case (PaintTool.Erase):
                Editor.updatePixel(ev.target, null)
        }
    }

    // tslint:disable-next-line: member-ordering
    public static onMouseMove(ev) {

        // tslint:disable-next-line: curly
        if (!Editor.editorMouseDown) return

        switch (Tools.currentTool) {

            case (PaintTool.Paint):
                Editor.updatePixel(ev.target, Palette.currentColor)
                return

            case (PaintTool.Erase):
                Editor.updatePixel(ev.target, null)
        }
    }
}
