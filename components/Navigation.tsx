import { cn } from "@/lib/utils";

export default function Navigation() {
  return (
    <nav className="flex w-full flex-grow justify-between">
      <ul className="hidden sm:flex">
        <li className="group">
          <a href="#">Features</a>
          <ul className="hidden group-hover:block">
            <li className="">
              <a href="">Todo List</a>
            </li>
            <li className="">
              <a href="">Calendar</a>
            </li>
            <li className="">
              <a href="">Reminders</a>
            </li>
            <li className="">
              <a href="">Planning</a>
            </li>
          </ul>
        </li>
        <li className="group">
          <a href="#">Company</a>
          <ul className="hidden group-hover:block">
            <li className="">
              <a href="">History</a>
            </li>
            <li className="">
              <a href="">Our Team</a>
            </li>
            <li className="">
              <a href="">Blog</a>
            </li>
          </ul>
        </li>
        <li className="">
          <a href="#">Careers</a>
        </li>
        <li className="">
          <a href="#">About</a>
        </li>
      </ul>
      <ul className="hidden sm:flex">
        <li className="">
          <a href="#">Login</a>
        </li>
        <li className="">
          <a href="#">Register</a>
        </li>
      </ul>
      <button
        className={cn(
          "ml-auto h-[22px] w-8 self-end bg-[url('/images/icon-menu.svg')] bg-no-repeat",
        )}
      ></button>
    </nav>
  );
}
