declare module 'worker-loader!*' {

  class WebpackWorker extends Worker {
      constructor ()
  }

  export default WebpackWorker;
}

declare module 'is-ios' {
  type Module = boolean
  const library: Module
  export = library
}

declare module 'is-android' {
  type Module = boolean
  const library: Module
  export = library
}