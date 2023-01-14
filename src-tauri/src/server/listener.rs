use axum:: {
  routing::get,
  Router,
};
use std::net::SocketAddr;

pub async fn listener() {
  let app = Router::new()
    .route("/", get(|| async {"Hello, World!"}));

  let addr = SocketAddr::from(([0, 0, 0, 0], 5000));
  axum::Server::bind(&addr)
    .serve(app.into_make_service())
    .await
    .unwrap();
}