import { type ReactElement } from "react";
import ThemeSwitcher from "~/app/_components/ThemeSwitcher";

export default function Layout({ children }): ReactElement {
  return (
    <>
      <ThemeSwitcher className="fixed top-10 right-20" />
      {children}
    </>
  );
}
