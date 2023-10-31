import { passId, passObject, passIdObject } from "./root";
import config from '../config';

export const tagStore = {
    id: null,
    name: null,
    describtion: null
}

const ipv4 = config.serverIP;
const createTagRoute = 'http://' + ipv4 + ':3001/api/tag';
const deleteTagRoute = 'http://' + ipv4 + ':3001/api/tag';
const updateTagRoute = 'http://' + ipv4 + ':3001/api/tag';
const getTagRoute = 'http://' + ipv4 + ':3001/api/tag';

export const tagsStore = {
    tags: []
}

export async function createTag(imp, object)
{
    const tag = await passObject(createTagRoute, object, 'POST');
    imp.set.tagStore(tag);
    return tag;
}

export async function deleteTag(imp, tagId)
{
    const tag = await passId(deleteTagRoute, tagId, 'DELETE');
    imp.set.tagStore(tag);
    return tag;
}

export async function updateTag(imp, tagId, object)
{
    const tag = await passIdObject(updateTagRoute, tagId, object, 'PUT');
    imp.set.tagStore(tag);
    return tag;
}

export async function getTag(imp, tagId)
{
    const tag = await passId(getTagRoute, tagId, 'GET');
    imp.set.tagStore(tag);
    return tag;
}	