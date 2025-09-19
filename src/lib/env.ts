export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
export const apiUrl = process.env.NEXT_PUBLIC_TASKIPLINE_API
// google oauth
export const clientId = process.env.NEXT_PUBLIC_CLIENT_ID
export const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET
export const googleRedirectPath = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_PATH
export const googleRedirectUri = `${siteUrl}${googleRedirectPath}`
// github oauth
export const githubClientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID
export const githubClientSecret = process.env.NEXT_PUBLIC_GITHUB_SECRET
export const githubRedirectPath = process.env.NEXT_PUBLIC_GITHUB_REDIRECT_PATH
export const githubRedirectUri = `${siteUrl}${githubRedirectPath}`
export const githubState = process.env.NEXT_PUBLIC_GITHUB_STATE
