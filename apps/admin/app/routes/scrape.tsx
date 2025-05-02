import { useFetcher } from "react-router";
import { Resource } from "sst";
import type { Route } from "./+types/scrape";
import { add_messages_to_queue } from "../actions/add-messages-to-queue";
import { db, job_status } from "@monorepo-template/db";
import { desc } from "drizzle-orm";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "initialise") {
    const galleries = await db.query.gallery.findMany();
    await add_messages_to_queue(Resource.ScraperQueue.url, galleries);
    const [result] = await db.insert(job_status).values({ number_of_messages: galleries.length }).returning();

    return {
      number_of_messages: result.number_of_messages,
      total: result.total,
      status: result.status,
    }
  }

  if (action === "refresh") {
    const result = await db.query.job_status.findFirst({ orderBy: desc(job_status.created_at) });

    return {
      number_of_messages: result?.number_of_messages ?? 0,
      total: result?.total ?? 0,
      status: result?.status ?? "Failed",
    }
  }

  return {
    number_of_messages: 0,
    total: 0,
    status: "Failed",
  }
}

export default function Scrape() {
  const fetcher = useFetcher();

	return (
		<div id="about">
      <fetcher.Form method="post">
        <button type="submit" name="action" value="initialise">
          {fetcher.state !== 'idle' || fetcher.data?.status === 'pending' ? 'Scraping...' : 'Initialise scraping'}
        </button>
      </fetcher.Form>
      <fetcher.Form method="post">
        <button type="submit" name="action" value="refresh">
          Refresh
        </button>
      </fetcher.Form>
      <p>Number galleries to scrape: {fetcher.data?.number_of_messages}</p>
      <p>Total galleries scraped: {fetcher.data?.total}</p>
      <p>Status: {fetcher.data?.status}</p>
      
		</div>
	);
}