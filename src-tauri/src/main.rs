#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use rusqlite::NO_PARAMS;
use rusqlite::{Connection, Result};

// pub struct Items {
//     fname: String,
// }

// #[derive(Debug)]
// pub enum ItemsErr {
//     DbErr(sqErr),
// }

// impl From<sqErr> for ItemsErr {
//     fn from(s: sqErr) -> Self {
//         ItemsErr::DbErr(s)
//     }
// }

// impl Items {
//     pub fn add(
//         &self,
//         Name: &str,
//         DueDate: &str,
//         PriorityValue: &str,
//         SubmissionStatus: i32,
//         DateAdded: &str,
//     ) -> Result<(), ItemsErr> {
//         let connection = sqlite::open(&self.fname)?;
//         let mut db = connection.prepare("INSERT INTO Items (Name, DueDate, PriorityValue, SubmissionStatus, DateAdded) values (?, ?, ?, ?, ?);").unwrap();
//         db.bind(1, Name).unwrap();
//         db.bind(2, DueDate)?;
//         db.bind(3, PriorityValue)?;
//         db.bind(4, SubmissionStatus)?;
//         db.bind(5, DateAdded)?;
//         db.next()?;
//         Ok(())
//     }
// }

fn main() -> Result<()> {
    // tauri::Builder::default()
    //   .run(tauri::generate_context!())
    //   .expect("error while running tauri application");

    let conn = Connection::open("../procrabstinate.db")?;

    conn.execute("INSERT INTO Items (Name, DueDate, PriorityValue, SubmissionStatus, DateAdded) values ('test', 'test', 'test', 1, 'test');", []);

    Ok(())

    // let DB = Items {
    //     fname: String::from("../procrabstinate.db"),
    // };

    // match DB.add("test", "2000-01-01", "test", 1, "2000-01-01") {
    //     Ok(_) => println!("success"),
    //     Err(ItemsErr::DbErr(ref err)) => println!(":( {:?}", err),
    // }
}
