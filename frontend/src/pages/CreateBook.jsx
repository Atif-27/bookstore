import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

export default function CreateBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    publishYear: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setForm((formInput) => ({ ...formInput, [e.target.id]: e.target.value }));
  }
  function handleFormSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    axios
      .post("http://localhost:5555/books", form)
      .then(() => navigate("/"))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }
  return (
    <div className=" p-8">
      <BackButton />
      <h1 className="text-3xl font-semibold mb-10 ">Create a new Book</h1>
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-start m-auto max-w-md space-y-8 text-lg p-5 py-20 rounded-lg border border-black "
      >
        <input
          type="text"
          id="title"
          className="px-3 py-1 border border-slate-800 w-full"
          placeholder="Enter Book Name"
          onChange={handleChange}
        />
        <input
          type="text"
          id="author"
          className="px-3 py-1 border border-slate-800 w-full"
          onChange={handleChange}
          placeholder="Enter Author Name"
        />
        <input
          type="number"
          id="publishYear"
          className="px-3 py-1 border border-slate-800 w-full"
          onChange={handleChange}
          placeholder="Enter Publish Year"
        />
        <button
          type="submit"
          className="bg-cyan-300 px-4 py-1 w-full"
          disabled={isLoading}
        >
          Submit
        </button>
      </form>
      {isLoading && <Spinner />}
    </div>
  );
}
