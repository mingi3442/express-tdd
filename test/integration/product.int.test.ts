import supertest from "supertest";
import { app } from "../../src/server";

const mockProductData = {
  name: "e2e Product",
  description: "Product 1 description",
  price: 100,
};

describe("Product", () => {
  test("POST /products", async () => {
    const responseData = await supertest(app)
      .post("/product")
      .send({ ...mockProductData });
    expect(responseData.status).toEqual(201);
    expect(responseData.body).toHaveProperty("_id");
    expect(responseData.body).toHaveProperty("name", mockProductData.name);
    expect(responseData.body.description).toBe(mockProductData.description);
  });
  test("should return 500 on POST /product", async () => {
    const responseData = await supertest(app).post("/product").send({ name: "e2e Product" });
    expect(responseData.status).toEqual(500);
    expect(responseData.body).toHaveProperty("message", "Product validation failed: description: Path `description` is required.");
  });
});
