import { Anime } from "./anime";
import { Pagination } from "./pagination";

export interface APIResponse {
  data: Anime[],
  pagination: Pagination
}