import React, { useState } from "react";
import { Button } from "react-bootstrap";

export function StartAttempt(): JSX.Element {
    const [numAttempts, changeNumAttempts] = useState<number>(4);
    const [inProgress, changeInProgress] = useState<boolean>(false);

    function useAttempt(): void {
        changeNumAttempts(numAttempts - 1);
    }

    function addAttempt(): void {
        changeNumAttempts(numAttempts + 1);
    }

    function changeProgress(): void {
        changeInProgress(!inProgress);
    }

    function both(): void {
        useAttempt();
        changeProgress();
    }

    const isInProgress =
        inProgress === true ? "Quiz: In Progress" : "Quiz: Not In Progress";

    return (
        <div>
            <Button onClick={both} disabled={inProgress || numAttempts === 0}>
                Start Quiz
            </Button>
            <Button onClick={changeProgress} disabled={!inProgress}>
                Stop Quiz
            </Button>
            <Button onClick={addAttempt} disabled={inProgress}>
                Mulligan
            </Button>
            <br></br>
            <br></br>
            <div>{isInProgress}</div>
            <div>Attempts Left: {numAttempts}</div>
        </div>
    );
}
