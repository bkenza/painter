import { Config } from "./config.js"
import { IImageSize } from "./types.js"

export abstract class Modal {

    public static visibleInstance: Modal

    public static hideListener = (e: MouseEvent) => {

        document.onclick = (e) => {
            const target = event.target as HTMLElement
            if (target.closest(".modal")) { return }
            Modal.hide()
        }
    }

    private container: HTMLElement
    private dialog: HTMLElement

    public constructor(name: string) {

        this.container = document.querySelector(".modal-container")
        this.dialog = document.querySelector(".modal[name=" + name + "]")
    }

    public show() {

        Modal.visibleInstance = this
        window.setTimeout(Modal.hideListener, 200)

        this.container.classList.remove("hidden")
        this.dialog.classList.remove("hidden")
    }

    public hide() {

        this.container.classList.add("hidden")
        this.dialog.classList.add("hidden")
        document.onclick = () => {
            //
        }
    }

    // tslint:disable-next-line: member-ordering
    public static hide() {

        if (!this.visibleInstance) { return }
        this.visibleInstance.hide()
    }

    protected querySelector(selector: string): HTMLElement {

        return this.dialog.querySelector(selector)
    }

}

interface IDialogFields {
    [name: string]: HTMLInputElement | HTMLSelectElement
}

// tslint:disable-next-line: max-classes-per-file
export class NewFileDialog extends Modal {

    public fields: IDialogFields = {  height: null, width: null }

    constructor() {

        super("new_file")

        const okButton = this.querySelector("button[name=ok]") as HTMLButtonElement
        const cancelButton = this.querySelector("button[name=cancel]") as HTMLButtonElement

        okButton.onclick = this.onClickOk.bind(this)
        cancelButton.onclick = this.onClickCancel.bind(this)

        this.fields.height = (this.querySelector("input[name=height]") as HTMLInputElement)
        this.fields.width = (this.querySelector("input[name=width]") as HTMLInputElement)

        this.resetFields()
    }

    public onRequestNewImage = (dimensions: IImageSize) => {
        //
    }

    private onClickOk() {

        const dimensions = {
            // tslint:disable-next-line: radix
            height: parseInt(this.fields.height.value),
            // tslint:disable-next-line: radix
            width: parseInt(this.fields.width.value)
        }

        this.onRequestNewImage(dimensions)
        this.hide()
    }

    private onClickCancel() {

        this.resetFields()
        this.hide()
    }

    private resetFields() {

        this.fields.height.value = Config.defaultSize.height.toString()
        this.fields.width.value = Config.defaultSize.width.toString()
    }
}

// tslint:disable-next-line: max-classes-per-file
export class SaveFileDialog extends Modal {

    public fields: IDialogFields = {
        name: null,
        type: null
    }

    constructor() {

        super("save_file")

        const okButton = this.querySelector("button[name=ok]") as HTMLButtonElement
        const cancelButton = this.querySelector("button[name=cancel]") as HTMLButtonElement

        okButton.onclick = this.onClickOk.bind(this)
        cancelButton.onclick = this.onClickCancel.bind(this)

        this.fields.name = (this.querySelector("input[name=name]") as HTMLInputElement)
        this.fields.type = (this.querySelector("select[name=type]") as HTMLInputElement)

        this.reset_fields()
    }

    public onRequestSave = (name: string, type: string) => {
        //
    }

    private reset_fields() {

        this.fields.name.value = "new_image"
    }

    private onClickOk() {

        this.onRequestSave(this.fields.name.value, this.fields.type.value)
        this.hide()
    }

    private onClickCancel() {

        this.reset_fields()
        this.hide()
    }
}

// tslint:disable-next-line: max-classes-per-file
export class LoadFileDialog extends Modal {

    public fields: IDialogFields = {
        file: null
    }

    constructor() {

        super("load_file")

        const okButton = this.querySelector("button[name=ok]") as HTMLButtonElement
        const cancelButton = this.querySelector("button[name=cancel]") as HTMLButtonElement

        okButton.onclick = this.on_click_ok.bind(this)
        okButton.onclick = this.on_click_cancel.bind(this)

        this.fields.file = (this.querySelector("input[name=file]") as HTMLInputElement)
    }

    public onRequestLoad = (path: string) => {
        //
    }

    private on_click_ok() {

        this.onRequestLoad((this.fields.file as any).files[0])
        this.hide()
    }

    private on_click_cancel() {

        this.fields.file.value = null
        this.hide()
    }
}

// tslint:disable-next-line: max-classes-per-file
export class AboutDialog extends Modal {

    constructor() {

        super("about")

        const okButton = this.querySelector("button[name=ok]") as HTMLButtonElement
        okButton.onclick = this.hide.bind(this)
    }
}
