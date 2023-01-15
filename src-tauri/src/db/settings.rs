use rusqlite::{Connection, Result};
use serde::Serialize;
use tauri::command;

#[derive(Serialize, Debug)]
struct Settings {
    notification_type: String,
    notification_frequency: String,
    notification_time_frame: String,
    proactive_period: String,
}

use super::command_error::CommandResult;

#[command]
pub fn insert_settings(
    notification_type: &str,
    notification_frequency: &str,
    notification_time_frame: &str,
    proactive_period: &str,
) -> CommandResult<()> {
    let conn = Connection::open("../procrabstinate.db")?;

    match conn.execute("INSERT INTO Settings (notification_type, notification_frequency, notification_time_frame, proactive_period) values ('test', 'test', 'test', 'test');", []) {
      Ok(updated) => println!("{} rows were updated", updated),
      Err(err) => println!("update failed: {}", err),
    }
    Ok(())
}

#[command]
pub fn select_settings() -> CommandResult<serde_json::Value> {
    let conn = Connection::open("../procrabstinate.db")?;

    let mut stmt = conn.prepare("SELECT * FROM Settings;")?;

    let query_result = stmt.query_map([], |row| {
        Ok(Settings {
            notification_type: row.get(0)?,
            notification_frequency: row.get(1)?,
            notification_time_frame: row.get(2)?,
            proactive_period: row.get(3)?,
        })
    })?;

    let query_result_count = query_result.count();
    let result_length = serde_json::to_value(query_result_count).unwrap();
    println!("{}", result_length);
    Ok(result_length)
}
