import React, { useState } from "react";
import { Form } from "react-bootstrap";

export function ChangeColor(): JSX.Element {
    const COLORS = [
        "red",
        "blue",
        "green",
        "orange",
        "purple",
        "yellow",
        "cyan",
        "pink",
        "teal"
    ];
    const DEFAULT_COLOR = COLORS[0];
    const [color, setColor] = useState<string>(DEFAULT_COLOR);

    const colorRadioButtons = COLORS.map((c: string) => (
        <Form.Check
            inline
            key={c}
            type="radio"
            name="color response"
            onChange={(event) => setColor(event.target.value)}
            id="color"
            label={c}
            value={c}
            checked={color === c}
        />
    ));

    return (
        <div>
            <h3>Change Color</h3>
            {colorRadioButtons}
            <div>
                You have chosen{" "}
                <span
                    data-testid="colored-box"
                    style={{
                        backgroundColor: color
                    }}
                >
                    {color}
                </span>
                {"."}
            </div>
        </div>
    );
}
