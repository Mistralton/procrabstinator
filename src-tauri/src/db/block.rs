// CREATE TABLE "Block" (
// 	"name"	TEXT NOT NULL,
// 	"app_type"	TEXT NOT NULL,
// 	"time_spent"	INTEGER NOT NULL,
// 	"priority"	TEXT,
// 	"app_id"	INTEGER NOT NULL,
// 	PRIMARY KEY("app_id" AUTOINCREMENT)
// )

use rusqlite::{Connection, Result};
use serde::Serialize;
use tauri::command;

#[derive(Serialize)]
#[derive(Debug)]
pub struct Block {
    app_id: i32,
    name: String,
    app_type: String,
    time_spent: i32,
    priority: Option<String>,
}

use super::command_error::{CommandResult};

// #[command]
// pub fn insert_item(
//     name: &str,
//     app_type: &str,
//     priority: &Option<String>,
//     time_spent: i32,
// ) -> Result<()> {
//     let conn = Connection::open("./procrabstinate.db")?;

//     conn.execute("INSERT INTO Block (name, app_type, time_spent, priority) values ('test', 'test', 'test', 1);", []);

//     Ok(())
// }

// #[command]
// pub fn get_all_block() -> CommandResult<serde_json::Value> {
//     let conn = Connection::open("./procrabstinate.db")?;

//     let mut stmt = conn.prepare("SELECT * FROM Block;")?;

//     let query_result = stmt.query_map([], |row| {
//         Ok(Block {
//             app_id: row.get(0)?,
//             name: row.get(1)?,
//             app_type: row.get(2)?,
//             time_spent: row.get(3)?,
//             priority: row.get(4)?,
//         })
//     })?;

//     let mut items_list = vec![];

//     for item in query_result {
//         items_list.push(item?);
//     }

//     let items_list = serde_json::to_value(items_list).unwrap();
//     Ok(items_list)
// }

// #[command]
// pub fn get_item_from_block(name: &str) -> CommandResult<serde_json::Value> {
//     let conn = Connection::open("./procrabstinate.db").expect("Connection failed");

//     let mut stmt = conn.prepare("SELECT * FROM Block where name = ?;")?;
//     let mut rows = stmt.query(rusqlite::params![name])?;

//     let mut items_list = Vec::new();

//     while let Some(row) = rows.next()? {
//         items_list.push(Block {
//           app_id: row.get(0)?,
//           name: row.get(1)?,
//           app_type: row.get(2)?,
//           time_spent: row.get(3)?,
//           priority: row.get(4)?,
//         });
//     }

//     let items_list = serde_json::to_value(items_list).unwrap();
//     Ok(items_list)
// }
