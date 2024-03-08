export const getData = async (setData, setImmutableData) => {
  const res = await fetch('https://api.airtable.com/v0/apppqFYuWedozYneL/projects', {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_API_TOKEN}` },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();

  setImmutableData(result.records);
  setData(result.records);
};
