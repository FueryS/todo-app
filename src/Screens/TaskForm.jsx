import React, { useState } from "react";
import { animationsSimple } from "../Theme/animation";

import { motion, AnimatePresence } from "framer-motion";
import "./Global.css";
import toast from "react-hot-toast";
import { option } from "framer-motion/client";
import { addTask } from "../Services/taskService";
import { autoSize } from "../Services/Helpers/Formatting";

function TaskForm({ visible = false, hide }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const onSubmit = async () => {
    // Perform Checks
    if (date < new Date().toISOString().split("T")[0]) {
      setDate(new Date().toISOString().split("T")[0]);
      return toast.error("Date cant be past, Auto setting it to today.");
    }
    if (title.trim() === "") return toast.error("Title can't be empty.");

    // Accept changes and add task
    const toastId = toast.loading("Creating task...");

    const result = await addTask(title, body, date);

    if (result.success) {
      toast.success(result.message, { id: toastId });
      hide();
    } else {
      toast.error(result.message, { id: toastId });
    }

    setTitle("");
    setBody("");
    setDate(new Date().toISOString().split("T")[0]);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="back-drop"
          onClick={hide}
          variants={animationsSimple.fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.div
            className="AddForm-container"
            variants={animationsSimple.slideUp}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* INSIDE */}
            <motion.input
              className="input title-input"
              type="text"
              value={title}
              placeholder="Title"
              maxLength={30}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></motion.input>
            <motion.textarea
              className="input body-input"
              value={body}
              placeholder="Message for yourself"
              maxLength={500}
              onChange={(e) => {
                setBody(e.target.value);
              }}
              onInput={(e) => autoSize(e.target, 10, 100)}
            ></motion.textarea>
            <motion.input
              className="input date-input"
              value={date}
              type="date"
              placeholder={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            ></motion.input>
            <motion.button className="input submit-button" onClick={onSubmit}>
              Add Task
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TaskForm;
