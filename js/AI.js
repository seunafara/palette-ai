class AI {
  constructor(trainingData) {
    this.net = new brain.NeuralNetwork()
    this.trainingData = trainingData
  }

  train(data) {
    this.net.train(data || this.trainingData)
    return this
  }
}

export default AI
