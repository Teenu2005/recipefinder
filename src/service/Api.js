const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchData(endpoint) {
  try {
    // get the endpoin url from each component based on its requirement
    const res = await fetch(`${BASE_URL}${endpoint}`);
    if (!res.ok) throw new Error("API error");
    // return dat fetched data
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}
