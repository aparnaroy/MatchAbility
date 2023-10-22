import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { QuestionType } from "../interfaces/question";

export function ChangeType(): JSX.Element {
    const [qType, changeType] = useState<QuestionType>("short_answer_question");

    function changeQType(): void {
        if (qType === "short_answer_question") {
            changeType("multiple_choice_question");
        } else {
            changeType("short_answer_question");
        }
    }
    return (
        <div>
            <Button onClick={changeQType}>Change Type</Button>
            {qType === "short_answer_question" ? (
                <span> Short Answer</span>
            ) : (
                <span> Multiple Choice</span>
            )}
        </div>
    );
}
