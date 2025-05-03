import {
	type RouteConfig,
	index,
	layout,
	route,
} from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	layout("layouts/sidebar.tsx", [
		route("exhibitions", "routes/exhibitions.tsx"),
		route("exhibitions/:exhibition_id", "routes/exhibition.tsx"),
		route("exhibitions/:exhibition_id/edit", "routes/edit-exhibition.tsx"),
		route(
			"exhibitions/:exhibition_id/destroy",
			"routes/destroy-exhibition.tsx",
		),
	]),
	route("about", "routes/about.tsx"),
	route("scrape", "routes/scrape.tsx"),
] satisfies RouteConfig;
