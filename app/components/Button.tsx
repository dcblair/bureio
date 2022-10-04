import * as React from "react";

interface ButtonProps {}

const Button = (props: ButtonProps) => {
  return <button {...props} />;
};

export default React.memo(Button);
