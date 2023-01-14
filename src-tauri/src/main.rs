#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use rusqlite::NO_PARAMS;
mod db;
mod server;

use crate::db::items::get_all;
use crate::db::items::get_item;
use server::listener::listener;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            tauri::async_runtime::spawn(listener());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![get_all, get_item])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
