import { motion } from "motion/react";
import "../CSS/button.css";

/**
 * There was really no need for this, but I still made it in case I add more features to the button.
 *
 * @description
 * Variants:
 *
 * 1. `elevated-drop` - Used for Logout.
 * 2. `icon-add` - Used for add button.
 * 3. `button-completed` - Used for "Undo" button.
 * 4. `button-failed` - Used for "Delete" on task failure.
 * 5. `button-pending` - Used for "Mark Done" button on task pending.
 * 6. `button-important` - Used for "Delete" on normal non-failure state.
 *
 * @param {"elevated-drop" | "icon-add" | "button-completed" | "button-failed" | "button-pending" | "button-important"} varient
 * The button variant.
 *
 * @returns {JSX.Element} A simple button.
 */
export function AppButton({
  children,
  varient = "button-pending",
  onClick = () => {
    console.warn("Unassigned button");
  },
}) {
  return (
    <button className={varient} onClick={onClick}>
      {children}
    </button>
  );
}
