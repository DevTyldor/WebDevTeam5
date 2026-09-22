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

        article.append(title, image, description);
        main.append(article);
    });
}

toonSpellen();

document.getElementById("voegtoe").addEventListener("click", () => {
    let name = document.getElementById("Name").value;
    let description = document.getElementById("Description").value;

    if (!name || !description) {
        alert("Empty name and/or description");
        return;
    }

    const main = document.querySelector("main");

    const article = document.createElement("article");

    const title = document.createElement("h2");
    title.textContent = name;

    const image = document.createElement("img");
    image.src = spellen[0].imgUrl;
    image.alt = `${name} het bordspel`;
    image.classList.add("afbeelding");

    const Description = document.createElement("p");
    Description.textContent = description;

    article.append(title, image, Description);
    main.append(article);
    alert("Het spel is toegevoegd!");
});