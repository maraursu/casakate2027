import { readStore, removeStore, writeStore } from "./storage";

/** Public read/write bin. Same courtesy lock as the rest of the site. */
const BOARD_URL = "https://api.npoint.io/8d876940b1731867e6ce";
const PROFILE_KEY = "kate-bach-planner";

export const ideaKinds = [
  { key: "game", label: "Game", filter: "Games", heading: "Games", note: "" },
  { key: "weekend", label: "Weekend", filter: "Weekend", heading: "Weekend ideas", note: "" },
  {
    key: "question",
    label: "Question",
    filter: "Questions",
    heading: "Questions for Sam",
    note: "Add any questions you want Sam to answer.",
  },
] as const;

export const reactionOptions = [
  { key: "love", label: "♥", name: "Love" },
  { key: "yes", label: "★", name: "Yes" },
  { key: "haha", label: "ha", name: "Ha" },
] as const;

export type IdeaKind = (typeof ideaKinds)[number]["key"];
export type ReactionKey = (typeof reactionOptions)[number]["key"];

export type Profile = {
  id: string;
  name: string;
};

export type Comment = {
  id: string;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
};

export type Idea = {
  id: string;
  kind: IdeaKind;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  updatedAt: string;
  editedById?: string;
  editedByName?: string;
  comments: Comment[];
  reactions: Record<ReactionKey, string[]>;
};

export type Board = {
  posts: Idea[];
};

const emptyReactions = (): Record<ReactionKey, string[]> => ({
  love: [],
  yes: [],
  haha: [],
});

function isRecord(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object";
}

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function normalizeComment(value: unknown): Comment | null {
  if (!isRecord(value) || !asString(value.id) || !asString(value.body)) return null;
  const createdAt = asString(value.createdAt) || new Date().toISOString();
  return {
    id: asString(value.id),
    body: asString(value.body),
    authorId: asString(value.authorId),
    authorName: asString(value.authorName) || "someone",
    createdAt,
    updatedAt: asString(value.updatedAt) || createdAt,
  };
}

function normalizeIdea(value: unknown): Idea | null {
  if (!isRecord(value) || !asString(value.id) || !asString(value.body)) return null;
  const kind: IdeaKind =
    value.kind === "weekend" ? "weekend" : value.kind === "question" ? "question" : "game";
  const createdAt = asString(value.createdAt) || new Date().toISOString();
  const reactions = emptyReactions();
  if (isRecord(value.reactions)) {
    for (const option of reactionOptions) {
      const list = value.reactions[option.key];
      reactions[option.key] = Array.isArray(list)
        ? list.filter((id): id is string => typeof id === "string")
        : [];
    }
  }
  const comments = Array.isArray(value.comments)
    ? value.comments.map(normalizeComment).filter((row): row is Comment => !!row)
    : [];
  return {
    id: asString(value.id),
    kind,
    body: asString(value.body),
    authorId: asString(value.authorId),
    authorName: asString(value.authorName) || "someone",
    createdAt,
    updatedAt: asString(value.updatedAt) || createdAt,
    editedById: asString(value.editedById) || undefined,
    editedByName: asString(value.editedByName) || undefined,
    comments,
    reactions,
  };
}

export function normalizeBoard(value: unknown): Board {
  const posts = isRecord(value) && Array.isArray(value.posts) ? value.posts : [];
  return {
    posts: posts.map(normalizeIdea).filter((row): row is Idea => !!row),
  };
}

export function readProfile(): Profile | null {
  const raw = readStore(PROFILE_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Profile>;
    if (!parsed.id || !parsed.name) return null;
    return { id: parsed.id, name: parsed.name };
  } catch {
    return null;
  }
}

export function saveProfile(name: string, keepId?: string): Profile {
  const profile = {
    id: keepId || readProfile()?.id || crypto.randomUUID(),
    name: name.trim(),
  };
  writeStore(PROFILE_KEY, JSON.stringify(profile));
  return profile;
}

export function clearProfile() {
  removeStore(PROFILE_KEY);
}

export async function loadBoard(): Promise<Board> {
  const response = await fetch(BOARD_URL, { cache: "no-store" });
  if (!response.ok) throw new Error("Couldn't load ideas");
  return normalizeBoard(await response.json());
}

let writeChain: Promise<void> = Promise.resolve();

export function changeBoard(apply: (board: Board) => Board): Promise<Board> {
  const run = writeChain.then(async () => {
    const current = await loadBoard();
    const next = apply(current);
    const response = await fetch(BOARD_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    });
    if (!response.ok) throw new Error("Couldn't save that");
    return normalizeBoard(await response.json());
  });
  writeChain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function now() {
  return new Date().toISOString();
}

export function addPost(board: Board, profile: Profile, kind: IdeaKind, body: string): Board {
  const stamp = now();
  const post: Idea = {
    id: crypto.randomUUID(),
    kind,
    body: body.trim(),
    authorId: profile.id,
    authorName: profile.name,
    createdAt: stamp,
    updatedAt: stamp,
    comments: [],
    reactions: emptyReactions(),
  };
  return { posts: [...board.posts, post] };
}

export function editPost(board: Board, postId: string, profile: Profile, body: string): Board {
  const stamp = now();
  return {
    posts: board.posts.map((post) =>
      post.id === postId
        ? {
            ...post,
            body: body.trim(),
            updatedAt: stamp,
            editedById: profile.id,
            editedByName: profile.name,
          }
        : post,
    ),
  };
}

export function deletePost(board: Board, postId: string): Board {
  return { posts: board.posts.filter((post) => post.id !== postId) };
}

export function addComment(board: Board, postId: string, profile: Profile, body: string): Board {
  const stamp = now();
  const comment: Comment = {
    id: crypto.randomUUID(),
    body: body.trim(),
    authorId: profile.id,
    authorName: profile.name,
    createdAt: stamp,
    updatedAt: stamp,
  };
  return {
    posts: board.posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
    ),
  };
}

export function editComment(board: Board, commentId: string, body: string): Board {
  const stamp = now();
  return {
    posts: board.posts.map((post) => ({
      ...post,
      comments: post.comments.map((comment) =>
        comment.id === commentId ? { ...comment, body: body.trim(), updatedAt: stamp } : comment,
      ),
    })),
  };
}

export function deleteComment(board: Board, commentId: string): Board {
  return {
    posts: board.posts.map((post) => ({
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    })),
  };
}

export function toggleReaction(
  board: Board,
  postId: string,
  key: ReactionKey,
  profileId: string,
): Board {
  return {
    posts: board.posts.map((post) => {
      if (post.id !== postId) return post;
      const current = post.reactions[key];
      const next = current.includes(profileId)
        ? current.filter((id) => id !== profileId)
        : [...current, profileId];
      return { ...post, reactions: { ...post.reactions, [key]: next } };
    }),
  };
}
