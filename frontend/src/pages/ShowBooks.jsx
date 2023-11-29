import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

export default function ShowBooks() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    id && fetchBook();
  }, []);
  function fetchBook() {
    setIsLoading(true);
    axios
      .get("http://localhost:5555/books/" + id)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  return (
    <div className="p-8">
      <BackButton />
      <h1 className="text-4xl font-semibold mt-4">Show Book</h1>
      {!isLoading && book ? (
        <div className="flex flex-col italic space-y-4 mt-4 border border-black max-w-lg text-xl p-4">
          <div>
            <span className=" font-bold">Title:</span> : {book.title}
          </div>
          <div>
            <span className=" font-bold">Author:</span> : {book.author}
          </div>
          <div>
            <span className=" font-bold">Publish Year:</span> :{" "}
            {book.publishYear}
          </div>
          <div>
            <span className=" font-bold">Created Time:</span> :{" "}
            {new Date(book.createdAt).toString()}
          </div>
          <div>
            <span className=" font-bold">Last Updated Time:</span> :{" "}
            {new Date(book.updatedAt).toString()}
          </div>
        </div>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
