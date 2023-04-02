/*********************************************************************************
*  WEB422 – Assignment 6
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. 
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Akezhan Kaliyev Student ID: 1255988212 Date: 19.03.2023
*
*
********************************************************************************/ 
import { getToken } from "@/lib/authenticate";

export async function addToFavourites(id) {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    const headers = {
        Authorization: `JWT ${token}`, 'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {method: 'PUT', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function removeFromFavourites(id) {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`;
    const headers = {
        Authorization: `JWT ${token}`, 'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {method: 'DELETE', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getFavourites() {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/favourites`;
    const headers = {
        Authorization: `JWT ${token}`, 'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {method: 'GET', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function addToHistory(id) {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    const headers = {
        Authorization: `JWT ${token}`, 'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {method: 'PUT', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function removeFromHistory(id) {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/history/${id}`;
    const headers = {
        Authorization: `JWT ${token}`, 'Content-Type': 'application/json',
    };
    try {
        const response = await fetch(apiUrl, {method: 'DELETE', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getHistory() {
    const token = await getToken();
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/history`;
    const headers = {
        Authorization: `JWT ${token}`,'Content-Type': 'application/json',};
    try {
        const response = await fetch(apiUrl, {method: 'GET', headers,});
        if (response.status === 200) {
            const data = await response.json();
            return data;
        }
        return [];
    } catch (error) {
        console.error(error);
        return [];
    }
}