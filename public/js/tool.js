//判断鼠标是否在一个元素内
function ifMouse(event, element) {
  // 获取鼠标的坐标
  var mouseX = event.clientX;
  var mouseY = event.clientY;

  // 获取元素的位置和尺寸
  var rect = element.getBoundingClientRect();
  var elementX = rect.left;
  var elementY = rect.top;
  var elementWidth = rect.width;
  var elementHeight = rect.height;

  // 判断鼠标位置是否在元素内部
  if (
    mouseX >= elementX &&
    mouseX <= elementX + elementWidth &&
    mouseY >= elementY &&
    mouseY <= elementY + elementHeight
  ) {
    return true;
  } else {
    return false;
  }
}
//函数只执行一次
let once = function(fn) {
    let caller = true;
    return function() {
        if(caller) {
            caller = false
            fn.apply(this, arguments)
        }
    }
    
  }
export { ifMouse ,once}
