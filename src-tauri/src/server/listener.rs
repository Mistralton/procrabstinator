use axum:: {
  routing::post,
  Router,
};
use axum::Json;
use serde::{Deserialize, Serialize};
use std::net::SocketAddr;

#[derive(Deserialize, Serialize)]
pub struct TabsJson(Vec<String>);

pub async fn listener() {
  let app = Router::new()
    .route("/", post(open_tab_body));

  let addr = SocketAddr::from(([0, 0, 0, 0], 5000));
  axum::Server::bind(&addr)
    .serve(app.into_make_service())
    .await
    .unwrap();
}

pub async fn open_tab_body(Json(body): Json<TabsJson>) -> Json<TabsJson> {
  Json(body)
}