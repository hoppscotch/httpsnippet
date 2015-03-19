/**
 * @description
 * HTTP code snippet generator for Swift using NSURLSession.
 *
 * @author
 * @thibaultCha
 *
 * for any questions or issues regarding the generated code snippet, please open an issue mentioning the author.
 */

'use strict'

var util = require('util')
var helpers = require('./helpers')
var CodeBuilder = require('../../helpers/code-builder')

module.exports = function (source, options) {
  var opts = util._extend({
    timeout: '10',
    indent: '  ',
    pretty: true
  }, options)

  var code = new CodeBuilder(opts.indent)

  // Markers for headers to be created as litteral objects and later be set on the NSURLRequest if exist
  var req = {
    hasHeaders: false,
    hasBody: false
  }

  // We just want to make sure people understand that is the only dependency
  code.push('import Foundation')

  if (Object.keys(source.allHeaders).length) {
    req.hasHeaders = true
    code.blank()
        .push(helpers.literalDeclaration('headers', source.allHeaders, opts))
  }

  if (source.postData.text || source.postData.jsonObj || source.postData.params) {
    req.hasBody = true

    switch (source.postData.mimeType) {
      case 'application/x-www-form-urlencoded':
        // By appending parameters one by one in the resulting snippet,
        // we make it easier for the user to edit it according to his or her needs after pasting.
        // The user can just add/remove lines adding/removing body parameters.
        code.blank()
            .push(util.format('var postData = NSMutableData(data: "%s=%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.params[0].name, source.postData.params[0].value))
        for (var i = 1, len = source.postData.params.length; i < len; i++) {
          code.push(util.format('postData.appendData("&%s=%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.params[i].name, source.postData.params[i].value))
        }
        break

      case 'application/json':
        if (source.postData.jsonObj) {
          code.push(helpers.literalDeclaration('parameters', source.postData.jsonObj, opts))
              .blank()
              .push('let postData = NSJSONSerialization.dataWithJSONObject(parameters, options: nil, error: nil)')
        }
        break

      case 'multipart/form-data':
        /**
         * By appending multipart parameters one by one in the resulting snippet,
         * we make it easier for the user to edit it according to his or her needs after pasting.
         * The user can just edit the parameters NSDictionary or put this part of a snippet in a multipart builder method.
        */
        code.push(helpers.literalDeclaration('parameters', source.postData.params, opts))
            .blank()
            .push(util.format('let boundary = "%s"', source.postData.boundary))
            .blank()
            .push('var body = ""')
            .push('var error: NSError? = nil')
            .push('for param in parameters {')
            .push(1, 'let paramName = param["name"]!')
            .push(1, 'body += "--\\(boundary)\\r\\n"')
            .push(1, 'body += "Content-Disposition:form-data; name=\\"\\(paramName)\\""')
            .push(1, 'if let filename = param["fileName"] {')
            .push(2, 'let contentType = param["content-type"]!')
            .push(2, 'let fileContent = String(contentsOfFile: filename, encoding: NSUTF8StringEncoding, error: &error)')
            .push(2, 'if (error != nil) {')
            .push(3, 'println(error)')
            .push(2, '}')
            .push(2, 'body += "; filename=\\"\\(filename)\\"\\r\\n"')
            .push(2, 'body += "Content-Type: \\(contentType)\\r\\n\\r\\n"')
            .push(2, 'body += fileContent!')
            .push(1, '} else if let paramValue = param["value"] {')
            .push(2, 'body += "\\r\\n\\r\\n\\(paramValue)"')
            .push(1, '}')
            .push('}')
        break

      default:
        code.blank()
            .push(util.format('let postData = NSData(data: "%s".dataUsingEncoding(NSUTF8StringEncoding)!)', source.postData.text))
    }
  }

  code.blank()
      // NSURLRequestUseProtocolCachePolicy is the default policy, let's just always set it to avoid confusion.
      .push(util.format('var request = NSMutableURLRequest(URL: NSURL(string: "%s")!,', source.fullUrl))
      .push('                                        cachePolicy: .UseProtocolCachePolicy,')
      .push(util.format('                                    timeoutInterval: %s)', parseInt(opts.timeout, 10).toFixed(1)))
      .push(util.format('request.HTTPMethod = "%s"', source.method))

  if (req.hasHeaders) {
    code.push('request.allHTTPHeaderFields = headers')
  }

  if (req.hasBody) {
    code.push('request.HTTPBody = postData')
  }

  code.blank()
      // Retrieving the shared session will be less verbose than creating a new one.
      .push('let session = NSURLSession.sharedSession()')
      .push('let dataTask = session.dataTaskWithRequest(request, completionHandler: { (data, response, error) -> Void in')
      .push(1, 'if (error != nil) {')
      .push(2, 'println(error)')
      .push(1, '} else {')
      // Casting the NSURLResponse to NSHTTPURLResponse so the user can see the status     .
      .push(2, 'let httpResponse = response as? NSHTTPURLResponse')
      .push(2, 'println(httpResponse)')
      .push(1, '}')
      .push('})')
      .blank()
      .push('dataTask.resume()')

  return code.join()
}

module.exports.info = {
  key: 'nsurlsession',
  title: 'NSURLSession',
  link: 'https://developer.apple.com/library/mac/documentation/Foundation/Reference/NSURLSession_class/index.html',
  description: 'Foundation\'s NSURLSession request'
}
