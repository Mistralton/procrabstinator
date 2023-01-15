use rusqlite::{Connection, params};
use serde::Serialize;
use tauri::command;

use super::command_error::CommandResult;

#[derive(Serialize, Debug)]
struct Item {
    id: i32,
    name: String,
    due_date: String,
    priority_value: String,
    submission_status: i32,
    item_type: String,
    date_added: String,
    date_finished: Option<String>,
}

#[command]
pub fn delete_item(id: &str, table: &str) -> CommandResult<()> {
    let conn = Connection::open("../procrabstinate.db")?;
    if (table == "Items") {
        match conn.execute("DELETE FROM Items WHERE id = ?;", params![id]) {
            Ok(updated) => println!("{} rows were updated", updated),
            Err(err) => println!("update failed: {}", err),
          }
    } else {
        match conn.execute("DELETE FROM Block WHERE app_id = ?;", params![id]) {
            Ok(updated) => println!("{} rows were updated", updated),
            Err(err) => println!("update failed: {}", err),
          }
    }
    Ok(())
}

#[command]
pub fn insert_item(name: &str, due_date: &str, priority_value: &str, item_type: &str) -> CommandResult<()> {
    let conn = Connection::open("../procrabstinate.db")?;
    match conn.execute("INSERT INTO Items (name, due_date, priority_value, submission_status, date_added, item_type) values (?,?,?, 0, datetime('now'),?);",
    params![name, due_date, priority_value, item_type]) {
      Ok(updated) => println!("{} rows were updated", updated),
      Err(err) => println!("update failed: {}", err),
    }

    Ok(())
}

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
    let conn = Connection::open("../procrabstinate.db")?;

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
            item_type: row.get(7)?
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
            item_type: row.get(7)?
        });
    }

    let items_list = serde_json::to_value(items_list).unwrap();

    Ok(items_list)
}
