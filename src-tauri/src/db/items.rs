use rusqlite::{Connection, Result};
use serde::Serialize;
use tauri::command;

#[derive(Serialize)]
#[derive(Debug)]
struct Item {
    Id: i32,
    Name: String,
    DueDate: String,
    PriorityValue: String,
    SubmissionStatus: i32,
    GradeReceived: Option<String>,
    DateAdded: String,
    DateFinished: Option<String>,
}

#[command]
pub fn insert_item(
    name: &str,
    due_date: &str,
    priority_val: &str,
    submit_status: i32,
    date_added: &str,
    grade_received: Option<&str>,
    date_fin: Option<&str>,
) -> Result<()> {
    let conn = Connection::open("./procrabstinate.db")?;

    conn.execute("INSERT INTO Items (Name, DueDate, PriorityValue, SubmissionStatus, DateAdded) values ('test', 'test', 'test', 1, 'test');", []);

    Ok(())
}


#[derive(Debug, thiserror::Error)]
pub enum CommandError {
  #[error(transparent)]
  RusqliteError(#[from] rusqlite::Error),
}

impl serde::Serialize for CommandError {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
      S: serde::ser::Serializer,
    {
      serializer.serialize_str(self.to_string().as_ref())
    }
}


pub type CommandResult<T, E = CommandError> = anyhow::Result<T, E>;

#[command]
pub fn get_all() -> CommandResult<serde_json::Value> {
    let conn = Connection::open("./procrabstinate.db")?;

    let mut stmt = conn.prepare("SELECT * FROM Items;")?;

    let query_result = stmt.query_map([], |row| {
        Ok(Item {
            Id: row.get(0)?,
            Name: row.get(1)?,
            DueDate: row.get(2)?,
            PriorityValue: row.get(3)?,
            SubmissionStatus: row.get(4)?,
            GradeReceived: row.get(5)?,
            DateAdded: row.get(6)?,
            DateFinished: row.get(7)?,
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

    let mut stmt = conn.prepare("SELECT * FROM Items where Name = ?;")?;
    let mut rows = stmt.query(rusqlite::params![name])?;

    let mut items_list = Vec::new();

    while let Some(row) = rows.next()? {
        items_list.push(Item {
            Id: row.get(0)?,
            Name: row.get(1)?,
            DueDate: row.get(2)?,
            PriorityValue: row.get(3)?,
            SubmissionStatus: row.get(4)?,
            GradeReceived: row.get(5)?,
            DateAdded: row.get(6)?,
            DateFinished: row.get(7)?,
        });
    }

    let items_list = serde_json::to_value(items_list).unwrap();
    Ok(items_list)
}
