/* Extend jQuery with functions for PUT and DELETE requests. */

export function ajaxRequest(url, data, callback, type, method) {
    if (jQuery.isFunction(data)) {
      callback = data;
      data = {};
    }
    return jQuery.ajax({
      headers: {
        "x-access-token": localStorage.getItem("Authorization"),
      },
      type: method,
      url: url,
      data: data,
      success: callback,
      dataType: type,
    });
  }
  jQuery.extend({
    post: function (url, data, callback, type) {
      return ajaxRequest(url, data, callback, type, "POST");
    },
    get: function (url, data, callback, type) {
      return ajaxRequest(url, data, callback, type, "GET");
    },
    put: function (url, data, callback, type) {
      return ajaxRequest(url, data, callback, type, "PUT");
    },
    delete_: function (url, data, callback, type) {
      return ajaxRequest(url, data, callback, type, "DELETE");
    },
  });