// 1. Layer erstellen
var chatLayer = new Layer("ChatGPT", "fa-solid fa-robot", 500);

// 2. Body-Container erstellen
var container = document.createElement("div");
container.style.display = "flex";
container.style.flexDirection = "column";
container.style.gap = "10px";

// 2a. Ausgabebereich
var output = document.createElement("div");
output.style.border = "1px solid #888";
output.style.padding = "10px";
output.style.height = "200px";
output.style.overflowY = "auto";
output.style.backgroundColor = "#1f1f2f";
output.style.color = "#fff";
container.appendChild(output);

// 2b. Eingabefeld
var input = document.createElement("textarea");
input.rows = 2;
input.placeholder = "Schreibe deine Frage an ChatGPT...";
input.style.resize = "none";
container.appendChild(input);

// 2c. Senden-Button
var btn = chatLayer.getButton("Senden");
btn.addEventListener("click", async () => {
    var prompt = input.value.trim();
    if (!prompt) return;

    // Toast-Meldung
    chatLayer.showInfo("Antwort wird geladen...");

    // Antwort-Bereich aktualisieren
    output.innerHTML += `<div style="color: #0af;">Du: ${prompt}</div>`;
    input.value = "";

    try {
        // ChatGPT API-Aufruf
        // HINWEIS: Hier musst du deinen eigenen API-Key einsetzen und ggf. fetch-Anpassung
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer here-your-api-key"
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [{role: "user", content: prompt}]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        output.innerHTML += `<div style="color: #afa;">ChatGPT: ${reply}</div>`;
        output.scrollTop = output.scrollHeight; // Scrollen zum neuesten Eintrag

    } catch (err) {
        output.innerHTML += `<div style="color: red;">Fehler: ${err}</div>`;
    }
});

container.appendChild(btn);

// 3. Body setzen
chatLayer.setBody(container);

// 4. Layer einfügen
chatLayer.build();

