import { useParams } from "react-router-dom";

export function SingleGroupPage()
{
    const { id } = useParams();
    return (
        <div>
            <h1>Single Group Page</h1>
        </div>
    );
}