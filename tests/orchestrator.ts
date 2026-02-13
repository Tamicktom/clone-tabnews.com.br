import retry from "async-retry";

const RETRIES = 10;
const MAX_TIMEOUT = 1_000;

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, { retries: RETRIES, maxTimeout: MAX_TIMEOUT });

    async function fetchStatusPage(_bail: unknown, attempt: number) {
      console.log(`Checking if web server is ready (attempt ${attempt})...`);
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