import { FormEvent, useEffect, useState } from "react";
import Timer from "./Timer";
import { TodoType } from "../types/Types";

interface ButtonProps<T extends TodoType> {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  todo: T;
  setTodo: React.Dispatch<React.SetStateAction<any>>;
}

const AddTodo = ({ handleSubmit, todo, setTodo }: ButtonProps<TodoType>) => {
  const [selectedTime, setSelectedTime] = useState<Date | undefined>();
  const [date, setDate] = useState<Date>(new Date())

  useEffect(() => {
    console.log(selectedTime)
    if (selectedTime) {
      setTodo((prev: TodoType) => ({
        ...prev,
        dueTime: selectedTime,
      }));
    }
  }, [selectedTime]);

  return (
    <form
      className="w-full h-full flex flex-col gap-2 text-black p-2"
      onSubmit={handleSubmit}
    >
      <h1 className="text-2xl font-bold">Add Todo</h1>
      <div className="flex-1 flex md:flex-row flex-col gap-2">
        <div className="md:w-3/5 w-full h-3/5 flex flex-col gap-2 p-2">
          <label
            className="font-semibold text-left text-lg"
            htmlFor="todoTitle"
          >
            Title:
            <input
              value={todo.title}
              onChange={(e) =>
                setTodo((prev: TodoType) => ({
                  ...prev,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-lg p-2 text-white bg-gray-600"
            ></input>
          </label>
          <label
            className="font-semibold text-left text-lg flex-1"
            htmlFor="todoDescription"
          >
            Description:
            <textarea
              value={todo.description}
              onChange={(e) => {
                setTodo((prev: TodoType) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
              className="h-full w-full rounded-lg bg-gray-600 text-white p-2"
            ></textarea>
          </label>
        </div>

        <div className="flex sm:w-max flex-col justify-between h-full md:w-2/5 w-full">
          <div className="w-full flex flex-col gap-2 p-2">
            <label
              className="w-2/3 font-semibold text-left text-lg"
              htmlFor="todoDescription"
            >
              {" "}
              Date :
              <input
                type="date"
                value={date.toISOString().substring(0, 10)}
                className="w-full rounded-lg p-[7px] text-white bg-gray-600"
                onChange={(e)=>{
                  setDate(new Date(e.target.value))
                }}
              ></input>
            </label>

            <label
              className="font-semibold text-left text-lg"
              htmlFor="todoDescription"
            >
              {" "}
              Time :
              <Timer selectedDate={date} setSelectedTime={setSelectedTime} />
            </label>
          </div>
        <div className="w-full flex justify-center mb-3">
          <button
            type="submit"
            className="text-xl rounded-xl px-10 py-1 font-bold m-1 bg-black text-white transition ease-out hover:text-black hover:bg-gray-300 outline-none"
          >
            Add
          </button>
        </div>
        </div>
      </div>
    </form>
  );
};

export default AddTodo;
