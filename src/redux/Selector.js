import { createSelector } from 'reselect'

/**
 * Get git hub users
 */

const getGitHubUser = (state) => state.gitHub.userList

export const getGitHubUserListInfo = createSelector(
    [getGitHubUser],
    (info) => info
)

/**
 * Get bookmarked  users
 */

const getBookMarkedUser = (state) => state.gitHub.bookmarkList

export const getBookMarkUserListInfo = createSelector(
    [getBookMarkedUser],
    (info) => info
)