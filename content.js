let combinedText = ""; // Initialize a string to hold all copied text

// Log when the content script is loaded
console.log("Content script loaded.");

// Listen for keydown events to handle copy and paste
document.addEventListener("keydown", async (event) => {
    console.log(`Key pressed: ${event.key}`); // Log the key pressed
    if (event.ctrlKey && event.key.toLowerCase() === "c") {
        try {
            const copiedData = await navigator.clipboard.readText();
            if (copiedData) {
                // Append the copied data to the combinedText string
                combinedText += (combinedText ? "\n" : "") + copiedData; // Add a newline if combinedText is not empty
                console.log("Combined text:", combinedText); // Log the combined text
            }
        } catch (error) {
            console.error("Failed to read clipboard contents: ", error);
        }
    }

    if (event.ctrlKey && event.key.toLowerCase() === "v") {
        // Write the combined text to the clipboard
        navigator.clipboard.writeText(combinedText).then(() => {
            console.log("Pasted combined data:", combinedText);
            // Optionally, clear the combinedText after pasting
            combinedText = ""; // Uncomment this line if you want to clear after pasting
        }).catch(error => {
            console.error("Failed to write to clipboard: ", error);
        });
    }
});