export default function runQueqe(queue, iter, end) {
  const step = index => {
    if (index >= queue.length) {
      end()
    } else {
      if (queue[index]) {
        iter(queue[index], () => {
          step(index + 1)
        })
      } else {
        step(index + 1)
      }
    }
  }

  step(0)
}