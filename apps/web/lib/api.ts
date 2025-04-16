export type DocType = {
  id?: string;
  type: string;
  content: string;
  siteId: string;
  updatedAt: string;
};

export type SiteType = {
  id?: string;
  name: string;
  domain: string;
  language: string;
  legislation: string;
  ownerId?: string;
};

export async function fetcher(url: string, token: string) {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error('Error ao buscar dados');

  return res.json();
}

export async function postWithAuth(url: string, data: unknown, token: string) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error ao enviar dados');
  return res.json();
}

export async function putWithAuth(url: string, data: unknown, token: string) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error('Error ao atualizar dados');
  return res.json();
}
