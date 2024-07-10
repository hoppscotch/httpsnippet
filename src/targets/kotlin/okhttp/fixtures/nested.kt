val client = OkHttpClient()

val request = Request.Builder()
  .url("http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value")
  .get()
  .build()

val response = client.newCall(request).execute()