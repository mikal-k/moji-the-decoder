const request = require("supertest");
const app = require("../moji.js");

// Define the expected response body of the new feature endpoint
const expectedBody = {
  // The exact content depends on the specific response structure of the new feature endpoint
  // For example, if the endpoint returns a JSON object with a "message" field, the expectedBody could be:
  message: "Expected message",
};

describe("Test the new feature", () => {
  test("It should return 200 OK", async () => {
    const response = await request(app).get("/new-feature");
    expect(response.statusCode).toBe(200);
  });

  test("It should return the correct body", async () => {
    const response = await request(app).get("/new-feature");
    expect(response.body).toEqual(expectedBody);
  });

  test("It should set the correct headers", async () => {
    const response = await request(app).get("/new-feature");
    expect(response.headers["content-type"]).toBe("application/json");
  });

  test("It should respond within acceptable time", async () => {
    const response = await request(app).get("/new-feature");
    expect(response.duration).toBeLessThan(500);
  });
});

afterAll(() => {
  app.close();
});
