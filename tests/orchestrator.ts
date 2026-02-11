import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage);

    async function fetchStatusPage() {
      const url = "http://localhost:3000/api/v1/status";
      const response = await fetch(
        url,
        {
          method: "GET",
          headers: {
            "accept": "application/json",
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Web server is not ready. Status code: ${response.status}`);
      }

      return response;
    }
  }
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;