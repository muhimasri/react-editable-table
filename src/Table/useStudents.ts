import useSWR, { mutate } from 'swr';
import { Student } from './types';

const url = 'http://localhost:5000/students';

async function updateRequest(id: number, data: Student) {
  const response = await fetch(`${url}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function addRequest(data: Student) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function deleteRequest(id: number) {
  const response = await fetch(`${url}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  return response.json();
}

async function getRequest() {
  const response = await fetch(url);
  return response.json();
}

export default function useStudents() {
  const { data, isValidating } = useSWR(url, getRequest);

  const updateRow = async (id: number, postData: Student) => {
    await updateRequest(id, postData);
    mutate(url);
  };

  const deleteRow = async (id: number) => {
    await deleteRequest(id);
    mutate(url);
  };

  const addRow = async (postData: Student) => {
    await addRequest(postData);
    mutate(url);
  };

  return {
    data: data ?? [],
    isValidating,
    addRow,
    updateRow,
    deleteRow
  };
}
