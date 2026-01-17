const key = "gzilERPSlsUCUvtZU7Bb8mgVjpdYPEBZgszDHb6h";

async function ProcessApi(url) {
  try {
    const res = await fetch(url);

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
