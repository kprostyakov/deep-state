
  set err(msg) {
    if (this.errors.length > this.cfg.errors.length) {
      this.errors.shift()
    }
    this.errors.push(msg.data)
  }