import {
  sendDataToServer,
  getDataFromServer,
} from "../API/api"; // your API file

// ✅ wrapper for saving
export const saveHistory = async ({
  startTime,
  endTime,
  duration,
  quantity,
}) => {
  try {
    const payload = {
      startTime,
      endTime,
      duration,
      quantity,
    };

    const response = await sendDataToServer(payload); // ✅ reuse
    return response;
  } catch (error) {
    console.error("saveHistory error:", error);
    return null;
  }
};

// ✅ wrapper for fetching
export const getHistory = async () => {
  try {
    const data = await getDataFromServer(); // ✅ reuse

    if (Array.isArray(data)) {
      return data;
    }

    if (data?.data && Array.isArray(data.data)) {
      return data.data;
    }

    if (data?.data?.data && Array.isArray(data.data.data)) {
      return data.data.data;
    }

    console.warn("getHistory returned unexpected data shape:", data);
    return [];
  } catch (error) {
    console.error("getHistory error:", error);
    return [];
  }
};