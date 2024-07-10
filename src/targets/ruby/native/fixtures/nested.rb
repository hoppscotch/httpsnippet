require 'uri'
require 'net/http'

url = URI("http://mockbin.com/har?foo[bar]=baz,zap&fiz=buz&key=value")

http = Net::HTTP.new(url.host, url.port)

request = Net::HTTP::Get.new(url)

response = http.request(request)
puts response.read_body