import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
    const { id } = params;
    console.log(id,id,id,id);
    return { id };
}