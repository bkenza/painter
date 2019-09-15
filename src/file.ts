import { Editor } from "./editor.js"

export abstract class File {

    public static save(name: string, type: string) {

        const imageData = Editor.imageData
        const json = JSON.stringify({ name, ...imageData })
        const blob = new Blob([json], { type: "octet/stream" })
        File.trigger_download(name, blob)
    }

   private static trigger_download(name: string, blob: Blob) {

        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")

        a.href = url
        a.target = "_blank"
        a.download = name + ".json"
        a.click()
    }
}
