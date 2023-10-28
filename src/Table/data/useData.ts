import useSWR, { mutate } from 'swr';
import { Student } from './types';

// Function to handle POST requests
async function updateRequest(url: string, data: Student) {
  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(url: string, data: Student) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(url: string) {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

async function getRequest(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network response was not ok ' + response.statusText);
  }
  return response.json();
}

// Custom hook to handle data fetching and posting
export default function useData(url: string) {
  const { data, isLoading, isValidating } = useSWR(url, getRequest);

  const updateRow = async (id: number, postData: Student) => {
    await updateRequest(`${url}/${id}`, postData);
    mutate(url);
  };

  const deleteRow = async (id: number) => {
    await deleteRequest(`${url}/${id}`);
    mutate(url);
  };

  const addRow = async (postData: Student) => {
    await addRequest(`${url}`, postData);
    mutate(url);
  };

  return {
    data: isLoading ? [] : data,
    isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
