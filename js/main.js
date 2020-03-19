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

window.onload = function () {
  setTimeout(function () {
    document.getElementById('map').src =
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1714.863946768129!2d40.51329681588195!3d64.54449498945905!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x441836858b23cd43%3A0xf35372b070d2d7d!2z0L_RgNC-0YHQvy4g0KLRgNC-0LjRhtC60LjQuSwgNjUsINCQ0YDRhdCw0L3Qs9C10LvRjNGB0LosINCQ0YDRhdCw0L3Qs9C10LvRjNGB0LrQsNGPINC-0LHQuy4sIDE2MzAwNA!5e0!3m2!1sru!2sru!4v1582625792181!5m2!1sru!2sru';
  }, 5000);
};