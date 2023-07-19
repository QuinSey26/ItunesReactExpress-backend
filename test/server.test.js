const request = require("supertest");
const app = require("../server");

describe("GET /search", () => {
  it("should return search results", async () => {
    const response = await request(app)
      .get("/search")
      .query({ term: "query", media: "media" });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Search was successful");
  });
});
