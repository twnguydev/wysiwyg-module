class MyWysiwyg {
    private defaultOptions: { buttons: string[] };
    private options: { buttons: string[] };
    private element: HTMLTextAreaElement;
    private submitButton: HTMLButtonElement;
    private toolbar: HTMLDivElement | null;

    constructor(element: HTMLTextAreaElement, options: { buttons?: string[] } = {}) {
        this.defaultOptions = {
            buttons: ["bold", "italic", "color"],
        };
        this.toolbar = null;
        this.options = { ...this.defaultOptions, ...options };
        this.element = element;
        this.submitButton = document.querySelector('button')!;
        this.submitButton.addEventListener('click', () => this.displayBBCode());

        this.initWysiwyg();
    }

    private initWysiwyg() {
        this.createToolbar();

        this.loadFromLocalStorage();

        this.element.addEventListener("input", () => {
            this.handleInput();
        });

        window.addEventListener('beforeunload', (event) => {
            this.handleBeforeUnload(event);
        });
    }

    private createToolbar() {
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("wysiwyg-toolbar");

        this.options.buttons.forEach(buttonType => {
            const button = document.createElement("button");
            button.textContent = buttonType;
            button.addEventListener("click", () => this.handleButtonClick(buttonType));
                this.toolbar!.appendChild(button);
        });

        this.element.parentNode!.appendChild(this.toolbar);
    }

    private handleButtonClick(buttonType: string): void {
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

    private handleInput() {
        this.saveToLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('wysiwygContent', this.element.value);
    }

    private loadFromLocalStorage() {
        const savedContent = localStorage.getItem('wysiwygContent');
        if (savedContent) {
            this.element.value = savedContent;
        }
    }

    private handleBeforeUnload(event: BeforeUnloadEvent) {
        const unsavedChanges = this.element.value !== localStorage.getItem('wysiwygContent');
        if (unsavedChanges) {
            const message = 'Des changements non sauvegardés existent. Voulez-vous vraiment quitter la page?';
            event.returnValue = message;
            return message;
        }
    }

    bold(): void { this.insertBBCode("[b]", "[/b]"); }
    italic(): void { this.insertBBCode("[i]", "[/i]"); }
    underline(): void { this.insertBBCode("[u]", "[/u]"); }
    stroke(): void { this.insertBBCode("[s]", "[/s]"); }
    sup(): void { this.insertBBCode("[sup]", "[/sup]"); }
    justify(): void { this.insertBBCode("[justify]", "[/justify]"); }
    center(): void { this.insertBBCode("[center]", "[/center]"); }
    right(): void { this.insertBBCode("[right]", "[/right]"); }
    image(): void { this.insertBBCode("[img]", "[/img]"); }
    video(): void { this.insertBBCode("[video]", "[/video]"); }
    url(): void { this.insertBBCode("[url]", "[/url]"); }
    quote(): void { this.insertBBCode("[quote]", "[/quote]"); }
    code(): void { this.insertBBCode("[code]", "[/code]"); }
    color(): void { this.insertBBCode("[color=black]", "[/color]"); }
    size(): void { this.insertBBCode("[size=14]", "[/size]"); }
    fontweight(): void { this.insertBBCode("[fw=300]", "[/fw]"); }

    insertBBCode(repdeb: string, repfin: string): void {
        const start = this.element.selectionStart;
        const end = this.element.selectionEnd;
    
        const selectedText = this.element.value.substring(start, end);
    
        this.element.value = (
            this.element.value.substring(0, start) +
            repdeb +
            selectedText +
            repfin +
            this.element.value.substring(end)
        );
    
        const newPos = start + repdeb.length + selectedText.length;
    
        this.element.setSelectionRange(newPos, newPos);
        this.element.focus();
    
        this.saveToLocalStorage();
    }    

    public displayBBCode() {
        const textareaContent = this.element.value;

        const xhr = new XMLHttpRequest();
        xhr.open("POST", "wysiwyg_display.php", true);
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                const resultContainer = document.createElement("div");
                resultContainer.innerHTML = xhr.responseText;

                this.element.parentNode!.appendChild(resultContainer);
            }
        };

        xhr.send("content=" + encodeURIComponent(textareaContent));
    }
}

export { MyWysiwyg };