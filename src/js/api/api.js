const key = "gzilERPSlsUCUvtZU7Bb8mgVjpdYPEBZgszDHb6h";

async function ProcessApi(
  url,
  options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
) {
  try {
    const res = await fetch(url, options);

    return res.json();
  } catch (error) {
    console.log(`API Exception : ${error}`);
  }
}

const api = {
  ProcessApi,
  key,
};

export default api;
