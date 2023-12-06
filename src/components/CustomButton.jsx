import React from "react";

function CustomButton({ label, cls, clickHandler }) {
  return (
    <div className={cls} onClick={() => clickHandler(label)}>
      {label}
    </div>
  );
}

export default CustomButton;
