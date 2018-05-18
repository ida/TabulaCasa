function addEle(parentEle, html=null, tagName='div') {
  var ele = document.createElement(tagName)
  if(html) { ele.innerHTML = html }
  parentEle.appendChild(ele)
  return ele
}
function hideEle(ele) {
  ele.style.display = 'none'
}
function showEle(ele) {
  ele.style.display = 'inline-block'
}
