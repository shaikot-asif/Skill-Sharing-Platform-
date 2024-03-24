import React from "react";
import { useState } from "react";

const CommentForm = ({ btnLabel, formSubmitHandler }) => {
  const [value, setValue] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    formSubmitHandler(value);
    setValue("");
  };
  return (
    <form onSubmit={submitHandler}>
      <div className="flex flex-col items-end border border-primary rounded-lg p-4">
        <textarea
          rows="5"
          className="text-white w-full focus:outline-none bg-dark-hard"
          placeholder="Leave your comment here..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          type="submit"
          className="mt-2 px-6 py-2.5 rounded-lg bg-primary text-white font-semibold"
        >
          {btnLabel}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
