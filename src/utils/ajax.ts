/**
 * Asynchronously GET a file.
 * @param {string} url The URL of the file to GET.
 * @returns {Promise<string>} The file's content.
 */
export const get = async (url: string): Promise<string> =>
  (await fetch(url)).text();

/**
 * Asynchronously POST to a file.
 * @param {string} url The URL of the file to POST to.
 * @param {Record<string, any>} data The data to POST.
 * @returns {Promise<Response>} The response.
 */
export const post = async (
  url: string,
  data: Record<string, any>
): Promise<Response> =>
  await fetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
