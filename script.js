document.getElementById('gamertagForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent form from reloading page

    const gamertag = document.getElementById('gamertag').value;
    const apiURL = `https://api.geysermc.org/v2/xbox/xuid/${gamertag}`;
    const resultElement = document.getElementById('result');

    try {
        // Fetch XUID from Geyser API
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error('Gamertag not found or API error');

        const data = await response.json();
        const xuid = data.xuid;

        // Generate Floodgate UUID
        const floodgateUUID = `00000000-0000-0000-${xuid.slice(0, 4)}-${xuid.slice(4)}`;
        resultElement.textContent = `Floodgate UUID: ${floodgateUUID}`;
    } catch (error) {
        resultElement.textContent = `Error: ${error.message}`;
    }
});