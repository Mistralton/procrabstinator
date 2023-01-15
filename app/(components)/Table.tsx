import { invoke } from "@tauri-apps/api/tauri";
import { useEffect, useState } from "react";

interface toDo {
  "date_added": string
  "date_finished"?: string
  "due_date": string
  "id": number
  "name": string
  "priority_value": string
  "submission_status": number
}

export default function Table() {
  const [map, setMap] = useState([] as toDo[])
  const [view, setView] = useState('todos')
  useEffect(() => {
    async function gather() {
      if(view === "todos") {
        const toDos: toDo[] = await invoke("get_all")
        toDos.map(toDo => console.log(toDo))
        setMap(toDos)
      }
    }
    gather()
  })

  return (
    <div className="p-4 w-[calc(100%-9rem)] float-right flex flex-col items-center text-white m-4">
      <h2 className="font-bold text-3xl mb-4">Upcoming</h2>
      <table className="table-fixed md:w-[36rem] lg:w-[48rem] text-center border-separate border-spacing-2 py-4">
        <thead className="p-4">
          <tr>
            <th>Task Name</th>
            <th>Type</th>
            <th>Date</th>
            <th>Priority</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="truncate gap-4">
				{map.map(todo => {
          return(
            <tr key={todo.id} className="truncate relative">
              <td><p>{todo.name}</p></td>
              <td><p>{todo.id}</p></td>
              <td><p>{todo.id}</p></td>
              <td><p>{todo.id}</p></td>
              <td><p>{todo.id}</p></td>
					  </tr>
          )
        })}
			</tbody>
      </table>
    </div>
  );
}
