import request from "supertest";
import app from "../src/app";

describe("GET /random-url", () => {
    it("should return 404", (done) => {
        request(app).get("/random-url")
            .expect(404, done);
    });
});

describe("GET /panel", () => {
    it("should return 302 Found for redirection", () => {
        return request(app).get("/panel")
            .expect(302);
    });
});