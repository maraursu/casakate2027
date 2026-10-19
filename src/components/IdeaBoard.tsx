import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  addComment,
  addPost,
  changeBoard,
  clearProfile,
  deleteComment,
  deletePost,
  editComment,
  editPost,
  ideaKinds,
  loadBoard,
  reactionOptions,
  readProfile,
  saveProfile,
  toggleReaction,
  type Board,
  type Idea,
  type IdeaKind,
  type Profile,
  type ReactionKey,
} from "../board";

function when(iso: string) {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const minutes = Math.round((Date.now() - then) / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 36) return `${hours}h ago`;
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function newestFirst(posts: Idea[]) {
  return [...posts].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function IdeaBoard() {
  const [profile, setProfile] = useState<Profile | null>(() => readProfile());
  const [nameDraft, setNameDraft] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [board, setBoard] = useState<Board>({ posts: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [kind, setKind] = useState<IdeaKind>("game");
  const [filter, setFilter] = useState<IdeaKind | "all">("all");
  const [draft, setDraft] = useState("");
  const [commentDrafts, setCommentDrafts] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<{ id: string; body: string } | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const revision = useRef(0);
  const pausePoll = useRef(false);
  pausePoll.current = editing !== null || busy || renaming;

  useEffect(() => {
    let ignore = false;
    const ticket = revision.current;
    loadBoard()
      .then((next) => {
        if (!ignore && ticket === revision.current) setBoard(next);
      })
      .catch(() => {
        if (!ignore) setError("Couldn't load ideas.");
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    const timer = window.setInterval(() => {
      if (document.hidden || pausePoll.current) return;
      const seen = revision.current;
      loadBoard()
        .then((next) => {
          if (seen === revision.current) setBoard(next);
        })
        .catch(() => {
          /* keep what's on screen */
        });
    }, 12000);
    return () => {
      ignore = true;
      window.clearInterval(timer);
    };
  }, []);

  async function commit(apply: (board: Board) => Board) {
    if (!profile) return;
    revision.current += 1;
    const ticket = revision.current;
    setBusy(true);
    setError("");
    try {
      const next = await changeBoard(apply);
      revision.current += 1;
      if (ticket + 1 === revision.current) setBoard(next);
    } catch {
      setError("Couldn't save that. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function onName(event: FormEvent) {
    event.preventDefault();
    const name = nameDraft.trim();
    if (!name) return;
    setProfile(saveProfile(name, renaming ? profile?.id : undefined));
    setNameDraft("");
    setRenaming(false);
  }

  function onPost(event: FormEvent) {
    event.preventDefault();
    if (!profile || !draft.trim()) return;
    const body = draft;
    const postKind = kind;
    setDraft("");
    void commit((current) => addPost(current, profile, postKind, body));
  }

  const visibleKinds = ideaKinds.filter((item) => filter === "all" || item.key === filter);

  return (
    <section className="panel idea-board">
      <h2>Ideas</h2>
      <ol className="idea-steps">
        <li>Add your name, so we know who said it.</li>
        <li>Add a game, a weekend idea, or a question for Sam.</li>
        <li>Comment, edit, or react on anyone's post.</li>
      </ol>

      {profile && !renaming ? (
        <p className="idea-who">
          Posting as <strong>{profile.name}</strong>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              setRenaming(true);
              setNameDraft(profile.name);
            }}
          >
            Rename
          </button>
          <button
            type="button"
            className="text-btn"
            onClick={() => {
              clearProfile();
              setProfile(null);
              setRenaming(false);
              setNameDraft("");
            }}
          >
            Not me
          </button>
        </p>
      ) : (
        <form className="idea-name" onSubmit={onName}>
          <label>
            <span className="eyebrow">{renaming ? "Rename" : "Your name"}</span>
            <input
              value={nameDraft}
              onChange={(event) => setNameDraft(event.target.value)}
              placeholder="so we know who said it"
              maxLength={32}
              required
            />
          </label>
          <div className="idea-name-actions">
            <button type="submit" className="btn">
              {renaming ? "Save" : "That's me"}
            </button>
            {renaming ? (
              <button type="button" className="btn ghost" onClick={() => setRenaming(false)}>
                Cancel
              </button>
            ) : null}
          </div>
        </form>
      )}

      {profile ? (
        <form className="idea-compose" onSubmit={onPost}>
          <div className="pills" role="group" aria-label="What kind of idea">
            {ideaKinds.map((item) => (
              <button
                key={item.key}
                type="button"
                className={kind === item.key ? "pill on" : "pill"}
                onClick={() => setKind(item.key)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <textarea
            className="idea-input"
            rows={3}
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Quiplash, a bakery morning, a bad karaoke rule…"
            maxLength={500}
          />
          <button type="submit" className="btn" disabled={busy || !draft.trim()}>
            Add it
          </button>
        </form>
      ) : null}

      <div className="pills idea-filters" role="group" aria-label="Filter ideas">
        <button
          type="button"
          className={filter === "all" ? "pill on" : "pill"}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        {ideaKinds.map((item) => (
          <button
            key={item.key}
            type="button"
            className={filter === item.key ? "pill on" : "pill"}
            onClick={() => setFilter(item.key)}
          >
            {item.filter}
          </button>
        ))}
      </div>

      {error ? <p className="err">{error}</p> : null}
      {loading ? <p className="fine">Loading ideas…</p> : null}

      {!loading
        ? visibleKinds.map((item) => {
            const posts = newestFirst(board.posts.filter((post) => post.kind === item.key));
            return (
              <div key={item.key} className="idea-group">
                <h3>{item.heading}</h3>
                {item.note ? <p className="idea-note">{item.note}</p> : null}
                {posts.length === 0 && !item.note ? <p className="fine">Nothing here yet.</p> : null}
                <ul className="idea-list">
                  {posts.map((post) => (
                    <li key={post.id}>
                      <article className="idea">
                        {editing?.id === post.id ? (
                          <form
                            className="idea-edit"
                            onSubmit={(event) => {
                              event.preventDefault();
                              if (!profile || !editing.body.trim()) return;
                              const body = editing.body;
                              setEditing(null);
                              void commit((current) => editPost(current, post.id, profile, body));
                            }}
                          >
                            <textarea
                              className="idea-input"
                              rows={3}
                              value={editing.body}
                              onChange={(event) =>
                                setEditing({ id: post.id, body: event.target.value })
                              }
                              maxLength={500}
                            />
                            <div className="idea-actions">
                              <button type="submit" className="btn" disabled={busy || !editing.body.trim()}>
                                Save
                              </button>
                              <button type="button" className="btn ghost" onClick={() => setEditing(null)}>
                                Cancel
                              </button>
                            </div>
                          </form>
                        ) : (
                          <>
                            <p className="idea-body">{post.body}</p>
                            <p className="muted idea-meta">
                              {post.authorName} · {when(post.createdAt)}
                              {post.updatedAt !== post.createdAt
                                ? post.editedByName && post.editedById !== post.authorId
                                  ? ` · edited by ${post.editedByName}`
                                  : " · edited"
                                : ""}
                            </p>
                            {profile ? (
                              <div className="idea-actions">
                                <button
                                  type="button"
                                  className="text-btn"
                                  onClick={() => {
                                    setPendingDelete(null);
                                    setEditing({ id: post.id, body: post.body });
                                  }}
                                >
                                  Edit
                                </button>
                                {pendingDelete === post.id ? (
                                  <>
                                    <button
                                      type="button"
                                      className="text-btn danger"
                                      onClick={() => {
                                        setPendingDelete(null);
                                        void commit((current) => deletePost(current, post.id));
                                      }}
                                    >
                                      Yes, delete
                                    </button>
                                    <button
                                      type="button"
                                      className="text-btn"
                                      onClick={() => setPendingDelete(null)}
                                    >
                                      Keep
                                    </button>
                                  </>
                                ) : (
                                  <button
                                    type="button"
                                    className="text-btn"
                                    onClick={() => setPendingDelete(post.id)}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            ) : null}
                          </>
                        )}

                        <div className="reacts">
                          {reactionOptions.map((option) => {
                            const count = post.reactions[option.key].length;
                            const mine = !!profile && post.reactions[option.key].includes(profile.id);
                            return (
                              <button
                                key={option.key}
                                type="button"
                                className={mine ? "react on" : "react"}
                                aria-pressed={mine}
                                aria-label={`${option.name}${count ? `, ${count}` : ""}`}
                                disabled={!profile || busy}
                                onClick={() => {
                                  if (!profile) return;
                                  const key: ReactionKey = option.key;
                                  void commit((current) =>
                                    toggleReaction(current, post.id, key, profile.id),
                                  );
                                }}
                              >
                                <span aria-hidden="true">{option.label}</span>
                                {count ? <span className="react-count">{count}</span> : null}
                              </button>
                            );
                          })}
                        </div>

                        {post.comments.length ? (
                          <ul className="idea-comments">
                            {post.comments.map((comment) => (
                              <li key={comment.id} className="idea-comment">
                                {editing?.id === comment.id ? (
                                  <form
                                    onSubmit={(event) => {
                                      event.preventDefault();
                                      if (!editing.body.trim()) return;
                                      const body = editing.body;
                                      setEditing(null);
                                      void commit((current) => editComment(current, comment.id, body));
                                    }}
                                  >
                                    <input
                                      className="idea-input"
                                      value={editing.body}
                                      onChange={(event) =>
                                        setEditing({ id: comment.id, body: event.target.value })
                                      }
                                      maxLength={280}
                                    />
                                    <div className="idea-actions">
                                      <button type="submit" className="btn" disabled={busy}>
                                        Save
                                      </button>
                                      <button
                                        type="button"
                                        className="btn ghost"
                                        onClick={() => setEditing(null)}
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </form>
                                ) : (
                                  <>
                                    <p className="idea-body">{comment.body}</p>
                                    <p className="muted idea-meta">
                                      {comment.authorName} · {when(comment.createdAt)}
                                      {comment.updatedAt !== comment.createdAt ? " · edited" : ""}
                                    </p>
                                    {profile ? (
                                      <div className="idea-actions">
                                        <button
                                          type="button"
                                          className="text-btn"
                                          onClick={() =>
                                            setEditing({ id: comment.id, body: comment.body })
                                          }
                                        >
                                          Edit
                                        </button>
                                        {pendingDelete === comment.id ? (
                                          <>
                                            <button
                                              type="button"
                                              className="text-btn danger"
                                              onClick={() => {
                                                setPendingDelete(null);
                                                void commit((current) =>
                                                  deleteComment(current, comment.id),
                                                );
                                              }}
                                            >
                                              Yes, delete
                                            </button>
                                            <button
                                              type="button"
                                              className="text-btn"
                                              onClick={() => setPendingDelete(null)}
                                            >
                                              Keep
                                            </button>
                                          </>
                                        ) : (
                                          <button
                                            type="button"
                                            className="text-btn"
                                            onClick={() => setPendingDelete(comment.id)}
                                          >
                                            Delete
                                          </button>
                                        )}
                                      </div>
                                    ) : null}
                                  </>
                                )}
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        {profile ? (
                          <form
                            className="idea-comment-form"
                            onSubmit={(event) => {
                              event.preventDefault();
                              const body = (commentDrafts[post.id] ?? "").trim();
                              if (!body) return;
                              setCommentDrafts((current) => ({ ...current, [post.id]: "" }));
                              void commit((current) => addComment(current, post.id, profile, body));
                            }}
                          >
                            <input
                              className="idea-input"
                              value={commentDrafts[post.id] ?? ""}
                              onChange={(event) =>
                                setCommentDrafts((current) => ({
                                  ...current,
                                  [post.id]: event.target.value,
                                }))
                              }
                              placeholder="Add a comment"
                              maxLength={280}
                              aria-label={`Comment on ${post.body}`}
                            />
                            <button
                              type="submit"
                              className="btn ghost"
                              disabled={busy || !(commentDrafts[post.id] ?? "").trim()}
                            >
                              Comment
                            </button>
                          </form>
                        ) : null}
                      </article>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })
        : null}
    </section>
  );
}
