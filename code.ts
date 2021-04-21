
const applyToNodes = Array.from(figma.currentPage.selection);
figma.showUI(__html__, { visible: false });

if (!applyToNodes.length) {
  const element = figma.createEllipse()
  applyToNodes.push(element)
}
figma.ui.postMessage({ type: 'networkRequest', num: applyToNodes.length})
figma.ui.onmessage = (msg) => {
  msg.images.forEach((img, i) => {
    catify(applyToNodes[i], img);
  })
  
  figma.closePlugin();
};
figma.viewport.scrollAndZoomIntoView(applyToNodes);

function catify(element, image) {
  if (element.fills) {
    const newPaint = JSON.parse(JSON.stringify(element.fills[0]))
    newPaint.imageHash = figma.createImage(image).hash;
    newPaint.type = 'IMAGE';
    newPaint.scaleMode = 'CROP';
    delete newPaint.color;
    element.fills = [newPaint];
  }
}


