export async function passId(route, id, requestMethod)
{
    try 
    {
        const response = await fetch(`${route}/${id}`, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) 
        {
            const data = await response.json();
            return data;
            
        }
        throw new Error(data);
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
}

export async function passObject(route, object, requestMethod)
{
    try 
    {
        const response = await fetch(route, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
            body: object,
        });
        if (response.ok) 
        {
            const data = await response.json();
            return data;
            
        }
        throw new Error(data);
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
}

export async function passNone(route, requestMethod)
{
    try 
    {
        const response = await fetch(route, {
            method: requestMethod,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) 
        {
            const data = await response.json();
            return data;
            
        }
        throw new Error(data);
    } 
    catch (error) 
    {
        throw new Error(error.message);
    }
}