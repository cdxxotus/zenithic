import { get, post } from "../../utils/ajax";

describe("get", () => {
  test("fetches the content of a file", async () => {
    const url = "https://example.com/file.txt";
    const expected = "Hello, world!";

    // Mock the fetch function to return a Response object with the expected content
    global.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ status: 200, body: expected, text: () => expected })
      );

    const result = await get(url);

    expect(result).toBe(expected);
  });
});

describe("post", () => {
  test("sends data to a URL", async () => {
    const url = "https://example.com/post";
    const data = { message: "Hello, world!" };
    const expectedStatus = 200;

    // Mock the fetch function to return a Response object with the expected status
    global.fetch = jest
      .fn()
      .mockImplementation(() =>
        Promise.resolve({ body: "", status: expectedStatus })
      );

    const response = await post(url, data);

    expect(response.status).toBe(expectedStatus);
  });
});
