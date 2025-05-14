import { z } from "zod";

const string = (field: string) => z.string().min(1, { message: `${field}は必須です` });

const stringOrEmpty = () => z.string();

const slug = (field: string) =>
  string(field).regex(/^[a-zA-Z0-9-]+$/, "半角英数字とハイフンのみ使用できます");

const urlOrEmpty = () =>
  z.union([z.string().url({ message: "URLを入力してください" }), z.literal("")]);

export const zz = {
  string,
  stringOrEmpty,
  slug,
  urlOrEmpty,
};
