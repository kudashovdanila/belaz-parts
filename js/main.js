class Pop {
  event = 'click';
  closeEvent = null;
  class = '';
  parent = null;
  closeButtonStyle = closeButton => {};
  getText = item => {
    return ''
  };
  open = item => {};
  close = item => {};

  constructor() {}

  generate() {
    let list = document.getElementsByClassName(this.class);
    Array.prototype.forEach.call(list, pop => {
      let popBlock = document.createElement('div');
      let popBlockClosePanel = document.createElement('div');
      let popBlockClose = document.createElement('div');
      let popTextBlock = document.createElement('div');
      this.closeButtonStyle(popBlockClose);
      popBlock.classList.add('pop-block');
      popBlockClosePanel.classList.add('pop-block-close-panel');
      popBlockClose.classList.add('pop-block-close');
      popTextBlock.classList.add('pop-text-block');
      popTextBlock.innerText = this.getText(pop);
      pop.addEventListener(this.event, e => {
        if (e.target === pop)
          this.open(popBlock);
      });
      if (this.closeEvent !== null) {
        pop.addEventListener(this.closeEvent, e => {
          this.close(popBlock);
        })
      }
      popBlockClose.onclick = e => {
        this.close(popBlock);
      };
      popBlockClosePanel.appendChild(popBlockClose);
      this.close(popBlock);
      popBlock.appendChild(popBlockClosePanel);
      popBlock.appendChild(popTextBlock);
      if (this.parent === null) {
        pop.appendChild(popBlock);
      } else {
        this.parent.appendChild(popBlock);
      }
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  let popMenu = new Pop();
  popMenu.class = 'pop-item';
  popMenu.event = 'click';
  popMenu.closeEvent = 'mouse';
  popMenu.open = item => {
    item.style.display = 'flex';
    let parent = item.parentElement;
    item.style.top = parent.offsetTop + parent.offsetHeight + 'px';
    item.style.left = parent.offsetLeft + 'px';
  };
  popMenu.close = item => {
    item.style.display = 'none';
  };
  popMenu.closeButtonStyle = closeButton => {
    closeButton.innerHTML = '&#x2715;';
  };
  popMenu.getText = item => {
    return item.dataset.text;
  };
  popMenu.generate();
});

$(document).mouseup(function (e) {
  var container = $(".pop-block");
  if (container.has(e.target).length === 0) {
    container.hide();
  }
});

function slowScroll(id) {
  var offset = 0;
  $('html, body').animate({
    scrollTop: $(id).offset().top - offset
  }, 1000);
  return false;
}

// Preloader

var ball = document.getElementById("load-wrap");

function preload(el) {
  el.style.opacity = 1;
  var interball = setInterval(function () {
    el.style.opacity = el.style.opacity - 0.05;
    if (el.style.opacity <= 0.05) {
      clearInterval(interball);
      ball.style.display = "none";
    }
  }, 16);
}
window.onload = function () {
  setTimeout(function () {
    preload(ball);
  }, 2000); // ожидание после загрузки страницы
};