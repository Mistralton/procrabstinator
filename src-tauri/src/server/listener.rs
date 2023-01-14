use axum::{http::Method, routing::post, Router};

use rusqlite::{params, Connection, Result};
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;
use tower_http::cors::{Any, CorsLayer};

#[derive(Deserialize, Serialize)]
pub struct TabsJson(Vec<String>);

pub async fn listener() {
    let app = Router::new().route("/", post(open_tab_body)).layer(
        CorsLayer::new()
            .allow_origin(Any)
            .allow_methods(vec![Method::POST]),
    );

    let addr = SocketAddr::from(([0, 0, 0, 0], 5000));
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}

#[axum_macros::debug_handler]
pub async fn open_tab_body(body: String) -> String {
    let tabs: Vec<String> = match serde_json::from_str(&body) {
        Ok(tabs) => tabs,
        Err(e) => {
            println!("Error parsing body: {:?}", e);
            return "Error parsing body".to_string();
        }
    };
    let mut matching_names = Vec::new();
    for tab in tabs {
        let conn = match Connection::open("./procrabstinate.db") {
            Ok(conn) => conn,
            Err(e) => {
                println!("Error opening the database: {:?}", e);
                return "Error opening the database".to_string();
            }
        };
        let query = format!("SELECT name FROM Block");
        let mut stmt = match conn.prepare(&query) {
            Ok(stmt) => stmt,
            Err(e) => {
                println!("Error preparing statement: {:?}", e);
                return e.to_string();
            }
        };
        let mut rows = match stmt.query({params![]}) {
            Ok(rows) => rows,
            Err(e) => {
                println!("Error querying the database: {:?}", e);
                return "Error querying the database".to_string();
            }
        };
        while let Some(row) = match rows.next() {
            Ok(row) => row,
            Err(e) => {
                println!("Error fetching the next row: {:?}", e);
                return "Error fetching the next row".to_string();
            }
        } {
            let name: String = match row.get(0) {
              Ok(row) => row,
              Err(e) => {
                  println!("Error fetching the next row: {:?}", e);
                  return "Error fetching the next row".to_string();
              }
            };
            if tab.contains(&name) {
              matching_names.push(name);
            }
        }
    }
    let json = match serde_json::to_string(&matching_names) {
        Ok(json) => json,
        Err(e) => {
            println!("Error serializing json: {:?}", e);
            return "Error serializing json".to_string();
        }
    };
    json
}
