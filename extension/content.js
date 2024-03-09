class MyWysiwyg {
    constructor(element) {
        this.element = element;
        this.createToolbar();
        this.setupEventListeners();
    }

    createToolbar() {
        this.toolbar = document.createElement("div");
        this.toolbar.classList.add("wysiwyg-toolbar");
        
        this.submitButton = document.createElement("button");
        this.submitButton.textContent = "Submit";
        this.toolbar.appendChild(this.submitButton);

        this.element.parentNode.insertBefore(this.toolbar, this.element.nextSibling);
    }

    setupEventListeners() {
        this.submitButton = this.toolbar.querySelector(".submitBtn");
        this.submitButton.addEventListener("click", () => this.displayBBCode());
    }

    displayBBCode() {
        const textareaContent = this.element.value;

        fetch('http://localhost:8888/convert_api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'content=' + encodeURIComponent(textareaContent),
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Erreur lors de la requête :', error);
        });
    }
}

document.querySelectorAll('textarea').forEach(textarea => {
    new MyWysiwyg(textarea);
});