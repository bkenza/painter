import { Editor } from "./editor.js";
export class File {
    static save(name, type) {
        const imageData = Editor.imageData;
        const json = JSON.stringify(Object.assign({ name }, imageData));
        const blob = new Blob([json], { type: "octet/stream" });
        File.trigger_download(name, blob);
    }
    static trigger_download(name, blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.target = "_blank";
        a.download = name + ".json";
        a.click();
    }
}
