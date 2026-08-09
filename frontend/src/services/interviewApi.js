const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";


async function handleResponse(response) {

  if (!response.ok) {

    const text =
      await response.text();

    throw new Error(
      `Interview API failed (${response.status}): ${text}`
    );
  }

  return response.json();
}


export async function startInterview(
  sessionId,
  candidate
) {

  const response =
    await fetch(
      `${API_URL}/api/interview`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          sessionId,
          candidate
        })
      }
    );


  return handleResponse(response);
}


export async function sendAnswer(
  sessionId,
  message
) {

  const response =
    await fetch(
      `${API_URL}/api/interview`,
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body: JSON.stringify({
          sessionId,
          message
        })
      }
    );


  return handleResponse(response);
}