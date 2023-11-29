import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function BackButton({ destination = "/" }) {
  return (
    <div className="flex">
      <Link to={destination}>
        <IoMdArrowRoundBack
          className="bg-sky-800 text-white p-4 py-1 rounded-lg w-fit"
          size="30px"
        />
      </Link>
    </div>
  );
}
