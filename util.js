/*
  Utility functions for Google Chrome extensions

  Copyright (c) 2012, Nik Cubrilovic. All rights reserved.

  Redistribution and use in source and binary forms, with or without modification, 
  are permitted provided that the following conditions are met:

    1.  Redistributions of source code must retain the above copyright notice, 
        this list of conditions and the following disclaimer.

    2.  Redistributions in binary form must reproduce the above copyright notice, 
        this list of conditions and the following disclaimer in the documentation 
        and/or other materials provided with the distribution.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND 
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED 
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
  DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> OR CONTRIBUTORS BE LIABLE FOR 
  ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES 
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; 
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON 
  ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT 
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS 
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

  Authors (one per line):

    Nik Cubrilovic <nikcub@gmail.com> <http://nikcub.appspot.com>

*/
// Globals
var hostRegExp = new RegExp('^(?:f|ht)tp(?:s)?\://([^/]+)', 'im');

// Utility functions
function $(selector, rootNode) {
    var root = rootNode || document;
    var nodeList = root.querySelectorAll(selector);
    if (nodeList.length) {
      return Array.prototype.slice.call(nodeList);
    }
    return [];
};

function get_google_redirect_from_title(story_title) {
    // return a 'im feeling lucky' google search link for story title
    if(!story_title) {
      console.info('attempted rewrite on a story with no title');
    }
    story_title = story_title.replace(/ /g, '+');
    var search_url = "https://www.google.com/search?btnI=1&q=%22" + story_title + "%22";
    return search_url;
};

function get_params(dest_url) {
    dest_url = dest_url.replace(/&amp;/g, '&');
    var params = dest_url.substr(dest_url.indexOf("?") + 1).split('&'),
    r = {};
    if (typeof params !== 'object' || params.length < 1) return false;
    for (var x = 0; x <= params.length; x++) {
        if (typeof params[x] == "string" && params[x].indexOf('=')) {
            var t = params[x].split('=');
            if (t instanceof Array) {
                var k = t[0];
                if (t.length > 1) {
                    var z = t[1];
                    r[k] = decodeURIComponent(z);
                } else {
                    r[k] = '';
                }
            }
        }
    }
    return r;
};

function encode_qs(obj) {
    if (typeof obj !== 'object') return '';
    var r = [];
    for (var i in obj) {
        r.push(i + '=' + encodeURIComponent(obj[i]));
    };
    return r.join('&');
};

function anonymize_link(url) {
    // remove the facebook params in URLs to make the links anonymous
    var dirty_vars = ['fb_action_ids', 'fb_action_types', 'fb_source', 'fb_ref', 'utm_medium', 'utm_source', 'utm_campaign', 'utm_content', 'ref'],
    dl = dirty_vars.length;
    var url_params = get_params(url);
    if (!url_params) return url;
    var ret_url = '';
    if (url_params.length < 1)
    return url;
    for (var x = 0; x < dl; x++) {
        if (dirty_vars[x] in url_params)
        delete url_params[dirty_vars[x]];
    }
    return url.substr(0, url.indexOf('?')) + encode_qs(url_params);
};

function reverse_string(str) {
    return str.split('').reverse().join('');
};

function get_host(url) {
    var re = hostRegExp;
    var match = url.match(re);
    if (match instanceof Array && match.length > 0) return match[1].toString().toLowerCase();
    return false;
};

function open_new_win(url, options) {
    options = options || '';
    return window.open(url, '_blank', options);
};

