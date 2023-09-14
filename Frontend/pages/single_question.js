import { useParams } from "react-router-dom";

export function SingleQuestionPage()
{
    const { id } = useParams();
    return (
        <div>
            <h1>Single Group Page</h1>
        </div>
    );
}