import { Editor } from "./editor.js"
import { File } from "./file.js"
import { AboutDialog, LoadFileDialog, NewFileDialog, SaveFileDialog } from "./modals.js"
import { Tools } from "./tools.js"

abstract class Painter {

    private static newFileDialog: NewFileDialog
    private static saveFileDialog: SaveFileDialog
    private static aboutDialog: AboutDialog

    // tslint:disable-next-line: member-ordering
    public static initCommadButtons() {

        const newButton = document.querySelector(".commands > button[name=new]") as HTMLButtonElement
        const saveButton = document.querySelector(".commands > button[name=save]") as HTMLButtonElement
        const aboutButton = document.querySelector(".commands > button[name=about]") as HTMLButtonElement

        newButton.onclick = () => { Painter.newFileDialog.show() }
        saveButton.onclick = () => { Painter.saveFileDialog.show() }
        aboutButton.onclick = () => { Painter.aboutDialog.show() }
    }

    // tslint:disable-next-line: member-ordering
    public static init() {

        Painter.newFileDialog = new NewFileDialog()
        Painter.newFileDialog.onRequestNewImage = Editor.newImage

        Painter.saveFileDialog = new SaveFileDialog()
        Painter.saveFileDialog.onRequestSave = File.save

        Painter.aboutDialog = new AboutDialog()

        Painter.initCommadButtons()
        Painter.init()
        Editor.init()
        Tools.init()
    }
}
Painter.init()
