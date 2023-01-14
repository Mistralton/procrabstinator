#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use rusqlite::NO_PARAMS;
use rusqlite::{Connection, Result};

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

#[tauri::command]
fn insertItem(
    name: &str,
    due_date: &str,
    priority_val: &str,
    submit_status: i32,
    date_added: &str,
) -> Result<()> {
    let conn = Connection::open("./procrabstinate.db")?;

    conn.execute("INSERT INTO Items (Name, DueDate, PriorityValue, SubmissionStatus, DateAdded) values ('test', 'test', 'test', 1, 'test');", []);

    Ok(())
}

#[tauri::command]
fn insertItemOptional(
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

#[tauri::command]
fn getAll() -> Result<()> {
    let conn = Connection::open("./procrabstinate.db")?;

    let mut stmt = conn.prepare("SELECT * FROM Items;")?;

    let queryResult = stmt.query_map([], |row| {
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

    for item in queryResult {
        println!("{:?}", item)
    }

    Ok(())
}

fn main() {
    // tauri::Builder::default()
    //     .run(tauri::generate_context!())
    //     .expect("error while running tauri application");
    insertItem("test", "test", "test", 1, "test");
}
