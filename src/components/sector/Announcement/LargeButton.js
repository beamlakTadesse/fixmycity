import React from "react";
import Button from "@material-tailwind/react/Button";

// export default function LargeButton({handler}) {
//     return (
//         <Button
//             color="lightBlue"
//             buttonType="outline"
//             size="lg"
//             rounded={false}
//             onClick = {() => console.log("Clicked!")}
//             block={false}
//             iconOnly={false}
//             ripple="dark"
//         >
//             Post Announcement
//         </Button>
//     )
// }


// import React from "react";
import PropTypes from "prop-types";

const LargeButton = ({ buttonStyle, type, text, handleClick }) => {
    const roundedButtonClassNames =
  "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"

const outlineButtonClassNames =
  "bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"

const disabledButtonClassNames =
  "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed"
  return (
    <div className="p-1">
      <button
        className={buttonStyle === "rounded"
        ? roundedButtonClassNames
        : buttonStyle === "outline"
        ? outlineButtonClassNames
        : buttonStyle === "disabled"
        ? disabledButtonClassNames
        : null}
        onClick={handleClick}
        type={type}
      >
        {text}
      </button>
    </div>
  );};

export default Button;