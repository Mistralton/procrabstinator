#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// use rusqlite::NO_PARAMS;
mod db;
mod server;

use crate::db::block::gather_blocked_tabs;
use crate::db::items::delete_item;
use crate::db::items::get_all;
use crate::db::items::get_item;
use crate::db::items::insert_item;
use crate::db::settings::insert_settings;
use crate::db::settings::select_settings;
use server::listener::getTasks;
use server::listener::listener;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            tauri::async_runtime::spawn(listener());
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            get_all,
            get_item,
            insert_item,
            delete_item,
            gather_blocked_tabs,
            insert_settings,
            select_settings
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
