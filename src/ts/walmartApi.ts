export interface UpcResponse {
    total: number;
    result: WalmartItem[];
}

export interface WalmartItem {
    name: string;
    sku: string;
    img: string;
    href: string;
    images: string[];
    upc: string;
    feat: string;
    desc: string;
    spec: string;
}

export const loadUpcData = async (upc: string): Promise<UpcResponse> => {
    const url = `https://stocktrack.ca/wm/search.php?n=1&p=1&t=upc&q=${upc}`;
    const res = await fetch(url, {
        redirect: 'follow',
    });
    return await res.json();
};

