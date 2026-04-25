const API_BASE_URL = (process.env.REACT_APP_API_URL || 'http://localhost:8000').replace(/\/$/, '');

export { API_BASE_URL };

export const sendDataToServer = async (history) => {
  try {
    const token = localStorage.getItem('token');

    const res = await fetch(
      `${API_BASE_URL}/V1/milkdata/addMilkData`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(history)
      }
    );

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error('API Error', error);
  }
};

const findFirstArrayOfObjects = (value) => {
    if (Array.isArray(value)) {
        if (value.length === 0) return value;
        if (value.every((item) => item && typeof item === 'object' && !Array.isArray(item))) {
            return value;
        }
        for (const item of value) {
            const result = findFirstArrayOfObjects(item);
            if (result) return result;
        }
        return value;
    }

    if (value && typeof value === 'object') {
        for (const key of Object.keys(value)) {
            const result = findFirstArrayOfObjects(value[key]);
            if (result) return result;
        }
    }

    return null;
};

export const getDataFromServer=async()=>{
    try {
        const token = localStorage.getItem('token');

        const res = await fetch(`${API_BASE_URL}/V1/milkdata/getMilkData`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!res.ok) {
            throw new Error(`Server error: ${res.status}`);
        }

        const response = await res.json();
        const dataArray = findFirstArrayOfObjects(response);
        return Array.isArray(dataArray) ? dataArray : [];

    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}
