
function buildNetwork(config, trainingData){
  self.importScripts('https://unpkg.com/brain.js')
  const net = new brain.NeuralNetwork(config);
  net.train(trainingData)
  return net
}


self.addEventListener("message", function(e) {
  var data = e.data
  switch (data.cmd) {
    case "ai":
      const net = buildNetwork(data.config, data.trainingData)
      self.postMessage({
        cmd: "net-refreshed",
        net: net.toJSON()
      })
      break;
    default:
      self.postMessage('Unknown command: ');
  }
}, false)
