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