import React, { useState } from "react";
import { Button } from "react-bootstrap";

// Holidays: Christmas 🎄, Diwali 🪔, Halloween 🎃, Fourth of July 🎆, Holi 🎨

export function CycleHoliday(): JSX.Element {
    type Holiday = "🎄" | "🪔" | "🎃" | "🎆" | "🎨";
    const [holiday, changeHoliday] = useState<Holiday>("🎄");

    // Order: 🎄 🪔 🎆 🎃 🎨
    const ALPHABETICALLY: Record<Holiday, Holiday> = {
        "🎄": "🪔",
        "🪔": "🎆",
        "🎆": "🎃",
        "🎃": "🎨",
        "🎨": "🎄"
    };

    // Order: 🎨 🎆 🎃 🪔 🎄
    const YEARLY: Record<Holiday, Holiday> = {
        "🎨": "🎆",
        "🎆": "🎃",
        "🎃": "🪔",
        "🪔": "🎄",
        "🎄": "🎨"
    };

    function changeAlphabetically(): void {
        const nextHoliday = ALPHABETICALLY[holiday];
        changeHoliday(nextHoliday);
    }

    function changeYearly(): void {
        const nextHoliday = YEARLY[holiday];
        changeHoliday(nextHoliday);
    }

    return (
        <div>
            <Button onClick={changeAlphabetically}>Advance by Alphabet</Button>
            <Button onClick={changeYearly}>Advance by Year</Button>
            {<div>Holiday: {holiday}</div>}
        </div>
    );
}
