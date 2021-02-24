/**
 * This parses a query string into a proper object. It allows you to pass
 * in a string union type parameter so that you can get good linting when
 * you know the query parameters you're going to have.
 *
 * *Note: you won't get any errors if you don't pass a type in, as TypeScript
 * creates a generic `Record<string, string>` response type, but passing a
 * type is helpful when you want good linting as well as when you know what
 * query parameters you're receiving.*
 *
 * ```ts
 * const { search } = useLocation();
 *
 * const params = query.parse<'name' | 'email'>(search);
 *
 * typeof params.name;  // string
 * typeof params.email; // string
 * typeof params.none;  // error
 * ```
 *
 * @param query the query string returned from `useLocation().search`
 * @param ParamList a string unino type containing the query keys you're expecting
 */
export const parse = <ParamList extends string>(
  query: string,
): ParserResponse<ParamList> =>
  JSON.parse(
    '{"' + query.slice(1).replace(/&/g, '","').replace(/=/g, '":"') + '"}',
    (key, value) => (key === '' ? value : decodeURIComponent(value)),
  );

type ParserResponse<QueryParamList extends string> = {
  [key in QueryParamList]?: string;
};
