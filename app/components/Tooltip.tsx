import React from "react";

interface TooltipProps {
  children: React.ReactNode;
  title: string;
}

const Tooltip = ({ children, title }: TooltipProps) => {
  const [isSelected, setIsSelected] = React.useState(false);

  return (
    <div>
      <div
        onBlur={() => setIsSelected(false)}
        onFocus={() => setIsSelected(true)}
        onMouseEnter={() => setIsSelected(true)}
        onMouseLeave={() => setIsSelected(false)}
        tabIndex={0}
      >
        {children}
      </div>
      <div
        className={`${
          isSelected
            ? "animate-full-fade-in"
            : "animate-full-fade-out opacity-0"
        } mt-1.5 bg-dark-cyan rounded-xl`}
      >
        <p className="text-white px-2 py-1 tracking-widest w-full">{title}</p>
      </div>
    </div>
  );
};

export default React.memo(Tooltip);
