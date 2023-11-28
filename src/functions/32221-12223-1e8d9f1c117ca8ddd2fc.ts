import { app, InvocationContext } from "@azure/functions";
import * as https from "https";
import * as df from 'durable-functions';
import { ActivityHandler, OrchestrationContext, OrchestrationHandler } from 'durable-functions';

const orchestrator = () => {}

export async function serviceBusQueueTrigger(message: unknown, context: InvocationContext): Promise<void> {
    context.log('Service bus queue function processed message:', message);
    const client = df.getClient(context);
    const instanceId: string = await client.startNew("orchestrator-32221-12223-1e8d9f1c117ca8ddd2fc", message);
    context.log(`Started orchestration with ID = '${instanceId}'.`);
}
app.serviceBusQueue('orchestrator-32221-12223-1e8d9f1c117ca8ddd2fc', {
    connection: 'azureQueueConnection',
    queueName: '32221-12223-1e8d9f1c117ca8ddd2fc',
    handler: serviceBusQueueTrigger,
    extraInputs: [df.input.durableClient()],
});