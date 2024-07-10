var client = new RestClient("http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value");
var request = new RestRequest(Method.GET);
IRestResponse response = client.Execute(request);