document
  .getElementById("itineraryForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const place = document.getElementById("place").value;
    const itineraryOutput = document.getElementById("itineraryOutput");

    itineraryOutput.textContent = "Generating itinerary...";

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
          body: JSON.stringify({
            model: "gpt-4",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              {
                role: "user",
                content: `Create a 4-day itinerary for a trip to ${place}.`,
              },
            ],
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
          }),
        }
      );

      const data = await response.json();
      const itinerary = data.choices[0].message.content;
      itineraryOutput.textContent = itinerary;
    } catch (error) {
      itineraryOutput.textContent =
        "Error generating itinerary. Please try again.";
    }
  });
