# Submissions

The submissions module pull all information relating to user submissions.

## Submissions Helpers

The submissions are ensured to all return in a common format and pattern using the following interface and helper function:

### The `SubItem` Interface

This interface is to be used anywhere you're pulling submission data from the API. This is used in conjunction with the `SubCard` component to display all submissions consistently and in a way that is easily previewed.

### The `getImageFromS3` Helper Function

This function is used with the other submission API calls to pull image metadata from the API. The way the aPI currently works is that when submissions are sent back form endpoints, they are sent back not with an image url, but with an S3 bucket name. Because of security, we then have to hit the API endpoint to pull image data from the S3 bucket, as our frontend cannot directly pull S3 image data.

You'll see this used in almost every API call in this module.

> Single submission example [here](./results.ts)  
> Submission array example [here](./submissions.ts) (in the `getRecentSubsByChild` function)

## `getWinner`

This function gets the most recent winner for display on the Results page.

## `getScoreboard`

This function is differnt than other submission data as it doesn't return `SubItems` but rather returns a processed list of data that is used to populate the `Scoreboard` component on the results page.

> For more info, check out the [`Scoreboard`](../../components/pages/ResultsPage/Scoreboard) component

## `getRecentSubsByChild`

This function pulls a list of a child's recent submissions to display on their profile gallery (still under construction).

## `getTop3Subs`

This pulls the top 3 submissions for the day during the voting phase and is used to populate the `ReadTop3` and `CastVotes` containers. A large array of fake data is commented out for easier development testing.

## `uploadSubmission`

This uploads a child's posted image to the server.
