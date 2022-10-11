import fetch from 'isomorphic-unfetch';

export const get = async (url: string) => {
  try {
    const response = await fetch(url, { method: 'GET' });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const post = async (url: string, payload: any) => {
  try {
    const response = await fetch(url, { 
      method: 'POST',
      body: JSON.stringify(payload),
      headers: new Headers({
        'accept': 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${payload._boundary}`,
      }),
    });
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};
