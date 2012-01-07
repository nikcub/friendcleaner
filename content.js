/*
  A content script that adds functionality to bulk remove friends on Facebook.

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

// @TODO 

// Globals
var FC_DEBUG = true;

// 1. Detect friends page

function fill_friends_page() {
  var fd = document.getElementById('pagelet_friends');
  if (!fd) {
    console.error('no friends list');
    return null;
  }
  
  var profile_boxes = document.querySelectorAll('#pagelet_friends .listView .lists div.gridList td div > div');
  if(!profile_boxes) {
    console.info('no profiles found..');
    return 0;
  }
  
  var fl = create_delete_button();
        
  for(var pb in profile_boxes) {
    if (!profile_boxes[pb].hasAttribute('friendcleaner-unfriendbutton')) {
      // profile_boxes[0].appendChild(fl);
      profile_boxes[pb].appendChild(fl);
      // console.info('appended:', fl);
      profile_boxes[pb].setAttribute('friendcleaner-unfriendbutton', 'true');
    }
  }
};

function create_delete_button() {
  var db = document.createElement('li');
  var dl = document.createElement('a');
  var ds = document.createElement('span');
  
  
  db.setAttribute('class', 'uiMenuItem FriendListUnfriend');
  db.setAttribute('data-label', 'unfriend');
  
  dl.setAttribute('class', 'itemAnchor');
  dl.setAttribute('role', 'menuitem');
  dl.setAttribute('rel', 'dialog-post');
  
  // ds.setAttribute('class', 'itemLabel fsm');
  ds.setAttribute('class', 'uiButtonText');
  ds.innerHTML = 'Unfriend';
  
  dl.appendChild(ds);
  db.appendChild(dl);
  return db;
}


function close_diags() {
  if (
  location.href.indexOf('dialog/permissions.request?app_id=' + apps[i]) + 1
  ) {
      var button = document.getElementsByName('cancel_clicked')[0];
      console.info('cancel:', button);
      button.click();
      break;
  }
}

fill_friends_page();
document.body.addEventListener("load", fill_friends_page, false);
document.body.addEventListener("DOMNodeInserted", fill_friends_page, false);