// Temp: Redux store
// createProperty, updateProperty, getProperty, getProperties, rootSlice
import { createSlice } from '@reduxjs/toolkit';

export async function createProperty(url, property) 
{
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateProperty(url, property) 
{
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(property),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    }
    catch  (error) {
        throw new Error(error.message);
    }
}

export async function getProperty(url, propertyId)
{
    try {
        const response = await fetch(`${url}/${propertyId}`);
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getProperties(url, propertyIds)
{
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(propertyIds),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        throw new Error(data);
    } catch (error) {
        throw new Error(error.message);
    }
}

export function createRootSlice(sliceName, initialState, asyncReducers)
{
    return createSlice({
        name: sliceName,
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            for (const asyncReducer of asyncReducers)
            {
                builder.addCase(asyncReducer.pending, (state) => {
                    state.status = 'loading';
                });
                builder.addCase(asyncReducer.fulfilled, (action) => {
                    state = action.payload;
                });
                builder.addCase(asyncReducer.rejected, (state, action) => {
                    state.error = action.payload;
                    state.status = 'failed';
                });
            }
        }
    }); 
};

