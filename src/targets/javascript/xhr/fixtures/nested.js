const data = null;

const xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener('readystatechange', function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open('GET', 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value');

xhr.send(data);