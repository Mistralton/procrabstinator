export default function Table() {
  return (
    <div className="p-4 w-[calc(100%-9rem)] float-right flex flex-col items-center text-white">
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
				{/* {#each userUrls as userUrl} */}
					<tr className="truncate relative">
						<td>
							<p>A</p>
						</td>
						<td>
              <p>B</p>
						</td>
						<td>
              <p>C</p>
						</td>
						<td>
              <p>D</p>
						</td>
						<td>
            <p>E</p>
						</td>
					</tr>
				{/* {/each} */}
			</tbody>
      </table>
    </div>
  );
}
