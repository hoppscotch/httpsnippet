const url = 'http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value';
const options = {method: 'GET'};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}