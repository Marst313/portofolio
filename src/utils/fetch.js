export const getData = async (setData, setImmutableData) => {
  const res = await fetch('https://api.airtable.com/v0/apppqFYuWedozYneL/projects', {
    method: 'GET',
    headers: { Authorization: 'Bearer patYWnGkYc0v5L53O.81a721ab976a6dd2fd2bd79487887ad9ad69dc6bd94941c659ffac9c6279781b' },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();

  setImmutableData(result.records);
  setData(result.records);
};
