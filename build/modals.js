import { Config } from "./config.js";
export class Modal {
    constructor(name) {
        this.container = document.querySelector(".modal-container");
        this.dialog = document.querySelector(".modal[name=" + name + "]");
    }
    show() {
        Modal.visibleInstance = this;
        window.setTimeout(Modal.hideListener, 200);
        this.container.classList.remove("hidden");
        this.dialog.classList.remove("hidden");
    }
    hide() {
        this.container.classList.add("hidden");
        this.dialog.classList.add("hidden");
        document.onclick = () => {
            //
        };
    }
    // tslint:disable-next-line: member-ordering
    static hide() {
        if (!this.visibleInstance) {
            return;
        }
        this.visibleInstance.hide();
    }
    querySelector(selector) {
        return this.dialog.querySelector(selector);
    }
}
Modal.hideListener = (e) => {
    document.onclick = (e) => {
        const target = event.target;
        if (target.closest(".modal")) {
            return;
        }
        Modal.hide();
    };
};
// tslint:disable-next-line: max-classes-per-file
export class NewFileDialog extends Modal {
    constructor() {
        super("new_file");
        this.fields = { height: null, width: null };
        this.onRequestNewImage = (dimensions) => {
            //
        };
        const okButton = this.querySelector("button[name=ok]");
        const cancelButton = this.querySelector("button[name=cancel]");
        okButton.onclick = this.onClickOk.bind(this);
        cancelButton.onclick = this.onClickCancel.bind(this);
        this.fields.height = this.querySelector("input[name=height]");
        this.fields.width = this.querySelector("input[name=width]");
        this.resetFields();
    }
    onClickOk() {
        const dimensions = {
            // tslint:disable-next-line: radix
            height: parseInt(this.fields.height.value),
            // tslint:disable-next-line: radix
            width: parseInt(this.fields.width.value)
        };
        this.onRequestNewImage(dimensions);
        this.hide();
    }
    onClickCancel() {
        this.resetFields();
        this.hide();
    }
    resetFields() {
        this.fields.height.value = Config.defaultSize.height.toString();
        this.fields.width.value = Config.defaultSize.width.toString();
    }
}
// tslint:disable-next-line: max-classes-per-file
export class SaveFileDialog extends Modal {
    constructor() {
        super("save_file");
        this.fields = {
            name: null,
            type: null
        };
        this.onRequestSave = (name, type) => {
            //
        };
        const okButton = this.querySelector("button[name=ok]");
        const cancelButton = this.querySelector("button[name=cancel]");
        okButton.onclick = this.onClickOk.bind(this);
        cancelButton.onclick = this.onClickCancel.bind(this);
        this.fields.name = this.querySelector("input[name=name]");
        this.fields.type = this.querySelector("select[name=type]");
        this.reset_fields();
    }
    reset_fields() {
        this.fields.name.value = "new_image";
    }
    onClickOk() {
        this.onRequestSave(this.fields.name.value, this.fields.type.value);
        this.hide();
    }
    onClickCancel() {
        this.reset_fields();
        this.hide();
    }
}
// tslint:disable-next-line: max-classes-per-file
export class LoadFileDialog extends Modal {
    constructor() {
        super("load_file");
        this.fields = {
            file: null
        };
        this.onRequestLoad = (path) => {
            //
        };
        const okButton = this.querySelector("button[name=ok]");
        const cancelButton = this.querySelector("button[name=cancel]");
        okButton.onclick = this.on_click_ok.bind(this);
        okButton.onclick = this.on_click_cancel.bind(this);
        this.fields.file = this.querySelector("input[name=file]");
    }
    on_click_ok() {
        this.onRequestLoad(this.fields.file.files[0]);
        this.hide();
    }
    on_click_cancel() {
        this.fields.file.value = null;
        this.hide();
    }
}
// tslint:disable-next-line: max-classes-per-file
export class AboutDialog extends Modal {
    constructor() {
        super("about");
        const okButton = this.querySelector("button[name=ok]");
        okButton.onclick = this.hide.bind(this);
    }
}
