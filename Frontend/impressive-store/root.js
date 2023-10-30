export async function passId(route, id, requestMethod) {
  try {
    const response = await fetch(route + "/" + id, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Request failed with status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function passObject(route, object, requestMethod) {
  try {
    //console.log(route, object, requestMethod);
    console.log("Pass Objekt mehtod:" + requestMethod);
    const response = await fetch(route, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Request failed with status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function passIdObject(route, id, object, requestMethod) {
  try {
    const response = await fetch(`${route}/${id}`, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(object),
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Request failed with status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function passNone(route, requestMethod) {
  try {
    const response = await fetch(route, {
      method: requestMethod,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(
        `Request failed with status: ${response.status} - ${response.statusText}`
      );
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
