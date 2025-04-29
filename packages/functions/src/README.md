# SQS Architecture

This directory contains the implementation of an AWS SQS-based queue processing architecture.

## Components

### 1. Producer (`producer.ts`)
- HTTP-triggered Lambda function that generates 300 sample items
- Adds these items to an SQS queue in batches of 10 (SQS batch limit)
- Accessible via URL endpoint

### 2. Consumer (`consumer.ts`)
- SQS-triggered Lambda function that processes queue messages
- Each Lambda invocation processes a single message
- Includes simulated random processing time (1-3 seconds) and occasional failures (5%)
- Has a visibility timeout of 5 minutes, providing ample processing time

### 3. Dead Letter Queue Handler (`dlq-handler.ts`)
- Processes messages that failed after 3 retries
- Logs detailed information about failed items
- Could be enhanced to store failed items for later analysis or send alerts

## Configuration

The SQS queue is configured with:
- 5-minute visibility timeout
- Maximum of 3 retry attempts
- Dead Letter Queue for failed messages

## Testing

To test the system:
1. Deploy the stack
2. Access the producer function URL returned in the stack outputs
3. Monitor AWS CloudWatch logs to see the processing in action
4. Check the DLQ for any failed messages after the maximum retry count

## Scaling

This architecture scales automatically:
- Multiple consumer Lambda functions can run in parallel
- Each Lambda processes just one message at a time
- SQS automatically handles the queue backlog and scales accordingly