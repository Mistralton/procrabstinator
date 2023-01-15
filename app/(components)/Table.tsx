import { invoke } from "@tauri-apps/api/tauri";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import trash from "../../public/trash.png"

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
  async function gather() {
    if (type === "todos") {
      const toDos: toDo[] = await invoke("get_all");
      setMap(toDos);
    }
    if (type === "tabs") {
      const tabs: tab[] = await invoke("gather_blocked_tabs");
      setMap(tabs);
    }
  }
  useEffect(() => {
    gather();
    setInterval(() => {
      gather();
    }, 3000);
  }, []);

  const endOffset = itemOffset + 10;
  const currentItems = map.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(map.length / 10);

  const handlePageClick = (event: any ) => {
    const newOffset = (event.selected * 10) % map.length;
    setItemOffset(newOffset);
  };

  // function getTimeUntil(ms: number) {
  //   let seconds = (ms / 1000).toFixed(1);
  //   let minutes = (ms / (1000 * 60)).toFixed(1);
  //   let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  //   let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  //   if (Number(seconds) < 60) return seconds + " Sec";
  //   else if (Number(minutes) < 60) return minutes + " Min";
  //   else if (Number(hours) < 24) return hours + " Hrs";
  //   else return days + " Days"
  // }

  async function deleter(id: string, table: string) {
    await invoke("delete_item", { id: id, table: table })
    gather();
  }

  return (
    <div className="p-4 w-[calc(100%-9rem)] float-right flex flex-col items-center text-white m-4">
      {type === "todos" && <h2 className="font-bold text-3xl mb-4">Upcoming</h2> }
      {type === "tabs" && <h2 className="font-bold text-3xl mb-4">Blocked Apps/Websites</h2> }
      <table className="table-fixed md:w-[36rem] lg:w-[48rem] text-center border-separate border-spacing-5 py-4">
        <thead className="p-4">
          <tr>
            {type === "todos" && (
              <>
                <th>Task Name</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Priority</th>
                {/* <th>Submitted</th> */}
                {/* <th>Time Until Due</th> */}
                <th className="w-2"></th>
              </>
            )}
            {type === "tabs" && (
              <>
                <th>Blocked Name</th>
                <th>App Type</th>
                <th>Time Spent</th>
                <th>Date Added</th>
                <th className="w-2"></th>
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
                  {/* <td>
                    <p>{todo.submission_status}</p>
                  </td> */}
                  {/* <td>
                    <p>{(getTimeUntil(Date.parse(todo.due_date) - Date.now()))}</p>
                  </td> */}
                  <td><button className="absolute -right-3 bottom-0" onClick={() => deleter(String(todo.id), 'Items')}><Image src={trash} alt="trash"/></button></td>
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
                  <td><button className="absolute -right-3 bottom-0" onClick={() => deleter(String(tab.app_id), 'Block')}><Image src={trash} alt="trash"/></button></td>
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
