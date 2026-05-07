import type { LoaderFunction } from "react-router";
import { redirect } from "react-router";

export const loader: LoaderFunction = () => {
  return redirect("/dsii");
};

export default function Index() {
  return (
    // bg color - 242 239 232 - #f2efe8
    // For dark theme? 2f363b - 47 54 59
    <div className="">
      <svg />
    </div>
  );
}
