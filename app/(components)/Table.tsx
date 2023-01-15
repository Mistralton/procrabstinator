import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

interface toDo {
  date_added: string;
  date_finished?: string;
  due_date: string;
  id: number;
  name: string;
  priority_value: string;
  submission_status: number;
  item_type: string;
}

interface tab {
  app_id: number;
  name: string;
  app_type: string;
  time_spent: number;
  priority: string;
  date_added: string;
}

interface Props {
  type: string;
}

export default function Table({ type }: Props) {

  const [map, setMap] = useState<toDo[] | tab[]>([]);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    async function gather() {
      if (type === "todos") {
        const toDos: toDo[] = await invoke("get_all");
        setMap(toDos);
      }
      if (type === "tabs") {
        const tabs: tab[] = await invoke("gather_blocked_tabs");
        console.log(tabs);
        setMap(tabs);
      }
    }
    gather();
    setInterval(() => {
      gather();
      console.log("is all good and gather");
    }, 3000);
  }, []);

  const endOffset = itemOffset + 10;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = map.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(map.length / 10);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 10) % map.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };
  return (
    <div className="p-4 w-[calc(100%-9rem)] float-right flex flex-col items-center text-white m-4">
      <h2 className="font-bold text-3xl mb-4">Upcoming</h2>
      <table className="table-fixed md:w-[36rem] lg:w-[48rem] text-center border-separate border-spacing-5 py-4">
        <thead className="p-4">
          <tr>
            {type === "todos" && (
              <>
                <th>Task Name</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Priority</th>
                <th>Submitted</th>
                <th>Added</th>
              </>
            )}
            {type === "tabs" && (
              <>
                <th>Blocked Name</th>
                <th>App Type</th>
                <th>Time Spent</th>
                <th>Date Added</th>
              </>
            )}
          </tr>
        </thead>
        <tbody className="truncate gap-4">
          {type === "todos" &&
            (currentItems as toDo[]).map((todo) => {
              return (
                <tr key={todo.id} className="truncate relative">
                  <td>
                    <p>{todo.name}</p>
                  </td>
                  <td>
                    <p>{todo.item_type}</p>
                  </td>
                  <td>
                    <p>{todo.due_date}</p>
                  </td>
                  <td>
                    <p>{todo.priority_value}</p>
                  </td>
                  <td>
                    <p>{todo.submission_status}</p>
                  </td>
                  <td>
                    <p>{todo.date_added}</p>
                  </td>
                </tr>
              );
            })}
          {type === "tabs" &&
            (currentItems as tab[]).map((tab) => {
              return (
                <tr key={tab.app_id} className="truncate relative">
                  <td>
                    <p>{tab.name}</p>
                  </td>
                  <td>
                    <p>{tab.app_type}</p>
                  </td>
                  <td>
                    <p>{tab.time_spent}</p>
                  </td>
                  <td>
                    <p>{tab.date_added}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {map.length > 0 && <ReactPaginate
        className="flex justify-between md:w-[36rem] lg:w-[48rem]"
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
      />}
    </div>
  );
}
