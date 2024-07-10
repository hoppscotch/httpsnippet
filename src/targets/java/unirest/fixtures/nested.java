HttpResponse<String> response = Unirest.get("http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value")
  .asString();