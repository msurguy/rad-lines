// Simple event emitter to replace Vue's event bus
class EventEmitter {
  constructor() {
    this.events = {}
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(listener)

    // Return unsubscribe function
    return () => {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args))
    }
  }

  off(event, listener) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(l => l !== listener)
    }
  }
}

export const eventBus = new EventEmitter()
