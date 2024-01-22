import { ProductController } from "../../src/controller";
import { Product } from "../../src/models/Product";
import httpMocks from "node-mocks-http";

const mockProductData = {
  name: "Product 1",
  description: "Product 1 description",
  price: 100,
};

describe("Product Controller Create", () => {
  Product.create = jest.fn();
  const request = httpMocks.createRequest();
  const response = httpMocks.createResponse();
  const next = jest.fn();
  beforeEach(() => {
    request.body = mockProductData;
  });
  test("Should have a createProduct function", () => {
    expect(typeof ProductController.createProduct).toBe("function");
  });
  test("Should call ProductModel.create", async () => {
    ProductController.createProduct(request, response);
    await expect(Product.create).toHaveBeenCalled();
    await expect(Product.create).toHaveBeenCalledWith(request.body);
  });
  test("should return 201 response code", async () => {
    await ProductController.createProduct(request, response);
    // Response status code 확인
    expect(response.statusCode).toBe(201);
    // Send가 정상적으로 호출되었는지 확인
    expect(response._isEndCalled()).toBeTruthy();
  });
  test("should return json body in response", async () => {
    (Product.create as jest.Mock).mockReturnValue(mockProductData);
    await ProductController.createProduct(request, response);
    expect(response._getJSONData()).toStrictEqual(mockProductData);
  });
  test("should handle errors", async () => {
    const errorMessage = { message: "description property missing" };
    const rejectedPromise = Promise.reject(errorMessage);
    (Product.create as jest.Mock).mockReturnValue(rejectedPromise);
    await ProductController.createProduct(request, response, next);
    expect(next).toBeCalledWith(errorMessage);
  });
});
