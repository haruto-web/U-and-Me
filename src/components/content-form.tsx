type ContentFormProps = {
  title: string;
  description: string;
  includePhoto?: boolean;
  messageLabel?: string;
};

export function ContentForm({
  title,
  description,
  includePhoto = false,
  messageLabel = "Your words",
}: ContentFormProps) {
  return (
    <div className="page-stack">
      <section className="section-hero">
        <span className="eyebrow">A LITTLE SOMETHING TO KEEP</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </section>
      <form className="panel content-form">
        <label>
          <span>Title</span>
          <input name="title" placeholder="Give this a little name" />
        </label>
        {includePhoto && (
          <label>
            <span>Photo</span>
            <input name="photo" type="file" accept="image/*" disabled />
            <small>Photo uploads will be available when storage is connected.</small>
          </label>
        )}
        <label>
          <span>{messageLabel}</span>
          <textarea name="message" rows={6} placeholder="Write from the heart..." />
        </label>
        <div className="form-footer">
          <span>Local preview — this form does not save yet.</span>
          <button className="button button-primary" type="button" disabled>
            Save for later <span aria-hidden="true">♡</span>
          </button>
        </div>
      </form>
    </div>
  );
}
