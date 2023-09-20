// Temp: Redux store
// createProperty, updateProperty, getProperty, getProperties, rootSlice
import { createSlice } from '@reduxjs/toolkit';

export async function passObject(url, object, requestMethod, func = async () => {})
{
    try {
        await func();
        const response = await fetch(url, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(object),
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

export async function passId(url, id, requestMethod, func = async () => {})
{
    try {
        await func();
        const response = await fetch(`${url}/${id}`, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
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

export async function passNone(url, requestMethod, func = async () => {})
{
    try {
        await func();
        const response = await fetch(url, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
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

