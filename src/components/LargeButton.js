import React from "react";
import Button from "@material-tailwind/react/Button";

export default function LargeButton() {
    return (
        <Button
            color="lightBlue"
            buttonType="outline"
            size="lg"
            rounded={false}
            block={false}
            iconOnly={false}
            ripple="dark"
        >
            Announcement
        </Button>
    )
}