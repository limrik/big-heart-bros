// applies to the entire project
export { default } from "next-auth/middleware"

// applying to only several pages, routes
export const config = { matcher : ["/extra", "/dashboard", "/home"]}