import { Resource } from "sst";
import { Example } from "@monorepo-template/db/example";

console.log(`${Example.hello()} Linked to ${Resource.App.name}.`);
