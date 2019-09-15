import { Colors } from "./colors.js";
export class Palette {
    static get selectedData() {
        const data = [Palette.currentColor];
        const recent = Palette.recenteElement.querySelectorAll("div");
        recent.forEach((item) => { data.push(item.dataset.color); });
        return data;
    }
    // tslint:disable-next-line: member-ordering
    static init() {
        Palette.paletteElement = document.querySelector(".palette");
        Palette.currentElement = document.querySelector(".current-color");
        Palette.recenteElement = document.querySelector(".recent-colors");
        Colors.forEach((color) => {
            const el = Palette.makeColorEl(color);
            el.onclick = Palette.onPickColor.bind(Palette, color);
            Palette.paletteElement.appendChild(el);
        });
    }
    // tslint:disable-next-line: member-ordering
    static initSelected() {
        const el = Palette.makeColorEl(Colors[0]);
        Palette.currentElement.appendChild(el);
        Palette.currentColor = Colors[0];
    }
    // tslint:disable-next-line: member-ordering
    static resetSelected() {
        while (Palette.currentElement.firstChild) {
            Palette.currentElement.removeChild(Palette.currentElement.firstChild);
        }
        while (Palette.recenteElement.firstChild) {
            Palette.recenteElement.removeChild(Palette.recenteElement.firstChild);
        }
    }
    // tslint:disable-next-line: member-ordering
    static loadSelected(data) {
        Palette.resetSelected();
        Palette.currentColor = data[0];
        Palette.currentElement.appendChild(Palette.makeColorEl(Palette.currentColor));
        for (let i = 1, ii = data.length; i !== ii; ++i) {
            Palette.recenteElement.appendChild(Palette.makeColorEl(data[i]));
        }
    }
    static onPickColor(color) {
        // tslint:disable-next-line: curly
        if (Palette.currentElement.firstChild.dataset.color === color)
            return;
        for (let i = 0, ii = Palette.recenteElement.children.length; i !== ii; ++i) {
            try {
                if (Palette.recenteElement.children[i].dataset.color === color) {
                    Palette.recenteElement.removeChild(Palette.recenteElement.childNodes[i]);
                }
            }
            catch (ex) {
                break;
            }
        }
        const current = Palette.currentElement.firstChild;
        const currentColor = current.dataset.color;
        const nextRecentElement = Palette.makeColorEl(currentColor);
        Palette.currentElement.removeChild(current);
        Palette.currentElement.appendChild(Palette.makeColorEl(color));
        Palette.recenteElement.insertBefore(nextRecentElement, Palette.recenteElement.firstChild);
        while (Palette.recenteElement.children.length > 28) {
            const ln = Palette.recenteElement.children.length;
            Palette.recenteElement.removeChild(Palette.recenteElement.childNodes[ln - 1]);
        }
        nextRecentElement.onclick = Palette.onPickColor.bind(Palette, currentColor);
        Palette.currentColor = color;
    }
    static makeColorEl(color) {
        const el = document.createElement("div");
        el.dataset.color = color;
        el.style.backgroundColor = "#" + color;
        return el;
    }
}
