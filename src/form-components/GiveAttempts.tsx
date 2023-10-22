import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export function GiveAttempts(): JSX.Element {
    const [numAttempts, setAttempts] = useState<number>(3);
    const [requested, setRequested] = useState<string>("");

    function decAttempts(): void {
        setAttempts(numAttempts - 1);
    }

    function incAttempts(): void {
        if (parseInt(requested)) {
            setAttempts(numAttempts + parseInt(requested));
        } else {
            setAttempts(numAttempts);
        }
    }

    return (
        <div>
            <h3>Give Attempts</h3>
            <Form.Group controlId="formRequestedAttempts">
                <Form.Label>Requested Number of Attempts:</Form.Label>
                <Form.Control
                    type="number"
                    value={requested}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setRequested(event.target.value)
                    }
                />
            </Form.Group>
            <Button onClick={decAttempts} disabled={numAttempts === 0}>
                use
            </Button>
            <Button onClick={incAttempts}>gain</Button>
            <div>Attempts Remaining: {numAttempts}</div>
        </div>
    );
}
