import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function EditMode(): JSX.Element {
    const [editMode, setMode] = useState<boolean>(false);
    const [name, setName] = useState<string>("Your Name");
    const [isStudent, setIsStudent] = useState<boolean>(true);

    function updateMode(event: React.ChangeEvent<HTMLInputElement>) {
        setMode(event.target.checked);
    }

    function updateStudent(event: React.ChangeEvent<HTMLInputElement>) {
        setIsStudent(event.target.checked);
    }

    function updateName(event: React.ChangeEvent<HTMLInputElement>) {
        setName(event.target.value);
    }

    const studentCheckBox = (
        <div>
            <Form.Check
                type="checkbox"
                id="is-student-check"
                label="Student"
                checked={isStudent}
                onChange={updateStudent}
            />
        </div>
    );

    const nameTextBox = (
        <div>
            <Form.Group controlId="formName">
                <Form.Label>Your Name:</Form.Label>
                <Form.Control value={name} onChange={updateName} />
            </Form.Group>
        </div>
    );

    const editSwitch = (
        <div>
            <Form.Check
                type="switch"
                id="in-edit-mode-check"
                label="Edit"
                checked={editMode}
                onChange={updateMode}
            />
        </div>
    );

    return (
        <div>
            <h3>Edit Mode</h3>
            <div>
                {name} {isStudent ? "is" : "is not"} a student.
                {editSwitch}
                {editMode ? (
                    <div>
                        {studentCheckBox} {nameTextBox}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
