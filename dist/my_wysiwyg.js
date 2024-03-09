class MyWysiwyg {
    constructor(element, options = {}) {
        this.defaultOptions = {
            buttons: ["bold", "italic", "color"],
        };
        this.toolbar = null;
        this.options = Object.assign(Object.assign({}, this.defaultOptions), options);
        this.element = element;
        this.submitButton = document.querySelector('button');
        this.submitButton.addEventListener('click', () => this.displayBBCode());
        this.initWysiwyg();
    }
    initWysiwyg() {
        this.createToolbar();
        this.loadFromLocalStorage();
        this.element.addEventListener("input", () => {
            this.handleInput();
        });
        window.addEventListener('beforeunload', (event) => {
            this.handleBeforeUnload(event);
        });
    }
    createToolbar() {
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("wysiwyg-toolbar");
        this.options.buttons.forEach(buttonType => {
            const button = document.createElement("button");
            button.textContent = buttonType;
            button.addEventListener("click", () => this.handleButtonClick(buttonType));
            this.toolbar.appendChild(button);
        });
        this.element.parentNode.appendChild(this.toolbar);
    }
    handleButtonClick(buttonType) {
        console.log(`Button clicked: ${buttonType}`);
        switch (buttonType) {
            case 'bold':
                this.bold();
                break;
            case 'italic':
                this.italic();
                break;
            case 'underline':
                this.underline();
                break;
            case 'stroke':
                this.stroke();
                break;
            case 'sup':
                this.sup();
                break;
            case 'justify':
                this.justify();
                break;
            case 'center':
                this.center();
                break;
            case 'right':
                this.right();
                break;
            case 'image':
                this.image();
                break;
            case 'video':
                this.video();
                break;
            case 'url':
                this.url();
                break;
            case 'quote':
                this.quote();
                break;
            case 'code':
                this.code();
                break;
            case 'color':
                this.color();
                break;
            case 'size':
                this.size();
                break;
            case 'fontweight':
                this.fontweight();
                break;
            default:
                break;
        }
    }
    handleInput() {
        this.saveToLocalStorage();
    }
    saveToLocalStorage() {
        localStorage.setItem('wysiwygContent', this.element.value);
    }
    loadFromLocalStorage() {
        const savedContent = localStorage.getItem('wysiwygContent');
        if (savedContent) {
            this.element.value = savedContent;
        }
    }
    handleBeforeUnload(event) {
        const unsavedChanges = this.element.value !== localStorage.getItem('wysiwygContent');
        if (unsavedChanges) {
            const message = 'Des changements non sauvegardés existent. Voulez-vous vraiment quitter la page?';
            event.returnValue = message;
            return message;
        }
    }
    bold() { this.insertBBCode("[b]", "[/b]"); }
    italic() { this.insertBBCode("[i]", "[/i]"); }
    underline() { this.insertBBCode("[u]", "[/u]"); }
    stroke() { this.insertBBCode("[s]", "[/s]"); }
    sup() { this.insertBBCode("[sup]", "[/sup]"); }
    justify() { this.insertBBCode("[justify]", "[/justify]"); }
    center() { this.insertBBCode("[center]", "[/center]"); }
    right() { this.insertBBCode("[right]", "[/right]"); }
    image() { this.insertBBCode("[img]", "[/img]"); }
    video() { this.insertBBCode("[video]", "[/video]"); }
    url() { this.insertBBCode("[url]", "[/url]"); }
    quote() { this.insertBBCode("[quote]", "[/quote]"); }
    code() { this.insertBBCode("[code]", "[/code]"); }
    color() { this.insertBBCode("[color=black]", "[/color]"); }
    size() { this.insertBBCode("[size=14]", "[/size]"); }
    fontweight() { this.insertBBCode("[fw=300]", "[/fw]"); }
    insertBBCode(repdeb, repfin) {
        const start = this.element.selectionStart;
        const end = this.element.selectionEnd;
        const selectedText = this.element.value.substring(start, end);
        this.element.value = (this.element.value.substring(0, start) +
            repdeb +
            selectedText +
            repfin +
            this.element.value.substring(end));
        const newPos = start + repdeb.length + selectedText.length;
        this.element.setSelectionRange(newPos, newPos);
        this.element.focus();
        this.saveToLocalStorage();
    }
    displayBBCode() {
        const textareaContent = this.element.value;
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "wysiwyg_display.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const resultContainer = document.createElement("div");
                resultContainer.innerHTML = xhr.responseText;
                this.element.parentNode.appendChild(resultContainer);
            }
        };
        xhr.send("content=" + encodeURIComponent(textareaContent));
    }
}
export { MyWysiwyg };
