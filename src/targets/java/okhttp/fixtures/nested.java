OkHttpClient client = new OkHttpClient();

Request request = new Request.Builder()
  .url("http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value")
  .get()
  .build();

Response response = client.newCall(request).execute();