export function onError(error: unknown) {
    let message = (error as Error).toString();

    if (!(error instanceof Error) && (error as Error).message) {
        message = (error as Error).message;
    }

    alert(message);
}