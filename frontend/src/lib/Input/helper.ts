export async function getAI(question: string) {
  try {
    const response = await fetch("http://127.0.0.1:8090/ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: question,
      }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.message;
  } catch (error) {
    console.error("Error:", error);
  }
}
