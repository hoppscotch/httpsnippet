AsyncHttpClient client = new DefaultAsyncHttpClient();
client.prepare("GET", "http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value")
  .execute()
  .toCompletableFuture()
  .thenAccept(System.out::println)
  .join();

client.close();