export type ScheduledTask = () => void;
export type StopFlushUpdates = () => void;

type Scheduler {
  tick: Promise<void>;
  enqueue: (task: ScheduledTask) => void;
  flush: () => void;
  flushSync: () => void;
  onBeforeFlush: (callback: () => void) => StopFlushUpdates;
  onFlush: (callback: () => void) => StopFlushUpdates;
}

export function createSchedule(): Scheduler {
  const 
}