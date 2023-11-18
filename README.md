
# Log Harvestor Backend

## Deployment details

The backend is live on [Base route](https://log-harvestor-backend-production.up.railway.app/)

Two API endpoints has been created

- `/log POST` : For log ingestion. The payload is as follows:

```js
{
  "userId: "EXAMPLE_USER_ID",
  "level": "error",
  "message": "Failed to connect to DB",
  "resourceId": "server-1234",
  "timestamp": "2023-09-15T08:00:00Z",
  "traceId": "abc-xyz-123",
  "spanId": "span-456",
  "commit": "5e5342f",
  "metadata": {
      "parentResourceId": "server-0987"
  }
}
```

- `/log GET` : For fetching logs with variety of filters using url params.

**URL PARAM KEYS**

 - level
 - message
 - messageExactMatch: ( messageExactMatch=true , by default we search the message using regex, only when this key is also sent do we search for exact match. )
 - resourceId
 - timestamp: ( for exact time )
 - min_timestamp: ( for min timestamp range )
 - max_timestamp: ( for max timestamp range )
 - traceId
 - spanId
 - commit
 - metadata_parentResourceId


### Getting userId

Before making any request, visit [Frontend](https://log-harvestor-frontend.vercel.app/) create your acccount on Clerk's SDK, you will then be directed to the page. Click on the copy user Id button.

### Features implemented

- query with single filter.
- Allow combining multiple filters.
- Regular exp for search in message property.
- Date range filter for timestamp.
- userId based query interface

