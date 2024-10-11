# Implementation Date: 2024-10-11
# Author: Aditya Kr. Mishra

# Concurrency: Multiprocessing and Queues
# Processing large data batches across multiple CPU cores

import multiprocessing
import time

def worker_task(task_queue, result_queue):
    while not task_queue.empty():
        try:
            task = task_queue.get_nowait()
            # Simulate heavy computation
            result = task * task
            result_queue.put((task, result))
        except queue.Empty:
            break

if __name__ == '__main__':
    tasks = multiprocessing.Queue()
    results = multiprocessing.Queue()

    # Populate task queue
    for i in range(20):
        tasks.put(i)

    processes = []
    # Spawn 4 worker processes
    for _ in range(4):
        p = multiprocessing.Process(target=worker_task, args=(tasks, results))
        processes.append(p)
        p.start()

    for p in processes:
        p.join()

    # Collect results
    final_results = []
    while not results.empty():
        final_results.append(results.get())
        
    print(f"Successfully processed {len(final_results)} tasks in parallel.")
