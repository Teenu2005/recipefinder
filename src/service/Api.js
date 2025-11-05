const BASE_URL = import.meta.env.VITE_API_BASE_URL;


//This Helper function is for fetcing data from api Without JWT token
export async function fetchDatas(endpoint) {
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

//This Helper function is for fetcing data from api With JWT token
export async function fetchDatasAuth(endpoint) {
  try {
    const token = localStorage.getItem("token"); // Get saved JWT
    if (!token) throw new Error("No token found. Please login first.");
    // get the endpoin url from each component based on its requirement
    const res = await fetch(`${BASE_URL}${endpoint}`,{
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Attach token
      }});
    if (!res.ok) throw new Error("API error");
    // return dat fetched data
    return await res.json();
  } catch (error) {
    console.error("API Error:", error);
    return null;
  }
}

// Helper for POST requests
async function postData(endpoint, body, isFormData = false) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: isFormData ? {} : { "Content-Type": "application/json" },
      body: isFormData ? body : JSON.stringify(body),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "API error");
    }

    return await res.json();
  } catch (error) {
    console.error(`POST ${endpoint} error:`, error);
    return { success: false, error: error.message };
  }
}

//This Helper function is for Delete Method With Auth(JWT)
export async function deleteDataAuth(endpoint) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found. Please login first.");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || `Request failed with status ${res.status}`);
    }

    return { success: true };
  } catch (error) {
    console.error(`DELETE ${endpoint} (Auth) error:`, error);
    return { success: false, error: error.message };
  }
}

//This Helper Function is for Post With Auth
export async function postDataAuth(endpoint, body) {
  try {
    const token = localStorage.getItem("token"); // Get saved JWT
    if (!token) throw new Error("No token found. Please login first.");

    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, // Attach token
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        console.error("Non-JSON response:", text);
      }
    }

    if (!res.ok) {
      throw new Error(data?.error || `Request failed with status ${res.status}`);
    }

    return data;
  } catch (error) {
    console.error(`POST ${endpoint} (Auth) error:`, error);
    return { success: false, error: error.message };
  }
}
// Upload image
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("fileimg", file);

  const response = await postData("/recipebook/Upload/image", formData, true);
  return response;
}

//  Register user
export async function registerUser(body) {
  return await postData("/recipebook/User/Auth/register", body);
}

// Login user
export async function loginUser(body) {
  return await postData("/recipebook/User/Auth/login", body);
}

//Put method with Auth
// Api.js

export const putDataAuth = async (endpoint, body) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const error = await res.text();
      throw new Error(`Error ${res.status}: ${error}`);
    }

    return await res.json();
  } catch (err) {
    console.error("API PUT Error:", err);
    throw err;
  }
};

