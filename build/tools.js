import { PaintTool } from "./types.js";
export class Tools {
    static init() {
        document.querySelectorAll(".tools > button").forEach((node) => {
            const button = node;
            button.onclick = Tools.on_click_tool.bind(Tools, button);
            Tools.toolButtons.push(button);
        });
    }
    static on_click_tool(button) {
        Tools.currentTool = PaintTool[button.name];
        Tools.toolButtons.forEach((node) => node.classList.remove("selected"));
        button.classList.add("selected");
    }
}
Tools.currentTool = PaintTool.Paint;
Tools.toolButtons = [];
