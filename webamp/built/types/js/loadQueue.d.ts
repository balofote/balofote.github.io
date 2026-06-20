export default class LoadQueue {
    constructor({ threads }: {
        threads: any;
    });
    _queue: TinyQueue<never>;
    _availableThreads: any;
    push(task: any, priority: any): () => void;
    _run(): void;
}
import TinyQueue from "tinyqueue";
