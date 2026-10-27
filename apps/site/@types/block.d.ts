import type { Content } from "@c-carts/types";

type BlockContent = Content[number];
export type Table = Extract<BlockContent, { _type: "table" }>;
export default BlockContent;
