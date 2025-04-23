export type DocType = {
    id?: string;
    title: string;
    type: string;
    content: string;
    siteId: string;
    updatedAt: string;
    publicId?: string;
};

export type SiteType = {
    id?: string;
    name: string;
    domain: string;
    language: string;
    legislation: string;
    ownerId?: string;
    observations?: string;
};

export type PlanType = {
    id?: string;
    name: string;
    price: string;
    description: string;
}

export type UserType = {
    id?: string;
    name: string;
    email: string;
    password?: string;
    lastLogin: string;
    plan?: PlanType;
    sites?: SiteType[];
};

export type InvoicesType = {
    id: string;
    stripeInvoiceId: string;
    amountDue: number;
    amountPaid: number;
    status: string;
    dueDate?: string;
    createdAt: string;
}

export type SubscriptionType = {
    id: string;
    status: string;
    currentPeriodEnd: string;
    cancelAtPeriodEnd: boolean;
}

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
    console.log(url);
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

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

export async function deleteWithAuth(url: string, token: string) {
    const res = await fetch(url, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (!res.ok) throw new Error('Error ao deletar dados');
    return res.json();
}
