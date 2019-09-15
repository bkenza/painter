import { Editor } from "./editor.js";
import { File } from "./file.js";
import { AboutDialog, NewFileDialog, SaveFileDialog } from "./modals.js";
import { Tools } from "./tools.js";
class Painter {
    // tslint:disable-next-line: member-ordering
    static initCommadButtons() {
        const newButton = document.querySelector(".commands > button[name=new]");
        const saveButton = document.querySelector(".commands > button[name=save]");
        const aboutButton = document.querySelector(".commands > button[name=about]");
        newButton.onclick = () => { Painter.newFileDialog.show(); };
        saveButton.onclick = () => { Painter.saveFileDialog.show(); };
        aboutButton.onclick = () => { Painter.aboutDialog.show(); };
    }
    // tslint:disable-next-line: member-ordering
    static init() {
        Painter.newFileDialog = new NewFileDialog();
        Painter.newFileDialog.onRequestNewImage = Editor.newImage;
        Painter.saveFileDialog = new SaveFileDialog();
        Painter.saveFileDialog.onRequestSave = File.save;
        Painter.aboutDialog = new AboutDialog();
        Painter.initCommadButtons();
        Painter.init();
        Editor.init();
        Tools.init();
    }
}
Painter.init();
