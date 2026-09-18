const spellen = [
    { name: "Terraforming Mars", imgUrl: "spel1.jpg", description: "Terraforming Mars is een strategisch bordspel waarin je de planeet Mars transformeert." },
    { name: "Root", imgUrl: "spel1.jpg", description: "Root is een strategisch bordspel met een fantasy thema." },
    { name: "Dune Imperium", imgUrl: "logo.png", description: "Dune Imperium is een strategisch bordspel gebaseerd op de Dune-verhalen." },
    { name: "1846", imgUrl: "logo.png", description: "1846 is een strategisch bordspel met een historisch thema." }
];


const toonSpellen = () => {
    const main = document.querySelector("main");

    main.innerHTML = "";

    spellen.forEach(spel => {
        const article = document.createElement("article");

        const title = document.createElement("h2");
        title.textContent = spel.name;

        const image = document.createElement("img");
        image.src = spel.imgUrl;
        image.alt = `${spel.name} het bordspel`;
        image.classList.add("afbeelding");

        const description = document.createElement("p");
        description.textContent = spel.description;

        let removeButton = document.createElement("button");
        removeButton.textContent = "Verwijder";
        removeButton.addEventListener("click", () => {
            // https://www.w3schools.com/JSREF/jsref_indexof_array.asp
            let indexCount = spellen.indexOf(spel);

            // https://www.w3schools.com/jsref/jsref_splice.asp
            spellen.splice(indexCount, 1);
            toonSpellen();
        });

        article.append(title, image, description, removeButton);
        main.append(article);
    });
}

toonSpellen();

document.getElementById("voegtoe").addEventListener("click", () => {
    // https://www.w3schools.com/jsref/prop_text_value.asp
    let naam = document.getElementById("Name").value;
    let beschrijving = document.getElementById("Description").value;
    
    spellen.push({ name: naam, imgUrl: "logo.png", description: beschrijving });
    toonSpellen();
});