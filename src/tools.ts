import { PaintTool } from "./types.js"

export class Tools {

    public static currentTool: PaintTool = PaintTool.Paint

    public static init() {

        document.querySelectorAll(".tools > button").forEach((node) => {

            const button = node as HTMLButtonElement
            button.onclick = Tools.on_click_tool.bind(Tools, button)
            Tools.toolButtons.push(button)
        })
    }
    private static toolButtons: HTMLButtonElement[] = []

    private static on_click_tool(button) {

        Tools.currentTool = (PaintTool[button.name] as any)
        Tools.toolButtons.forEach((node) => node.classList.remove("selected"))
        button.classList.add("selected")
    }
}
