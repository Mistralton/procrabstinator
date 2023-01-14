use rusqlite::{Connection, Result};
use serde::Serialize;
use tauri::command;

use super::command_error::CommandResult;

#[derive(Serialize)]
#[derive(Debug)]
struct Item {
    id: i32,
    name: String,
    due_date: String,
    priority_value: String,
    submission_status: i32,
    date_added: String,
    date_finished: Option<String>,
}

// #[command]
// pub fn insert_item(
//     name: &str,
//     due_date: &str,
//     priority_val: &str,
//     submit_status: i32,
//     date_added: &str,
//     date_fin: Option<&str>,
// ) -> Result<()> {
//     let conn = Connection::open("./procrabstinate.db")?;

//     conn.execute("INSERT INTO Items (name, due_date, priority_val, submit_status, date_added) values ('test', 'test', 'test', 1, 'test');", []);

//     Ok(())
// }

// CREATE TABLE "Items" (
// 	"id"	INTEGER UNIQUE,
// 	"name"	TEXT NOT NULL,
// 	"due_date"	TEXT NOT NULL,
// 	"priority_value"	TEXT NOT NULL,
// 	"submission_status"	INTEGER NOT NULL,
// 	"date_added"	TEXT NOT NULL,
// 	"date_finished"	TEXT,
// 	PRIMARY KEY("id" AUTOINCREMENT)
// )

#[command]
pub fn get_all() -> CommandResult<serde_json::Value> {
    let conn = Connection::open("./procrabstinate.db")?;

    let mut stmt = conn.prepare("SELECT * FROM Items;")?;

    let query_result = stmt.query_map([], |row| {
        Ok(Item {
            id: row.get(0)?,
            name: row.get(1)?,
            due_date: row.get(2)?,
            priority_value: row.get(3)?,
            submission_status: row.get(4)?,
            date_added: row.get(5)?,
            date_finished: row.get(6)?,
        })
    })?;

    let mut items_list = vec![];

    for item in query_result {
        items_list.push(item?);
    }

    let items_list = serde_json::to_value(items_list).unwrap();
    Ok(items_list)
}

#[command]
pub fn get_item(name: &str) -> CommandResult<serde_json::Value> {
    let conn = Connection::open("./procrabstinate.db").expect("Connection failed");

    let mut stmt = conn.prepare("SELECT * FROM Items where name = ?;")?;
    let mut rows = stmt.query(rusqlite::params![name])?;

    let mut items_list = Vec::new();

    while let Some(row) = rows.next()? {
        items_list.push(Item {
          id: row.get(0)?,
          name: row.get(1)?,
          due_date: row.get(2)?,
          priority_value: row.get(3)?,
          submission_status: row.get(4)?,
          date_added: row.get(5)?,
          date_finished: row.get(6)?,
        });
    }

    let items_list = serde_json::to_value(items_list).unwrap();
    Ok(items_list)
}
