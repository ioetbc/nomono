seed db
`npm run shell src/example.ts`

get todos from db via lambda:
`curl https://4xov3zqpq7khx2fbzrbk5ajkdy0hqznd.lambda-\url.eu-north-1.on.aws`

post todos from db via lambda:
`curl -X POST https://4xov3zqpq7khx2fbzrbk5ajkdy0hqznd.lambda-url.eu-north-1.on.aws/`

tunnel into staging / prod db

terminal (1)
npx sst tunnel --stage staging

terminal (2)
- migrate
`SST_STAGE=staging npx sst shell -- pnpm db migrate`

- seed
`cd packages/db`
`SST_STAGE=staging npx sst shell -- pnpm seed`

### sqs

- How to add items to sqs queue
- `curl https://jfbp35gdb5ycpcrqqloavhx4yy0pkdem.lambda-url.eu-north-1.on.aws/`