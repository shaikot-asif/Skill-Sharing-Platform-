import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavItemCollapse = ({
  title,
  content,
  icon,
  name,
  activeNavName,
  setActiveNavName,
}) => {
  const [isChecked, setIsCheckd] = useState(false);
  useEffect(() => {
    if (activeNavName !== name) {
      setIsCheckd(false);
    }
  }, [activeNavName, name]);

  return (
    <div className="collapse collapse-arrow bg-base-200 min-h-0 rounded-none py-2">
      <input
        type="checkbox"
        className="min-h-0 py-0"
        checked={name === activeNavName}
        onChange={() => {
          setActiveNavName(name);
          setIsCheckd(!isChecked);
        }}
      />
      <div
        className={`flex items-center gap-2 collapse-title text-xl font-medium py-0 pl-0 ${name === activeNavName ? "font-bold text-primary" : "font-semibold text-white"}`}
      >
        {icon}
        {title}
      </div>
      <div className="collapse-content">
        <div className="mt-2 flex flex-col gap-y-2 text-white">
          {content.map((item) => (
            <Link key={item.link} to={item.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavItemCollapse;
