import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";

export namespace Route {
  export interface ActionArgs extends ActionFunctionArgs {
    params: {
      exhibition_id: string;
    };
  }

  export interface LoaderArgs extends LoaderFunctionArgs {
    params: {
      exhibition_id: string;
    };
  }

  export interface ComponentProps {
    loaderData: {
      exhibition: {
        id: number;
        name: string;
        url: string;
        description?: string;
        start_date?: string;
        end_date?: string;
        private_view_start_date?: string;
        private_view_end_date?: string;
        images: Array<{
          id: number;
          image_url: string;
          caption?: string;
        }>;
        featured_artists?: Array<{
          artist: {
            name: string;
          };
        }>;
      };
    };
  }
}